import { CountryCode, CountryRule } from '@/types/resume';

export interface VisaOption {
  id: string;
  label: string;
  recommendedText: string;
}

export const COUNTRY_VISA_OPTIONS: Record<CountryCode, VisaOption[]> = {
  IE: [
    {
      id: 'ie_stamp_2',
      label: 'Stamp 2 (Student Visa)',
      recommendedText: 'Stamp 2 Visa: Eligible to work 20 hrs/week (term-time) and 40 hrs/week (June-Sept & Dec 15-Jan 15).'
    },
    {
      id: 'ie_stamp_1g',
      label: 'Stamp 1G (Third Level Graduate Scheme)',
      recommendedText: 'Stamp 1G Graduate Visa: Full-time work rights in Ireland without work permit requirement.'
    },
    {
      id: 'ie_stamp_4',
      label: 'Stamp 4 (Full Work Rights / Permanent)',
      recommendedText: 'Stamp 4: Unrestricted and full right to work in Ireland.'
    },
    {
      id: 'ie_eu_citizen',
      label: 'EU / EEA Citizen',
      recommendedText: 'EU Citizen: Full right to work in Ireland without restrictions.'
    },
    {
      id: 'ie_needs_sponsorship',
      label: 'Requires Work Permit Sponsorship',
      recommendedText: 'Eligible for Critical Skills Employment Permit sponsorship.'
    }
  ],
  US: [
    {
      id: 'us_authorized',
      label: 'Authorized to work (Green Card / Citizen)',
      recommendedText: 'Authorized to work in the US for any employer.'
    },
    {
      id: 'us_opt_cpt',
      label: 'F-1 (OPT / STEM OPT / CPT)',
      recommendedText: 'F-1 Visa: Valid OPT / Work authorization with STEM extension eligibility.'
    },
    {
      id: 'us_needs_sponsorship',
      label: 'Requires Sponsorship (H-1B / O-1)',
      recommendedText: 'Will require visa sponsorship now or in the future.'
    }
  ],
  CA: [
    {
      id: 'ca_pr_citizen',
      label: 'Permanent Resident / Citizen',
      recommendedText: 'Legally authorized to work in Canada without restrictions.'
    },
    {
      id: 'ca_pgwp',
      label: 'Post-Graduation Work Permit (PGWP)',
      recommendedText: 'PGWP: Full-time open work permit valid across Canada.'
    },
    {
      id: 'ca_whv',
      label: 'Working Holiday (IEC)',
      recommendedText: 'IEC Working Holiday Visa: Valid open work permit.'
    }
  ],
  GB: [
    {
      id: 'gb_graduate',
      label: 'Graduate Route Visa',
      recommendedText: 'Graduate Route Visa: Full right to work in the UK without sponsorship.'
    },
    {
      id: 'gb_student',
      label: 'Student Visa (20h/week)',
      recommendedText: 'Student Visa: Permitted to work up to 20 hours per week during term time.'
    },
    {
      id: 'gb_settled',
      label: 'Settled / Pre-Settled / Citizen',
      recommendedText: 'Right to Work: Settled Status / Full UK work authorization.'
    }
  ],
  DE: [
    {
      id: 'de_eu_citizen',
      label: 'EU Citizen',
      recommendedText: 'EU-Bürger: Unbeschränkte Arbeitserlaubnis in Deutschland.'
    },
    {
      id: 'de_blue_card',
      label: 'Blue Card (Blaue Karte EU) Eligible',
      recommendedText: 'Berechtigt für die Blaue Karte EU / Fachkraftvisum.'
    },
    {
      id: 'de_student',
      label: 'Student Visa (140 full / 280 half days)',
      recommendedText: 'Studentenvisum: Arbeitserlaubnis für 140 volle oder 280 halbe Tage/Jahr.'
    }
  ],
  JP: [
    {
      id: 'jp_engineer',
      label: '技術・人文知識・国際業務 (Engineer/Specialist)',
      recommendedText: '在留資格：「技術・人文知識・国際業務」（就労可能）'
    },
    {
      id: 'jp_student',
      label: '留学（資格外活動許可 28時間/週）',
      recommendedText: '在留資格：「留学」（資格外活動許可取得済：週28時間まで就労可）'
    },
    {
      id: 'jp_whv',
      label: '特定活動（ワーキングホリデー）',
      recommendedText: '在留資格：「特定活動」（ワーキングホリデー・フルタイム就労可）'
    },
    {
      id: 'jp_permanent',
      label: '永住者 / 定住者 / 配偶者',
      recommendedText: '在留資格：「永住者」（就労制限なし）'
    }
  ],
  AU: [
    {
      id: 'au_whv',
      label: 'Working Holiday (Subclass 417/462)',
      recommendedText: 'Working Holiday Visa (Subclass 417/462): Full-time work rights in Australia.'
    },
    {
      id: 'au_student',
      label: 'Student Visa (Subclass 500)',
      recommendedText: 'Student Visa (Subclass 500): Work authorization up to 48 hrs per fortnight.'
    },
    {
      id: 'au_pr_citizen',
      label: 'Australian Citizen / Permanent Resident',
      recommendedText: 'Australian Citizen / Permanent Resident: Unrestricted work rights.'
    }
  ]
};

export const COUNTRY_RULES: Record<CountryCode, CountryRule> = {
  IE: {
    code: 'IE',
    countryName: 'Irlanda',
    templateFormat: 'IE_CV',
    allowPhoto: false,
    allowDateOfBirth: false,
    allowMaritalStatus: false,
    visaStatusRequired: true,
    maxRecommendedPages: 2,
    currencySymbol: '€',
    complianceWarning: 'Conforme a legislação de igualdade no trabalho da Irlanda, fotos, idade, estado civil e PPSN não devem constar no CV.'
  },
  US: {
    code: 'US',
    countryName: 'Estados Unidos',
    templateFormat: 'US_RESUME',
    allowPhoto: false,
    allowDateOfBirth: false,
    allowMaritalStatus: false,
    visaStatusRequired: true,
    maxRecommendedPages: 1,
    currencySymbol: '$',
    complianceWarning: 'Regras da EEOC proíbem fotos, idade, gênero e dados civis para evitar processos por discriminação.'
  },
  CA: {
    code: 'CA',
    countryName: 'Canadá',
    templateFormat: 'US_RESUME',
    allowPhoto: false,
    allowDateOfBirth: false,
    allowMaritalStatus: false,
    visaStatusRequired: true,
    maxRecommendedPages: 1,
    currencySymbol: '$',
    complianceWarning: 'Leis de direitos humanos no Canadá recomendam formato estritamente sem foto e sem dados pessoais.'
  },
  GB: {
    code: 'GB',
    countryName: 'Reino Unido',
    templateFormat: 'EU_CV',
    allowPhoto: false,
    allowDateOfBirth: false,
    allowMaritalStatus: false,
    visaStatusRequired: true,
    maxRecommendedPages: 2,
    currencySymbol: '£',
    complianceWarning: 'Padrão do mercado britânico: 2 páginas sem foto, destacando o Right-to-Work.'
  },
  DE: {
    code: 'DE',
    countryName: 'Alemanha',
    templateFormat: 'EU_CV',
    allowPhoto: true,
    allowDateOfBirth: true,
    allowMaritalStatus: false,
    visaStatusRequired: true,
    maxRecommendedPages: 2,
    currencySymbol: '€',
    complianceWarning: 'Na região DACH, uma foto profissional formal (Bewerbungsfoto) e data de nascimento são aceitas.'
  },
  JP: {
    code: 'JP',
    countryName: 'Japão',
    templateFormat: 'JP_RIREKISHO',
    allowPhoto: true,
    allowDateOfBirth: true,
    allowMaritalStatus: true,
    visaStatusRequired: true,
    maxRecommendedPages: 2,
    currencySymbol: '¥',
    complianceWarning: 'Padrão tradicional JIS: exige foto 3x4 formal, idade, estado civil e status de permanência (在留資格).'
  },
  AU: {
    code: 'AU',
    countryName: 'Austrália',
    templateFormat: 'AU_CV',
    allowPhoto: false,
    allowDateOfBirth: false,
    allowMaritalStatus: false,
    visaStatusRequired: true,
    maxRecommendedPages: 3,
    currencySymbol: '$',
    complianceWarning: 'Mercado australiano: CV de 2 a 3 páginas com foco em competências e clareza do visto.'
  }
};