"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";
import { WALLPAPER_THEMES, WallpaperTheme } from "@/lib/theme";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { 
  LuChevronLeft, 
  LuChevronRight 
} from "react-icons/lu";

export function WallpaperScratchpad() {
  const { activeTheme, setTheme, scratchpadOpen, setScratchpadOpen } = useTheme();
  
  const initialIndex = Math.max(0, WALLPAPER_THEMES.findIndex(t => t.id === activeTheme.id));
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Synchronize index when scratchpad opens or active theme changes
  useEffect(() => {
    if (scratchpadOpen) {
      const idx = WALLPAPER_THEMES.findIndex(t => t.id === activeTheme.id);
      if (idx !== -1) {
        setCurrentIndex(idx);
      }
    }
  }, [scratchpadOpen, activeTheme.id]);

  const count = WALLPAPER_THEMES.length;
  const currentTheme = WALLPAPER_THEMES[currentIndex] || WALLPAPER_THEMES[0];

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % count);
  }, [count]);

  const handleSelectIndex = useCallback((idx: number) => {
    const normalizedIdx = (idx % count + count) % count;
    setCurrentIndex(normalizedIdx);
  }, [count]);

  // Apply selected wallpaper & theme and close picker
  const handleApply = useCallback(() => {
    const selected = WALLPAPER_THEMES[currentIndex];
    if (selected) {
      setTheme(selected);
      try {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.6 },
          colors: [selected.colors.primary, selected.colors.secondary, "#ffffff"],
        });
      } catch {
        // Ignore canvas errors in headless
      }
      setScratchpadOpen(false);
    }
  }, [currentIndex, setTheme, setScratchpadOpen]);

  // Keyboard navigation matching carousel-picker.py exactly
  useEffect(() => {
    if (!scratchpadOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "ArrowLeft" || 
        e.key === "h" || 
        e.key === "H" || 
        e.key === "ArrowUp" || 
        e.key === "k" || 
        e.key === "K"
      ) {
        e.preventDefault();
        handlePrev();
      } else if (
        e.key === "ArrowRight" || 
        e.key === "l" || 
        e.key === "L" || 
        e.key === "ArrowDown" || 
        e.key === "j" || 
        e.key === "J"
      ) {
        e.preventDefault();
        handleNext();
      } else if (e.key === "PageUp") {
        e.preventDefault();
        setCurrentIndex((prev) => (prev - 3 + count) % count);
      } else if (e.key === "PageDown") {
        e.preventDefault();
        setCurrentIndex((prev) => (prev + 3) % count);
      } else if (e.key === "Home") {
        e.preventDefault();
        setCurrentIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setCurrentIndex(count - 1);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleApply();
      } else if (e.key === "Escape" || e.key === "q" || e.key === "Q") {
        e.preventDefault();
        setScratchpadOpen(false);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0 || e.deltaX > 0) {
        handleNext();
      } else if (e.deltaY < 0 || e.deltaX < 0) {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [scratchpadOpen, handlePrev, handleNext, handleApply, count]);

  return (
    <AnimatePresence>
      {scratchpadOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.20 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center select-none overflow-hidden"
          style={{
            background: "rgba(19, 15, 17, 0.65)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          {/* Clickable Backdrop Outside for Closing */}
          <div 
            className="absolute inset-0 z-0" 
            onClick={() => setScratchpadOpen(false)} 
          />

          {/* ================================================================ */}
          {/* 3D COVER FLOW STAGE (Matching carousel-picker.py on_draw) */}
          {/* ================================================================ */}
          <div 
            ref={containerRef}
            className="relative z-10 w-full flex flex-col items-center justify-center pointer-events-auto"
          >
            {/* 3D Cards Perspective Container */}
            <div 
              className="relative w-full h-[280px] sm:h-[400px] md:h-[460px] flex items-center justify-center overflow-visible"
              style={{ perspective: "1000px" }}
            >
              {WALLPAPER_THEMES.map((theme, idx) => {
                // Modular continuous distance calculation
                const rawDist = idx - currentIndex;
                let modularDist = ((rawDist + count / 2) % count) - count / 2;
                if (modularDist < -count / 2) modularDist += count;
                
                const absDist = Math.abs(modularDist);
                if (absDist > 4.2) return null; // Render cards within visible range

                const isCenter = absDist === 0;
                const sign = modularDist >= 0 ? 1 : -1;
                
                // Exact scaling from carousel-picker.py (scale = 1.0 / (1.0 + 0.165 * dist))
                const scale = 1.0 / (1.0 + 0.165 * absDist);
                const zIndex = 30 - Math.round(absDist * 8);

                // Slot step spacing from carousel-picker.py
                // slot_step_near = card_w * 0.45, slot_step_far = card_w * 0.25
                const xOffset = sign * (absDist <= 1.0 ? absDist * 200 : 200 + (absDist - 1.0) * 110);
                const rotateY = sign * -22 * Math.min(1.2, absDist);
                const cardAlpha = Math.max(0.15, 1.0 - absDist * 0.22);
                
                // Dimming overlay on background cards (dark_alpha = min(0.70, dist * 0.22 + 0.12))
                const darkAlpha = Math.min(0.70, absDist * 0.22 + 0.12);

                return (
                  <motion.div
                    key={theme.id}
                    onClick={() => {
                      if (isCenter) {
                        handleApply();
                      } else {
                        handleSelectIndex(idx);
                      }
                    }}
                    animate={{
                      x: xOffset,
                      scale: scale,
                      rotateY: rotateY,
                      zIndex: zIndex,
                      opacity: cardAlpha,
                    }}
                    transition={{
                      duration: 0.38,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`absolute cursor-pointer rounded-2xl overflow-hidden transform-gpu will-change-transform ${
                      isCenter 
                        ? "shadow-2xl" 
                        : "hover:scale-[1.02] shadow-xl"
                    }`}
                    style={{
                      width: "clamp(260px, 44vw, 640px)",
                      aspectRatio: "16/10",
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      borderColor: isCenter ? "var(--color-primary)" : "rgba(65, 47, 59, 0.40)",
                      borderWidth: isCenter ? "2.8px" : "1px",
                      boxShadow: isCenter 
                        ? "0 0 35px -5px rgba(225, 131, 194, 0.45), 0 15px 35px rgba(0,0,0,0.6)" 
                        : "0 10px 30px rgba(0,0,0,0.5)",
                      transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                    }}
                  >
                    {/* Wallpaper Surface */}
                    <div className="w-full h-full relative overflow-hidden">
                      <Image
                        src={`/wallpapers/${encodeURIComponent(theme.filename)}`}
                        alt={theme.name}
                        fill
                        loading={isCenter ? "eager" : "lazy"}
                        decoding="async"
                        sizes="(max-width: 640px) 80vw, 640px"
                        className="object-cover object-center pointer-events-none"
                      />
                      {/* Dimming overlay on background cards */}
                      {!isCenter && (
                        <div 
                          className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
                          style={{ 
                            backgroundColor: `rgba(10, 8, 9, ${darkAlpha})`,
                          }} 
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* ================================================================ */}
            {/* WALLPAPER TITLE (JetBrainsMono Nerd Font Bold 16) */}
            {/* ================================================================ */}
            <div className="text-center mt-6 sm:mt-9 mb-4 sm:mb-6 min-h-[36px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={currentTheme.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="font-mono font-bold text-xl sm:text-2xl text-white tracking-wide"
                  style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
                >
                  {currentTheme.name}
                </motion.h3>
              </AnimatePresence>
            </div>

            {/* ================================================================ */}
            {/* BOTTOM PILL NAVIGATION BAR (pill_w = 360px, pill_h = 32px) */}
            {/* ================================================================ */}
            <div 
              className="flex items-center justify-between w-[320px] sm:w-[360px] h-8 sm:h-[32px] px-2 rounded-full border shadow-2xl backdrop-blur-xl"
              style={{
                background: "rgba(31, 24, 27, 0.75)",
                borderColor: "rgba(65, 47, 59, 0.50)",
              }}
            >
              {/* Left Arrow Button */}
              <button
                onClick={handlePrev}
                className="w-7 h-6 rounded-full flex items-center justify-center text-primary hover:bg-primary/20 transition-colors cursor-pointer"
                title="Previous (Left Arrow / h)"
              >
                <LuChevronLeft className="w-4 h-4 font-bold" />
              </button>

              {/* Center Status & Keybind Hint */}
              <button
                onClick={handleApply}
                className="flex-1 font-mono text-[11px] sm:text-xs text-white/80 hover:text-white font-medium text-center transition-colors cursor-pointer truncate px-2"
                title="Click or press Enter to apply"
              >
                <span>Enter Apply &nbsp;·&nbsp; Esc Close &nbsp;·&nbsp; {currentIndex + 1}/{count}</span>
              </button>

              {/* Right Arrow Button */}
              <button
                onClick={handleNext}
                className="w-7 h-6 rounded-full flex items-center justify-center text-primary hover:bg-primary/20 transition-colors cursor-pointer"
                title="Next (Right Arrow / l)"
              >
                <LuChevronRight className="w-4 h-4 font-bold" />
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
