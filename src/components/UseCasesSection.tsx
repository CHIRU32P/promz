"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clapperboard, Megaphone, Sparkles, Scissors, Users, Eye } from "lucide-react";

export function UseCasesSection() {
  const cases = [
    {
      title: "Filmmakers & Directors",
      role: "Cinematography Breakdown",
      description: "Deconstruct reference shots from master cinematographers. Extract focal lengths, camera crane paths, and lighting setups to build precise shot lists and shooting treatments.",
      icon: Clapperboard,
      metric: "Save 4+ hours per treatment",
    },
    {
      title: "AI Video Prompt Engineers",
      role: "Latent Prompt Synthesis",
      description: "Reverse reference videos into prompt tokens formatted specifically for Runway Gen-3, OpenAI Sora, and Kling. Reproduce nuanced camera trajectories without endless trial and error.",
      icon: Sparkles,
      metric: "Zero guesswork prompting",
    },
    {
      title: "Advertising & Commercial Teams",
      role: "Competitor & Trend Analysis",
      description: "Reverse-engineer viral commercial campaigns and high-performing social video ads into timestamped pacing curves, graphic lower-third breakdowns, and sound motifs.",
      icon: Megaphone,
      metric: "Rapid creative deconstruction",
    },
    {
      title: "Video Editors & Post-Production",
      role: "Pacing & Cut Rhythm",
      description: "Analyze cut duration intervals, audio-to-cut alignment, and transition techniques to replicate masterclass editorial cadence in your own edits.",
      icon: Scissors,
      metric: "Exact millisecond cut pacing",
    },
    {
      title: "Creative Directors & Agencies",
      role: "Treatment Pitching",
      description: "Turn reference mood films into structured production blueprints for pitch decks and client presentations with verified scene breakdowns and visual style guidelines.",
      icon: Users,
      metric: "Standardized creative specs",
    },
    {
      title: "VFX & 3D Previz Artists",
      role: "Virtual Camera & Environment",
      description: "Extract 6-DoF camera motion, vanishing points, and lighting vectors from real-world plates to initialize virtual cameras in Unreal Engine or Blender.",
      icon: Eye,
      metric: "Clean camera kinematics",
    },
  ];

  return (
    <section id="use-cases" className="py-24 relative border-t border-white/[0.08] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/[0.08] gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#ff5500]">
              INDUSTRY APPLICATIONS
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase mt-2">
              Who Builds With Deconstruct
            </h2>
          </div>
          <p className="text-sm md:text-base text-neutral-400 max-w-md">
            Bridging the gap between physical cinematography and generative intelligence across modern video production.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group p-7 rounded-2xl bg-neutral-950/60 border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center text-white group-hover:text-[#ff5500] group-hover:border-[#ff5500]/40 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-[#ff7700] uppercase tracking-wider font-semibold">
                      {item.metric}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider block mb-1">
                    {item.role}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-500">
                  <span>Deconstruct AI Engine</span>
                  <span className="text-neutral-400 group-hover:text-white transition-colors">● Active workflow</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
