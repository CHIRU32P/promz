"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Wand2, Check, ArrowRight, Film, Sliders, Copy } from "lucide-react";

export function OutputModeShowcase() {
  const [selectedMode, setSelectedMode] = useState<"script" | "prompt">("script");
  const [copied, setCopied] = useState(false);

  const handleCopySample = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sampleScriptText = `SCENE 01 [00:00:00.00 - 00:00:04.20] - EXT. RAIN-SLICKED ALLEYWAY - NIGHT
Anamorphic 24mm wide angle tracking push-in with 15-degree Dutch angle roll.
Matte-black autonomous surveillance drone glides inches above wet asphalt.
Cyan holographic neon billboards reflect across deep puddles.

DISPATCH AI (VO)
"Target unit vector confirmed. Perimeter locks engaged at Sector 9."

AUDIO: 140 BPM aggressive industrial synth bass, wet tire spray hiss, distant urban sirens.
ON-SCREEN TEXT: "SECTOR // 09-NORTH" [Confidence 98%]`;

  const samplePromptText = `/imagine prompt: Cinematic 2.39:1 anamorphic film footage of a high-speed cyberpunk chase through rain-drenched Neo-Tokyo alleyways. Low-angle tracking shot following a sleek matte-black pursuit drone with glowing crimson optics carving through dense steam and holographic cyan billboards. Volumetric lighting, wet asphalt reflections, hyper-realistic water spray, Kodak Vision3 500T color grade, sharp motion blur, dynamic 60fps pacing, authentic anamorphic horizontal lens flare, Arri Alexa Mini LF. --no low resolution, 3d render look, cartoon, plastic textures, daytime, dry streets --ar 21:9 --fps 60`;

  return (
    <section id="output-modes" className="py-24 relative border-t border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-stone-200/80 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#ff4d00] font-bold">
              DUAL MODAL ARCHITECTURE
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-stone-900 uppercase mt-2">
              Two Divergent Output Modes
            </h2>
          </div>
          <p className="text-sm md:text-base text-stone-600 max-w-md">
            Whether preparing a live-action production crew or synthesizing generative AI models, each mode produces distinct, tailored output.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-stone-200 shadow-sm">
            <button
              onClick={() => setSelectedMode("script")}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                selectedMode === "script"
                  ? "bg-gradient-to-r from-[#ff4d00] to-[#ff6600] text-white shadow-md shadow-[#ff4d00]/25"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Mode A — Video to Script</span>
            </button>

            <button
              onClick={() => setSelectedMode("prompt")}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                selectedMode === "prompt"
                  ? "bg-gradient-to-r from-[#ff4d00] to-[#ff6600] text-white shadow-md shadow-[#ff4d00]/25"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <Wand2 className="w-4 h-4" />
              <span>Mode B — Recreation Prompt</span>
            </button>
          </div>
        </div>

        {/* Interactive Mode Content Display */}
        <AnimatePresence mode="wait">
          {selectedMode === "script" ? (
            <motion.div
              key="mode-a"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Left Column: Purpose & Field Taxonomy */}
              <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-3xl bg-white/75 backdrop-blur-xl border border-white/90 shadow-[0_10px_30px_-10px_rgba(40,30,20,0.06)]">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-[#ff4d00] font-bold uppercase mb-4">
                    <Film className="w-3.5 h-3.5" />
                    Screenwriting & Crew Direction
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900 tracking-tight mb-4">
                    For Directors, Screenwriters & Editors
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed mb-6 font-normal">
                    Translates the physical dynamics of film into formatted scene heading breakdowns.
                    Ideal for reverse-engineering pacing, blocking, lighting setups, and dialogue delivery from commercial references.
                  </p>

                  <div className="space-y-3 border-t border-stone-200/80 pt-6 text-xs font-mono">
                    <div className="flex items-center justify-between text-stone-700">
                      <span className="text-stone-400">Timestamps:</span>
                      <span className="font-semibold">Sub-frame cut intervals (SMPTE timecode)</span>
                    </div>
                    <div className="flex items-center justify-between text-stone-700">
                      <span className="text-stone-400">Camera Direction:</span>
                      <span className="font-semibold">Lens focal lengths, crane/tracking arcs</span>
                    </div>
                    <div className="flex items-center justify-between text-stone-700">
                      <span className="text-stone-400">Audio Notes:</span>
                      <span className="font-semibold">Foley stems, vocal tone, music BPM</span>
                    </div>
                    <div className="flex items-center justify-between text-stone-700">
                      <span className="text-stone-400">Visible Text:</span>
                      <span className="font-semibold">OCR transcription of graphics & signage</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-stone-200/80">
                  <span className="text-[11px] font-mono text-stone-500">
                    Export formats: Final Draft (.fdx), Fountain, Markdown (.md), JSON
                  </span>
                </div>
              </div>

              {/* Right Column: Code/Card Preview */}
              <div className="lg:col-span-7 flex flex-col p-6 rounded-3xl bg-white/75 backdrop-blur-xl border border-white/90 shadow-[0_10px_30px_-10px_rgba(40,30,20,0.06)]">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-200/80 text-xs font-mono">
                  <span className="text-stone-600 font-bold">PRODUCTION SCRIPT SPECIMEN</span>
                  <button
                    onClick={() => handleCopySample(sampleScriptText)}
                    className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900 cursor-pointer font-semibold"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied!" : "Copy Specimen"}</span>
                  </button>
                </div>

                <pre className="text-xs font-mono text-stone-800 bg-[#faf8f5] p-5 rounded-2xl border border-stone-200/80 overflow-x-auto whitespace-pre-wrap leading-relaxed flex-1 shadow-inner">
                  {sampleScriptText}
                </pre>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="mode-b"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Left Column: Purpose & Field Taxonomy */}
              <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-3xl bg-white/75 backdrop-blur-xl border border-white/90 shadow-[0_10px_30px_-10px_rgba(40,30,20,0.06)]">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-[#ff4d00] font-bold uppercase mb-4">
                    <Sliders className="w-3.5 h-3.5" />
                    Generative AI Diffusion Engine
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900 tracking-tight mb-4">
                    For AI Creators & Prompt Engineers
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed mb-6 font-normal">
                    Translates physical camera properties, film stock textures, and lighting characteristics
                    into syntax optimized for modern video diffusion models.
                  </p>

                  <div className="space-y-3 border-t border-stone-200/80 pt-6 text-xs font-mono">
                    <div className="flex items-center justify-between text-stone-700">
                      <span className="text-stone-400">Overall Style:</span>
                      <span className="font-semibold">Film stock, color grading, lens flare</span>
                    </div>
                    <div className="flex items-center justify-between text-stone-700">
                      <span className="text-stone-400">Motion Velocity:</span>
                      <span className="font-semibold">Speed ramping, optical stabilization</span>
                    </div>
                    <div className="flex items-center justify-between text-stone-700">
                      <span className="text-stone-400">Negative Weights:</span>
                      <span className="font-semibold">Anti-morphing, anti-jank constraints</span>
                    </div>
                    <div className="flex items-center justify-between text-stone-700">
                      <span className="text-stone-400">Target Frameworks:</span>
                      <span className="font-semibold">Runway Gen-3, OpenAI Sora, Kling 1.5</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-stone-200/80">
                  <span className="text-[11px] font-mono text-stone-500">
                    Compatibility: Direct Runway API, ComfyUI nodes, WebUI payloads
                  </span>
                </div>
              </div>

              {/* Right Column: Code/Card Preview */}
              <div className="lg:col-span-7 flex flex-col p-6 rounded-3xl bg-white/75 backdrop-blur-xl border border-white/90 shadow-[0_10px_30px_-10px_rgba(40,30,20,0.06)]">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-200/80 text-xs font-mono">
                  <span className="text-[#ff4d00] font-bold">DIFFUSION PROMPT SPECIMEN (RUNWAY GEN-3)</span>
                  <button
                    onClick={() => handleCopySample(samplePromptText)}
                    className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900 cursor-pointer font-semibold"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied!" : "Copy Specimen"}</span>
                  </button>
                </div>

                <pre className="text-xs font-mono text-stone-800 bg-[#faf8f5] p-5 rounded-2xl border border-stone-200/80 overflow-x-auto whitespace-pre-wrap leading-relaxed flex-1 shadow-inner">
                  {samplePromptText}
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
