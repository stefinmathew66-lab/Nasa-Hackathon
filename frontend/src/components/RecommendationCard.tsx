import React, { useState } from 'react';
import { 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  PlusCircle, 
  ChevronDown, 
  ChevronUp, 
  Droplet,
  Sprout
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
  const [showLedger, setShowLedger] = useState(false);
  const waterSaved = Math.max(0, 1400 - plan.total_water_need_mm);

  return (
    <article className={`bg-white rounded-xl border ${
      isTopPick ? 'border-zinc-300 shadow-sm' : 'border-zinc-200'
    } p-6 flex flex-col gap-5 transition-all`}>
      {/* Top Header: Badge, Title & Score */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
              isTopPick 
                ? 'bg-zinc-900 text-white' 
                : 'bg-zinc-100 text-zinc-700'
            }`}>
              {isTopPick ? 'Rank #1 · Top Recommendation' : `Rank #${plan.rank} Rotation`}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              {plan.nitrogen_balance_desc}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-zinc-900 mt-2">
            {plan.crops.map(c => c.name.split(' (')[0]).join(' → ')}
          </h3>
        </div>

        {/* Minimalist Score Badge */}
        <div className="flex items-baseline gap-1.5 self-start sm:self-auto bg-zinc-50 px-3.5 py-2 rounded-lg border border-zinc-200">
          <span className="text-2xl font-bold tracking-tight text-zinc-900">
            {Math.round(plan.overall_score)}
          </span>
          <span className="text-xs text-zinc-500 font-medium">/ 100 Resilience</span>
        </div>
      </div>

      {/* 3 Chronological Season Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {plan.crops.map((crop, idx) => (
          <div
            key={crop.id + idx}
            className="p-4 rounded-lg border border-zinc-200/80 bg-zinc-50/60 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
                <span>Season {idx + 1} ({crop.season})</span>
                <span className="font-medium text-zinc-700">{crop.duration_days} Days</span>
              </div>
              <div className="text-base font-semibold text-zinc-900">
                {crop.name.split(' (')[0]}
              </div>
              <div className="text-xs italic text-zinc-500">
                {crop.botanical_family}
              </div>
            </div>

            <div className="mt-4 pt-2.5 border-t border-zinc-200/60 flex flex-col gap-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Water Req:</span>
                <span className="font-medium text-zinc-900">{crop.water_need_mm} mm</span>
              </div>
              <div className="text-xs font-medium text-emerald-700">
                {crop.nitrogen_fixing ? '🌱 Biological N-Fixer' : crop.category.toUpperCase()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Clean Horizontal Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200/60 flex flex-col">
          <span className="text-xs text-zinc-500 font-medium">Water Fit</span>
          <span className="text-lg font-semibold text-zinc-900 mt-0.5">{plan.sub_scores.water_fit}%</span>
        </div>
        <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200/60 flex flex-col">
          <span className="text-xs text-zinc-500 font-medium">Soil Regeneration</span>
          <span className="text-lg font-semibold text-emerald-700 mt-0.5">{plan.sub_scores.soil_health}%</span>
        </div>
        <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200/60 flex flex-col">
          <span className="text-xs text-zinc-500 font-medium">Climate Buffer</span>
          <span className="text-lg font-semibold text-zinc-900 mt-0.5">{plan.sub_scores.climate_resilience}%</span>
        </div>
        <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200/60 flex flex-col">
          <span className="text-xs text-zinc-500 font-medium">Income Fit</span>
          <span className="text-lg font-semibold text-zinc-900 mt-0.5">{plan.sub_scores.economic_fit}%</span>
        </div>
      </div>

      {/* NASA Earth Observation Insight Banner */}
      <div className="p-3.5 rounded-lg bg-emerald-50/70 border border-emerald-200/70 flex items-start gap-2.5">
        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <div className="text-xs text-zinc-800 leading-relaxed">
          <span className="font-semibold text-emerald-900">NASA Earth Observation Insight: </span>
          {plan.primary_driver}
        </div>
      </div>

      {/* Climate Risk Notice if present */}
      {plan.risk_warnings.length > 0 && (
        <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200/70 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 leading-relaxed">
            <span className="font-semibold">Risk Notice: </span>
            {plan.risk_warnings[0]}
          </div>
        </div>
      )}

      {/* Environmental Dividends Summary & Ledger Drawer Toggle */}
      <div className="flex flex-wrap items-center justify-between text-xs text-zinc-600 pt-2 border-t border-zinc-100 gap-2">
        <div className="flex items-center gap-3 font-medium text-emerald-800">
          <span className="flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            +{waterSaved}mm water conserved
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <PlusCircle className="w-3.5 h-3.5" />
            {plan.nitrogen_balance_desc}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setShowLedger(!showLedger)}
          className="text-zinc-600 hover:text-zinc-900 font-medium flex items-center gap-1 cursor-pointer"
        >
          <span>{showLedger ? 'Close Ledger' : 'View Environmental Ledger'}</span>
          {showLedger ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Collapsible Ledger Drawer */}
      {showLedger && (
        <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-200 space-y-3 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 bg-white rounded border border-zinc-200 space-y-1.5">
              <div className="font-semibold text-zinc-900 flex items-center gap-1.5">
                <Droplet className="w-3.5 h-3.5 text-blue-600" />
                <span>Hydrological Balance</span>
              </div>
              <p className="text-zinc-600 leading-relaxed">{plan.water_impact_summary}</p>
              <div className="pt-2 border-t border-zinc-100 flex justify-between text-zinc-500">
                <span>NASA Baseline Rainfall:</span>
                <span className="font-semibold text-zinc-900">{climate.annual_rainfall_mm} mm</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>SMAP Root-Zone Wetness:</span>
                <span className="font-semibold text-zinc-900">{Math.round(climate.root_zone_soil_wetness * 100)}% Vol</span>
              </div>
            </div>

            <div className="p-3 bg-white rounded border border-zinc-200 space-y-1.5">
              <div className="font-semibold text-emerald-800 flex items-center gap-1.5">
                <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                <span>Soil Organic Ledger</span>
              </div>
              <p className="text-zinc-600 leading-relaxed">{plan.soil_impact_summary}</p>
              <div className="pt-2 border-t border-zinc-100 flex justify-between text-zinc-500">
                <span>Soil Classification:</span>
                <span className="font-semibold text-zinc-900">{climate.soil_info.classification}</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>Soil pH / Organic Carbon:</span>
                <span className="font-semibold text-zinc-900">{climate.soil_info.ph} pH · {climate.soil_info.organic_carbon_g_kg} g/kg</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};
