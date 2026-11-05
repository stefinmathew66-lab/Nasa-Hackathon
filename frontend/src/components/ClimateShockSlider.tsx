import React from 'react';
import { Flame, CloudRain, AlertTriangle, RefreshCw } from 'lucide-react';
import { ClimateStressScenario } from '../types';
import { Translations } from '../locales/translations';

interface ClimateShockSliderProps {
  scenario: ClimateStressScenario;
  onChange: (scenario: ClimateStressScenario) => void;
  onApply: () => void;
  isLoading: boolean;
  t: Translations;
}

export const ClimateShockSlider: React.FC<ClimateShockSliderProps> = ({
  scenario,
  onChange,
  onApply,
  isLoading,
  t
}) => {
  const isStressed = scenario.rainfall_delta_pct !== 0 || scenario.temp_delta_c !== 0;

  const handleReset = () => {
    onChange({ rainfall_delta_pct: 0, temp_delta_c: 0 });
  };

  return (
    <div className="bg-gradient-to-r from-orange-50 via-rose-50 to-amber-50 rounded-2xl p-4 sm:p-5 border border-orange-200/80 shadow-sm no-print">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-orange-200/60 gap-2">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-orange-600 text-white">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <span>{t.stressTestTitle}</span>
              {isStressed && (
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-rose-600 text-white tracking-wider animate-pulse">
                  Active Simulation
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-600">{t.stressTestDesc}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {isStressed && (
            <button
              onClick={handleReset}
              className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white/80 text-slate-700 hover:bg-white border border-slate-300"
            >
              Reset Baseline
            </button>
          )}
          <button
            onClick={onApply}
            disabled={isLoading}
            className="text-xs font-bold px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-sm flex items-center space-x-1.5 disabled:opacity-50 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Stress Test Plan</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
        {/* Rainfall reduction */}
        <div className="bg-white/70 p-3 rounded-xl border border-orange-200/60">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1">
            <span className="flex items-center space-x-1.5 text-blue-900">
              <CloudRain className="w-4 h-4 text-blue-600" />
              <span>{t.rainReduction}</span>
            </span>
            <span className={`font-mono font-extrabold ${scenario.rainfall_delta_pct < 0 ? 'text-rose-600' : 'text-slate-600'}`}>
              {scenario.rainfall_delta_pct > 0 ? `+${scenario.rainfall_delta_pct}%` : `${scenario.rainfall_delta_pct}%`}
            </span>
          </div>
          <input
            type="range"
            min="-50"
            max="20"
            step="5"
            value={scenario.rainfall_delta_pct}
            onChange={(e) => onChange({ ...scenario, rainfall_delta_pct: parseFloat(e.target.value) })}
            className="w-full accent-rose-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
            <span>Severe Drought (-50%)</span>
            <span>Normal (0%)</span>
            <span>Excess (+20%)</span>
          </div>
        </div>

        {/* Temperature increase */}
        <div className="bg-white/70 p-3 rounded-xl border border-orange-200/60">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1">
            <span className="flex items-center space-x-1.5 text-orange-900">
              <Flame className="w-4 h-4 text-orange-600" />
              <span>{t.tempIncrease}</span>
            </span>
            <span className={`font-mono font-extrabold ${scenario.temp_delta_c > 0 ? 'text-orange-600' : 'text-slate-600'}`}>
              +{scenario.temp_delta_c.toFixed(1)}°C
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={scenario.temp_delta_c}
            onChange={(e) => onChange({ ...scenario, temp_delta_c: parseFloat(e.target.value) })}
            className="w-full accent-orange-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
            <span>Historical Avg (+0°C)</span>
            <span>Moderate (+2.5°C)</span>
            <span>Extreme Heat (+5.0°C)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
