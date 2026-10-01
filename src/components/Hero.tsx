"use client";

import React, { useState } from "react";
import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { 
  LuCopy, 
  LuCheck, 
  LuTerminal, 
  LuSparkles, 
  LuCpu, 
  LuMonitor, 
  LuLayers, 
  LuPlay,
  LuExternalLink
} from "react-icons/lu";

interface InstallTab {
  id: string;
  name: string;
  command: string;
  description: string;
}

const INSTALL_TABS: InstallTab[] = [
  {
    id: "curl",
    name: "One-Line Curl",
    command: "curl -fsSL https://dotfiles-web-pi.vercel.app/install | sh",
    description: "Instant automated deployment from live production endpoint.",
  },
  {
    id: "core",
    name: "Standard Core (--core)",
    command: "git clone https://github.com/krreeshhh/DotFiles.git ~/Dotfiles && cd ~/Dotfiles && ./install.sh --core",
    description: "Installs Hyprland, Quickshell, drivers, and UI essentials.",
  },
  {
    id: "all",
    name: "Full Suite (--all)",
    command: "git clone https://github.com/krreeshhh/DotFiles.git ~/Dotfiles && cd ~/Dotfiles && ./install.sh --all",
    description: "Includes core desktop plus browsers, discord, telegram, and dev tools.",
  },
  {
    id: "config",
    name: "Config Only",
    command: "git clone https://github.com/krreeshhh/DotFiles.git ~/Dotfiles && cd ~/Dotfiles && ./install.sh --config-only",
    description: "Deploys ~/.config files and themes without package management.",
  },
];

export function Hero() {
  const { toggleScratchpad } = useTheme();
  const [activeTab, setActiveTab] = useState<InstallTab>(INSTALL_TABS[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeTab.command);
    setCopied(true);
    
    // Trigger celebratory confetti effect
    try {
      confetti({
        particleCount: 40,
        spread: 55,
        origin: { y: 0.8 },
        colors: ["#e183c2", "#9d8ec8", "#54d6eb", "#c88ee1"],
      });
    } catch {
      // Ignore in environments without canvas
    }

    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative pt-20 sm:pt-28 pb-12 sm:pb-20 overflow-hidden">
      {/* Ambient background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[220px] sm:h-[350px] bg-primary/15 rounded-full blur-[80px] pointer-events-none -z-10 gpu-layer" />
      <div className="absolute top-1/3 right-4 sm:right-10 w-[200px] sm:w-[350px] h-[200px] sm:h-[350px] bg-secondary/10 rounded-full blur-[70px] pointer-events-none -z-10 gpu-layer" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 text-center">
        
        {/* Release Pill Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-surface-variant/90 border border-outline/50 shadow-inner mb-4 sm:mb-6 backdrop-blur-md max-w-full"
        >
          <LuSparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary animate-pulse shrink-0" />
          <span className="text-[11px] sm:text-xs font-mono font-medium text-on-surface truncate">
            DotFiles v1.0 Released · Architecture: <strong className="text-primary font-bold">Reze</strong>
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-on-surface mb-4 sm:mb-6 font-sans leading-tight"
        >
          Your Arch Linux Desktop, <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary animate-gradient">
            Perfected & Automated
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto text-xs sm:text-base text-on-surface-variant leading-relaxed mb-6 sm:mb-10 px-2 sm:px-0"
        >
          A deterministic Wayland environment combining native Lua Hyprland configuration, a modular Quickshell desktop shell, live Material You palette generation from wallpapers, and universal Picture-in-Picture pin management.
        </motion.p>

        {/* Feature Chip Pills */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 max-w-4xl mx-auto mb-8 sm:mb-12"
        >
          <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-surface/70 border border-outline/40 text-[10px] sm:text-xs font-mono text-on-surface">
            <LuCpu className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" /> Hyprland Lua API
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-surface/70 border border-outline/40 text-[10px] sm:text-xs font-mono text-on-surface">
            <LuLayers className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" /> Quickshell Shell
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-surface/70 border border-outline/40 text-[10px] sm:text-xs font-mono text-on-surface">
            <LuMonitor className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" /> Material You
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-surface/70 border border-outline/40 text-[10px] sm:text-xs font-mono text-on-surface">
            <LuTerminal className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" /> Ghostty (0.20 Opacity)
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-surface/70 border border-outline/40 text-[10px] sm:text-xs font-mono text-on-surface">
            <LuPlay className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" /> Universal PiP
          </span>
          <button 
            onClick={toggleScratchpad}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-primary/15 border border-primary/40 text-[10px] sm:text-xs font-mono text-primary hover:bg-primary/25 transition-all cursor-pointer shadow-xs"
            title="Press W to open Wallpaper & Theme Scratchpad"
          >
            <LuSparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary animate-pulse" /> Press <kbd className="px-1 py-0.2 bg-primary/20 rounded font-bold">W</kbd> for Wallpapers
          </button>
        </motion.div>

        {/* Interactive Quick Install Terminal Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto rounded-2xl glass-panel border border-outline/60 p-2 sm:p-4 shadow-2xl relative"
        >
          {/* Terminal Title Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-2 sm:px-3 py-2 border-b border-outline/30 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80 border border-red-600/40" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80 border border-yellow-600/40" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80 border border-green-600/40" />
              <span className="ml-1 sm:ml-2 text-[11px] sm:text-xs font-mono text-on-surface-variant font-medium">
                bash ~ /installer
              </span>
            </div>

            {/* Install Method Tabs with smooth horizontal scroll */}
            <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar">
              {INSTALL_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2.5 sm:px-3 py-1 rounded-lg text-[10px] sm:text-xs font-mono transition-all whitespace-nowrap shrink-0 ${
                    activeTab.id === tab.id
                      ? "bg-primary-container text-primary border border-primary/40 font-semibold"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/60"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Command Display & One-Click Copy */}
          <div className="bg-background/90 rounded-xl p-3 sm:p-4 border border-outline/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 font-mono text-xs sm:text-sm text-left">
            <div className="flex items-start sm:items-center gap-2 sm:gap-3 w-full py-1 text-on-surface">
              <span className="text-primary font-bold select-none pt-0.5 sm:pt-0">$</span>
              <code className="text-[11px] sm:text-xs md:text-sm text-on-surface select-all break-all leading-relaxed">
                {activeTab.command}
              </code>
            </div>

            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs font-sans font-semibold transition-all shrink-0 w-full sm:w-auto justify-center cursor-pointer ${
                copied
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50"
                  : "bg-primary text-on-primary hover:opacity-90 active:scale-95 shadow-md shadow-primary/20"
              }`}
            >
              {copied ? (
                <>
                  <LuCheck className="w-4 h-4" />
                  <span>Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <LuCopy className="w-4 h-4" />
                  <span>Copy Command</span>
                </>
              )}
            </button>
          </div>

          {/* Description footer */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 px-2 sm:px-3 pt-2.5 sm:pt-3 text-[11px] sm:text-xs text-on-surface-variant text-left">
            <span className="truncate max-w-full">{activeTab.description}</span>
            <a 
              href="#install" 
              className="inline-flex items-center gap-1 text-primary hover:underline shrink-0"
            >
              <span>View install order</span>
              <LuExternalLink className="w-3 h-3" />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
