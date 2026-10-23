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
    <main className="min-h-screen bg-[#08080a] text-[#f4f4f6] selection:bg-[#ff5500]/30 selection:text-white relative">
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
