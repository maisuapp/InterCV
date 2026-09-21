import { NextResponse } from 'next/server';
import { getSystemPromptForCountry } from '@/lib/ai/prompts';
import { CountryCode } from '@/types/resume';

const VALID_COUNTRIES: CountryCode[] = ['US', 'CA', 'GB', 'DE', 'JP', 'AU', 'IE'];
const MAX_TEXT_LENGTH = 2000;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const text = typeof body?.text === 'string' ? body.text.trim() : '';
    const country = body?.country as CountryCode;

    if (!text || text.length > MAX_TEXT_LENGTH || !VALID_COUNTRIES.includes(country)) {
      return NextResponse.json({ error: 'Texto ou país inválido.' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      const polished = text.replace(/^[•\-*]\s*/, '').trim();
      return NextResponse.json({
        result: 'Spearheaded key initiatives: ' + polished + ', resulting in measurable efficiency and alignment with local industry standards.',
        note: 'A IA está desativada. Configure OPENAI_API_KEY no ambiente do servidor para ativá-la.'
      });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + apiKey },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: getSystemPromptForCountry(country) },
          { role: 'user', content: 'Refine and improve this bullet point for a resume:\n"' + text + '"' },
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) return NextResponse.json({ error: 'A otimização está temporariamente indisponível.' }, { status: 502 });
    const data = await response.json();
    const optimizedText = data.choices?.[0]?.message?.content?.trim();
    return NextResponse.json({ result: optimizedText || text });
  } catch {
    return NextResponse.json({ error: 'Não foi possível processar a solicitação.' }, { status: 500 });
  }
}
