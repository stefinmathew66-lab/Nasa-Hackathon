import React from 'react';
import {
  Sun,
  Sprout,
  DollarSign,
  Droplets,
  ShieldCheck,
  Check,
  Info,
  Sparkles
} from 'lucide-react';
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
  const setPreset = (preset: 'drought' | 'soil' | 'income') => {
    if (preset === 'drought') {
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
      [key]: Math.round(val * 10) / 10
    });
  };

  // Check which preset is active
  const isDroughtActive =
    priorities.save_water >= 2.5 &&
    priorities.reduce_risk >= 2.2 &&
    priorities.improve_soil < 2.0 &&
    priorities.maximize_income < 2.0;

  const isSoilActive =
    priorities.improve_soil >= 2.8 &&
    priorities.save_water < 2.0 &&
    priorities.maximize_income < 2.0;

  const isIncomeActive =
    priorities.maximize_income >= 2.8 &&
    priorities.improve_soil < 2.0 &&
    priorities.save_water < 2.0;

  // Helper for priority level label & styling
  const getLevelInfo = (val: number) => {
    if (val >= 2.4) {
      return {
        label: t.priorityMax,
        badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        weight: '3×'
      };
    }
    if (val >= 1.6) {
      return {
        label: t.priorityHigh,
        badgeClass: 'bg-blue-100 text-blue-800 border-blue-200',
        weight: '2×'
      };
    }
    return {
      label: t.priorityNormal,
      badgeClass: 'bg-zinc-100 text-zinc-700 border-zinc-200',
      weight: '1×'
    };
  };

  const getTrackBackground = (val: number) => {
    const pct = Math.max(0, Math.min(100, Math.round(((val - 0.5) / 2.5) * 100)));
    return `linear-gradient(to right, #059669 0%, #059669 ${pct}%, #e4e4e7 ${pct}%, #e4e4e7 100%)`;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* ================================================================= */}
      {/* 1-CLICK STRATEGY PRESET CARDS                                      */}
      {/* ================================================================= */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            {t.farmerGoalsSubtitle}
          </span>
          <span className="text-[11px] text-zinc-400">1-Tap Preset Strategies</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Card 1: Drought Defense */}
          <button
            type="button"
            onClick={() => setPreset('drought')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative flex flex-col justify-between gap-3 ${
              isDroughtActive
                ? 'border-emerald-600 bg-emerald-50/50 shadow-sm ring-2 ring-emerald-500/20'
                : 'border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${isDroughtActive ? 'bg-emerald-600 text-white' : 'bg-amber-100 text-amber-700'}`}>
                  <Sun className="w-5 h-5" />
                </div>
                {isDroughtActive ? (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    <Check className="w-3 h-3" /> Active
                  </span>
                ) : (
                  <span className="text-[11px] font-medium text-zinc-400">Strategy #1</span>
                )}
              </div>
              <h3 className="font-semibold text-sm text-zinc-900">{t.droughtStrategyTitle}</h3>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                {t.droughtStrategyDesc}
              </p>
            </div>
            <div className="pt-2 border-t border-zinc-100 flex flex-col gap-0.5">
              <span className="text-[10px] uppercase font-semibold text-zinc-400">{t.favorsCropsLabel}</span>
              <span className="text-xs font-medium text-zinc-700">{t.droughtCropsExample}</span>
            </div>
          </button>

          {/* Card 2: Soil Restoration */}
          <button
            type="button"
            onClick={() => setPreset('soil')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative flex flex-col justify-between gap-3 ${
              isSoilActive
                ? 'border-emerald-600 bg-emerald-50/50 shadow-sm ring-2 ring-emerald-500/20'
                : 'border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${isSoilActive ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-700'}`}>
                  <Sprout className="w-5 h-5" />
                </div>
                {isSoilActive ? (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    <Check className="w-3 h-3" /> Active
                  </span>
                ) : (
                  <span className="text-[11px] font-medium text-zinc-400">Strategy #2</span>
                )}
              </div>
              <h3 className="font-semibold text-sm text-zinc-900">{t.soilStrategyTitle}</h3>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                {t.soilStrategyDesc}
              </p>
            </div>
            <div className="pt-2 border-t border-zinc-100 flex flex-col gap-0.5">
              <span className="text-[10px] uppercase font-semibold text-zinc-400">{t.favorsCropsLabel}</span>
              <span className="text-xs font-medium text-zinc-700">{t.soilCropsExample}</span>
            </div>
          </button>

          {/* Card 3: Market Cash Flow */}
          <button
            type="button"
            onClick={() => setPreset('income')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative flex flex-col justify-between gap-3 ${
              isIncomeActive
                ? 'border-emerald-600 bg-emerald-50/50 shadow-sm ring-2 ring-emerald-500/20'
                : 'border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${isIncomeActive ? 'bg-emerald-600 text-white' : 'bg-blue-100 text-blue-700'}`}>
                  <DollarSign className="w-5 h-5" />
                </div>
                {isIncomeActive ? (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    <Check className="w-3 h-3" /> Active
                  </span>
                ) : (
                  <span className="text-[11px] font-medium text-zinc-400">Strategy #3</span>
                )}
              </div>
              <h3 className="font-semibold text-sm text-zinc-900">{t.incomeStrategyTitle}</h3>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                {t.incomeStrategyDesc}
              </p>
            </div>
            <div className="pt-2 border-t border-zinc-100 flex flex-col gap-0.5">
              <span className="text-[10px] uppercase font-semibold text-zinc-400">{t.favorsCropsLabel}</span>
              <span className="text-xs font-medium text-zinc-700">{t.incomeCropsExample}</span>
            </div>
          </button>
        </div>
      </div>

      {/* ================================================================= */}
      {/* FINE-TUNE OBJECTIVES (GOAL CARDS)                                 */}
      {/* ================================================================= */}
      <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-xs flex flex-col gap-5">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
          <div>
            <h2 className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              {t.fineTuneTitle}
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              {t.fineTuneDesc}
            </p>
          </div>
          {(!isDroughtActive && !isSoilActive && !isIncomeActive) && (
            <span className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
              Custom Priorities
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5">
          {/* Goal 1: Water Conservation */}
          <div className="p-4 rounded-xl bg-zinc-50/70 border border-zinc-200/80 flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-700 shrink-0 mt-0.5">
                  <Droplets className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900">{t.waterConservation}</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">{t.waterGoalDesc}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getLevelInfo(priorities.save_water).badgeClass}`}>
                  {getLevelInfo(priorities.save_water).label} ({priorities.save_water.toFixed(1)}×)
                </span>
                <div className="inline-flex rounded-lg border border-zinc-200 bg-white p-0.5">
                  <button
                    type="button"
                    onClick={() => update('save_water', 1.0)}
                    className={`px-2 py-0.5 text-xs font-medium rounded-md transition cursor-pointer ${
                      priorities.save_water <= 1.3 ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    {t.priorityNormal}
                  </button>
                  <button
                    type="button"
                    onClick={() => update('save_water', 2.0)}
                    className={`px-2 py-0.5 text-xs font-medium rounded-md transition cursor-pointer ${
                      priorities.save_water > 1.3 && priorities.save_water < 2.4 ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    {t.priorityHigh}
                  </button>
                  <button
                    type="button"
                    onClick={() => update('save_water', 3.0)}
                    className={`px-2 py-0.5 text-xs font-medium rounded-md transition cursor-pointer ${
                      priorities.save_water >= 2.4 ? 'bg-emerald-700 text-white' : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    {t.priorityMax}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1 pt-1">
              <input
                type="range"
                min="0.5"
                max="3.0"
                step="0.1"
                value={priorities.save_water}
                onChange={(e) => update('save_water', parseFloat(e.target.value))}
                style={{ background: getTrackBackground(priorities.save_water) }}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-medium px-0.5">
                <span>0.5× (Low water check)</span>
                <span>1.5× (Balanced)</span>
                <span>3.0× (Arid drought survival)</span>
              </div>
            </div>
          </div>

          {/* Goal 2: Soil Health & Nitrogen */}
          <div className="p-4 rounded-xl bg-zinc-50/70 border border-zinc-200/80 flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                  <Sprout className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900">{t.soilOrganicMatter}</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">{t.soilGoalDesc}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getLevelInfo(priorities.improve_soil).badgeClass}`}>
                  {getLevelInfo(priorities.improve_soil).label} ({priorities.improve_soil.toFixed(1)}×)
                </span>
                <div className="inline-flex rounded-lg border border-zinc-200 bg-white p-0.5">
                  <button
                    type="button"
                    onClick={() => update('improve_soil', 1.0)}
                    className={`px-2 py-0.5 text-xs font-medium rounded-md transition cursor-pointer ${
                      priorities.improve_soil <= 1.3 ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    {t.priorityNormal}
                  </button>
                  <button
                    type="button"
                    onClick={() => update('improve_soil', 2.0)}
                    className={`px-2 py-0.5 text-xs font-medium rounded-md transition cursor-pointer ${
                      priorities.improve_soil > 1.3 && priorities.improve_soil < 2.4 ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    {t.priorityHigh}
                  </button>
                  <button
                    type="button"
                    onClick={() => update('improve_soil', 3.0)}
                    className={`px-2 py-0.5 text-xs font-medium rounded-md transition cursor-pointer ${
                      priorities.improve_soil >= 2.4 ? 'bg-emerald-700 text-white' : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    {t.priorityMax}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1 pt-1">
              <input
                type="range"
                min="0.5"
                max="3.0"
                step="0.1"
                value={priorities.improve_soil}
                onChange={(e) => update('improve_soil', parseFloat(e.target.value))}
                style={{ background: getTrackBackground(priorities.improve_soil) }}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-medium px-0.5">
                <span>0.5× (Minimal N-fixation)</span>
                <span>1.5× (Balanced fertility)</span>
                <span>3.0× (Heavy legume recovery)</span>
              </div>
            </div>
          </div>

          {/* Goal 3: Smallholder Cash Flow */}
          <div className="p-4 rounded-xl bg-zinc-50/70 border border-zinc-200/80 flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-100 text-amber-700 shrink-0 mt-0.5">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900">{t.smallholderCashFlow}</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">{t.incomeGoalDesc}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getLevelInfo(priorities.maximize_income).badgeClass}`}>
                  {getLevelInfo(priorities.maximize_income).label} ({priorities.maximize_income.toFixed(1)}×)
                </span>
                <div className="inline-flex rounded-lg border border-zinc-200 bg-white p-0.5">
                  <button
                    type="button"
                    onClick={() => update('maximize_income', 1.0)}
                    className={`px-2 py-0.5 text-xs font-medium rounded-md transition cursor-pointer ${
                      priorities.maximize_income <= 1.3 ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    {t.priorityNormal}
                  </button>
                  <button
                    type="button"
                    onClick={() => update('maximize_income', 2.0)}
                    className={`px-2 py-0.5 text-xs font-medium rounded-md transition cursor-pointer ${
                      priorities.maximize_income > 1.3 && priorities.maximize_income < 2.4 ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    {t.priorityHigh}
                  </button>
                  <button
                    type="button"
                    onClick={() => update('maximize_income', 3.0)}
                    className={`px-2 py-0.5 text-xs font-medium rounded-md transition cursor-pointer ${
                      priorities.maximize_income >= 2.4 ? 'bg-emerald-700 text-white' : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    {t.priorityMax}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1 pt-1">
              <input
                type="range"
                min="0.5"
                max="3.0"
                step="0.1"
                value={priorities.maximize_income}
                onChange={(e) => update('maximize_income', parseFloat(e.target.value))}
                style={{ background: getTrackBackground(priorities.maximize_income) }}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-medium px-0.5">
                <span>0.5× (Subsistence only)</span>
                <span>1.5× (Food & cash mix)</span>
                <span>3.0× (Top harvest market value)</span>
              </div>
            </div>
          </div>

          {/* Goal 4: Climate Risk Buffer */}
          <div className="p-4 rounded-xl bg-zinc-50/70 border border-zinc-200/80 flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-sky-100 text-sky-700 shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900">{t.climateRiskBuffer}</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">{t.riskGoalDesc}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getLevelInfo(priorities.reduce_risk).badgeClass}`}>
                  {getLevelInfo(priorities.reduce_risk).label} ({priorities.reduce_risk.toFixed(1)}×)
                </span>
                <div className="inline-flex rounded-lg border border-zinc-200 bg-white p-0.5">
                  <button
                    type="button"
                    onClick={() => update('reduce_risk', 1.0)}
                    className={`px-2 py-0.5 text-xs font-medium rounded-md transition cursor-pointer ${
                      priorities.reduce_risk <= 1.3 ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    {t.priorityNormal}
                  </button>
                  <button
                    type="button"
                    onClick={() => update('reduce_risk', 2.0)}
                    className={`px-2 py-0.5 text-xs font-medium rounded-md transition cursor-pointer ${
                      priorities.reduce_risk > 1.3 && priorities.reduce_risk < 2.4 ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    {t.priorityHigh}
                  </button>
                  <button
                    type="button"
                    onClick={() => update('reduce_risk', 3.0)}
                    className={`px-2 py-0.5 text-xs font-medium rounded-md transition cursor-pointer ${
                      priorities.reduce_risk >= 2.4 ? 'bg-emerald-700 text-white' : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    {t.priorityMax}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1 pt-1">
              <input
                type="range"
                min="0.5"
                max="3.0"
                step="0.1"
                value={priorities.reduce_risk}
                onChange={(e) => update('reduce_risk', parseFloat(e.target.value))}
                style={{ background: getTrackBackground(priorities.reduce_risk) }}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-medium px-0.5">
                <span>0.5× (Normal weather risk)</span>
                <span>1.5× (Moderate climate buffer)</span>
                <span>3.0× (Extreme heat & drought shield)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Agronomic Engine Insight Callout */}
        <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 flex items-start gap-3 text-xs text-emerald-900">
          <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>NASA Agro-Matrix Scoring:</strong> Each multiplier directly re-weights candidate crops. Crops scoring highest on your prioritized goals receive up to 3× higher weighting in the composite index. Legume nitrogen credits and water deficit penalties adapt accordingly.
          </div>
        </div>
      </div>
    </div>
  );
};
