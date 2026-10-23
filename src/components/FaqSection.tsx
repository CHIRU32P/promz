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
        "PROMZ streams the input video to the Google Gemini multimodal engine and uses PyAV for container inspection. The model analyzes scene cut boundaries, isolates lighting/camera setups, and identifies subjects. Simultaneously, speech transcription parses dialogue with speaker confidence, while acoustic models catalog sound effects. The resulting scene graph is formatted into screenplay cards (Mode A) or platform-tuned generative diffusion prompts (Mode B).",
    },
    {
      question: "What output formats are supported?",
      answer:
        "You can export in industry-standard Markdown (.md) formatted for screenplays, raw structured JSON specs for direct API or pipeline integration, or copy diffusion prompts directly to your clipboard for Runway, Sora, and Kling.",
    },
    {
      question: "Which video file formats can I analyze?",
      answer:
        "The studio supports standard video containers including MP4 (H.264 / AV1), QuickTime MOV (ProRes / H.264), WebM, AVI, and MKV. Video files up to 100MB are supported on the local processing engine.",
    },
    {
      question: "How accurate are scene timestamps and cuts?",
      answer:
        "Scene cut boundaries are evaluated using visual optical flow and luminance histogram transitions, achieving sub-second boundary identification on hard cuts. Dissolves and whip pans are identified as continuous sequences with transition tags rather than instantaneous hard cuts.",
    },
    {
      question: "Can I use the generated recreation prompts directly in Runway or Sora?",
      answer:
        "Yes. Mode B generates prompt strings specifically tailored to the latent space conditioning of each target model (Runway Gen-3, OpenAI Sora, Kling 1.5). It structures camera movements, lighting, and negative prompts using the syntax and tokens each model responds to best.",
    },
    {
      question: "How is video privacy and storage handled?",
      answer:
        "Video files uploaded for analysis are held in temporary server memory only during the active analysis session and are immediately deleted from both the local filesystem and Google Gemini temporary file storage upon completion.",
    },
  ];

  return (
    <section id="faq" className="py-24 relative border-t border-stone-200/80 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-xs font-mono text-[#ff4d00] uppercase mb-4 shadow-sm font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            ARCHITECTURE & METHODOLOGY
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-stone-900 uppercase">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-stone-600 text-sm md:text-base max-w-xl mx-auto font-normal">
            Clear, transparent answers about how the PROMZ reverse-engineering pipeline operates.
          </p>
        </div>

        {/* Accordion List in Cream & White Classic Glass */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-3xl bg-white/75 backdrop-blur-xl border border-white/90 shadow-[0_10px_30px_-10px_rgba(40,30,20,0.05)] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-50/50 transition-colors"
                >
                  <span className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-500 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#ff4d00] border-[#ff4d00]/40" : ""
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
                      <div className="px-6 pb-6 pt-1 text-sm text-stone-600 leading-relaxed border-t border-stone-100">
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
