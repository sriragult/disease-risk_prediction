
import React from 'react';
import { VitalsData, ThemeConfig } from '../types';

interface Props {
  onPredict: (data: VitalsData) => void;
  isLoading: boolean;
  theme: ThemeConfig;
}

export const VitalsForm: React.FC<Props> = ({ onPredict, isLoading, theme }) => {
  const [formData, setFormData] = React.useState<VitalsData>({
    age: 45,
    systolicBP: 120,
    diastolicBP: 80,
    glucose: 90
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const InputField = ({ label, name, value, min, max, unit, icon, sub }: any) => (
    <div className="group">
      <label className={`flex items-center gap-2 text-xs font-black text-slate-500 mb-2 uppercase tracking-widest transition-colors group-focus-within:${theme.text}`}>
        <i className={`fa-solid ${icon} w-4`}></i>
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          name={name}
          value={value}
          onChange={handleChange}
          className={`w-full pl-5 pr-16 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:border-${theme.primary} focus:ring-4 focus:${theme.ring} focus:outline-none transition-all font-bold text-slate-800 shadow-sm`}
          min={min}
          max={max}
          required
        />
        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 uppercase tracking-tighter">
          {unit}
        </div>
      </div>
      <p className="text-[10px] text-slate-400 mt-2 ml-1 font-medium italic opacity-70">{sub}</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden transition-all duration-500">
      <div className={`absolute top-0 right-0 p-6 opacity-[0.03] text-${theme.accent}`}>
        <i className="fa-solid fa-heart-pulse text-9xl"></i>
      </div>
      
      <h3 className="text-2xl font-black text-slate-800 mb-10 flex items-center gap-4">
        <span className={`w-2 h-10 bg-${theme.primary} rounded-full shadow-lg shadow-${theme.primary}/20`}></span>
        Data Entry
      </h3>
      
      <div className="space-y-8">
        <InputField 
          label="Subject Age" 
          name="age" 
          value={formData.age} 
          min="1" max="120" 
          unit="years" 
          icon="fa-calendar-day" 
          sub="Logistic weight factor: 0.05"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField 
            label="Systolic BP" 
            name="systolicBP" 
            value={formData.systolicBP} 
            min="70" max="250" 
            unit="mmHg" 
            icon="fa-gauge-high" 
            sub="Normal: <120"
          />
          <InputField 
            label="Diastolic BP" 
            name="diastolicBP" 
            value={formData.diastolicBP} 
            min="40" max="150" 
            unit="mmHg" 
            icon="fa-gauge" 
            sub="Normal: <80"
          />
        </div>

        <InputField 
          label="Blood Glucose" 
          name="glucose" 
          value={formData.glucose} 
          min="40" max="400" 
          unit="mg/dL" 
          icon="fa-droplet" 
          sub="Fasting baseline: 70-99 mg/dL"
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full mt-6 bg-slate-900 hover:bg-black text-white font-black py-5 rounded-2xl shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-4 disabled:opacity-50 active:scale-95 group overflow-hidden relative`}
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
          <div className="relative z-10 flex items-center gap-4">
            {isLoading ? (
              <i className="fa-solid fa-circle-notch animate-spin"></i>
            ) : (
              <>
                <span className="tracking-[0.2em] uppercase text-xs">Run Classification</span>
                <i className="fa-solid fa-microchip text-sm transition-transform group-hover:rotate-12"></i>
              </>
            )}
          </div>
        </button>
      </div>
    </form>
  );
};
