import React from 'react';
import { Sliders, Droplet, Sprout, TrendingUp, ShieldAlert } from 'lucide-react';
import { FarmerPriorities } from '../types';
import { Translations } from '../locales/translations';

interface PrioritySlidersProps {
  priorities: FarmerPriorities;
  onChange: (newPriorities: FarmerPriorities) => void;
  t: Translations;
}

export const PrioritySliders: React.FC<PrioritySlidersProps> = ({
  priorities,
  onChange,
  t
}) => {
  const setPreset = (preset: 'water' | 'soil' | 'income' | 'balanced') => {
    if (preset === 'water') {
      onChange({ save_water: 2.8, improve_soil: 1.2, maximize_income: 1.0, reduce_risk: 2.0 });
    } else if (preset === 'soil') {
      onChange({ save_water: 1.5, improve_soil: 3.0, maximize_income: 1.0, reduce_risk: 1.5 });
    } else if (preset === 'income') {
      onChange({ save_water: 1.0, improve_soil: 1.2, maximize_income: 3.0, reduce_risk: 1.0 });
    } else {
      onChange({ save_water: 1.0, improve_soil: 1.0, maximize_income: 1.0, reduce_risk: 1.0 });
    }
  };

  const update = (key: keyof FarmerPriorities, val: number) => {
    onChange({
      ...priorities,
      [key]: val
    });
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
      <div className="pb-3 border-b border-slate-100 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <Sliders className="w-5 h-5 text-emerald-600" />
            <span>{t.step3}</span>
          </h2>
          <p className="text-xs text-slate-500">{t.step3Desc}</p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap gap-1">
          <button
            type="button"
            onClick={() => setPreset('water')}
            className="text-[11px] font-semibold px-2 py-1 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
          >
            💧 Drought Shield
          </button>
          <button
            type="button"
            onClick={() => setPreset('soil')}
            className="text-[11px] font-semibold px-2 py-1 rounded-md bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
          >
            🌱 Soil Rebuild
          </button>
          <button
            type="button"
            onClick={() => setPreset('income')}
            className="text-[11px] font-semibold px-2 py-1 rounded-md bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200"
          >
            💰 Cash Focus
          </button>
          <button
            type="button"
            onClick={() => setPreset('balanced')}
            className="text-[11px] font-semibold px-2 py-1 rounded-md bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
          >
            ⚖️ Balanced
          </button>
        </div>
      </div>

      <div className="space-y-3.5">
        {/* Save Water */}
        <div className="bg-blue-50/40 p-3 rounded-xl border border-blue-100">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5">
            <span className="flex items-center space-x-1.5 text-blue-900">
              <Droplet className="w-4 h-4 text-blue-600" />
              <span>{t.saveWater}</span>
            </span>
            <span className="font-mono text-blue-700 font-extrabold">{priorities.save_water.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="3.0"
            step="0.1"
            value={priorities.save_water}
            onChange={(e) => update('save_water', parseFloat(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>

        {/* Improve Soil */}
        <div className="bg-emerald-50/40 p-3 rounded-xl border border-emerald-100">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5">
            <span className="flex items-center space-x-1.5 text-emerald-900">
              <Sprout className="w-4 h-4 text-emerald-600" />
              <span>{t.improveSoil}</span>
            </span>
            <span className="font-mono text-emerald-700 font-extrabold">{priorities.improve_soil.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="3.0"
            step="0.1"
            value={priorities.improve_soil}
            onChange={(e) => update('improve_soil', parseFloat(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer"
          />
        </div>

        {/* Maximize Income */}
        <div className="bg-amber-50/40 p-3 rounded-xl border border-amber-100">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5">
            <span className="flex items-center space-x-1.5 text-amber-900">
              <TrendingUp className="w-4 h-4 text-amber-600" />
              <span>{t.maximizeIncome}</span>
            </span>
            <span className="font-mono text-amber-700 font-extrabold">{priorities.maximize_income.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="3.0"
            step="0.1"
            value={priorities.maximize_income}
            onChange={(e) => update('maximize_income', parseFloat(e.target.value))}
            className="w-full accent-amber-600 cursor-pointer"
          />
        </div>

        {/* Reduce Risk */}
        <div className="bg-purple-50/40 p-3 rounded-xl border border-purple-100">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5">
            <span className="flex items-center space-x-1.5 text-purple-900">
              <ShieldAlert className="w-4 h-4 text-purple-600" />
              <span>{t.reduceRisk}</span>
            </span>
            <span className="font-mono text-purple-700 font-extrabold">{priorities.reduce_risk.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="3.0"
            step="0.1"
            value={priorities.reduce_risk}
            onChange={(e) => update('reduce_risk', parseFloat(e.target.value))}
            className="w-full accent-purple-600 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
