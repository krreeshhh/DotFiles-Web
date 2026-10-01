"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "./ThemeProvider";
import { WALLPAPER_THEMES, WallpaperTheme } from "@/lib/theme";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { 
  LuPalette, 
  LuCheck, 
  LuSparkles, 
  LuChevronLeft, 
  LuChevronRight, 
  LuX,
  LuCopy,
  LuCornerDownLeft
} from "react-icons/lu";

export function WallpaperScratchpad() {
  const { activeTheme, setTheme, scratchpadOpen, setScratchpadOpen } = useTheme();
  
  const initialIndex = Math.max(0, WALLPAPER_THEMES.findIndex(t => t.id === activeTheme.id));
  const [previewIndex, setPreviewIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [appliedNotice, setAppliedNotice] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Preload all wallpaper images into memory on mount
  useEffect(() => {
    WALLPAPER_THEMES.forEach((theme) => {
      const img = new Image();
      img.src = `/wallpapers/${encodeURIComponent(theme.filename)}`;
    });
  }, []);

  // Sync preview index when scratchpad opens or active theme changes
  useEffect(() => {
    if (scratchpadOpen) {
      const idx = WALLPAPER_THEMES.findIndex(t => t.id === activeTheme.id);
      if (idx !== -1) {
        setPreviewIndex(idx);
      }
    }
  }, [scratchpadOpen, activeTheme.id]);

  const count = WALLPAPER_THEMES.length;
  const currentPreviewTheme = WALLPAPER_THEMES[previewIndex] || WALLPAPER_THEMES[0];

  const handlePrev = useCallback(() => {
    setPreviewIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  const handleNext = useCallback(() => {
    setPreviewIndex((prev) => (prev + 1) % count);
  }, [count]);

  const handleSelectIndex = useCallback((idx: number) => {
    const normalizedIdx = (idx % count + count) % count;
    setPreviewIndex(normalizedIdx);
  }, [count]);

  // Apply selected preview theme to the whole site
  const handleApplyTheme = useCallback(() => {
    const selectedTheme = WALLPAPER_THEMES[previewIndex];
    if (selectedTheme) {
      setTheme(selectedTheme);
      setAppliedNotice(true);
      
      try {
        confetti({
          particleCount: 45,
          spread: 55,
          origin: { y: 0.6 },
          colors: [selectedTheme.colors.primary, selectedTheme.colors.secondary, "#ffffff"],
        });
      } catch {
        // Ignore canvas error if any
      }

      setTimeout(() => {
        setAppliedNotice(false);
        setScratchpadOpen(false);
      }, 400);
    }
  }, [previewIndex, setTheme, setScratchpadOpen]);

  const handleCopyHex = (hex: string, label: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(label);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  // Keyboard controls when scratchpad is active
  useEffect(() => {
    if (!scratchpadOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "h" || e.key === "H") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight" || e.key === "l" || e.key === "L") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "Enter") {
        e.preventDefault();
        handleApplyTheme();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scratchpadOpen, handlePrev, handleNext, handleApplyTheme]);

  return (
    <AnimatePresence>
      {scratchpadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 select-none">
          
          {/* Darkened Glassmorphic Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setScratchpadOpen(false)}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* ================================================================ */}
          {/* FLOATING HYPRLAND SCRATCHPAD WINDOW */}
          {/* ================================================================ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl rounded-2xl sm:rounded-3xl border shadow-2xl overflow-hidden flex flex-col z-10"
            style={{
              background: "rgba(22, 17, 21, 0.94)",
              backdropFilter: "blur(28px)",
              borderColor: "var(--color-primary)",
              boxShadow: "0 0 45px -5px rgba(225, 131, 194, 0.3)",
            }}
          >
            {/* Ambient Background Lighting inside Scratchpad */}
            <div 
              className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-[100px] opacity-25 pointer-events-none transition-colors duration-500 will-change-transform"
              style={{ backgroundColor: currentPreviewTheme.colors.primary }}
            />

            {/* Window Header Bar matching Hyprland window styling */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-black/25">
              <div className="flex items-center gap-2.5">
                <span className="px-2 py-0.5 rounded-md bg-primary/20 border border-primary/40 font-mono text-[10px] font-bold text-primary">
                  SPECIAL:THEME
                </span>
                <span className="font-mono font-bold text-xs sm:text-sm text-white tracking-wide flex items-center gap-1.5">
                  <LuPalette className="w-3.5 h-3.5 text-primary" />
                  Wallpaper & Palette Scratchpad
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-white/50">
                  <span>Toggle:</span>
                  <kbd className="px-1 py-0.2 rounded bg-white/10 text-primary font-bold">W</kbd>
                  <span>or</span>
                  <kbd className="px-1 py-0.2 rounded bg-white/10 text-white/80 font-bold">ESC</kbd>
                </div>

                <button
                  onClick={() => setScratchpadOpen(false)}
                  className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  title="Close Scratchpad (ESC)"
                >
                  <LuX className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scratchpad Body: 3D Cover Flow Carousel */}
            <div className="p-4 sm:p-6 flex flex-col items-center">
              
              {/* 3D Perspective Stage */}
              <div 
                ref={containerRef}
                className="relative w-full h-[220px] sm:h-[300px] md:h-[340px] flex items-center justify-center overflow-visible my-2"
                style={{ perspective: "1000px" }}
              >
                {WALLPAPER_THEMES.map((theme, idx) => {
                  const rawDist = idx - previewIndex;
                  let modularDist = ((rawDist + count / 2) % count) - count / 2;
                  if (modularDist < -count / 2) modularDist += count;
                  
                  const absDist = Math.abs(modularDist);
                  if (absDist > 2.8) return null;

                  const isCenter = absDist === 0;
                  const sign = modularDist >= 0 ? 1 : -1;
                  
                  const scale = 1.0 / (1.0 + 0.18 * absDist);
                  const zIndex = 30 - Math.round(absDist * 8);
                  const xOffset = sign * (absDist <= 1.0 ? absDist * 160 : 160 + (absDist - 1.0) * 100);
                  const rotateY = sign * -25 * Math.min(1.2, absDist);
                  const opacity = Math.max(0.2, 1.0 - absDist * 0.28);
                  const dimOverlay = Math.min(0.75, absDist * 0.35);

                  const isCurrentlyActive = theme.id === activeTheme.id;

                  return (
                    <motion.div
                      key={theme.id}
                      onClick={() => handleSelectIndex(idx)}
                      animate={{
                        x: xOffset,
                        scale: scale,
                        rotateY: rotateY,
                        zIndex: zIndex,
                        opacity: opacity,
                      }}
                      transition={{
                        duration: 0.42,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`absolute cursor-pointer rounded-2xl overflow-hidden transform-gpu will-change-transform ${
                        isCenter 
                          ? "ring-4 ring-primary shadow-2xl" 
                          : "hover:scale-[1.02] shadow-xl"
                      }`}
                      style={{
                        width: "clamp(220px, 42vw, 480px)",
                        aspectRatio: "16/10",
                        transformStyle: "preserve-3d",
                        backfaceVisibility: "hidden",
                        borderColor: isCenter ? theme.colors.primary : "rgba(65, 47, 59, 0.4)",
                        borderWidth: isCenter ? "2px" : "1px",
                      }}
                    >
                      <div 
                        className="w-full h-full bg-cover bg-center relative"
                        style={{ backgroundImage: `url('/wallpapers/${encodeURIComponent(theme.filename)}')` }}
                      >
                        <div 
                          className="absolute inset-0 transition-opacity duration-300"
                          style={{ 
                            backgroundColor: `rgba(19, 15, 18, ${dimOverlay})`,
                          }} 
                        />

                        {/* Badges */}
                        {isCurrentlyActive && (
                          <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-emerald-500 text-black text-[9px] font-mono font-bold flex items-center gap-1 shadow-lg">
                            <LuCheck className="w-3 h-3" />
                            <span>ACTIVE ON SYSTEM</span>
                          </div>
                        )}

                        {isCenter && !isCurrentlyActive && (
                          <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-primary text-on-primary text-[9px] font-mono font-bold flex items-center gap-1 shadow-lg">
                            <span>PREVIEWING</span>
                          </div>
                        )}

                        <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/75 text-[9px] font-mono text-white/90 border border-white/10">
                          {theme.tag}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Title & Accent Details */}
              <div className="text-center my-3 min-h-[50px] flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPreviewTheme.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="font-mono font-bold text-lg sm:text-xl text-white tracking-wide">
                      {currentPreviewTheme.name}
                    </h3>
                    <p className="font-mono text-xs text-primary font-medium mt-0.5">
                      {currentPreviewTheme.colors.accent_name} · Palette Extracted
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Color Swatch Bar */}
              <div className="w-full max-w-xl bg-black/30 rounded-xl border border-white/5 p-3 mb-4">
                <div className="grid grid-cols-4 gap-2 font-mono text-xs">
                  {[
                    { label: "primary", hex: currentPreviewTheme.colors.primary },
                    { label: "container", hex: currentPreviewTheme.colors.primary_container },
                    { label: "secondary", hex: currentPreviewTheme.colors.secondary },
                    { label: "surface", hex: currentPreviewTheme.colors.surface },
                  ].map((color) => (
                    <div 
                      key={color.label}
                      onClick={() => handleCopyHex(color.hex, color.label)}
                      className="p-2 rounded-lg bg-white/[0.03] border border-white/5 hover:border-primary/50 transition-all cursor-pointer text-center group"
                    >
                      <div 
                        className="w-3.5 h-3.5 rounded-full border border-white/20 mx-auto mb-1" 
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="text-[9px] font-bold text-white/80 uppercase">{color.label}</div>
                      <div className="text-[9px] text-primary font-semibold truncate">{color.hex}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Footer: Navigation & Apply Theme Button */}
              <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/10">
                
                {/* Arrow Navigation */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-2 rounded-xl bg-white/5 hover:bg-primary/20 text-white hover:text-primary transition-colors cursor-pointer"
                    title="Previous (Left Arrow / h)"
                  >
                    <LuChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="font-mono text-xs text-white/50 px-2">
                    {previewIndex + 1} / {count}
                  </span>
                  <button
                    onClick={handleNext}
                    className="p-2 rounded-xl bg-white/5 hover:bg-primary/20 text-white hover:text-primary transition-colors cursor-pointer"
                    title="Next (Right Arrow / l)"
                  >
                    <LuChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Keyboard Helper Badges */}
                <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-white/50">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/80">←</kbd>
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/80">→</kbd> Navigate
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/80">Enter</kbd> Apply
                  </span>
                </div>

                {/* Apply Theme Button */}
                <button
                  onClick={handleApplyTheme}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-mono text-xs font-bold flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <LuCornerDownLeft className="w-3.5 h-3.5" />
                  <span>Apply Theme (Enter)</span>
                </button>

              </div>

            </div>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
