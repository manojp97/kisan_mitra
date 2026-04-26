from fastapi import APIRouter

router = APIRouter()

crop_data = {
    ("loamy", "summer"): ["Moong Dal", "Tinda", "Lauki"],
    ("loamy", "winter"): ["Gehun", "Sarson", "Matar"],
    ("loamy", "monsoon"): ["Dhan", "Maize", "Soybean"],
    ("black", "summer"): ["Kapas", "Moong", "Urad"],
    ("black", "winter"): ["Gehun", "Gram", "Linseed"],
    ("black", "monsoon"): ["Soybean", "Jowar", "Dhan"],
    ("sandy", "summer"): ["Moong", "Bajra", "Watermelon"],
    ("sandy", "winter"): ["Sarson", "Gram", "Barley"],
    ("sandy", "monsoon"): ["Bajra", "Moong", "Groundnut"],
    ("clay", "summer"): ["Lauki", "Tinda", "Arbi"],
    ("clay", "winter"): ["Palak", "Methi", "Matar"],
    ("clay", "monsoon"): ["Dhan", "Arbi", "Dhan"],
    ("red", "summer"): ["Groundnut", "Bajra", "Til"],
    ("red", "winter"): ["Gram", "Linseed", "Barley"],
    ("red", "monsoon"): ["Dhan", "Maize", "Arhar"],
}

@router.post("/recommend")
async def recommend_crop(data: dict):
    soil = data.get("soilType", "loamy").lower()
    season = data.get("season", "winter").lower()
    
    crops = crop_data.get((soil, season), ["Gehun", "Dhan", "Maize"])
    
    return {
        "soilType": soil,
        "season": season,
        "recommendedCrops": crops
    }