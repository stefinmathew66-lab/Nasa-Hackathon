import React from 'react';
import { Layers, Droplet, Sprout, DollarSign, Ruler, History, Sparkles } from 'lucide-react';
import { FarmerConstraints } from '../types';
import { Translations } from '../locales/translations';

interface FarmerWizardProps {
  constraints: FarmerConstraints;
  onChange: (newConstraints: FarmerConstraints) => void;
  t: Translations;
}

export const FarmerWizard: React.FC<FarmerWizardProps> = ({
  constraints,
  onChange,
  t
}) => {
  const updateField = (field: keyof FarmerConstraints, value: any) => {
    onChange({
      ...constraints,
      [field]: value
    });
  };

  return (
    <div className="bg-surface-container-lowest rounded-lg border border-outline-variant p-4 space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-outline-variant pb-2.5">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-secondary" />
          <h3 className="font-headline font-bold text-base text-primary">
            Farm Soil &amp; Hydrological Baseline
          </h3>
        </div>
        <span className="text-[10px] font-mono text-secondary bg-secondary-container/40 px-2 py-0.5 rounded font-semibold border border-secondary/50 uppercase">
          In-situ Calibrated
        </span>
      </div>

      {/* Soil Texture Classification */}
      <div>
        <span className="text-[11px] font-mono text-on-surface-variant font-medium block mb-2 uppercase">
          SOIL TEXTURE CLASSIFICATION:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'clay', label: 'Clay Vertisol', sub: 'High Retain' },
            { id: 'loam', label: 'Silty Loam', sub: 'Balanced' },
            { id: 'sandy', label: 'Sandy Aridisol', sub: 'Rapid Drain' },
            { id: 'auto', label: 'Auto-Detect', sub: 'NASA SMAP' },
          ].map((s) => {
            const isSelected = constraints.soil_type === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => updateField('soil_type', s.id)}
                className={`px-2 py-2.5 rounded border text-center transition flex flex-col items-center justify-center ${
                  isSelected
                    ? 'bg-primary text-white border-primary font-bold shadow-sm'
                    : 'bg-surface-container-low text-on-surface border-outline-variant hover:bg-surface-container'
                }`}
              >
                <span className="text-xs font-mono font-bold leading-tight">{s.label}</span>
                <span className={`text-[9px] font-mono mt-0.5 ${isSelected ? 'text-secondary-fixed' : 'text-outline'}`}>
                  {s.sub}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Water Access & Irrigation Capacity */}
      <div>
        <span className="text-[11px] font-mono text-on-surface-variant font-medium block mb-2 uppercase">
          WATER ACCESS &amp; IRRIGATION CAPACITY:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'rainfed', label: 'Rainfed (Monsoon)' },
            { id: 'borewell', label: 'Borewell / Ground' },
            { id: 'canal', label: 'Canal Network' },
            { id: 'drip', label: 'Precision Drip' },
          ].map((w) => {
            const isSelected = constraints.water_access === w.id;
            return (
              <button
                key={w.id}
                type="button"
                onClick={() => updateField('water_access', w.id)}
                className={`px-2 py-2 rounded text-xs font-mono transition flex items-center justify-center gap-1.5 border ${
                  isSelected
                    ? 'bg-secondary text-white border-secondary font-bold shadow-sm'
                    : 'bg-surface-container-low text-on-surface border-outline-variant hover:bg-surface-container'
                }`}
              >
                <Droplet className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-secondary'}`} />
                <span className="truncate">{w.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Numerical Inputs Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        {/* Field Size */}
        <div className="bg-surface-container-low p-2.5 rounded border border-outline-variant">
          <label className="text-[10px] font-mono text-on-surface-variant uppercase block font-semibold">
            FIELD SIZE
          </label>
          <div className="flex items-baseline gap-1 mt-1">
            <input
              type="number"
              min="0.1"
              max="500"
              step="0.5"
              value={constraints.field_size_ha}
              onChange={(e) => updateField('field_size_ha', Math.max(0.1, parseFloat(e.target.value) || 0.1))}
              className="w-16 bg-transparent text-lg font-headline font-bold text-primary focus:outline-none"
            />
            <span className="text-xs font-mono text-on-surface">Hectares</span>
          </div>
        </div>

        {/* Previous Crop */}
        <div className="bg-surface-container-low p-2.5 rounded border border-outline-variant">
          <label className="text-[10px] font-mono text-on-surface-variant uppercase block font-semibold">
            PREVIOUS CROP
          </label>
          <select
            value={constraints.previous_crop_id || ''}
            onChange={(e) => updateField('previous_crop_id', e.target.value || undefined)}
            className="w-full bg-transparent text-xs font-mono font-bold text-on-surface focus:outline-none cursor-pointer mt-1"
          >
            <option value="">None / Fallow</option>
            <option value="cotton">Cotton (Heavy Depletion)</option>
            <option value="maize">Maize (Poaceae Exhaustion)</option>
            <option value="wheat">Wheat (Nitrogen Depleting)</option>
            <option value="chickpea">Chickpea (Legume Residual)</option>
            <option value="soybean">Soybean (Partial Residual)</option>
          </select>
        </div>

        {/* Budget Level */}
        <div className="bg-surface-container-low p-2.5 rounded border border-outline-variant">
          <label className="text-[10px] font-mono text-on-surface-variant uppercase block font-semibold">
            INPUT BUDGET
          </label>
          <div className="flex items-center gap-1 mt-1">
            {['low', 'medium', 'high'].map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => updateField('budget_level', lvl)}
                className={`text-[10px] font-mono uppercase px-2 py-1 rounded transition ${
                  constraints.budget_level === lvl
                    ? 'bg-primary text-white font-bold'
                    : 'bg-white text-on-surface border border-outline-variant hover:bg-surface-container'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
