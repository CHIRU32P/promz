# DECONSTRUCT // Python FastAPI Backend Service

This directory contains the Python FastAPI backend implementation for the DECONSTRUCT AI Video Reverse-Engineering Platform.

## Features

- **Asynchronous Multipart Video Ingestion**: Accepts `.mp4`, `.mov`, `.webm`, `.mkv` files.
- **FFmpeg Container Inspection**: Probes resolution, framerate, duration, and aspect ratio.
- **Pydantic v2 Contract**: Data models exactly mirroring the Next.js TypeScript definitions in `src/types/analysis.ts`.
- **Dual Output Generation**:
  - **Mode A (Video to Script)**: Scene-by-scene script cards with camera framing, lens specs, environment, lighting, subjects, dialogue transcription, audio stems, visible text OCR, transition tags.
  - **Mode B (Recreation Prompt)**: Diffusion model prompt synthesis for Runway Gen-3, OpenAI Sora, Kling 1.5, and Universal Diffusion.
- **CORS Configured**: Ready to communicate with Next.js running on `http://localhost:3000`.

## Quickstart

### 1. Create Virtual Environment

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS / Linux
python3 -m venv venv
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Run FastAPI Dev Server

```bash
uvicorn backend.main:app --reload --port 8000
```

FastAPI interactive Swagger documentation will be available at:
`http://localhost:8000/docs`

Health check endpoint:
`http://localhost:8000/health`

### 4. Connect Frontend

In the root of the Next.js project, add to `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Restart the Next.js dev server. The frontend will now automatically post uploads directly to this FastAPI service!
