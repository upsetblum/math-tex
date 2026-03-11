import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request) {
  try {
    const { latex } = await request.json();

    if (!latex) {
      return Response.json({ error: 'No LaTeX content provided' }, { status: 400 });
    }

    // Use only the first portion to save tokens — title/description don't need the full doc
    const excerpt = latex.slice(0, 3000);

    const message = await anthropic.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 512,
      messages: [
        {
          role: 'user',
          content: `Given this LaTeX document excerpt, generate a blog post title and a short description (2-3 sentences) in French.

Return ONLY valid JSON in this exact format:
{"title": "...", "description": "..."}

LaTeX excerpt:
${excerpt}`,
        },
      ],
    });

    const raw = message.content[0].text.trim();
    const json = JSON.parse(raw);

    return Response.json(json);
  } catch (error) {
    console.error('generate-metadata error:', error);
    return Response.json({ error: error.message || 'Failed to generate metadata' }, { status: 500 });
  }
}
