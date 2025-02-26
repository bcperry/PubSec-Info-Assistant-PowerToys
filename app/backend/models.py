from pydantic import BaseModel, Field
from typing import Dict, List, Optional, Union
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
    promptTemplate: Optional[str] = None
    excludeCategory: Optional[str] = None
    top: int = 5
    semanticRanker: bool = True
    semanticCaptions: bool = False
    suggestFollowupQuestions: bool = False
    userPersona: str = "analyst"
    systemPersona: str = "an Assistant" 
    aiPersona: str = ""
    responseLength: int = 2048
    responseTemp: float = 0.6
    selectedFolders: str = "All"
    selectedTags: str = ""

class Citation(BaseModel):
    citation: str
    source_path: str
    page_number: str

class ChatRequest(BaseModel):
    history: List[ChatTurn]
    approach: int
    overrides: ChatRequestOverrides
    citation_lookup: Dict[str, Citation] = Field(default_factory=dict)
    thought_chain: Dict[str, str] = Field(default_factory=dict)