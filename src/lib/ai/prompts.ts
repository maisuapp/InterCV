import { CountryCode } from '@/types/resume';

export const getSystemPromptForCountry = (country: CountryCode) => {
  const instructions: Record<CountryCode, string> = {
    IE: 'Target: Ireland. Follow Irish recruitment standards. Highlight right-to-work (Stamp 2, Stamp 1G, Stamp 4). Use Hiberno/British English spelling (e.g. organised). No photos or age.',
    US: 'Target: USA. Ultra-concise 1-page format. Use STAR/XYZ formula (Accomplished [X] as measured by [Y] by doing [Z]). Absolutely no personal data or photos.',
    CA: 'Target: Canada. Clear achievements, reverse chronological order, emphasize open work permits (PGWP/Working Holiday). No photos.',
    GB: 'Target: UK. 2-page CV structure. Strong personal profile at the top followed by work permit status and quantifiable achievements.',
    DE: 'Target: Germany. Accurate, structured, chronological clarity. Professional qualifications and language proficiencies clearly outlined.',
    JP: 'Target: Japan. Formal tone (敬語/丁寧語). Detail roles precisely for Shokumu Keirekisho (職務経歴書) and state current Zairyu status.',
    AU: 'Target: Australia. Highlight Subclass visa, practical contributions, and teamwork competencies.'
  };

  return `You are an expert international resume localization assistant.
${instructions[country] || instructions.US}
Transform descriptions into impactful, concise bullet points using strong action verbs.`;
};