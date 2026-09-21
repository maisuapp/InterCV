'use client';

import React from 'react';
import { InternationalResumeData, CountryRule } from '@/types/resume';

interface Props {
  data: InternationalResumeData;
  rule: CountryRule;
}

export const ResumePreview: React.FC<Props> = ({ data, rule }) => {
  const isJapan = rule.code === 'JP';

  if (isJapan) {
    return (
      <div className="bg-white text-gray-900 p-8 shadow-md rounded-lg max-w-2xl mx-auto print-area border border-gray-300 font-sans text-xs">
        <div className="border-b-2 border-gray-900 pb-2 mb-4 flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold tracking-widest">履 歴 書</h1>
            <p className="text-gray-600 mt-1">{new Date().toLocaleDateString('ja-JP')} 現在</p>
          </div>
          {rule.allowPhoto && (
            <div className="w-24 h-32 border border-dashed border-gray-400 flex items-center justify-center text-gray-400 bg-gray-50 text-center p-1">
              {data.photoUrl ? (
                <img src={data.photoUrl} alt="Foto Formal" className="w-full h-full object-cover" />
              ) : (
                <span>写真貼付 (3x4 cm)</span>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 bg-gray-50 p-3 rounded border border-gray-200">
          <div>
            <p className="text-gray-500 font-medium">氏名 / Nome</p>
            <p className="text-base font-bold text-gray-800">{data.fullName || '氏名 未入力'}</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">生年月日 / Data de Nascimento</p>
            <p className="text-gray-800">{data.dateOfBirth || '-'}</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">連絡先 / Contato</p>
            <p className="text-gray-800">{data.phone} | {data.email}</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">現住所 / Endereço</p>
            <p className="text-gray-800">{data.location || '-'}</p>
          </div>
        </div>

        {data.visaStatus && (
          <div className="mb-4 bg-blue-50 border border-blue-200 p-2 rounded">
            <span className="font-bold text-blue-900">在留資格 / Status de Visto: </span>
            <span className="text-blue-800">{data.visaStatus}</span>
          </div>
        )}

        <div className="mb-4">
          <h2 className="font-bold border-b border-gray-400 pb-1 mb-2 text-sm text-gray-800">職務経歴 (Histórico Profissional)</h2>
          {data.experiences.map((exp) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between font-semibold text-gray-700">
                <span>{exp.company} — {exp.position}</span>
                <span className="text-gray-500">{exp.startDate} 〜 {exp.current ? '現在' : exp.endDate}</span>
              </div>
              <ul className="list-disc list-inside text-gray-600 mt-1 space-y-1">
                {exp.bullets.filter(b => b.trim().length > 0).map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h2 className="font-bold border-b border-gray-400 pb-1 mb-2 text-sm text-gray-800">志望動機・自己PR (Motivação e Resumo)</h2>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">{data.professionalSummary || '未入力'}</p>
        </div>

        <div>
          <h2 className="font-bold border-b border-gray-400 pb-1 mb-2 text-sm text-gray-800">語学力・資格 (Idiomas e Habilidades)</h2>
          <div className="flex flex-wrap gap-2">
            {data.languages.map((l) => (
              <span key={l.id} className="bg-gray-100 border border-gray-300 px-2 py-1 rounded text-gray-700">
                {l.language}: {l.level}
              </span>
            ))}
            {data.skills.map((s, i) => (
              <span key={i} className="bg-gray-100 border border-gray-300 px-2 py-1 rounded text-gray-700">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Padrão Ocidental / Internacional (EUA, Canadá, Irlanda, Reino Unido, Europa, Austrália)
  return (
    <div className="bg-white text-gray-800 p-8 shadow-md rounded-lg max-w-2xl mx-auto print-area font-sans">
      {/* Cabeçalho */}
      <div className="border-b border-gray-300 pb-4 mb-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{data.fullName || 'Seu Nome'}</h1>
        <div className="text-xs text-gray-600 mt-1 flex flex-wrap justify-center gap-x-3">
          {data.location && <span>{data.location}</span>}
          {data.phone && <span>• {data.phone}</span>}
          {data.email && <span>• {data.email}</span>}
          {data.linkedin && <span>• {data.linkedin}</span>}
        </div>

        {/* Destaque Obrigatório de Visto / Right to Work */}
        {data.visaStatus && (
          <div className="mt-2 inline-block bg-slate-100 border border-slate-300 px-3 py-1 rounded-full text-xs font-medium text-slate-800">
            <strong>Right to Work / Visa:</strong> {data.visaStatus}
          </div>
        )}
      </div>

      {/* Resumo Profissional */}
      {data.professionalSummary && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700 border-b border-gray-200 pb-1 mb-2">
            Professional Summary
          </h2>
          <p className="text-xs text-gray-600 leading-relaxed">{data.professionalSummary}</p>
        </div>
      )}

      {/* Experiência Profissional */}
      {data.experiences.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700 border-b border-gray-200 pb-1 mb-2">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {data.experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline text-xs">
                  <span className="font-bold text-gray-800">{exp.position}</span>
                  <span className="text-gray-500 font-medium">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-xs text-gray-600 italic mb-1">
                  {exp.company} {exp.location && `• ${exp.location}`}
                </div>
                <ul className="list-disc list-outside ml-4 text-xs text-gray-600 space-y-1">
                  {exp.bullets.filter(b => b.trim().length > 0).map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Educação */}
      {data.education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700 border-b border-gray-200 pb-1 mb-2">
            Education
          </h2>
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between text-xs">
                <div>
                  <span className="font-bold text-gray-800">{edu.degree} in {edu.fieldOfStudy}</span>
                  <p className="text-gray-600">{edu.institution} {edu.location && `• ${edu.location}`}</p>
                </div>
                <span className="text-gray-500 font-medium">
                  {edu.startYear} – {edu.current ? 'Present' : edu.endYear}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Competências e Idiomas */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700 border-b border-gray-200 pb-1 mb-2">
          Skills & Languages
        </h2>
        <div className="text-xs text-gray-600 space-y-1">
          {data.skills.length > 0 && (
            <p><strong>Core Competencies:</strong> {data.skills.join(', ')}</p>
          )}
          {data.languages.length > 0 && (
            <p>
              <strong>Languages:</strong>{' '}
              {data.languages.map((l) => `${l.language} (${l.level})`).join(', ')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};