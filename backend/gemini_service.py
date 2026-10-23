"""
DECONSTRUCT // AI Video Reverse-Engineering Platform
Real Google Gemini Multimodal Video Analysis Engine
"""

import os
import time
import json
import logging
from typing import Dict, Any, List, Optional
from dotenv import load_dotenv
from google import genai
from google.genai import types
from google.genai.errors import APIError, ClientError, ServerError

# Load environment
load_dotenv()
load_dotenv("backend/.env")

logger = logging.getLogger("promz.gemini")

def get_gemini_client() -> genai.Client:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("Missing GEMINI_API_KEY in backend/.env or system environment.")
    return genai.Client(api_key=api_key)

def get_target_models() -> List[str]:
    primary = os.getenv("GEMINI_MODEL", "gemini-3.5-flash")
    fallbacks_str = os.getenv("FALLBACK_MODELS", "gemini-3.7-flash,gemini-3-flash-preview,gemini-flash-latest")
    fallbacks = [m.strip() for m in fallbacks_str.split(",") if m.strip()]
    models = [primary] + [m for m in fallbacks if m != primary]
    return models

ANALYSIS_SYSTEM_PROMPT = """
You are DECONSTRUCT, an elite cinematic video reverse-engineering and multimodal analysis AI.
You inspect raw video footage frame-by-frame and deconstruct it with director-level technical precision into two deliverables:

1. Mode A: Production Screenplay Breakdown
- Deconstruct the video into chronological scenes / distinct shots.
- Report realistic SMPTE timecodes ("00:MM:SS.ms") that correspond accurately to the footage.
- For camera framing and movement: Describe observed lens type (e.g., Wide, Close-Up, Telephoto, Anamorphic framing) and 6-DoF camera motion (Static, Dolly in/out, Pan, Tilt, Crane/Pedestal, Handheld tracking, Gimbal glide). Do not invent fictitious equipment models not visible in the footage.
- Visual subjects and actions: Identify all visible subjects, characters, objects, and key movements.
- Environment & Setting: Accurately describe the location, architectural elements, textures, and depth.
- Lighting & Atmosphere: Detail the key, fill, kicker, rim lighting, volumetric haze, shadows, and color temperature.
- Color Palette: Extract 4 to 6 dominant hexadecimal color codes (#RRGGBB) directly observed in the video.
- Audio & Dialogue: If speech or dialogue is audible, transcribe it verbatim with speaker label and confidence (0.0 - 1.0). If no speech is present, return empty dialogue array. Describe music score/drone, foley/sfx, and vocal tone.
- On-Screen Text (OCR): Extract any legible visible typography, titles, logos, or UI elements.
- Transitions: Note cut transitions between shots (Hard cut, Whip pan, Dissolve, Fade).

2. Mode B: Parametric Latent Diffusion Recreation Prompts
Generate high-fidelity, production-grade recreation prompts calibrated for:
a) Runway Gen-3 Alpha: Highly cinematic descriptive prompt, motion dynamics, camera movement directives, Kodak/film grain tokens, and negative prompt.
b) OpenAI Sora: Physically grounded visual prompts emphasizing physical lighting bounce, fluid dynamics, continuous camera tracking, and spatial depth.
c) Kling 1.5: 8K cinematic detail, lighting contrast, photorealistic shutter motion.
d) Universal Diffusion: Model-agnostic generative prompt.

Include temporal consistency hints for each model to minimize generative artifacts (morphing, texture jitter, anatomy errors).

Your output MUST be a strict, valid JSON object conforming exactly to the requested schema.
"""

def generate_video_analysis(
    video_path: str,
    metadata: Dict[str, Any],
    file_title: str
) -> Dict[str, Any]:
    """
    Uploads the video file to Google Gen AI Files API, waits for processing,
    and runs multimodal analysis with automatic model fallback.
    """
    client = get_gemini_client()
    video_file = None
    
    try:
        # 1. Upload video file to Gemini Files API
        logger.info(f"Uploading {video_path} to Gemini Files API...")
        video_file = client.files.upload(file=video_path)
        logger.info(f"File uploaded: {video_file.name}, initial state: {video_file.state}")
        
        # 2. Poll until ACTIVE (or failure)
        max_wait_seconds = 180
        poll_interval = 2.0
        elapsed = 0.0
        
        while video_file.state.name == "PROCESSING":
            if elapsed >= max_wait_seconds:
                raise TimeoutError(f"Video processing on Gemini Files API timed out after {max_wait_seconds}s")
            time.sleep(poll_interval)
            elapsed += poll_interval
            video_file = client.files.get(name=video_file.name)
            logger.info(f"Polling Gemini video file state: {video_file.state.name} ({elapsed}s)")
            
        if video_file.state.name != "ACTIVE":
            error_detail = getattr(video_file, "error", "Unknown error during video ingestion")
            raise RuntimeError(f"Gemini video processing failed with state: {video_file.state.name}. Error: {error_detail}")

        # 3. Construct analysis prompt
        user_prompt = f"""
Analyze this uploaded video:
- Title/File Reference: {file_title}
- Duration: {metadata.get('duration', 10.0)} seconds
- Resolution: {metadata.get('resolution', '1920x1080')}
- Frame Rate: {metadata.get('fps', 30)} FPS
- Aspect Ratio: {metadata.get('aspect_ratio', '16:9')}
- Has Audio Track: {metadata.get('has_audio', True)}

Return a complete, valid JSON object with the following exact keys:
{{
  "overallMood": "string (1-2 sentences describing the overall cinematic mood)",
  "pacing": "string (editorial rhythm and pacing analysis)",
  "dominantColorPalette": ["#hex1", "#hex2", "#hex3", "#hex4"],
  "confidenceScore": 0.95,
  "cutsDetected": 3,
  "scenes": [
    {{
      "id": "scene-01",
      "sceneNumber": 1,
      "timecodeStart": "00:00:00.00",
      "timecodeEnd": "00:00:05.00",
      "durationSeconds": 5.0,
      "visualSummary": "Detailed description of the visual action in this shot",
      "subjectsAndObjects": ["Subject 1", "Key Object"],
      "environment": "Location, architecture, background setting",
      "lightingAndAtmosphere": "Lighting sources, shadows, color temperature",
      "cameraFraming": "Shot framing (e.g. Extreme Wide, Medium Close-Up, Low-Angle)",
      "cameraMovement": "Camera motion trajectory (e.g. Dolly forward, Slow pan, Static)",
      "dialogue": [
        {{
          "speaker": "Speaker label or SPEAKER 1",
          "text": "Transcribed line of speech",
          "confidence": 0.95
        }}
      ],
      "audioNotes": {{
        "music": "Description of musical score, drone, or rhythm",
        "foleyAndSfx": ["Sound effect 1", "Sound effect 2"],
        "vocalTone": "Tone of voice or 'No dialogue'"
      }},
      "onScreenText": ["Any visible text / graphics / credits"],
      "transitionToNext": "Cut on action / Whip pan / Dissolve / Fade out"
    }}
  ],
  "modeBPrompt": {{
    "runwayGen3": {{
      "targetModel": "Runway Gen-3",
      "masterPrompt": "Cinematic prompt tailored for Runway Gen-3 with camera motion and lighting directives",
      "negativePrompt": "low quality, 3d render, plastic textures, blurry, amateur footage, distorted geometry",
      "styleKeywords": ["Keyword 1", "Keyword 2", "Keyword 3"],
      "cameraDirectives": "Camera movement directives",
      "lightingDirective": "Lighting description",
      "compositionDirective": "Framing composition",
      "motionPacing": "Kinetic tempo",
      "aspectRatio": "{metadata.get('aspect_ratio', '16:9')}",
      "recommendedFps": {metadata.get('fps', 30)},
      "temporalConsistencyHints": ["Hint 1", "Hint 2"]
    }},
    "openaiSora": {{
      "targetModel": "OpenAI Sora",
      "masterPrompt": "Photorealistic prompt calibrated for OpenAI Sora physics and lighting",
      "negativePrompt": "unrealistic physics, morphing limbs, cartoonish textures",
      "styleKeywords": ["Photorealistic", "Physical Lighting", "Continuous Motion"],
      "cameraDirectives": "Camera directives",
      "lightingDirective": "Lighting details",
      "compositionDirective": "Framing details",
      "motionPacing": "Pacing description",
      "aspectRatio": "{metadata.get('aspect_ratio', '16:9')}",
      "recommendedFps": {metadata.get('fps', 30)},
      "temporalConsistencyHints": ["Hint 1", "Hint 2"]
    }},
    "klingAI": {{
      "targetModel": "Kling 1.5",
      "masterPrompt": "8K cinematic prompt with dramatic contrast for Kling 1.5",
      "negativePrompt": "deformed, lowres, cartoon, amateur",
      "styleKeywords": ["Masterpiece 8K", "Film Look", "High Contrast"],
      "cameraDirectives": "Camera motion",
      "lightingDirective": "Lighting directive",
      "compositionDirective": "Composition directive",
      "motionPacing": "Pacing",
      "aspectRatio": "{metadata.get('aspect_ratio', '16:9')}",
      "recommendedFps": 30,
      "temporalConsistencyHints": ["Hint 1", "Hint 2"]
    }},
    "universalDiffusion": {{
      "targetModel": "Universal Diffusion",
      "masterPrompt": "Comprehensive generative prompt capturing subject, camera, and aesthetics",
      "negativePrompt": "blurry, low quality, artifacts",
      "styleKeywords": ["Cinematic", "Color Graded", "High Fidelity"],
      "cameraDirectives": "Camera motion",
      "lightingDirective": "Lighting",
      "compositionDirective": "Composition",
      "motionPacing": "Pacing",
      "aspectRatio": "{metadata.get('aspect_ratio', '16:9')}",
      "recommendedFps": 24,
      "temporalConsistencyHints": ["Hint 1", "Hint 2"]
    }}
  }}
}}
"""

        # 4. Execute multimodal query with model fallbacks
        candidate_models = get_target_models()
        raw_response_text = None
        last_error = None
        used_model = None

        for model_name in candidate_models:
            try:
                logger.info(f"Calling Gemini with model '{model_name}'...")
                response = client.models.generate_content(
                    model=model_name,
                    contents=[video_file, user_prompt],
                    config=types.GenerateContentConfig(
                        system_instruction=ANALYSIS_SYSTEM_PROMPT,
                        response_mime_type="application/json",
                        temperature=0.2,
                    )
                )
                raw_response_text = response.text
                used_model = model_name
                logger.info(f"Gemini model '{model_name}' succeeded.")
                break
            except ServerError as se:
                logger.warning(f"Model '{model_name}' returned ServerError (503/high demand): {se}. Trying next fallback...")
                last_error = se
                time.sleep(1.0)
            except ClientError as ce:
                logger.warning(f"Model '{model_name}' returned ClientError: {ce}. Trying next fallback...")
                last_error = ce
            except Exception as e:
                logger.warning(f"Model '{model_name}' failed with {type(e).__name__}: {e}")
                last_error = e

        if not raw_response_text:
            raise RuntimeError(f"All Gemini candidate models failed. Last error: {last_error}")

        # 5. Clean and parse JSON
        cleaned_json = raw_response_text.strip()
        if cleaned_json.startswith("```json"):
            cleaned_json = cleaned_json[7:]
        if cleaned_json.startswith("```"):
            cleaned_json = cleaned_json[3:]
        if cleaned_json.endswith("```"):
            cleaned_json = cleaned_json[:-3]
        cleaned_json = cleaned_json.strip()

        parsed_data = json.loads(cleaned_json)
        parsed_data["_gemini_model_used"] = used_model
        return parsed_data

    finally:
        # 6. Always clean up uploaded file on Gemini server
        if video_file is not None:
            try:
                logger.info(f"Cleaning up uploaded file on Gemini: {video_file.name}")
                client.files.delete(name=video_file.name)
            except Exception as del_err:
                logger.warning(f"Failed to delete Gemini temporary file {video_file.name}: {del_err}")
