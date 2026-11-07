from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class LocationInput(BaseModel):
    lat: float = Field(..., description="Latitude of the field", ge=-90.0, le=90.0)
    lon: float = Field(..., description="Longitude of the field", ge=-180.0, le=180.0)
    region_name: Optional[str] = Field(None, description="Optional name of village or district")

class FarmerConstraints(BaseModel):
    soil_type: str = Field("auto", description="'clay', 'loam', 'sandy', or 'auto' (detect via satellite)")
    water_access: str = Field("rainfed", description="'rainfed', 'borewell', 'canal', 'drip'")
    field_size_ha: float = Field(1.0, ge=0.1, le=1000.0, description="Field size in hectares")
    previous_crop_id: Optional[str] = Field(None, description="ID of crop grown in the preceding season")
    budget_level: str = Field("medium", description="'low', 'medium', 'high'")
    language: str = Field("en", description="Language code: en, hi, sw, es")

class FarmerPriorities(BaseModel):
    save_water: float = Field(1.0, ge=0.1, le=3.0)
    improve_soil: float = Field(1.0, ge=0.1, le=3.0)
    maximize_income: float = Field(1.0, ge=0.1, le=3.0)
    reduce_risk: float = Field(1.0, ge=0.1, le=3.0)

class ClimateStressScenario(BaseModel):
    rainfall_delta_pct: float = Field(0.0, ge=-50.0, le=50.0, description="Simulated percentage change in rainfall (-30 means -30%)")
    temp_delta_c: float = Field(0.0, ge=-2.0, le=6.0, description="Simulated temperature shift in degrees Celsius")

class RecommendationRequest(BaseModel):
    location: LocationInput
    constraints: FarmerConstraints = Field(default_factory=FarmerConstraints)
    priorities: FarmerPriorities = Field(default_factory=FarmerPriorities)
    stress_scenario: ClimateStressScenario = Field(default_factory=ClimateStressScenario)

class CropSummary(BaseModel):
    id: str
    name: str
    local_name: Optional[str] = None
    category: str
    botanical_family: str
    season: str
    water_need_mm: int
    duration_days: int
    nitrogen_fixing: bool
    root_depth: str
    drought_tolerance: int
    heat_tolerance: int
    economic_return_index: int
    agronomic_role: str

class SubScores(BaseModel):
    water_fit: float
    soil_health: float
    climate_resilience: float
    economic_fit: float

class RotationPlan(BaseModel):
    rotation_id: str
    rank: int
    crops: List[CropSummary]
    overall_score: float
    rating: str  # "green", "yellow", "red"
    sub_scores: SubScores
    primary_driver: str
    soil_impact_summary: str
    water_impact_summary: str
    risk_warnings: List[str]
    total_water_need_mm: int
    nitrogen_balance_desc: str

class SoilDetails(BaseModel):
    texture: str
    clay_pct: float
    sand_pct: float
    ph: float
    organic_carbon_g_kg: float
    classification: str

class ClimateSummary(BaseModel):
    annual_rainfall_mm: float
    monsoon_rainfall_mm: float
    dry_season_rainfall_mm: float
    heat_days_above_35c: int
    avg_temperature_c: float
    root_zone_soil_wetness: float
    rainfall_5yr_trend_pct: float
    soil_info: SoilDetails
    data_source: str
    is_simulated_stress: bool = False

class RecommendationResponse(BaseModel):
    location: LocationInput
    climate_summary: ClimateSummary
    recommendations: List[RotationPlan]
    sms_format: str
    whatsapp_format: str
    voice_script: Optional[str] = None
    generation_time_ms: float

