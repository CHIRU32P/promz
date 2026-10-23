"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Menu, X, ArrowUpRight, Film, Sliders } from "lucide-react";

interface NavbarProps {
  onOpenStudio?: () => void;
}

export function Navbar({ onOpenStudio }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          ? "bg-[#08080a]/85 backdrop-blur-md border-b border-white/[0.08] shadow-2xl shadow-black/50 py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Wordmark */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-neutral-800 to-neutral-900 border border-white/10 group-hover:border-[#ff5500]/50 transition-colors shadow-inner">
              <span className="text-sm font-black tracking-tighter text-white">D</span>
              <span className="text-xs font-bold text-[#ff5500] -ml-0.5">/</span>
              <span className="text-sm font-black tracking-tighter text-white">E</span>
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#ff5500] ring-4 ring-[#08080a] animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-white flex items-center gap-2">
                DECONSTRUCT
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10 text-neutral-400">
                  v2.4
                </span>
              </span>
              <span className="text-[11px] font-mono tracking-wide text-neutral-500 hidden sm:inline-block">
                AI Video Reverse-Engineering
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
            <a
              href="#interactive-studio"
              className="hover:text-white transition-colors relative group py-1"
            >
              Studio
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#ff3b30] to-[#ff7700] transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="#how-it-works"
              className="hover:text-white transition-colors relative group py-1"
            >
              How It Works
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#ff3b30] to-[#ff7700] transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="#features"
              className="hover:text-white transition-colors relative group py-1"
            >
              Features
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#ff3b30] to-[#ff7700] transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="#output-modes"
              className="hover:text-white transition-colors relative group py-1"
            >
              Script vs Prompt
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#ff3b30] to-[#ff7700] transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="#use-cases"
              className="hover:text-white transition-colors relative group py-1"
            >
              Use Cases
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#ff3b30] to-[#ff7700] transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="#faq"
              className="hover:text-white transition-colors relative group py-1"
            >
              FAQ
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#ff3b30] to-[#ff7700] transition-all duration-300 group-hover:w-full" />
            </a>
          </nav>

          {/* Right Action CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => {
                if (onOpenStudio) {
                  onOpenStudio();
                } else {
                  document.getElementById("interactive-studio")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#ff3b30] via-[#ff5500] to-[#ff7700] hover:brightness-110 shadow-lg shadow-[#ff5500]/25 transition-all duration-200 active:scale-95 group cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
              <span>Analyze a Video</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-xl bg-neutral-950/95 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col gap-3">
            <a
              href="#interactive-studio"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-white/[0.04] rounded-lg"
            >
              Studio
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-white/[0.04] rounded-lg"
            >
              How It Works
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-white/[0.04] rounded-lg"
            >
              Features
            </a>
            <a
              href="#output-modes"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-white/[0.04] rounded-lg"
            >
              Script vs Prompt
            </a>
            <a
              href="#use-cases"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-white/[0.04] rounded-lg"
            >
              Use Cases
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-white/[0.04] rounded-lg"
            >
              FAQ
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenStudio) onOpenStudio();
                else document.getElementById("interactive-studio")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-2 w-full py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#ff3b30] to-[#ff7700] text-center"
            >
              Analyze a Video
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
