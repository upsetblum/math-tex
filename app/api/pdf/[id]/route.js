export const dynamic = 'force-dynamic';

import { prisma } from "@/lib/prisma";
const { NextResponse } = require("next/server");

// Redirect to Vercel Blob URL
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
    }

    const blog = await prisma.blog.findUnique({ where: { id } });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return Response.redirect(blog.pdfUrl, 302);
  } catch (error) {
    console.error('Error redirecting to PDF:', error);
    return NextResponse.json({ error: "Failed to serve PDF", details: error.message }, { status: 500 });
  }
}

// HEAD request to check if PDF exists
export async function HEAD(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return new Response(null, { status: 400 });
    }

    const blog = await prisma.blog.findUnique({ where: { id } });

    if (!blog || !blog.pdfUrl) {
      return new Response(null, { status: 404 });
    }

    return new Response(null, { status: 200 });
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}
