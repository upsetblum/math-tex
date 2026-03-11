export const maxDuration = 60;

export async function POST(req) {
  const { latex } = await req.json();

  const res = await fetch('https://latex.ytotech.com/builds/sync', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      compiler: 'pdflatex',
      resources: [
        { main: true, content: latex },
      ],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('[compile] YtoTech error:', res.status, text);
    return Response.json({ error: text }, { status: 500 });
  }

  // YtoTech returns the PDF binary directly
  const pdfBytes = await res.arrayBuffer();
  return new Response(pdfBytes, {
    headers: { 'Content-Type': 'application/pdf' },
  });
}
