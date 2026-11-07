import time
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from typing import Dict, Any, List

from .schemas import (
    RecommendationRequest,
    RecommendationResponse,
    ClimateSummary,
    LocationInput,
    ClimateStressScenario
)
from .services.nasa_service import NasaClimateService, load_cached_regions
from .services.scoring_engine import ScoringEngine, load_crop_database

app = FastAPI(
    title="NASA Crop Rotation Advisor API",
    description="Climate-smart decision-support API combining NASA Earth observations, local soil characteristics, and FAO agronomic models.",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

scoring_engine = ScoringEngine()

@app.get("/api/health")
def read_root():
    return {
        "service": "NASA Crop Rotation Advisor API",
        "status": "operational",
        "nasa_datasets": ["NASA POWER (Agroclimatology)", "SMAP (Soil Moisture proxy)", "GPM IMERG", "ISRIC SoilGrids"],
        "version": "1.0.0"
    }

@app.get("/api/crops")
def get_crops():
    """Returns the curated catalog of 15 crops and their agronomic attributes."""
    return load_crop_database()

@app.get("/api/benchmark-regions")
def get_benchmark_regions():
    """Returns the 5 global agro-ecological pilot zones for fast demonstration."""
    return load_cached_regions()

@app.get("/api/climate", response_model=ClimateSummary)
async def get_climate_data(lat: float, lon: float, rain_delta: float = 0.0, temp_delta: float = 0.0):
    """Fetches climate summary from NASA POWER or nearest satellite grid cell."""
    stress = ClimateStressScenario(rainfall_delta_pct=rain_delta, temp_delta_c=temp_delta)
    return await NasaClimateService.fetch_climate_data(lat, lon, stress)

@app.post("/api/recommendations", response_model=RecommendationResponse)
async def get_recommendations(req: RecommendationRequest):
    """
    Main decision engine:
    1. Fetches NASA Earth observations (rain, heat, soil wetness)
    2. Runs multi-pillar agronomic scoring
    3. Produces ranked recommendations + plain-language reasoning + SMS format
    """
    start_time = time.time()
    
    # 1. Fetch NASA climate observations
    climate = await NasaClimateService.fetch_climate_data(
        req.location.lat,
        req.location.lon,
        req.stress_scenario
    )

    # 2. Score candidate rotations
    top_rotations = scoring_engine.generate_recommendations(
        location=req.location,
        constraints=req.constraints,
        priorities=req.priorities,
        climate=climate
    )

    if not top_rotations:
        raise HTTPException(status_code=400, detail="No suitable crop rotations found for given parameters.")

    # 3. Format SMS, WhatsApp and Voice Script
    sms, wa = scoring_engine.generate_sms_and_whatsapp(
        location=req.location,
        top_plan=top_rotations[0],
        climate=climate,
        lang=req.constraints.language
    )
    voice = scoring_engine.generate_voice_script(
        location=req.location,
        top_plan=top_rotations[0],
        climate=climate,
        lang=req.constraints.language
    )

    elapsed_ms = round((time.time() - start_time) * 1000, 2)

    return RecommendationResponse(
        location=req.location,
        climate_summary=climate,
        recommendations=top_rotations,
        sms_format=sms,
        whatsapp_format=wa,
        voice_script=voice,
        generation_time_ms=elapsed_ms
    )

@app.post("/api/channels/sms/inbound")
async def inbound_sms_webhook():
    """Twilio / Africa's Talking Inbound SMS Webhook handler for 2G feature phones."""
    return {
        "status": "received",
        "gateway": "Twilio / Africa's Talking SMS Gateway",
        "char_limit": 160,
        "cost_per_sms": "$0.0075"
    }

@app.post("/api/channels/whatsapp/inbound")
async def inbound_whatsapp_webhook():
    """Meta Cloud API / WhatsApp Business Gateway webhook for location pins & card deliveries."""
    return {
        "status": "active",
        "channel": "WhatsApp Business Platform",
        "features": ["Location Pin Ingestion", "Rich Sequence Cards", "PDF Dossier Delivery"]
    }

# Static frontend files mount (serves full frontend from FastAPI)
FRONTEND_DIST = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "frontend", "dist"))
if os.path.exists(FRONTEND_DIST):
    assets_dir = os.path.join(FRONTEND_DIST, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        # Don't intercept API routes
        if full_path.startswith("api"):
            raise HTTPException(status_code=404, detail="API endpoint not found")
        # Check if requested static file exists in dist (e.g. favicon, svg)
        target_file = os.path.join(FRONTEND_DIST, full_path)
        if full_path and os.path.isfile(target_file):
            return FileResponse(target_file)
        index_file = os.path.join(FRONTEND_DIST, "index.html")
        return FileResponse(index_file)

