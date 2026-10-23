from typing import List, Optional
from pydantic import BaseModel, Field

class DialogueLine(BaseModel):
    speaker: str
    text: str
    confidence: float = Field(..., ge=0.0, le=1.0)

class AudioNotes(BaseModel):
    music: str
    foleyAndSfx: List[str]
    vocalTone: str

class SceneScriptItem(BaseModel):
    id: str
    sceneNumber: int
    timecodeStart: str
    timecodeEnd: str
    durationSeconds: float
    thumbnailUrl: Optional[str] = None
    visualSummary: str
    subjectsAndObjects: List[str]
    environment: str
    lightingAndAtmosphere: str
    cameraFraming: str
    cameraMovement: str
    dialogue: Optional[List[DialogueLine]] = None
    audioNotes: AudioNotes
    onScreenText: Optional[List[str]] = None
    transitionToNext: str

class ModeAScript(BaseModel):
    overallMood: str
    pacing: str
    scenes: List[SceneScriptItem]

class RecreationPromptOutput(BaseModel):
    targetModel: str
    masterPrompt: str
    negativePrompt: Optional[str] = None
    styleKeywords: List[str]
    cameraDirectives: str
    lightingDirective: str
    compositionDirective: str
    motionPacing: str
    aspectRatio: str
    recommendedFps: int
    temporalConsistencyHints: List[str]

class ModeBPrompt(BaseModel):
    runwayGen3: RecreationPromptOutput
    openaiSora: RecreationPromptOutput
    klingAI: RecreationPromptOutput
    universalDiffusion: RecreationPromptOutput

class ProcessingMetrics(BaseModel):
    framesAnalyzed: int
    speechSegmentsIdentified: int
    cutsDetected: int
    audioStemsSeparated: int
    analysisTimeSeconds: float

class VideoAnalysisResult(BaseModel):
    videoId: str
    title: str
    durationSeconds: float
    totalScenes: int
    resolution: str
    fps: int
    aspectRatio: str
    dominantColorPalette: List[str]
    confidenceScore: float
    modeAScript: ModeAScript
    modeBPrompt: ModeBPrompt
    processingMetrics: ProcessingMetrics
