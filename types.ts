
export const DrugCategory = {
  VASOPRESSORES: 'Vasopressores',
  INOTROPICOS: 'Inotrópicos',
  VASODILATADORES: 'Vasodilatadores',
  SEDACAO_CONTINUA: 'Sedação/Analgesia Contínua',
  BLOQUEADORES: 'Bloqueadores Neuromusculares',
  SEDACAO_PROCEDIMENTO: 'Sedação Procedimento',
  DROGAS_IOT: 'Drogas IOT (Intubação)'
} as const;

export type DrugCategory = typeof DrugCategory[keyof typeof DrugCategory];

export const DoseUnit = {
  MCG_KG_MIN: 'mcg/kg/min',
  MCG_MIN: 'mcg/min',
  MG_KG_H: 'mg/kg/h',
  MCG_KG_H: 'mcg/kg/h',
  U_MIN: 'U/min',
  U_KG_H: 'U/kg/h',
  MG_KG: 'mg/kg', // Bolus mass
  MCG_KG: 'mcg/kg', // Bolus mass
  ML_KG: 'ml/kg' // Bolus volume
} as const;

export type DoseUnit = typeof DoseUnit[keyof typeof DoseUnit];

export interface DilutionOption {
  id: string;
  description: string; // e.g. "4 AMP + 234ML SF/SG5%"
  concentration: number; // value
  concentrationUnit: string; // e.g. "mcg/ml"
}

export interface Drug {
  id: string;
  name: string;
  category: DrugCategory;
  dilutions: DilutionOption[];
  defaultDoseUnit: DoseUnit;
  isWeightBased: boolean;
  isBolus?: boolean; // If true, calculates Volume (mL) instead of Rate (mL/h)
  doseRangeDisplay: string; // Text to show user e.g. "0.01 - 2 mcg/kg/min"
  notes?: string;
}
