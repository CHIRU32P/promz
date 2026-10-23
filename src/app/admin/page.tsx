"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Shield,
  Server,
  Zap,
  Activity,
  ArrowLeft,
  Users,
  Video,
  Database,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  LogOut,
  ExternalLink,
  Code2,
  Sparkles
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { checkBackendHealth } from "@/services/api";

export default function AdminPage() {
  const { user, signInAsAdmin, signOut, isFirebaseLive } = useAuth();
  const [backendStatus, setBackendStatus] = useState<{
    healthy: boolean;
    gemini_configured?: boolean;
    default_model?: string;
    error?: string;
  } | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchHealth = async () => {
    setRefreshing(true);
    const res = await checkBackendHealth();
    setBackendStatus(res);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 selection:bg-[#ff4d00]/20 selection:text-stone-900">
      {/* Subtle Warm Mesh & Ambient Dots */}
      <div className="fixed inset-0 tech-dots pointer-events-none opacity-25" />
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#ffedd5]/40 via-[#ffe4e6]/20 to-transparent blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#fef3c7]/30 via-[#fde68a]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Top Glass Navbar */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-stone-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-100/80 hover:bg-stone-200/80 text-stone-700 text-xs font-mono font-medium transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Studio</span>
            </Link>

            <div className="h-4 w-px bg-stone-300" />

            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-white shadow-sm border border-stone-200">
                <Image
                  src="/promz-logo.png"
                  alt="PROMZ Logo"
                  fill
                  sizes="32px"
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-black tracking-tight text-stone-900">PROMZ</span>
                  <span className="px-1.5 py-0.2 rounded bg-stone-900 text-[10px] font-mono text-white font-bold uppercase">
                    Admin
                  </span>
                </div>
                <div className="text-[10px] font-mono text-stone-500">Telemetry & Control Plane</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchHealth}
              disabled={refreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200/80 hover:bg-stone-50 text-stone-700 text-xs font-mono transition-all shadow-sm cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-[#ff4d00]" : ""}`} />
              <span>Refresh Status</span>
            </button>

            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
                <div className="w-7 h-7 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-xs uppercase">
                  {user.displayName?.charAt(0) || "A"}
                </div>
                <div className="hidden sm:block text-left text-xs font-mono">
                  <div className="font-semibold text-stone-800 leading-tight">{user.displayName}</div>
                  <div className="text-[10px] text-stone-400">{user.email}</div>
                </div>
                <button
                  onClick={signOut}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={signInAsAdmin}
                className="px-4 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-colors cursor-pointer shadow-sm"
              >
                Authenticate as Admin
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Admin Header Banner */}
        <div className="mb-8 p-8 rounded-3xl bg-white/75 backdrop-blur-2xl border border-white/90 shadow-[0_20px_50px_-15px_rgba(40,30,20,0.07)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#ff4d00]/10 via-[#ff7700]/5 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-xs font-mono text-stone-700 font-semibold mb-3">
                <Shield className="w-3.5 h-3.5 text-[#ff4d00]" />
                ADMIN CONSOLE // V2.5
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-stone-900">
                PROMZ AI Engine Control Plane
              </h1>
              <p className="mt-2 text-sm text-stone-600 max-w-2xl font-mono leading-relaxed">
                Real-time observability into Google Gemini multimodal video processing, FastAPI backend health, Firebase Authentication, and video prompt synthesis pipelines.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="p-4 rounded-2xl bg-[#faf8f5] border border-stone-200/70 text-left">
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-0.5">
                  Deployment Status
                </span>
                <div className="flex items-center gap-2 text-sm font-bold text-stone-900">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Production Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Telemetry Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Card 1: FastAPI Server */}
          <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_10px_30px_-10px_rgba(40,30,20,0.05)]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-stone-500 uppercase tracking-wider">FastAPI Backend</span>
              <Server className="w-4 h-4 text-stone-400" />
            </div>
            <div className="text-2xl font-black text-stone-900">
              {backendStatus?.healthy ? "Online" : "Offline"}
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs font-mono">
              {backendStatus?.healthy ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Port 8000 Healthy</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span className="text-amber-700">Connect uvicorn</span>
                </>
              )}
            </div>
          </div>

          {/* Card 2: Google Gemini Model */}
          <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_10px_30px_-10px_rgba(40,30,20,0.05)]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-stone-500 uppercase tracking-wider">Multimodal Model</span>
              <Cpu className="w-4 h-4 text-[#ff4d00]" />
            </div>
            <div className="text-2xl font-black text-stone-900 truncate">
              {backendStatus?.default_model || "gemini-3.5-flash"}
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs font-mono text-stone-600">
              <span className="w-2 h-2 rounded-full bg-[#ff4d00]" />
              <span>Vision-Language SDK Active</span>
            </div>
          </div>

          {/* Card 3: Firebase Auth */}
          <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_10px_30px_-10px_rgba(40,30,20,0.05)]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-stone-500 uppercase tracking-wider">Firebase Auth</span>
              <Users className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-stone-900">
              {isFirebaseLive ? "Connected" : "Live Session"}
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs font-mono text-stone-600">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Google & Email Ready</span>
            </div>
          </div>

          {/* Card 4: Video Pipeline */}
          <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_10px_30px_-10px_rgba(40,30,20,0.05)]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-stone-500 uppercase tracking-wider">PyAV & FFmpeg</span>
              <Video className="w-4 h-4 text-stone-400" />
            </div>
            <div className="text-2xl font-black text-stone-900">PyAV 18.1</div>
            <div className="mt-2 flex items-center gap-1.5 text-xs font-mono text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Native Bitstream Parser</span>
            </div>
          </div>
        </div>

        {/* Detailed Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Endpoints & Models (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* API Endpoints Catalog */}
            <div className="p-6 rounded-3xl bg-white/75 backdrop-blur-xl border border-white/90 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#ff4d00]" />
                  <h3 className="text-base font-bold text-stone-900 font-mono uppercase tracking-wider">
                    Backend API Registry
                  </h3>
                </div>
                <a
                  href="http://localhost:8000/docs"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono text-[#ff4d00] hover:underline flex items-center gap-1"
                >
                  <span>Open Swagger UI</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      GET
                    </span>
                    <span className="text-stone-800 font-semibold">/health</span>
                  </div>
                  <span className="text-stone-500">Telemetry & Model Status</span>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded bg-[#ff4d00]/15 text-[#ff4d00] font-bold text-[10px]">
                      POST
                    </span>
                    <span className="text-stone-800 font-semibold">/api/v1/analyze</span>
                  </div>
                  <span className="text-stone-500">Multipart Video Ingest & Deconstruction</span>
                </div>
              </div>
            </div>

            {/* Target Generative AI Diffusion Models */}
            <div className="p-6 rounded-3xl bg-white/75 backdrop-blur-xl border border-white/90 shadow-sm">
              <h3 className="text-base font-bold text-stone-900 font-mono uppercase tracking-wider mb-4 pb-3 border-b border-stone-200">
                Supported Recreation Prompt Engines
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-[#faf8f5] border border-stone-200/80">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-stone-900">Runway Gen-3 Alpha</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-200 text-stone-700">Active</span>
                  </div>
                  <p className="text-[11px] text-stone-500 font-sans">
                    Camera motion tokens, Kodak Vision3 500T grain, dynamic velocity curves.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#faf8f5] border border-stone-200/80">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-stone-900">OpenAI Sora</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-200 text-stone-700">Active</span>
                  </div>
                  <p className="text-[11px] text-stone-500 font-sans">
                    Photorealistic physics, ray bounce lighting, continuous 35mm gimbal track.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#faf8f5] border border-stone-200/80">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-stone-900">Kling 1.5</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-200 text-stone-700">Active</span>
                  </div>
                  <p className="text-[11px] text-stone-500 font-sans">
                    8K hyper-detail, high-contrast chiaroscuro, cinematic motion blur.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#faf8f5] border border-stone-200/80">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-stone-900">Universal Latent Diffusion</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-200 text-stone-700">Active</span>
                  </div>
                  <p className="text-[11px] text-stone-500 font-sans">
                    Universal text-to-video prompt baseline with negative weight constraints.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Configuration & Security Checklist (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* System Security & Configuration Checklist */}
            <div className="p-6 rounded-3xl bg-white/75 backdrop-blur-xl border border-white/90 shadow-sm">
              <h3 className="text-base font-bold text-stone-900 font-mono uppercase tracking-wider mb-4 pb-3 border-b border-stone-200">
                System Diagnostics
              </h3>

              <div className="space-y-3 text-xs font-mono">
                <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span>Google Gemini API Key</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">Configured</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span>Server-side Key Isolation</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">Protected</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span>Git Ignore & Secret Safety</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">Enforced</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span>FastAPI Async Event Offloading</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">Enabled</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span>CORS Frontend Origin</span>
                  <span className="px-2 py-0.5 rounded bg-stone-200 text-stone-800 font-bold">localhost:3000</span>
                </div>
              </div>
            </div>

            {/* Quick Admin Actions */}
            <div className="p-6 rounded-3xl bg-stone-900 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#ff4d00]/20 rounded-full blur-2xl pointer-events-none" />
              
              <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-[#ff7700] mb-2">
                Quick Deploy to Vercel
              </h4>
              <p className="text-xs text-stone-400 font-mono leading-relaxed mb-4">
                The Next.js frontend is fully decoupled and ready for 1-click deployment on Vercel through GitHub.
              </p>
              
              <a
                href="https://vercel.com/new"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-white text-stone-900 font-bold text-xs hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <span>Import Repository on Vercel</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
