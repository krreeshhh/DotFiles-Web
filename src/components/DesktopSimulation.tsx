"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LuTerminal, 
  LuWifi, 
  LuBluetooth, 
  LuBatteryCharging, 
  LuVolume2, 
  LuSun, 
  LuCoffee, 
  LuSlidersHorizontal, 
  LuFolder, 
  LuGlobe, 
  LuCode, 
  LuMessageSquare, 
  LuX, 
  LuSearch, 
  LuMessageCircle 
} from "react-icons/lu";
import { 
  SiTelegram, 
  SiSpotify, 
  SiBrave 
} from "react-icons/si";

export function DesktopSimulation() {
  const { activeTheme } = useTheme();
  const [activeWorkspace, setActiveWorkspace] = useState(1);
  const [controlCenterOpen, setControlCenterOpen] = useState(false);
  const [launcherOpen, setLauncherOpen] = useState(false);
  const [activeTerminalTab, setActiveTerminalTab] = useState<"fastfetch" | "hyprctl" | "verify">("fastfetch");
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(60);
  const [caffeineActive, setCaffeineActive] = useState(false);
  const [formattedTime, setFormattedTime] = useState("09:08 PM  Thu 01");
  const [shortTime, setShortTime] = useState("09:08 PM");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours() % 12 || 12).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const dayName = days[now.getDay()];
      const dayNum = String(now.getDate()).padStart(2, '0');
      setFormattedTime(`${hours}:${minutes} ${ampm}  ${dayName} ${dayNum}`);
      setShortTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="preview" className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/80 border border-primary/40 text-xs font-mono text-primary mb-3">
            <span>Live Desktop Canvas</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-on-surface mb-3 sm:mb-4">
            Pixel-Perfect System Environment
          </h2>
          <p className="text-on-surface-variant text-xs sm:text-base px-2 sm:px-0">
            Reproducing the exact continuous edge-to-edge Quickshell bar, curved corner fillets, borderless Ghostty terminal, and Material You glowing active window border.
          </p>
        </div>

        {/* ================================================================ */}
        {/* DESKTOP CANVAS CONTAINER */}
        {/* ================================================================ */}
        <div className="relative w-full h-[520px] sm:h-[600px] lg:h-[660px] rounded-2xl overflow-hidden border border-outline/70 shadow-2xl flex flex-col justify-between select-none bg-background">
          
          {/* Smooth Wallpaper Crossfade & Scale Transition */}
          <AnimatePresence initial={false}>
            <motion.div
              key={activeTheme.id}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-cover bg-center will-change-transform transform-gpu pointer-events-none z-0"
              style={{ 
                backgroundImage: `url('/wallpapers/${encodeURIComponent(activeTheme.filename)}')` 
              }}
            />
          </AnimatePresence>

          {/* Subtle wallpaper darkening for depth */}
          <div className="absolute inset-0 bg-background/25 backdrop-blur-[1px] pointer-events-none z-10" />

          {/* ================================================================ */}
          {/* REAL QUICKSHELL EDGE-TO-EDGE BAR (Height: 36px) */}
          {/* ================================================================ */}
          <div className="relative z-30 w-full">
            <div 
              className="w-full h-9 px-2 sm:px-4 flex items-center justify-between border-b transition-all"
              style={{
                background: "rgba(19, 15, 18, 0.65)",
                backdropFilter: "blur(18px)",
                borderColor: "rgba(255, 255, 255, 0.05)"
              }}
            >
              
              {/* LEFT: Dynamic Workspace Dots/Pill & Chat Button */}
              <div className="flex items-center gap-1.5 sm:gap-3">
                {/* Workspaces 1 to 5: Dot/Expanding Pill Animation */}
                <div className="flex items-center gap-1 sm:gap-1.5 py-1">
                  {[1, 2, 3, 4, 5].map((ws) => {
                    const isFocused = activeWorkspace === ws;
                    return (
                      <button
                        key={ws}
                        onClick={() => setActiveWorkspace(ws)}
                        className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                          isFocused
                            ? "w-4 sm:w-6 bg-primary shadow-sm"
                            : "w-1.5 sm:w-2 bg-white/40 hover:bg-white/70"
                        }`}
                        title={`Workspace ${ws}`}
                      />
                    );
                  })}
                </div>

                {/* Chat Bubble / Clipse Trigger */}
                <button 
                  onClick={() => setLauncherOpen(true)}
                  className="p-1 rounded-lg text-white/70 hover:text-primary transition-colors"
                  title="Chat & Launcher"
                >
                  <LuMessageCircle className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* CENTER: Exact Quickshell Clock.qml */}
              <div className="hidden sm:block font-mono font-bold text-xs text-on-surface tracking-wider">
                <span>{formattedTime}</span>
              </div>
              <div className="sm:hidden font-mono font-bold text-[10px] text-on-surface tracking-wider">
                <span>{shortTime}</span>
              </div>

              {/* RIGHT: Tray Drawer & Status Cluster */}
              <div className="flex items-center gap-1.5 sm:gap-3">
                
                {/* System Tray Drawer Icons */}
                <div className="hidden md:flex items-center gap-2.5 text-white/60 text-xs pr-2 border-r border-white/10">
                  <span className="text-[10px] font-mono">⎵</span>
                  <SiTelegram className="w-3 h-3 hover:text-sky-400 cursor-pointer transition-colors" />
                  <SiSpotify className="w-3 h-3 hover:text-emerald-400 cursor-pointer transition-colors" />
                  <SiBrave className="w-3 h-3 hover:text-orange-400 cursor-pointer transition-colors" />
                </div>

                {/* Status Cluster: Volume, Sun, Battery, Control Center */}
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-mono text-on-surface">
                  <span className="flex items-center gap-1 text-white/80">
                    <LuVolume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
                    <span className="text-[10px] sm:text-xs">{volume}%</span>
                  </span>

                  <span className="hidden sm:flex items-center gap-1 text-white/80">
                    <LuSun className="w-3.5 h-3.5 text-primary" />
                    <span>{brightness}%</span>
                  </span>

                  <span className="flex items-center gap-1 text-white/80">
                    <LuBatteryCharging className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
                    <span className="text-[10px] sm:text-xs">93%</span>
                  </span>

                  <button 
                    onClick={() => setControlCenterOpen(!controlCenterOpen)}
                    className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-primary transition-all cursor-pointer"
                    title="SUPER + C (Control Center)"
                  >
                    <LuSlidersHorizontal className="w-3.5 h-3.5 text-primary" />
                  </button>
                </div>

              </div>

            </div>
          </div>

          {/* ================================================================ */}
          {/* MAIN HYPRLAND VIEWPORT: Gaps & Glowing Tiled Ghostty Terminal */}
          {/* ================================================================ */}
          <div className="relative z-10 flex-1 p-2 sm:p-4 lg:p-5 flex items-stretch justify-center overflow-hidden">
            
            {/* Full-size Tiled Ghostty Terminal (Matching real Hyprland window) */}
            <motion.div 
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full rounded-xl overflow-hidden flex flex-col text-left transition-all duration-300"
              style={{ 
                background: "rgba(19, 15, 18, 0.35)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid var(--color-primary)",
                boxShadow: "0 0 20px -3px rgba(225, 131, 194, 0.3)"
              }}
            >
              {/* Borderless Terminal Header Bar with Command Tabs */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 px-3 sm:px-4 py-2 border-b border-white/5 bg-black/20">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-primary font-bold">●</span>
                  <span className="font-mono text-[11px] sm:text-xs text-on-surface-variant font-medium truncate">
                    Krish@Reze: ~/Dotfiles
                  </span>
                </div>

                {/* Simulated Commands */}
                <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-0.5 sm:pb-0 no-scrollbar">
                  <button 
                    onClick={() => setActiveTerminalTab("fastfetch")}
                    className={`px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-mono transition-colors shrink-0 ${
                      activeTerminalTab === "fastfetch" 
                        ? "bg-primary text-on-primary font-bold" 
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    fastfetch
                  </button>
                  <button 
                    onClick={() => setActiveTerminalTab("hyprctl")}
                    className={`px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-mono transition-colors shrink-0 ${
                      activeTerminalTab === "hyprctl" 
                        ? "bg-primary text-on-primary font-bold" 
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    hyprctl
                  </button>
                  <button 
                    onClick={() => setActiveTerminalTab("verify")}
                    className={`px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-mono transition-colors shrink-0 ${
                      activeTerminalTab === "verify" 
                        ? "bg-primary text-on-primary font-bold" 
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    verify.sh
                  </button>
                </div>
              </div>

              {/* Terminal Screen Body */}
              <div className="p-3 sm:p-5 font-mono text-[11px] sm:text-xs leading-relaxed text-on-surface flex-1 overflow-y-auto">
                {activeTerminalTab === "fastfetch" && (
                  <div className="space-y-1.5">
                    <p className="text-white/60">$ fastfetch --pipe</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 pt-1">
                      <p><span className="text-primary font-bold">OS:</span> Arch Linux x86_64</p>
                      <p><span className="text-primary font-bold">Host:</span> Victus by HP Gaming Laptop</p>
                      <p><span className="text-primary font-bold">Kernel:</span> Linux 6.12.74-1-lts</p>
                      <p><span className="text-primary font-bold">Uptime:</span> 3 hours, 42 mins</p>
                      <p><span className="text-primary font-bold">WM:</span> Hyprland 0.54.1 (Lua Native)</p>
                      <p><span className="text-primary font-bold">Shell:</span> Quickshell (Modular QML)</p>
                      <p><span className="text-primary font-bold">Terminal:</span> Ghostty (0.20 Opacity)</p>
                      <p><span className="text-primary font-bold">Theme:</span> Material You ({activeTheme.colors.accent_name})</p>
                      <p><span className="text-primary font-bold">Icons:</span> WhiteSur-dark</p>
                      <p><span className="text-primary font-bold">Cursor:</span> Bibata-Modern-Ice</p>
                      <p><span className="text-primary font-bold">GPU:</span> NVIDIA RTX 2050 Mobile</p>
                      <p><span className="text-primary font-bold">Memory:</span> 3.82 GiB / 15.34 GiB</p>
                    </div>

                    <div className="pt-3 flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-[#e183c2]" />
                      <span className="w-3 h-3 rounded bg-[#d8a5ca]" />
                      <span className="w-3 h-3 rounded bg-[#401b34]" />
                      <span className="w-3 h-3 rounded bg-[#1f181d]" />
                      <span className="w-3 h-3 rounded bg-[#412f3b]" />
                      <span className="w-3 h-3 rounded bg-[#54d6eb]" />
                      <span className="w-3 h-3 rounded bg-[#71d9f3]" />
                    </div>

                    <p className="pt-2 text-emerald-400">$ echo &quot;Ready for deployment on fresh Arch install.&quot;</p>
                  </div>
                )}

                {activeTerminalTab === "hyprctl" && (
                  <div className="space-y-1.5">
                    <p className="text-white/60">$ hyprctl version</p>
                    <p className="text-emerald-400">Hyprland 0.54.1 built from branch main at commit 461a297</p>
                    <p className="text-white/60 pt-2">$ hyprctl monitors</p>
                    <p>Monitor eDP-1 (ID 0): 1920x1080@144.00Hz at 0x0</p>
                    <p className="text-primary font-semibold">active workspace: {activeWorkspace} (DP-1)</p>
                    <p>focused window: class: com.mitchellh.ghostty, title: Krish@Reze: ~/Dotfiles</p>
                  </div>
                )}

                {activeTerminalTab === "verify" && (
                  <div className="space-y-1 text-emerald-300">
                    <p className="text-white/60">$ ./scripts/verify.sh</p>
                    <p>[1. Manifests] ✔ 5/5 Passed</p>
                    <p>[2. Packages] ✔ 13/13 Passed (nautilus, brave)</p>
                    <p>[3. Hyprland Config] ✔ 8/8 Passed (Lua API, PiP daemon)</p>
                    <p>[4. Quickshell Shell] ✔ 11/11 Passed (Modular Bar, OSD)</p>
                    <p>[5. Themes & Wallpapers] ✔ 10/10 Passed (SDDM, GRUB)</p>
                    <p className="text-primary font-bold pt-1">TEST RESULTS: 72/72 checks passed (0 failures)</p>
                  </div>
                )}
              </div>
            </motion.div>

          </div>

          {/* ================================================================ */}
          {/* POPUP 1: Quickshell Control Center Modal */}
          {/* ================================================================ */}
          <AnimatePresence>
            {controlCenterOpen && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: -15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                className="absolute top-11 right-2 left-2 sm:left-auto sm:right-3 z-40 w-auto sm:w-76 max-w-xs mx-auto rounded-2xl p-4 shadow-2xl backdrop-blur-2xl text-left border"
                style={{ 
                  background: "rgba(31, 24, 29, 0.96)",
                  borderColor: "var(--color-outline)"
                }}
              >
                <div className="flex items-center justify-between border-b border-outline/40 pb-2 mb-3">
                  <span className="text-xs font-mono font-bold text-primary flex items-center gap-1.5">
                    <LuSlidersHorizontal className="w-4 h-4" /> Control Center
                  </span>
                  <button 
                    onClick={() => setControlCenterOpen(false)}
                    className="p-1 rounded-lg hover:bg-surface-variant text-on-surface-variant hover:text-on-surface"
                  >
                    <LuX className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick Toggles */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <button className="flex flex-col items-center justify-center p-2 rounded-xl bg-primary text-on-primary font-semibold text-xs transition-all shadow-sm">
                    <LuWifi className="w-3.5 h-3.5 mb-1" />
                    <span>Wi-Fi</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-2 rounded-xl bg-surface-variant text-on-surface hover:bg-surface-selected text-xs transition-all border border-outline/30">
                    <LuBluetooth className="w-3.5 h-3.5 mb-1 text-primary" />
                    <span>Bluetooth</span>
                  </button>
                  <button 
                    onClick={() => setCaffeineActive(!caffeineActive)}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl text-xs transition-all border ${
                      caffeineActive 
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/50 font-bold" 
                        : "bg-surface-variant text-on-surface hover:bg-surface-selected border-outline/30"
                    }`}
                  >
                    <LuCoffee className="w-3.5 h-3.5 mb-1" />
                    <span>Caffeine</span>
                  </button>
                </div>

                {/* Sliders: Brightness & Volume */}
                <div className="space-y-3 mb-2">
                  <div>
                    <div className="flex justify-between text-xs text-on-surface-variant font-mono mb-1">
                      <span className="flex items-center gap-1"><LuSun className="w-3 h-3 text-primary" /> Brightness</span>
                      <span>{brightness}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="100" 
                      value={brightness}
                      onChange={(e) => setBrightness(Number(e.target.value))}
                      className="w-full accent-primary h-1.5 bg-surface-variant rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-on-surface-variant font-mono mb-1">
                      <span className="flex items-center gap-1"><LuVolume2 className="w-3 h-3 text-primary" /> Audio Volume</span>
                      <span>{volume}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="w-full accent-primary h-1.5 bg-surface-variant rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ================================================================ */}
          {/* POPUP 2: Quickshell Native App Launcher Modal */}
          {/* ================================================================ */}
          <AnimatePresence>
            {launcherOpen && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 z-40 bg-background/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
              >
                <div 
                  className="w-full max-w-md rounded-2xl glass-panel border border-outline p-4 sm:p-5 shadow-2xl"
                  style={{ background: "rgba(31, 24, 29, 0.96)" }}
                >
                  <div className="flex items-center justify-between pb-2.5 border-b border-outline/40 mb-3 sm:mb-4">
                    <div className="flex items-center gap-2 text-primary font-mono text-xs sm:text-sm font-bold truncate mr-2">
                      <LuSearch className="w-4 h-4 shrink-0" />
                      <span className="truncate">Application Launcher</span>
                    </div>
                    <button 
                      onClick={() => setLauncherOpen(false)}
                      className="p-1 rounded-lg hover:bg-surface-variant text-on-surface-variant shrink-0"
                    >
                      <LuX className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Search Bar Input */}
                  <div className="relative mb-3 sm:mb-4">
                    <input 
                      type="text" 
                      placeholder="Type to search..."
                      className="w-full px-3.5 py-2 rounded-xl bg-surface border border-outline/60 text-xs font-mono text-on-surface placeholder:text-on-surface-variant focus:outline-hidden focus:border-primary"
                      autoFocus
                    />
                  </div>

                  {/* App Grid */}
                  <div className="grid grid-cols-2 gap-2 text-left">
                    {[
                      { name: "Ghostty", desc: "GPU Terminal", icon: LuTerminal },
                      { name: "Nautilus", desc: "Files", icon: LuFolder },
                      { name: "Brave", desc: "Browser", icon: LuGlobe },
                      { name: "VS Code", desc: "Editor", icon: LuCode },
                      { name: "Discord", desc: "Chat", icon: LuMessageSquare },
                      { name: "Clipse", desc: "Clipboard", icon: LuSlidersHorizontal },
                    ].map((app) => (
                      <div 
                        key={app.name}
                        onClick={() => setLauncherOpen(false)}
                        className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-surface-variant transition-colors cursor-pointer border border-transparent hover:border-outline/40"
                      >
                        <div className="w-7 h-7 rounded-lg bg-primary-container/80 flex items-center justify-center text-primary shrink-0">
                          <app.icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="truncate">
                          <p className="text-xs font-semibold text-on-surface truncate">{app.name}</p>
                          <p className="text-[10px] text-on-surface-variant truncate">{app.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Interactive Hint */}
          <div className="relative z-10 px-3 py-1.5 text-center text-[10px] sm:text-[11px] font-mono text-on-surface-variant/70 bg-black/40 border-t border-white/5 truncate">
            <span>Tip: Click workspace dots, terminal tabs, or settings icon to interact</span>
          </div>

        </div>

      </div>
    </section>
  );
}
