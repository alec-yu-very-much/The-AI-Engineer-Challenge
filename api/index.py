from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import os
import logging
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s — %(message)s",
    datefmt="%H:%M:%S",
)

from api.llm_service import chat as llm_chat

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def root():
    index_path = Path(__file__).resolve().parent.parent / "frontend" / "out" / "index.html"
    if index_path.exists():
        return FileResponse(index_path)
    return {"status": "ok"}

logger = logging.getLogger(__name__)

@app.post("/api/chat")
def chat(request: ChatRequest):
    logger.info("[user_input] message=%r", request.message)
    try:
        reply = llm_chat(request.message)
        return {"reply": reply}
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calling LLM: {str(e)}")

# Serve Next.js static assets
static_dir = Path(__file__).resolve().parent.parent / "frontend" / "out"
if static_dir.exists():
    app.mount("/", StaticFiles(directory=str(static_dir), html=True), name="frontend")
