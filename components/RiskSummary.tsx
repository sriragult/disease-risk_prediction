
import React from 'react';
import { PredictionResult } from '../types';

interface Props {
  prediction: PredictionResult;
}

export const RiskSummary: React.FC<Props> = ({ prediction }) => {
  const percentage = (prediction.probability * 100).toFixed(1);
  const isAtRisk = prediction.isAtRisk;
  
  const theme = isAtRisk 
    ? {
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-700',
        accent: 'bg-red-600',
        icon: 'fa-triangle-exclamation',
        label: 'RISK DETECTED'
      } 
    : {
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        text: 'text-emerald-700',
        accent: 'bg-emerald-600',
        icon: 'fa-circle-check',
        label: 'NO RISK DETECTED'
      };

  return (
    <div className={`p-8 rounded-3xl border-2 shadow-sm ${theme.border} ${theme.bg} transition-all duration-500`}>
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg ${theme.accent}`}>
            <i className={`fa-solid ${theme.icon} text-2xl`}></i>
          </div>
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.2em] opacity-60 mb-1">Status</h2>
            <p className={`text-3xl font-black ${theme.text}`}>
              {theme.label}
            </p>
          </div>
        </div>
        
        <div className="bg-white/60 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white flex flex-col items-center min-w-[140px]">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Risk Probability</span>
          <span className={`text-4xl font-black tabular-nums ${theme.text}`}>{percentage}%</span>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter text-slate-400 mb-2">
          <span>Safe Range</span>
          <span>Threshold (50%)</span>
          <span>Critical Range</span>
        </div>
        <div className="w-full h-4 bg-white rounded-full overflow-hidden border border-slate-100 p-0.5 relative">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ease-out shadow-sm ${theme.accent}`}
            style={{ width: `${percentage}%` }}
          ></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-300 z-10"></div>
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3">
        <i className={`fa-solid fa-info-circle mt-1 ${theme.text} opacity-50`}></i>
        <p className={`text-sm font-medium leading-relaxed ${theme.text} opacity-90`}>
          {isAtRisk 
            ? "Multiple biometric markers have exceeded the healthy threshold in the Logistic Regression model. Clinical consultation is strongly advised to review these glucose and blood pressure levels."
            : "Your vital markers are currently within the statistically safe range according to our classification model. Continue maintaining a healthy lifestyle."
          }
        </p>
      </div>
    </div>
  );
};
