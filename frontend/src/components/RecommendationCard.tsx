import React, { useState } from 'react';
import { 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  PlusCircle, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  Droplet,
  Sprout,
  Shield,
  Layers
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

  // SVG circular gauge calculation
  const clampedScore = Math.max(0, Math.min(100, Math.round(plan.overall_score)));
  const strokeDash = `${clampedScore}, 100`;

  // Water savings estimate vs traditional monoculture (e.g. cotton or hybrid corn ~1400mm)
  const waterSaved = Math.max(0, 1400 - plan.total_water_need_mm);

  return (
    <div className={`bg-surface-container-lowest rounded-lg border-2 ${
      isTopPick ? 'border-secondary shadow-md' : 'border-outline-variant shadow-sm'
    } p-5 space-y-4 relative overflow-hidden transition-all hover:border-outline`}>
      {/* Background accent curve for top pick */}
      {isTopPick && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-full pointer-events-none"></div>
      )}

      {/* Header with Badges & Circular Resilience Score */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-outline-variant pb-3.5">
        <div>
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold tracking-wider uppercase ${
              isTopPick 
                ? 'bg-secondary text-white' 
                : 'bg-surface-container-highest text-primary'
            }`}>
              {isTopPick ? 'RANK #1 TOP MATCH' : `RANK #${plan.rank} ROTATION STRATEGY`}
            </span>
            <span className="text-[10px] font-mono text-secondary font-semibold bg-secondary-container/30 px-2 py-0.5 rounded border border-secondary/50">
              {plan.nitrogen_balance_desc}
            </span>
          </div>
          <h3 className="font-headline font-bold text-lg sm:text-xl text-primary mt-1.5">
            {plan.crops.map(c => c.name.split(' (')[0]).join(' → ')}
          </h3>
        </div>

        {/* Circular Resilience Score Gauge */}
        <div className="flex items-center gap-3 bg-surface-container-low px-3 py-1.5 rounded-lg border border-outline-variant self-start sm:self-auto">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-surface-variant"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
              />
              <path
                className={isTopPick ? "text-secondary" : "text-primary"}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray={strokeDash}
                strokeLinecap="round"
                strokeWidth="3.5"
              />
            </svg>
            <span className="absolute text-xs font-mono font-bold text-primary">
              {Math.round(plan.overall_score)}
            </span>
          </div>
          <div>
            <div className={`text-xs font-mono font-bold ${isTopPick ? 'text-secondary' : 'text-primary'}`}>
              {plan.overall_score} / 100
            </div>
            <div className="text-[9px] font-mono text-on-surface-variant uppercase">
              {plan.rating === 'green' ? 'HIGH RESILIENCE' : (plan.rating === 'yellow' ? 'MODERATE ADAPT' : 'HIGH RISK')}
            </div>
          </div>
        </div>
      </div>

      {/* 3-Season Chronological Flow Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {plan.crops.map((crop, idx) => (
          <div
            key={crop.id + idx}
            className={`p-3 rounded border relative flex flex-col justify-between ${
              crop.nitrogen_fixing 
                ? 'bg-surface-container-low border-2 border-secondary/50' 
                : 'bg-surface-container-low border-outline-variant'
            }`}
          >
            <div>
              <div className="text-[10px] font-mono font-bold uppercase flex items-center justify-between mb-1">
                <span className={crop.nitrogen_fixing ? "text-secondary" : "text-primary"}>
                  SEASON {idx + 1} ({crop.season.toUpperCase()})
                </span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                  crop.nitrogen_fixing
                    ? 'bg-secondary-container text-secondary font-bold'
                    : 'bg-surface-container-highest text-primary'
                }`}>
                  {crop.nitrogen_fixing ? '🌱 N-Restorer' : crop.category.toUpperCase()}
                </span>
              </div>

              <div className="font-headline font-bold text-sm text-on-surface">
                {crop.name.split(' (')[0]}
              </div>
              <div className="text-[11px] font-sans text-on-surface-variant italic">
                {crop.botanical_family}
              </div>
              {crop.local_name && (
                <div className="text-[11px] font-mono text-secondary font-semibold mt-0.5">
                  {crop.local_name}
                </div>
              )}
            </div>

            <div className="mt-3 pt-2 border-t border-outline-variant/60 space-y-1 text-xs font-mono">
              <div className="flex justify-between text-on-surface-variant text-[11px]">
                <span>Water Need:</span>
                <span className="font-bold text-on-surface">{crop.water_need_mm} mm</span>
              </div>
              <div className="flex justify-between text-on-surface-variant text-[11px]">
                <span>Duration:</span>
                <span className="font-bold text-on-surface">{crop.duration_days} Days</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Resilience Radar Sub-score Progress Bars */}
      <div className="bg-surface-container-low p-3 rounded border border-outline-variant space-y-2">
        <span className="text-[10px] font-mono font-bold text-on-surface uppercase block">
          RESILIENCE METRICS BREAKDOWN:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span>Water Fit</span>
              <span className="font-bold text-primary">{plan.sub_scores.water_fit}%</span>
            </div>
            <div className="w-full bg-surface-variant rounded-full h-1.5">
              <div className="bg-primary h-1.5 rounded-full" style={{ width: `${plan.sub_scores.water_fit}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span>Soil Health &amp; N</span>
              <span className="font-bold text-secondary">{plan.sub_scores.soil_health}%</span>
            </div>
            <div className="w-full bg-surface-variant rounded-full h-1.5">
              <div className="bg-secondary h-1.5 rounded-full" style={{ width: `${plan.sub_scores.soil_health}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span>Climate Tol</span>
              <span className="font-bold text-primary">{plan.sub_scores.climate_resilience}%</span>
            </div>
            <div className="w-full bg-surface-variant rounded-full h-1.5">
              <div className="bg-primary h-1.5 rounded-full" style={{ width: `${plan.sub_scores.climate_resilience}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span>Income Fit</span>
              <span className="font-bold text-secondary">{plan.sub_scores.economic_fit}%</span>
            </div>
            <div className="w-full bg-surface-variant rounded-full h-1.5">
              <div className="bg-secondary h-1.5 rounded-full" style={{ width: `${plan.sub_scores.economic_fit}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Agronomic Justification & Climate Risk Notices */}
      <div className="space-y-2">
        {/* Verified Justification */}
        <div className="p-3 bg-secondary-container/20 rounded border border-secondary/40 text-xs font-sans flex items-start gap-2.5">
          <CheckCircle className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
          <div className="text-on-surface leading-relaxed">
            <span className="font-bold text-secondary">NASA Earth Observation Match: </span>
            {plan.primary_driver}
          </div>
        </div>

        {/* Climate Risk Notice if present */}
        {plan.risk_warnings.length > 0 && (
          <div className="p-3 bg-error-container/20 rounded border border-error/30 text-xs font-sans flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-error shrink-0 mt-0.5" />
            <div className="text-on-surface leading-relaxed">
              <span className="font-bold text-error">Climate Risk Notice: </span>
              {plan.risk_warnings[0]}
            </div>
          </div>
        )}
      </div>

      {/* Hydrological & Nutrient Ledger Strip */}
      <div className="pt-2 border-t border-outline-variant flex flex-wrap items-center justify-between text-xs font-mono text-on-surface-variant gap-2">
        <div className="flex items-center gap-4">
          <span className="text-secondary font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            +{waterSaved}mm Water Saved vs Monoculture
          </span>
          <span className="text-primary font-bold flex items-center gap-1">
            <PlusCircle className="w-3.5 h-3.5" />
            {plan.nitrogen_balance_desc}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setShowLedger(!showLedger)}
          className="text-primary font-semibold hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>{showLedger ? 'Close Biogeochemical Ledger' : 'View Full Biogeochemical Ledger'}</span>
          {showLedger ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Collapsible Ledger Drawer */}
      {showLedger && (
        <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant space-y-3 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 bg-white rounded border border-outline-variant space-y-1">
              <div className="font-mono font-bold text-primary flex items-center gap-1">
                <Droplet className="w-3.5 h-3.5 text-blue-600" />
                <span>Hydrological Balance</span>
              </div>
              <p className="text-on-surface-variant">{plan.water_impact_summary}</p>
              <div className="pt-2 border-t border-slate-100 flex justify-between text-[11px] font-mono">
                <span>NASA Baseline Rainfall:</span>
                <span className="font-bold">{climate.annual_rainfall_mm} mm</span>
              </div>
              <div className="flex justify-between text-[11px] font-mono">
                <span>SMAP Root-Zone Wetness:</span>
                <span className="font-bold">{Math.round(climate.root_zone_soil_wetness * 100)}% Vol</span>
              </div>
            </div>

            <div className="p-3 bg-white rounded border border-outline-variant space-y-1">
              <div className="font-mono font-bold text-secondary flex items-center gap-1">
                <Sprout className="w-3.5 h-3.5 text-secondary" />
                <span>Soil Biological Ledger</span>
              </div>
              <p className="text-on-surface-variant">{plan.soil_impact_summary}</p>
              <div className="pt-2 border-t border-slate-100 flex justify-between text-[11px] font-mono">
                <span>Soil Classification:</span>
                <span className="font-bold">{climate.soil_info.classification}</span>
              </div>
              <div className="flex justify-between text-[11px] font-mono">
                <span>Soil pH / Organic Carbon:</span>
                <span className="font-bold">{climate.soil_info.ph} pH | {climate.soil_info.organic_carbon_g_kg} g/kg</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
