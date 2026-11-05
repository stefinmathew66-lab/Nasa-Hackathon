# NASA Crop Rotation Advisor 🌾🛰️
> **A Decision-Support System for Climate-Resilient Smallholder Agriculture**  
> Powered by NASA Earth Observations, Local Soil Information, and FAO Agronomic Models.

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/Frontend-React_18_TypeScript-61DAFB.svg?logo=react&logoColor=black)](https://react.dev)
[![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![NASA](https://img.shields.io/badge/Data-NASA_POWER_%26_SMAP-0B3D91.svg?logo=nasa&logoColor=white)](https://power.larc.nasa.gov)

---

## 1. Challenge & Problem Statement
Around the world, smallholder farmers face shifting temperatures, unpredictable rainfall patterns, groundwater depletion, extreme heat, and declining soil health. Traditional monocropping or uninformed crop choices frequently lead to catastrophic harvest failures.

This project solves this challenge by translating **NASA Earth Observations** into actionable, multi-season crop rotation plans that:
1. **Conserve Water:** Match rotation water demand to historical precipitation and soil moisture.
2. **Rebuild Soil Health:** Introduce biological nitrogen fixers (legumes) and alternating root architectures.
3. **Withstand Climate Shocks:** Filter for heat- and drought-tolerant varieties suited to local 5-year trends.
4. **Ensure Economic Resilience:** Factor in farmer investment capacity and market returns.

---

## 2. Key Capabilities & Winning Features

```
┌────────────────────────────────────────────────────────────────────────┐
│                        NASA CROP ROTATION ADVISOR                      │
├────────────────────────────────────────────────────────────────────────┤
│  🌍 Interactive GIS Map      │ Click to drop pin anywhere or 1-click   │
│                              │ test global pilot zones (India, Kenya,  │
│                              │ California, Sahel, Iowa Corn Belt).     │
├──────────────────────────────┼─────────────────────────────────────────┤
│  📋 4-Step Farmer Wizard     │ Low-literacy icon picker: Soil type,    │
│                              │ water access, previous crop & budget.   │
├──────────────────────────────┼─────────────────────────────────────────┤
│  ⚖️ Priority Weighting       │ Slider controls: Save Water, Improve    │
│                              │ Soil, Maximize Income, Reduce Risk.     │
├──────────────────────────────┼─────────────────────────────────────────┤
│  ⚡ Climate Shock Simulator  │ Live What-If testing slider (-30% rain, │
│                              │ +2°C heat) to prove dynamic resilience. │
├──────────────────────────────┼─────────────────────────────────────────┤
│  📱 "Cheapest Device First"  │ 160-character SMS & WhatsApp cards for  │
│                              │ 2G basic phones in remote rural areas.  │
├──────────────────────────────┼─────────────────────────────────────────┤
│  🌐 Multilingual Support     │ English, Hindi (हिन्दी), Kiswahili,    │
│                              │ and Spanish (Español).                  │
├──────────────────────────────┼─────────────────────────────────────────┤
│  🖨️ 1-Page Advisory Sheet    │ Print-optimized export for agricultural │
│                              │ extension officers and field agents.    │
└──────────────────────────────┴─────────────────────────────────────────┘
```

---

## 3. NASA Earth Observations & Data Sources

| Dataset | Parameter | Resolution | Role in Scoring |
| :--- | :--- | :--- | :--- |
| **NASA POWER** | `PRECTOTCORR` | Daily, Point | Historical annual rainfall & dry-season precipitation totals. |
| **NASA POWER** | `T2M_MAX`, `T2M_MIN` | Daily, Point | Extreme heat stress days (>35°C) and growing season temperature. |
| **NASA POWER / SMAP** | `GWETROOT` | Daily | Root-zone soil wetness index (water stress mitigation). |
| **ISRIC SoilGrids** | Clay, Sand, pH, SOC | 250m | Local soil texture, acidity, and organic carbon baseline. |
| **FAO EcoCrop** | Water need, cycle length | Tabular | 15 regionally diverse crops with full agronomic profiles. |

---

## 4. The 4-Pillar Transparent Scoring Algorithm

The core engine avoids black-box ungrounded AI hallucinations. It uses an explainable multi-factor composite score:

$$\text{Overall Score} = w_{\text{water}} \cdot S_{\text{water}} + w_{\text{soil}} \cdot S_{\text{soil}} + w_{\text{climate}} \cdot S_{\text{climate}} + w_{\text{econ}} \cdot S_{\text{econ}}$$

1. **Water Fit ($S_{\text{water}}$):**
   $$\text{Ratio} = \frac{\text{NASA\_Rainfall} \times \text{Irrigation\_Multiplier}}{\sum_{i=1}^3 \text{Crop\_Water\_Need}_i}$$
   Heavily penalizes deficits below 85% water coverage.
2. **Soil Health ($S_{\text{soil}}$):**
   - **Legume Bonus:** +35 points for biological nitrogen fixers (e.g. Cowpea, Chickpea, Pigeonpea, Groundnut).
   - **Monoculture Penalty:** -40 points if adjacent seasons share the same botanical family (e.g. Maize $\to$ Sorghum both *Poaceae*).
   - **Root Diversity:** +15 points for alternating taproot and fibrous root depths.
3. **Climate Resilience ($S_{\text{climate}}$):**
   - Matches heat tolerance ratings against NASA 5-year frequency of days $>35^\circ\text{C}$.
   - Matches drought dormancy against local precipitation trends and dry-season anomalies.
4. **Economic & Budget Fit ($S_{\text{econ}}$):**
   - Calibrated against farmer upfront budget (low budget prioritizes hardy, low-input crops over high-risk commercial crops).

---

## 5. Quickstart: Run in 1 Command

### Prerequisites
- Python 3.10+
- Node.js 18+ and npm

### 1-Click Launch
```bash
./run.sh
```
This automatically initializes the Python virtualenv, installs backend dependencies, verifies frontend build assets, and launches the unified server.

### Access Endpoints
- **Web App Dashboard:** [http://127.0.0.1:8000](http://127.0.0.1:8000)
- **Interactive Swagger API Docs:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **Health Check:** [http://127.0.0.1:8000/api/health](http://127.0.0.1:8000/api/health)

---

## 6. Running Automated Tests

Run the test suite to verify scoring accuracy across global coordinates:
```bash
source venv/bin/activate
PYTHONPATH=. pytest backend/tests/
```
Output:
```
backend/tests/test_scoring.py ... [100%]
============================== 3 passed in 0.10s ===============================
```

---

## 7. Global Pilot Benchmark Test Regions

| Region | Coordinates | Climate Profile | Top Recommended Sequence |
| :--- | :--- | :--- | :--- |
| **Maharashtra, India** | `19.84, 75.88` | Semi-arid vertisol, erratic monsoon | Sorghum $\to$ Chickpea (Legume) $\to$ Sesame |
| **Machakos, Kenya** | `-1.51, 37.26` | Bimodal dryland, severe drought risk | Pearl Millet $\to$ Cowpea $\to$ Cassava / Pigeonpea |
| **Central Valley, USA** | `36.74, -119.78` | Mediterranean, depleted groundwater | Wheat $\to$ Fallow/Cover Legume $\to$ Sunflower |
| **Sahel, Niger** | `14.21, 1.45` | Extreme arid, fragile sandy soils | Pearl Millet $\to$ Groundnut $\to$ Cowpea |
| **Iowa Corn Belt, USA** | `42.03, -93.63` | Humid high rainfall, rich mollisol | Maize $\to$ Soybean $\to$ Winter Cereal |

---

## 8. License & Acknowledgments
Built for the **NASA Space Apps Challenge**. Data provided by **NASA Langley Research Center (NASA POWER)** and **ISRIC World Soil Information**.

