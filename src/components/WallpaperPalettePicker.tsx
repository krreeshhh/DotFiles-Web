"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import { WALLPAPER_THEMES } from "@/lib/theme";
import { motion } from "framer-motion";
import { LuPalette, LuCheck, LuImage, LuSparkles } from "react-icons/lu";

const ALL_WALLPAPERS = [
  "15.png",
  "Blue Girl.png",
  "Focus.png",
  "Gear5 Luffy.png",
  "Horns Red.png",
  "Japanese Neon.png",
  "Lain.png",
  "Makima-Intro.png",
  "Makima.png",
  "Nezuko Kamado.png",
  "Obanai Iguro.png",
  "Rain Dark.png",
  "Red Jacket.png",
  "Reze.png",
  "Shinobu Kochō v1.0.png",
  "Shinobu Kochō v2.0.png",
  "Shinobu Kochō v3.0.png",
  "Shinobu Kochō v4.0.png",
  "Side Red.png",
  "Sword Silver Hair.png",
  "Tokyo Pink.png",
  "Ultrakill.png",
  "Waifu Pink.png",
  "Wall.png",
  "Wings Dark.png",
  "wall1.png",
  "wall2.png"
];

export function WallpaperPalettePicker() {
  const { activeTheme, setTheme } = useTheme();

  return (
    <section id="wallpapers" className="py-20 relative bg-surface/30 border-y border-outline/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/80 border border-primary/40 text-xs font-mono text-primary mb-3">
            <LuPalette className="w-3.5 h-3.5" />
            <span>Dynamic Material You Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-on-surface mb-4">
            Live Palette Extraction & Switching
          </h2>
          <p className="text-on-surface-variant text-sm sm:text-base">
            Every wallpaper below uses the exact mathematical palette computed by <code className="text-primary font-mono">generate-theme.py</code>. Click any card to re-theme the entire website live.
          </p>
        </div>

        {/* Primary Extracted Themes Grid (11 Extracted Wallpapers) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-14">
          {WALLPAPER_THEMES.map((theme) => {
            const isSelected = activeTheme.id === theme.id;
            return (
              <motion.div
                key={theme.id}
                whileHover={{ y: -6 }}
                onClick={() => setTheme(theme)}
                className={`group cursor-pointer rounded-2xl overflow-hidden glass-panel border transition-all duration-300 flex flex-col justify-between ${
                  isSelected 
                    ? "border-primary ring-2 ring-primary/40 shadow-xl shadow-primary/15" 
                    : "border-outline/60 hover:border-outline"
                }`}
              >
                {/* Wallpaper Preview Image */}
                <div 
                  className="w-full h-44 bg-cover bg-center relative"
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
                      className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: theme.colors.primary }}
                      title={`Primary: ${theme.colors.primary}`}
                    />
                    <div 
                      className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: theme.colors.primary_container }}
                      title={`Container: ${theme.colors.primary_container}`}
                    />
                    <div 
                      className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: theme.colors.secondary }}
                      title={`Secondary: ${theme.colors.secondary}`}
                    />
                    <div 
                      className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: theme.colors.surface }}
                      title={`Surface: ${theme.colors.surface}`}
                    />
                    <div 
                      className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: theme.colors.outline }}
                      title={`Outline: ${theme.colors.outline}`}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
