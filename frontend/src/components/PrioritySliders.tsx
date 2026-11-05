import React from 'react';
import { Sliders, Shield, Sprout, DollarSign, AlertTriangle } from 'lucide-react';
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

  // Convert 0.5 - 3.0 weight to percentage (50% to 100%)
  const toPct = (val: number) => Math.round((val / 3.0) * 100);

  return (
    <div className="bg-surface-container-lowest rounded-lg border border-outline-variant p-4 space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-outline-variant pb-2.5">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-primary" />
          <h3 className="font-headline font-bold text-base text-primary">
            Strategic Agronomic Priorities
          </h3>
        </div>
        <span className="text-[10px] font-mono text-on-surface-variant uppercase">
          Multi-Objective Engine
        </span>
      </div>

      {/* Preset Chips */}
      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setPreset('water')}
          className={`px-3 py-1 rounded-full text-xs font-mono font-semibold flex items-center gap-1 transition ${
            priorities.save_water >= 2.5
              ? 'bg-primary text-white shadow-sm'
              : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
          }`}
        >
          <Shield className="w-3.5 h-3.5 text-secondary-fixed" />
          <span>Drought Shield</span>
        </button>

        <button
          type="button"
          onClick={() => setPreset('soil')}
          className={`px-3 py-1 rounded-full text-xs font-mono font-semibold flex items-center gap-1 transition ${
            priorities.improve_soil >= 2.5
              ? 'bg-secondary text-white shadow-sm'
              : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
          }`}
        >
          <Sprout className="w-3.5 h-3.5 text-secondary-fixed" />
          <span>Soil Rebuild</span>
        </button>

        <button
          type="button"
          onClick={() => setPreset('income')}
          className={`px-3 py-1 rounded-full text-xs font-mono font-semibold flex items-center gap-1 transition ${
            priorities.maximize_income >= 2.5
              ? 'bg-primary-container text-white shadow-sm'
              : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5 text-amber-300" />
          <span>Cash Maximizer</span>
        </button>
      </div>

      {/* Custom Calibrated Sliders */}
      <div className="space-y-3 pt-1">
        {/* Save Irrigation Water */}
        <div>
          <div className="flex justify-between text-xs font-sans mb-1">
            <span className="font-medium text-on-surface">Save Irrigation Water</span>
            <span className="font-mono text-primary font-bold">{toPct(priorities.save_water)}%</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="3.0"
            step="0.1"
            value={priorities.save_water}
            onChange={(e) => update('save_water', parseFloat(e.target.value))}
            className="w-full accent-primary"
          />
        </div>

        {/* Rebuild Soil Organic Matter */}
        <div>
          <div className="flex justify-between text-xs font-sans mb-1">
            <span className="font-medium text-on-surface">Rebuild Soil Organic Matter (SOM)</span>
            <span className="font-mono text-secondary font-bold">{toPct(priorities.improve_soil)}%</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="3.0"
            step="0.1"
            value={priorities.improve_soil}
            onChange={(e) => update('improve_soil', parseFloat(e.target.value))}
            className="w-full accent-secondary"
          />
        </div>

        {/* Maximize Smallholder Net Cash Flow */}
        <div>
          <div className="flex justify-between text-xs font-sans mb-1">
            <span className="font-medium text-on-surface">Maximize Smallholder Net Cash Flow</span>
            <span className="font-mono text-primary font-bold">{toPct(priorities.maximize_income)}%</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="3.0"
            step="0.1"
            value={priorities.maximize_income}
            onChange={(e) => update('maximize_income', parseFloat(e.target.value))}
            className="w-full accent-primary"
          />
        </div>

        {/* Reduce Climate Exposure */}
        <div>
          <div className="flex justify-between text-xs font-sans mb-1">
            <span className="font-medium text-on-surface">Reduce Climate Exposure / Risk</span>
            <span className="font-mono text-error font-bold">{toPct(priorities.reduce_risk)}%</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="3.0"
            step="0.1"
            value={priorities.reduce_risk}
            onChange={(e) => update('reduce_risk', parseFloat(e.target.value))}
            className="w-full accent-error"
          />
        </div>
      </div>
    </div>
  );
};
