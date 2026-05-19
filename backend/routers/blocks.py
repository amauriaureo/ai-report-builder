from fastapi import APIRouter, HTTPException

from models.schemas import GenerateBlockRequest, GenerateBlockResponse
from services.ai_service import generate_block

router = APIRouter(prefix="/api", tags=["blocks"])


@router.post("/generate-block", response_model=GenerateBlockResponse)
async def generate_block_endpoint(request: GenerateBlockRequest):
    try:
        return await generate_block(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e
