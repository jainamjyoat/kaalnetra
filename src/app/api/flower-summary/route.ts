import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Force Node.js runtime for full fetch + fs compatibility
export const runtime = 'nodejs';

// Where we persist summaries on the server
const CACHE_DIR = path.join(process.cwd(), 'data');
const CACHE_FILE = path.join(CACHE_DIR, 'flower-summaries.json');

// Read cache JSON from disk (create empty if absent)
async function readCache(): Promise<Record<string, any>> {
  try {
    const buf = await fs.readFile(CACHE_FILE, 'utf8');
    return JSON.parse(buf || '{}');
  } catch (e: any) {
    if (e?.code === 'ENOENT') return {};
    throw e;
  }
}

async function writeCache(obj: Record<string, any>) {
  await fs.mkdir(CACHE_DIR, { recursive: true });
  await fs.writeFile(CACHE_FILE, JSON.stringify(obj, null, 2), 'utf8');
}

function makeKey(scientific_name?: string, common_name?: string, biome_name?: string) {
  const name = (scientific_name || common_name || 'unknown').trim().toLowerCase();
  const biome = (biome_name || 'unknown').trim().toLowerCase();
  return `${name}::${biome}`;
}

export async function POST(req: Request) {
  try {
    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_GEMINI_API_KEY;

    const { scientific_name, common_name, biome_name } = await req.json();

    // Use on-disk JSON cache to avoid repeated model calls
    const key = makeKey(scientific_name, common_name, biome_name);
    let cache = await readCache();

    if (cache[key]?.summary) {
      return NextResponse.json({ summary: cache[key].summary, cached: true });
    }

    // If no Gemini key is provided and cache misses, return a minimal fallback rather than erroring out
    if (!apiKey) {
      const namePart = scientific_name || common_name || 'This plant';
      const biomePart = biome_name ? ` within the ${biome_name} biome` : '';
      const fallback = `${namePart}${biomePart} is commonly documented in this region. It adapts to local conditions and shows seasonal phenology.`.trim();
      // Persist the fallback to cache as well
      cache[key] = {
        summary: fallback,
        scientific_name,
        common_name,
        biome_name,
        modelUsed: 'fallback/no-key',
        generatedAt: new Date().toISOString(),
      };
      await writeCache(cache);
      return NextResponse.json({ summary: fallback, cached: false, model: 'fallback/no-key' });
    }

    const namePart = scientific_name || common_name || 'the plant';
    const biomePart = biome_name ? ` in the biome "${biome_name}"` : '';
    const prompt = [
      `Write a concise, factual 3–4 sentence summary about ${namePart}${biomePart}.`,
      `Include: where it commonly grows, notable features, typical phenology (e.g., flowering season), and any common uses or ecological roles if well-known.`,
      `Keep it compact and readable. Avoid speculation, citations, or markdown.`,
    ].join(' ');

    const buildBody = () => ({ contents: [{ parts: [{ text: prompt }] }] });

    // Prefer Gemini 2.5 Flash, then fall back to known stable models
    const models = [
      'gemini-2.5-flash',
      'gemini-2.0-flash',
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
          body: JSON.stringify(buildBody()),
        });

        const maybeJson = await safeJson(resp);
        if (!resp.ok) {
          lastError = formatError(maybeJson) || (await resp.text());
          continue; // try next model
        }

        const text = maybeJson?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const summary = (text || '').trim();
        if (summary) {
          // Save to cache
          cache[key] = {
            summary,
            scientific_name,
            common_name,
            biome_name,
            modelUsed: model,
            generatedAt: new Date().toISOString(),
          };
          await writeCache(cache);
          return NextResponse.json({ summary, cached: false, model });
        }
        lastError = 'Empty response from Gemini';
      } catch (err: any) {
        lastError = err?.message || String(err);
        continue;
      }
    }

    // If we reach here, model calls failed; attempt a graceful fallback and persist
    const synthesized = localFallback(namePart, biome_name);
    cache[key] = {
      summary: synthesized,
      scientific_name,
      common_name,
      biome_name,
      modelUsed: 'fallback/generator-failed',
      generatedAt: new Date().toISOString(),
    };
    await writeCache(cache);
    return NextResponse.json({ summary: synthesized, cached: false, model: 'fallback/generator-failed', error: lastError || undefined });
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

function localFallback(namePart: string, biome_name?: string) {
  const title = namePart || 'This plant';
  const biomeText = biome_name ? ` within the ${biome_name} biome` : '';
  return `${title}${biomeText} is commonly documented in this region. It adapts to local climate and soils, with seasonal phenology. Notable features and ecological roles vary by variety and habitat.`.trim();
}
