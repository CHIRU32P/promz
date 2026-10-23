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
      description: "Drop in any reference clip (MP4, MOV, WebM) or select a pre-indexed cinematic sample from the PROMZ studio registry.",
      icon: UploadCloud,
      technicalDetail: "PyAV container inspection & Google Gemini Files API direct video streaming.",
    },
    {
      number: "02",
      title: "Analyze",
      tagline: "Multimodal Scene Breakdown",
      description: "Gemini vision-language intelligence detects scene transitions, calculates 6-DoF camera trajectories, and transcribes audio stems.",
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
    <section id="how-it-works" className="py-24 relative border-t border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-stone-200/80 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#ff4d00] font-bold">
              SYSTEM ARCHITECTURE
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-stone-900 uppercase mt-2">
              Four-Step Reverse Pipeline
            </h2>
          </div>
          <p className="text-sm md:text-base text-stone-600 max-w-md">
            From raw video frames to production-ready screenplay blueprints and diffusion-ready prompts in seconds.
          </p>
        </div>

        {/* Steps Grid in Cream & White Frosted Glass Cards */}
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
                className="group relative p-6 rounded-3xl bg-white/75 backdrop-blur-xl border border-white/90 hover:border-[#ff4d00]/40 shadow-[0_10px_30px_-10px_rgba(40,30,20,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(255,77,0,0.1)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black font-mono text-stone-300 group-hover:text-[#ff4d00] transition-colors">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-stone-700 group-hover:text-[#ff4d00] group-hover:border-[#ff4d00]/30 transition-colors shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider block mb-1 font-semibold">
                    {step.tagline}
                  </span>
                  <h3 className="text-xl font-bold text-stone-900 tracking-tight mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-stone-600 leading-relaxed mb-6 font-normal">
                    {step.description}
                  </p>
                </div>

                {/* Technical Footnote */}
                <div className="pt-4 border-t border-stone-100 text-[11px] font-mono text-stone-500 group-hover:text-stone-700 transition-colors">
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
