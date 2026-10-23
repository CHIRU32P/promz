import { VideoAnalysisResult } from "@/types/analysis";
import { DEMO_PRESETS } from "@/data/mockAnalysis";

export interface ProcessingStage {
  stage: number;
  totalStages: number;
  title: string;
  detail: string;
  progressPercent: number;
}

export interface AnalysisOptions {
  mode: 'all' | 'script' | 'prompt';
  targetGenerators?: string[];
  extractAudio?: boolean;
  detectText?: boolean;
}

const FASTAPI_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Check if the backend API is reachable and healthy.
 */
export async function checkBackendHealth(): Promise<{
  healthy: boolean;
  gemini_configured?: boolean;
  default_model?: string;
  error?: string;
}> {
  try {
    const res = await fetch(`${FASTAPI_BASE_URL}/health`, {
      method: "GET",
      cache: "no-store",
    });
    if (!res.ok) {
      return { healthy: false, error: `Status ${res.status}: ${res.statusText}` };
    }
    const data = await res.json();
    return {
      healthy: true,
      gemini_configured: data.gemini_configured,
      default_model: data.default_model,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { healthy: false, error: message };
  }
}

/**
 * Service to handle video reverse-engineering analysis.
 * Connects directly to the live Google Gemini FastAPI backend.
 */
export async function reverseEngineerVideo(
  videoFileOrPresetId: File | string,
  options?: AnalysisOptions,
  onProgress?: (progress: ProcessingStage) => void
): Promise<VideoAnalysisResult> {
  // If it's an existing demonstration preset ID, return demo preset data immediately
  if (typeof videoFileOrPresetId === "string") {
    const preset = DEMO_PRESETS.find((p) => p.id === videoFileOrPresetId);
    if (preset) {
      return preset.data;
    }
  }

  // Real uploaded file: communicate directly with FastAPI backend
  if (typeof videoFileOrPresetId !== "string") {
    const file = videoFileOrPresetId;

    if (onProgress) {
      onProgress({
        stage: 1,
        totalStages: 4,
        title: "Uploading Video Stream",
        detail: `Streaming ${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB) to backend...`,
        progressPercent: 20,
      });
    }

    const formData = new FormData();
    formData.append("file", file);
    if (options) {
      formData.append("options", JSON.stringify(options));
    }

    let progressTimer: NodeJS.Timeout | null = null;
    let currentPct = 25;

    // Simulate progress updates while backend communicates with Gemini
    if (onProgress) {
      progressTimer = setInterval(() => {
        currentPct = Math.min(currentPct + 4, 92);
        let title = "Gemini Multimodal Ingestion";
        let detail = "Processing video frames and optical motion vectors with Google Gemini...";
        let stageNum = 2;

        if (currentPct > 55) {
          stageNum = 3;
          title = "Deconstructing Scenes & Dialogue";
          detail = "Extracting scene boundaries, timecodes, camera trajectories, and vocal audio stems...";
        }
        if (currentPct > 80) {
          stageNum = 4;
          title = "Synthesizing Recreation Prompts";
          detail = "Calibrating latent diffusion tokens for Runway Gen-3, OpenAI Sora, and Kling AI...";
        }

        onProgress({
          stage: stageNum,
          totalStages: 4,
          title,
          detail,
          progressPercent: currentPct,
        });
      }, 1500);
    }

    try {
      const response = await fetch(`${FASTAPI_BASE_URL}/api/v1/analyze`, {
        method: "POST",
        body: formData,
      });

      if (progressTimer) clearInterval(progressTimer);

      if (!response.ok) {
        let errMessage = `Server error ${response.status}: ${response.statusText}`;
        try {
          const errData = await response.json();
          if (errData.detail) {
            errMessage = typeof errData.detail === "string" ? errData.detail : JSON.stringify(errData.detail);
          }
        } catch {
          // keep fallback errMessage
        }
        throw new Error(errMessage);
      }

      if (onProgress) {
        onProgress({
          stage: 4,
          totalStages: 4,
          title: "Analysis Finalized",
          detail: "Calibration complete. Synchronizing master production script and prompt playground.",
          progressPercent: 100,
        });
      }

      const result = (await response.json()) as VideoAnalysisResult;
      return result;
    } catch (err: unknown) {
      if (progressTimer) clearInterval(progressTimer);
      const message = err instanceof Error ? err.message : String(err);
      if (message.includes("Failed to fetch") || message.includes("NetworkError")) {
        throw new Error(
          `Cannot connect to FastAPI backend at ${FASTAPI_BASE_URL}. Ensure 'uvicorn main:app --reload --port 8000' is running.`
        );
      }
      throw new Error(message);
    }
  }

  // Fallback preset if string was not found
  return DEMO_PRESETS[0].data;
}

/**
 * Format scene breakdown into industry standard Screenplay format (Markdown).
 */
export function exportScriptAsMarkdown(result: VideoAnalysisResult): string {
  let md = `# PRODUCTION SCRIPT DECONSTRUCTION\n`;
  md += `**Title:** ${result.title}\n`;
  md += `**Duration:** ${result.durationSeconds}s | **Aspect Ratio:** ${result.aspectRatio} | **FPS:** ${result.fps}\n`;
  md += `**Overall Mood:** ${result.modeAScript.overallMood}\n`;
  md += `**Pacing Analysis:** ${result.modeAScript.pacing}\n\n`;
  md += `---\n\n`;

  result.modeAScript.scenes.forEach((scene) => {
    md += `### SCENE ${scene.sceneNumber} [${scene.timecodeStart} - ${scene.timecodeEnd}] (${scene.durationSeconds}s)\n\n`;
    md += `**Visual Summary:** ${scene.visualSummary}\n\n`;
    md += `**Environment:** ${scene.environment}\n\n`;
    md += `**Lighting & Atmosphere:** ${scene.lightingAndAtmosphere}\n\n`;
    md += `**Camera Framing & Movement:** ${scene.cameraFraming} — ${scene.cameraMovement}\n\n`;

    if (scene.subjectsAndObjects && scene.subjectsAndObjects.length > 0) {
      md += `**Subjects & Props:** ${scene.subjectsAndObjects.join(", ")}\n\n`;
    }

    if (scene.dialogue && scene.dialogue.length > 0) {
      md += `**Dialogue:**\n`;
      scene.dialogue.forEach((d) => {
        md += `> **${d.speaker}:** "${d.text}" *(Confidence: ${Math.round(d.confidence * 100)}%)*\n`;
      });
      md += `\n`;
    }

    md += `**Audio & Sound Design:**\n`;
    md += `- Music: ${scene.audioNotes.music}\n`;
    md += `- Foley / SFX: ${scene.audioNotes.foleyAndSfx.join(", ")}\n`;
    md += `- Vocal Tone: ${scene.audioNotes.vocalTone}\n\n`;

    if (scene.onScreenText && scene.onScreenText.length > 0) {
      md += `**Visible On-Screen Graphics/Text:** ${scene.onScreenText.join(" | ")}\n\n`;
    }

    md += `**Transition:** ${scene.transitionToNext}\n\n`;
    md += `---\n\n`;
  });

  md += `*Generated automatically by DECONSTRUCT // AI Video Reverse-Engineering Platform with Google Gemini.*`;
  return md;
}

/**
 * Format prompt outputs into clean JSON.
 */
export function exportAnalysisAsJson(result: VideoAnalysisResult): string {
  return JSON.stringify(result, null, 2);
}
