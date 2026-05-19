import json
import os

from dotenv import load_dotenv
from groq import AsyncGroq

from models.schemas import GenerateBlockRequest, GenerateBlockResponse
from prompts.templates import PROMPTS

load_dotenv()

MODEL = "llama-3.3-70b-versatile"

_client: AsyncGroq | None = None


def _get_client() -> AsyncGroq:
    global _client
    if _client is None:
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise ValueError("GROQ_API_KEY não configurada")
        _client = AsyncGroq(api_key=api_key)
    return _client


async def generate_block(request: GenerateBlockRequest) -> GenerateBlockResponse:
    system_prompt = PROMPTS[request.block_type.value].format(
        language=request.language
    )

    response = await _get_client().chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Context: {request.context}"},
        ],
        response_format={"type": "json_object"},
        temperature=0.7,
    )

    raw = json.loads(response.choices[0].message.content)

    return GenerateBlockResponse(
        block_type=request.block_type,
        **raw,
    )
