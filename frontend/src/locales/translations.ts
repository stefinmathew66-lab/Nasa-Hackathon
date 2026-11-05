export interface Translations {
  appTitle: string;
  tagline: string;
  step1: string;
  step1Desc: string;
  step2: string;
  step2Desc: string;
  step3: string;
  step3Desc: string;
  soilType: string;
  waterSource: string;
  fieldSize: string;
  budget: string;
  priorities: string;
  saveWater: string;
  improveSoil: string;
  maximizeIncome: string;
  reduceRisk: string;
  calculateButton: string;
  calculating: string;
  resultsTitle: string;
  rank: string;
  score: string;
  whyThisRotation: string;
  waterNeed: string;
  nasaRainfall: string;
  soilImpact: string;
  riskAlert: string;
  viewSms: string;
  printAdvisory: string;
  stressTestTitle: string;
  stressTestDesc: string;
  rainReduction: string;
  tempIncrease: string;
  nasaDataBadge: string;
  resetLocation: string;
}

export const translations: Record<string, Translations> = {
  en: {
    appTitle: "NASA Crop Rotation Advisor",
    tagline: "Climate-resilient rotation plans powered by NASA Earth observations & local soil data",
    step1: "1. Select Field Location",
    step1Desc: "Drop a pin on your field or select a benchmark pilot region.",
    step2: "2. Farm Characteristics",
    step2Desc: "Tell us about your soil, water access, and field constraints.",
    step3: "3. Farmer Priorities",
    step3Desc: "Adjust what matters most for your farming strategy.",
    soilType: "Soil Type",
    waterSource: "Water Availability",
    fieldSize: "Field Size (Hectares)",
    budget: "Investment Budget",
    priorities: "Strategic Priorities",
    saveWater: "Save Water",
    improveSoil: "Improve Soil",
    maximizeIncome: "Maximize Income",
    reduceRisk: "Reduce Risk",
    calculateButton: "Generate Resilient Rotations",
    calculating: "Analyzing NASA Earth Observations...",
    resultsTitle: "Recommended 3-Season Rotations",
    rank: "Recommendation",
    score: "Resilience Score",
    whyThisRotation: "Agronomic Justification",
    waterNeed: "Total Water Demand",
    nasaRainfall: "NASA Annual Rainfall",
    soilImpact: "Soil Nitrogen Impact",
    riskAlert: "Climate Risk Warning",
    viewSms: "SMS / WhatsApp Preview",
    printAdvisory: "Print 1-Page Advisory",
    stressTestTitle: "Simulate Climate Stress",
    stressTestDesc: "Stress-test rotation viability under extreme climate conditions.",
    rainReduction: "Rainfall Reduction",
    tempIncrease: "Temperature Increase",
    nasaDataBadge: "Live Satellite Data",
    resetLocation: "Reset"
  },
  hi: {
    appTitle: "नासा फसल चक्र सलाहकार (NASA Crop Advisor)",
    tagline: "नासा उपग्रह डेटा और मिट्टी विज्ञान द्वारा संचालित टिकाऊ फसल चक्र",
    step1: "1. खेत का स्थान चुनें",
    step1Desc: "नक्शे पर अपने खेत का स्थान चुनें या नमूना क्षेत्र चुनें।",
    step2: "2. खेत की जानकारी",
    step2Desc: "मिट्टी का प्रकार, पानी की सुविधा और आकार बताएं।",
    step3: "3. किसान की प्राथमिकताएं",
    step3Desc: "तय करें कि आपके लिए सबसे महत्वपूर्ण क्या है।",
    soilType: "मिट्टी का प्रकार",
    waterSource: "पानी का साधन",
    fieldSize: "खेत का आकार (हेक्टेयर)",
    budget: "लागत / बजट",
    priorities: "आपकी प्राथमिकताएं",
    saveWater: "पानी बचाएं",
    improveSoil: "मिट्टी सुधारें",
    maximizeIncome: "अधिक आय",
    reduceRisk: "जोखिम कम करें",
    calculateButton: "सर्वश्रेष्ठ फसल चक्र खोजें",
    calculating: "नासा उपग्रह डेटा का विश्लेषण हो रहा है...",
    resultsTitle: "अनुशंसित 3-सीजन फसल चक्र",
    rank: "सुझाव",
    score: "अनुकूलता स्कोर",
    whyThisRotation: "कृषि वैज्ञानिक कारण",
    waterNeed: "कुल पानी की आवश्यकता",
    nasaRainfall: "नासा वार्षिक वर्षा",
    soilImpact: "मिट्टी नाइट्रोजन प्रभाव",
    riskAlert: "मौसम जोखिम चेतावनी",
    viewSms: "एसएमएस / व्हाट्सएप देखें",
    printAdvisory: "रिपोर्ट प्रिंट करें",
    stressTestTitle: "जलवायु परिवर्तन सिमुलेशन",
    stressTestDesc: "अत्यधिक सूखे या गर्मी में फसल चक्र की मजबूती परखें।",
    rainReduction: "बारिश में कमी",
    tempIncrease: "तापमान में वृद्धि",
    nasaDataBadge: "नासा लाइव डेटा",
    resetLocation: "रीसेट"
  },
  sw: {
    appTitle: "Mshauri wa Mzunguko wa Mazao (NASA)",
    tagline: "Mipango ya kilimo inayostahimili mabadiliko ya tabianchi kwa kutumia setilaiti za NASA",
    step1: "1. Chagua Shamba Lako",
    step1Desc: "Weka alama kwenye ramani au chagua eneo la majaribio.",
    step2: "2. Hali ya Shamba",
    step2Desc: "Eleza aina ya udongo, upatikanaji wa maji, na ukubwa wa shamba.",
    step3: "3. Vipaumbele vya Mkulima",
    step3Desc: "Chagua mikakati muhimu zaidi kwako msimu huu.",
    soilType: "Aina ya Udongo",
    waterSource: "Upatikanaji wa Maji",
    fieldSize: "Ukubwa wa Shamba (Hekta)",
    budget: "Bajeti ya Gharama",
    priorities: "Vipaumbele",
    saveWater: "Hifadhi Maji",
    improveSoil: "Boresha Udongo",
    maximizeIncome: "Mapato Zaidi",
    reduceRisk: "Punguza Hatari",
    calculateButton: "Tafuta Mzunguko Bora wa Mazao",
    calculating: "Inachakata data ya satelaiti ya NASA...",
    resultsTitle: "Mizunguko 3 Iliyopendekezwa",
    rank: "Pendekezo",
    score: "Alama ya Ustahimilivu",
    whyThisRotation: "Sababu ya Kitaalamu ya Kilimo",
    waterNeed: "Mahitaji ya Maji",
    nasaRainfall: "Mvua ya Mwaka (NASA)",
    soilImpact: "Naitrojeni ya Udongo",
    riskAlert: "Onyo la Hatari ya Hali ya Hewa",
    viewSms: "Hakiki SMS / WhatsApp",
    printAdvisory: "Chapisha Ripoti",
    stressTestTitle: "Uigaji wa Mabadiliko ya Hali ya Hewa",
    stressTestDesc: "Pima jinsi mazao yatakavyostahimili ukame mkali.",
    rainReduction: "Kupungua kwa Mvua",
    tempIncrease: "Kupanda kwa Joto",
    nasaDataBadge: "Data ya Moja kwa Moja ya NASA",
    resetLocation: "Weka Upya"
  },
  es: {
    appTitle: "Asesor de Rotación de Cultivos NASA",
    tagline: "Planes de rotación resilientes con datos satelitales de la NASA y agronomía local",
    step1: "1. Seleccione la Ubicación",
    step1Desc: "Coloque un marcador en su campo o elija una región piloto.",
    step2: "2. Características de la Finca",
    step2Desc: "Indique su tipo de suelo, acceso al agua y tamaño del campo.",
    step3: "3. Prioridades del Productor",
    step3Desc: "Ajuste sus objetivos agronómicos principales.",
    soilType: "Tipo de Suelo",
    waterSource: "Disponibilidad de Agua",
    fieldSize: "Tamaño (Hectáreas)",
    budget: "Presupuesto",
    priorities: "Prioridades",
    saveWater: "Ahorrar Agua",
    improveSoil: "Mejorar el Suelo",
    maximizeIncome: "Maximizar Ingresos",
    reduceRisk: "Reducir Riesgo",
    calculateButton: "Generar Rotaciones Resilientes",
    calculating: "Consultando observaciones de la NASA...",
    resultsTitle: "Rotaciones Recomendadas (3 Temporadas)",
    rank: "Recomendación",
    score: "Puntaje de Resiliencia",
    whyThisRotation: "Justificación Agronómica",
    waterNeed: "Demanda Hídrica Total",
    nasaRainfall: "Lluvia Anual (NASA)",
    soilImpact: "Balance de Nitrógeno",
    riskAlert: "Alerta de Riesgo Climático",
    viewSms: "Vista SMS / WhatsApp",
    printAdvisory: "Imprimir Informe",
    stressTestTitle: "Simular Estrés Climático",
    stressTestDesc: "Pruebe la viabilidad del cultivo ante sequías o aumento de temperatura.",
    rainReduction: "Reducción de Lluvias",
    tempIncrease: "Aumento de Temperatura",
    nasaDataBadge: "Datos Satelitales NASA",
    resetLocation: "Restablecer"
  }
};

