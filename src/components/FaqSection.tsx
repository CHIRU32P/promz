"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does video reverse-engineering work under the hood?",
      answer:
        "The system breaks the input video into keyframes and temporal optical flow vectors using FFmpeg. A multimodal vision model detects shot cut boundaries, isolates lighting/camera setups, and identifies subjects. Simultaneously, Whisper processes the audio track into dialogue with speaker timestamps, while acoustic models catalog sound effects. The resulting structured scene graph is translated into either screenplays (Mode A) or platform-tuned generative diffusion prompts (Mode B).",
    },
    {
      question: "What output formats are supported?",
      answer:
        "You can export in industry-standard Markdown (.md) formatted for screenplays, raw structured JSON specs for direct API or pipeline integration, or copy diffusion prompts directly to your clipboard. Support for Final Draft (.fdx) and Fountain formats is planned for the upcoming FastAPI release.",
    },
    {
      question: "Which video file formats can I analyze?",
      answer:
        "The current frontend studio supports standard web containers including MP4 (H.264 / AV1), QuickTime MOV (ProRes / H.264), and WebM. File size limits for the cloud processing pipeline are determined by the backend infrastructure during deployment.",
    },
    {
      question: "How accurate are scene timestamps and cuts?",
      answer:
        "Scene cut boundaries are evaluated using optical flow and luminance histogram spikes, achieving sub-second boundary identification on hard cuts. Dissolves, whip pans, and long morphing transitions are identified as continuous sequences with approximate transition intervals rather than instantaneous hard cuts.",
    },
    {
      question: "Can I use the generated recreation prompts directly in Runway or Sora?",
      answer:
        "Yes. Mode B generates prompt strings specifically tailored to the latent space conditioning of each target model (Runway Gen-3, OpenAI Sora, Kling 1.5). It structures camera movements, lighting, and negative prompts using the syntax and tokens each model responds to best.",
    },
    {
      question: "How is video privacy and storage handled?",
      answer:
        "In the current frontend demonstration, preset analysis runs locally in your browser session without uploading footage to third-party services. When connected to the future Python FastAPI backend, video processing can run either in private self-hosted GPU containers or transient cloud workers with automated temporary artifact cleanup. Specific data retention policies will be configured based on your deployment architecture.",
    },
  ];

  return (
    <section id="faq" className="py-24 relative border-t border-white/[0.08] scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-[#ff7700] uppercase mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            ARCHITECTURE & METHODOLOGY
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-neutral-400 text-sm md:text-base max-w-xl mx-auto">
            Clear, transparent answers about how the reverse-engineering pipeline operates.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-neutral-950/70 border border-white/[0.08] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-900/30 transition-colors"
                >
                  <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#ff5500] border-[#ff5500]/40" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm text-neutral-300 leading-relaxed border-t border-white/[0.04]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
