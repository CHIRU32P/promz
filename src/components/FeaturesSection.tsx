"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Film,
  Camera,
  Volume2,
  ScanText,
  FileSpreadsheet,
  Wand2,
  CheckCircle2,
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      id: "scene-analysis",
      title: "Scene-by-Scene Deconstruction",
      subtitle: "Temporal Optical Flow",
      description:
        "Sub-frame cut boundary detection isolates distinct shots, cataloging setting, environment, dominant color temperature, and pacing shifts across every second of footage.",
      icon: Film,
      specs: ["Sub-frame cut accuracy", "Luminance & motion vector triggers", "Keyframe clustering"],
    },
    {
      id: "camera-motion",
      title: "Camera & Motion Analysis",
      subtitle: "6-DoF Kinematics Solver",
      description:
        "Calculates camera framing (extreme wide to micro close-up), dynamic trajectory (pan, tilt, boom, dolly, tracking, roll), focal length approximations, and shutter characteristics.",
      icon: Camera,
      specs: ["Focal length estimation", "Dutch angle & roll detection", "Velocity curve tracking"],
    },
    {
      id: "dialogue-audio",
      title: "Dialogue & Audio Insights",
      subtitle: "Multitrack Stem Separation",
      description:
        "Demuxes spoken word with speaker diarization, isolates musical tonality and tempo, and tags ambient Foley sound effects with high-frequency timecode alignment.",
      icon: Volume2,
      specs: ["Whisper v3 speech-to-text", "BPM & musical key detection", "Acoustic room impulse tagging"],
    },
    {
      id: "ocr-text",
      title: "On-Screen Text Extraction",
      subtitle: "Neural OCR & Graphics Layout",
      description:
        "Identifies and transcribes lower-thirds, subtitles, HUD overlays, neon signage, and typographic graphics embedded in the scene with spatial bounding coordinates.",
      icon: ScanText,
      specs: ["Multilingual character OCR", "Typography placement tracking", "Confidence scoring"],
    },
    {
      id: "script-gen",
      title: "Timestamped Script Generation",
      subtitle: "Screenplay Standard Format",
      description:
        "Transforms complex visual information into industry-standard shooting scripts complete with sluglines, blocking instructions, character actions, and dialogue cues.",
      icon: FileSpreadsheet,
      specs: ["Final Draft & Fountain compatibility", "Timestamped sluglines", "Markdown & PDF exports"],
    },
    {
      id: "ai-prompts",
      title: "AI Recreation Prompts",
      subtitle: "Diffusion Latent Translation",
      description:
        "Synthesizes tuned generative video prompts formatted specifically for Runway Gen-3, OpenAI Sora, Kling 1.5, and Luma Dream Machine, complete with negative prompts and style tokens.",
      icon: Wand2,
      specs: ["Platform-tailored syntax", "Temporal coherence constraints", "Aspect ratio & seed advice"],
    },
  ];

  return (
    <section id="features" className="py-24 relative border-t border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-stone-200/80 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#ff4d00] font-bold">
              CORE CAPABILITIES
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-stone-900 uppercase mt-2">
              Engineered For Deep Visual Parsing
            </h2>
          </div>
          <p className="text-sm md:text-base text-stone-600 max-w-md">
            Built to deconstruct reference cinematography into precise, executable components without hand-waving or hallucination.
          </p>
        </div>

        {/* 6-Item Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group p-7 rounded-3xl bg-white/75 backdrop-blur-xl border border-white/90 hover:border-[#ff4d00]/40 shadow-[0_10px_30px_-10px_rgba(40,30,20,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(255,77,0,0.1)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon & Subtitle Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-stone-700 group-hover:text-[#ff4d00] group-hover:border-[#ff4d00]/30 transition-colors shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-stone-600 uppercase tracking-widest px-2.5 py-1 rounded-full bg-stone-100 border border-stone-200 font-semibold">
                      {feat.subtitle}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-stone-900 tracking-tight mb-2.5 group-hover:text-stone-900 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed mb-6 font-normal">
                    {feat.description}
                  </p>
                </div>

                {/* Specs Pill List */}
                <div className="pt-4 border-t border-stone-100 flex flex-col gap-1.5">
                  {feat.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-xs font-mono text-stone-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#ff4d00] shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
