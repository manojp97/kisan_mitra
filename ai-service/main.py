from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import disease, crop, chatbot
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="KisanMitra AI Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(disease.router, prefix="/disease", tags=["Disease"])
app.include_router(crop.router, prefix="/crop", tags=["Crop"])
app.include_router(chatbot.router, prefix="/chatbot", tags=["Chatbot"])

@app.get("/")
def root():
    return {"message": "KisanMitra AI Service chal raha hai!"}