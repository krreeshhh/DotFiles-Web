"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeAtmosphere() {
  const { activeTheme } = useTheme();
  const { aura } = activeTheme;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-5] overflow-hidden select-none gpu-layer">
      
      {/* 1. Dynamic Ambient Aura Color Blobs */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`aura-${activeTheme.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {/* Top Primary Radial Glow */}
          <div 
            className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[500px] rounded-full blur-[100px] sm:blur-[140px] opacity-35"
            style={{ backgroundColor: activeTheme.colors.primary }}
          />

          {/* Bottom Right Secondary Glow */}
          <div 
            className="absolute top-[40%] -right-[10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-25"
            style={{ backgroundColor: activeTheme.colors.secondary }}
          />

          {/* Left Mid Surface Container Accent Glow */}
          <div 
            className="absolute top-[65%] -left-[10%] w-[600px] h-[600px] rounded-full blur-[130px] opacity-20"
            style={{ backgroundColor: activeTheme.colors.primary_container }}
          />
        </motion.div>
      </AnimatePresence>

      {/* 2. Effect-Specific Atmospheric Overlays */}
      <AnimatePresence mode="wait">
        
        {/* SAKURA / BLOSSOM (Nezuko) */}
        {aura.ambientEffect === "sakura" && (
          <motion.div
            key="effect-sakura"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(225,131,194,0.12),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(216,165,202,0.10),transparent_50%)]" />
          </motion.div>
        )}

        {/* CYBERGRID (Japanese Neon) */}
        {aura.ambientEffect === "cybergrid" && (
          <motion.div
            key="effect-cybergrid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: `linear-gradient(to right, ${activeTheme.colors.primary} 1px, transparent 1px), linear-gradient(to bottom, ${activeTheme.colors.primary} 1px, transparent 1px)`,
                backgroundSize: "48px 48px",
                maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)",
                WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)"
              }}
            />
          </motion.div>
        )}

        {/* EMBERS / FLAME (Reze / Makima) */}
        {aura.ambientEffect === "embers" && (
          <motion.div
            key="effect-embers"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(243,161,113,0.12),transparent_70%)]" />
            <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-primary/10 to-transparent" />
          </motion.div>
        )}

        {/* SCANLINES / CRT WIRED (Lain) */}
        {aura.ambientEffect === "scanlines" && (
          <motion.div
            key="effect-scanlines"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)",
                backgroundSize: "100% 4px"
              }}
            />
          </motion.div>
        )}

        {/* CELESTIAL / NIKA LIGHTNING (Luffy / Wings) */}
        {aura.ambientEffect === "celestial" && (
          <motion.div
            key="effect-celestial"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(113,217,243,0.15),transparent_65%)]" />
          </motion.div>
        )}

        {/* AURORA / WISTERIA (Shinobu) */}
        {aura.ambientEffect === "aurora" && (
          <motion.div
            key="effect-aurora"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <div className="absolute -top-20 left-1/4 right-1/4 h-[350px] bg-gradient-to-b from-primary/20 via-secondary/10 to-transparent blur-3xl" />
          </motion.div>
        )}

        {/* MATRIX / RAIN / MINIMAL */}
        {(aura.ambientEffect === "matrix" || aura.ambientEffect === "rain" || aura.ambientEffect === "minimal") && (
          <motion.div
            key={`effect-${aura.ambientEffect}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]" />
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
