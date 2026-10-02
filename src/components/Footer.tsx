"use client";

import React from "react";
import { LuTerminal, LuGithub, LuHeart, LuExternalLink } from "react-icons/lu";

export function Footer() {
  return (
    <footer className="py-12 bg-background border-t border-white/10 text-xs font-mono text-on-surface-variant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left: Branding */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shadow-xs">
            <LuTerminal className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-on-surface tracking-tight">Arch Linux + Hyprland DotFiles</p>
            <p className="text-[11px] text-white/50">Crafted with Material You & Quickshell</p>
          </div>
        </div>

        {/* Center: Open Source Info */}
        <div className="flex items-center gap-1 text-white/70">
          <span>Built for the Wayland Linux Community</span>
        </div>

        {/* Right: GitHub Link & License */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/krreeshhh/DotFiles"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-on-surface hover:text-primary transition-colors btn-tactile"
          >
            <LuGithub className="w-4 h-4" />
            <span>GitHub Repository</span>
            <LuExternalLink className="w-3 h-3" />
          </a>
          <span className="text-outline">|</span>
          <span className="text-on-surface-variant">MIT License</span>
        </div>

      </div>
    </footer>
  );
}
