import { NextResponse } from 'next/server';

// Force Node.js runtime for full fetch compatibility
export const runtime = 'nodejs';

// API route to fetch a concise plant summary using Google Gemini
// Expects JSON body: { scientific_name?: string, common_name?: string, biome_name?: string }
// Environment: set GEMINI_API_KEY (preferred), or GOOGLE_GEMINI_API_KEY, or NEXT_PUBLIC_GEMINI_API_KEY

export async function POST(req: Request) {
  try {
    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_GEMINI_API_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY; // last resort; still kept server-side

    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API key missing. Set GEMINI_API_KEY in your environment and restart the server.' }, { status: 500 });
    }

    const { scientific_name, common_name, biome_name } = await req.json();

    const namePart = scientific_name || common_name || 'the plant';
    const biomePart = biome_name ? ` in the biome "${biome_name}"` : '';

    const prompt = [
      `Write a concise, factual 3–4 sentence summary about ${namePart}${biomePart}.`,
      `Include: where it commonly grows, notable features, typical phenology (e.g., flowering season), and any common uses or ecological roles if well-known.`,
      `Keep it compact and readable. Avoid speculation, citations, or markdown.`
    ].join(' ');

    const buildBody = () => ({ contents: [{ parts: [{ text: prompt }] }] });

    // Try latest flash first, then fall back to stable model names
    const models = [
      'gemini-1.5-flash-latest',
      'gemini-1.5-flash',
      'gemini-1.0-pro',
    ];

    let lastError: string | null = null;
    for (const model of models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
        const resp = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(buildBody())
        });

        const maybeJson = await safeJson(resp);
        if (!resp.ok) {
          lastError = formatError(maybeJson) || (await resp.text());
          continue; // try next model
        }

        const text = maybeJson?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const summary = (text || '').trim();
        if (summary) return NextResponse.json({ summary });
        lastError = 'Empty response from Gemini';
      } catch (err: any) {
        lastError = err?.message || String(err);
        continue;
      }
    }

    return NextResponse.json({ error: `Gemini request failed: ${lastError || 'Unknown error'}` }, { status: 502 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unknown server error' }, { status: 500 });
  }
}

async function safeJson(resp: Response) {
  try { return await resp.json(); } catch { return null as any; }
}

function formatError(j: any) {
  try {
    const m = j?.error?.message || j?.candidates?.[0]?.finishReason || j?.status || '';
    return typeof m === 'string' ? m : JSON.stringify(j);
  } catch { return null; }
}
