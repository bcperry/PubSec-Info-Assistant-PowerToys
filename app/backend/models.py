from pydantic import BaseModel, Field
from typing import Dict, List, Optional
from enum import IntEnum

class Approaches(IntEnum):
    ReadRetrieveRead = 1
    ChatWebRetrieveRead = 2
    CompareWebWithWork = 3
    CompareWorkWithWeb = 4
    GPTDirect = 5

class ChatTurn(BaseModel):
    user: str
    bot: Optional[str] = None

class ChatRequestOverrides(BaseModel):
    prompt_template: Optional[str] = None
    exclude_category: Optional[str] = None
    top: int = 5
    semantic_ranker: bool = True
    semantic_captions: bool = False
    suggest_followup_questions: bool = False
    user_persona: str = "analyst"
    system_persona: str = "an Assistant"
    ai_persona: str = ""
    response_length: int = 2048
    response_temp: float = 0.6
    selected_folders: str = "All"
    selected_tags: str = ""

class Citation(BaseModel):
    citation: str
    source_path: str
    page_number: str

class ThoughtChain(BaseModel):
    work_response: str = ""
    web_response: str = ""

class ChatRequest(BaseModel):
    history: List[ChatTurn]
    approach: Approaches
    overrides: ChatRequestOverrides
    citation_lookup: Dict[str, Citation] = Field(default_factory=dict)
    thought_chain: ThoughtChain = Field(default_factory=ThoughtChain)