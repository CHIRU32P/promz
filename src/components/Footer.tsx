"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Terminal, Cpu, ArrowUp, Shield } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-stone-200/80 bg-[#f5f2eb] pt-16 pb-12 text-stone-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-stone-300/60">
          
          {/* Brand Info (2 cols) */}
          <div className="md:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-xl overflow-hidden bg-white shadow-sm border border-stone-200">
                  <Image
                    src="/promz-logo.png"
                    alt="PROMZ Logo"
                    fill
                    sizes="32px"
                    className="object-contain p-0.5"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black tracking-tight text-stone-900">
                    PROMZ
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-200/80 text-stone-700 font-bold border border-stone-300">
                    REAL PROMTS
                  </span>
                </div>
              </div>
              <p className="mt-4 text-xs text-stone-600 leading-relaxed max-w-sm">
                Next-generation video reverse-engineering platform. Deconstruct reference cinematography into timestamped shooting scripts, 6-DoF camera trajectories, and diffusion recreation prompts.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3 text-xs font-mono text-stone-500">
              <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                SYSTEM OPERATIONAL
              </span>
              <span>•</span>
              <span>GEMINI 3.5 FLASH ACTIVE</span>
            </div>
          </div>

          {/* Column 1: Product */}
          <div className="flex flex-col gap-3 text-xs font-medium">
            <span className="font-mono text-stone-900 uppercase tracking-wider font-bold">
              Product
            </span>
            <a href="#interactive-studio" className="hover:text-stone-900 transition-colors">
              Interactive Studio
            </a>
            <a href="#how-it-works" className="hover:text-stone-900 transition-colors">
              Reverse Pipeline
            </a>
            <a href="#features" className="hover:text-stone-900 transition-colors">
              Optical Flow Parsing
            </a>
            <a href="#output-modes" className="hover:text-stone-900 transition-colors">
              Script vs Prompt
            </a>
            <a href="#use-cases" className="hover:text-stone-900 transition-colors">
              Cinematography Use Cases
            </a>
          </div>

          {/* Column 2: Architecture */}
          <div className="flex flex-col gap-3 text-xs font-medium">
            <span className="font-mono text-stone-900 uppercase tracking-wider font-bold">
              Engines & Models
            </span>
            <span className="text-stone-500">Google Gemini 3.5 Flash</span>
            <span className="text-stone-500">Runway Gen-3 Alpha</span>
            <span className="text-stone-500">OpenAI Sora</span>
            <span className="text-stone-500">Kling 1.5</span>
            <span className="text-stone-500">PyAV Native Bitstream</span>
          </div>

          {/* Column 3: Governance & Admin */}
          <div className="flex flex-col gap-3 text-xs font-medium">
            <span className="font-mono text-stone-900 uppercase tracking-wider font-bold">
              Control Plane
            </span>
            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-[#ff4d00] font-bold hover:underline"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Console</span>
            </Link>
            <span className="text-stone-500">Firebase Auth Integration</span>
            <span className="text-stone-500">FastAPI Port 8000</span>
            <a href="#faq" className="hover:text-stone-900 transition-colors">
              FAQ & Documentation
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-stone-500 gap-4">
          <div>
            © 2026 PROMZ // REAL PROMTS. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-stone-400">CREAM & WHITE CLASSIC GLASS ARCHITECTURE</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer font-bold"
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
