import pytest
import asyncio
from backend.app.schemas import (
    LocationInput,
    FarmerConstraints,
    FarmerPriorities,
    ClimateStressScenario
)
from backend.app.services.nasa_service import NasaClimateService
from backend.app.services.scoring_engine import ScoringEngine

@pytest.fixture
def scoring_engine():
    return ScoringEngine()

def test_maharashtra_recommendation(scoring_engine):
    async def run():
        loc = LocationInput(lat=19.84, lon=75.88, region_name="Maharashtra, India")
        constraints = FarmerConstraints(
            soil_type="clay",
            water_access="rainfed",
            field_size_ha=2.0,
            budget_level="medium",
            language="en"
        )
        priorities = FarmerPriorities(save_water=2.0, improve_soil=2.0, maximize_income=1.0, reduce_risk=1.5)
        
        climate = await NasaClimateService.fetch_climate_data(loc.lat, loc.lon)
        assert climate.annual_rainfall_mm > 0
        assert climate.soil_info.texture in ("clay", "loam", "sandy_loam")

        recs = scoring_engine.generate_recommendations(loc, constraints, priorities, climate)
        assert len(recs) == 3
        top = recs[0]
        assert top.overall_score >= 60.0
        # Check that at least one legume exists in the top rotation to protect soil
        has_legume = any(c.nitrogen_fixing for c in top.crops)
        assert has_legume is True

    asyncio.run(run())

def test_sahel_arid_recommendation(scoring_engine):
    async def run():
        # Tillabéri, Niger (Extreme drought zone)
        loc = LocationInput(lat=14.21, lon=1.45, region_name="Sahel, Niger")
        constraints = FarmerConstraints(soil_type="sandy", water_access="rainfed", budget_level="low")
        priorities = FarmerPriorities(save_water=3.0, reduce_risk=3.0)

        climate = await NasaClimateService.fetch_climate_data(loc.lat, loc.lon)
        recs = scoring_engine.generate_recommendations(loc, constraints, priorities, climate)
        top = recs[0]

        # In extreme arid conditions, top crops should have high drought tolerance (>=4)
        crop_names = [c.name for c in top.crops]
        assert any("Millet" in name or "Sorghum" in name or "Cowpea" in name for name in crop_names)

    asyncio.run(run())

def test_climate_stress_slider(scoring_engine):
    async def run():
        loc = LocationInput(lat=19.84, lon=75.88)
        constraints = FarmerConstraints(water_access="rainfed")
        priorities = FarmerPriorities(save_water=2.5)

        # Normal climate
        normal_climate = await NasaClimateService.fetch_climate_data(loc.lat, loc.lon)
        # Stressed climate (-30% rain, +3°C temp)
        stress_climate = await NasaClimateService.fetch_climate_data(
            loc.lat, loc.lon,
            stress=ClimateStressScenario(rainfall_delta_pct=-30.0, temp_delta_c=3.0)
        )

        assert stress_climate.annual_rainfall_mm < normal_climate.annual_rainfall_mm
        assert stress_climate.heat_days_above_35c > normal_climate.heat_days_above_35c

    asyncio.run(run())
