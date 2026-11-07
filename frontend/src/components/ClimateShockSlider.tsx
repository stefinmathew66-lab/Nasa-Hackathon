import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
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
    <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-xs flex flex-col gap-4 no-print">
      {/* Header */}
      <div className="flex items-center justify-between pb-1 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <AlertTriangle className={`w-4 h-4 ${isStressed ? 'text-amber-600' : 'text-zinc-500'}`} />
          <h2 className="text-sm font-semibold text-zinc-900">
            Climate Stress Simulator
          </h2>
        </div>
        <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
          isStressed ? 'bg-amber-100 text-amber-800' : 'bg-zinc-100 text-zinc-600'
        }`}>
          {isStressed ? 'Simulation Active' : 'Coupled SMAP-POWER'}
        </span>
      </div>

      {/* Two Sliders */}
      <div className="flex flex-col gap-3">
        {/* Rainfall Deficit */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium text-zinc-700">Rainfall Anomaly</span>
            <span className={`font-semibold ${scenario.rainfall_delta_pct < 0 ? 'text-amber-700' : 'text-zinc-900'}`}>
              {scenario.rainfall_delta_pct > 0 ? `+${scenario.rainfall_delta_pct}%` : `${scenario.rainfall_delta_pct}%`} vs baseline
            </span>
          </div>
          <input
            type="range"
            min="-50"
            max="20"
            step="5"
            value={scenario.rainfall_delta_pct}
            onChange={(e) => onChange({ ...scenario, rainfall_delta_pct: parseFloat(e.target.value) })}
            className="w-full"
          />
          <div className="flex justify-between text-[11px] text-zinc-400">
            <span>-50% Drought</span>
            <span>Normal (0%)</span>
            <span>+20% High Rain</span>
          </div>
        </div>

        {/* Temperature Shift */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium text-zinc-700">Temperature Anomaly</span>
            <span className={`font-semibold ${scenario.temp_delta_c > 0 ? 'text-amber-700' : 'text-zinc-900'}`}>
              +{scenario.temp_delta_c.toFixed(1)}°C Heat
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="4.5"
            step="0.5"
            value={scenario.temp_delta_c}
            onChange={(e) => onChange({ ...scenario, temp_delta_c: parseFloat(e.target.value) })}
            className="w-full"
          />
          <div className="flex justify-between text-[11px] text-zinc-400">
            <span>Normal (0.0°C)</span>
            <span>Moderate (+2.0°C)</span>
            <span>Severe (+4.5°C)</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-1">
        {isStressed ? (
          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-zinc-500 hover:text-zinc-800 underline cursor-pointer"
          >
            Reset to Baseline
          </button>
        ) : (
          <span className="text-xs text-zinc-400">30-yr baseline models</span>
        )}

        <button
          type="button"
          onClick={onApply}
          disabled={isLoading}
          className="px-3 py-1.5 rounded-md bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Recalculate Matrix</span>
        </button>
      </div>
    </div>
  );
};
