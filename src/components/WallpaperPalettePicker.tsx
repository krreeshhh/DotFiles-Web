"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "./ThemeProvider";
import { WALLPAPER_THEMES, WallpaperTheme } from "@/lib/theme";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LuPalette, 
  LuCheck, 
  LuSparkles, 
  LuChevronLeft, 
  LuChevronRight, 
  LuCopy
} from "react-icons/lu";

export function WallpaperPalettePicker() {
  const { activeTheme, setTheme } = useTheme();
  
  // Find current index matching active theme
  const initialIndex = Math.max(0, WALLPAPER_THEMES.findIndex(t => t.id === activeTheme.id));
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Preload all wallpaper images into memory on mount
  useEffect(() => {
    WALLPAPER_THEMES.forEach((theme) => {
      const img = new Image();
      img.src = `/wallpapers/${encodeURIComponent(theme.filename)}`;
    });
  }, []);

  // Synchronize index when active theme changes externally
  useEffect(() => {
    const idx = WALLPAPER_THEMES.findIndex(t => t.id === activeTheme.id);
    if (idx !== -1 && idx !== currentIndex) {
      setCurrentIndex(idx);
    }
  }, [activeTheme.id, currentIndex]);

  const count = WALLPAPER_THEMES.length;
  const currentTheme = WALLPAPER_THEMES[currentIndex] || WALLPAPER_THEMES[0];

  const handlePrev = useCallback(() => {
    const nextIdx = (currentIndex - 1 + count) % count;
    setCurrentIndex(nextIdx);
    setTheme(WALLPAPER_THEMES[nextIdx]);
  }, [currentIndex, count, setTheme]);

  const handleNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % count;
    setCurrentIndex(nextIdx);
    setTheme(WALLPAPER_THEMES[nextIdx]);
  }, [currentIndex, count, setTheme]);

  const handleSelectIndex = useCallback((idx: number) => {
    const normalizedIdx = (idx % count + count) % count;
    setCurrentIndex(normalizedIdx);
    setTheme(WALLPAPER_THEMES[normalizedIdx]);
  }, [count, setTheme]);

  const handleCopyHex = (hex: string, label: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(label);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  // Keyboard navigation when in carousel section
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const el = document.getElementById("wallpapers");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === "ArrowLeft" || e.key === "h" || e.key === "H") {
        handlePrev();
      } else if (e.key === "ArrowRight" || e.key === "l" || e.key === "L") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  return (
    <section id="wallpapers" className="py-16 sm:py-24 relative bg-surface/30 border-y border-outline/30 overflow-hidden select-none">
      
      {/* Background ambient lighting matching selected wallpaper palette */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full blur-[100px] opacity-20 pointer-events-none transition-colors duration-500 will-change-transform"
        style={{ backgroundColor: currentTheme.colors.primary }}
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/80 border border-primary/40 text-xs font-mono text-primary mb-3">
            <LuPalette className="w-3.5 h-3.5" />
            <span>Dynamic Material You Engine</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-on-surface mb-3 sm:mb-4">
            Live Palette Extraction & Switching
          </h2>
          <p className="text-on-surface-variant text-xs sm:text-base px-2 sm:px-0">
            Exact 3D Cover Flow replica of the machine&apos;s native <code className="text-primary font-mono">carousel-picker.py</code> and <code className="text-primary font-mono">generate-theme.py</code> engine.
          </p>
        </div>

        {/* ================================================================ */}
        {/* 3D COVER FLOW CAROUSEL (GPU Accelerated, Zero Lag) */}
        {/* ================================================================ */}
        <div className="relative py-4 sm:py-8 flex flex-col items-center">
          
          {/* 3D Perspective Stage Container */}
          <div 
            ref={containerRef}
            className="relative w-full h-[260px] sm:h-[380px] md:h-[420px] flex items-center justify-center overflow-visible"
            style={{ perspective: "1000px" }}
          >
            {WALLPAPER_THEMES.map((theme, idx) => {
              // Calculate modular continuous distance
              const rawDist = idx - currentIndex;
              let modularDist = ((rawDist + count / 2) % count) - count / 2;
              if (modularDist < -count / 2) modularDist += count;
              
              const absDist = Math.abs(modularDist);
              if (absDist > 2.8) return null; // Render only visible cards in view window

              const isCenter = absDist === 0;
              const sign = modularDist >= 0 ? 1 : -1;
              
              // Physics scaling and horizontal positioning
              const scale = 1.0 / (1.0 + 0.18 * absDist);
              const zIndex = 30 - Math.round(absDist * 8);
              
              // Positioning offsets
              const xOffset = sign * (absDist <= 1.0 ? absDist * 180 : 180 + (absDist - 1.0) * 110);
              const rotateY = sign * -25 * Math.min(1.2, absDist);
              const opacity = Math.max(0.2, 1.0 - absDist * 0.28);
              const dimOverlay = Math.min(0.75, absDist * 0.35);

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
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`absolute cursor-pointer rounded-2xl overflow-hidden transform-gpu will-change-transform ${
                    isCenter 
                      ? "ring-4 ring-primary/90 shadow-2xl" 
                      : "hover:scale-[1.02] shadow-xl"
                  }`}
                  style={{
                    width: "clamp(260px, 48vw, 560px)",
                    aspectRatio: "16/10",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    borderColor: isCenter ? theme.colors.primary : "rgba(65, 47, 59, 0.4)",
                    borderWidth: isCenter ? "2px" : "1px",
                    transition: "border-color 0.4s ease, ring-color 0.4s ease",
                  }}
                >
                  {/* Wallpaper Image Container */}
                  <div 
                    className="w-full h-full bg-cover bg-center relative"
                    style={{ backgroundImage: `url('/wallpapers/${encodeURIComponent(theme.filename)}')` }}
                  >
                    {/* Dimming overlay on background cards */}
                    <div 
                      className="absolute inset-0 transition-opacity duration-300"
                      style={{ 
                        backgroundColor: `rgba(19, 15, 18, ${dimOverlay})`,
                      }} 
                    />

                    {/* Active Center Badge */}
                    {isCenter && (
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-primary text-on-primary text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-lg backdrop-blur-xs">
                        <LuCheck className="w-3.5 h-3.5" />
                        <span>ACTIVE THEME</span>
                      </div>
                    )}

                    {/* Tag pill */}
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 text-[10px] font-mono text-white/90 border border-white/10">
                      {theme.tag}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Title Display with Smooth Fade & Slide */}
          <div className="text-center mt-6 sm:mt-10 mb-4 sm:mb-6 min-h-[58px] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTheme.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <h3 className="font-mono font-bold text-xl sm:text-2xl text-on-surface tracking-wide">
                  {currentTheme.name}
                </h3>
                <p className="font-mono text-xs text-primary font-medium mt-1">
                  {currentTheme.colors.accent_name} · Palette Extracted
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Navigation Pill */}
          <div className="flex items-center justify-between w-[320px] sm:w-[380px] h-9 px-3 rounded-full bg-surface/90 border border-outline/70 shadow-xl backdrop-blur-md mb-8">
            
            {/* Left Arrow */}
            <button
              onClick={handlePrev}
              className="p-1 rounded-full text-primary hover:bg-primary/20 transition-colors cursor-pointer"
              title="Previous Wallpaper (Left Arrow)"
            >
              <LuChevronLeft className="w-4 h-4" />
            </button>

            {/* Status & Keybind Hint */}
            <div className="font-mono text-[11px] text-on-surface-variant font-medium text-center">
              <span>Enter Apply · {currentIndex + 1}/{count}</span>
            </div>

            {/* Right Arrow */}
            <button
              onClick={handleNext}
              className="p-1 rounded-full text-primary hover:bg-primary/20 transition-colors cursor-pointer"
              title="Next Wallpaper (Right Arrow)"
            >
              <LuChevronRight className="w-4 h-4" />
            </button>

          </div>

          {/* Live Extracted Color Swatch Bar */}
          <div className="w-full max-w-2xl bg-surface/80 rounded-2xl border border-outline/50 p-4 shadow-lg backdrop-blur-xs">
            <div className="flex items-center justify-between border-b border-outline/30 pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <LuSparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="font-mono text-xs font-bold text-on-surface">Material You Dynamic Tokens</span>
              </div>
              <span className="font-mono text-[11px] text-primary font-semibold">
                {copiedColor ? `Copied ${copiedColor}!` : "Click swatch to copy hex"}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
              {[
                { label: "primary", hex: currentTheme.colors.primary, desc: "Accent & Active Glow" },
                { label: "container", hex: currentTheme.colors.primary_container, desc: "Cards & Highlights" },
                { label: "secondary", hex: currentTheme.colors.secondary, desc: "Secondary Accent" },
                { label: "surface", hex: currentTheme.colors.surface, desc: "Base Surfaces" },
              ].map((color) => (
                <div 
                  key={color.label}
                  onClick={() => handleCopyHex(color.hex, color.label)}
                  className="p-2.5 rounded-xl bg-background/80 border border-outline/40 hover:border-primary/60 transition-all cursor-pointer group text-left"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div 
                      className="w-4 h-4 rounded-full border border-white/20 shadow-xs shrink-0" 
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-[11px] font-bold text-on-surface uppercase group-hover:text-primary transition-colors">{color.label}</span>
                  </div>
                  <div className="text-[10px] text-primary font-semibold truncate">{color.hex}</div>
                  <div className="text-[9px] text-on-surface-variant truncate">{color.desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
