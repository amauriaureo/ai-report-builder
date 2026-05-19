from enum import Enum

from pydantic import BaseModel


class BlockType(str, Enum):
    SUMMARY = "summary"
    KPI = "kpi"
    INSIGHT = "insight"
    RECOMMENDATION = "recommendation"


class GenerateBlockRequest(BaseModel):
    block_type: BlockType
    context: str
    language: str = "en-US"


class KPIData(BaseModel):
    label: str
    value: str
    trend: str
    delta: str


class GenerateBlockResponse(BaseModel):
    block_type: BlockType
    title: str
    content: str
    kpi_data: KPIData | None = None
