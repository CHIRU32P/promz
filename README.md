# DECONSTRUCT // AI Video Reverse-Engineering Platform

> **Reverse-engineer any video into frame-accurate production scripts, 6-DoF camera trajectories, and generative recreation prompts for Runway Gen-3, OpenAI Sora, Kling 1.5, and Luma Dream Machine.**

![Platform Interface](https://img.shields.io/badge/Interface-Dark%20Cinematic-ff5500?style=for-the-badge)
![FastAPI Ready](https://img.shields.io/badge/Backend-FastAPI%20Ready-009688?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Frontend-Next.js%2016%20App%20Router-black?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge)

---

## ⚡ Key Highlights

- **Dual Output Architecture**:
  - **Mode A (Video to Script)**: Scene-by-scene script breakdown with SMPTE timecodes, camera framing and lens directives, lighting/atmosphere, Whisper v3 dialogue transcription, audio/foley stems, on-screen OCR text, and cut transitions.
  - **Mode B (Video to Recreation Prompt)**: Parametric latent diffusion prompts formatted specifically for **Runway Gen-3 Alpha**, **OpenAI Sora**, and **Kling 1.5**, with camera motion tokens, negative weights, aspect ratios, and temporal consistency constraints.
- **Interactive Deconstruction Studio**:
  - Sub-second video timeline scrubber with live scene boundary markers.
  - 3 pre-indexed cinematic demonstration presets (*Neo-Shinjuku High-Speed Pursuit*, *The Midnight Informant*, *Abyssal Bioluminescence*).
  - Drag-and-drop video upload supporting `.mp4`, `.mov`, `.webm` with real-time multi-stage pipeline simulation.
  - Interactive Keyframe Inspector & Optical Flow visualizer.
  - Parametric Prompt Playground with real-time motion strength and aspect ratio adjustments.
- **Export Pipeline**:
  - 1-click prompt clipboard payload.
  - Export production scripts to formatted Markdown (`.md`) adhering to screenplay conventions.
  - Export machine-readable JSON schema specs.
- **FastAPI-Ready Backend Bridge**:
  - Pre-built Python FastAPI backend blueprint in `backend/` with Pydantic schemas mirroring TypeScript types.

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 16 (App Router, Turbopack), React 19, TypeScript
- **Styling**: Tailwind CSS v4, Custom CSS Variables, Glassmorphism
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Future Backend Integration**: Python, FastAPI, FFmpeg, Whisper, Vision-Language LLM

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ (tested on Node v24)
- npm 10+

### 2. Frontend Installation & Execution

```bash
# Clone or navigate to the project directory
cd promz

# Install dependencies (already installed if cloned with node_modules)
npm install

# Start development server on port 3000
npm run dev

# Or build for production
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🐍 Connecting Python FastAPI Backend (Optional)

A complete FastAPI starter service is provided in the `backend/` directory.

### 1. Set Up Backend

```bash
cd backend
python -m venv venv

# Windows:
venv\Scripts\activate
# macOS/Linux:
# source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 2. Connect Frontend to FastAPI

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Restart the Next.js dev server. The frontend studio will automatically detect the backend and route file uploads to `POST http://localhost:8000/api/v1/analyze`.

---

## 📂 Project Structure

```
promz/
├── backend/                  # Python FastAPI backend service blueprint
│   ├── main.py               # API routes (POST /api/v1/analyze, GET /health)
│   ├── models.py             # Pydantic data schemas matching TypeScript types
│   ├── video_processor.py    # FFmpeg frame extraction & cut detector blueprint
│   └── requirements.txt      # Python dependencies
├── src/
│   ├── app/
│   │   ├── globals.css       # Design system, tech grid, fire gradients, custom scrollbar
│   │   ├── layout.tsx        # Root layout, Geist typography, dark theme
│   │   └── page.tsx          # Master landing page assembling all components
│   ├── components/
│   │   ├── Navbar.tsx        # Sticky glassmorphic nav with expanding underline links
│   │   ├── Hero.tsx          # Editorial display headline & technical specs strip
│   │   ├── InteractiveStudio.tsx # Player, timeline scrubber, script & prompt panels
│   │   ├── WorkflowSection.tsx   # 4-step pipeline (Upload, Analyze, Generate, Export)
│   │   ├── FeaturesSection.tsx   # 6 core reverse-engineering capabilities
│   │   ├── OutputModeShowcase.tsx# Mode A vs Mode B side-by-side comparison
│   │   ├── UseCasesSection.tsx   # Industry applications (Filmmakers, Editors, Agencies)
│   │   ├── FaqSection.tsx        # Technical FAQ accordion
│   │   ├── FinalCta.tsx          # Editorial closing CTA
│   │   └── Footer.tsx            # Architectural footer with status telemetry
│   ├── data/
│   │   └── mockAnalysis.ts   # 3 high-fidelity cinematic video demonstration presets
│   ├── services/
│   │   └── api.ts            # API abstraction layer with simulation engine & exports
│   └── types/
│       └── analysis.ts       # TypeScript interfaces for scenes, scripts, and prompts
├── package.json
└── README.md
```

---

## 📜 License & Acknowledgements

Created with Google Antigravity. Design system inspired by high-end typography and digital design portfolios. All rights reserved.
