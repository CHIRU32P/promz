"use client";

import React, { useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { InteractiveStudio } from "@/components/InteractiveStudio";
import { WorkflowSection } from "@/components/WorkflowSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { OutputModeShowcase } from "@/components/OutputModeShowcase";
import { UseCasesSection } from "@/components/UseCasesSection";
import { FaqSection } from "@/components/FaqSection";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  const scrollToStudio = useCallback(() => {
    document.getElementById("interactive-studio")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToWorkflow = useCallback(() => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1c1917] selection:bg-[#ff4d00]/20 selection:text-stone-900 relative">
      {/* Ambient background glows in warm cream & soft coral */}
      <div className="fixed top-0 left-1/3 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#ffedd5]/30 via-[#ffe4e6]/15 to-transparent blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 right-10 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#fef3c7]/25 via-[#fde68a]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Sticky Top Navigation */}
      <Navbar onOpenStudio={scrollToStudio} />

      {/* Hero Section */}
      <Hero
        onStartAnalysis={scrollToStudio}
        onExploreWorkflow={scrollToWorkflow}
      />

      {/* Interactive Demonstration Studio & Video Player Preview */}
      <InteractiveStudio />

      {/* Four-Step Workflow */}
      <WorkflowSection />

      {/* Core Features Grid */}
      <FeaturesSection />

      {/* Output Mode Comparison Showcase */}
      <OutputModeShowcase />

      {/* Industry Use Cases */}
      <UseCasesSection />

      {/* FAQ Accordion */}
      <FaqSection />

      {/* Final Editorial Call to Action */}
      <FinalCta onAnalyzeFirstVideo={scrollToStudio} />

      {/* Architectural Footer */}
      <Footer />
    </main>
  );
}
