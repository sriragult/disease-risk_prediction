
import React from 'react';
import { VitalsData, PredictionResult, HealthInsight, ThemeKey, ThemeConfig } from './types';
import { predictRisk } from './utils/logisticRegression';
import { getClinicalInsight } from './services/geminiService';
import { VitalsForm } from './components/VitalsForm';
import { RiskSummary } from './components/RiskSummary';
import { DecisionPlot } from './components/DecisionPlot';
import { AiInsightView } from './components/AiInsightView';

const THEMES: Record<ThemeKey, ThemeConfig> = {
  blue: {
    name: 'Clinical Blue',
    primary: 'blue-600',
    gradient: 'from-blue-600 to-indigo-700',
    light: 'bg-blue-50',
    border: 'border-blue-100',
    ring: 'ring-blue-500/10',
    text: 'text-blue-600',
    accent: 'blue-400'
  },
  emerald: {
    name: 'Vital Emerald',
    primary: 'emerald-600',
    gradient: 'from-emerald-600 to-teal-700',
    light: 'bg-emerald-50',
    border: 'border-emerald-100',
    ring: 'ring-emerald-500/10',
    text: 'text-emerald-600',
    accent: 'emerald-400'
  },
  violet: {
    name: 'Modern Violet',
    primary: 'violet-600',
    gradient: 'from-violet-600 to-fuchsia-700',
    light: 'bg-violet-50',
    border: 'border-violet-100',
    ring: 'ring-violet-500/10',
    text: 'text-violet-600',
    accent: 'violet-400'
  },
  amber: {
    name: 'Sunset Amber',
    primary: 'amber-600',
    gradient: 'from-amber-500 to-orange-700',
    light: 'bg-amber-50',
    border: 'border-amber-100',
    ring: 'ring-amber-500/10',
    text: 'text-amber-600',
    accent: 'amber-400'
  }
};

const App: React.FC = () => {
  const [vitals, setVitals] = React.useState<VitalsData>({ age: 45, systolicBP: 120, diastolicBP: 80, glucose: 90 });
  const [prediction, setPrediction] = React.useState<PredictionResult | null>(null);
  const [insight, setInsight] = React.useState<HealthInsight | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentThemeKey, setCurrentThemeKey] = React.useState<ThemeKey>('blue');

  const theme = THEMES[currentThemeKey];

  const handlePredict = async (data: VitalsData) => {
    setIsLoading(true);
    setVitals(data);
    
    const result = predictRisk(data);
    setPrediction(result);

    try {
      const clinicalInsight = await getClinicalInsight(data, result);
      setInsight(clinicalInsight);
    } catch (error) {
      console.error("Failed to fetch clinical insights:", error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    handlePredict(vitals);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 selection:bg-blue-100 transition-colors duration-500">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${theme.gradient} rounded-2xl flex items-center justify-center text-white shadow-xl shadow-${theme.primary}/20 rotate-3 transition-all duration-500`}>
              <i className="fa-solid fa-notes-medical text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-slate-900 leading-none">
                VitalsRisk <span className={theme.text}>Pro</span>
              </h1>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Classification Engine</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
              {(Object.keys(THEMES) as ThemeKey[]).map((tk) => (
                <button
                  key={tk}
                  onClick={() => setCurrentThemeKey(tk)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    currentThemeKey === tk 
                      ? `bg-white shadow-sm ring-2 ring-${THEMES[tk].primary}/20` 
                      : 'hover:bg-slate-200'
                  }`}
                  title={THEMES[tk].name}
                >
                  <div className={`w-4 h-4 rounded-full bg-${THEMES[tk].primary}`}></div>
                </button>
              ))}
            </div>

            <div className="hidden sm:flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
              <span className={`w-2 h-2 rounded-full bg-${theme.primary} animate-pulse`}></span>
              <span className="text-xs font-bold text-slate-600">{theme.name} Active</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-10 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-4 space-y-8">
            <section className="sticky top-28">
              <VitalsForm onPredict={handlePredict} isLoading={isLoading} theme={theme} />
              
              <div className="mt-8 bg-slate-900 p-8 rounded-[2rem] text-white shadow-2xl shadow-slate-300">
                <div className="flex items-center gap-3 mb-4">
                  <i className={`fa-solid fa-circle-info text-${theme.accent}`}></i>
                  <h4 className="font-black uppercase tracking-widest text-[10px]">Statistical Framework</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  Analysis is driven by a <span className="text-white">supervised learning</span> model utilizing sigmoid classification to isolate risk factors within physiological data.
                </p>
                <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[9px] font-black uppercase text-slate-500 mb-1">Threshold</div>
                      <div className="text-sm font-bold">P(Y) {">"} 0.5</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-black uppercase text-slate-500 mb-1">Loss Func</div>
                    <div className="text-sm font-bold">Log-Loss</div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-8 space-y-10">
            {prediction && (
              <section className="animate-in fade-in slide-in-from-top-4 duration-700">
                <RiskSummary prediction={prediction} />
              </section>
            )}

            <div className="grid md:grid-cols-2 gap-8 items-stretch">
               <section className="h-full">
                <DecisionPlot currentVitals={vitals} />
              </section>
              <section className="h-full flex flex-col justify-center bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-${theme.primary} opacity-[0.03] rounded-full -mr-16 -mt-16 transition-all duration-500 group-hover:scale-110`}></div>
                <h4 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                   <i className={`fa-solid fa-wave-square ${theme.text}`}></i>
                   Activation Logit
                </h4>
                <div className="relative h-40 w-full flex items-center justify-center">
                   <svg viewBox="0 0 100 40" className={`w-full h-full text-${theme.accent}/20 stroke-current fill-none stroke-[2]`}>
                     <path d="M0,35 Q50,35 50,20 T100,5" />
                   </svg>
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-50">
                        <span className="text-[10px] font-black text-slate-400 block mb-1 uppercase tracking-tighter">Raw Output</span>
                        <span className={`text-3xl font-black ${theme.text}`}>{(prediction?.probability || 0).toFixed(5)}</span>
                      </div>
                   </div>
                </div>
                <p className="text-[10px] text-slate-400 text-center mt-6 font-bold uppercase tracking-widest">
                  Probability mapped to non-linear distribution
                </p>
              </section>
            </div>

            <section className="animate-in fade-in zoom-in-95 duration-1000">
              <AiInsightView insight={insight} isLoading={isLoading} theme={theme} />
            </section>
          </div>
        </div>
      </main>

      <footer className="mt-24 border-t border-slate-200 py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-4 group cursor-help">
             <div className={`w-12 h-12 rounded-xl ${theme.light} flex items-center justify-center ${theme.text} transition-colors duration-500`}>
                <i className="fa-solid fa-fingerprint text-xl"></i>
             </div>
             <div className="text-left">
               <p className="font-black text-xs uppercase tracking-[0.2em] text-slate-800">Privacy First</p>
               <p className="text-[10px] text-slate-400 font-medium">End-to-end encrypted inference</p>
             </div>
          </div>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] text-center max-w-xs">
            &copy; 2024 VitalsRisk AI Lab &bull; Pioneering Predictive Health Modeling
          </p>
          <div className="flex gap-6 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all">
            <i className="fa-brands fa-react text-2xl"></i>
            <i className="fa-solid fa-microchip text-2xl"></i>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
