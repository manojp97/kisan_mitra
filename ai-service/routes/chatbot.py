from fastapi import APIRouter
from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

@router.post("/ask")
async def ask_chatbot(data: dict):
    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
    question = data.get("question", "")
    
    prompt = f"""
    Tum ek expert Indian farming assistant ho. 
    Farmer ka sawaal hai: {question}
    Hindi mein jawab do, simple aur practical advice do.
    Max 150 words mein jawab do.
    """
    
    response = client.models.generate_content(
     model="gemini-2.5-flash",
        contents=prompt
    )
    return {"answer": response.text}