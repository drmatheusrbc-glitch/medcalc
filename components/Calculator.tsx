
import React, { useState, useMemo, useEffect } from 'react';
import { DRUGS } from '../data/drugs';
import { DrugCategory, DoseUnit } from '../types';

// Icons as SVG components for better performance/no external deps
const Icons = {
  Heart: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
  Zap: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  Activity: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  Moon: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>,
  Lock: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
  Tube: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
  Beaker: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
  Syringe: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg> // Fallback
};

const CategoryConfig: Record<DrugCategory, { icon: React.FC<any>, shortName: string }> = {
  [DrugCategory.VASOPRESSORES]: { icon: Icons.Zap, shortName: 'Vasopressores' },
  [DrugCategory.INOTROPICOS]: { icon: Icons.Heart, shortName: 'Inotrópicos' },
  [DrugCategory.VASODILATADORES]: { icon: Icons.Activity, shortName: 'Vasodilatadores' },
  [DrugCategory.SEDACAO_CONTINUA]: { icon: Icons.Moon, shortName: 'Sedação Cont.' },
  [DrugCategory.BLOQUEADORES]: { icon: Icons.Lock, shortName: 'Bloqueadores' },
  [DrugCategory.SEDACAO_PROCEDIMENTO]: { icon: Icons.Beaker, shortName: 'Sedação Proc.' },
  [DrugCategory.DROGAS_IOT]: { icon: Icons.Tube, shortName: 'IOT' },
};

export const Calculator: React.FC = () => {
  // -- STATE --
  const [selectedCategory, setSelectedCategory] = useState<DrugCategory>(DrugCategory.VASOPRESSORES);
  const [selectedDrugId, setSelectedDrugId] = useState<string>(DRUGS[0].id);
  const [selectedDilutionId, setSelectedDilutionId] = useState<string>('');
  const [weight, setWeight] = useState<string>('70');
  const [mode, setMode] = useState<'dose_to_rate' | 'rate_to_dose'>('dose_to_rate');
  const [inputValue, setInputValue] = useState<string>('');
  
  // -- DERIVED VALUES --
  const availableDrugs = useMemo(() => DRUGS.filter(d => d.category === selectedCategory), [selectedCategory]);
  
  // Sync selectedDrugId when Category changes
  useEffect(() => {
    const currentDrug = DRUGS.find(d => d.id === selectedDrugId);
    if (!currentDrug || currentDrug.category !== selectedCategory) {
      if (availableDrugs.length > 0) {
        setSelectedDrugId(availableDrugs[0].id);
      }
    }
  }, [selectedCategory, availableDrugs, selectedDrugId]);

  // Get the actual Drug object
  const selectedDrug = useMemo(() => 
    DRUGS.find(d => d.id === selectedDrugId) || availableDrugs[0], 
    [selectedDrugId, availableDrugs]
  );
  
  const isBolus = selectedDrug?.isBolus || false;

  // Sync Dilution when Drug changes
  useEffect(() => {
    if (selectedDrug) {
      const validDilution = selectedDrug.dilutions.find(d => d.id === selectedDilutionId);
      if (!validDilution && selectedDrug.dilutions.length > 0) {
        setSelectedDilutionId(selectedDrug.dilutions[0].id);
        setInputValue('');
      }
    }
  }, [selectedDrug, selectedDilutionId]);

  const selectedDilution = useMemo(() => 
    selectedDrug?.dilutions.find(d => d.id === selectedDilutionId) || selectedDrug?.dilutions[0],
    [selectedDrug, selectedDilutionId]
  );

  // -- CALCULATION LOGIC --
  const result = useMemo(() => {
    if (!selectedDrug || !selectedDilution || !inputValue) return null;
    
    const val = parseFloat(inputValue.replace(',', '.'));
    const ptWeight = parseFloat(weight.replace(',', '.'));

    if (isNaN(val)) return null;
    if (selectedDrug.isWeightBased && (isNaN(ptWeight) || ptWeight <= 0)) return null;

    const concVal = selectedDilution.concentration;
    const concUnit = selectedDilution.concentrationUnit;
    const doseUnit = selectedDrug.defaultDoseUnit;

    const isVolumeDose = doseUnit === DoseUnit.ML_KG; 

    // Normalize Concentration Mass
    let normalizedConc = concVal; 
    if (!isVolumeDose) {
        const doseMass = doseUnit.split('/')[0];
        const concMass = concUnit.split('/')[0];
        if (doseMass === 'mcg' && concMass === 'mg') normalizedConc = concVal * 1000;
        else if (doseMass === 'mg' && concMass === 'mcg') normalizedConc = concVal / 1000;
    }

    if (mode === 'dose_to_rate') {
      if (isBolus) {
         let volume: number;
         if (isVolumeDose) {
             volume = val * ptWeight;
         } else {
             let totalMass = val; 
             if (selectedDrug.isWeightBased) totalMass = totalMass * ptWeight;
             volume = totalMass / normalizedConc;
         }
         return { value: volume, unit: 'mL', label: 'Volume a Aspirar' };

      } else {
         let dosePerHour = val;
         if (doseUnit.includes('/min')) dosePerHour = val * 60;
         let totalMassPerHour = dosePerHour;
         if (selectedDrug.isWeightBased) totalMassPerHour = dosePerHour * ptWeight;
         const rate = totalMassPerHour / normalizedConc;
         return { value: rate, unit: 'mL/h', label: 'Vazão da Bomba' };
      }

    } else {
      const inputVolume = val; 
      if (isVolumeDose) {
          const dose = inputVolume / ptWeight;
          return { value: dose, unit: doseUnit, label: 'Dose Administrada' };
      }
      const totalMass = inputVolume * normalizedConc;
      let doseVal = totalMass;
      if (selectedDrug.isWeightBased) doseVal = doseVal / ptWeight;
      if (!isBolus && doseUnit.includes('/min')) doseVal = doseVal / 60;
      return { value: doseVal, unit: doseUnit, label: 'Dose Administrada' };
    }
  }, [inputValue, weight, selectedDrug, selectedDilution, mode, isBolus]);

  // -- HANDLERS --
  const handleCategoryChange = (cat: DrugCategory) => setSelectedCategory(cat);

  const getTargetUnitLabel = () => {
     if (mode === 'dose_to_rate') return selectedDrug?.defaultDoseUnit;
     return isBolus ? 'mL' : 'mL/h';
  };

  if (!selectedDrug) return <div className="p-6 text-center text-slate-500">Carregando dados...</div>;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden ring-1 ring-slate-900/5">
      
      {/* 1. Modern Scrollable Tabs */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="flex overflow-x-auto hide-scrollbar px-2 py-2 gap-2 snap-x">
          {Object.values(DrugCategory).map((cat) => {
            const Config = CategoryConfig[cat] || { icon: Icons.Syringe, shortName: cat };
            const Icon = Config.icon;
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`snap-start flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all flex-shrink-0 ${
                  isActive
                    ? 'bg-white text-medical-700 shadow-sm ring-1 ring-slate-200'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon />
                <span>{Config.shortName}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-6">
        
        {/* 2. Drug & Dilution Selectors (Cards) */}
        <div className="space-y-4">
          <div className="relative group">
            <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs font-semibold text-medical-600">Droga</label>
            <select
              value={selectedDrugId}
              onChange={(e) => setSelectedDrugId(e.target.value)}
              className="w-full p-4 bg-white border border-slate-200 rounded-xl appearance-none focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none text-slate-900 font-medium text-lg shadow-sm transition-all cursor-pointer"
            >
              {availableDrugs.map(drug => (
                <option key={drug.id} value={drug.id}>{drug.name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-medical-600">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>

          <div className="relative group">
            <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs font-semibold text-slate-500">Diluição</label>
            <select
              value={selectedDilutionId}
              onChange={(e) => setSelectedDilutionId(e.target.value)}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl appearance-none focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none text-slate-700 text-sm shadow-sm transition-all cursor-pointer"
            >
              {selectedDrug?.dilutions.map(dilution => (
                <option key={dilution.id} value={dilution.id}>{dilution.description}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        {selectedDrug && selectedDilution && (
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col gap-2 text-sm">
             <div className="flex justify-between items-center">
                <span className="text-slate-500">Concentração</span>
                <span className="font-mono font-bold text-slate-700">{selectedDilution.concentration} {selectedDilution.concentrationUnit}</span>
             </div>
             <div className="flex justify-between items-center">
                <span className="text-slate-500">Dose Usual</span>
                <span className="font-medium text-medical-700 text-right">{selectedDrug.doseRangeDisplay}</span>
             </div>
             {selectedDrug.notes && (
               <div className="mt-2 text-xs text-amber-700 bg-amber-50/50 p-2 rounded border border-amber-100/50">
                 {selectedDrug.notes}
               </div>
             )}
          </div>
        )}

        {/* 3. Segmented Control for Mode */}
        <div className="bg-slate-100 p-1 rounded-xl flex">
            <button
              onClick={() => setMode('dose_to_rate')}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all shadow-sm ${
                mode === 'dose_to_rate' 
                  ? 'bg-white text-medical-700 ring-1 ring-black/5' 
                  : 'bg-transparent text-slate-500 hover:text-slate-700 shadow-none'
              }`}
            >
              Tenho a Dose
            </button>
            <button
              onClick={() => setMode('rate_to_dose')}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all shadow-sm ${
                mode === 'rate_to_dose' 
                  ? 'bg-white text-medical-700 ring-1 ring-black/5' 
                  : 'bg-transparent text-slate-500 hover:text-slate-700 shadow-none'
              }`}
            >
              Tenho a Vazão
            </button>
        </div>

        {/* 4. Inputs */}
        <div className="grid grid-cols-12 gap-4">
          {/* Weight Input */}
          {selectedDrug.isWeightBased && (
             <div className="col-span-4 relative">
               <label className="absolute -top-2 left-2 bg-white px-1 text-xs font-medium text-slate-500">Peso</label>
               <div className="relative">
                 <input
                   type="text"
                   inputMode="decimal"
                   value={weight}
                   onChange={(e) => setWeight(e.target.value)}
                   placeholder="70"
                   className="w-full pl-3 pr-8 py-3.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-medical-500 outline-none text-slate-900 font-semibold text-center"
                 />
                 <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium">kg</span>
               </div>
             </div>
          )}

          {/* Main Value Input */}
          <div className={`${selectedDrug.isWeightBased ? 'col-span-8' : 'col-span-12'} relative`}>
             <label className="absolute -top-2 left-2 bg-white px-1 text-xs font-medium text-medical-600">
               {mode === 'dose_to_rate' ? 'Dose Prescrita' : (isBolus ? 'Volume' : 'Vazão')}
             </label>
             <div className="relative">
               <input
                 type="text"
                 inputMode="decimal"
                 value={inputValue}
                 onChange={(e) => setInputValue(e.target.value)}
                 placeholder="0"
                 className="w-full pl-4 pr-16 py-3.5 bg-white border border-medical-200 rounded-xl focus:ring-2 focus:ring-medical-500 outline-none text-slate-900 font-bold text-xl"
               />
               <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-medical-600 font-bold bg-medical-50 px-1.5 py-0.5 rounded">
                  {getTargetUnitLabel()}
               </span>
             </div>
          </div>
        </div>

        {/* 5. Result Card (High Contrast) */}
        <div className={`relative overflow-hidden rounded-2xl p-6 text-center transition-all duration-300 ${
            result 
            ? 'bg-gradient-to-br from-medical-600 to-medical-700 shadow-lg shadow-medical-200 ring-1 ring-medical-500' 
            : 'bg-slate-100 border border-slate-200'
        }`}>
            {result ? (
                <>
                  <p className="text-medical-100 text-xs font-semibold uppercase tracking-wider mb-1">{result.label}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-white tracking-tight drop-shadow-sm">
                        {result.value.toLocaleString('pt-BR', { maximumFractionDigits: 2, minimumFractionDigits: 0 })}
                    </span>
                    <span className="text-xl font-medium text-medical-100">{result.unit}</span>
                  </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center h-full py-2">
                    <span className="text-slate-400 font-medium text-sm">Insira os valores para calcular</span>
                </div>
            )}
        </div>

      </div>
    </div>
  );
};
