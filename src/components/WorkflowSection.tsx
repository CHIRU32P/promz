"use client";

import React from "react";
import { motion } from "framer-motion";
import { UploadCloud, Cpu, Sparkles, Download, ArrowRight } from "lucide-react";

export function WorkflowSection() {
  const steps = [
    {
      number: "01",
      title: "Upload",
      tagline: "Input Reference Video",
      description: "Drop in any reference clip (MP4, MOV, WebM, ProRes) or select a pre-indexed cinematic sample from the studio registry.",
      icon: UploadCloud,
      technicalDetail: "FFmpeg keyframe extraction & audio container demuxing at native resolution.",
    },
    {
      number: "02",
      title: "Analyze",
      tagline: "Multimodal Scene Breakdown",
      description: "Neural vision models detect scene transitions, calculate 6-DoF camera trajectories, transcribe dialogue stems, and index visual objects.",
      icon: Cpu,
      technicalDetail: "Optical flow cut detection + Whisper audio stem separation + OCR layout parsing.",
    },
    {
      number: "03",
      title: "Generate",
      tagline: "Synthesize Scripts & Prompts",
      description: "Select between an industry-standard screenplay production script or a tuned recreation prompt for Runway Gen-3, Sora, and Kling.",
      icon: Sparkles,
      technicalDetail: "Parametric prompt formatting with negative constraints & camera velocity tokens.",
    },
    {
      number: "04",
      title: "Export",
      tagline: "Seamless Creative Pipeline",
      description: "Copy prompts with one click, download clean Markdown scripts formatted for production crews, or export complete JSON schemas.",
      icon: Download,
      technicalDetail: "Direct clipboard payload, structured JSON API payload, and formatted Markdown.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 relative border-t border-white/[0.08] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/[0.08] gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#ff5500]">
              SYSTEM ARCHITECTURE
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase mt-2">
              Four-Step Reverse Pipeline
            </h2>
          </div>
          <p className="text-sm md:text-base text-neutral-400 max-w-md">
            From raw video frames to production-ready screenplay blueprints and diffusion-ready prompts in seconds.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative p-6 rounded-2xl bg-neutral-950/60 border border-white/[0.08] hover:border-[#ff5500]/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black font-mono text-neutral-700 group-hover:text-[#ff5500] transition-colors">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-300 group-hover:text-[#ff5500] group-hover:border-[#ff5500]/40 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider block mb-1">
                    {step.tagline}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Technical Footnote */}
                <div className="pt-4 border-t border-white/[0.06] text-[11px] font-mono text-neutral-500 group-hover:text-neutral-400 transition-colors">
                  {step.technicalDetail}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
