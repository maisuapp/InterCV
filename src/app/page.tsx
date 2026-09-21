'use client';

import React, { useState } from 'react';
import { CountryCode, InternationalResumeData, WorkExperience } from '@/types/resume';
import { COUNTRY_RULES, COUNTRY_VISA_OPTIONS } from '@/config/rules/countries';
import { ResumePreview } from '@/components/cv-templates/ResumePreview';
import { Globe, Printer, Sparkles, Plus, Trash2, AlertCircle } from 'lucide-react';

export default function HomePage() {
  const [targetCountry, setTargetCountry] = useState<CountryCode>('IE');
  const [loadingAI, setLoadingAI] = useState(false);

  const [resumeData, setResumeData] = useState<InternationalResumeData>({
    targetCountry: 'IE',
    fullName: 'Alex Silva',
    email: 'alex.silva@email.com',
    phone: '+353 83 123 4567',
    location: 'Dublin, Ireland',
    linkedin: 'linkedin.com/in/alexsilva',
    visaStatus: COUNTRY_VISA_OPTIONS.IE[0].recommendedText,
    professionalSummary: 'Detail-oriented professional with 4+ years of international experience in project management and operations. Proven track record of optimizing team workflows and delivering high-quality client solutions.',
    experiences: [
      {
        id: 'exp-1',
        company: 'Global Solutions Ltd',
        position: 'Operations Coordinator',
        location: 'Dublin, Ireland',
        startDate: '2023',
        endDate: '',
        current: true,
        bullets: [
          'Streamlined internal communication across 3 multidisciplinary teams, cutting resolution times by 25%.',
          'Managed project deliverables ensuring strict compliance with local industry regulations and KPIs.'
        ]
      }
    ],
    education: [
      {
        id: 'edu-1',
        institution: 'National College of Ireland',
        degree: 'Postgraduate Diploma',
        fieldOfStudy: 'International Business Management',
        location: 'Dublin, Ireland',
        startYear: '2022',
        endYear: '2023',
        current: false
      }
    ],
    skills: ['Project Management', 'Agile/Scrum', 'Data Analysis', 'Cross-cultural Communication'],
    languages: [
      { id: 'lang-1', language: 'Português', level: 'Nativo' },
      { id: 'lang-2', language: 'English', level: 'C1 / Proficient' }
    ]
  });

  const currentRule = COUNTRY_RULES[targetCountry];
  const visaOptions = COUNTRY_VISA_OPTIONS[targetCountry] || [];

  const handleCountryChange = (code: CountryCode) => {
    setTargetCountry(code);
    const defaultVisa = COUNTRY_VISA_OPTIONS[code]?.[0]?.recommendedText || '';
    setResumeData((prev) => ({
      ...prev,
      targetCountry: code,
      visaStatus: defaultVisa
    }));
  };

  const handleOptimizeBullet = async (expIndex: number, bulletIndex: number) => {
    const textToOptimize = resumeData.experiences[expIndex].bullets[bulletIndex];
    if (!textToOptimize) return;

    setLoadingAI(true);
    try {
      const res = await fetch('/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToOptimize, country: targetCountry }),
      });
      const data = await res.json();
      if (data.result) {
        const updatedExperiences = [...resumeData.experiences];
        updatedExperiences[expIndex].bullets[bulletIndex] = data.result;
        setResumeData({ ...resumeData, experiences: updatedExperiences });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAI(false);
    }
  };

  const addExperience = () => {
    const newExp: WorkExperience = {
      id: `exp-${Date.now()}`,
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      bullets: ['']
    };
    setResumeData({ ...resumeData, experiences: [...resumeData.experiences, newExp] });
  };

  const removeExperience = (id: string) => {
    setResumeData({
      ...resumeData,
      experiences: resumeData.experiences.filter((exp) => exp.id !== id)
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Topo de navegação */}
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-slate-200 px-4 sm:px-6 py-4 flex flex-wrap justify-between items-center gap-4 no-print">
        <div className="flex items-center gap-3">
          <Globe className="w-6 h-6 text-indigo-600" />
          <h1 className="font-bold text-lg text-slate-800">
            InterCV
          </h1>
        </div>

        <div className="flex items-center gap-3 mt-2 sm:mt-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase">País de Destino:</span>
            <select
              value={targetCountry}
              onChange={(e) => handleCountryChange(e.target.value as CountryCode)}
              className="bg-slate-100 border border-slate-300 rounded px-3 py-1.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="IE">🇮🇪 Irlanda (Stamp 2 / 1G / EU)</option>
              <option value="US">🇺🇸 Estados Unidos (ATS Resume)</option>
              <option value="CA">🇨🇦 Canadá (Resume)</option>
              <option value="GB">🇬🇧 Reino Unido (UK CV)</option>
              <option value="DE">🇩🇪 Alemanha (Europass / DACH)</option>
              <option value="JP">🇯🇵 Japão (履歴書・職務経歴書)</option>
              <option value="AU">🇦🇺 Austrália (Detailed CV)</option>
            </select>
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded shadow-sm transition"
          >
            <Printer className="w-4 h-4" />
            Salvar / Imprimir PDF
          </button>
        </div>
      </header>

      {/* Aviso de conformidade legal */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 sm:px-6 py-3 text-xs text-amber-900 flex items-start gap-2 no-print">
        <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-600" />
        <span><strong>Regras de Compliance ({currentRule.countryName}):</strong> {currentRule.complianceWarning}</span>
      </div>

      {/* Grid Principal: Editor à esquerda e Preview à direita */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 sm:p-6 max-w-7xl mx-auto w-full">
        {/* Formulário de Edição */}
        <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6 no-print overflow-y-auto max-h-[85vh]">
          <h2 className="font-bold text-slate-800 text-base border-b border-slate-200 pb-2">
            1. Dados Pessoais e Visto de Trabalho
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Nome Completo</label>
              <input
                type="text"
                value={resumeData.fullName}
                onChange={(e) => setResumeData({ ...resumeData, fullName: e.target.value })}
                className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">E-mail</label>
              <input
                type="email"
                value={resumeData.email}
                onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })}
                className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Telefone Local</label>
              <input
                type="text"
                value={resumeData.phone}
                onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })}
                className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Cidade / País de Residência</label>
              <input
                type="text"
                value={resumeData.location}
                onChange={(e) => setResumeData({ ...resumeData, location: e.target.value })}
                className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm"
              />
            </div>
          </div>

          {/* Visto / Permissão de Trabalho */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Status do Visto / Autorização de Trabalho ({currentRule.countryName})
            </label>
            <select
              onChange={(e) => setResumeData({ ...resumeData, visaStatus: e.target.value })}
              value={resumeData.visaStatus}
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-slate-50 mb-2"
            >
              {visaOptions.map((opt) => (
                <option key={opt.id} value={opt.recommendedText}>
                  {opt.label}
                </option>
              ))}
            </select>
            <textarea
              rows={2}
              value={resumeData.visaStatus}
              onChange={(e) => setResumeData({ ...resumeData, visaStatus: e.target.value })}
              className="w-full border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-700"
              placeholder="Texto descritivo do visto que aparecerá no currículo"
            />
          </div>

          {/* Resumo Profissional */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Resumo Profissional</label>
            <textarea
              rows={4}
              value={resumeData.professionalSummary}
              onChange={(e) => setResumeData({ ...resumeData, professionalSummary: e.target.value })}
              className="w-full border border-slate-300 rounded px-3 py-1.5 text-sm"
            />
          </div>

          {/* Experiências */}
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <h2 className="font-bold text-slate-800 text-base">2. Experiências Profissionais</h2>
              <button
                onClick={addExperience}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Adicionar
              </button>
            </div>

            {resumeData.experiences.map((exp, expIdx) => (
              <div key={exp.id} className="border border-slate-200 p-4 rounded-2xl bg-slate-50 relative space-y-3">
                <button
                  onClick={() => removeExperience(exp.id)}
                  className="absolute top-3 right-3 text-slate-400 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Cargo</label>
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) => {
                        const updated = [...resumeData.experiences];
                        updated[expIdx].position = e.target.value;
                        setResumeData({ ...resumeData, experiences: updated });
                      }}
                      className="w-full border border-slate-300 rounded px-2 py-1 text-sm bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Empresa</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => {
                        const updated = [...resumeData.experiences];
                        updated[expIdx].company = e.target.value;
                        setResumeData({ ...resumeData, experiences: updated });
                      }}
                      className="w-full border border-slate-300 rounded px-2 py-1 text-sm bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-500 mb-1">Conquistas e Responsabilidades</label>
                  {exp.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex gap-2 mb-2 items-center">
                      <input
                        type="text"
                        value={bullet}
                        onChange={(e) => {
                          const updated = [...resumeData.experiences];
                          updated[expIdx].bullets[bIdx] = e.target.value;
                          setResumeData({ ...resumeData, experiences: updated });
                        }}
                        className="flex-1 border border-slate-300 rounded px-2 py-1 text-xs bg-white"
                      />
                      <button
                        title="Otimizar frase com IA no padrão do país"
                        disabled={loadingAI}
                        onClick={() => handleOptimizeBullet(expIdx, bIdx)}
                        className="p-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded border border-indigo-200 text-xs flex items-center gap-1"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        IA
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pré-visualização do Documento em Tempo Real */}
        <section className="bg-slate-100/80 border border-slate-200 rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-start overflow-y-auto max-h-[85vh] lg:sticky lg:top-28">
          <div className="w-full mb-3 flex justify-between items-center text-xs text-slate-500 no-print">
            <span>Prévia em Tempo Real (Padrão: {currentRule.templateFormat})</span>
            <span>{currentRule.maxRecommendedPages} pág(s) recomendada(s)</span>
          </div>
          <div className="w-full">
            <ResumePreview data={resumeData} rule={currentRule} />
          </div>
        </section>
      </main>
    </div>
  );
}