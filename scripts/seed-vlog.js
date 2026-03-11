/**
 * Seed script — uploads all PDFs in /vlog to the blog via the local API.
 * Run after `npm run dev` is started:
 *   node scripts/seed-vlog.js
 *
 * Each PDF is uploaded to Vercel Blob and its metadata is saved to Postgres.
 * Claude auto-generates the title and description in French.
 */

import { readdir, readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { FormData, Blob } from 'formdata-node';
import fetch from 'node-fetch';

const __dir = dirname(fileURLToPath(import.meta.url));
const VLOG_DIR = join(__dir, '..', 'vlog');
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

async function generateMetadata(pdfBuffer, filename) {
  // Ask the running server to generate metadata via Claude
  // We use a short excerpt heuristic from the filename since we don't have
  // the LaTeX yet — pass the filename as the latex field for a quick title.
  const res = await fetch(`${BASE_URL}/api/generate-metadata`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ latex: `Document filename: ${filename}` }),
  });
  if (!res.ok) throw new Error(`generate-metadata failed: ${res.status}`);
  return res.json(); // { title, description }
}

async function uploadBlog(pdfBuffer, filename, title, description) {
  const form = new FormData();
  form.set('pdfFile', new Blob([pdfBuffer], { type: 'application/pdf' }), filename);
  form.set('title', title);
  form.set('description', description);
  form.set('category', 'Math');
  form.set('author', 'Admin');
  form.set('authorImg', '/about-blog.webp');

  const res = await fetch(`${BASE_URL}/api/blog`, { method: 'POST', body: form });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`POST /api/blog failed (${res.status}): ${text}`);
  }
  return res.json();
}

async function main() {
  const files = (await readdir(VLOG_DIR)).filter(f => f.endsWith('.pdf'));

  if (files.length === 0) {
    console.log('No PDFs found in /vlog — nothing to seed.');
    return;
  }

  console.log(`Found ${files.length} PDF(s): ${files.join(', ')}\n`);

  for (const filename of files) {
    console.log(`→ Processing: ${filename}`);
    try {
      const pdfBuffer = await readFile(join(VLOG_DIR, filename));

      console.log('  Generating metadata via Claude...');
      const { title, description } = await generateMetadata(pdfBuffer, filename);
      console.log(`  Title: ${title}`);
      console.log(`  Description: ${description}`);

      console.log('  Uploading to blog...');
      await uploadBlog(pdfBuffer, filename, title, description);
      console.log(`  ✓ Published\n`);
    } catch (err) {
      console.error(`  ✗ Failed: ${err.message}\n`);
    }
  }

  console.log('Seed complete.');
}

main();
