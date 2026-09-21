export type CountryCode = 'US' | 'CA' | 'GB' | 'DE' | 'JP' | 'AU' | 'IE';

export interface CountryRule {
  code: CountryCode;
  countryName: string;
  templateFormat: 'US_RESUME' | 'EU_CV' | 'JP_RIREKISHO' | 'AU_CV' | 'IE_CV';
  allowPhoto: boolean;
  allowDateOfBirth: boolean;
  allowMaritalStatus: boolean;
  visaStatusRequired: boolean;
  maxRecommendedPages: number;
  currencySymbol: string;
  complianceWarning: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startYear: string;
  endYear: string;
  current: boolean;
}

export interface LanguageItem {
  id: string;
  language: string;
  level: string;
}

export interface InternationalResumeData {
  targetCountry: CountryCode;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  visaStatus: string;
  dateOfBirth?: string;
  maritalStatus?: string;
  photoUrl?: string;
  professionalSummary: string;
  experiences: WorkExperience[];
  education: Education[];
  skills: string[];
  languages: LanguageItem[];
}