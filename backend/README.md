# DECONSTRUCT // Python FastAPI Backend Service (Google Gemini Multimodal)

This directory contains the Python FastAPI backend engine for the DECONSTRUCT (PROMZ) AI Video Reverse-Engineering Platform, powered by the official Google Gen AI SDK (`google-genai`).

## Features

- **Real Multimodal Video Analysis**: Uploads video files directly to Google Gen AI Files API and processes footage frame-by-frame using `gemini-3.5-flash` (with automated fallback to `gemini-3.7-flash` and `gemini-flash-latest`).
- **Container Inspection**: Probes resolution, framerate, duration, aspect ratio, and codec using PyAV (embedded FFmpeg) with `ffprobe` fallback.
- **Pydantic v2 Contract**: Data models mirroring the Next.js TypeScript definitions in `src/types/analysis.ts`.
- **Mode A (Video to Script)**: Scene-by-scene script cards with camera framing, motion trajectories, environment, lighting, subjects, dialogue transcription, audio stems, visible text OCR, and cut transitions.
- **Mode B (Recreation Prompt)**: Parametric prompt synthesis calibrated for Runway Gen-3, OpenAI Sora, Kling 1.5, and Universal Diffusion with negative prompts and temporal consistency guidelines.
- **Non-blocking Execution**: Long-running multimodal network uploads and analysis run in background threads off the FastAPI async event loop.
- **Safe Resource Cleanup**: Temporary files and uploaded Gemini remote files are deleted immediately after analysis.

## Setup & Execution

### 1. Configure Environment Variables

Create or update `backend/.env`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-3.5-flash
FALLBACK_MODELS=gemini-3.7-flash,gemini-3-flash-preview,gemini-flash-latest
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Run FastAPI Dev Server

```bash
uvicorn backend.main:app --reload --port 8000
```

- Swagger UI: `http://localhost:8000/docs`
- Health check: `http://localhost:8000/health`
- Video analysis: `POST http://localhost:8000/api/v1/analyze`

### 4. Connect Frontend

Ensure `.env.local` exists in the repository root:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```
