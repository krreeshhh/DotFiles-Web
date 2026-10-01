"use client";

import React, { useState } from "react";
import { 
  LuKeyboard, 
  LuSearch
} from "react-icons/lu";

interface Keybind {
  combo: string[];
  action: string;
  category: "Launchers" | "Window" | "Hardware" | "Workspaces";
  description: string;
}

const KEYBINDINGS: Keybind[] = [
  { combo: ["SUPER", "RETURN"], action: "Open Ghostty Terminal", category: "Launchers", description: "Launches GPU-accelerated Ghostty with 0.20 opacity" },
  { combo: ["SUPER", "SPACE"], action: "Quickshell App Launcher", category: "Launchers", description: "quickshell ipc call shell toggleAppLauncher (Quickshell QML AppLauncher.qml)" },
  { combo: ["SUPER", "E"], action: "Open File Manager", category: "Launchers", description: "Launches Nautilus / Thunar file manager" },
  { combo: ["SUPER", "B"], action: "Open Web Browser", category: "Launchers", description: "Launches Brave Browser" },
  { combo: ["SUPER", "C"], action: "Control Center", category: "Launchers", description: "Toggles Quickshell quick settings and sliders" },
  { combo: ["W"], action: "Wallpaper & Palette Scratchpad", category: "Launchers", description: "Opens floating Cover Flow wallpaper selector. Enter applies theme." },
  { combo: ["SUPER", "T"], action: "Theme Switcher", category: "Launchers", description: "Opens Material You wallpaper and theme switcher" },
  
  { combo: ["SUPER", "Q"], action: "Close Active Window", category: "Window", description: "Closes currently focused Hyprland client" },
  { combo: ["SUPER", "V"], action: "Toggle Floating Mode", category: "Window", description: "Switches window between tiling and floating state" },
  { combo: ["SUPER", "F"], action: "Toggle Fullscreen", category: "Window", description: "Expands client to true fullscreen" },
  { combo: ["SUPER", "M"], action: "Exit Hyprland Session", category: "Window", description: "Terminates compositor and returns to SDDM" },
  { combo: ["SUPER", "H / J / K / L"], action: "Move Focus (Vim Style)", category: "Window", description: "Moves focus left, down, up, or right" },
  { combo: ["SUPER + SHIFT", "H / J / K / L"], action: "Swap Window Position", category: "Window", description: "Moves window position within tiling layout" },
  
  { combo: ["SUPER", "1 - 9"], action: "Switch to Workspace", category: "Workspaces", description: "Focuses workspace index 1 through 9" },
  { combo: ["SUPER + SHIFT", "1 - 9"], action: "Move Window to Workspace", category: "Workspaces", description: "Transfers active window to selected workspace" },
  { combo: ["SUPER", "MOUSE_SCROLL"], action: "Cycle Workspaces", category: "Workspaces", description: "Scrolls through active workspaces sequentially" },
  
  { combo: ["XF86AudioRaiseVolume"], action: "Raise Volume (+5%)", category: "Hardware", description: "wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%+" },
  { combo: ["XF86AudioLowerVolume"], action: "Lower Volume (-5%)", category: "Hardware", description: "wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%-" },
  { combo: ["XF86AudioMute"], action: "Toggle Audio Mute", category: "Hardware", description: "wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle" },
  { combo: ["XF86MonBrightnessUp"], action: "Raise Backlight (+5%)", category: "Hardware", description: "brightnessctl set 5%+" },
  { combo: ["XF86MonBrightnessDown"], action: "Lower Backlight (-5%)", category: "Hardware", description: "brightnessctl set 5%-" },
  { combo: ["SUPER", "F7"], action: "Toggle Caffeine Inhibitor", category: "Hardware", description: "Inhibits system idle and DPMS screen sleep" },
  { combo: ["SUPER", "F8"], action: "Toggle Do Not Disturb", category: "Hardware", description: "Mutes Dunst notifications" },
];

export function KeybindingsMatrix() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredKeybinds = KEYBINDINGS.filter((kb) => {
    const matchesSearch = 
      kb.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kb.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kb.combo.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || kb.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="keybindings" className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/80 border border-primary/40 text-xs font-mono text-primary mb-3">
            <LuKeyboard className="w-3.5 h-3.5" />
            <span>Ergonomic Control</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-on-surface mb-3 sm:mb-4">
            Compositor Keybindings Reference
          </h2>
          <p className="text-on-surface-variant text-xs sm:text-base px-2 sm:px-0">
            Configured for keyboard-centric productivity with unified hotkey bindings across Hyprland, Quickshell, and media services.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          
          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <LuSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input 
              type="text" 
              placeholder="Search keys or actions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-surface border border-outline/60 text-xs font-mono text-on-surface placeholder:text-on-surface-variant focus:outline-hidden focus:border-primary transition-all"
            />
          </div>

          {/* Category Filter Chips with smooth horizontal scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar flex-nowrap">
            {["All", "Launchers", "Window", "Hardware", "Workspaces"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap shrink-0 ${
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
                <tr className="border-b border-outline/40 bg-surface-variant/40 text-on-surface-variant font-mono text-[10px] sm:text-[11px] uppercase tracking-wider">
                  <th className="py-2.5 sm:py-3 px-3 sm:px-4">Key Combination</th>
                  <th className="py-2.5 sm:py-3 px-3 sm:px-4">Action</th>
                  <th className="py-2.5 sm:py-3 px-3 sm:px-4">Category</th>
                  <th className="py-2.5 sm:py-3 px-3 sm:px-4 hidden md:table-cell">Function & Implementation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline/20">
                {filteredKeybinds.length > 0 ? (
                  filteredKeybinds.map((kb, idx) => (
                    <tr key={idx} className="hover:bg-surface-variant/40 transition-colors">
                      {/* Key Combo */}
                      <td className="py-2.5 sm:py-3 px-3 sm:px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                          {kb.combo.map((key, kIdx) => (
                            <kbd 
                              key={kIdx}
                              className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md bg-surface-variant border border-outline/70 font-mono text-[10px] sm:text-[11px] font-semibold text-primary shadow-sm"
                            >
                              {key}
                            </kbd>
                          ))}
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-2.5 sm:py-3 px-3 sm:px-4 font-semibold text-on-surface text-xs">
                        {kb.action}
                      </td>

                      {/* Category */}
                      <td className="py-2.5 sm:py-3 px-3 sm:px-4">
                        <span className="inline-block px-2 py-0.5 rounded-md bg-surface border border-outline/40 text-[10px] font-mono text-on-surface-variant whitespace-nowrap">
                          {kb.category}
                        </span>
                      </td>

                      {/* Description */}
                      <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-on-surface-variant hidden md:table-cell">
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
