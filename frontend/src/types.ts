export interface LocationInput {
  lat: number;
  lon: number;
  region_name?: string;
}

export interface FarmerConstraints {
  soil_type: string;
  water_access: string;
  field_size_ha: number;
  previous_crop_id?: string;
  budget_level: string;
  language: string;
}

export interface FarmerPriorities {
  save_water: number;
  improve_soil: number;
  maximize_income: number;
  reduce_risk: number;
}

export interface ClimateStressScenario {
  rainfall_delta_pct: number;
  temp_delta_c: number;
}

export interface CropSummary {
  id: string;
  name: string;
  local_name?: string;
  category: string;
  botanical_family: string;
  season: string;
  water_need_mm: number;
  duration_days: number;
  nitrogen_fixing: boolean;
  root_depth: string;
  drought_tolerance: number;
  heat_tolerance: number;
  economic_return_index: number;
  agronomic_role: string;
}

export interface SubScores {
  water_fit: number;
  soil_health: number;
  climate_resilience: number;
  economic_fit: number;
}

export interface RotationPlan {
  rotation_id: string;
  rank: number;
  crops: CropSummary[];
  overall_score: number;
  rating: 'green' | 'yellow' | 'red';
  sub_scores: SubScores;
  primary_driver: string;
  soil_impact_summary: string;
  water_impact_summary: string;
  risk_warnings: string[];
  total_water_need_mm: number;
  nitrogen_balance_desc: string;
}

export interface SoilDetails {
  texture: string;
  clay_pct: number;
  sand_pct: number;
  ph: number;
  organic_carbon_g_kg: number;
  classification: string;
}

export interface ClimateSummary {
  annual_rainfall_mm: number;
  monsoon_rainfall_mm: number;
  dry_season_rainfall_mm: number;
  heat_days_above_35c: number;
  avg_temperature_c: number;
  root_zone_soil_wetness: number;
  rainfall_5yr_trend_pct: number;
  soil_info: SoilDetails;
  data_source: string;
  is_simulated_stress: boolean;
}

export interface RecommendationResponse {
  location: LocationInput;
  climate_summary: ClimateSummary;
  recommendations: RotationPlan[];
  sms_format: string;
  whatsapp_format: string;
  voice_script?: string;
  generation_time_ms: number;
}

