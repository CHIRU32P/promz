export interface SceneScriptItem {
  id: string;
  sceneNumber: number;
  timecodeStart: string;
  timecodeEnd: string;
  durationSeconds: number;
  thumbnailUrl?: string;
  visualSummary: string;
  subjectsAndObjects: string[];
  environment: string;
  lightingAndAtmosphere: string;
  cameraFraming: string;
  cameraMovement: string;
  dialogue?: {
    speaker: string;
    text: string;
    confidence: number;
  }[];
  audioNotes: {
    music: string;
    foleyAndSfx: string[];
    vocalTone: string;
  };
  onScreenText?: string[];
  transitionToNext: string;
}

export interface RecreationPromptOutput {
  targetModel: 'Runway Gen-3' | 'OpenAI Sora' | 'Kling 1.5' | 'Luma Dream Machine' | 'Universal Diffusion';
  masterPrompt: string;
  negativePrompt?: string;
  styleKeywords: string[];
  cameraDirectives: string;
  lightingDirective: string;
  compositionDirective: string;
  motionPacing: string;
  aspectRatio: string;
  recommendedFps: number;
  temporalConsistencyHints: string[];
}

export interface VideoAnalysisResult {
  videoId: string;
  title: string;
  durationSeconds: number;
  totalScenes: number;
  resolution: string;
  fps: number;
  aspectRatio: string;
  dominantColorPalette: string[];
  confidenceScore: number;
  modeAScript: {
    overallMood: string;
    pacing: string;
    scenes: SceneScriptItem[];
  };
  modeBPrompt: {
    runwayGen3: RecreationPromptOutput;
    openaiSora: RecreationPromptOutput;
    klingAI: RecreationPromptOutput;
    universalDiffusion: RecreationPromptOutput;
  };
  processingMetrics: {
    framesAnalyzed: number;
    speechSegmentsIdentified: number;
    cutsDetected: number;
    audioStemsSeparated: number;
    analysisTimeSeconds: number;
  };
}

export interface DemoVideoPreset {
  id: string;
  title: string;
  category: string;
  duration: string;
  badge: string;
  description: string;
  previewGradient: string;
  accentColor: string;
  videoPlaceholderUrl?: string;
  data: VideoAnalysisResult;
}
