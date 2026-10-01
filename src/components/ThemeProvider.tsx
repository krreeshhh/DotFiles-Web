"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { WALLPAPER_THEMES, WallpaperTheme } from "@/lib/theme";

interface ThemeContextType {
  activeTheme: WallpaperTheme;
  setTheme: (theme: WallpaperTheme) => void;
  setThemeById: (id: string) => void;
  scratchpadOpen: boolean;
  setScratchpadOpen: (open: boolean) => void;
  toggleScratchpad: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [activeTheme, setActiveTheme] = useState<WallpaperTheme>(WALLPAPER_THEMES[0]);
  const [scratchpadOpen, setScratchpadOpen] = useState(false);
  const rafRef = useRef<number | null>(null);

  const applyColors = useCallback((theme: WallpaperTheme) => {
    if (typeof document === "undefined") return;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(() => {
      const root = document.documentElement;
      const { colors } = theme;

      root.style.setProperty("--color-primary", colors.primary);
      root.style.setProperty("--color-on-primary", colors.on_primary);
      root.style.setProperty("--color-primary-container", colors.primary_container);
      root.style.setProperty("--color-secondary", colors.secondary);
      root.style.setProperty("--color-background", colors.background);
      root.style.setProperty("--color-surface", colors.surface);
      root.style.setProperty("--color-surface-variant", colors.surface_variant);
      root.style.setProperty("--color-surface-selected", colors.surface_selected);
      root.style.setProperty("--color-on-surface", colors.on_surface);
      root.style.setProperty("--color-on-surface-variant", colors.on_surface_variant);
      root.style.setProperty("--color-outline", colors.outline);
      root.style.setProperty("--color-outline-subtle", colors.outline_subtle);
      root.style.setProperty("--color-error", colors.error);
    });
  }, []);

  const setTheme = useCallback((theme: WallpaperTheme) => {
    setActiveTheme(theme);
    applyColors(theme);
  }, [applyColors]);

  const setThemeById = useCallback((id: string) => {
    const found = WALLPAPER_THEMES.find((t) => t.id === id);
    if (found) {
      setTheme(found);
    }
  }, [setTheme]);

  const toggleScratchpad = useCallback(() => {
    setScratchpadOpen((prev) => !prev);
  }, []);

  // Global 'W' key shortcut to toggle the wallpaper scratchpad
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === "w" || e.key === "W") {
        e.preventDefault();
        setScratchpadOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setScratchpadOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    applyColors(activeTheme);
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [activeTheme, applyColors]);

  return (
    <ThemeContext.Provider 
      value={{ 
        activeTheme, 
        setTheme, 
        setThemeById, 
        scratchpadOpen, 
        setScratchpadOpen, 
        toggleScratchpad 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
