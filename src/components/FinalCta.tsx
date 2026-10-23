"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Film, Terminal } from "lucide-react";

interface FinalCtaProps {
  onAnalyzeFirstVideo: () => void;
}

export function FinalCta({ onAnalyzeFirstVideo }: FinalCtaProps) {
  return (
    <section className="py-28 relative border-t border-stone-200/80 overflow-hidden">
      {/* Background glow & accents in warm peach/cream */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[#fed7aa]/35 via-[#fecdd3]/20 to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 tech-grid opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-stone-200 text-xs font-mono text-[#ff4d00] uppercase mb-8 shadow-sm font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            READY TO DECONSTRUCT
          </div>

          {/* Master Display Headline */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-stone-900 uppercase leading-[0.98]">
            Understand Every Scene. <br />
            <span className="text-gradient-fire">Recreate Every Detail.</span>
          </h2>

          {/* Supporting Copy */}
          <p className="mt-8 text-lg sm:text-xl text-stone-600 max-w-2xl leading-relaxed font-normal">
            Turn video references into structured creative instructions.
            Deconstruct cinematography into camera trajectories, dialogue stems, and diffusion prompts with PROMZ today.
          </p>

          {/* Primary CTA */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={onAnalyzeFirstVideo}
              className="inline-flex items-center justify-center gap-3 px-9 py-4 rounded-2xl text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ff4d00] to-[#ff6600] hover:from-[#ff5500] hover:to-[#ff7700] shadow-xl shadow-[#ff4d00]/25 transition-all duration-200 active:scale-95 group cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Analyze Your First Video</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl text-sm font-semibold tracking-wide text-stone-700 bg-white/80 hover:bg-white border border-stone-200/90 hover:border-stone-300 transition-all duration-200 active:scale-95 shadow-sm backdrop-blur-md"
            >
              <Film className="w-3.5 h-3.5 text-stone-500" />
              <span>Review Pipeline Specs</span>
            </a>
          </div>

          {/* Micro Telemetry note */}
          <div className="mt-14 inline-flex items-center gap-4 text-xs font-mono text-stone-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              FastAPI Integration Online
            </span>
            <span>•</span>
            <span>Google Gemini 3.5 Flash Active</span>
            <span>•</span>
            <span>Firebase Auth Ready</span>
          </div>

        </div>
      </div>
    </section>
  );
}
