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
