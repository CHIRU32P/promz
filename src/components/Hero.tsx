"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Play, Cpu, Eye, Film, Layers, ShieldCheck } from "lucide-react";

interface HeroProps {
  onStartAnalysis: () => void;
  onExploreWorkflow: () => void;
}

export function Hero({ onStartAnalysis, onExploreWorkflow }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Background radial gradients & subtle tech grid */}
      <div className="absolute inset-0 tech-grid pointer-events-none opacity-40" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-[#ff3b30]/15 via-[#ff6b00]/10 to-transparent blur-[140px] pointer-events-none rounded-full" />
      
      {/* Ambient top light streak */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#ff5500]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Status Descriptor Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-white/10 mb-8 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#ff5500] animate-ping" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-300">
              MULTIMODAL DECONSTRUCTION ENGINE // v2.4
            </span>
            <span className="text-neutral-600 font-mono text-[11px]">|</span>
            <span className="text-[11px] font-mono text-[#ff7700] flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3 h-3" /> FASTAPI READY
            </span>
          </motion.div>

          {/* Master Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase leading-[0.95]"
          >
            Reverse-Engineer <br />
            <span className="text-gradient-fire">Any Video.</span>
          </motion.h1>

          {/* Supporting Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-7 text-lg sm:text-xl text-neutral-300 max-w-2xl leading-relaxed font-normal"
          >
            Turn video references into detailed, timestamped scripts and AI-ready recreation prompts.
            Understand the scenes, movement, dialogue, and visual details behind every frame.
          </motion.p>

          {/* CTA Button Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={onStartAnalysis}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ff3b30] via-[#ff5500] to-[#ff7700] hover:brightness-110 shadow-xl shadow-[#ff5500]/25 transition-all duration-200 active:scale-95 group cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Analyze Your Video</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreWorkflow}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-sm font-semibold tracking-wide text-neutral-300 bg-neutral-900/80 hover:bg-neutral-800 border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 text-neutral-400" />
              <span>Explore the Workflow</span>
            </button>
          </motion.div>

          {/* Technical Specs Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="mt-16 pt-10 border-t border-white/[0.08] w-full grid grid-cols-2 md:grid-cols-4 gap-6 text-left"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-neutral-900 border border-white/10 text-[#ff5500]">
                <Film className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-neutral-500">Segmentation</p>
                <p className="text-sm font-medium text-white">Sub-Frame Cut Detection</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-neutral-900 border border-white/10 text-[#ff5500]">
                <Eye className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-neutral-500">Camera Dynamics</p>
                <p className="text-sm font-medium text-white">6-DoF Trajectory Solver</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-neutral-900 border border-white/10 text-[#ff5500]">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-neutral-500">Audio Separation</p>
                <p className="text-sm font-medium text-white">Dialogue & Foley Stems</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-neutral-900 border border-white/10 text-[#ff5500]">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-neutral-500">Generative Output</p>
                <p className="text-sm font-medium text-white">Runway, Sora & Kling</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
