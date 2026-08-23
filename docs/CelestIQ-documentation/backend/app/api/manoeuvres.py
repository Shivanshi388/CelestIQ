from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
import numpy as np

from backend.app.manoeuvre import generator as gen
from backend.app.manoeuvre import simulator as sim
from backend.app.manoeuvre import optimizer as opt
from backend.app.orbit import conjunction as conj_mod

router = APIRouter()


class GenerateRequest(BaseModel):
    primary_position: List[float]
    primary_velocity: List[float]
    secondary_position: List[float]
    secondary_velocity: List[float]


class ManoeuvreCandidate(BaseModel):
    id: str
    delta_v: List[float]
    delta_v_mag: float


class SimulateRequest(BaseModel):
    primary_position: List[float]
    primary_velocity: List[float]
    secondary_position: List[float]
    secondary_velocity: List[float]
    delta_v: List[float]


@router.post("/generate", response_model=List[ManoeuvreCandidate])
def generate(req: GenerateRequest):
    r1 = np.array(req.primary_position)
    v1 = np.array(req.primary_velocity)
    candidates = gen.generate_candidates(r1, v1)
    out = []
    for i, dv in enumerate(candidates):
        out.append(ManoeuvreCandidate(id=f"m{i+1}", delta_v=list(dv), delta_v_mag=float(np.linalg.norm(dv))))
    return out


@router.post("/simulate")
def simulate(req: SimulateRequest):
    r1 = np.array(req.primary_position)
    v1 = np.array(req.primary_velocity)
    r2 = np.array(req.secondary_position)
    v2 = np.array(req.secondary_velocity)
    dv = np.array(req.delta_v)
    tca_before, md_before = conj_mod.closest_approach(r1, v1, r2, v2)
    tca_after, md_after = sim.simulate_manoeuvre(r1, v1, r2, v2, dv)
    return {"tca_before": float(tca_before), "miss_distance_before": float(md_before), "tca_after": float(tca_after), "miss_distance_after": float(md_after)}


@router.post("/optimise")
def optimise(req: GenerateRequest):
    r1 = np.array(req.primary_position)
    v1 = np.array(req.primary_velocity)
    r2 = np.array(req.secondary_position)
    v2 = np.array(req.secondary_velocity)
    candidates = gen.generate_candidates(r1, v1)
    ranked = opt.rank_candidates(r1, v1, r2, v2, candidates)
    return [{"id": f"m{i+1}", "delta_v": list(dv), "delta_v_mag": float(np.linalg.norm(dv)), "score": float(score)} for i, (dv, score) in enumerate(ranked)]
