"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Play, Cpu, Eye, Film, Layers, ShieldCheck, Sparkle } from "lucide-react";

interface HeroProps {
  onStartAnalysis: () => void;
  onExploreWorkflow: () => void;
}

export function Hero({ onStartAnalysis, onExploreWorkflow }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Background radial gradients & subtle tech grid in warm cream */}
      <div className="absolute inset-0 tech-grid pointer-events-none opacity-60" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-[#fed7aa]/35 via-[#fecdd3]/20 to-transparent blur-[140px] pointer-events-none rounded-full" />
      
      {/* Ambient top light streak in warm orange */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#ff4d00]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Status Descriptor Badge with Official PROMZ Brand Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-stone-200/80 mb-8 shadow-sm"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff4d00] animate-pulse" />
            <span className="text-xs font-mono tracking-widest uppercase text-stone-700 font-bold">
              PROMZ // REAL PROMTS
            </span>
            <span className="text-stone-300 font-mono text-xs">|</span>
            <span className="text-xs font-mono text-[#ff4d00] flex items-center gap-1 font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> GEMINI 3.5 FLASH ENGINE
            </span>
          </motion.div>

          {/* Master Headline in Rich Charcoal with Vibrant Orange Gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-stone-900 uppercase leading-[0.95]"
          >
            Reverse-Engineer <br />
            <span className="text-gradient-fire">Any Video.</span>
          </motion.h1>

          {/* Supporting Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-7 text-lg sm:text-xl text-stone-600 max-w-2xl leading-relaxed font-normal"
          >
            Transform raw reference videos into frame-accurate production scripts, 6-DoF camera kinematics, and high-fidelity recreation prompts for <strong>Runway Gen-3</strong>, <strong>OpenAI Sora</strong>, and <strong>Kling 1.5</strong>.
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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ff4d00] to-[#ff6600] hover:from-[#ff5500] hover:to-[#ff7700] shadow-xl shadow-[#ff4d00]/25 transition-all duration-200 active:scale-95 group cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Deconstruct a Video</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreWorkflow}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl text-sm font-semibold tracking-wide text-stone-700 bg-white/80 hover:bg-white border border-stone-200/90 hover:border-stone-300 shadow-sm hover:shadow transition-all duration-200 active:scale-95 cursor-pointer backdrop-blur-md"
            >
              <Play className="w-3.5 h-3.5 text-stone-500" />
              <span>Explore Studio Workflow</span>
            </button>
          </motion.div>

          {/* Technical Specs Strip in Frosted White Glass Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="mt-16 pt-10 border-t border-stone-200/70 w-full grid grid-cols-2 md:grid-cols-4 gap-4 text-left"
          >
            <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-2 w-8 h-8 rounded-xl bg-orange-50 border border-orange-100 text-[#ff4d00] flex items-center justify-center mb-2">
                <Film className="w-4 h-4" />
              </div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-stone-400">Segmentation</p>
              <p className="text-sm font-bold text-stone-900">SMPTE Timecoded Cuts</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-2 w-8 h-8 rounded-xl bg-orange-50 border border-orange-100 text-[#ff4d00] flex items-center justify-center mb-2">
                <Eye className="w-4 h-4" />
              </div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-stone-400">Camera Dynamics</p>
              <p className="text-sm font-bold text-stone-900">6-DoF Motion Trajectory</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-2 w-8 h-8 rounded-xl bg-orange-50 border border-orange-100 text-[#ff4d00] flex items-center justify-center mb-2">
                <Layers className="w-4 h-4" />
              </div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-stone-400">Audio Separation</p>
              <p className="text-sm font-bold text-stone-900">Dialogue & Foley Stems</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-2 w-8 h-8 rounded-xl bg-orange-50 border border-orange-100 text-[#ff4d00] flex items-center justify-center mb-2">
                <Cpu className="w-4 h-4" />
              </div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-stone-400">Generative Output</p>
              <p className="text-sm font-bold text-stone-900">Runway, Sora & Kling</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
