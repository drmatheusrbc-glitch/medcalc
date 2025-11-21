import React, { useState, useMemo, useEffect } from 'react';
import { DRUGS } from '../data/drugs';
import { DrugCategory, Drug, DoseUnit } from '../types';

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
  
  // Ensure we have a valid drug selected when category changes
  useEffect(() => {
    const firstDrug = availableDrugs[0];
    if (firstDrug && !availableDrugs.find(d => d.id === selectedDrugId)) {
        setSelectedDrugId(firstDrug.id);
    }
  }, [availableDrugs, selectedDrugId]);

  const selectedDrug = useMemo(() => DRUGS.find(d => d.id === selectedDrugId) || availableDrugs[0], [selectedDrugId, availableDrugs]);
  
  const isBolus = selectedDrug?.isBolus || false;

  // Update selected dilution when drug changes
  useEffect(() => {
    if (selectedDrug) {
      const validDilution = selectedDrug.dilutions.find(d => d.id === selectedDilutionId);
      if (!validDilution) {
        setSelectedDilutionId(selectedDrug.dilutions[0].id);
        setInputValue(''); // Clear input on drug change for safety
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
    const ptWeight = parseFloat(weight);

    if (isNaN(val)) return null;
    if (selectedDrug.isWeightBased && (isNaN(ptWeight) || ptWeight <= 0)) return null;

    // Constants for conversion
    const concVal = selectedDilution.concentration; // e.g. 64
    const concUnit = selectedDilution.concentrationUnit; // e.g. 'mcg/mL'
    const doseUnit = selectedDrug.defaultDoseUnit;

    // Special handling for ml/kg unit (Volume based dosing)
    const isVolumeDose = doseUnit === DoseUnit.ML_KG;

    // Normalize Concentration to Base Amount / mL if not Volume Dose
    let normalizedConc = concVal;
    
    if (!isVolumeDose) {
        const doseNumerator = doseUnit.split('/')[0]; // 'mcg', 'mg', 'U'
        const concNumerator = concUnit.split('/')[0]; // 'mcg', 'mg', 'U'

        if (doseNumerator === 'mcg' && concNumerator === 'mg') {
            normalizedConc = concVal * 1000; // 1 mg/mL = 1000 mcg/mL
        } else if (doseNumerator === 'mg' && concNumerator === 'mcg') {
            normalizedConc = concVal / 1000; // 1000 mcg/mL = 1 mg/mL
        }
        // If units are same (U and U, mg and mg), normalizedConc = concVal
    }

    if (mode === 'dose_to_rate') {
      // Input is Dose. Output is Rate (mL/h) OR Volume (mL) for Bolus.
      
      let totalDose = 0;

      // 1. Calculate Total Dose (per hour if continuous, or absolute if bolus)
      if (isBolus) {
         // Bolus Logic
         if (isVolumeDose) {
             // Unit is mL/kg. Total Dose (mL) = Dose(ml/kg) * Weight
             // Concentration is irrelevant for calculation, return total Volume directly
             const volume = val * ptWeight;
             return {
                 value: volume,
                 unit: 'mL',
                 label: 'Volume da Dose'
             };
         } else {
             // Mass based Bolus (mg/kg, mcg/kg)
             totalDose = val;
         }
      } else {
         // Continuous Infusion Logic
         if (doseUnit.includes('/min')) {
            totalDose = val * 60; // min -> hour
         } else {
            totalDose = val;
         }
      }

      // 2. Handle Weight (applies to both Bolus and Continuous)
      if (selectedDrug.isWeightBased) {
        totalDose = totalDose * ptWeight;
      }

      // 3. Calculate Output (Volume or Rate)
      // For Bolus: Volume = TotalDose / Concentration
      // For Continuous: Rate = TotalDosePerHour / Concentration
      const resultValue = totalDose / normalizedConc;
      
      return {
        value: resultValue,
        unit: isBolus ? 'mL' : 'mL/h',
        label: isBolus ? 'Volume a Administrar' : 'Vazão da Bomba'
      };

    } else {
      // Input is Rate (mL/h) OR Volume (mL). Output is Dose.
      
      const inputVol = val; // mL or mL/h
      
      if (isVolumeDose) {
          // Reverse Volume Dose: Dose (ml/kg) = Volume (ml) / Weight
          const dose = inputVol / ptWeight;
          return {
              value: dose,
              unit: doseUnit,
              label: 'Dose Calculada'
          };
      }

      // Calculate Total Amount (Mass/Units) given
      const totalAmount = inputVol * normalizedConc; // [Mass] or [Mass]/h

      let finalDose = totalAmount;

      // 1. Handle Weight
      if (selectedDrug.isWeightBased) {
        finalDose = finalDose / ptWeight;
      }

      // 2. Handle Time Unit (convert per hour to per min if needed)
      if (!isBolus && doseUnit.includes('/min')) {
        finalDose = finalDose / 60;
      }

      return {
        value: finalDose,
        unit: doseUnit,
        label: 'Dose Calculada'
      };
    }
  }, [inputValue, weight, selectedDrug, selectedDilution, mode, isBolus]);

  // -- HANDLERS --
  const handleCategoryChange = (cat: DrugCategory) => {
    setSelectedCategory(cat);
    // Reset selection logic handled by useEffect
  };

  // UI Helper strings
  const getInputLabel = () => {
    if (mode === 'dose_to_rate') {
      return `Dose Prescrita (${selectedDrug?.defaultDoseUnit})`;
    }
    return isBolus ? 'Volume (mL)' : 'Vazão (mL/h)';
  };

  const getModeLabel = (m: 'dose_to_rate' | 'rate_to_dose') => {
    if (m === 'dose_to_rate') return isBolus ? 'Calcular Volume' : 'Calcular Vazão';
    return 'Calcular Dose';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Category Tabs */}
      <div className="flex overflow-x-auto bg-slate-50 border-b border-slate-200 hide-scrollbar">
        {Object.values(DrugCategory).map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors border-b-2 flex-shrink-0 ${
              selectedCategory === cat
                ? 'border-medical-600 text-medical-700 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="p-6 space-y-6">
        {/* Drug Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Droga</label>
            <div className="relative">
              <select
                value={selectedDrugId}
                onChange={(e) => setSelectedDrugId(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg appearance-none focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition-all text-slate-900 pr-10"
              >
                {availableDrugs.map(drug => (
                  <option key={drug.id} value={drug.id}>
                    {drug.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          {/* Dilution Selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Diluição / Apresentação</label>
            <div className="relative">
              <select
                value={selectedDilutionId}
                onChange={(e) => setSelectedDilutionId(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg appearance-none focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition-all text-slate-900 pr-10"
              >
                {selectedDrug?.dilutions.map(dilution => (
                  <option key={dilution.id} value={dilution.id}>
                    {dilution.description}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        {selectedDrug && selectedDilution && (
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 grid grid-cols-2 gap-4">
            <div>
              <span className="block text-xs text-slate-500 uppercase tracking-wider">Concentração</span>
              <span className="font-mono font-medium text-slate-700">
                {selectedDilution.concentration} {selectedDilution.concentrationUnit}
              </span>
            </div>
            <div>
              <span className="block text-xs text-slate-500 uppercase tracking-wider">Dose Sugerida</span>
              <span className="font-medium text-slate-700">
                {selectedDrug.doseRangeDisplay}
              </span>
            </div>
            {selectedDrug.notes && (
              <div className="col-span-2 text-xs text-amber-700 bg-amber-50 p-2 rounded border border-amber-100 mt-1">
                <strong>Nota:</strong> {selectedDrug.notes}
              </div>
            )}
          </div>
        )}

        <hr className="border-slate-100" />

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          {/* Weight */}
          {selectedDrug?.isWeightBased && (
            <div className="md:col-span-3">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Peso (kg)</label>
              <input
                type="number"
                inputMode="decimal"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full p-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition-all text-slate-900"
                placeholder="70"
              />
            </div>
          )}

          {/* Main Input */}
          <div className={`${selectedDrug?.isWeightBased ? 'md:col-span-9' : 'md:col-span-12'}`}>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-slate-700">{getInputLabel()}</label>
              
              {/* Toggle Mode */}
              <div className="flex bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setMode('dose_to_rate')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    mode === 'dose_to_rate' ? 'bg-white text-medical-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {getModeLabel('dose_to_rate')}
                </button>
                <button
                  onClick={() => setMode('rate_to_dose')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    mode === 'rate_to_dose' ? 'bg-white text-medical-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {getModeLabel('rate_to_dose')}
                </button>
              </div>
            </div>
            
            <input
              type="number"
              inputMode="decimal"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full p-3 text-lg font-medium bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition-all text-slate-900 placeholder-slate-300"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Result */}
        <div className={`rounded-xl p-6 text-center transition-all duration-300 ${result ? 'bg-medical-50 border border-medical-100' : 'bg-slate-50 border border-slate-100 opacity-70'}`}>
          <p className="text-sm text-slate-500 font-medium mb-1">
            {result ? result.label : 'Aguardando dados...'}
          </p>
          {result ? (
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-medical-700 tracking-tight">
                {result.value.toLocaleString('pt-BR', { maximumFractionDigits: 2, minimumFractionDigits: 0 })}
              </span>
              <span className="text-medical-600 font-medium mt-1">{result.unit}</span>
            </div>
          ) : (
            <span className="text-2xl font-bold text-slate-300">---</span>
          )}
        </div>

      </div>
    </div>
  );
};