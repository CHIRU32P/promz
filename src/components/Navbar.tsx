"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Menu, X, ArrowUpRight, Shield, User, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface NavbarProps {
  onOpenStudio?: () => void;
}

export function Navbar({ onOpenStudio }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, setIsAuthModalOpen, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#faf8f5]/85 backdrop-blur-2xl border-b border-stone-200/70 shadow-[0_10px_30px_-15px_rgba(40,30,20,0.08)] py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Official Brand Logo & Wordmark */}
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl overflow-hidden bg-white shadow-md border border-stone-200/80 group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/promz-logo.png"
                alt="PROMZ Logo"
                fill
                sizes="40px"
                className="object-contain p-1"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-stone-900 leading-none">
                  PROMZ
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-stone-200/70 text-stone-700 font-semibold border border-stone-300/60">
                  REAL PROMTS
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-wider text-stone-500 uppercase mt-0.5">
                AI Video Deconstruction
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-stone-600">
            <a
              href="#interactive-studio"
              className="hover:text-stone-900 transition-colors relative group py-1"
            >
              Studio
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#ff4d00] transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="#how-it-works"
              className="hover:text-stone-900 transition-colors relative group py-1"
            >
              Workflow
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#ff4d00] transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="#features"
              className="hover:text-stone-900 transition-colors relative group py-1"
            >
              Features
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#ff4d00] transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="#output-modes"
              className="hover:text-stone-900 transition-colors relative group py-1"
            >
              Script vs Prompt
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#ff4d00] transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="#faq"
              className="hover:text-stone-900 transition-colors relative group py-1"
            >
              FAQ
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#ff4d00] transition-all duration-300 group-hover:w-full" />
            </a>

            {/* Direct Admin Link in Nav */}
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-stone-100 hover:bg-stone-200/80 text-stone-700 hover:text-stone-900 transition-colors border border-stone-200"
            >
              <Shield className="w-3.5 h-3.5 text-[#ff4d00]" />
              <span>Admin</span>
            </Link>
          </nav>

          {/* Right Action CTA & Firebase Auth Status */}
          <div className="hidden md:flex items-center gap-3">
            {/* User Auth Chip or Sign In Button */}
            {user ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/80 border border-stone-200 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-bold uppercase">
                  {user.displayName?.charAt(0) || "U"}
                </div>
                <span className="text-xs font-mono font-semibold text-stone-800 max-w-[100px] truncate">
                  {user.displayName?.split(" ")[0]}
                </span>
                <button
                  onClick={signOut}
                  className="p-1 rounded text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/80 hover:bg-white text-stone-700 hover:text-stone-900 text-xs font-semibold border border-stone-200/80 shadow-sm transition-all cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-stone-500" />
                <span>Sign In</span>
              </button>
            )}

            {/* Analyze CTA */}
            <button
              onClick={() => {
                if (onOpenStudio) {
                  onOpenStudio();
                } else {
                  document.getElementById("interactive-studio")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wide text-white bg-gradient-to-r from-[#ff4d00] to-[#ff6600] hover:from-[#ff5500] hover:to-[#ff7700] shadow-md shadow-[#ff4d00]/25 transition-all duration-200 active:scale-95 group cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
              <span>Launch Studio</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/80 border border-stone-200 text-stone-700 hover:text-stone-900 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-5 rounded-2xl bg-white/95 border border-stone-200 backdrop-blur-2xl shadow-xl flex flex-col gap-3">
            <a
              href="#interactive-studio"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-50 rounded-xl"
            >
              Studio
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-50 rounded-xl"
            >
              Workflow
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-50 rounded-xl"
            >
              Features
            </a>
            <a
              href="#output-modes"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-50 rounded-xl"
            >
              Script vs Prompt
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-50 rounded-xl"
            >
              FAQ
            </a>

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-mono font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-50 rounded-xl"
            >
              <Shield className="w-4 h-4 text-[#ff4d00]" />
              <span>Admin Console</span>
            </Link>

            <div className="pt-2 border-t border-stone-200 flex flex-col gap-2">
              {user ? (
                <div className="flex items-center justify-between px-3 py-2 bg-stone-50 rounded-xl text-xs font-mono">
                  <span>{user.displayName}</span>
                  <button onClick={signOut} className="text-[#ff4d00] font-bold">Sign Out</button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full py-2.5 rounded-xl bg-stone-100 font-semibold text-xs text-stone-800"
                >
                  Sign In with Firebase
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenStudio) onOpenStudio();
                  else document.getElementById("interactive-studio")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#ff4d00] to-[#ff6600] text-center"
              >
                Launch Studio
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
