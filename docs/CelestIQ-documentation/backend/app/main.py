from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.api import conjunctions, manoeuvres

app = FastAPI(title="CelestIQ Prototype API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(conjunctions.router, prefix="/conjunctions")
app.include_router(manoeuvres.router, prefix="/manoeuvres")

@app.get("/health")
def health():
    return {"status": "ok"}
