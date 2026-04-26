from fastapi import APIRouter, UploadFile, File
from google import genai
from PIL import Image
import io
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

@router.post("/detect")
async def detect_disease(file: UploadFile = File(...)):
    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))
    
    prompt = """
    Tum ek expert plant pathologist ho.
    Is plant ki image dekho aur batao:
    1. Plant ka naam kya hai?
    2. Koi bimari hai? Agar hai toh kya naam hai?
    3. Bimari ke kya lakshan dikh rahe hain?
    4. Kya treatment karein? (Hindi mein)
    5. Kaise bachayein aage se?
    
    Hindi mein jawab do, simple bhasha mein.
    """
    
    response = client.models.generate_content(
       model="gemini-2.5-flash",
        contents=[prompt, image]
    )
    return {"result": response.text}