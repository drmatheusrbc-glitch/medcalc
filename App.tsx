import React from 'react';
import { Header } from './components/Header';
import { Calculator } from './components/Calculator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Calculadora de Infusão</h2>
          <p className="text-slate-600">
            Selecione a droga, a diluição e insira os dados para calcular a vazão ou a dose em tempo real.
          </p>
        </div>
        
        <Calculator />

        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
          <p className="font-bold mb-1">⚠️ Aviso Legal</p>
          <p>
            Este aplicativo serve apenas como uma ferramenta auxiliar e educacional. 
            Todos os cálculos devem ser conferidos antes da administração. 
            O desenvolvedor não se responsabiliza por erros de dosagem. 
            Sempre consulte os protocolos institucionais.
          </p>
        </div>
      </main>
    </div>
  );
};

export default App;
