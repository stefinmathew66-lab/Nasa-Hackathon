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
  Compass,
  CheckCircle,
  FileText
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

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-sans selection:bg-primary selection:text-white">
      {/* Top App Bar from Stitch */}
      <Navbar
        t={t}
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        dataSource={resultData?.climate_summary.data_source || "NASA POWER & SMAP Satellites Active"}
        onOpenSms={() => setIsSmsOpen(true)}
        onPrint={handlePrint}
      />

      {/* Main Advisory Workspace: 40% / 60% Responsive Split */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 max-w-[1720px] mx-auto w-full no-print">
        {/* Banner Alert for Simulated Climate Stress if active */}
        {resultData?.climate_summary.is_simulated_stress && (
          <div className="mb-6 bg-error-container/30 border border-error/40 text-on-error-container p-3.5 rounded-lg shadow-sm flex items-center justify-between text-xs sm:text-sm font-mono font-bold">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-error animate-bounce" />
              <span>
                ACTIVE CLIMATE STRESS SIMULATION: Recommendations recalibrated for {stressScenario.rainfall_delta_pct}% rainfall deficit and +{stressScenario.temp_delta_c}°C heat stress.
              </span>
            </div>
            <button
              onClick={() => {
                setStressScenario({ rainfall_delta_pct: 0, temp_delta_c: 0 });
                setTimeout(fetchRecommendations, 50);
              }}
              className="px-3 py-1 bg-white hover:bg-surface-container rounded text-error border border-error/30 font-semibold transition text-xs"
            >
              Reset Baseline
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ================================================================= */}
          {/* LEFT COLUMN: INPUTS, PARAMETERS & CLIMATE STRESS SIMULATOR (~40%) */}
          {/* ================================================================= */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* 1. Interactive Satellite Field Map Card */}
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

            {/* 5. Primary Generate Action Button */}
            <button
              onClick={fetchRecommendations}
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-secondary text-white rounded-lg font-headline text-base font-bold shadow-md hover:bg-secondary-on-container transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-60"
            >
              <Sparkles className="w-5 h-5 text-secondary-fixed" />
              <span>{isLoading ? "Consulting NASA Earth Observations..." : "Generate Resilient 3-Season Rotations (AI + NASA EO)"}</span>
            </button>
          </div>

          {/* ================================================================= */}
          {/* RIGHT COLUMN: NASA CLIMATE INTELLIGENCE & ROTATION PLANS (~60%)   */}
          {/* ================================================================= */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* 1. Action & Operational Mode Bar */}
            {resultData && (
              <div className="bg-surface-container-lowest rounded-lg border border-outline-variant p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-secondary"></span>
                    <h2 className="text-base sm:text-lg font-headline font-bold text-primary">
                      {resultData.recommendations.length} Climate-Smart Rotation Sequences Verified
                    </h2>
                  </div>
                  <p className="text-xs font-mono text-on-surface-variant mt-0.5">
                    Calculated in {resultData.generation_time_ms} ms via NASA Agro-Matrix • Calibrated for {resultData.climate_summary.soil_info.classification}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsSmsOpen(true)}
                    className="px-3 py-1.5 rounded-lg bg-surface-container-low text-primary border border-outline-variant hover:bg-surface-container text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-secondary" />
                    <span>SMS / WhatsApp Card</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="px-3 py-1.5 rounded-lg bg-surface-container-low text-primary border border-outline-variant hover:bg-surface-container text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-primary" />
                    <span>Print Dossier</span>
                  </button>
                </div>
              </div>
            )}

            {/* 2. NASA Baseline Telemetry Metric Tiles (Grid of 4) */}
            {resultData && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {/* Tile 1: Precipitation */}
                <div className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-mono uppercase text-on-surface-variant flex items-center justify-between">
                      <span>ANNUAL PRECIP</span>
                      <CloudRain className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div className="text-xl font-headline font-bold text-primary mt-1">
                      {resultData.climate_summary.annual_rainfall_mm} <span className="text-xs font-mono font-normal text-on-surface-variant">mm</span>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-surface-container flex items-center justify-between text-[10px] font-mono">
                    <span className={resultData.climate_summary.rainfall_5yr_trend_pct < 0 ? "text-error font-semibold" : "text-secondary font-semibold"}>
                      {resultData.climate_summary.rainfall_5yr_trend_pct > 0 ? '+' : ''}{resultData.climate_summary.rainfall_5yr_trend_pct}% anomaly
                    </span>
                    <span className="text-outline">5-yr avg</span>
                  </div>
                </div>

                {/* Tile 2: Heat Days */}
                <div className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-mono uppercase text-on-surface-variant flex items-center justify-between">
                      <span>HEAT DAYS &gt;35°C</span>
                      <Flame className="w-3.5 h-3.5 text-error" />
                    </div>
                    <div className="text-xl font-headline font-bold text-error mt-1">
                      {resultData.climate_summary.heat_days_above_35c} <span className="text-xs font-mono font-normal text-on-surface-variant">Days</span>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-surface-container flex items-center justify-between text-[10px] font-mono">
                    <span className="text-error font-semibold">Avg: {resultData.climate_summary.avg_temperature_c}°C</span>
                    <span className="text-outline">NASA POWER</span>
                  </div>
                </div>

                {/* Tile 3: SMAP Root-Zone Wetness */}
                <div className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-mono uppercase text-on-surface-variant flex items-center justify-between">
                      <span>ROOT-ZONE MOISTURE</span>
                      <Droplet className="w-3.5 h-3.5 text-secondary" />
                    </div>
                    <div className="text-xl font-headline font-bold text-secondary mt-1">
                      {Math.round(resultData.climate_summary.root_zone_soil_wetness * 100)}% <span className="text-xs font-mono font-normal text-on-surface-variant">Vol</span>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-surface-container flex items-center justify-between text-[10px] font-mono">
                    <span className="text-on-surface-variant font-medium">Moderate Stress</span>
                    <span className="text-primary font-bold">SMAP L4</span>
                  </div>
                </div>

                {/* Tile 4: Soil Chemistry */}
                <div className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-mono uppercase text-on-surface-variant flex items-center justify-between">
                      <span>SOIL CHEMISTRY</span>
                      <Layers className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div className="text-xl font-headline font-bold text-on-surface mt-1 truncate">
                      pH {resultData.climate_summary.soil_info.ph}
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-surface-container flex items-center justify-between text-[10px] font-mono truncate">
                    <span className="text-secondary font-medium truncate">{resultData.climate_summary.soil_info.texture.toUpperCase()}</span>
                    <span className="text-outline">ISRIC</span>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message if any */}
            {error && (
              <div className="p-4 rounded-lg bg-error-container/40 border border-error text-error text-xs font-mono flex items-start gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Recommendation Engine Alert</div>
                  <div>{error}</div>
                </div>
              </div>
            )}

            {/* 3. Recommended 3-Season Rotation Sequences */}
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
              <div className="bg-surface-container-lowest rounded-lg p-12 text-center border border-outline-variant text-on-surface-variant space-y-3">
                <Satellite className="w-12 h-12 mx-auto text-primary animate-spin" />
                <p className="text-sm font-mono font-semibold">Consulting NASA Earth Observation Models...</p>
              </div>
            )}

            {/* 4. Advisory Disclaimer Footer Strip */}
            <div className="p-3 bg-surface-container-low rounded border border-outline-variant flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-on-surface-variant gap-2">
              <span>DATA SOURCE: NASA Goddard Institute &amp; SMAP Mission Telemetry v4.2 • Earth Science Division</span>
              <span>Telemetry Refreshed: Real-Time Ingestion</span>
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
