"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, Shield, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function AuthModal() {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signInAsAdmin,
    signInAsGuest,
    isFirebaseLive,
  } = useAuth();

  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (tab === "signin") {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password, name);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Google sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Frosted Glass Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute inset-0 bg-stone-900/40 backdrop-blur-md"
        />

        {/* Modal Window: Cream & White Classic Glass */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md bg-[#faf8f5]/90 backdrop-blur-2xl rounded-3xl border border-white/80 shadow-[0_30px_70px_-15px_rgba(40,30,20,0.18)] p-8 overflow-hidden"
        >
          {/* Subtle Warm Gradient Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#ff4d00] via-[#ff7700] to-[#ffa000]" />

          {/* Close button */}
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-stone-200/50 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Logo & Heading */}
          <div className="text-center mb-6">
            <div className="inline-block relative w-16 h-16 mb-2 rounded-2xl overflow-hidden shadow-md border border-white/60 bg-white">
              <Image
                src="/promz-logo.png"
                alt="PROMZ"
                fill
                sizes="64px"
                className="object-contain p-1"
                priority
              />
            </div>
            <h3 className="text-2xl font-black tracking-tight text-stone-900">
              Welcome to <span className="text-[#ff4d00]">PROMZ</span>
            </h3>
            <p className="text-xs font-mono text-stone-500 mt-1">
              {isFirebaseLive ? "Firebase Authentication Connected" : "Universal Cloud Access & Telemetry"}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-100/80 border border-red-300 text-red-700 text-xs font-mono">
              {error}
            </div>
          )}

          {/* 1-Click Google Sign In */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl bg-white/90 hover:bg-white border border-stone-200/80 shadow-sm hover:shadow transition-all font-semibold text-stone-800 text-sm cursor-pointer mb-4"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="relative flex items-center justify-center mb-4">
            <div className="border-t border-stone-200 w-full" />
            <span className="bg-[#faf8f5] px-3 text-[11px] font-mono text-stone-400 uppercase tracking-wider shrink-0">
              or email
            </span>
            <div className="border-t border-stone-200 w-full" />
          </div>

          {/* Form Tabs */}
          <div className="flex rounded-xl bg-stone-200/60 p-1 mb-4 text-xs font-semibold text-stone-600">
            <button
              type="button"
              onClick={() => setTab("signin")}
              className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                tab === "signin" ? "bg-white text-stone-900 shadow-sm" : "hover:text-stone-900"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setTab("signup")}
              className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                tab === "signup" ? "bg-white text-stone-900 shadow-sm" : "hover:text-stone-900"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {tab === "signup" && (
              <div>
                <label className="block text-[11px] font-mono text-stone-600 mb-1">Your Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Chiranjeevi"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/80 border border-stone-200 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#ff4d00]/30 focus:border-[#ff4d00]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-mono text-stone-600 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="creator@promz.ai"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/80 border border-stone-200 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#ff4d00]/30 focus:border-[#ff4d00]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-stone-600 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/80 border border-stone-200 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#ff4d00]/30 focus:border-[#ff4d00]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#ff4d00] to-[#ff6600] hover:from-[#ff5500] hover:to-[#ff7700] text-white font-bold text-sm shadow-md shadow-[#ff4d00]/25 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              <span>{tab === "signin" ? "Sign In to PROMZ" : "Join as Creator"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo & Admin shortcuts */}
          <div className="mt-6 pt-4 border-t border-stone-200/80">
            <div className="text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-2 text-center">
              Instant Access Roles
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={signInAsAdmin}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer shadow-sm"
              >
                <Shield className="w-3.5 h-3.5 text-[#ff7700]" />
                <span>Admin Login</span>
              </button>
              <button
                type="button"
                onClick={signInAsGuest}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white border border-stone-200 text-stone-700 text-xs font-semibold hover:bg-stone-100 transition-colors cursor-pointer shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Guest Creator</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
