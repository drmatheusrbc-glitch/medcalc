
import { Drug, DrugCategory, DoseUnit } from '../types';

export const DRUGS: Drug[] = [
  // --- VASOPRESSORES ---
  {
    id: 'noradrenalina',
    name: 'Noradrenalina',
    category: DrugCategory.VASOPRESSORES,
    dilutions: [
      {
        id: 'nora_std',
        description: '4 AMP (8mg/4mL) + 234mL SF/SG5%',
        concentration: 64,
        concentrationUnit: 'mcg/mL'
      },
      {
        id: 'nora_conc',
        description: '8 AMP (8mg/4mL) + 128mL SF/SG5%',
        concentration: 128,
        concentrationUnit: 'mcg/mL'
      }
    ],
    defaultDoseUnit: DoseUnit.MCG_KG_MIN,
    isWeightBased: true,
    doseRangeDisplay: '0,01 - 2 mcg/kg/min'
  },
  {
    id: 'dopamina',
    name: 'Dopamina',
    category: DrugCategory.VASOPRESSORES,
    dilutions: [
      {
        id: 'dopa_std',
        description: '5 AMP (50mg/10mL) + 200mL SF/SG5%',
        concentration: 1000,
        concentrationUnit: 'mcg/mL'
      }
    ],
    defaultDoseUnit: DoseUnit.MCG_KG_MIN,
    isWeightBased: true,
    doseRangeDisplay: '5 - 20 mcg/kg/min'
  },
  {
    id: 'adrenalina',
    name: 'Adrenalina',
    category: DrugCategory.VASOPRESSORES,
    dilutions: [
      {
        id: 'adren_std',
        description: '12 AMP (1mg/mL) + 188mL SF/SG5%',
        concentration: 60,
        concentrationUnit: 'mcg/mL'
      }
    ],
    defaultDoseUnit: DoseUnit.MCG_KG_MIN,
    isWeightBased: true,
    doseRangeDisplay: '0,1 - 1 mcg/kg/min (Choque)'
  },
  {
    id: 'vasopressina',
    name: 'Vasopressina',
    category: DrugCategory.VASOPRESSORES,
    dilutions: [
      {
        id: 'vaso_std',
        description: '1 AMP (20U/mL) + 99mL SF/SG5%',
        concentration: 0.2,
        concentrationUnit: 'U/mL'
      },
      {
        id: 'vaso_conc',
        description: '2 AMP (20U/mL) + 99mL SF/SG5%',
        concentration: 0.4,
        concentrationUnit: 'U/mL'
      }
    ],
    defaultDoseUnit: DoseUnit.U_MIN,
    isWeightBased: false,
    doseRangeDisplay: '0,01 - 0,04 U/min'
  },

  // --- INOTRÓPICOS ---
  {
    id: 'dobutamina',
    name: 'Dobutamina',
    category: DrugCategory.INOTROPICOS,
    dilutions: [
      {
        id: 'dobu_std',
        description: '2 AMP (250mg/20mL) + 210mL SF/SG5%',
        concentration: 2000,
        concentrationUnit: 'mcg/mL'
      },
      {
        id: 'dobu_conc',
        description: '4 AMP (250mg/20mL) + 170mL SF/SG5%',
        concentration: 4000,
        concentrationUnit: 'mcg/mL'
      }
    ],
    defaultDoseUnit: DoseUnit.MCG_KG_MIN,
    isWeightBased: true,
    doseRangeDisplay: '2 - 20 mcg/kg/min'
  },
  {
    id: 'milrinone',
    name: 'Milrinone',
    category: DrugCategory.INOTROPICOS,
    dilutions: [
      {
        id: 'mil_std',
        description: '2 AMP (10mg/10mL) + 80mL SF/SG5%',
        concentration: 200,
        concentrationUnit: 'mcg/mL'
      }
    ],
    defaultDoseUnit: DoseUnit.MCG_KG_MIN,
    isWeightBased: true,
    doseRangeDisplay: '0,125 - 0,75 mcg/kg/min'
  },
  {
    id: 'levosimendana',
    name: 'Levosimendana',
    category: DrugCategory.INOTROPICOS,
    dilutions: [
      {
        id: 'levo_std',
        description: '2 AMP (12,5mg/5mL) + 490mL SG5%',
        concentration: 50,
        concentrationUnit: 'mcg/mL'
      }
    ],
    defaultDoseUnit: DoseUnit.MCG_KG_MIN,
    isWeightBased: true,
    doseRangeDisplay: '0,05 - 0,2 mcg/kg/min (Manutenção)'
  },

  // --- VASODILATADORES ---
  {
    id: 'nitroglicerina',
    name: 'Nitroglicerina',
    category: DrugCategory.VASODILATADORES,
    dilutions: [
      {
        id: 'tridil_std',
        description: '1 AMP (50mg/10mL) + 240mL SF/SG5%',
        concentration: 200,
        concentrationUnit: 'mcg/mL'
      }
    ],
    defaultDoseUnit: DoseUnit.MCG_MIN,
    isWeightBased: false,
    doseRangeDisplay: '5 - 400 mcg/min'
  },
  {
    id: 'nitroprussiato',
    name: 'Nitroprussiato (Nipride)',
    category: DrugCategory.VASODILATADORES,
    dilutions: [
      {
        id: 'nipride_std',
        description: '1 AMP (50mg/2mL) + 248mL SG5%',
        concentration: 200,
        concentrationUnit: 'mcg/mL'
      }
    ],
    defaultDoseUnit: DoseUnit.MCG_MIN,
    isWeightBased: false,
    doseRangeDisplay: '5 - 400 mcg/min'
  },

  // --- SEDAÇÃO E ANALGESIA CONTÍNUA ---
  {
    id: 'midazolam',
    name: 'Midazolam (Contínuo)',
    category: DrugCategory.SEDACAO_CONTINUA,
    dilutions: [
      {
        id: 'mida_std',
        description: '4 AMP (50mg/10mL) + 160mL SF/SG5%',
        concentration: 1,
        concentrationUnit: 'mg/mL'
      },
      {
        id: 'mida_conc',
        description: '4 AMP (50mg/10mL) + 210mL SF/SG5%',
        concentration: 0.8,
        concentrationUnit: 'mg/mL'
      }
    ],
    defaultDoseUnit: DoseUnit.MG_KG_H,
    isWeightBased: true,
    doseRangeDisplay: '0,01 - 0,1 mg/kg/h'
  },
  {
    id: 'propofol',
    name: 'Propofol (Contínuo)',
    category: DrugCategory.SEDACAO_CONTINUA,
    dilutions: [
      {
        id: 'propofol_puro',
        description: 'Puro (Frasco 1% ou 2%) - Calculado como 2%',
        concentration: 20,
        concentrationUnit: 'mg/mL', 
      },
      {
        id: 'propofol_1percent',
        description: 'Puro (Frasco 1%)',
        concentration: 10,
        concentrationUnit: 'mg/mL'
      }
    ],
    defaultDoseUnit: DoseUnit.MCG_KG_MIN,
    isWeightBased: true,
    doseRangeDisplay: '5 - 50 mcg/kg/min',
    notes: 'Atenção à concentração do frasco. O PDF refere-se a 2% (20mg/mL) na tabela principal.'
  },
  {
    id: 'quetamina',
    name: 'Quetamina (Contínua)',
    category: DrugCategory.SEDACAO_CONTINUA,
    dilutions: [
      {
        id: 'keta_std',
        description: '1 AMP (100mg/2mL) + 98mL SF/SG5%',
        concentration: 1,
        concentrationUnit: 'mg/mL'
      },
      {
        id: 'keta_conc',
        description: '1 AMP (500mg/10mL) + 240mL SF/SG5%',
        concentration: 2,
        concentrationUnit: 'mg/mL'
      }
    ],
    defaultDoseUnit: DoseUnit.MG_KG_H,
    isWeightBased: true,
    doseRangeDisplay: '0,2 - 0,5 mg/kg/h'
  },
  {
    id: 'dexmedetomidina',
    name: 'Dexmedetomidina (Precedex)',
    category: DrugCategory.SEDACAO_CONTINUA,
    dilutions: [
      {
        id: 'precedex_std',
        description: '2 AMP (200mcg/2mL) + 96mL SF/SG5%',
        concentration: 4,
        concentrationUnit: 'mcg/mL'
      }
    ],
    defaultDoseUnit: DoseUnit.MCG_KG_H,
    isWeightBased: true,
    doseRangeDisplay: '0,2 - 1,5 mcg/kg/h'
  },
  {
    id: 'fentanil',
    name: 'Fentanil (Contínuo)',
    category: DrugCategory.SEDACAO_CONTINUA,
    dilutions: [
      {
        id: 'fenta_puro',
        description: 'Puro (50mcg/mL)',
        concentration: 50,
        concentrationUnit: 'mcg/mL'
      }
    ],
    defaultDoseUnit: DoseUnit.MCG_KG_H,
    isWeightBased: true,
    doseRangeDisplay: '0,7 - 10 mcg/kg/h'
  },
  
  // --- BLOQUEADORES CONTÍNUOS ---
  {
    id: 'rocuronio',
    name: 'Rocurônio (Contínuo)',
    category: DrugCategory.BLOQUEADORES,
    dilutions: [
      {
        id: 'rocu_std',
        description: '5 AMP (50mg/5mL) + 225mL SF/SG5%',
        concentration: 1000,
        concentrationUnit: 'mcg/mL'
      }
    ],
    defaultDoseUnit: DoseUnit.MCG_KG_MIN,
    isWeightBased: true,
    doseRangeDisplay: '8 - 12 mcg/kg/min'
  },

  // --- SEDAÇÃO PROCEDIMENTO (BOLUS) ---
  {
    id: 'propofol_proc',
    name: 'Propofol (Procedimento)',
    category: DrugCategory.SEDACAO_PROCEDIMENTO,
    dilutions: [
      {
        id: 'prop_proc_puro',
        description: '1 Ampola Puro (200mg/20mL)',
        concentration: 10,
        concentrationUnit: 'mg/mL'
      }
    ],
    defaultDoseUnit: DoseUnit.MG_KG,
    isWeightBased: true,
    isBolus: true,
    doseRangeDisplay: '0,75 - 1 mg/kg (Indução)'
  },
  {
    id: 'cetamina_proc',
    name: 'Cetamina (Procedimento)',
    category: DrugCategory.SEDACAO_PROCEDIMENTO,
    dilutions: [
      {
        id: 'ceta_proc_puro',
        description: 'Puro (500mg/10mL ou 100mg/2mL)',
        concentration: 50,
        concentrationUnit: 'mg/mL'
      }
    ],
    defaultDoseUnit: DoseUnit.MG_KG,
    isWeightBased: true,
    isBolus: true,
    doseRangeDisplay: '0,5 - 1 mg/kg (Indução)'
  },
  {
    id: 'ketofol',
    name: 'Ketofol (Ketamina + Propofol)',
    category: DrugCategory.SEDACAO_PROCEDIMENTO,
    dilutions: [
      {
        id: 'ketofol_mix',
        description: '2mL Ketamina + 10mL Propofol + 8mL AD/SF (Total 20mL)',
        concentration: 10,
        concentrationUnit: 'mg/mL', // PDF says 10mg/ml
      }
    ],
    defaultDoseUnit: DoseUnit.ML_KG,
    isWeightBased: true,
    isBolus: true,
    doseRangeDisplay: '0,05 - 0,1 ml/kg (equiv. 0,5-1 ml/10kg)',
    notes: 'Dose usual: 0,5 a 1 ml para cada 10kg de peso.'
  },
  {
    id: 'ketodex',
    name: 'Ketodex (Ketamina + Precedex)',
    category: DrugCategory.SEDACAO_PROCEDIMENTO,
    dilutions: [
      {
        id: 'ketodex_mix',
        description: '2mL Ketamina + 1mL Precedex + 17mL AD/SF',
        concentration: 1, // Dummy concentration, handled by ML_KG
        concentrationUnit: 'ml/ml', 
      }
    ],
    defaultDoseUnit: DoseUnit.ML_KG,
    isWeightBased: true,
    isBolus: true,
    doseRangeDisplay: '0,05 - 0,1 ml/kg (equiv. 0,5-1 ml/10kg)',
    notes: 'Mistura sem concentração de massa única. Dose baseada em volume: 0,5 a 1 ml para cada 10kg.'
  },

  // --- DROGAS IOT (BOLUS) ---
  {
    id: 'fentanil_iot',
    name: 'Fentanil (IOT)',
    category: DrugCategory.DROGAS_IOT,
    dilutions: [
      {
        id: 'fenta_iot_puro',
        description: 'Puro (50mcg/mL)',
        concentration: 50,
        concentrationUnit: 'mcg/mL'
      }
    ],
    defaultDoseUnit: DoseUnit.MCG_KG,
    isWeightBased: true,
    isBolus: true,
    doseRangeDisplay: '3 mcg/kg'
  },
  {
    id: 'lidocaina_iot',
    name: 'Lidocaína 2%',
    category: DrugCategory.DROGAS_IOT,
    dilutions: [
      {
        id: 'lido_puro',
        description: 'Puro (100mg/5mL ou 400mg/20mL)',
        concentration: 20,
        concentrationUnit: 'mg/mL'
      }
    ],
    defaultDoseUnit: DoseUnit.MG_KG,
    isWeightBased: true,
    isBolus: true,
    doseRangeDisplay: '1,5 mg/kg'
  },
  {
    id: 'midazolam_iot',
    name: 'Midazolam (IOT)',
    category: DrugCategory.DROGAS_IOT,
    dilutions: [
      {
        id: 'mida_iot_puro',
        description: 'Puro (50mg/10mL ou 15mg/3mL)',
        concentration: 5,
        concentrationUnit: 'mg/mL'
      }
    ],
    defaultDoseUnit: DoseUnit.MG_KG,
    isWeightBased: true,
    isBolus: true,
    doseRangeDisplay: '0,3 mg/kg'
  },
  {
    id: 'etomidato',
    name: 'Etomidato',
    category: DrugCategory.DROGAS_IOT,
    dilutions: [
      {
        id: 'etom_puro',
        description: 'Puro (20mg/10mL)',
        concentration: 2,
        concentrationUnit: 'mg/mL'
      }
    ],
    defaultDoseUnit: DoseUnit.MG_KG,
    isWeightBased: true,
    isBolus: true,
    doseRangeDisplay: '0,3 mg/kg'
  },
  {
    id: 'cetamina_iot',
    name: 'Cetamina (IOT)',
    category: DrugCategory.DROGAS_IOT,
    dilutions: [
      {
        id: 'ceta_iot_puro',
        description: 'Puro',
        concentration: 50,
        concentrationUnit: 'mg/mL'
      }
    ],
    defaultDoseUnit: DoseUnit.MG_KG,
    isWeightBased: true,
    isBolus: true,
    doseRangeDisplay: '2 mg/kg'
  },
  {
    id: 'propofol_iot',
    name: 'Propofol (IOT)',
    category: DrugCategory.DROGAS_IOT,
    dilutions: [
      {
        id: 'prop_iot_puro',
        description: 'Puro',
        concentration: 10,
        concentrationUnit: 'mg/mL'
      }
    ],
    defaultDoseUnit: DoseUnit.MG_KG,
    isWeightBased: true,
    isBolus: true,
    doseRangeDisplay: '2 mg/kg'
  },
  {
    id: 'succinilcolina',
    name: 'Succinilcolina',
    category: DrugCategory.DROGAS_IOT,
    dilutions: [
      {
        id: 'suc_std',
        description: '100mg/Frasco + 10mL SF/AD',
        concentration: 10,
        concentrationUnit: 'mg/mL'
      }
    ],
    defaultDoseUnit: DoseUnit.MG_KG,
    isWeightBased: true,
    isBolus: true,
    doseRangeDisplay: '1,5 mg/kg'
  },
  {
    id: 'rocuronio_iot',
    name: 'Rocurônio (IOT)',
    category: DrugCategory.DROGAS_IOT,
    dilutions: [
      {
        id: 'roc_iot_puro',
        description: 'Puro (50mg/5mL)',
        concentration: 10,
        concentrationUnit: 'mg/mL'
      }
    ],
    defaultDoseUnit: DoseUnit.MG_KG,
    isWeightBased: true,
    isBolus: true,
    doseRangeDisplay: '1 mg/kg'
  }
];
