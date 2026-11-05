import React from 'react';
import { RecommendationResponse } from '../types';

interface PrintAdvisorySheetProps {
  data: RecommendationResponse;
}

export const PrintAdvisorySheet: React.FC<PrintAdvisorySheetProps> = ({ data }) => {
  const topPlan = data.recommendations[0];
  const climate = data.climate_summary;

  return (
    <div className="print-only p-8 max-w-4xl mx-auto bg-white text-slate-900 font-sans">
      {/* Official Header */}
      <div className="border-b-2 border-slate-900 pb-4 mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
            Smallholder Crop Rotation Advisory Report
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Decision-Support System Powered by NASA Earth Observations (NASA POWER, SMAP, GPM) & FAO Agronomy
          </p>
        </div>
        <div className="text-right text-xs font-mono text-slate-500">
          <div>Generated: {new Date().toLocaleDateString()}</div>
          <div>Ref ID: {topPlan?.rotation_id || 'ADVISORY-2026'}</div>
        </div>
      </div>

      {/* Field & Satellite Climate Profile */}
      <div className="grid grid-cols-2 gap-4 mb-6 text-xs border border-slate-300 p-4 rounded-lg bg-slate-50">
        <div>
          <h3 className="font-bold uppercase tracking-wider text-slate-500 mb-2 border-b border-slate-200 pb-1">
            Farm Coordinates & Soil Profile
          </h3>
          <div className="space-y-1">
            <div><span className="font-semibold">Coordinates:</span> {data.location.lat.toFixed(4)}°N, {data.location.lon.toFixed(4)}°E</div>
            <div><span className="font-semibold">Region:</span> {data.location.region_name || 'Pilot Target Area'}</div>
            <div><span className="font-semibold">Soil Texture / Class:</span> {climate.soil_info.texture.toUpperCase()} ({climate.soil_info.classification})</div>
            <div><span className="font-semibold">Soil pH / Carbon:</span> {climate.soil_info.ph} pH | {climate.soil_info.organic_carbon_g_kg} g/kg</div>
          </div>
        </div>

        <div>
          <h3 className="font-bold uppercase tracking-wider text-slate-500 mb-2 border-b border-slate-200 pb-1">
            NASA Climate Baseline Observations
          </h3>
          <div className="space-y-1">
            <div><span className="font-semibold">Annual Precipitation:</span> {climate.annual_rainfall_mm} mm (5-yr Trend: {climate.rainfall_5yr_trend_pct}%)</div>
            <div><span className="font-semibold">Extreme Heat Days (&gt;35°C):</span> {climate.heat_days_above_35c} days/year</div>
            <div><span className="font-semibold">Root-Zone Wetness (SMAP):</span> {(climate.root_zone_soil_wetness * 100).toFixed(0)}%</div>
            <div><span className="font-semibold">Data Source:</span> {climate.data_source}</div>
          </div>
        </div>
      </div>

      {/* Primary Recommended Rotation */}
      {topPlan && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-base font-extrabold uppercase text-slate-900">
              Primary Recommended 3-Season Strategy (Score: {topPlan.overall_score}/100)
            </h2>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase">
              {topPlan.rating} Recommendation
            </span>
          </div>

          <table className="w-full text-xs border-collapse border border-slate-300 mb-4">
            <thead>
              <tr className="bg-slate-100 text-slate-700">
                <th className="border border-slate-300 p-2 text-left">Phase</th>
                <th className="border border-slate-300 p-2 text-left">Crop Selection</th>
                <th className="border border-slate-300 p-2 text-left">Botanical Family</th>
                <th className="border border-slate-300 p-2 text-center">Water Need</th>
                <th className="border border-slate-300 p-2 text-center">Cycle Length</th>
                <th className="border border-slate-300 p-2 text-left">Agronomic Role</th>
              </tr>
            </thead>
            <tbody>
              {topPlan.crops.map((c, i) => (
                <tr key={i} className="border-b border-slate-200">
                  <td className="border border-slate-300 p-2 font-bold">Season {i + 1} ({c.season})</td>
                  <td className="border border-slate-300 p-2 font-bold text-slate-900">{c.name}</td>
                  <td className="border border-slate-300 p-2 italic">{c.botanical_family}</td>
                  <td className="border border-slate-300 p-2 text-center font-mono">{c.water_need_mm} mm</td>
                  <td className="border border-slate-300 p-2 text-center">{c.duration_days} days</td>
                  <td className="border border-slate-300 p-2">{c.agronomic_role}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Key Justification Box */}
          <div className="border border-emerald-300 bg-emerald-50/50 p-3 rounded-lg text-xs mb-4">
            <span className="font-bold text-emerald-900">Agronomic Justification: </span>
            <span className="text-slate-800">{topPlan.primary_driver}</span>
          </div>

          {topPlan.risk_warnings.length > 0 && (
            <div className="border border-amber-300 bg-amber-50/50 p-3 rounded-lg text-xs">
              <span className="font-bold text-amber-900">Risk Notice: </span>
              <span className="text-slate-800">{topPlan.risk_warnings[0]}</span>
            </div>
          )}
        </div>
      )}

      {/* Field Officer Signature / Extension Stamp */}
      <div className="mt-12 pt-6 border-t border-slate-300 grid grid-cols-2 gap-8 text-xs">
        <div>
          <div className="h-10 border-b border-slate-400 mb-1"></div>
          <span className="text-slate-500 font-semibold">Farmer Signature / Thumbprint</span>
        </div>
        <div>
          <div className="h-10 border-b border-slate-400 mb-1"></div>
          <span className="text-slate-500 font-semibold">Agricultural Extension Officer Stamp & Verification</span>
        </div>
      </div>
    </div>
  );
};
