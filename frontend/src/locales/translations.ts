export interface Translations {
  appTitle: string;
  tagline: string;
  brandName: string;
  adssVersion: string;
  liveSatApi: string;
  exportDossier: string;
  whatsappSms: string;
  printSheet: string;
  resetBaseline: string;
  simulatedStressAlert: string;
  engineNotice: string;
  dataProvenance: string;
  coordsStandard: string;
  ingestingNasa: string;
  calculateButton: string;
  calculating: string;
  verifiedRotations: string;
  sequencesCount: string;
  evaluatedIn: string;
  
  // Telemetry Ribbon
  annualPrecip: string;
  heatStressDays: string;
  rootZoneMoisture: string;
  soilChemistry: string;
  anomalyVsAvg: string;
  days: string;
  volumetric: string;
  smapActive: string;

  // Map Picker
  fieldCoordinates: string;
  gpsButton: string;
  smapResolution: string;
  presets: string;

  // Farm Profile (FarmerWizard)
  soilWaterProfile: string;
  fieldParameters: string;
  soilTextureHorizon: string;
  clayVertisol: string;
  siltyLoam: string;
  sandyAridisol: string;
  autoDetect: string;
  irrigationCapacity: string;
  rainfed: string;
  borewell: string;
  canalNetwork: string;
  precisionDrip: string;
  fieldSize: string;
  priorCrop: string;
  fallowNone: string;
  budgetCap: string;
  low: string;
  medium: string;
  high: string;

  // Priorities (PrioritySliders)
  strategicWeights: string;
  drought: string;
  soil: string;
  income: string;
  waterConservation: string;
  soilOrganicMatter: string;
  smallholderCashFlow: string;
  climateRiskBuffer: string;
  farmerGoalsTitle: string;
  farmerGoalsSubtitle: string;
  droughtStrategyTitle: string;
  droughtStrategyDesc: string;
  soilStrategyTitle: string;
  soilStrategyDesc: string;
  incomeStrategyTitle: string;
  incomeStrategyDesc: string;
  waterGoalDesc: string;
  soilGoalDesc: string;
  incomeGoalDesc: string;
  riskGoalDesc: string;
  priorityNormal: string;
  priorityHigh: string;
  priorityMax: string;
  fineTuneTitle: string;
  fineTuneDesc: string;
  favorsCropsLabel: string;
  droughtCropsExample: string;
  soilCropsExample: string;
  incomeCropsExample: string;

  // Climate Simulator (ClimateShockSlider)
  climateStressSimulator: string;
  simulationActive: string;
  coupledSmapPower: string;
  rainfallAnomaly: string;
  temperatureOffset: string;
  vsBaseline: string;
  applyStress: string;

  // Recommendation Card
  topRecommendation: string;
  rankPrefix: string;
  rotationSequence: string;
  resilience: string;
  season: string;
  waterReq: string;
  biologicalNFixer: string;
  waterFit: string;
  soilRegeneration: string;
  climateBuffer: string;
  incomeFit: string;
  nasaInsight: string;
  waterConserved: string;
  showLedger: string;
  hideLedger: string;
  cycleTotal: string;
  nitrogenBalance: string;
  climateRiskNotice: string;

  // Stepper Guided Flow
  step1: string;
  step1Desc: string;
  step2: string;
  step2Desc: string;
  step3: string;
  step3Desc: string;
  step4: string;
  continueToFarm: string;
  continueToPriorities: string;
  generateRotations: string;
  backToMap: string;
  backToSoil: string;
  editInputs: string;
  callPhone: string;
  startLiveCall: string;
  phoneNumberPlaceholder: string;

  // Low Tech Modal
  lowTechTitle: string;
  cheapestDeviceFirst: string;
  basicSms: string;
  whatsAppCard: string;
  voiceCall: string;
  playVoiceAdvisory: string;
  stopVoiceAdvisory: string;
  incomingCall: string;
  spokenTextLabel: string;
  copyText: string;
  copied: string;
}

export const translations: Record<string, Translations> = {
  en: {
    appTitle: "NASA Crop Rotation Advisor",
    tagline: "Climate-resilient rotation plans powered by NASA Earth observations & local soil data",
    brandName: "AgroSphere EO",
    adssVersion: "NASA ADSS v4.2",
    liveSatApi: "SMAP & POWER Live",
    exportDossier: "Export Dossier",
    whatsappSms: "SMS / WhatsApp",
    printSheet: "Print Sheet",
    resetBaseline: "Reset Baseline",
    simulatedStressAlert: "Simulated Climate Stress Active: Recalibrated for {pct}% rainfall anomaly and +{temp}°C heat offset.",
    engineNotice: "Advisory Engine Notice",
    dataProvenance: "NASA Goddard Institute & SMAP Mission Telemetry v4.2",
    coordsStandard: "WGS84 Lat/Lon Coordinates · ISO 8601",
    ingestingNasa: "Ingesting NASA Earth Observations...",
    calculateButton: "Calculate Climate-Smart Rotations",
    calculating: "Evaluating NASA Earth Observations...",
    verifiedRotations: "Verified Climate-Smart Rotations",
    sequencesCount: "Sequences",
    evaluatedIn: "Evaluated in {ms} ms • Optimized for {soil}",
    
    annualPrecip: "Annual Precipitation",
    heatStressDays: "Heat Stress Days (>35°C)",
    rootZoneMoisture: "Root-Zone Moisture",
    soilChemistry: "Soil Chemistry & Horizon",
    anomalyVsAvg: "anomaly vs 5-yr avg",
    days: "Days",
    volumetric: "Volumetric",
    smapActive: "SMAP L4 Active",

    fieldCoordinates: "Field Parcel Coordinates",
    gpsButton: "GPS",
    smapResolution: "SMAP Downscaled 1km",
    presets: "Presets:",

    soilWaterProfile: "Soil & Water Profile",
    fieldParameters: "Field Parameters",
    soilTextureHorizon: "Soil Texture Horizon",
    clayVertisol: "Vertisol (Clay)",
    siltyLoam: "Silty Loam",
    sandyAridisol: "Sandy Aridisol",
    autoDetect: "Auto (SMAP)",
    irrigationCapacity: "Irrigation Capacity",
    rainfed: "Rainfed",
    borewell: "Borewell",
    canalNetwork: "Canal Network",
    precisionDrip: "Precision Drip",
    fieldSize: "Field Size",
    priorCrop: "Prior Crop",
    fallowNone: "Fallow / None",
    budgetCap: "Budget Cap",
    low: "Low",
    medium: "Medium",
    high: "High",

    strategicWeights: "Strategic Optimization Weights",
    drought: "Drought",
    soil: "Soil",
    income: "Income",
    waterConservation: "Water Conservation",
    soilOrganicMatter: "Soil Health & Nitrogen",
    smallholderCashFlow: "Smallholder Cash Flow",
    climateRiskBuffer: "Climate Risk Buffer",
    farmerGoalsTitle: "What is your primary goal for this field?",
    farmerGoalsSubtitle: "Choose a quick 1-click strategy, or fine-tune individual goals below:",
    droughtStrategyTitle: "Drought Defense",
    droughtStrategyDesc: "Save maximum water & withstand dry spells",
    soilStrategyTitle: "Soil Restoration",
    soilStrategyDesc: "Rebuild exhausted soil with biological nitrogen",
    incomeStrategyTitle: "Market Cash Flow",
    incomeStrategyDesc: "Maximize crop harvest value and income",
    waterGoalDesc: "Prefers crops with low water requirements (e.g. Sorghum, Pearl Millet)",
    soilGoalDesc: "Prioritizes nitrogen-fixing pulses (Chickpea, Pigeonpea, Lentil)",
    incomeGoalDesc: "Balances food security with profitable market cash crops",
    riskGoalDesc: "Chooses hardy crops resistant to heat (>35°C) and erratic rainfall",
    priorityNormal: "Normal",
    priorityHigh: "High",
    priorityMax: "Maximum",
    fineTuneTitle: "Fine-Tune Individual Goals",
    fineTuneDesc: "Adjust priority levels or use the 1-click strategy presets above.",
    favorsCropsLabel: "Favors crops like:",
    droughtCropsExample: "Sorghum, Pearl Millet, Cowpea",
    soilCropsExample: "Pigeonpea, Chickpea, Groundnut",
    incomeCropsExample: "Sesame, Soybean, Sunflower",

    climateStressSimulator: "Climate Stress Simulator",
    simulationActive: "Simulation Active",
    coupledSmapPower: "Coupled SMAP-POWER",
    rainfallAnomaly: "Rainfall Anomaly",
    temperatureOffset: "Temperature Offset",
    vsBaseline: "vs baseline",
    applyStress: "Apply Stress Model",

    topRecommendation: "Rank #1 · Top Recommendation",
    rankPrefix: "Rank",
    rotationSequence: "Rotation",
    resilience: "Resilience",
    season: "Season",
    waterReq: "Water Req:",
    biologicalNFixer: "🌱 Biological N-Fixer",
    waterFit: "Water Fit",
    soilRegeneration: "Soil Regeneration",
    climateBuffer: "Climate Buffer",
    incomeFit: "Income Fit",
    nasaInsight: "NASA Earth Observation Insight:",
    waterConserved: "water conserved vs standard monoculture",
    showLedger: "Show Agronomic Ledger",
    hideLedger: "Hide Agronomic Ledger",
    cycleTotal: "Total Cycle Water",
    nitrogenBalance: "Estimated Biological Nitrogen Balance",
    climateRiskNotice: "Climate Risk Notice",

    step1: "1. Field Location",
    step1Desc: "Drop a pin on your farm or choose a benchmark pilot region.",
    step2: "2. Soil & Water",
    step2Desc: "4 simple questions to calibrate NASA root-zone & water requirements.",
    step3: "3. Priorities",
    step3Desc: "Adjust what matters most for your farming strategy.",
    step4: "4. Verified Rotations",
    continueToFarm: "Continue: Soil & Water Profile →",
    continueToPriorities: "Continue: Strategic Priorities →",
    generateRotations: "Generate NASA Climate-Smart Rotations 🚀",
    backToMap: "← Back to Map",
    backToSoil: "← Back to Soil Profile",
    editInputs: "← Modify Farm Inputs",
    callPhone: "Call Mobile Phone",
    startLiveCall: "Start Live Voice Call",
    phoneNumberPlaceholder: "Enter phone number (e.g. +91 98765 43210)",

    lowTechTitle: "Multi-Channel Delivery Simulator",
    cheapestDeviceFirst: "Design Principle: Reaching 100% of Smallholders via SMS, WhatsApp & Voice",
    basicSms: "Basic Phone SMS (160 Chars)",
    whatsAppCard: "WhatsApp Card",
    voiceCall: "Automated Voice Call (IVR)",
    playVoiceAdvisory: "Listen to Spoken Call",
    stopVoiceAdvisory: "End Call",
    incomingCall: "Toll-Free Farmer Hotline",
    spokenTextLabel: "Spoken Speech Script",
    copyText: "Copy",
    copied: "Copied!"
  },
  hi: {
    appTitle: "नासा फसल चक्र सलाहकार",
    tagline: "नासा उपग्रह डेटा और मिट्टी विज्ञान द्वारा संचालित टिकाऊ फसल चक्र",
    brandName: "एग्रोस्फीयर ईओ (AgroSphere)",
    adssVersion: "नासा एडीएसएस v4.2",
    liveSatApi: "उपग्रह लाइव डेटा सक्रिय",
    exportDossier: "रिपोर्ट डाउनलोड करें",
    whatsappSms: "व्हाट्सएप / एसएमएस",
    printSheet: "प्रिंट शीट",
    resetBaseline: "रीसेट करें",
    simulatedStressAlert: "जलवायु तनाव सिमुलेशन सक्रिय: {pct}% वर्षा बदलाव और +{temp}°C तापमान के लिए पुनर्गणना।",
    engineNotice: "सलाहकार इंजन सूचना",
    dataProvenance: "नासा गोडार्ड संस्थान एवं SMAP मिशन टेलीमेट्री v4.2",
    coordsStandard: "WGS84 अक्षांश/देशांतर · ISO 8601",
    ingestingNasa: "नासा उपग्रह डेटा प्राप्त हो रहा है...",
    calculateButton: "जलवायु-स्मार्ट फसल चक्र खोजें",
    calculating: "नासा उपग्रह डेटा का मूल्यांकन हो रहा है...",
    verifiedRotations: "सत्यापित जलवायु-स्मार्ट फसल चक्र",
    sequencesCount: "अनुक्रम",
    evaluatedIn: "{ms} मिलीसेकंड में विश्लेषित • {soil} के लिए अनुकूलित",
    
    annualPrecip: "वार्षिक वर्षा",
    heatStressDays: "अत्यधिक गर्मी के दिन (>35°C)",
    rootZoneMoisture: "जड़-क्षेत्र की नमी",
    soilChemistry: "मिट्टी रसायन व संरचना",
    anomalyVsAvg: "5-वर्षीय औसत से अंतर",
    days: "दिन",
    volumetric: "मात्रात्मक",
    smapActive: "SMAP L4 सक्रिय",

    fieldCoordinates: "खेत के निर्देशांक",
    gpsButton: "जीपीएस",
    smapResolution: "SMAP 1 किमी डाउनस्केल्ड",
    presets: "पूर्वनिर्धारित क्षेत्र:",

    soilWaterProfile: "मिट्टी और जल प्रबंधन",
    fieldParameters: "खेत के पैरामीटर",
    soilTextureHorizon: "मिट्टी की बनावट",
    clayVertisol: "काली मिट्टी (वर्टिसोल)",
    siltyLoam: "दोमट मिट्टी (लोम)",
    sandyAridisol: "बलुई मिट्टी (रेतीली)",
    autoDetect: "स्वतः पहचान (SMAP)",
    irrigationCapacity: "सिंचाई क्षमता",
    rainfed: "वर्षाधीन (बारिश)",
    borewell: "नलकूप / बोरवेल",
    canalNetwork: "नहर नेटवर्क",
    precisionDrip: "ड्रिप सिंचाई",
    fieldSize: "खेत का आकार",
    priorCrop: "पिछली फसल",
    fallowNone: "परती / कोई नहीं",
    budgetCap: "लागत सीमा",
    low: "कम",
    medium: "मध्यम",
    high: "उच्च",

    strategicWeights: "रणनीतिक प्राथमिकताएं",
    drought: "सूखा",
    soil: "मिट्टी",
    income: "आय",
    waterConservation: "जल संरक्षण",
    soilOrganicMatter: "मिट्टी स्वास्थ्य एवं नाइट्रोजन",
    smallholderCashFlow: "किसान नकदी प्रवाह",
    climateRiskBuffer: "जलवायु जोखिम सुरक्षा",
    farmerGoalsTitle: "इस खेत के लिए आपका मुख्य लक्ष्य क्या है?",
    farmerGoalsSubtitle: "एक त्वरित रणनीति चुनें, या नीचे अपने लक्ष्यों को अनुकूलित करें:",
    droughtStrategyTitle: "सूखा सुरक्षा",
    droughtStrategyDesc: "अधिकतम जल बचत और कम वर्षा में बचाव",
    soilStrategyTitle: "मिट्टी सुधार",
    soilStrategyDesc: "थकी हुई मिट्टी में प्राकृतिक नाइट्रोजन की पुनःपूर्ति",
    incomeStrategyTitle: "अधिकतम आय",
    incomeStrategyDesc: "बाजार में अधिक मूल्य वाली फसलों से लाभ",
    waterGoalDesc: "कम पानी वाली फसलों को प्राथमिकता देता है (जैसे ज्वार, बाजरा)",
    soilGoalDesc: "नाइट्रोजन संचायक दालों को बढ़ावा देता है (चना, अरहर, मसूर)",
    incomeGoalDesc: "खाद्य सुरक्षा और नकदी फसलों के बीच संतुलन",
    riskGoalDesc: "गर्मी (>35°C) और सूखे को सहन करने वाली फसलें",
    priorityNormal: "सामान्य",
    priorityHigh: "उच्च",
    priorityMax: "सर्वोच्च",
    fineTuneTitle: "व्यक्तिगत प्राथमिकताओं को अनुकूलित करें",
    fineTuneDesc: "प्राथमिकता स्तर समायोजित करें या ऊपर दी गई त्वरित रणनीति चुनें।",
    favorsCropsLabel: "प्रमुख फसलें:",
    droughtCropsExample: "ज्वार, बाजरा, लोबिया",
    soilCropsExample: "अरहर, चना, मूंगफली",
    incomeCropsExample: "तिल, सोयाबीन, सूरजमुखी",

    climateStressSimulator: "जलवायु तनाव सिम्युलेटर",
    simulationActive: "सिमुलेशन सक्रिय",
    coupledSmapPower: "SMAP-POWER संयुक्त",
    rainfallAnomaly: "वर्षा में परिवर्तन",
    temperatureOffset: "तापमान वृद्धि",
    vsBaseline: "सामान्य से",
    applyStress: "तनाव मॉडल लागू करें",

    topRecommendation: "स्थान #1 · सर्वश्रेष्ठ अनुशंसा",
    rankPrefix: "स्थान",
    rotationSequence: "फसल चक्र",
    resilience: "अनुकूलता",
    season: "मौसम",
    waterReq: "जल आवश्यकता:",
    biologicalNFixer: "🌱 जैविक नाइट्रोजन संचयक",
    waterFit: "जल उपयुक्तता",
    soilRegeneration: "मिट्टी सुधार",
    climateBuffer: "जलवायु सुरक्षा",
    incomeFit: "आय उपयुक्तता",
    nasaInsight: "नासा उपग्रह विश्लेषण:",
    waterConserved: "सामान्य खेती की तुलना में जल बचत",
    showLedger: "विस्तृत कृषि बहीखाता देखें",
    hideLedger: "कृषि बहीखाता छुपाएं",
    cycleTotal: "कुल चक्र जल",
    nitrogenBalance: "अनुमानित जैविक नाइट्रोजन संतुलन",
    climateRiskNotice: "मौसम जोखिम चेतावनी",

    step1: "1. खेत का स्थान",
    step1Desc: "नक्शे पर अपने खेत का स्थान चुनें या नमूना क्षेत्र चुनें।",
    step2: "2. मिट्टी व सिंचाई",
    step2Desc: "मिट्टी और जल आवश्यकताओं को कैलिब्रेट करने के लिए 4 सरल प्रश्न।",
    step3: "3. प्राथमिकताएं",
    step3Desc: "तय करें कि आपके लिए सबसे महत्वपूर्ण क्या है।",
    step4: "4. अनुशंसित फसल चक्र",
    continueToFarm: "आगे बढ़ें: मिट्टी और जल विवरण →",
    continueToPriorities: "आगे बढ़ें: रणनीतिक प्राथमिकताएं →",
    generateRotations: "नासा जलवायु-स्मार्ट फसल चक्र खोजें 🚀",
    backToMap: "← नक्शे पर वापस जाएं",
    backToSoil: "← मिट्टी विवरण पर वापस जाएं",
    editInputs: "← खेत की जानकारी बदलें",
    callPhone: "मोबाइल पर कॉल करें",
    startLiveCall: "लाइव वॉयस कॉल शुरू करें",
    phoneNumberPlaceholder: "फ़ोन नंबर दर्ज करें (उदा. +91 98765 43210)",

    lowTechTitle: "मल्टी-चैनल डिलीवरी सिमुलेटर",
    cheapestDeviceFirst: "डिजाइन सिद्धांत: एसएमएस, व्हाट्सएप व वॉयस कॉल द्वारा 100% किसानों तक पहुंच",
    basicSms: "फोन एसएमएस (160 अक्षर)",
    whatsAppCard: "व्हाट्सएप कार्ड",
    voiceCall: "ऑटोमेटेड वॉयस कॉल (IVR)",
    playVoiceAdvisory: "फोन कॉल सुनें",
    stopVoiceAdvisory: "कॉल समाप्त करें",
    incomingCall: "टोल-फ्री किसान हेल्पलाइन कॉल",
    spokenTextLabel: "बोली जाने वाली स्क्रिप्ट",
    copyText: "कॉपी करें",
    copied: "कॉपी हो गया!"
  },
  sw: {
    appTitle: "Mshauri wa Mzunguko wa Mazao NASA",
    tagline: "Mipango ya kilimo inayostahimili mabadiliko ya tabianchi kwa kutumia satelaiti za NASA",
    brandName: "AgroSphere EO",
    adssVersion: "NASA ADSS v4.2",
    liveSatApi: "Data ya Moja kwa Moja ya SMAP & POWER",
    exportDossier: "Pakua Ripoti ya Ushauri",
    whatsappSms: "SMS / WhatsApp",
    printSheet: "Chapisha Karatasi",
    resetBaseline: "Weka Upya",
    simulatedStressAlert: "Uigaji wa Mabadiliko ya Tabianchi Umewashwa: Imehesabiwa kwa {pct}% upungufu wa mvua na +{temp}°C joto.",
    engineNotice: "Taarifa ya Injini ya Ushauri",
    dataProvenance: "Taasisi ya Goddard ya NASA & Telemetri ya SMAP v4.2",
    coordsStandard: "Kuratibu za WGS84 Lat/Lon · ISO 8601",
    ingestingNasa: "Inapokea Data ya Anga ya NASA...",
    calculateButton: "Tafuta Mzunguko Bora wa Mazao",
    calculating: "Inachambua Data ya Satelaiti za NASA...",
    verifiedRotations: "Mizunguko ya Mazao Iliyothibitishwa",
    sequencesCount: "Mifuatano",
    evaluatedIn: "Imehesabiwa kwa ms {ms} • Imerekebishwa kwa {soil}",
    
    annualPrecip: "Mvua ya Mwaka",
    heatStressDays: "Siku za Joto Kali (>35°C)",
    rootZoneMoisture: "Unyevunyevu wa Mizizi",
    soilChemistry: "Kemia na Aina ya Udongo",
    anomalyVsAvg: "tofauti na wastani wa miaka 5",
    days: "Siku",
    volumetric: "Kiasi",
    smapActive: "SMAP L4 Inafanya Kazi",

    fieldCoordinates: "Vipimo vya Eneo la Shamba",
    gpsButton: "GPS",
    smapResolution: "SMAP 1km ya Usahihi",
    presets: "Maeneo ya Majaribio:",

    soilWaterProfile: "Wasifu wa Udongo na Maji",
    fieldParameters: "Vipimo vya Shamba",
    soilTextureHorizon: "Aina ya Udongo",
    clayVertisol: "Udongo wa Mfinyanzi (Vertisol)",
    siltyLoam: "Udongo wa Kichanga-Mfinyanzi",
    sandyAridisol: "Udongo wa Kichanga (Sandy)",
    autoDetect: "Tambua Kiotomatiki (SMAP)",
    irrigationCapacity: "Uwezo wa Umwagiliaji",
    rainfed: "Maji ya Mvua Tu",
    borewell: "Kisima cha Kisasa (Borewell)",
    canalNetwork: "Mfereji wa Umwagiliaji",
    precisionDrip: "Umwagiliaji wa Matone (Drip)",
    fieldSize: "Ukubwa wa Shamba",
    priorCrop: "Zao Lililopita",
    fallowNone: "Bila Mazao / Hakuna",
    budgetCap: "Kiwango cha Bajeti",
    low: "Chini",
    medium: "Kati",
    high: "Juu",

    strategicWeights: "Uzito wa Mikakati ya Kilimo",
    drought: "Ukame",
    soil: "Udongo",
    income: "Mapato",
    waterConservation: "Uhifadhi wa Maji",
    soilOrganicMatter: "Afya ya Udongo na Naitrojeni",
    smallholderCashFlow: "Mapato ya Mkulima",
    climateRiskBuffer: "Kizuizi cha Hatari ya Hewa",
    farmerGoalsTitle: "Lengo lako kuu kwa shamba hili ni lipi?",
    farmerGoalsSubtitle: "Chagua mkakati wa haraka, au rekebisha malengo hapa chini:",
    droughtStrategyTitle: "Ulinzi dhidi ya Ukame",
    droughtStrategyDesc: "Okoa maji mengi na stahimili ukame",
    soilStrategyTitle: "Kutengeneza Udongo",
    soilStrategyDesc: "Rutubisha udongo uliochoka kwa naitrojeni ya asili",
    incomeStrategyTitle: "Mapato ya Soko",
    incomeStrategyDesc: "Ongeza thamani ya mazao na mapato ya fedha",
    waterGoalDesc: "Hupendelea mazao yanayohitaji maji kidogo (k.m. Mtama, Uwele)",
    soilGoalDesc: "Hupa kipaumbele kunde na dengu zinazoongeza naitrojeni",
    incomeGoalDesc: "Husawazisha chakula na mazao ya biashara yenye faida",
    riskGoalDesc: "Huchagua mazao yanayostahimili joto kali (>35°C) na ukame",
    priorityNormal: "Kawaida",
    priorityHigh: "Juu",
    priorityMax: "Kiwango cha Juu Zaidi",
    fineTuneTitle: "Rekebisha Malengo Binafsi",
    fineTuneDesc: "Rekebisha viwango vya kipaumbele au chagua mkakati wa haraka hapo juu.",
    favorsCropsLabel: "Hupendelea mazao kama:",
    droughtCropsExample: "Mtama, Uwele, Kunde",
    soilCropsExample: "Mbaazi, Dengu, Karanga",
    incomeCropsExample: "Ufuta, Soya, Alizeti",

    climateStressSimulator: "Kielelezo cha Mkazo wa Tabianchi",
    simulationActive: "Uigaji Umewashwa",
    coupledSmapPower: "SMAP-POWER Pamoja",
    rainfallAnomaly: "Mabadiliko ya Mvua",
    temperatureOffset: "Ongezeko la Joto",
    vsBaseline: "kulinganisha na kawaida",
    applyStress: "Tumia Mfano wa Mkazo",

    topRecommendation: "Nafasi ya 1 · Pendekezo Kuu",
    rankPrefix: "Nafasi",
    rotationSequence: "Mzunguko",
    resilience: "Ustahimilivu",
    season: "Msimu",
    waterReq: "Maji Yanayohitajika:",
    biologicalNFixer: "🌱 Zao Linaloongeza Naitrojeni",
    waterFit: "Kutosheleza Maji",
    soilRegeneration: "Kutengeneza Udongo",
    climateBuffer: "Ustahimilivu wa Hewa",
    incomeFit: "Upatikanaji wa Mapato",
    nasaInsight: "Uchambuzi wa Satelaiti za NASA:",
    waterConserved: "maji yaliyookolewa kulinganisha na zao moja",
    showLedger: "Onyesha Maelezo Kamili ya Kilimo",
    hideLedger: "Ficha Maelezo ya Kilimo",
    cycleTotal: "Jumla ya Maji ya Mzunguko",
    nitrogenBalance: "Kadirio la Naitrojeni ya Asili",
    climateRiskNotice: "Tahadhari ya Hatari ya Hewa",

    step1: "1. Eneo la Shamba",
    step1Desc: "Weka alama kwenye shamba au chagua eneo la majaribio.",
    step2: "2. Udongo na Maji",
    step2Desc: "Maswali 4 rahisi kurekebisha mahitaji ya maji na udongo.",
    step3: "3. Vipaumbele",
    step3Desc: "Chagua mikakati muhimu zaidi kwa shamba lako.",
    step4: "4. Mizunguko ya Mazao",
    continueToFarm: "Endelea: Wasifu wa Udongo na Maji →",
    continueToPriorities: "Endelea: Weka Vipaumbele vya Kilimo →",
    generateRotations: "Tafuta Mizunguko ya Mazao ya NASA 🚀",
    backToMap: "← Rudi kwenye Ramani",
    backToSoil: "← Rudi kwenye Wasifu wa Udongo",
    editInputs: "← Badilisha Taarifa za Shamba",
    callPhone: "Piga Simu kwa Simu ya Mkononi",
    startLiveCall: "Anzisha Simu ya Sauti Moja kwa Moja",
    phoneNumberPlaceholder: "Weka namba ya simu (mfano +254 700 000000)",

    lowTechTitle: "Uigaji wa Njia Mbalimbali za Utoaji",
    cheapestDeviceFirst: "Kanuni ya Muundo: Kuwafikia 100% ya Wakulima kupitia SMS, WhatsApp na Sauti",
    basicSms: "SMS ya Simu ya Kawaida (Herufi 160)",
    whatsAppCard: "Kadi ya WhatsApp",
    voiceCall: "Simu ya Sauti ya Kiotomatiki (IVR)",
    playVoiceAdvisory: "Sikiliza Simu ya Sauti",
    stopVoiceAdvisory: "Kata Simu",
    incomingCall: "Simu ya Bure ya Mkulima",
    spokenTextLabel: "Maneno Yanayosemwa kwa Sauti",
    copyText: "Nakili",
    copied: "Imenakiliwa!"
  },
  es: {
    appTitle: "Asesor de Rotación de Cultivos NASA",
    tagline: "Planes de rotación resilientes con datos satelitales de la NASA y agronomía local",
    brandName: "AgroSphere EO",
    adssVersion: "NASA ADSS v4.2",
    liveSatApi: "Datos en Vivo SMAP & POWER",
    exportDossier: "Exportar Informe",
    whatsappSms: "SMS / WhatsApp",
    printSheet: "Imprimir Hoja",
    resetBaseline: "Restablecer",
    simulatedStressAlert: "Simulación de Estrés Climático Activa: Recalibrado para anomalía de {pct}% en lluvias y +{temp}°C de temperatura.",
    engineNotice: "Aviso del Motor Asesor",
    dataProvenance: "Instituto Goddard de la NASA y Telemetría SMAP v4.2",
    coordsStandard: "Coordenadas WGS84 Lat/Lon · ISO 8601",
    ingestingNasa: "Obteniendo Observaciones Satelitales NASA...",
    calculateButton: "Calcular Rotaciones Climáticamente Inteligentes",
    calculating: "Evaluando Observaciones de la NASA...",
    verifiedRotations: "Rotaciones Climáticamente Inteligentes Verificadas",
    sequencesCount: "Secuencias",
    evaluatedIn: "Evaluado en {ms} ms • Optimizado para {soil}",
    
    annualPrecip: "Precipitación Anual",
    heatStressDays: "Días de Calor Extremo (>35°C)",
    rootZoneMoisture: "Humedad en Zona Radicular",
    soilChemistry: "Química y Textura del Suelo",
    anomalyVsAvg: "anomalía vs promedio 5 años",
    days: "Días",
    volumetric: "Volumétrico",
    smapActive: "SMAP L4 Activo",

    fieldCoordinates: "Coordenadas de la Parcela",
    gpsButton: "GPS",
    smapResolution: "SMAP 1km Reducido",
    presets: "Regiones Piloto:",

    soilWaterProfile: "Perfil de Suelo y Agua",
    fieldParameters: "Parámetros del Campo",
    soilTextureHorizon: "Textura del Suelo",
    clayVertisol: "Vertisol (Arcilloso)",
    siltyLoam: "Franco Limoso",
    sandyAridisol: "Arenoso (Aridisol)",
    autoDetect: "Autodetectar (SMAP)",
    irrigationCapacity: "Capacidad de Riego",
    rainfed: "Secano (Lluvia)",
    borewell: "Pozo / Aguas Subterráneas",
    canalNetwork: "Red de Canales",
    precisionDrip: "Riego por Goteo",
    fieldSize: "Tamaño del Campo",
    priorCrop: "Cultivo Anterior",
    fallowNone: "Barbecho / Ninguno",
    budgetCap: "Presupuesto",
    low: "Bajo",
    medium: "Medio",
    high: "Alto",

    strategicWeights: "Ponderaciones Estratégicas",
    drought: "Sequía",
    soil: "Suelo",
    income: "Ingresos",
    waterConservation: "Conservación del Agua",
    soilOrganicMatter: "Salud del Suelo y Nitrógeno",
    smallholderCashFlow: "Flujo de Caja",
    climateRiskBuffer: "Buffer de Riesgo Climático",
    farmerGoalsTitle: "¿Cuál es su objetivo principal para este campo?",
    farmerGoalsSubtitle: "Elija una estrategia rápida, o ajuste sus metas individuales a continuación:",
    droughtStrategyTitle: "Defensa contra Sequía",
    droughtStrategyDesc: "Ahorre agua al máximo y resista la falta de lluvia",
    soilStrategyTitle: "Regeneración del Suelo",
    soilStrategyDesc: "Reconstruya suelo agotado con nitrógeno biológico",
    incomeStrategyTitle: "Ingresos de Mercado",
    incomeStrategyDesc: "Maximice ingresos con cultivos de mayor valor comercial",
    waterGoalDesc: "Prefiere cultivos con baja necesidad de agua (ej. Sorgo, Mijo)",
    soilGoalDesc: "Prioriza leguminosas fijadoras de nitrógeno (Garbanzo, Guandul)",
    incomeGoalDesc: "Equilibra la seguridad alimentaria con cultivos comerciales",
    riskGoalDesc: "Selecciona cultivos resistentes al calor (>35°C) y sequías",
    priorityNormal: "Normal",
    priorityHigh: "Alta",
    priorityMax: "Máxima Prioridad",
    fineTuneTitle: "Ajustar Objetivos Individuales",
    fineTuneDesc: "Modifique los niveles de prioridad o elija una estrategia predefinida arriba.",
    favorsCropsLabel: "Favorece cultivos como:",
    droughtCropsExample: "Sorgo, Mijo Perla, Caupí",
    soilCropsExample: "Guandul, Garbanzo, Maní",
    incomeCropsExample: "Sésamo, Soja, Girasol",

    climateStressSimulator: "Simulador de Estrés Climático",
    simulationActive: "Simulación Activa",
    coupledSmapPower: "Acoplado SMAP-POWER",
    rainfallAnomaly: "Anomalía de Precipitación",
    temperatureOffset: "Incremento Térmico",
    vsBaseline: "vs línea base",
    applyStress: "Aplicar Modelo de Estrés",

    topRecommendation: "Rango #1 · Recomendación Principal",
    rankPrefix: "Rango",
    rotationSequence: "Rotación",
    resilience: "Resiliencia",
    season: "Temporada",
    waterReq: "Demanda de Agua:",
    biologicalNFixer: "🌱 Fijador Biológico de N",
    waterFit: "Ajuste Hídrico",
    soilRegeneration: "Regeneración del Suelo",
    climateBuffer: "Buffer Climático",
    incomeFit: "Ajuste Económico",
    nasaInsight: "Perspectiva de Observación Satelital NASA:",
    waterConserved: "agua ahorrada vs monocultivo convencional",
    showLedger: "Mostrar Balance Agronómico",
    hideLedger: "Ocultar Balance Agronómico",
    cycleTotal: "Agua Total del Ciclo",
    nitrogenBalance: "Balance Estimado de Nitrógeno Biológico",
    climateRiskNotice: "Aviso de Riesgo Climático",

    step1: "1. Ubicación del Campo",
    step1Desc: "Marque su finca en el mapa o elija una región piloto.",
    step2: "2. Suelo y Agua",
    step2Desc: "4 preguntas sencillas para calibrar las necesidades de suelo y agua.",
    step3: "3. Prioridades",
    step3Desc: "Ajuste sus objetivos agronómicos principales.",
    step4: "4. Rotaciones Verificadas",
    continueToFarm: "Continuar: Perfil de Suelo y Agua →",
    continueToPriorities: "Continuar: Prioridades Estratégicas →",
    generateRotations: "Generar Rotaciones Climáticamente Inteligentes 🚀",
    backToMap: "← Volver al Mapa",
    backToSoil: "← Volver a Perfil de Suelo",
    editInputs: "← Modificar Datos de la Finca",
    callPhone: "Llamar al Teléfono Móvil",
    startLiveCall: "Iniciar Llamada de Voz en Vivo",
    phoneNumberPlaceholder: "Ingrese número telefónico (ej. +34 600 000 000)",

    lowTechTitle: "Simulador de Entrega Multicanal",
    cheapestDeviceFirst: "Principio de Diseño: Llegar al 100% de Pequeños Agricultores vía SMS, WhatsApp y Voz",
    basicSms: "SMS de Teléfono Básico (160 Caracteres)",
    whatsAppCard: "Tarjeta de WhatsApp",
    voiceCall: "Llamada de Voz Automatizada (IVR)",
    playVoiceAdvisory: "Escuchar Llamada de Voz",
    stopVoiceAdvisory: "Finalizar Llamada",
    incomingCall: "Línea Gratuita al Productor",
    spokenTextLabel: "Guión de Audio Hablado",
    copyText: "Copiar",
    copied: "¡Copiado!"
  }
};
