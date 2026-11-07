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
  Compass,
  ArrowRight,
  ArrowLeft,
  Check,
  MapPin,
  Sliders,
  CheckCircle2,
  Phone
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

  // Progressive Step State: 1 = Location, 2 = Soil & Water, 3 = Priorities, 4 = Verified Rotations
  const [currentStep, setCurrentStep] = useState<number>(1);

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

  // Fetch recommendations from API with explicit constraints override if provided
  const fetchRecommendations = async (overrideConstraints?: FarmerConstraints) => {
    setIsLoading(true);
    setError(null);
    try {
      const activeConstraints = overrideConstraints || constraints;
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          location,
          constraints: activeConstraints,
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

  // Sync language with constraints and re-fetch if recommendations already generated
  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang);
    const updatedConstraints = { ...constraints, language: lang };
    setConstraints(updatedConstraints);
    if (resultData || currentStep === 4) {
      fetchRecommendations(updatedConstraints);
    }
  };

  // Location update handler
  const handleLocationChange = (lat: number, lon: number, name?: string) => {
    setLocation({
      lat,
      lon,
      region_name: name || `Field (${lat.toFixed(2)}, ${lon.toFixed(2)})`
    });
  };

  // Handle final step submission
  const handleGenerateRecommendations = async () => {
    await fetchRecommendations();
    setCurrentStep(4);
  };

  const handlePrint = () => {
    window.print();
  };

  const climate = resultData?.climate_summary;

  const stepsList = [
    { num: 1, label: t.step1.split('. ')[1] || "Location", icon: MapPin },
    { num: 2, label: t.step2.split('. ')[1] || "Soil & Water", icon: Layers },
    { num: 3, label: t.step3.split('. ')[1] || "Priorities", icon: Sliders },
    { num: 4, label: t.step4.split('. ')[1] || "Rotations", icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col font-sans selection:bg-emerald-600 selection:text-white">
      {/* Top App Bar */}
      <Navbar
        t={t}
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        dataSource={climate?.data_source || t.liveSatApi}
        onOpenSms={() => setIsSmsOpen(true)}
        onPrint={handlePrint}
      />

      {/* Progressive Step Progress Breadcrumb Bar */}
      <div className="bg-white border-b border-zinc-200 py-3 px-4 sm:px-6 lg:px-8 no-print sticky top-14 z-30">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto py-1">
            {stepsList.map((st, idx) => {
              const isCurrent = currentStep === st.num;
              const isPast = currentStep > st.num;
              const Icon = st.icon;

              return (
                <React.Fragment key={st.num}>
                  <button
                    type="button"
                    onClick={() => {
                      // Allow jumping to steps already visited or up to step 3
                      if (st.num <= 3 || resultData) {
                        setCurrentStep(st.num);
                      }
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                      isCurrent
                        ? "bg-zinc-900 text-white shadow-xs"
                        : isPast
                        ? "text-emerald-700 bg-emerald-50 hover:bg-emerald-100/70"
                        : "text-zinc-500 hover:text-zinc-800 bg-zinc-100"
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isCurrent
                        ? "bg-white text-zinc-900"
                        : isPast
                        ? "bg-emerald-600 text-white"
                        : "bg-zinc-300 text-zinc-700"
                    }`}>
                      {isPast ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : st.num}
                    </span>
                    <span className="whitespace-nowrap">{st.label}</span>
                  </button>

                  {idx < stepsList.length - 1 && (
                    <span className="text-zinc-300 hidden sm:inline">/</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {currentStep === 4 && (
            <button
              onClick={() => setCurrentStep(1)}
              className="text-xs font-medium text-zinc-600 hover:text-zinc-900 flex items-center gap-1 transition cursor-pointer"
            >
              <span>{t.editInputs}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Guided Workspace */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col no-print">

        {/* ================================================================= */}
        {/* STEP 1: PIN FIELD LOCATION                                       */}
        {/* ================================================================= */}
        {currentStep === 1 && (
          <div className="max-w-3xl mx-auto w-full flex flex-col gap-5 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  Step 1 of 3
                </span>
                <span className="text-xs text-zinc-400">NASA Earth Observations Uplink</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 mt-1">
                {t.step1}
              </h1>
              <p className="text-sm text-zinc-500 mt-1">
                {t.step1Desc}
              </p>
            </div>

            <MapPicker
              lat={location.lat}
              lon={location.lon}
              regionName={location.region_name}
              onLocationChange={handleLocationChange}
              t={t}
            />

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-zinc-500">
                Target: <strong>{location.region_name || `${location.lat.toFixed(2)}, ${location.lon.toFixed(2)}`}</strong>
              </span>

              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="py-2.5 px-5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-medium text-sm transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-98"
              >
                <span>{t.continueToFarm}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* STEP 2: FARM CHARACTERISTICS & SOIL HORIZON                      */}
        {/* ================================================================= */}
        {currentStep === 2 && (
          <div className="max-w-3xl mx-auto w-full flex flex-col gap-5 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  Step 2 of 3
                </span>
                <span className="text-xs text-zinc-400">Field Calibration</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 mt-1">
                {t.step2}
              </h1>
              <p className="text-sm text-zinc-500 mt-1">
                {t.step2Desc}
              </p>
            </div>

            <FarmerWizard
              constraints={constraints}
              onChange={setConstraints}
              t={t}
            />

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="py-2 px-4 rounded-xl border border-zinc-200 text-zinc-700 hover:bg-zinc-100 font-medium text-xs transition cursor-pointer"
              >
                {t.backToMap}
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="py-2.5 px-5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-medium text-sm transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-98"
              >
                <span>{t.continueToPriorities}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* STEP 3: STRATEGIC FARMER PRIORITIES                              */}
        {/* ================================================================= */}
        {currentStep === 3 && (
          <div className="max-w-3xl mx-auto w-full flex flex-col gap-5 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  Step 3 of 3
                </span>
                <span className="text-xs text-zinc-400">Multi-Objective Optimization</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 mt-1">
                {t.step3}
              </h1>
              <p className="text-sm text-zinc-500 mt-1">
                {t.step3Desc}
              </p>
            </div>

            <PrioritySliders
              priorities={priorities}
              onChange={setPriorities}
              t={t}
            />

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="py-2 px-4 rounded-xl border border-zinc-200 text-zinc-700 hover:bg-zinc-100 font-medium text-xs transition cursor-pointer"
              >
                {t.backToSoil}
              </button>

              <button
                type="button"
                onClick={handleGenerateRecommendations}
                disabled={isLoading}
                className="py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md active:scale-98 disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>{t.calculating}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-200" />
                    <span>{t.generateRotations}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* STEP 4: NASA INTELLIGENCE & VERIFIED ROTATIONS DOSSIER            */}
        {/* ================================================================= */}
        {currentStep === 4 && (
          <div className="w-full flex flex-col gap-6 animate-in fade-in duration-200">
            {/* Top Alert for Simulated Climate Stress if active */}
            {climate?.is_simulated_stress && (
              <div className="bg-amber-50 border border-amber-200/80 text-amber-900 p-3.5 rounded-xl shadow-xs flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-2.5">
                  <Flame className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    {t.simulatedStressAlert
                      .replace('{pct}', String(stressScenario.rainfall_delta_pct))
                      .replace('{temp}', String(stressScenario.temp_delta_c))}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setStressScenario({ rainfall_delta_pct: 0, temp_delta_c: 0 });
                    setTimeout(() => fetchRecommendations(), 50);
                  }}
                  className="px-2.5 py-1 bg-white hover:bg-amber-100/50 rounded-md text-amber-800 border border-amber-200 text-xs font-medium transition cursor-pointer"
                >
                  {t.resetBaseline}
                </button>
              </div>
            )}

            {/* 4-Column Quick Telemetry Ribbon */}
            {climate && (
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Metric 1: Annual Precipitation */}
                <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between text-zinc-500">
                    <span className="text-xs font-medium">{t.annualPrecip}</span>
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
                          {climate.rainfall_5yr_trend_pct}% {t.anomalyVsAvg}
                        </span>
                      ) : (
                        <span className="text-emerald-700 font-medium flex items-center gap-0.5">
                          <TrendingUp className="w-3.5 h-3.5" />
                          +{climate.rainfall_5yr_trend_pct}% {t.anomalyVsAvg}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Metric 2: Heat Stress Days */}
                <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between text-zinc-500">
                    <span className="text-xs font-medium">{t.heatStressDays}</span>
                    <Flame className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="mt-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-bold tracking-tight text-zinc-900">
                        {climate.heat_days_above_35c}
                      </span>
                      <span className="text-xs text-zinc-500 font-medium">{t.days}</span>
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
                    <span className="text-xs font-medium">{t.rootZoneMoisture}</span>
                    <Droplet className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="mt-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-bold tracking-tight text-zinc-900">
                        {Math.round(climate.root_zone_soil_wetness * 100)}%
                      </span>
                      <span className="text-xs text-zinc-500 font-medium">{t.volumetric}</span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>{t.smapActive}</span>
                    </div>
                  </div>
                </div>

                {/* Metric 4: Soil Chemistry & Texture */}
                <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between text-zinc-500">
                    <span className="text-xs font-medium">{t.soilChemistry}</span>
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

            {/* 2-Column Responsive Layout: Left Summary & Stress Simulator, Right Verified Rotations */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Farm Baseline Summary & Climate Stress Shock Slider */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                {/* Field Profile Summary Box */}
                <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-xs flex flex-col gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm font-semibold text-zinc-900">Field Baseline</span>
                    </div>
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="text-xs text-emerald-700 hover:text-emerald-800 font-medium cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-zinc-400 block">Coordinates:</span>
                      <span className="font-semibold text-zinc-800">{location.lat.toFixed(2)}°, {location.lon.toFixed(2)}°</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block">Region:</span>
                      <span className="font-semibold text-zinc-800 truncate block">{location.region_name || "Custom Field"}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block">Soil Horizon:</span>
                      <span className="font-semibold text-zinc-800 capitalize">{constraints.soil_type}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block">Water Source:</span>
                      <span className="font-semibold text-zinc-800 capitalize">{constraints.water_access}</span>
                    </div>
                  </div>
                </div>

                {/* Climate Shock Simulator */}
                <ClimateShockSlider
                  scenario={stressScenario}
                  onChange={setStressScenario}
                  onApply={() => fetchRecommendations()}
                  isLoading={isLoading}
                  t={t}
                />

                {/* Direct Action: Multi-Channel Delivery Pill */}
                <div className="bg-emerald-50/70 border border-emerald-200/80 p-4 rounded-xl flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-900 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-700" />
                      Smallholder Delivery Channels
                    </span>
                    <span className="text-[10px] bg-emerald-200/70 text-emerald-800 px-2 py-0.5 rounded font-medium">Live</span>
                  </div>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Test how this advisory is received by smallholder farmers over SMS (2G), WhatsApp, or automated Voice Phone Calls.
                  </p>
                  <button
                    onClick={() => setIsSmsOpen(true)}
                    className="w-full py-2 px-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-xs font-medium transition cursor-pointer flex items-center justify-center gap-1.5 mt-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Launch Delivery Channels (SMS / Voice)</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Verified Rotation Sequences */}
              <div className="lg:col-span-8 flex flex-col gap-4">
                {/* Action Ribbon & Results Count */}
                {resultData && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-zinc-200">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base sm:text-lg font-semibold text-zinc-900">
                          {t.verifiedRotations}
                        </h2>
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                          {resultData.recommendations.length} {t.sequencesCount}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        {t.evaluatedIn
                          .replace('{ms}', String(resultData.generation_time_ms))
                          .replace('{soil}', climate?.soil_info.classification || '')}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsSmsOpen(true)}
                        className="px-3 py-1.5 rounded-md bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-50 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{t.whatsappSms}</span>
                      </button>

                      <button
                        onClick={handlePrint}
                        className="px-3 py-1.5 rounded-md bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-50 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                      >
                        <Printer className="w-3.5 h-3.5 text-zinc-600" />
                        <span>{t.printSheet}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Error Alert if any */}
                {error && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">{t.engineNotice}</div>
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
                    <p className="text-xs font-medium">{t.ingestingNasa}</p>
                  </div>
                )}

                {/* Data Provenance Footer Strip */}
                <div className="p-3 bg-zinc-100/70 rounded-lg border border-zinc-200/60 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-1.5">
                  <span>{t.dataProvenance}</span>
                  <span>{t.coordsStandard}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Multi-Channel Delivery Simulator: SMS, WhatsApp & Voice Call */}
      {resultData && (
        <SmsSimulatorModal
          isOpen={isSmsOpen}
          onClose={() => setIsSmsOpen(false)}
          smsText={resultData.sms_format}
          whatsappText={resultData.whatsapp_format}
          voiceScript={resultData.voice_script}
          currentLang={currentLang}
          t={t}
        />
      )}

      {/* Printable Sheet (Only visible on browser print) */}
      {resultData && (
        <PrintAdvisorySheet data={resultData} />
      )}
    </div>
  );
};
