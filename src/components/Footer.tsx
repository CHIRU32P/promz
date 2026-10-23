"use client";

import React from "react";
import { Terminal, Cpu, ArrowUp, Shield } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#050507] pt-16 pb-12 text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-white/[0.06]">
          
          {/* Brand Info (2 cols) */}
          <div className="md:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-900 border border-white/10">
                  <span className="text-xs font-black text-white">D</span>
                  <span className="text-xs font-bold text-[#ff5500] -ml-0.5">/</span>
                  <span className="text-xs font-black text-white">E</span>
                </div>
                <span className="text-base font-bold tracking-tight text-white">
                  DECONSTRUCT // AI
                </span>
              </div>
              <p className="mt-4 text-xs text-neutral-400 leading-relaxed max-w-sm">
                Next-generation video reverse-engineering platform. Deconstruct reference cinematography into timestamped shooting scripts, 6-DoF camera trajectories, and diffusion recreation prompts.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3 text-xs font-mono text-neutral-500">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                SYSTEM OPERATIONAL
              </span>
              <span>•</span>
              <span>CORE v2.4.1</span>
            </div>
          </div>

          {/* Column 1: Product */}
          <div className="flex flex-col gap-3 text-xs">
            <span className="font-mono text-neutral-300 uppercase tracking-wider font-semibold">
              Product
            </span>
            <a href="#interactive-studio" className="hover:text-white transition-colors">
              Interactive Studio
            </a>
            <a href="#how-it-works" className="hover:text-white transition-colors">
              Reverse Pipeline
            </a>
            <a href="#features" className="hover:text-white transition-colors">
              Optical Flow Parsing
            </a>
            <a href="#output-modes" className="hover:text-white transition-colors">
              Mode A vs Mode B
            </a>
            <a href="#use-cases" className="hover:text-white transition-colors">
              Cinematography Use Cases
            </a>
          </div>

          {/* Column 2: Architecture */}
          <div className="flex flex-col gap-3 text-xs">
            <span className="font-mono text-neutral-300 uppercase tracking-wider font-semibold">
              Engines & Models
            </span>
            <span className="text-neutral-500">Runway Gen-3 Alpha</span>
            <span className="text-neutral-500">OpenAI Sora</span>
            <span className="text-neutral-500">Kling 1.5</span>
            <span className="text-neutral-500">Whisper v3 Speech</span>
            <span className="text-neutral-500">FastAPI Async Broker</span>
          </div>

          {/* Column 3: Platform */}
          <div className="flex flex-col gap-3 text-xs">
            <span className="font-mono text-neutral-300 uppercase tracking-wider font-semibold">
              Standards
            </span>
            <span className="text-neutral-400">Final Draft (FDX)</span>
            <span className="text-neutral-400">Fountain Screenplay</span>
            <span className="text-neutral-400">SMPTE Timecode</span>
            <span className="text-neutral-400">JSON Schema v2</span>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ & Docs
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-500 gap-4">
          <div>
            © 2026 DECONSTRUCT AI PLATFORM. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-neutral-600">NOAH MILES DESIGN SYSTEM INSPIRATION</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
