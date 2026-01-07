
import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea, Label } from 'recharts';
import { VitalsData } from '../types';

interface Props {
  currentVitals: VitalsData;
}

export const DecisionPlot: React.FC<Props> = ({ currentVitals }) => {
  const data = [
    { bp: 110, glucose: 80, type: 'healthy' },
    { bp: 115, glucose: 90, type: 'healthy' },
    { bp: 125, glucose: 85, type: 'healthy' },
    { bp: 105, glucose: 95, type: 'healthy' },
    { bp: 135, glucose: 110, type: 'at-risk' },
    { bp: 145, glucose: 140, type: 'at-risk' },
    { bp: 155, glucose: 130, type: 'at-risk' },
    { bp: 165, glucose: 180, type: 'at-risk' },
    { bp: 130, glucose: 160, type: 'at-risk' },
  ];

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-lg font-black text-slate-800 uppercase tracking-tighter">Feature Space Mapping</h3>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Systolic BP vs Glucose interaction</p>
      </div>
      
      <div className="flex-1 min-h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              type="number" 
              dataKey="bp" 
              name="Systolic BP" 
              unit="mmHg" 
              domain={[80, 200]} 
              stroke="#cbd5e1"
              fontSize={10}
              tick={{ fontWeight: 'bold' }}
            >
              <Label value="Systolic BP" offset={-15} position="insideBottom" style={{ fill: '#94a3b8', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }} />
            </XAxis>
            <YAxis 
              type="number" 
              dataKey="glucose" 
              name="Glucose" 
              unit="mg/dL" 
              domain={[60, 200]} 
              stroke="#cbd5e1"
              fontSize={10}
              tick={{ fontWeight: 'bold' }}
            >
              <Label value="Glucose" angle={-90} position="insideLeft" style={{ fill: '#94a3b8', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }} />
            </YAxis>
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
              cursor={{ strokeDasharray: '3 3' }} 
            />
            
            <ReferenceArea x1={80} x2={130} y1={60} y2={120} fill="#f0fdf4" fillOpacity={0.6} />
            <ReferenceArea x1={130} x2={200} y1={120} y2={200} fill="#fef2f2" fillOpacity={0.6} />

            <Scatter name="Historical (Healthy)" data={data.filter(d => d.type === 'healthy')} fill="#10b981" shape="circle" fillOpacity={0.6} />
            <Scatter name="Historical (At-Risk)" data={data.filter(d => d.type === 'at-risk')} fill="#ef4444" shape="circle" fillOpacity={0.6} />
            
            <Scatter 
              name="Current Patient" 
              data={[{ bp: currentVitals.systolicBP, glucose: currentVitals.glucose }]} 
              fill="#2563eb" 
              shape="cross" 
              strokeWidth={3}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-2 text-[9px] font-black uppercase tracking-widest text-slate-500 border-t border-slate-50 pt-4">
        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-400"></div> Healthy</div>
        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-400"></div> Risk</div>
        <div className="flex items-center gap-1.5 text-blue-600"><i className="fa-solid fa-plus"></i> Current</div>
      </div>
    </div>
  );
};
