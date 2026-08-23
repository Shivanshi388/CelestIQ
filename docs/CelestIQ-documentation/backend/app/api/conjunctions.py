from fastapi import APIRouter
from typing import List
from backend.app.orbit import conjunction as conj_mod
from pydantic import BaseModel
import numpy as np

router = APIRouter()


class ObjectState(BaseModel):
    id: str
    position: List[float]  # meters
    velocity: List[float]  # meters/sec


class ConjunctionSummary(BaseModel):
    id: str
    primary_id: str
    secondary_id: str
    tca: float
    miss_distance: float


@router.get("/", response_model=List[ConjunctionSummary])
def list_conjunctions():
    # For prototype we return a synthetic conjunction between two sample objects
    r1 = np.array([7000e3, 0.0, 0.0])
    v1 = np.array([0.0, 7.5e3, 0.0])
    r2 = np.array([7000e3, 50.0, 0.0])
    v2 = np.array([0.0, 7.5e3, 0.0])
    tca, md = conj_mod.closest_approach(r1, v1, r2, v2)
    return [
        ConjunctionSummary(
            id="C1",
            primary_id="SAT-1",
            secondary_id="OBJ-1",
            tca=float(tca),
            miss_distance=float(md),
        )
    ]


@router.get("/{conj_id}", response_model=ConjunctionSummary)
def get_conjunction(conj_id: str):
    # Return same synthetic for now
    return list_conjunctions()[0]
