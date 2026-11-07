import React from 'react';
import { Sliders, Shield, Sprout, DollarSign } from 'lucide-react';
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
  const setPreset = (preset: 'water' | 'soil' | 'income') => {
    if (preset === 'water') {
      onChange({ save_water: 2.8, improve_soil: 1.2, maximize_income: 1.0, reduce_risk: 2.5 });
    } else if (preset === 'soil') {
      onChange({ save_water: 1.5, improve_soil: 3.0, maximize_income: 1.0, reduce_risk: 1.5 });
    } else {
      onChange({ save_water: 1.0, improve_soil: 1.2, maximize_income: 3.0, reduce_risk: 1.0 });
    }
  };

  const update = (key: keyof FarmerPriorities, val: number) => {
    onChange({
      ...priorities,
      [key]: val
    });
  };

  const toPct = (val: number) => Math.round((val / 3.0) * 100);

  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-xs flex flex-col gap-4">
      {/* Header & Presets */}
      <div className="flex items-center justify-between pb-1 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-emerald-600" />
          <h2 className="text-sm font-semibold text-zinc-900">
            {t.strategicWeights}
          </h2>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setPreset('water')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer ${
              priorities.save_water >= 2.5
                ? 'bg-zinc-900 text-white'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/70'
            }`}
          >
            {t.drought}
          </button>
          <button
            type="button"
            onClick={() => setPreset('soil')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer ${
              priorities.improve_soil >= 2.5
                ? 'bg-emerald-700 text-white'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/70'
            }`}
          >
            {t.soil}
          </button>
          <button
            type="button"
            onClick={() => setPreset('income')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer ${
              priorities.maximize_income >= 2.5
                ? 'bg-zinc-900 text-white'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/70'
            }`}
          >
            {t.income}
          </button>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="flex flex-col gap-3.5">
        {/* Water Conservation */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium text-zinc-700">{t.waterConservation}</span>
            <span className="font-semibold text-zinc-900">{toPct(priorities.save_water)}%</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="3.0"
            step="0.1"
            value={priorities.save_water}
            onChange={(e) => update('save_water', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Soil Organic Matter */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium text-zinc-700">{t.soilOrganicMatter}</span>
            <span className="font-semibold text-emerald-700">{toPct(priorities.improve_soil)}%</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="3.0"
            step="0.1"
            value={priorities.improve_soil}
            onChange={(e) => update('improve_soil', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Smallholder Cash Flow */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium text-zinc-700">{t.smallholderCashFlow}</span>
            <span className="font-semibold text-zinc-900">{toPct(priorities.maximize_income)}%</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="3.0"
            step="0.1"
            value={priorities.maximize_income}
            onChange={(e) => update('maximize_income', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Climate Risk Buffer */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium text-zinc-700">{t.climateRiskBuffer}</span>
            <span className="font-semibold text-zinc-900">{toPct(priorities.reduce_risk)}%</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="3.0"
            step="0.1"
            value={priorities.reduce_risk}
            onChange={(e) => update('reduce_risk', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};
