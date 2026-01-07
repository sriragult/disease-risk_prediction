
export interface VitalsData {
  age: number;
  systolicBP: number; 
  diastolicBP: number;
  glucose: number; // mg/dL
}

export interface PredictionResult {
  probability: number;
  isAtRisk: boolean;
  score: number; // Logit score
}

export interface HealthInsight {
  summary: string;
  recommendations: string[];
  riskFactors: string[];
}

export type ThemeKey = 'blue' | 'emerald' | 'violet' | 'amber';

export interface ThemeConfig {
  name: string;
  primary: string;
  gradient: string;
  light: string;
  border: string;
  ring: string;
  text: string;
  accent: string;
}
