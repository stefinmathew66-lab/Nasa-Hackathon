import React from 'react';
import { AlertTriangle, RefreshCw, CheckCircle } from 'lucide-react';
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
    <div className="bg-error-container/20 rounded-lg border border-error/30 p-4 space-y-4 shadow-sm relative overflow-hidden no-print">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-error/20 pb-2.5">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-error" />
          <h3 className="font-headline font-bold text-base text-error">
            Climate Stress &amp; What-If Simulator
          </h3>
        </div>
        <span className="text-[10px] font-mono bg-error text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider animate-pulse">
          {isStressed ? 'STRESS ACTIVE' : 'SIMULATOR READY'}
        </span>
      </div>

      {/* Two Reactive Sliders */}
      <div className="space-y-3">
        {/* Rainfall Deficit */}
        <div className="bg-surface-container-lowest/90 p-2.5 rounded border border-outline-variant">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-mono font-medium text-on-surface">Monsoon Precipitation Anomaly</span>
            <span className="text-[11px] font-mono text-error font-bold bg-error-container px-2 py-0.5 rounded">
              {scenario.rainfall_delta_pct > 0 ? `+${scenario.rainfall_delta_pct}%` : `${scenario.rainfall_delta_pct}%`} vs 30-yr baseline
            </span>
          </div>
          <input
            type="range"
            min="-50"
            max="20"
            step="5"
            value={scenario.rainfall_delta_pct}
            onChange={(e) => onChange({ ...scenario, rainfall_delta_pct: parseFloat(e.target.value) })}
            className="w-full accent-error"
          />
          <div className="flex justify-between text-[10px] font-mono text-on-surface-variant mt-0.5">
            <span>-50% Extreme Drought</span>
            <span>Normal (0%)</span>
            <span>+20% High Rain</span>
          </div>
        </div>

        {/* Temperature Shift */}
        <div className="bg-surface-container-lowest/90 p-2.5 rounded border border-outline-variant">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-mono font-medium text-on-surface">Temperature Anomaly Shift</span>
            <span className="text-[11px] font-mono text-error font-bold bg-error-container px-2 py-0.5 rounded">
              +{scenario.temp_delta_c.toFixed(1)}°C Heat Stress
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="4.5"
            step="0.5"
            value={scenario.temp_delta_c}
            onChange={(e) => onChange({ ...scenario, temp_delta_c: parseFloat(e.target.value) })}
            className="w-full accent-error"
          />
          <div className="flex justify-between text-[10px] font-mono text-on-surface-variant mt-0.5">
            <span>Baseline (0.0°C)</span>
            <span>Moderate (+2.0°C)</span>
            <span>Severe (+4.5°C)</span>
          </div>
        </div>
      </div>

      {/* Trigger & Model Strip */}
      <div className="flex items-center justify-between pt-1">
        <div className="text-xs font-mono text-on-surface-variant flex items-center gap-1.5">
          <CheckCircle className="w-3.5 h-3.5 text-secondary" />
          <span>Coupled SMAP-POWER 2026</span>
        </div>

        <div className="flex items-center gap-2">
          {isStressed && (
            <button
              onClick={handleReset}
              className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-white text-on-surface border border-outline-variant hover:bg-surface-container"
            >
              Reset
            </button>
          )}
          <button
            onClick={onApply}
            disabled={isLoading}
            className="px-3 py-1.5 rounded bg-surface-container-lowest border border-error text-error hover:bg-error hover:text-white text-xs font-mono font-semibold transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Recalculate Stress Matrix</span>
          </button>
        </div>
      </div>
    </div>
  );
};
