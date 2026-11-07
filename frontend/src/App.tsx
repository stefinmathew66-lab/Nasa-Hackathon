import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Printer, 
  MessageSquare, 
  AlertCircle, 
  CloudRain, 
  Flame, 
  Droplet, 
  Layers, 
  Satellite, 
  TrendingDown,
  TrendingUp,
  RefreshCw,
  Compass
} from 'lucide-react';

import { 
  LocationInput, 
  FarmerConstraints, 
  FarmerPriorities, 
  ClimateStressScenario, 
  RecommendationResponse 
} from './types';
import { translations } from './locales/translations';
import { Navbar } from './components/Navbar';
import { MapPicker } from './components/MapPicker';
import { FarmerWizard } from './components/FarmerWizard';
import { PrioritySliders } from './components/PrioritySliders';
import { ClimateShockSlider } from './components/ClimateShockSlider';
import { RecommendationCard } from './components/RecommendationCard';
import { SmsSimulatorModal } from './components/SmsSimulatorModal';
import { PrintAdvisorySheet } from './components/PrintAdvisorySheet';

export const App: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<string>('en');
  const t = translations[currentLang] || translations.en;

  // Location State (Default: Maharashtra Pilot Region)
  const [location, setLocation] = useState<LocationInput>({
    lat: 19.84,
    lon: 75.88,
    region_name: "Maharashtra (Drought-Prone)"
  });

  // Constraints State
  const [constraints, setConstraints] = useState<FarmerConstraints>({
    soil_type: 'clay',
    water_access: 'rainfed',
    field_size_ha: 4.5,
    previous_crop_id: 'cotton',
    budget_level: 'medium',
    language: 'en'
  });

  // Priorities State
  const [priorities, setPriorities] = useState<FarmerPriorities>({
    save_water: 2.7,
    improve_soil: 2.5,
    maximize_income: 1.8,
    reduce_risk: 2.8
  });

  // Climate Shock Scenario State
  const [stressScenario, setStressScenario] = useState<ClimateStressScenario>({
    rainfall_delta_pct: 0,
    temp_delta_c: 0
  });

  // Results State
  const [resultData, setResultData] = useState<RecommendationResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSmsOpen, setIsSmsOpen] = useState<boolean>(false);

  // Sync language with constraints
  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang);
    setConstraints(prev => ({ ...prev, language: lang }));
  };

  // Location update handler
  const handleLocationChange = (lat: number, lon: number, name?: string) => {
    setLocation({
      lat,
      lon,
      region_name: name || `Field (${lat.toFixed(2)}, ${lon.toFixed(2)})`
    });
  };

  // Fetch recommendations from API
  const fetchRecommendations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          location,
          constraints,
          priorities,
          stress_scenario: stressScenario
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data: RecommendationResponse = await response.json();
      setResultData(data);
    } catch (err: any) {
      console.error("Failed to fetch recommendations:", err);
      setError("Unable to connect to advisory service. Please check network or verify backend server is active.");
    } finally {
      setIsLoading(false);
    }
  };

  // Run on mount or when location changes
  useEffect(() => {
    fetchRecommendations();
  }, [location.lat, location.lon]);

  const handlePrint = () => {
    window.print();
  };

  const climate = resultData?.climate_summary;

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col font-sans selection:bg-emerald-600 selection:text-white">
      {/* Top App Bar */}
      <Navbar
        t={t}
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        dataSource={climate?.data_source || "SMAP & POWER Live"}
        onOpenSms={() => setIsSmsOpen(true)}
        onPrint={handlePrint}
      />

      {/* Main Advisory Workspace */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 no-print">
        {/* Banner Alert for Simulated Climate Stress if active */}
        {climate?.is_simulated_stress && (
          <div className="bg-amber-50 border border-amber-200/80 text-amber-900 p-3.5 rounded-xl shadow-xs flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-2.5">
              <Flame className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Simulated Climate Stress Active:</strong> Recalibrated for {stressScenario.rainfall_delta_pct}% rainfall anomaly and +{stressScenario.temp_delta_c}°C heat offset.
              </span>
            </div>
            <button
              onClick={() => {
                setStressScenario({ rainfall_delta_pct: 0, temp_delta_c: 0 });
                setTimeout(fetchRecommendations, 50);
              }}
              className="px-2.5 py-1 bg-white hover:bg-amber-100/50 rounded-md text-amber-800 border border-amber-200 text-xs font-medium transition cursor-pointer"
            >
              Reset Baseline
            </button>
          </div>
        )}

        {/* 4-Column Quick Telemetry Ribbon across top */}
        {climate && (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Metric 1: Annual Precipitation */}
            <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-zinc-500">
                <span className="text-xs font-medium">Annual Precipitation</span>
                <CloudRain className="w-4 h-4 text-zinc-400" />
              </div>
              <div className="mt-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900">
                    {climate.annual_rainfall_mm}
                  </span>
                  <span className="text-xs text-zinc-500 font-medium">mm</span>
                </div>
                <div className="mt-1.5 flex items-center gap-1 text-xs">
                  {climate.rainfall_5yr_trend_pct < 0 ? (
                    <span className="text-amber-700 font-medium flex items-center gap-0.5">
                      <TrendingDown className="w-3.5 h-3.5" />
                      {climate.rainfall_5yr_trend_pct}% anomaly
                    </span>
                  ) : (
                    <span className="text-emerald-700 font-medium flex items-center gap-0.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      +{climate.rainfall_5yr_trend_pct}% anomaly
                    </span>
                  )}
                  <span className="text-zinc-400">vs 5-yr avg</span>
                </div>
              </div>
            </div>

            {/* Metric 2: Heat Stress Days */}
            <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-zinc-500">
                <span className="text-xs font-medium">Heat Stress Days (&gt;35°C)</span>
                <Flame className="w-4 h-4 text-amber-500" />
              </div>
              <div className="mt-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900">
                    {climate.heat_days_above_35c}
                  </span>
                  <span className="text-xs text-zinc-500 font-medium">Days</span>
                </div>
                <div className="mt-1.5 flex items-center justify-between text-xs text-zinc-500">
                  <span className="font-medium text-zinc-700">Avg: {climate.avg_temperature_c}°C</span>
                  <span className="text-zinc-400">NASA POWER</span>
                </div>
              </div>
            </div>

            {/* Metric 3: Root-Zone Moisture */}
            <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-zinc-500">
                <span className="text-xs font-medium">Root-Zone Moisture</span>
                <Droplet className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="mt-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900">
                    {Math.round(climate.root_zone_soil_wetness * 100)}%
                  </span>
                  <span className="text-xs text-zinc-500 font-medium">Volumetric</span>
                </div>
                <div className="mt-1.5 flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>SMAP L4 Active</span>
                </div>
              </div>
            </div>

            {/* Metric 4: Soil Chemistry & Texture */}
            <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-zinc-500">
                <span className="text-xs font-medium">Soil Chemistry &amp; Horizon</span>
                <Layers className="w-4 h-4 text-zinc-400" />
              </div>
              <div className="mt-2">
                <div className="flex items-baseline gap-1.5 truncate">
                  <span className="text-2xl font-bold tracking-tight text-zinc-900">
                    pH {climate.soil_info.ph}
                  </span>
                  <span className="text-xs text-zinc-600 font-medium capitalize">
                    · {climate.soil_info.texture}
                  </span>
                </div>
                <div className="mt-1.5 flex items-center justify-between text-xs text-zinc-400">
                  <span className="text-zinc-600 font-medium truncate">{climate.soil_info.classification}</span>
                  <span>ISRIC</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 2-Column Responsive Split: Left Controls (5 cols) & Right Rotations (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ================================================================= */}
          {/* LEFT COLUMN: FIELD PARCEL, PROFILE, WEIGHTS & STRESS SIMULATOR     */}
          {/* ================================================================= */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* 1. Interactive Satellite Field Map */}
            <MapPicker
              lat={location.lat}
              lon={location.lon}
              regionName={location.region_name}
              onLocationChange={handleLocationChange}
              t={t}
            />

            {/* 2. Farm Soil & Hydrological Baseline */}
            <FarmerWizard
              constraints={constraints}
              onChange={setConstraints}
              t={t}
            />

            {/* 3. Strategic Agronomic Priorities */}
            <PrioritySliders
              priorities={priorities}
              onChange={setPriorities}
              t={t}
            />

            {/* 4. Climate Shock Simulator */}
            <ClimateShockSlider
              scenario={stressScenario}
              onChange={setStressScenario}
              onApply={fetchRecommendations}
              isLoading={isLoading}
              t={t}
            />

            {/* 5. Primary Calculate Action Button */}
            <button
              onClick={fetchRecommendations}
              disabled={isLoading}
              className="w-full py-3 px-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-medium text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-zinc-300" />
                  <span>{t.calculating}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>{t.calculateButton}</span>
                </>
              )}
            </button>
          </div>

          {/* ================================================================= */}
          {/* RIGHT COLUMN: RECOMMENDATIONS & CLIMATE INTELLIGENCE              */}
          {/* ================================================================= */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Action Ribbon & Results Count */}
            {resultData && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-zinc-200">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-semibold text-zinc-900">
                      Verified Climate-Smart Rotations
                    </h2>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      {resultData.recommendations.length} Sequences
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Evaluated in {resultData.generation_time_ms} ms • Optimized for {climate?.soil_info.classification}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsSmsOpen(true)}
                    className="px-3 py-1.5 rounded-md bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-50 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp / SMS</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="px-3 py-1.5 rounded-md bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-50 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                  >
                    <Printer className="w-3.5 h-3.5 text-zinc-600" />
                    <span>Print Sheet</span>
                  </button>
                </div>
              </div>
            )}

            {/* Error Alert */}
            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">Advisory Engine Notice</div>
                  <div className="mt-0.5">{error}</div>
                </div>
              </div>
            )}

            {/* Rotation Sequences Cards */}
            {resultData ? (
              <div className="space-y-4">
                {resultData.recommendations.map((plan, idx) => (
                  <RecommendationCard
                    key={plan.rotation_id}
                    plan={plan}
                    climate={resultData.climate_summary}
                    t={t}
                    isTopPick={idx === 0}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center border border-zinc-200 text-zinc-500 space-y-3">
                <Satellite className="w-8 h-8 mx-auto text-emerald-600 animate-pulse" />
                <p className="text-xs font-medium">Ingesting NASA Earth Observations...</p>
              </div>
            )}

            {/* Data Provenance Footer Strip */}
            <div className="p-3 bg-zinc-100/70 rounded-lg border border-zinc-200/60 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-1.5">
              <span>NASA Goddard Institute &amp; SMAP Mission Telemetry v4.2</span>
              <span>WGS84 Lat/Lon Coordinates · ISO 8601</span>
            </div>
          </div>
        </div>
      </main>

      {/* SMS & WhatsApp Modal */}
      {resultData && (
        <SmsSimulatorModal
          isOpen={isSmsOpen}
          onClose={() => setIsSmsOpen(false)}
          smsText={resultData.sms_format}
          whatsappText={resultData.whatsapp_format}
        />
      )}

      {/* Printable Sheet (Only visible on browser print) */}
      {resultData && (
        <PrintAdvisorySheet data={resultData} />
      )}
    </div>
  );
};
