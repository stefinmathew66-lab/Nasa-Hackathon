import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Droplet, 
  Sprout, 
  ShieldCheck, 
  DollarSign, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  Info
} from 'lucide-react';
import { RotationPlan, ClimateSummary } from '../types';
import { Translations } from '../locales/translations';

interface RecommendationCardProps {
  plan: RotationPlan;
  climate: ClimateSummary;
  t: Translations;
  isTopPick?: boolean;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  plan,
  climate,
  t,
  isTopPick = false
}) => {
  const [showDetails, setShowDetails] = useState(isTopPick);

  // Badge styling
  const ratingColors = {
    green: "bg-emerald-600 text-white",
    yellow: "bg-amber-500 text-white",
    red: "bg-rose-600 text-white"
  };

  const cardBorder = {
    green: "border-emerald-500/70 shadow-emerald-950/5",
    yellow: "border-amber-300 shadow-amber-950/5",
    red: "border-rose-300 shadow-rose-950/5"
  };

  return (
    <div className={`bg-white rounded-2xl border-2 transition shadow-md overflow-hidden ${cardBorder[plan.rating]}`}>
      {/* Top Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className={`text-xs font-black px-3 py-1.5 rounded-xl uppercase tracking-wider ${ratingColors[plan.rating]}`}>
            {plan.rank === 1 ? '★ Best Match' : `Rank #${plan.rank}`}
          </div>
          <div>
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
              {plan.crops.map(c => c.name.split(' (')[0]).join(' → ')}
            </h3>
            <p className="text-xs text-slate-500 flex items-center space-x-2 mt-0.5">
              <span>3-Season Resilient Strategy</span>
              <span>•</span>
              <span className="font-semibold text-emerald-700">{plan.nitrogen_balance_desc}</span>
            </p>
          </div>
        </div>

        {/* Overall Score Pill */}
        <div className="flex items-center space-x-3 self-end sm:self-auto">
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-slate-400">Resilience Score</div>
            <div className="text-2xl font-black text-slate-900 tracking-tight leading-none">
              {plan.overall_score}
              <span className="text-xs text-slate-400 font-normal">/100</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Season Visual Timeline */}
      <div className="p-4 sm:p-5 bg-slate-50/60 border-b border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative">
          {plan.crops.map((crop, idx) => (
            <div
              key={crop.id + idx}
              className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-sm relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                    Season {idx + 1} ({crop.season.toUpperCase()})
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    crop.nitrogen_fixing
                      ? 'bg-emerald-100 text-emerald-800'
                      : crop.category === 'cereal'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {crop.nitrogen_fixing ? '🌱 Legume (N-Fixer)' : crop.category.toUpperCase()}
                  </span>
                </div>

                <div className="font-bold text-sm text-slate-900">
                  {crop.name}
                </div>
                {crop.local_name && (
                  <div className="text-xs text-emerald-700 font-medium">
                    {crop.local_name}
                  </div>
                )}
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">Water</span>
                  <span className="font-semibold text-slate-800">{crop.water_need_mm} mm</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">Cycle</span>
                  <span className="font-semibold text-slate-800">{crop.duration_days} days</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sub-scores Grid */}
      <div className="p-4 sm:p-5 border-b border-slate-100">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Water Fit */}
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="flex items-center space-x-1">
                <Droplet className="w-3.5 h-3.5 text-blue-500" />
                <span className="font-semibold">Water Fit</span>
              </span>
              <span className="font-bold text-slate-900">{plan.sub_scores.water_fit}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5">
              <div
                className="bg-blue-600 h-1.5 rounded-full"
                style={{ width: `${plan.sub_scores.water_fit}%` }}
              />
            </div>
          </div>

          {/* Soil Health */}
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="flex items-center space-x-1">
                <Sprout className="w-3.5 h-3.5 text-emerald-500" />
                <span className="font-semibold">Soil Health</span>
              </span>
              <span className="font-bold text-slate-900">{plan.sub_scores.soil_health}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5">
              <div
                className="bg-emerald-600 h-1.5 rounded-full"
                style={{ width: `${plan.sub_scores.soil_health}%` }}
              />
            </div>
          </div>

          {/* Climate Resilience */}
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-500" />
                <span className="font-semibold">Resilience</span>
              </span>
              <span className="font-bold text-slate-900">{plan.sub_scores.climate_resilience}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5">
              <div
                className="bg-purple-600 h-1.5 rounded-full"
                style={{ width: `${plan.sub_scores.climate_resilience}%` }}
              />
            </div>
          </div>

          {/* Economic Fit */}
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="flex items-center space-x-1">
                <DollarSign className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-semibold">Income Fit</span>
              </span>
              <span className="font-bold text-slate-900">{plan.sub_scores.economic_fit}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5">
              <div
                className="bg-amber-600 h-1.5 rounded-full"
                style={{ width: `${plan.sub_scores.economic_fit}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Primary Agronomic Justification */}
      <div className="p-4 sm:p-5 bg-emerald-50/40 border-b border-emerald-100/60">
        <div className="flex items-start space-x-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-emerald-950 font-medium">
            <span className="font-bold text-emerald-900">Why this strategy: </span>
            {plan.primary_driver}
          </div>
        </div>
      </div>

      {/* Risk Warnings (if any) */}
      {plan.risk_warnings.length > 0 && (
        <div className="p-4 sm:p-5 bg-rose-50/50 border-b border-rose-100">
          <div className="flex items-start space-x-2.5">
            <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-rose-950">
              <span className="font-bold text-rose-900">Risk Notice: </span>
              {plan.risk_warnings[0]}
            </div>
          </div>
        </div>
      )}

      {/* Accordion Toggle for Deep Agronomic Detail */}
      <div className="p-3 bg-slate-50/80 flex items-center justify-between">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center space-x-1 transition"
        >
          <span>{showDetails ? 'Hide Deep Agronomic Evidence' : 'Show NASA Data & Soil Deep Dive'}</span>
          {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        <div className="text-[11px] text-slate-400 font-mono">
          Demand: {plan.total_water_need_mm}mm | Rain: {climate.annual_rainfall_mm}mm
        </div>
      </div>

      {/* Expanded Details Drawer */}
      {showDetails && (
        <div className="p-4 sm:p-5 bg-white border-t border-slate-200 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Water & Climate Balance */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                <Droplet className="w-4 h-4 text-blue-600" />
                <span>Hydrological Feasibility</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {plan.water_impact_summary}
              </p>
              <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex justify-between">
                <span>NASA Baseline Rainfall:</span>
                <span className="font-bold text-slate-800">{climate.annual_rainfall_mm} mm</span>
              </div>
              <div className="text-[11px] text-slate-500 flex justify-between">
                <span>Root-Zone Soil Wetness (SMAP):</span>
                <span className="font-bold text-slate-800">{climate.root_zone_soil_wetness * 100}%</span>
              </div>
            </div>

            {/* Soil & Biological Dynamics */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                <Sprout className="w-4 h-4 text-emerald-600" />
                <span>Soil & Nitrogen Dynamics</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {plan.soil_impact_summary}
              </p>
              <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex justify-between">
                <span>Soil Classification:</span>
                <span className="font-bold text-slate-800">{climate.soil_info.classification}</span>
              </div>
              <div className="text-[11px] text-slate-500 flex justify-between">
                <span>Soil pH / Organic Carbon:</span>
                <span className="font-bold text-slate-800">{climate.soil_info.ph} pH | {climate.soil_info.organic_carbon_g_kg} g/kg</span>
              </div>
            </div>
          </div>

          {/* Agronomic Role Breakdown per Crop */}
          <div>
            <div className="text-xs font-bold text-slate-800 mb-2">Crop Functional Niches:</div>
            <div className="space-y-1.5">
              {plan.crops.map((c, i) => (
                <div key={i} className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-start space-x-2">
                  <span className="font-bold text-slate-900 min-w-[120px]">{c.name.split(' (')[0]}:</span>
                  <span>{c.agronomic_role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
