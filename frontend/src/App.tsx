import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Printer, 
  MessageSquare, 
  AlertCircle, 
  Satellite, 
  CloudRain, 
  Flame, 
  Layers, 
  Compass,
  ArrowRight
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
    region_name: "Maharashtra (Jalna), India"
  });

  // Constraints State
  const [constraints, setConstraints] = useState<FarmerConstraints>({
    soil_type: 'auto',
    water_access: 'rainfed',
    field_size_ha: 1.5,
    previous_crop_id: 'cotton',
    budget_level: 'medium',
    language: 'en'
  });

  // Priorities State
  const [priorities, setPriorities] = useState<FarmerPriorities>({
    save_water: 2.0,
    improve_soil: 2.0,
    maximize_income: 1.0,
    reduce_risk: 1.5
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

  // Run on mount
  useEffect(() => {
    fetchRecommendations();
  }, [location.lat, location.lon]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Navbar */}
      <Navbar
        t={t}
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        dataSource={resultData?.climate_summary.data_source}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 no-print">
        {/* Banner Alert for Simulated Climate Stress if active */}
        {resultData?.climate_summary.is_simulated_stress && (
          <div className="mb-6 bg-gradient-to-r from-orange-600 to-rose-600 text-white p-3.5 rounded-2xl shadow-md flex items-center justify-between text-xs sm:text-sm font-bold">
            <div className="flex items-center space-x-2">
              <Flame className="w-5 h-5 text-amber-200 animate-bounce" />
              <span>
                SIMULATION ACTIVE: Recommendations recalculated for {stressScenario.rainfall_delta_pct}% rainfall and +{stressScenario.temp_delta_c}°C heat stress.
              </span>
            </div>
            <button
              onClick={() => {
                setStressScenario({ rainfall_delta_pct: 0, temp_delta_c: 0 });
                setTimeout(fetchRecommendations, 50);
              }}
              className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-white font-semibold transition text-xs"
            >
              Reset Baseline
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: Input Panels (Map, Wizard, Priorities, Stress Slider) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Map Picker */}
            <MapPicker
              lat={location.lat}
              lon={location.lon}
              regionName={location.region_name}
              onLocationChange={handleLocationChange}
              t={t}
            />

            {/* Farm Characteristics Wizard */}
            <FarmerWizard
              constraints={constraints}
              onChange={setConstraints}
              t={t}
            />

            {/* Strategic Priorities */}
            <PrioritySliders
              priorities={priorities}
              onChange={setPriorities}
              t={t}
            />

            {/* Climate Shock Scenario Slider */}
            <ClimateShockSlider
              scenario={stressScenario}
              onChange={setStressScenario}
              onApply={fetchRecommendations}
              isLoading={isLoading}
              t={t}
            />

            {/* CTA Button */}
            <button
              onClick={fetchRecommendations}
              disabled={isLoading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-black text-base shadow-lg shadow-emerald-900/20 flex items-center justify-center space-x-2 transition disabled:opacity-60"
            >
              <Sparkles className="w-5 h-5" />
              <span>{isLoading ? t.calculating : t.calculateButton}</span>
            </button>
          </div>

          {/* RIGHT COLUMN: Results Dashboard */}
          <div className="lg:col-span-7 space-y-5">
            {/* Action Bar (Print, SMS View) */}
            {resultData && (
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center space-x-2 text-xs text-slate-600 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span>{resultData.recommendations.length} Climate-Smart Rotation Options</span>
                  <span className="text-slate-400 font-mono">({resultData.generation_time_ms} ms)</span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsSmsOpen(true)}
                    className="flex items-center space-x-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition shadow-sm"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t.viewSms}</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="flex items-center space-x-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 transition"
                  >
                    <Printer className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{t.printAdvisory}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Satellite Climate Baseline Summary Pill Cards */}
            {resultData && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-sm">
                  <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center space-x-1">
                    <CloudRain className="w-3 h-3 text-blue-500" />
                    <span>NASA Rainfall</span>
                  </div>
                  <div className="text-sm sm:text-base font-black text-slate-900 mt-0.5">
                    {resultData.climate_summary.annual_rainfall_mm} <span className="text-xs font-normal text-slate-500">mm</span>
                  </div>
                  <div className="text-[10px] text-slate-500">
                    5-yr: {resultData.climate_summary.rainfall_5yr_trend_pct > 0 ? '+' : ''}{resultData.climate_summary.rainfall_5yr_trend_pct}%
                  </div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-sm">
                  <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center space-x-1">
                    <Flame className="w-3 h-3 text-orange-500" />
                    <span>Heat Days &gt;35°C</span>
                  </div>
                  <div className="text-sm sm:text-base font-black text-slate-900 mt-0.5">
                    {resultData.climate_summary.heat_days_above_35c} <span className="text-xs font-normal text-slate-500">days</span>
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Avg: {resultData.climate_summary.avg_temperature_c}°C
                  </div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-sm">
                  <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center space-x-1">
                    <Satellite className="w-3 h-3 text-emerald-500" />
                    <span>SMAP Soil Wetness</span>
                  </div>
                  <div className="text-sm sm:text-base font-black text-slate-900 mt-0.5">
                    {(resultData.climate_summary.root_zone_soil_wetness * 100).toFixed(0)} <span className="text-xs font-normal text-slate-500">%</span>
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Root-Zone Index
                  </div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-sm">
                  <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center space-x-1">
                    <Layers className="w-3 h-3 text-purple-500" />
                    <span>Soil Texture</span>
                  </div>
                  <div className="text-sm sm:text-base font-black text-slate-900 mt-0.5 truncate">
                    {resultData.climate_summary.soil_info.texture.toUpperCase()}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    pH {resultData.climate_summary.soil_info.ph}
                  </div>
                </div>
              </div>
            )}

            {/* Error Message if any */}
            {error && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Recommendation Error</div>
                  <div>{error}</div>
                </div>
              </div>
            )}

            {/* Recommendation Cards List */}
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
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-400 space-y-3">
                <Satellite className="w-12 h-12 mx-auto text-slate-300 animate-spin" />
                <p className="text-sm font-semibold">{t.calculating}</p>
              </div>
            )}
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
