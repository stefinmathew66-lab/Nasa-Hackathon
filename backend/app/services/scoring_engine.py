import json
import os
from typing import List, Dict, Any, Tuple
from ..schemas import (
    CropSummary,
    SubScores,
    RotationPlan,
    ClimateSummary,
    FarmerConstraints,
    FarmerPriorities,
    RecommendationResponse,
    LocationInput
)

DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "data")
CROPS_FILE = os.path.join(DATA_DIR, "crops_database.json")

def load_crop_database() -> List[Dict[str, Any]]:
    with open(CROPS_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

class ScoringEngine:
    def __init__(self):
        self.crops = load_crop_database()
        self.crop_map = {c["id"]: c for c in self.crops}

    def _get_crop_summary(self, crop: Dict[str, Any], lang: str = "en") -> CropSummary:
        local_name = crop.get("local_names", {}).get(lang)
        display_name = local_name if (local_name and lang != "en") else crop["name"]
        return CropSummary(
            id=crop["id"],
            name=display_name,
            local_name=local_name or crop["name"],
            category=crop["category"],
            botanical_family=crop["botanical_family"],
            season=crop["season"],
            water_need_mm=crop["water_need_mm"],
            duration_days=crop["duration_days"],
            nitrogen_fixing=crop["nitrogen_fixing"],
            root_depth=crop["root_depth"],
            drought_tolerance=crop["drought_tolerance"],
            heat_tolerance=crop["heat_tolerance"],
            economic_return_index=crop["economic_return_index"],
            agronomic_role=crop["agronomic_role"]
        )

    def generate_candidate_rotations(
        self,
        constraints: FarmerConstraints,
        climate: ClimateSummary
    ) -> List[Tuple[Dict[str, Any], Dict[str, Any], Dict[str, Any]]]:
        """
        Generates realistic 3-season crop rotation candidates:
        - Season 1: Monsoon / Main crop (rainy or all-season)
        - Season 2: Cool / Residual moisture crop (cool or all-season)
        - Season 3: Dry / Resilient catch or cover crop (dry, all-season, or short legume)
        """
        s1_pool = [c for c in self.crops if c["season"] in ("rainy", "all")]
        s2_pool = [c for c in self.crops if c["season"] in ("cool", "all", "dry")]
        s3_pool = [c for c in self.crops if c["season"] in ("dry", "all", "rainy")]

        candidates = []
        for c1 in s1_pool:
            for c2 in s2_pool:
                # Basic agronomic filter: Avoid immediate monoculture
                if c1["id"] == c2["id"]:
                    continue
                for c3 in s3_pool:
                    if c2["id"] == c3["id"] or c1["id"] == c3["id"]:
                        continue
                    # Must contain at least one legume or oilseed to maintain balanced soil dynamics
                    has_restorative = c1["nitrogen_fixing"] or c2["nitrogen_fixing"] or c3["nitrogen_fixing"] or \
                                      c1["category"] in ("legume", "oilseed") or c2["category"] in ("legume", "oilseed") or c3["category"] in ("legume", "oilseed")
                    if has_restorative:
                        candidates.append((c1, c2, c3))

        if not candidates and len(self.crops) >= 3:
            default_trio = [
                (self.crop_map.get("sorghum", self.crops[0]), self.crop_map.get("chickpea", self.crops[1]), self.crop_map.get("sesame", self.crops[2])),
                (self.crop_map.get("pearl_millet", self.crops[0]), self.crop_map.get("cowpea", self.crops[1]), self.crop_map.get("sunflower", self.crops[2])),
                (self.crop_map.get("maize", self.crops[0]), self.crop_map.get("soybean", self.crops[1]), self.crop_map.get("wheat", self.crops[2]))
            ]
            candidates.extend(default_trio)

        return candidates

    def score_rotation(
        self,
        c1: Dict[str, Any],
        c2: Dict[str, Any],
        c3: Dict[str, Any],
        constraints: FarmerConstraints,
        priorities: FarmerPriorities,
        climate: ClimateSummary
    ) -> RotationPlan:
        # 1. WATER FIT SCORE (0 - 100)
        total_water_demand = c1["water_need_mm"] + c2["water_need_mm"] + c3["water_need_mm"]
        irrigation_factor = 1.0
        if constraints.water_access == "rainfed":
            irrigation_factor = 0.85
        elif constraints.water_access == "borewell":
            irrigation_factor = 1.35
        elif constraints.water_access == "canal":
            irrigation_factor = 1.45
        elif constraints.water_access == "drip":
            irrigation_factor = 1.70

        effective_water_supply = (climate.annual_rainfall_mm * irrigation_factor)
        water_ratio = effective_water_supply / max(total_water_demand, 1)

        if water_ratio >= 1.15:
            water_score = 95.0
        elif water_ratio >= 1.0:
            water_score = 85.0
        elif water_ratio >= 0.80:
            water_score = 65.0 - (1.0 - water_ratio) * 100
        elif water_ratio >= 0.60:
            water_score = 45.0 - (0.80 - water_ratio) * 120
        else:
            water_score = max(10.0, 30.0 - (0.60 - water_ratio) * 100)

        # 2. SOIL HEALTH SCORE (0 - 100)
        soil_score = 50.0
        legumes_count = sum(1 for c in (c1, c2, c3) if c["nitrogen_fixing"])
        if legumes_count == 1:
            soil_score += 25.0
        elif legumes_count >= 2:
            soil_score += 35.0

        # Monoculture family penalty (same botanical family in adjacent seasons)
        if c1["botanical_family"] == c2["botanical_family"]:
            soil_score -= 30.0
        if c2["botanical_family"] == c3["botanical_family"]:
            soil_score -= 30.0

        # Root depth diversification (+15 for alternating shallow/deep roots)
        root_depths = [c1["root_depth"], c2["root_depth"], c3["root_depth"]]
        if len(set(root_depths)) >= 2:
            soil_score += 15.0

        # Soil texture preference
        farmer_soil = constraints.soil_type if constraints.soil_type != "auto" else climate.soil_info.texture
        soil_matches = sum(1 for c in (c1, c2, c3) if any(farmer_soil in pref for pref in c["soil_preference"]))
        soil_score += (soil_matches * 5.0)

        # Previous crop family continuation penalty
        if constraints.previous_crop_id and constraints.previous_crop_id in self.crop_map:
            prev_fam = self.crop_map[constraints.previous_crop_id]["botanical_family"]
            if c1["botanical_family"] == prev_fam:
                soil_score -= 20.0

        soil_score = max(5.0, min(100.0, soil_score))

        # 3. CLIMATE RESILIENCE SCORE (0 - 100)
        climate_score = 60.0
        avg_drought_tol = (c1["drought_tolerance"] + c2["drought_tolerance"] + c3["drought_tolerance"]) / 3.0
        avg_heat_tol = (c1["heat_tolerance"] + c2["heat_tolerance"] + c3["heat_tolerance"]) / 3.0

        # NASA Heat days stress test
        if climate.heat_days_above_35c > 45:
            if avg_heat_tol >= 4.0:
                climate_score += 25.0
            elif avg_heat_tol <= 2.5:
                climate_score -= 30.0
        else:
            climate_score += (avg_heat_tol * 4.0)

        # NASA rainfall trend & dry season stress test
        if climate.rainfall_5yr_trend_pct < -5.0 or climate.annual_rainfall_mm < 600:
            if avg_drought_tol >= 4.0:
                climate_score += 25.0
            elif avg_drought_tol <= 2.5:
                climate_score -= 35.0
        else:
            climate_score += (avg_drought_tol * 3.0)

        # Root zone soil wetness buffer
        if climate.root_zone_soil_wetness < 0.30:
            if avg_drought_tol >= 4.0:
                climate_score += 10.0
            else:
                climate_score -= 15.0

        climate_score = max(5.0, min(100.0, climate_score))

        # 4. ECONOMIC & BUDGET FIT SCORE (0 - 100)
        avg_econ = (c1["economic_return_index"] + c2["economic_return_index"] + c3["economic_return_index"]) / 3.0
        avg_labor = (c1["labor_input"] + c2["labor_input"] + c3["labor_input"]) / 3.0
        avg_risk = (c1["risk_level"] + c2["risk_level"] + c3["risk_level"]) / 3.0

        econ_score = avg_econ * 20.0  # base 20 to 100
        if constraints.budget_level == "low":
            # Low budget rewards low input, low risk
            if avg_labor <= 2.5 and avg_risk <= 2.0:
                econ_score += 15.0
            elif avg_labor >= 4.0 or avg_risk >= 3.5:
                econ_score -= 25.0
        elif constraints.budget_level == "high":
            # High budget rewards higher cash crop value
            if avg_econ >= 4.0:
                econ_score += 15.0

        econ_score = max(10.0, min(100.0, econ_score))

        # WEIGHTED OVERALL SCORE
        total_weight = (
            priorities.save_water +
            priorities.improve_soil +
            priorities.reduce_risk +
            priorities.maximize_income
        )
        w_water = priorities.save_water / total_weight
        w_soil = priorities.improve_soil / total_weight
        w_climate = priorities.reduce_risk / total_weight
        w_econ = priorities.maximize_income / total_weight

        overall_score = round(
            (water_score * w_water) +
            (soil_score * w_soil) +
            (climate_score * w_climate) +
            (econ_score * w_econ),
            1
        )

        rating = "green" if overall_score >= 70.0 else ("yellow" if overall_score >= 45.0 else "red")
        lang = constraints.language or "en"

        # EXPLAINABILITY AND RISK WARNINGS
        drivers = []
        warnings = []

        if legumes_count >= 1:
            legume_names = [(c.get("local_names", {}).get(lang) if lang != "en" and c.get("local_names", {}).get(lang) else c["name"].split(" ")[0]) for c in (c1, c2, c3) if c["nitrogen_fixing"]]
            leg_str = ', '.join([n for n in legume_names if n])
            if lang == "hi":
                drivers.append(f"{leg_str} से जैविक नाइट्रोजन स्थिरीकरण बिना रासायनिक खाद के मिट्टी की उर्वरता लौटाता है।")
            elif lang == "sw":
                drivers.append(f"Uongezaji wa naitrojeni ya asili kutoka {leg_str} unarutubisha udongo bila gharama za kemikali.")
            elif lang == "es":
                drivers.append(f"Fijación biológica de nitrógeno de {leg_str} reconstruye la fertilidad del suelo sin agroquímicos.")
            else:
                drivers.append(f"Biological nitrogen fixation from {leg_str} rebuilds topsoil fertility without synthetic chemical costs.")

        if water_score >= 80.0:
            if lang == "hi":
                drivers.append(f"संतुलित जल मांग ({total_water_demand} मिमी) नासा वर्षा और स्थानीय सिंचाई क्षमता के पूर्णतः अनुकूल है।")
            elif lang == "sw":
                drivers.append(f"Mahitaji ya maji yaliyosawazishwa ({total_water_demand} mm) yanalingana vizuri na mvua ya NASA na uwezo wa umwagiliaji.")
            elif lang == "es":
                drivers.append(f"Demanda hídrica equilibrada ({total_water_demand} mm) dentro de la precipitación NASA y capacidad de riego.")
            else:
                drivers.append(f"Balanced water demand ({total_water_demand}mm) stays safely within local NASA precipitation & irrigation capacity.")

        if climate_score >= 80.0:
            if lang == "hi":
                drivers.append(f"उच्च सूखा/गर्मी सहनशीलता नासा द्वारा दर्ज अत्यधिक गर्मी के दिनों ({climate.heat_days_above_35c} दिन >35°C) में पैदावार की रक्षा करती है।")
            elif lang == "sw":
                drivers.append(f"Ustahimilivu mkubwa wa ukame na joto unalinda mavuno dhidi ya siku za joto kali za NASA ({climate.heat_days_above_35c} siku >35°C).")
            elif lang == "es":
                drivers.append(f"Alta tolerancia a sequía y calor protege el rendimiento frente a días de calor extremo de NASA ({climate.heat_days_above_35c} días >35°C).")
            else:
                drivers.append(f"High drought/heat tolerance protects yields against observed NASA extreme heat days ({climate.heat_days_above_35c} days >35°C).")

        if not drivers:
            if lang == "hi":
                drivers.append("टिकाऊ बहु-फसली चक्र जो आधारभूत कृषि उत्पादकता बनाए रखता है।")
            elif lang == "sw":
                drivers.append("Mzunguko mzuri wa mazao unaodumisha uzalishaji wa kimsingi wa shamba.")
            elif lang == "es":
                drivers.append("Ciclo de rotación viable que mantiene la productividad agrícola de base.")
            else:
                drivers.append("Viable multi-season rotational cycle maintaining baseline agricultural productivity.")

        primary_driver = drivers[0]

        # Warnings
        if water_ratio < 0.85:
            if lang == "hi":
                warnings.append(f"जल संकट जोखिम: कुल फसल मांग ({total_water_demand} मिमी) सामान्य वर्षा से अधिक है। अतिरिक्त सिंचाई आवश्यक है।")
            elif lang == "sw":
                warnings.append(f"Hatari ya Upungufu wa Maji: Mahitaji ya maji ({total_water_demand} mm) yanazidi mvua ya kawaida. Umwagiliaji wa ziada unahitajika.")
            elif lang == "es":
                warnings.append(f"Riesgo de Déficit Hídrico: Demanda total ({total_water_demand} mm) supera la lluvia típica. Se requiere riego adicional.")
            else:
                warnings.append(f"Water Deficit Risk: Total crop demand ({total_water_demand}mm) exceeds typical rainfall. Additional irrigation required.")

        if c1["botanical_family"] == c2["botanical_family"] or c2["botanical_family"] == c3["botanical_family"]:
            if lang == "hi":
                warnings.append("कीट/रोग चेतावनी: लगातार फसलें एक ही वानस्पतिक परिवार की हैं, जिससे कीटों का खतरा बढ़ सकता है।")
            elif lang == "sw":
                warnings.append("Onyo la Wadudu/Magonjwa: Mazao ya mfululizo yanatoka jamii moja ya kibiolojia, na kuongeza hatari ya wadudu.")
            elif lang == "es":
                warnings.append("Alerta de Plagas/Enfermedades: Cultivos consecutivos comparten la misma familia botánica, aumentando el riesgo.")
            else:
                warnings.append("Pest/Disease Warning: Consecutive crops share the same botanical family, increasing pest carryover risk.")

        if climate.heat_days_above_35c > 45 and (c1["heat_tolerance"] <= 2 or c2["heat_tolerance"] <= 2):
            if lang == "hi":
                warnings.append(f"गर्मी संवेदनशीलता: नासा रिकॉर्ड {climate.heat_days_above_35c} दिन >35°C दिखाते हैं, जिससे गर्मी का तनाव संभव है।")
            elif lang == "sw":
                warnings.append(f"Unyeti wa Joto: Rekodi za NASA zinaonyesha siku {climate.heat_days_above_35c} zaidi ya 35°C, hatari ya mkazo wa joto.")
            elif lang == "es":
                warnings.append(f"Sensibilidad al Calor: Registros NASA muestran {climate.heat_days_above_35c} días >35°C, riesgo de estrés térmico.")
            else:
                warnings.append(f"Heat Sensitivity: Local NASA records show {climate.heat_days_above_35c} days above 35°C, risking heat stress.")

        if climate.rainfall_5yr_trend_pct < -10.0:
            if lang == "hi":
                warnings.append(f"गिरती वर्षा चेतावनी: 5-वर्षीय नासा रुझान वर्षा में {abs(climate.rainfall_5yr_trend_pct)}% की गिरावट दर्शाता है।")
            elif lang == "sw":
                warnings.append(f"Onyo la Mvua Kupungua: Mwenendo wa miaka 5 wa NASA unaonyesha kupungua kwa {abs(climate.rainfall_5yr_trend_pct)}% kwa mvua.")
            elif lang == "es":
                warnings.append(f"Alerta de Lluvias Decrecientes: Tendencia NASA de 5 años muestra caída del {abs(climate.rainfall_5yr_trend_pct)}% en precipitación.")
            else:
                warnings.append(f"Declining Rainfall Alert: 5-year NASA trend indicates {abs(climate.rainfall_5yr_trend_pct)}% drop in precipitation.")

        # Soil & Water summaries & n_desc
        soil_summary = f"{legumes_count} legume phase(s) restoring soil nitrogen. Diversified {c1['root_depth']}/{c2['root_depth']}/{c3['root_depth']} root profile."
        water_summary = f"Total water need: {total_water_demand} mm. Water security index: {round(water_ratio * 100)}% of supply."
        
        if lang == "hi":
            n_desc = f"+{legumes_count * 35} किग्रा/हेक्टेयर अनुमानित जैविक नाइट्रोजन संतुलन" if legumes_count > 0 else "तटस्थ नाइट्रोजन संतुलन (जैविक खाद की आवश्यकता)"
        elif lang == "sw":
            n_desc = f"+{legumes_count * 35} kg/ha makadirio ya naitrojeni ya asili" if legumes_count > 0 else "Naitrojeni ya wastani (inahitaji mbolea ya samadi)"
        elif lang == "es":
            n_desc = f"+{legumes_count * 35} kg/ha balance estimado de nitrógeno biológico" if legumes_count > 0 else "Balance neutro de N (requiere abono orgánico)"
        else:
            n_desc = f"+{legumes_count * 35} kg/ha estimated biological N balance" if legumes_count > 0 else "Neutral N balance (requires organic manure/fertilizer)"

        rotation_id = f"{c1['id']}__{c2['id']}__{c3['id']}"

        return RotationPlan(
            rotation_id=rotation_id,
            rank=1,
            crops=[
                self._get_crop_summary(c1, constraints.language),
                self._get_crop_summary(c2, constraints.language),
                self._get_crop_summary(c3, constraints.language)
            ],
            overall_score=overall_score,
            rating=rating,
            sub_scores=SubScores(
                water_fit=round(water_score, 1),
                soil_health=round(soil_score, 1),
                climate_resilience=round(climate_score, 1),
                economic_fit=round(econ_score, 1)
            ),
            primary_driver=primary_driver,
            soil_impact_summary=soil_summary,
            water_impact_summary=water_summary,
            risk_warnings=warnings,
            total_water_need_mm=total_water_demand,
            nitrogen_balance_desc=n_desc
        )

    def generate_recommendations(
        self,
        location: LocationInput,
        constraints: FarmerConstraints,
        priorities: FarmerPriorities,
        climate: ClimateSummary
    ) -> List[RotationPlan]:
        candidates = self.generate_candidate_rotations(constraints, climate)
        scored_plans: List[RotationPlan] = []

        for c1, c2, c3 in candidates:
            plan = self.score_rotation(c1, c2, c3, constraints, priorities, climate)
            scored_plans.append(plan)

        # Sort descending by overall score
        scored_plans.sort(key=lambda p: p.overall_score, reverse=True)

        # Return top 3 distinct rotation strategies
        top_plans = scored_plans[:3]
        for idx, plan in enumerate(top_plans):
            plan.rank = idx + 1

        return top_plans

    def generate_sms_and_whatsapp(
        self,
        location: LocationInput,
        top_plan: RotationPlan,
        climate: ClimateSummary,
        lang: str = "en"
    ) -> Tuple[str, str]:
        c_names = " -> ".join([c.name.split(" ")[0] for c in top_plan.crops])
        warning_snippet = f" Alert: {top_plan.risk_warnings[0][:40]}" if top_plan.risk_warnings else ""
        
        if lang == "hi":
            sms = (
                f"नासा सलाहकार: विकल्प #{top_plan.rank} ({c_names})। स्कोर:{int(top_plan.overall_score)}/100। "
                f"जल मांग:{top_plan.total_water_need_mm}मिमी।{warning_snippet}"
            )[:160]
            wa = (
                f"🌾 *नासा फसल चक्र सलाहकार (NASA Crop Advisor)*\n"
                f"📍 *खेत निर्देशांक:* {location.lat:.2f}, {location.lon:.2f}\n"
                f"📊 *अनुकूलता स्कोर:* {top_plan.overall_score}/100\n\n"
                f"🗓️ *अनुशंसित 3-सीजन फसल चक्र:*\n"
                f"• सीजन 1: *{top_plan.crops[0].name}*\n"
                f"• सीजन 2: *{top_plan.crops[1].name}*\n"
                f"• सीजन 3: *{top_plan.crops[2].name}*\n\n"
                f"💡 *मुख्य कृषि लाभ:*\n{top_plan.primary_driver}\n\n"
                f"💧 *कुल जल आवश्यकता:* {top_plan.total_water_need_mm} मिमी (नासा वर्षा: {climate.annual_rainfall_mm} मिमी)\n"
                f"🌱 *मिट्टी प्रभाव:* {top_plan.nitrogen_balance_desc}\n"
            )
            if top_plan.risk_warnings:
                wa += f"\n⚠️ *जोखिम चेतावनी:* {top_plan.risk_warnings[0]}\n"
            wa += "\n_नासा उपग्रह डेटा एवं एफएओ कृषि मॉडल द्वारा संचालित_"
        elif lang == "sw":
            sms = (
                f"USHAURI WA NASA: Pendekezo #{top_plan.rank} ({c_names}). Alama:{int(top_plan.overall_score)}/100. "
                f"Maji:{top_plan.total_water_need_mm}mm.{warning_snippet}"
            )[:160]
            wa = (
                f"🌾 *USHAURI WA MAZAO WA NASA*\n"
                f"📍 *Vipimo vya Shamba:* {location.lat:.2f}, {location.lon:.2f}\n"
                f"📊 *Alama ya Ustahimilivu:* {top_plan.overall_score}/100\n\n"
                f"🗓️ *Mzunguko wa Misimu 3 Iliyopendekezwa:*\n"
                f"• Msimu 1: *{top_plan.crops[0].name}*\n"
                f"• Msimu 2: *{top_plan.crops[1].name}*\n"
                f"• Msimu 3: *{top_plan.crops[2].name}*\n\n"
                f"💡 *Faida Kuu ya Kilimo:*\n{top_plan.primary_driver}\n\n"
                f"💧 *Jumla ya Mahitaji ya Maji:* {top_plan.total_water_need_mm} mm (Mvua ya NASA: {climate.annual_rainfall_mm} mm)\n"
                f"🌱 *Athari kwa Udongo:* {top_plan.nitrogen_balance_desc}\n"
            )
            if top_plan.risk_warnings:
                wa += f"\n⚠️ *Onyo la Hatari:* {top_plan.risk_warnings[0]}\n"
            wa += "\n_Inaendeshwa na Data ya Setilaiti za NASA & FAO_"
        elif lang == "es":
            sms = (
                f"ASESOR NASA: Rec #{top_plan.rank} ({c_names}). Puntaje:{int(top_plan.overall_score)}/100. "
                f"Agua:{top_plan.total_water_need_mm}mm.{warning_snippet}"
            )[:160]
            wa = (
                f"🌾 *ASESOR DE ROTACIÓN DE CULTIVOS NASA*\n"
                f"📍 *Coordenadas:* {location.lat:.2f}, {location.lon:.2f}\n"
                f"📊 *Puntaje de Resiliencia:* {top_plan.overall_score}/100\n\n"
                f"🗓️ *Rotación Recomendada (3 Temporadas):*\n"
                f"• Temporada 1: *{top_plan.crops[0].name}*\n"
                f"• Temporada 2: *{top_plan.crops[1].name}*\n"
                f"• Temporada 3: *{top_plan.crops[2].name}*\n\n"
                f"💡 *Beneficio Agronómico Clave:*\n{top_plan.primary_driver}\n\n"
                f"💧 *Demanda Hídrica Total:* {top_plan.total_water_need_mm} mm (Lluvia NASA: {climate.annual_rainfall_mm} mm)\n"
                f"🌱 *Impacto en el Suelo:* {top_plan.nitrogen_balance_desc}\n"
            )
            if top_plan.risk_warnings:
                wa += f"\n⚠️ *Alerta de Riesgo:* {top_plan.risk_warnings[0]}\n"
            wa += "\n_Impulsado por Observaciones Satelitales NASA y Modelos FAO_"
        else:
            sms = (
                f"ADVISOR: Rec #{top_plan.rank} ({c_names}). Score:{int(top_plan.overall_score)}/100. "
                f"Water:{top_plan.total_water_need_mm}mm.{warning_snippet}"
            )[:160]
            wa = (
                f"🌾 *NASA CROP ROTATION ADVISORY*\n"
                f"📍 *Field Coordinates:* {location.lat:.2f}, {location.lon:.2f}\n"
                f"📊 *Suitability Score:* {top_plan.overall_score}/100 ({top_plan.rating.upper()})\n\n"
                f"🗓️ *Recommended 3-Season Rotation:*\n"
                f"• Season 1: *{top_plan.crops[0].name}*\n"
                f"• Season 2: *{top_plan.crops[1].name}*\n"
                f"• Season 3: *{top_plan.crops[2].name}*\n\n"
                f"💡 *Key Agronomic Benefit:*\n{top_plan.primary_driver}\n\n"
                f"💧 *Total Water Need:* {top_plan.total_water_need_mm} mm (NASA rain: {climate.annual_rainfall_mm} mm)\n"
                f"🌱 *Soil Impact:* {top_plan.nitrogen_balance_desc}\n"
            )
            if top_plan.risk_warnings:
                wa += f"\n⚠️ *Risk Alert:* {top_plan.risk_warnings[0]}\n"
            wa += "\n_Powered by NASA Earth Observations & FAO Agronomy Models_"

        return sms, wa

    def generate_voice_script(
        self,
        location: LocationInput,
        top_plan: RotationPlan,
        climate: ClimateSummary,
        lang: str = "en"
    ) -> str:
        c1 = top_plan.crops[0].name
        c2 = top_plan.crops[1].name
        c3 = top_plan.crops[2].name
        water_saved = max(0, 1400 - top_plan.total_water_need_mm)

        if lang == "hi":
            return (
                f"नमस्ते किसान भाई। नासा फसल चक्र सलाहकार सेवा में आपका स्वागत है। "
                f"आपके खेत के लिए सबसे उपयुक्त तीन-सीजन फसल चक्र है: "
                f"सीजन एक में {c1}, सीजन दो में {c2}, और सीजन तीन में {c3}। "
                f"यह अनुक्रम मिट्टी में जैविक नाइट्रोजन बढ़ाता है और लगभग {water_saved} मिलीमीटर पानी की बचत करता है। "
                f"पूर्ण रिपोर्ट आपके मोबाइल पर संदेश द्वारा भेज दी गई है। धन्यवाद।"
            )
        elif lang == "sw":
            return (
                f"Habari mkulima. Karibu kwenye huduma ya ushauri wa mazao kutoka NASA. "
                f"Kwa shamba lako, mzunguko bora wa misimu mitatu ni: "
                f"Msimu wa kwanza {c1}, msimu wa pili {c2}, na msimu wa tatu {c3}. "
                f"Mkakati huu unaboresha naitrojeni ya udongo na kuokoa milimita {water_saved} za maji. "
                f"Ujumbe wa uthibitisho umetumwa kwenye simu yako. Asante."
            )
        elif lang == "es":
            return (
                f"Hola productor. Bienvenido al servicio de asesoría de rotación de cultivos de la NASA. "
                f"Para las coordenadas de su finca, su rotación óptima de tres temporadas es: "
                f"Temporada uno: {c1}, temporada dos: {c2}, y temporada tres: {c3}. "
                f"Esta estrategia regenera el nitrógeno del suelo y ahorra {water_saved} milímetros de agua. "
                f"Se ha enviado un mensaje de texto con los detalles a su teléfono. Gracias."
            )
        else:
            return (
                f"Hello farmer. Welcome to the NASA Crop Rotation Advisory voice service. "
                f"For your field coordinates, your optimal three-season rotation strategy is: "
                f"Season one, {c1}. Season two, {c2}. Season three, {c3}. "
                f"This rotation rebuilds natural soil nitrogen and conserves {water_saved} millimeters of water. "
                f"A full summary has been dispatched to your mobile phone. Thank you."
            )

