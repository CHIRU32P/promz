"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  UploadCloud,
  FileVideo,
  Copy,
  Check,
  Download,
  Sparkles,
  Sliders,
  Volume2,
  Camera,
  Layers,
  Clock,
  Type,
  Maximize2,
  ChevronRight,
  Eye,
  Terminal,
  Activity,
  FileText,
  Wand2,
  Share2,
  Info,
  Grid3X3,
  Film,
  Zap,
  RotateCcw,
  AlertTriangle,
  Server,
  XCircle
} from "lucide-react";
import { DEMO_PRESETS } from "@/data/mockAnalysis";
import { VideoAnalysisResult, SceneScriptItem } from "@/types/analysis";
import {
  reverseEngineerVideo,
  checkBackendHealth,
  ProcessingStage,
  exportScriptAsMarkdown,
  exportAnalysisAsJson
} from "@/services/api";

export function InteractiveStudio() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>("preset-cyberpunk-chase");
  const [currentAnalysis, setCurrentAnalysis] = useState<VideoAnalysisResult>(DEMO_PRESETS[0].data);
  const [activeTab, setActiveTab] = useState<"script" | "prompt">("script");
  const [activePromptEngine, setActivePromptEngine] = useState<"runway" | "sora" | "kling" | "universal">("runway");
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(2.1);
  const [copiedState, setCopiedState] = useState<string | null>(null);
  
  // View mode for left column: 'canvas' or 'keyframes'
  const [playerViewMode, setPlayerViewMode] = useState<"canvas" | "keyframes">("canvas");

  // Dynamic Prompt Tuning Playground State
  const [motionIntensity, setMotionIntensity] = useState<number>(7);
  const [customAspect, setCustomAspect] = useState<string>("default");
  const [selectedFilmGrade, setSelectedFilmGrade] = useState<string>("Kodak Vision3 500T");
  const [cameraMotionModifier, setCameraMotionModifier] = useState<string>("dynamic");

  // Processing & Backend state
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [processingStage, setProcessingStage] = useState<ProcessingStage | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadedVideoBlobUrl, setUploadedVideoBlobUrl] = useState<string | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [backendStatus, setBackendStatus] = useState<{ healthy: boolean; default_model?: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playbackTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Check backend health on mount
  useEffect(() => {
    checkBackendHealth().then((status) => {
      setBackendStatus({
        healthy: status.healthy,
        default_model: status.default_model
      });
    });
  }, []);

  // Synchronize HTML5 video element with play/pause state
  useEffect(() => {
    if (uploadedVideoBlobUrl && videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, uploadedVideoBlobUrl]);

  // Fallback timer simulation when no real HTML5 video blob is loaded
  useEffect(() => {
    if (isPlaying && !uploadedVideoBlobUrl) {
      playbackTimerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const max = currentAnalysis.durationSeconds;
          const next = prev + 0.1;
          if (next >= max) {
            setIsPlaying(false);
            return 0;
          }
          return parseFloat(next.toFixed(2));
        });
      }, 100);
    } else {
      if (playbackTimerRef.current) clearInterval(playbackTimerRef.current);
    }
    return () => {
      if (playbackTimerRef.current) clearInterval(playbackTimerRef.current);
    };
  }, [isPlaying, uploadedVideoBlobUrl, currentAnalysis.durationSeconds]);

  // Keep activeSceneIndex in sync with currentTime
  useEffect(() => {
    const scenes = currentAnalysis.modeAScript.scenes;
    let accumulated = 0;
    for (let i = 0; i < scenes.length; i++) {
      accumulated += scenes[i].durationSeconds;
      if (currentTime <= accumulated || i === scenes.length - 1) {
        setActiveSceneIndex(i);
        break;
      }
    }
  }, [currentTime, currentAnalysis]);

  const handleSelectPreset = (presetId: string) => {
    const found = DEMO_PRESETS.find((p) => p.id === presetId);
    if (found) {
      setSelectedPresetId(presetId);
      setCurrentAnalysis(found.data);
      setCurrentTime(1.5);
      setIsPlaying(false);
      setUploadedFileName(null);
      setAnalysisError(null);
      if (uploadedVideoBlobUrl) {
        URL.revokeObjectURL(uploadedVideoBlobUrl);
        setUploadedVideoBlobUrl(null);
      }
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    setUploadedFileName(file.name);
    setIsAnalyzing(true);
    setIsPlaying(false);
    setAnalysisError(null);

    // Create a local blob URL so the user can see & play their uploaded video
    if (uploadedVideoBlobUrl) {
      URL.revokeObjectURL(uploadedVideoBlobUrl);
    }
    const blobUrl = URL.createObjectURL(file);
    setUploadedVideoBlobUrl(blobUrl);

    try {
      const result = await reverseEngineerVideo(file, { mode: "all" }, (stage) => {
        setProcessingStage(stage);
      });
      setCurrentAnalysis(result);
      setCurrentTime(0);
      setActiveSceneIndex(0);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
    } catch (err) {
      console.error("Upload/Analysis error:", err);
      const msg = err instanceof Error ? err.message : String(err);
      setAnalysisError(msg);
    } finally {
      setIsAnalyzing(false);
      setProcessingStage(null);
    }
  };

  const handleScrub = (timeSec: number) => {
    setCurrentTime(timeSec);
    if (videoRef.current) {
      videoRef.current.currentTime = timeSec;
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedState(label);
    setTimeout(() => setCopiedState(null), 2200);
  };

  const handleDownloadMarkdown = () => {
    const md = exportScriptAsMarkdown(currentAnalysis);
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentAnalysis.title.toLowerCase().replace(/\s+/g, "-")}-script.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    const json = exportAnalysisAsJson(currentAnalysis);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentAnalysis.title.toLowerCase().replace(/\s+/g, "-")}-deconstruction.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Get active scene
  const activeScene: SceneScriptItem =
    currentAnalysis.modeAScript.scenes[activeSceneIndex] || currentAnalysis.modeAScript.scenes[0];

  // Base prompt data
  const basePromptData =
    activePromptEngine === "runway"
      ? currentAnalysis.modeBPrompt.runwayGen3
      : activePromptEngine === "sora"
      ? currentAnalysis.modeBPrompt.openaiSora
      : activePromptEngine === "kling"
      ? currentAnalysis.modeBPrompt.klingAI
      : currentAnalysis.modeBPrompt.universalDiffusion;

  // Synthesize customized prompt based on interactive playground controls
  const synthesizedPrompt = React.useMemo(() => {
    let text = basePromptData.masterPrompt;
    
    // Append or replace film grade
    if (selectedFilmGrade && !text.includes(selectedFilmGrade)) {
      text += `, shot on ${selectedFilmGrade} 35mm stock`;
    }

    // Append motion intensity directive
    if (motionIntensity > 7) {
      text += `, intense dynamic kinetic velocity, motion blur scale ${motionIntensity}/10`;
    } else if (motionIntensity < 4) {
      text += `, gentle subtle pacing, smooth locked motion scale ${motionIntensity}/10`;
    }

    // Camera modifier
    if (cameraMotionModifier === "fpv") {
      text += `, immersive acrobatic FPV drone roll and tilt`;
    } else if (cameraMotionModifier === "steadicam") {
      text += `, buttery smooth gimbal steadicam tracking`;
    } else if (cameraMotionModifier === "locked") {
      text += `, locked tripod composition with zero camera drift`;
    }

    // Aspect ratio suffix
    if (customAspect !== "default") {
      const arFlag = customAspect === "21:9" ? "--ar 21:9" : customAspect === "16:9" ? "--ar 16:9" : customAspect === "9:16" ? "--ar 9:16" : "--ar 1:1";
      text += ` ${arFlag}`;
    }

    return text;
  }, [basePromptData.masterPrompt, selectedFilmGrade, motionIntensity, cameraMotionModifier, customAspect]);

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    const ms = Math.floor((sec % 1) * 100);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}.${ms.toString().padStart(2, "0")}`;
  };

  return (
    <section id="interactive-studio" className="py-20 md:py-28 relative scroll-mt-20">
      {/* Background accents */}
      <div className="absolute inset-0 tech-dots pointer-events-none opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-white/[0.08] gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white/[0.05] border border-white/10 text-[11px] font-mono text-[#ff7700] uppercase tracking-wider mb-3">
              <Activity className="w-3 h-3 text-[#ff5500]" />
              INTERACTIVE DEMONSTRATION WORKFLOW
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
              The Deconstruction Studio
            </h2>
            <p className="mt-2 text-sm md:text-base text-neutral-400 max-w-xl">
              Inspect live scene segmentation, 6-DoF camera kinematics, Whisper audio stems, and prompt translation engines.
            </p>
          </div>

          {/* Quick Actions / Backend Status */}
          <div className="flex flex-wrap items-center gap-2">
            {backendStatus ? (
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono ${
                  backendStatus.healthy
                    ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-400"
                    : "bg-amber-950/40 border-amber-500/30 text-amber-400"
                }`}
              >
                <Server className="w-3.5 h-3.5" />
                <span>
                  {backendStatus.healthy
                    ? `Gemini API Active (${backendStatus.default_model || "gemini-3.5-flash"})`
                    : "FastAPI Backend Offline"}
                </span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-xs font-mono text-neutral-400">
                <Info className="w-3.5 h-3.5 text-[#ff7700]" />
                <span>Checking Engine...</span>
              </span>
            )}

            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ff5500] hover:bg-[#ff6600] text-black font-bold text-xs transition-colors cursor-pointer shadow-lg shadow-[#ff5500]/20"
            >
              <UploadCloud className="w-4 h-4 text-black" />
              <span>Upload Video to Analyze</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/mp4,video/quicktime,video/webm"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
            />
          </div>
        </div>

        {/* Error Alert Banner */}
        <AnimatePresence>
          {analysisError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-6 p-4 rounded-xl bg-red-950/70 border border-red-500/40 shadow-xl flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                <div>
                  <h5 className="text-xs font-bold text-red-200 font-mono uppercase tracking-wider">
                    Video Analysis Error
                  </h5>
                  <p className="text-xs text-red-300 font-mono mt-0.5">
                    {analysisError}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAnalysisError(null)}
                className="text-xs font-mono text-red-400 hover:text-white px-2.5 py-1 rounded bg-red-900/40 hover:bg-red-900/80 transition-colors cursor-pointer shrink-0"
              >
                Dismiss
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Upload Card if file is loaded */}
        {uploadedFileName && (
          <div className="mb-6 p-4 rounded-xl bg-neutral-900/90 border border-[#ff5500]/50 ring-1 ring-[#ff5500]/30 shadow-lg flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#ff5500]/10 border border-[#ff5500]/30 flex items-center justify-center text-[#ff5500]">
                <FileVideo className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#ff5500]/20 text-[#ff7700] font-bold">
                    USER FOOTAGE (REAL GEMINI ANALYSIS)
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    {currentAnalysis.durationSeconds}s • {currentAnalysis.resolution}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mt-0.5">{uploadedFileName}</h4>
              </div>
            </div>
            <button
              onClick={() => handleSelectPreset(DEMO_PRESETS[0].id)}
              className="text-xs font-mono text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg bg-neutral-800 border border-white/10 transition-colors cursor-pointer"
            >
              Reset to Demo Presets
            </button>
          </div>
        )}

        {/* Preset Selector Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {DEMO_PRESETS.map((preset) => {
            const isSelected = selectedPresetId === preset.id && !uploadedFileName;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset.id)}
                className={`text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-neutral-900/90 border-[#ff5500]/60 ring-1 ring-[#ff5500]/30 shadow-lg shadow-[#ff5500]/10"
                    : "bg-neutral-950/60 border-white/[0.08] hover:border-white/20 hover:bg-neutral-900/40"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-1">
                  <span className="text-neutral-500">[DEMO] {preset.category}</span>
                  <span className="text-[#ff7700] font-semibold">{preset.duration}</span>
                </div>
                <h4 className="text-base font-bold text-white tracking-tight">{preset.title}</h4>
                <p className="text-xs text-neutral-400 mt-1 line-clamp-1">{preset.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-neutral-300">
                    {preset.badge}
                  </span>
                  {isSelected && (
                    <span className="text-[11px] font-mono text-[#ff5500] font-semibold flex items-center gap-1">
                      ACTIVE PREVIEW ●
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Live Processing Simulation Overlay */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="mb-8 p-6 rounded-2xl bg-neutral-950 border border-[#ff5500]/40 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-900">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#ff3b30] to-[#ff7700]"
                  style={{ width: `${processingStage?.progressPercent || 15}%` }}
                  transition={{ ease: "easeInOut" }}
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#ff5500]/10 border border-[#ff5500]/30 flex items-center justify-center text-[#ff5500] animate-spin">
                    <Sliders className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[#ff7700] uppercase tracking-wider">
                        STAGE {processingStage?.stage || 1} OF {processingStage?.totalStages || 5}
                      </span>
                      <span className="text-xs font-mono text-neutral-500">|</span>
                      <span className="text-xs font-mono text-neutral-400">
                        {processingStage?.progressPercent || 10}% COMPLETED
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white mt-0.5">
                      {processingStage?.title || "Initializing Multimodal Analyzer..."}
                    </h4>
                    <p className="text-xs text-neutral-400 mt-1 font-mono">
                      {processingStage?.detail || "Allocating GPU tensor workers and keyframe buffers..."}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-neutral-500 px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10">
                    File: {uploadedFileName}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Master Studio Workspace (2-Column Studio Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Video Player & Timeline & Sensor HUD (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* View Switcher Bar (Player Canvas vs Keyframe Inspector) */}
            <div className="flex items-center justify-between text-xs font-mono bg-neutral-950 p-1.5 rounded-xl border border-white/[0.08]">
              <span className="text-neutral-400 px-2 flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5 text-[#ff5500]" />
                FEED MODE:
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPlayerViewMode("canvas")}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    playerViewMode === "canvas"
                      ? "bg-white text-black font-bold shadow"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Live Player
                </button>
                <button
                  onClick={() => setPlayerViewMode("keyframes")}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    playerViewMode === "keyframes"
                      ? "bg-white text-black font-bold shadow"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Keyframe Strip ({currentAnalysis.totalScenes})
                </button>
              </div>
            </div>

            {/* Video Canvas / Keyframe Inspector Container */}
            <div className="relative rounded-2xl bg-neutral-950 border border-white/10 overflow-hidden shadow-2xl group">
              
              {playerViewMode === "canvas" ? (
                /* Interactive Video Canvas View */
                <div className="relative aspect-[16/9] w-full bg-[#0a0b0e] flex items-center justify-center overflow-hidden">
                  
                  {/* Real Uploaded Video Player or Preset Backdrop */}
                  {uploadedVideoBlobUrl ? (
                    <video
                      ref={videoRef}
                      src={uploadedVideoBlobUrl}
                      className="absolute inset-0 w-full h-full object-contain bg-black z-0"
                      playsInline
                      onTimeUpdate={(e) => {
                        setCurrentTime(parseFloat(e.currentTarget.currentTime.toFixed(2)));
                      }}
                      onEnded={() => setIsPlaying(false)}
                    />
                  ) : (
                    /* Dynamic gradient backdrop according to preset */
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${
                        selectedPresetId === "preset-cyberpunk-chase"
                          ? "from-slate-950 via-cyan-950 to-neutral-950"
                          : selectedPresetId === "preset-noir-dialogue"
                          ? "from-stone-950 via-neutral-900 to-amber-950"
                          : "from-indigo-950 via-purple-950 to-neutral-950"
                      } opacity-90`}
                    />
                  )}

                  {/* Frame HUD Content & Sensor Overlays */}
                  <div className={`relative z-10 w-full h-full flex flex-col items-center justify-center p-6 text-center select-none pointer-events-none ${
                    uploadedVideoBlobUrl && isPlaying ? "opacity-0 transition-opacity duration-300" : "opacity-100"
                  }`}>
                    {/* Grid Crosshair Overlays */}
                    <div className="absolute inset-4 border border-dashed border-white/10 pointer-events-none" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-t border-b border-[#ff5500]/60 pointer-events-none" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-l border-r border-[#ff5500]/60 pointer-events-none" />

                    {/* Scene Tag Pill */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-mono text-white mb-3">
                      <span className="w-2 h-2 rounded-full bg-[#ff5500] animate-pulse" />
                      SCENE {activeScene.sceneNumber} OF {currentAnalysis.totalScenes}
                    </span>

                    <h3 className="text-xl font-black text-white uppercase tracking-tight max-w-sm drop-shadow-md">
                      {activeScene.cameraFraming}
                    </h3>
                    <p className="text-xs text-neutral-300 mt-2 max-w-md line-clamp-2 drop-shadow">
                      {activeScene.visualSummary}
                    </p>

                    {/* On-screen text tag overlay if present */}
                    {activeScene.onScreenText && activeScene.onScreenText.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5 justify-center">
                        {activeScene.onScreenText.map((txt, i) => (
                          <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-200">
                            OCR: {txt}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Top Overlay HUD bar */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-neutral-300 z-20 pointer-events-none">
                    <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/10 text-white font-semibold">
                      {currentAnalysis.resolution} • {currentAnalysis.fps} FPS
                    </span>
                    <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/10 text-neutral-300">
                      {currentAnalysis.aspectRatio}
                    </span>
                  </div>

                  {/* Floating Play Overlay Button */}
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`absolute inset-0 z-20 flex items-center justify-center transition-colors cursor-pointer group ${
                      uploadedVideoBlobUrl && isPlaying ? "bg-transparent hover:bg-black/20" : "bg-black/20 hover:bg-black/40"
                    }`}
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    <div className={`w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-xl ${
                      uploadedVideoBlobUrl && isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                    }`}>
                      {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
                    </div>
                  </button>
                </div>
              ) : (
                /* Keyframe Inspector Grid View */
                <div className="aspect-[16/9] w-full bg-[#0a0b0e] p-4 overflow-y-auto">
                  <div className="text-xs font-mono text-neutral-400 pb-2 mb-3 border-b border-white/[0.08] flex items-center justify-between">
                    <span className="text-[#ff7700] uppercase font-bold flex items-center gap-1.5">
                      <Grid3X3 className="w-3.5 h-3.5" />
                      Extracted Scene Keyframe Gallery
                    </span>
                    <span>{currentAnalysis.totalScenes} Cuts Detected</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {currentAnalysis.modeAScript.scenes.map((sc, i) => {
                      const isSel = i === activeSceneIndex;
                      return (
                        <div
                          key={sc.id}
                          onClick={() => {
                            setActiveSceneIndex(i);
                            const startSec = i * (currentAnalysis.durationSeconds / currentAnalysis.totalScenes);
                            handleScrub(startSec);
                          }}
                          className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                            isSel
                              ? "bg-neutral-900 border-[#ff5500] ring-1 ring-[#ff5500]/50"
                              : "bg-black/50 border-white/[0.06] hover:border-white/20"
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-1.5">
                            <span className="font-bold text-white">Cut #{sc.sceneNumber}</span>
                            <span className="text-[#ff7700]">{sc.timecodeStart}</span>
                          </div>
                          <div className="h-14 rounded-lg bg-neutral-950 border border-white/5 flex items-center justify-center p-2 mb-2">
                            <span className="text-[10px] font-mono text-neutral-400 text-center line-clamp-2">
                              {sc.cameraFraming}
                            </span>
                          </div>
                          {/* Color Palette swatch */}
                          <div className="flex items-center gap-1">
                            {currentAnalysis.dominantColorPalette.slice(0, 4).map((c, ci) => (
                              <span key={ci} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />
                            ))}
                            <span className="text-[9px] font-mono text-neutral-500 ml-auto">{sc.durationSeconds}s</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Scrubber & Timeline Bar */}
              <div className="p-4 bg-neutral-950 border-t border-white/10">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-[#ff7700] font-bold">{formatSeconds(currentTime)}</span>
                  <span className="text-neutral-500">/</span>
                  <span className="text-neutral-400">{formatSeconds(currentAnalysis.durationSeconds)}</span>
                </div>

                {/* Interactive Scrubber Track */}
                <div className="relative w-full h-8 flex items-center">
                  <input
                    type="range"
                    min={0}
                    max={currentAnalysis.durationSeconds}
                    step={0.05}
                    value={currentTime}
                    onChange={(e) => handleScrub(parseFloat(e.target.value))}
                    className="w-full h-2.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#ff5500]"
                  />
                </div>

                {/* Scene Cut Boundary Markers */}
                <div className="grid grid-cols-4 gap-1.5 mt-2">
                  {currentAnalysis.modeAScript.scenes.map((sc, idx) => {
                    const isCurrent = idx === activeSceneIndex;
                    return (
                      <button
                        key={sc.id}
                        onClick={() => {
                          const startSec = idx * (currentAnalysis.durationSeconds / currentAnalysis.totalScenes);
                          handleScrub(startSec);
                        }}
                        className={`text-left p-1.5 rounded text-[10px] font-mono border transition-all cursor-pointer ${
                          isCurrent
                            ? "bg-[#ff5500]/20 border-[#ff5500] text-white font-bold"
                            : "bg-neutral-900 border-white/10 text-neutral-400 hover:text-white"
                        }`}
                      >
                        <div className="truncate">Scene {sc.sceneNumber}</div>
                        <div className="text-[9px] text-neutral-500">{sc.durationSeconds}s</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Processing Engine Telemetry HUD */}
            <div className="p-4 rounded-xl bg-neutral-950/70 border border-white/[0.08] text-xs font-mono">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/[0.06]">
                <span className="text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#ff5500]" />
                  Engine Telemetry
                </span>
                <span className="text-[#ff7700] font-bold">
                  {Math.round(currentAnalysis.confidenceScore * 100)}% Confidence
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-neutral-400">
                <div>
                  <span className="text-neutral-500 block text-[10px]">FRAMES DECODED</span>
                  <span className="text-white font-bold text-sm">
                    {currentAnalysis.processingMetrics.framesAnalyzed}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px]">CUTS SEGMENTED</span>
                  <span className="text-white font-bold text-sm">
                    {currentAnalysis.processingMetrics.cutsDetected}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px]">SPEECH SEGMENTS</span>
                  <span className="text-white font-bold text-sm">
                    {currentAnalysis.processingMetrics.speechSegmentsIdentified}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px]">ANALYSIS LATENCY</span>
                  <span className="text-white font-bold text-sm">
                    {currentAnalysis.processingMetrics.analysisTimeSeconds}s
                  </span>
                </div>
              </div>
            </div>

            {/* Export Toolbar */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleDownloadMarkdown}
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-xs font-medium text-white transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-neutral-400" />
                <span>Export Script (.MD)</span>
              </button>
              <button
                onClick={handleDownloadJson}
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-xs font-medium text-white transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-neutral-400" />
                <span>Export JSON Spec</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Output Modes (Mode A: Script vs Mode B: Recreation Prompt) (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col rounded-2xl bg-neutral-950 border border-white/10 shadow-2xl overflow-hidden">
            
            {/* Top Mode Toggle Tabs */}
            <div className="p-3 bg-neutral-900/60 border-b border-white/10 flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-neutral-950 border border-white/10">
                <button
                  onClick={() => setActiveTab("script")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === "script"
                      ? "bg-gradient-to-r from-[#ff3b30] to-[#ff7700] text-white shadow-md shadow-[#ff5500]/20"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Mode A: Video to Script</span>
                </button>

                <button
                  onClick={() => setActiveTab("prompt")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === "prompt"
                      ? "bg-gradient-to-r from-[#ff3b30] to-[#ff7700] text-white shadow-md shadow-[#ff5500]/20"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Mode B: Recreation Prompt</span>
                </button>
              </div>

              {/* Copy Output Button */}
              <button
                onClick={() => {
                  if (activeTab === "script") {
                    handleCopy(exportScriptAsMarkdown(currentAnalysis), "script");
                  } else {
                    handleCopy(synthesizedPrompt, "prompt");
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-white/10 text-xs font-mono text-neutral-200 transition-colors cursor-pointer"
              >
                {copiedState ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Copy {activeTab === "script" ? "Script" : "Prompt"}</span>
                  </>
                )}
              </button>
            </div>

            {/* TAB CONTENT A: VIDEO TO SCRIPT */}
            {activeTab === "script" && (
              <div className="p-6 flex flex-col gap-6 max-h-[780px] overflow-y-auto">
                {/* Overall Direction Note */}
                <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/[0.08] flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span className="text-neutral-300 font-semibold uppercase">Overall Direction & Tone</span>
                    <span className="text-[#ff7700]">TC: 00:00:00.00 - {currentAnalysis.durationSeconds}s</span>
                  </div>
                  <p className="text-sm text-neutral-200 leading-relaxed">
                    <strong className="text-white">Mood:</strong> {currentAnalysis.modeAScript.overallMood}
                  </p>
                  <p className="text-xs text-neutral-400 font-mono">
                    <strong className="text-neutral-300">Pacing:</strong> {currentAnalysis.modeAScript.pacing}
                  </p>
                </div>

                {/* Scene-by-Scene Script Breakdown Cards */}
                <div className="flex flex-col gap-4">
                  <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-widest flex items-center justify-between">
                    <span>Scene Breakdown Sequence ({currentAnalysis.modeAScript.scenes.length} Scenes)</span>
                    <span className="text-[#ff5500] text-[11px]">Click any scene to scrub</span>
                  </h4>

                  {currentAnalysis.modeAScript.scenes.map((scene, idx) => {
                    const isSelected = idx === activeSceneIndex;
                    return (
                      <div
                        key={scene.id}
                        onClick={() => {
                          setActiveSceneIndex(idx);
                          setCurrentTime(
                            idx * (currentAnalysis.durationSeconds / currentAnalysis.totalScenes)
                          );
                        }}
                        className={`p-5 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-neutral-900 border-[#ff5500]/70 ring-1 ring-[#ff5500]/40 shadow-xl"
                            : "bg-neutral-950/40 border-white/[0.06] hover:border-white/20 hover:bg-neutral-900/30"
                        }`}
                      >
                        {/* Scene Header Strip */}
                        <div className="flex items-center justify-between text-xs font-mono pb-3 mb-3 border-b border-white/[0.06]">
                          <span className="font-bold text-white flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#ff5500]" />
                            SCENE {scene.sceneNumber}
                          </span>
                          <span className="text-neutral-400">
                            [{scene.timecodeStart} → {scene.timecodeEnd}] ({scene.durationSeconds}s)
                          </span>
                        </div>

                        {/* Visual Summary */}
                        <p className="text-sm text-neutral-200 font-medium leading-relaxed mb-4">
                          {scene.visualSummary}
                        </p>

                        {/* Grid Breakdown: Camera, Lighting, Environment, Objects */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mb-4">
                          <div className="p-3 rounded-lg bg-black/40 border border-white/[0.05]">
                            <span className="text-[10px] font-mono uppercase text-neutral-400 flex items-center gap-1.5 mb-1">
                              <Camera className="w-3 h-3 text-[#ff5500]" />
                              Camera Movement & Framing
                            </span>
                            <p className="text-neutral-200 font-medium">{scene.cameraFraming}</p>
                            <p className="text-neutral-400 text-[11px] mt-0.5">{scene.cameraMovement}</p>
                          </div>

                          <div className="p-3 rounded-lg bg-black/40 border border-white/[0.05]">
                            <span className="text-[10px] font-mono uppercase text-neutral-400 flex items-center gap-1.5 mb-1">
                              <Eye className="w-3 h-3 text-[#ff5500]" />
                              Lighting & Atmosphere
                            </span>
                            <p className="text-neutral-300 text-[11px] leading-relaxed">
                              {scene.lightingAndAtmosphere}
                            </p>
                          </div>
                        </div>

                        {/* Dialogue / Spoken Word Transcription */}
                        {scene.dialogue && scene.dialogue.length > 0 && (
                          <div className="p-3 rounded-lg bg-amber-500/[0.05] border border-amber-500/20 mb-3 text-xs">
                            <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block mb-1">
                              Speech Transcription (Whisper v3)
                            </span>
                            {scene.dialogue.map((d, dIdx) => (
                              <div key={dIdx} className="text-amber-100 italic">
                                <span className="font-mono not-italic font-bold text-amber-300 uppercase mr-2">
                                  {d.speaker}:
                                </span>
                                "{d.text}"
                                <span className="text-[9px] not-italic font-mono text-amber-400/70 ml-2">
                                  ({Math.round(d.confidence * 100)}% conf)
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Sound Design & Foley Stems */}
                        <div className="p-3 rounded-lg bg-black/40 border border-white/[0.05] text-xs">
                          <span className="text-[10px] font-mono uppercase text-neutral-400 flex items-center gap-1.5 mb-1">
                            <Volume2 className="w-3 h-3 text-[#ff7700]" />
                            Audio & Foley Stems
                          </span>
                          <p className="text-neutral-300 text-[11px]">
                            <strong className="text-neutral-400">Score:</strong> {scene.audioNotes.music}
                          </p>
                          <p className="text-neutral-300 text-[11px] mt-1">
                            <strong className="text-neutral-400">SFX:</strong> {scene.audioNotes.foleyAndSfx.join(", ")}
                          </p>
                        </div>

                        {/* Cut Transition Marker */}
                        <div className="mt-3 pt-2 flex items-center justify-between text-[11px] font-mono text-neutral-500 border-t border-white/[0.04]">
                          <span>Transition: {scene.transitionToNext}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB CONTENT B: VIDEO TO RECREATION PROMPT */}
            {activeTab === "prompt" && (
              <div className="p-6 flex flex-col gap-6 max-h-[780px] overflow-y-auto">
                {/* Target Model Sub-selector Tabs */}
                <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3 overflow-x-auto">
                  <span className="text-xs font-mono text-neutral-500 uppercase mr-1">Target Engine:</span>
                  {[
                    { id: "runway", label: "Runway Gen-3" },
                    { id: "sora", label: "OpenAI Sora" },
                    { id: "kling", label: "Kling 1.5" },
                    { id: "universal", label: "Universal Diffusion" },
                  ].map((engine) => (
                    <button
                      key={engine.id}
                      onClick={() => setActivePromptEngine(engine.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                        activePromptEngine === engine.id
                          ? "bg-white text-black font-bold shadow"
                          : "text-neutral-400 hover:text-white bg-neutral-900 border border-white/5"
                      }`}
                    >
                      {engine.label}
                    </button>
                  ))}
                </div>

                {/* Interactive Prompt Tuning Toolbar */}
                <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/[0.08] flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span className="text-white font-bold uppercase flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-[#ff5500]" />
                      Interactive Prompt Tuning Playground
                    </span>
                    <span className="text-xs text-neutral-500">Live Re-synthesis</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                    {/* Motion Intensity Slider */}
                    <div>
                      <div className="flex justify-between mb-1 text-neutral-400 text-[11px]">
                        <span>Motion Scale:</span>
                        <span className="text-[#ff7700] font-bold">{motionIntensity}/10</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={10}
                        value={motionIntensity}
                        onChange={(e) => setMotionIntensity(parseInt(e.target.value))}
                        className="w-full accent-[#ff5500] cursor-pointer"
                      />
                    </div>

                    {/* Film Stock Preset */}
                    <div>
                      <span className="block text-[11px] text-neutral-400 mb-1">Film Stock / Grain:</span>
                      <select
                        value={selectedFilmGrade}
                        onChange={(e) => setSelectedFilmGrade(e.target.value)}
                        className="w-full bg-neutral-950 border border-white/10 rounded-lg p-1.5 text-neutral-200 text-xs focus:outline-none focus:border-[#ff5500]"
                      >
                        <option value="Kodak Vision3 500T">Kodak Vision3 500T</option>
                        <option value="Technicolor 3-Strip">Technicolor 3-Strip</option>
                        <option value="Bleach Bypass Noir">Bleach Bypass Noir</option>
                        <option value="Fujifilm Eterna 250D">Fujifilm Eterna 250D</option>
                        <option value="Arri Alexa Mini LF 8K">Arri Alexa Mini LF 8K</option>
                      </select>
                    </div>

                    {/* Camera Stabilization Mode */}
                    <div>
                      <span className="block text-[11px] text-neutral-400 mb-1">Camera Trajectory:</span>
                      <select
                        value={cameraMotionModifier}
                        onChange={(e) => setCameraMotionModifier(e.target.value)}
                        className="w-full bg-neutral-950 border border-white/10 rounded-lg p-1.5 text-neutral-200 text-xs focus:outline-none focus:border-[#ff5500]"
                      >
                        <option value="dynamic">Dynamic Drift</option>
                        <option value="steadicam">Steadicam Track</option>
                        <option value="fpv">Acrobatic FPV Drone</option>
                        <option value="locked">Locked Studio Tripod</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Master Generated Prompt Box */}
                <div className="p-5 rounded-xl bg-neutral-900/80 border border-[#ff5500]/40 relative group">
                  <div className="flex items-center justify-between text-xs font-mono pb-2 mb-3 border-b border-white/[0.08]">
                    <span className="text-[#ff7700] uppercase font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Synthesized Master Prompt ({basePromptData.targetModel})
                    </span>
                    <button
                      onClick={() => handleCopy(synthesizedPrompt, "master-prompt")}
                      className="text-xs font-mono text-neutral-300 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      {copiedState === "master-prompt" ? (
                        <span className="text-emerald-400">Copied to clipboard</span>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-sm text-white font-mono leading-relaxed select-all">
                    {synthesizedPrompt}
                  </p>
                </div>

                {/* Negative Prompt if available */}
                {basePromptData.negativePrompt && (
                  <div className="p-4 rounded-xl bg-neutral-950 border border-rose-500/20 text-xs font-mono">
                    <span className="text-rose-400 uppercase font-bold block mb-1">
                      Negative Prompt (Avoid Artifacts & Distortion)
                    </span>
                    <p className="text-neutral-300 select-all">{basePromptData.negativePrompt}</p>
                  </div>
                )}

                {/* Style Keywords Pills */}
                <div>
                  <h5 className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-2">
                    Style Tokens & Latent Weights
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {basePromptData.styleKeywords.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono px-3 py-1 rounded-full bg-neutral-900 border border-white/10 text-neutral-200"
                      >
                        +{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Technical Directive Breakdown Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06]">
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                      Camera Trajectory Directive
                    </span>
                    <p className="text-neutral-200 leading-relaxed font-medium">
                      {basePromptData.cameraDirectives}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06]">
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                      Lighting & Volumetric Instruction
                    </span>
                    <p className="text-neutral-200 leading-relaxed font-medium">
                      {basePromptData.lightingDirective}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06]">
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                      Compositional Geometry
                    </span>
                    <p className="text-neutral-200 leading-relaxed font-medium">
                      {basePromptData.compositionDirective}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06]">
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                      Kinetic Velocity & Pacing
                    </span>
                    <p className="text-neutral-200 leading-relaxed font-medium">
                      {basePromptData.motionPacing}
                    </p>
                  </div>
                </div>

                {/* Temporal Consistency Guidance */}
                <div className="p-4 rounded-xl bg-neutral-900/50 border border-white/[0.08] text-xs">
                  <span className="text-xs font-mono text-[#ff7700] uppercase font-bold block mb-2">
                    Temporal Consistency Hints (Prevent Frame Jitter)
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-neutral-300 font-mono text-[11px]">
                    {basePromptData.temporalConsistencyHints.map((hint, i) => (
                      <li key={i}>{hint}</li>
                    ))}
                  </ul>
                </div>

                {/* Specs metadata footer */}
                <div className="flex items-center justify-between text-xs font-mono text-neutral-500 pt-2 border-t border-white/[0.06]">
                  <span>Target Aspect: {basePromptData.aspectRatio}</span>
                  <span>Recommended Framerate: {basePromptData.recommendedFps} FPS</span>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
