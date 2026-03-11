import Anthropic from '@anthropic-ai/sdk';

const REWRITE_SYSTEM_PROMPT = `You are a world-class academic editor and LaTeX typographer. \
Your task is to take the provided PDF and produce a rewritten, beautifully redesigned, fully compilable LaTeX document. \
Do NOT merely transcribe — actively REWRITE and IMPROVE the content for maximum clarity, readability, and typographic quality.

REWRITING GUIDELINES:
- Rephrase sentences for clarity and conciseness without losing mathematical rigor
- Fix awkward phrasing, passive voice overuse, and unclear transitions
- Ensure each definition, theorem, and proof flows logically and reads naturally
- Add brief motivating sentences before theorems and definitions where helpful
- Improve exercise wording for clarity

TYPOGRAPHY REQUIREMENTS:
- Use \\documentclass[12pt,a4paper]{article} with geometry package (margins: top=2.5cm, bottom=2.5cm, left=3cm, right=3cm)
- Load fonts: \\usepackage[T1]{fontenc}, \\usepackage{lmodern} or \\usepackage{palatino} for body, \\usepackage{cabin} or similar sans-serif for headings
- Use microtype for professional microtypographic refinements: \\usepackage[protrusion=true,expansion=true]{microtype}
- Set proper line spacing: \\usepackage{setspace} with \\setstretch{1.15}
- Use \\usepackage{parskip} for clean paragraph spacing
- Color palette: define a primary color (e.g. deep blue \\definecolor{primary}{RGB}{30,64,175}) and an accent (e.g. \\definecolor{accent}{RGB}{251,191,36})

CARDS / STYLED BOXES (mandatory — use tcolorbox):
\\usepackage[most]{tcolorbox}
Define and USE these card styles throughout the document:

1. Definition/concept card:
\\tcbset{defcard/.style={enhanced, colback=blue!5, colframe=primary, fonttitle=\\bfseries\\sffamily,
  title={#1}, sharp corners=south, top=4pt, bottom=4pt, left=6pt, right=6pt,
  attach boxed title to top left={yshift=-2mm,xshift=4mm},
  boxed title style={colback=primary,sharp corners}}}

2. Theorem/result card:
\\tcbset{thmcard/.style={enhanced, colback=amber!8, colframe=accent!80!black, fonttitle=\\bfseries\\sffamily,
  title={#1}, rounded corners, drop shadow}})

3. Example/exercise card:
\\tcbset{excard/.style={enhanced, colback=green!5, colframe=green!50!black, fonttitle=\\bfseries\\sffamily,
  title={#1}, breakable, sharp corners=uphill}})

4. Warning/important card:
\\tcbset{warncard/.style={enhanced, colback=red!5, colframe=red!60!black, fonttitle=\\bfseries\\sffamily\\color{white},
  title={#1}, colbacktitle=red!70!black}})

Wrap ALL definitions, theorems, propositions, lemmas, corollaries, examples, exercises, remarks, and important notes \
in the appropriate card environment.

MATH QUALITY:
- Use amsmath, amssymb, amsthm
- Display equations with \\[ ... \\] or equation environment, never $$ ... $$
- Number important equations with \\label and reference them with \\eqref
- Align multi-line derivations with the align environment

SECTION STYLING:
- Use \\usepackage{titlesec} to style headings with the primary color and sans-serif font
- Example: \\titleformat{\\section}{\\large\\bfseries\\sffamily\\color{primary}}{\\thesection}{1em}{}[\\titlerule]

HEADER/FOOTER:
- Use \\usepackage{fancyhdr} with a clean header showing document title and page number

OUTPUT: Produce ONLY the raw LaTeX source code. No explanation, no markdown fences, no comments outside the code.`;

export async function POST(request) {
  let uploadedFileId = null;
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  try {
    const formData = await request.formData();
    const pdfFile = formData.get('pdfFile');

    if (!pdfFile) {
      return new Response(JSON.stringify({ error: 'No PDF file provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const arrayBuffer = await pdfFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filename = pdfFile.name || 'document.pdf';

    const uploaded = await anthropic.beta.files.upload(
      { file: new File([buffer], filename, { type: 'application/pdf' }) },
      { headers: { 'anthropic-beta': 'files-api-2025-04-14' } }
    );
    uploadedFileId = uploaded.id;

    const stream = anthropic.beta.messages.stream(
      {
        model: 'claude-opus-4-6',
        max_tokens: 8192,
        system: REWRITE_SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: 'Rewrite and improve this PDF document. Output only the LaTeX code.' },
              { type: 'document', source: { type: 'file', file_id: uploaded.id } },
            ],
          },
        ],
      },
      { headers: { 'anthropic-beta': 'files-api-2025-04-14' } }
    );

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (
              chunk.type === 'content_block_delta' &&
              chunk.delta.type === 'text_delta'
            ) {
              controller.enqueue(new TextEncoder().encode(chunk.delta.text));
            }
          }
        } finally {
          controller.close();
          try {
            await anthropic.beta.files.delete(uploadedFileId, {
              headers: { 'anthropic-beta': 'files-api-2025-04-14' },
            });
          } catch (_) {}
        }
      },
    });

    return new Response(readable, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch (error) {
    if (uploadedFileId) {
      try {
        await anthropic.beta.files.delete(uploadedFileId, {
          headers: { 'anthropic-beta': 'files-api-2025-04-14' },
        });
      } catch (_) {}
    }
    console.error('Rewrite error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Rewrite failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
