import React from 'react';
import { Layers, Droplets, Ruler, DollarSign, History } from 'lucide-react';
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
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
      <div className="pb-3 border-b border-slate-100 mb-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
          <Layers className="w-5 h-5 text-emerald-600" />
          <span>{t.step2}</span>
        </h2>
        <p className="text-xs text-slate-500">{t.step2Desc}</p>
      </div>

      <div className="space-y-4">
        {/* Soil Type */}
        <div>
          <label className="text-xs font-bold text-slate-700 flex items-center justify-between mb-2">
            <span>{t.soilType}</span>
            <span className="text-[11px] text-emerald-600 font-semibold">
              {constraints.soil_type === 'auto' ? 'Satellite Auto-Detect' : constraints.soil_type.toUpperCase()}
            </span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'auto', label: 'Auto (Sat)', desc: 'From SoilGrids' },
              { id: 'clay', label: 'Clay / Black', desc: 'High water hold' },
              { id: 'loam', label: 'Loam', desc: 'Balanced fertile' },
              { id: 'sandy', label: 'Sandy', desc: 'Fast drainage' }
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => updateField('soil_type', s.id)}
                className={`p-2.5 rounded-xl border text-left transition ${
                  constraints.soil_type === s.id
                    ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 shadow-sm ring-1 ring-emerald-600'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="text-xs font-bold">{s.label}</div>
                <div className="text-[10px] text-slate-500">{s.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Water Access */}
        <div>
          <label className="text-xs font-bold text-slate-700 flex items-center justify-between mb-2">
            <span className="flex items-center space-x-1.5">
              <Droplets className="w-3.5 h-3.5 text-blue-500" />
              <span>{t.waterSource}</span>
            </span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'rainfed', label: 'Rainfed Only', desc: 'Dryland / Monsoon' },
              { id: 'borewell', label: 'Borewell', desc: 'Groundwater' },
              { id: 'canal', label: 'Canal', desc: 'Periodic flow' },
              { id: 'drip', label: 'Drip Micro', desc: 'High efficiency' }
            ].map((w) => (
              <button
                key={w.id}
                type="button"
                onClick={() => updateField('water_access', w.id)}
                className={`p-2.5 rounded-xl border text-left transition ${
                  constraints.water_access === w.id
                    ? 'border-blue-600 bg-blue-50/70 text-blue-950 shadow-sm ring-1 ring-blue-600'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="text-xs font-bold">{w.label}</div>
                <div className="text-[10px] text-slate-500">{w.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Two Columns: Field Size & Previous Crop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Field Size */}
          <div>
            <label className="text-xs font-bold text-slate-700 flex items-center space-x-1.5 mb-1.5">
              <Ruler className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.fieldSize}</span>
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="0.1"
                max="500"
                step="0.5"
                value={constraints.field_size_ha}
                onChange={(e) => updateField('field_size_ha', parseFloat(e.target.value) || 1.0)}
                className="w-full text-sm font-semibold px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
              />
              <span className="text-xs font-medium text-slate-500">Ha</span>
            </div>
          </div>

          {/* Previous Crop */}
          <div>
            <label className="text-xs font-bold text-slate-700 flex items-center space-x-1.5 mb-1.5">
              <History className="w-3.5 h-3.5 text-purple-500" />
              <span>Previous Season Crop</span>
            </label>
            <select
              value={constraints.previous_crop_id || ''}
              onChange={(e) => updateField('previous_crop_id', e.target.value || undefined)}
              className="w-full text-sm font-semibold px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 cursor-pointer"
            >
              <option value="">None / Fallow</option>
              <option value="maize">Maize (Poaceae)</option>
              <option value="sorghum">Sorghum (Poaceae)</option>
              <option value="cotton">Cotton (Malvaceae)</option>
              <option value="wheat">Wheat (Poaceae)</option>
              <option value="chickpea">Chickpea (Fabaceae)</option>
              <option value="soybean">Soybean (Fabaceae)</option>
            </select>
          </div>
        </div>

        {/* Budget Level */}
        <div>
          <label className="text-xs font-bold text-slate-700 flex items-center space-x-1.5 mb-1.5">
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.budget}</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'low', label: 'Low Input', desc: 'Minimal risk' },
              { id: 'medium', label: 'Moderate', desc: 'Standard seed' },
              { id: 'high', label: 'Commercial', desc: 'High input cash' }
            ].map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => updateField('budget_level', b.id)}
                className={`p-2 rounded-xl border text-center transition ${
                  constraints.budget_level === b.id
                    ? 'border-slate-800 bg-slate-900 text-white font-bold'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="text-xs">{b.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
