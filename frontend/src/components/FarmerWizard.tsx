import React from 'react';
import { Layers, Droplet } from 'lucide-react';
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
    <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-xs flex flex-col gap-4">
      {/* Title */}
      <div className="flex items-center justify-between pb-1 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-600" />
          <h2 className="text-sm font-semibold text-zinc-900">
            {t.soilWaterProfile}
          </h2>
        </div>
        <span className="text-xs text-zinc-400 font-normal">
          {t.fieldParameters}
        </span>
      </div>

      {/* Soil Texture Selection */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-zinc-500">
          {t.soilTextureHorizon}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'clay', label: t.clayVertisol },
            { id: 'loam', label: t.siltyLoam },
            { id: 'sandy', label: t.sandyAridisol },
            { id: 'auto', label: t.autoDetect },
          ].map((s) => {
            const isSelected = constraints.soil_type === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => updateField('soil_type', s.id)}
                className={`py-2 px-2.5 rounded-lg border text-xs font-medium transition text-center cursor-pointer ${
                  isSelected
                    ? 'border-zinc-900 bg-zinc-900 text-white shadow-xs'
                    : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Water Access Selection */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-zinc-500">
          {t.irrigationCapacity}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'rainfed', label: t.rainfed },
            { id: 'borewell', label: t.borewell },
            { id: 'canal', label: t.canalNetwork },
            { id: 'drip', label: t.precisionDrip },
          ].map((w) => {
            const isSelected = constraints.water_access === w.id;
            return (
              <button
                key={w.id}
                type="button"
                onClick={() => updateField('water_access', w.id)}
                className={`py-2 px-2 rounded-lg border text-xs font-medium transition text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                  isSelected
                    ? 'border-emerald-700 bg-emerald-700 text-white shadow-xs'
                    : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                <Droplet className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-emerald-600'}`} />
                <span>{w.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Key Parcel Constraints Row */}
      <div className="grid grid-cols-3 gap-3 pt-2 border-t border-zinc-100">
        {/* Field Size */}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-zinc-500 font-medium">{t.fieldSize}</span>
          <div className="flex items-baseline gap-1">
            <input
              type="number"
              min="0.1"
              max="500"
              step="0.5"
              value={constraints.field_size_ha}
              onChange={(e) => updateField('field_size_ha', Math.max(0.1, parseFloat(e.target.value) || 0.1))}
              className="w-14 bg-zinc-50 border border-zinc-200 rounded px-2 py-1 text-sm font-semibold text-zinc-900 focus:outline-none focus:border-zinc-400"
            />
            <span className="text-xs text-zinc-500 font-normal">Ha</span>
          </div>
        </div>

        {/* Prior Crop */}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-zinc-500 font-medium">{t.priorCrop}</span>
          <select
            value={constraints.previous_crop_id || ''}
            onChange={(e) => updateField('previous_crop_id', e.target.value || undefined)}
            className="w-full bg-zinc-50 border border-zinc-200 rounded px-2 py-1 text-xs font-medium text-zinc-900 focus:outline-none focus:border-zinc-400 cursor-pointer"
          >
            <option value="">{t.fallowNone}</option>
            <option value="cotton">Cotton / कपास</option>
            <option value="maize">Maize / मक्का</option>
            <option value="wheat">Wheat / गेहूं</option>
            <option value="chickpea">Chickpea / चना</option>
            <option value="soybean">Soybean / सोयाबीन</option>
          </select>
        </div>

        {/* Budget */}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-zinc-500 font-medium">{t.budgetCap}</span>
          <div className="flex items-center gap-1">
            {[
              { id: 'low', label: t.low },
              { id: 'medium', label: t.medium },
              { id: 'high', label: t.high },
            ].map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => updateField('budget_level', b.id)}
                className={`flex-1 text-[11px] font-medium py-1 rounded transition cursor-pointer ${
                  constraints.budget_level === b.id
                    ? 'bg-zinc-900 text-white'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
