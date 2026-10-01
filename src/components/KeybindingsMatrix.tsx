"use client";

import React, { useState } from "react";
import { LuKeyboard, LuSearch, LuSparkles } from "react-icons/lu";

interface Keybind {
  combo: string[];
  action: string;
  category: "Window" | "Launchers" | "Hardware" | "Workspaces";
  description: string;
}

const KEYBINDS: Keybind[] = [
  { combo: ["SUPER", "RETURN"], action: "Launch Terminal", category: "Launchers", description: "Opens Ghostty GPU-accelerated terminal at 0.20 opacity" },
  { combo: ["SUPER", "SPACE"], action: "App Launcher", category: "Launchers", description: "Toggles native Quickshell / Walker application launcher" },
  { combo: ["SUPER", "C"], action: "Control Center", category: "Launchers", description: "Toggles Quickshell Control Center popups and quick settings" },
  { combo: ["SUPER", "E"], action: "File Manager", category: "Launchers", description: "Launches GNOME Nautilus with WhiteSur-dark theme" },
  { combo: ["SUPER", "B"], action: "Web Browser", category: "Launchers", description: "Launches Brave Browser with hardware video acceleration" },
  { combo: ["SUPER", "ESCAPE"], action: "Power Menu", category: "Launchers", description: "Toggles nwg-bar power, suspend, lock, and reboot menu" },
  { combo: ["SUPER", "V"], action: "Clipboard History", category: "Launchers", description: "Opens Clipse floating TUI clipboard history" },
  { combo: ["SUPER", "SHIFT", "S"], action: "Area Screenshot", category: "Launchers", description: "Interactive screenshot selection via grim and slurp" },
  { combo: ["SUPER", "SHIFT", "W"], action: "Wallpaper Carousel", category: "Launchers", description: "Opens 3D OpenGL wallpaper picker and theme extractor" },

  { combo: ["SUPER", "Q"], action: "Close Window", category: "Window", description: "Closes active window safely" },
  { combo: ["SUPER", "F"], action: "Toggle Fullscreen", category: "Window", description: "Toggles true fullscreen for focused window" },
  { combo: ["SUPER", "P"], action: "Pseudo Tiling", category: "Window", description: "Retains original window aspect ratio in tiling tree" },
  { combo: ["SUPER", "J"], action: "Toggle Split", category: "Window", description: "Switches tiling split direction between horizontal and vertical" },
  { combo: ["SUPER", "H / J / K / L"], action: "Focus Navigation", category: "Window", description: "Moves window focus in direction" },
  { combo: ["SUPER", "MOUSE_LEFT"], action: "Move Window", category: "Window", description: "Drags and repositions window interactively" },
  { combo: ["SUPER", "MOUSE_RIGHT"], action: "Resize Window", category: "Window", description: "Resizes window interactively" },

  { combo: ["XF86AudioRaiseVolume", "/ F8"], action: "Volume Up (+5%)", category: "Hardware", description: "Increases volume and triggers Quickshell OSD overlay" },
  { combo: ["XF86AudioLowerVolume", "/ F7"], action: "Volume Down (-5%)", category: "Hardware", description: "Decreases volume and triggers Quickshell OSD overlay" },
  { combo: ["XF86AudioMute"], action: "Mute Audio", category: "Hardware", description: "Toggles audio mute and notifies OSD" },
  { combo: ["XF86MonBrightnessUp"], action: "Brightness Up (+5%)", category: "Hardware", description: "Increases screen backlight via brightnessctl and triggers OSD" },
  { combo: ["XF86MonBrightnessDown"], action: "Brightness Down (-5%)", category: "Hardware", description: "Decreases screen backlight via brightnessctl and triggers OSD" },

  { combo: ["SUPER", "1 - 9"], action: "Switch Workspace", category: "Workspaces", description: "Switches active viewport to workspace 1 through 9" },
  { combo: ["SUPER", "SHIFT", "1 - 9"], action: "Move to Workspace", category: "Workspaces", description: "Silently moves active window to target workspace" },
];

export function KeybindingsMatrix() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredKeybinds = KEYBINDS.filter((kb) => {
    const matchesCategory = selectedCategory === "All" || kb.category === selectedCategory;
    const matchesSearch = 
      kb.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kb.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kb.combo.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="keybindings" className="py-20 relative bg-surface/20 border-t border-outline/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/80 border border-primary/40 text-xs font-mono text-primary mb-3">
            <LuKeyboard className="w-3.5 h-3.5" />
            <span>Ergonomic Control</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-on-surface mb-4">
            Compositor Keybindings Reference
          </h2>
          <p className="text-on-surface-variant text-sm sm:text-base">
            Configured for keyboard-centric productivity with unified hotkey bindings across Hyprland, Quickshell, and media services.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <LuSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input 
              type="text" 
              placeholder="Search keys or actions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-surface border border-outline/60 text-xs font-mono text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-all"
            />
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
            {["All", "Launchers", "Window", "Hardware", "Workspaces"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-primary text-on-primary font-bold shadow-sm shadow-primary/20"
                    : "bg-surface text-on-surface-variant hover:text-on-surface hover:bg-surface-variant border border-outline/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Keybindings Table Grid */}
        <div className="rounded-2xl glass-panel border border-outline/60 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans text-xs">
              <thead>
                <tr className="border-b border-outline/40 bg-surface-variant/40 text-on-surface-variant font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4">Keybinding Combination</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4 hidden md:table-cell">Function & Implementation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline/20">
                {filteredKeybinds.length > 0 ? (
                  filteredKeybinds.map((kb, idx) => (
                    <tr key={idx} className="hover:bg-surface-variant/40 transition-colors">
                      {/* Key Combo */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          {kb.combo.map((key, kIdx) => (
                            <kbd 
                              key={kIdx}
                              className="px-2 py-1 rounded-md bg-surface-variant border border-outline/70 font-mono text-[11px] font-semibold text-primary shadow-sm"
                            >
                              {key}
                            </kbd>
                          ))}
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4 font-semibold text-on-surface">
                        {kb.action}
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4">
                        <span className="inline-block px-2.5 py-0.5 rounded-md bg-surface border border-outline/40 text-[10px] font-mono text-on-surface-variant">
                          {kb.category}
                        </span>
                      </td>

                      {/* Description */}
                      <td className="py-3 px-4 text-on-surface-variant hidden md:table-cell">
                        {kb.description}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-on-surface-variant font-mono text-xs">
                      No keybindings found matching &quot;{searchQuery}&quot;.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
