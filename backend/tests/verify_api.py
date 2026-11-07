from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_root():
    res = client.get("/api/health")
    assert res.status_code == 200
    print("Health response:", res.json())

    # Test static frontend serving
    res_front = client.get("/")
    assert res_front.status_code == 200
    assert "NASA" in res_front.text
    assert "Advisor" in res_front.text
    print("Frontend successfully served on root '/'!")

def test_recommendation_endpoint():
    payload = {
        "location": {
            "lat": 19.84,
            "lon": 75.88,
            "region_name": "Maharashtra Test Field"
        },
        "constraints": {
            "soil_type": "clay",
            "water_access": "rainfed",
            "field_size_ha": 1.5,
            "budget_level": "medium",
            "language": "en"
        },
        "priorities": {
            "save_water": 2.0,
            "improve_soil": 2.0,
            "maximize_income": 1.0,
            "reduce_risk": 1.0
        },
        "stress_scenario": {
            "rainfall_delta_pct": -15.0,
            "temp_delta_c": 1.5
        }
    }
    res = client.post("/api/recommendations", json=payload)
    assert res.status_code == 200, res.text
    data = res.json()
    print("Generation time (ms):", data["generation_time_ms"])
    print("Top rotation:", [c["name"] for c in data["recommendations"][0]["crops"]])
    print("Score:", data["recommendations"][0]["overall_score"])
    print("SMS format:", data["sms_format"])
    print("WhatsApp card snippet:", data["whatsapp_format"][:150])

if __name__ == "__main__":
    test_root()
    test_recommendation_endpoint()
    print("\nALL BACKEND API VERIFICATIONS PASSED!")
