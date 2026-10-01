"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";
import { WALLPAPER_THEMES, WallpaperTheme } from "@/lib/theme";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LuPalette, 
  LuCheck, 
  LuSparkles, 
  LuChevronLeft, 
  LuChevronRight, 
  LuLayoutGrid, 
  LuLayers, 
  LuCopy,
  LuExternalLink
} from "react-icons/lu";

export function WallpaperPalettePicker() {
  const { activeTheme, setTheme } = useTheme();
  
  // Find current index matching active theme
  const initialIndex = Math.max(0, WALLPAPER_THEMES.findIndex(t => t.id === activeTheme.id));
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Synchronize index when active theme changes externally
  useEffect(() => {
    const idx = WALLPAPER_THEMES.findIndex(t => t.id === activeTheme.id);
    if (idx !== -1 && idx !== currentIndex) {
      setCurrentIndex(idx);
    }
  }, [activeTheme.id]);

  const count = WALLPAPER_THEMES.length;
  const currentTheme = WALLPAPER_THEMES[currentIndex] || WALLPAPER_THEMES[0];

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + count) % count;
    setCurrentIndex(nextIdx);
    setTheme(WALLPAPER_THEMES[nextIdx]);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % count;
    setCurrentIndex(nextIdx);
    setTheme(WALLPAPER_THEMES[nextIdx]);
  };

  const handleSelectIndex = (idx: number) => {
    const normalizedIdx = (idx % count + count) % count;
    setCurrentIndex(normalizedIdx);
    setTheme(WALLPAPER_THEMES[normalizedIdx]);
  };

  const handleCopyHex = (hex: string, label: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(label);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  // Keyboard navigation when in carousel section
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if carousel section is in viewport
      const el = document.getElementById("wallpapers");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView || viewMode !== "carousel") return;

      if (e.key === "ArrowLeft" || e.key === "h" || e.key === "H") {
        handlePrev();
      } else if (e.key === "ArrowRight" || e.key === "l" || e.key === "L") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, viewMode]);

  return (
    <section id="wallpapers" className="py-16 sm:py-24 relative bg-surface/30 border-y border-outline/30 overflow-hidden select-none">
      
      {/* Background ambient lighting matching selected wallpaper palette */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[140px] opacity-25 pointer-events-none transition-colors duration-700"
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

          {/* View Mode Switcher */}
          <div className="inline-flex items-center p-1 rounded-xl bg-surface border border-outline/50 mt-4 sm:mt-6 shadow-inner">
            <button
              onClick={() => setViewMode("carousel")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                viewMode === "carousel"
                  ? "bg-primary text-on-primary font-bold shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <LuLayers className="w-3.5 h-3.5" />
              <span>3D Cover Flow</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                viewMode === "grid"
                  ? "bg-primary text-on-primary font-bold shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <LuLayoutGrid className="w-3.5 h-3.5" />
              <span>Catalog Grid</span>
            </button>
          </div>
        </div>

        {/* ================================================================ */}
        {/* 1. 3D COVER FLOW CAROUSEL (Matching carousel-picker.py) */}
        {/* ================================================================ */}
        {viewMode === "carousel" && (
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
                if (absDist > 3.2) return null; // Render visible cards within distance range

                const isCenter = absDist === 0;
                const sign = modularDist >= 0 ? 1 : -1;
                
                // Physics scaling and horizontal positioning matching carousel-picker.py
                const scale = 1.0 / (1.0 + 0.18 * absDist);
                const zIndex = 30 - Math.round(absDist * 8);
                
                // Responsive card widths
                // Desktop: card width ~540px; Mobile: ~280px
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
                      type: "spring",
                      stiffness: 260,
                      damping: 24,
                    }}
                    className={`absolute cursor-pointer rounded-2xl overflow-hidden shadow-2xl transition-shadow ${
                      isCenter 
                        ? "ring-4 ring-primary/80 shadow-primary/30" 
                        : "hover:scale-[1.03]"
                    }`}
                    style={{
                      width: "clamp(260px, 48vw, 560px)",
                      aspectRatio: "16/10",
                      transformStyle: "preserve-3d",
                      borderColor: isCenter ? theme.colors.primary : "rgba(65, 47, 59, 0.4)",
                      borderWidth: isCenter ? "2.5px" : "1px",
                      boxShadow: isCenter ? `0 0 35px -5px ${theme.colors.primary}66` : "0 10px 30px rgba(0,0,0,0.5)",
                    }}
                  >
                    {/* Wallpaper Image */}
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
                        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-primary text-on-primary text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-lg backdrop-blur-md">
                          <LuCheck className="w-3.5 h-3.5" />
                          <span>ACTIVE THEME</span>
                        </div>
                      )}

                      {/* Tag pill */}
                      <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-mono text-white/90 border border-white/10">
                        {theme.tag}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Title Display matching carousel-picker.py title_log */}
            <div className="text-center mt-6 sm:mt-10 mb-4 sm:mb-6">
              <motion.h3 
                key={currentTheme.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="font-mono font-bold text-xl sm:text-2xl text-on-surface tracking-wide"
                style={{ textShadow: "0 2px 10px rgba(0,0,0,0.7)" }}
              >
                {currentTheme.name}
              </motion.h3>
              <p className="font-mono text-xs text-primary font-medium mt-1">
                {currentTheme.colors.accent_name} · Palette Extracted
              </p>
            </div>

            {/* Bottom Navigation Pill matching carousel-picker.py */}
            <div className="flex items-center justify-between w-[320px] sm:w-[380px] h-9 px-3 rounded-full bg-surface/90 border border-outline/70 shadow-2xl backdrop-blur-xl mb-8">
              
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
            <div className="w-full max-w-2xl bg-surface/80 rounded-2xl border border-outline/50 p-4 shadow-xl backdrop-blur-md">
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
                        className="w-4 h-4 rounded-full border border-white/20 shadow-sm shrink-0" 
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
        )}

        {/* ================================================================ */}
        {/* 2. CATALOG GRID VIEW (All Wallpapers) */}
        {/* ================================================================ */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 mb-8">
            {WALLPAPER_THEMES.map((theme, idx) => {
              const isSelected = activeTheme.id === theme.id;
              return (
                <motion.div
                  key={theme.id}
                  whileHover={{ y: -5 }}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setTheme(theme);
                  }}
                  className={`group cursor-pointer rounded-2xl overflow-hidden glass-panel border transition-all duration-300 flex flex-col justify-between ${
                    isSelected 
                      ? "border-primary ring-2 ring-primary/40 shadow-xl shadow-primary/15" 
                      : "border-outline/60 hover:border-outline"
                  }`}
                >
                  {/* Wallpaper Preview Image */}
                  <div 
                    className="w-full h-40 sm:h-44 bg-cover bg-center relative"
                    style={{ backgroundImage: `url('/wallpapers/${encodeURIComponent(theme.filename)}')` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
                    
                    {/* Active Selection Badge */}
                    {isSelected && (
                      <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-primary text-on-primary text-[10px] font-mono font-bold flex items-center gap-1 shadow-md">
                        <LuCheck className="w-3 h-3" />
                        <span>ACTIVE</span>
                      </div>
                    )}

                    {/* Tag chip */}
                    <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-background/80 backdrop-blur-md text-[10px] font-mono text-primary border border-primary/30">
                      {theme.tag}
                    </div>
                  </div>

                  {/* Theme Details & Color Chips */}
                  <div className="p-3.5 bg-surface text-left">
                    <div className="flex items-center justify-between mb-2.5">
                      <h3 className="font-bold text-xs text-on-surface group-hover:text-primary transition-colors truncate">
                        {theme.name}
                      </h3>
                      <span className="text-[10px] font-mono text-on-surface-variant shrink-0 ml-1">
                        {theme.colors.accent_name}
                      </span>
                    </div>

                    {/* Color Palette Chips */}
                    <div className="flex items-center gap-1.5">
                      <div 
                        className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-white/20 shadow-sm"
                        style={{ backgroundColor: theme.colors.primary }}
                        title={`Primary: ${theme.colors.primary}`}
                      />
                      <div 
                        className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-white/20 shadow-sm"
                        style={{ backgroundColor: theme.colors.primary_container }}
                        title={`Container: ${theme.colors.primary_container}`}
                      />
                      <div 
                        className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-white/20 shadow-sm"
                        style={{ backgroundColor: theme.colors.secondary }}
                        title={`Secondary: ${theme.colors.secondary}`}
                      />
                      <div 
                        className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-white/20 shadow-sm"
                        style={{ backgroundColor: theme.colors.surface }}
                        title={`Surface: ${theme.colors.surface}`}
                      />
                      <div 
                        className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-white/20 shadow-sm"
                        style={{ backgroundColor: theme.colors.outline }}
                        title={`Outline: ${theme.colors.outline}`}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
