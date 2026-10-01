"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LuTerminal, 
  LuMessageCircle, 
  LuMusic, 
  LuPlay, 
  LuPause, 
  LuFolder, 
  LuCoffee, 
  LuBell, 
  LuBluetooth, 
  LuWifi, 
  LuVolume2, 
  LuVolumeX, 
  LuSun, 
  LuBatteryCharging, 
  LuSlidersHorizontal, 
  LuSearch, 
  LuX, 
  LuCheck, 
  LuCopy, 
  LuExternalLink, 
  LuPower, 
  LuRefreshCw, 
  LuMoon, 
  LuSparkles,
  LuPin
} from "react-icons/lu";
import { 
  SiTelegram, 
  SiSpotify, 
  SiBrave, 
  SiGithub, 
  SiArchlinux 
} from "react-icons/si";

export function Navbar() {
  const { activeTheme } = useTheme();

  // Navigation & Workspace State
  const [activeWorkspace, setActiveWorkspace] = useState(1);
  const [formattedTime, setFormattedTime] = useState("09:20 PM  Thu 01");
  const [shortTime, setShortTime] = useState("09:20 PM");

  // Popups & Drawer States
  const [controlCenterOpen, setControlCenterOpen] = useState(false);
  const [appLauncherOpen, setAppLauncherOpen] = useState(false);
  const [ledgeOpen, setLedgeOpen] = useState(false);
  const [clipseOpen, setClipseOpen] = useState(false);
  const [trayExpanded, setTrayExpanded] = useState(true);

  // Hardware Status State
  const [isPlaying, setIsPlaying] = useState(true);
  const [caffeineActive, setCaffeineActive] = useState(false);
  const [dndActive, setDndActive] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  // Live Clock Synchronization matching Clock.qml
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours() % 12 || 12).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const dayName = days[now.getDay()];
      const dayNum = String(now.getDate()).padStart(2, "0");
      setFormattedTime(`${hours}:${minutes} ${ampm}  ${dayName} ${dayNum}`);
      setShortTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update active workspace based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const previewEl = document.getElementById("preview");
      const wallpapersEl = document.getElementById("wallpapers");
      const archEl = document.getElementById("architecture");
      const keysEl = document.getElementById("keybindings");
      const installEl = document.getElementById("install");

      if (installEl && scrollPos >= installEl.offsetTop) {
        setActiveWorkspace(5);
      } else if (keysEl && scrollPos >= keysEl.offsetTop) {
        setActiveWorkspace(4);
      } else if (archEl && scrollPos >= archEl.offsetTop) {
        setActiveWorkspace(3);
      } else if (wallpapersEl && scrollPos >= wallpapersEl.offsetTop) {
        setActiveWorkspace(2);
      } else {
        setActiveWorkspace(1);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWorkspaceClick = (wsId: number) => {
    setActiveWorkspace(wsId);
    const targetMap: Record<number, string> = {
      1: "#preview",
      2: "#wallpapers",
      3: "#architecture",
      4: "#keybindings",
      5: "#install",
    };
    const targetId = targetMap[wsId];
    if (targetId) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <>
      {/* ==================================================================== */}
      {/* 1. TOPBAR CONTAINER (Height: 36px, Edge-to-Edge) */}
      {/* ==================================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 h-[36px] select-none transition-all duration-300">
        
        {/* Main 36px Top Bar Background with Glassmorphism */}
        <div 
          className="absolute inset-0 h-[36px] border-b flex items-center justify-between px-2 sm:px-3 overflow-hidden"
          style={{
            background: "rgba(19, 15, 18, 0.75)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderColor: "rgba(65, 47, 59, 0.4)",
          }}
        >
          {/* ================================================================ */}
          {/* LEFT MODULES: Workspaces (1-5) + Chat/Clipse Button + Launcher */}
          {/* ================================================================ */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 z-10">
            {/* Arch Logo / App Launcher trigger */}
            <button
              onClick={() => setAppLauncherOpen(true)}
              className="p-1 rounded-md text-white/70 hover:text-primary hover:bg-white/5 transition-all"
              title="Launch Apps (SUPER + SPACE)"
            >
              <SiArchlinux className="w-3.5 h-3.5" />
            </button>

            {/* Workspaces 1-5 Indicator matching Workspaces.qml */}
            <div className="flex items-center gap-1 sm:gap-1.5 py-1">
              {[1, 2, 3, 4, 5].map((ws) => {
                const isFocused = activeWorkspace === ws;
                return (
                  <button
                    key={ws}
                    onClick={() => handleWorkspaceClick(ws)}
                    className={`h-[7px] rounded-full transition-all duration-200 cursor-pointer ${
                      isFocused
                        ? "w-[18px] sm:w-[24px] bg-primary shadow-[0_0_10px_rgba(225,131,194,0.6)]"
                        : "w-[6px] sm:w-[7px] bg-white/35 hover:bg-white/70"
                    }`}
                    title={`Workspace ${ws}: ${
                      ws === 1 ? "Desktop Simulation" :
                      ws === 2 ? "Theme Engine" :
                      ws === 3 ? "Architecture" :
                      ws === 4 ? "Keybindings Matrix" : "Installer"
                    }`}
                  />
                );
              })}
            </div>

            {/* Chat / Clipse Trigger matching ChatButton.qml */}
            <button 
              onClick={() => setClipseOpen(!clipseOpen)}
              className={`p-1 rounded-md transition-colors ${
                clipseOpen ? "text-primary bg-white/10" : "text-white/70 hover:text-primary hover:bg-white/5"
              }`}
              title="Clipse Clipboard & Quick Notes"
            >
              <LuMessageCircle className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* ================================================================ */}
          {/* CENTER MODULE: Clock.qml Centered */}
          {/* ================================================================ */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hidden md:flex absolute left-1/2 -translate-x-1/2 font-mono font-bold text-xs sm:text-[13px] text-white tracking-wider cursor-pointer hover:text-primary transition-colors items-center gap-1.5 whitespace-nowrap select-none"
            title="Scroll to Top"
          >
            <span>{formattedTime}</span>
          </div>

          {/* Compact Clock for Tablet / Intermediate viewports */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hidden min-[540px]:flex md:hidden absolute left-1/2 -translate-x-1/2 font-mono font-bold text-[11px] text-white tracking-wider cursor-pointer hover:text-primary transition-colors items-center whitespace-nowrap select-none"
            title="Scroll to Top"
          >
            <span>{shortTime}</span>
          </div>

          {/* ================================================================ */}
          {/* RIGHT MODULES: Ledge, MiniPlayer, Tray Drawer, Status Cluster */}
          {/* ================================================================ */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 z-10">
            
            {/* Ledge Widget matching LedgeWidget.qml */}
            <button
              onClick={() => setLedgeOpen(!ledgeOpen)}
              className={`hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded-md text-xs font-mono transition-colors ${
                ledgeOpen ? "bg-primary/20 text-primary border border-primary/30" : "text-white/70 hover:text-primary hover:bg-white/5"
              }`}
              title="omarchy-ledge Pin Drawer"
            >
              <LuFolder className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold">3</span>
            </button>

            {/* Mini Player matching MiniPlayer.qml */}
            <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/[0.04] text-xs font-mono">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-primary hover:scale-110 transition-transform"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <LuMusic className="w-3 h-3 animate-pulse" /> : <LuPlay className="w-3 h-3" />}
              </button>
              <span className="text-[11px] text-white/80 truncate max-w-[110px] xl:max-w-[140px]">
                {isPlaying ? "YOASOBI - Idol" : "Paused"}
              </span>
            </div>

            {/* System Tray Drawer matching TrayDrawer.qml */}
            <div className="hidden md:flex items-center gap-2 text-white/60 text-xs px-1.5 border-r border-white/10">
              <button
                onClick={() => setTrayExpanded(!trayExpanded)}
                className="hover:text-primary transition-colors"
                title="Toggle Tray"
              >
                <LuSlidersHorizontal className="w-3 h-3" />
              </button>
              {trayExpanded && (
                <div className="flex items-center gap-2">
                  <a href="https://t.me" target="_blank" rel="noreferrer" title="Telegram" className="hover:text-sky-400 transition-colors">
                    <SiTelegram className="w-3 h-3" />
                  </a>
                  <a href="https://open.spotify.com" target="_blank" rel="noreferrer" title="Spotify" className="hover:text-emerald-400 transition-colors">
                    <SiSpotify className="w-3 h-3" />
                  </a>
                  <a href="https://brave.com" target="_blank" rel="noreferrer" title="Brave" className="hover:text-orange-400 transition-colors">
                    <SiBrave className="w-3 h-3" />
                  </a>
                  <a href="https://github.com/krreeshhh/DotFiles" target="_blank" rel="noreferrer" title="GitHub Repository" className="hover:text-white transition-colors">
                    <SiGithub className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            {/* Hardware Status Cluster matching StatusCluster.qml */}
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-mono text-on-surface">
              
              {/* Caffeine Sleep Inhibitor */}
              <button 
                onClick={() => setCaffeineActive(!caffeineActive)}
                className={`hidden min-[420px]:inline-block p-1 rounded transition-colors ${
                  caffeineActive ? "text-primary font-bold" : "text-white/60 hover:text-white"
                }`}
                title={`Caffeine: ${caffeineActive ? "Active" : "Inactive"}`}
              >
                <LuCoffee className="w-3.5 h-3.5" />
              </button>

              {/* Notification Bell */}
              <button 
                onClick={() => setDndActive(!dndActive)}
                className={`hidden min-[480px]:inline-block p-1 rounded transition-colors ${
                  dndActive ? "text-amber-400" : "text-white/60 hover:text-white"
                }`}
                title={dndActive ? "Do Not Disturb Enabled" : "Notifications Active"}
              >
                <LuBell className="w-3.5 h-3.5" />
              </button>

              {/* Volume */}
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="flex items-center gap-1 text-white/80 hover:text-primary transition-colors cursor-pointer"
                title="Audio Volume"
              >
                {isMuted ? <LuVolumeX className="w-3.5 h-3.5 text-red-400" /> : <LuVolume2 className="w-3.5 h-3.5 text-primary" />}
                <span className="text-[10px] sm:text-[11px]">{isMuted ? "0%" : `${volume}%`}</span>
              </button>

              {/* Brightness */}
              <span className="hidden sm:flex items-center gap-1 text-white/80" title="Display Brightness">
                <LuSun className="w-3.5 h-3.5 text-primary" />
                <span className="text-[11px]">{brightness}%</span>
              </span>

              {/* Battery */}
              <span className="flex items-center gap-1 text-white/80" title="Battery: 100% Charging">
                <LuBatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] sm:text-[11px]">100%</span>
              </span>

              {/* Quick Settings / Control Center Toggle */}
              <button
                onClick={() => setControlCenterOpen(!controlCenterOpen)}
                className={`p-1 rounded transition-colors ${
                  controlCenterOpen ? "text-primary bg-white/10" : "text-white/70 hover:text-primary hover:bg-white/5"
                }`}
                title="Control Center (SUPER + C)"
              >
                <LuSlidersHorizontal className="w-3.5 h-3.5" />
              </button>

            </div>

          </div>

        </div>

        {/* ================================================================ */}
        {/* 2. OUTWARD CURVED CORNER FILLETS (Matching Bar.qml Canvas) */}
        {/* ================================================================ */}
        
        {/* Left Outward Fillet */}
        <svg 
          width="12" 
          height="12" 
          viewBox="0 0 12 12" 
          className="absolute left-0 top-[36px] pointer-events-none z-50"
        >
          <path 
            d="M 0 0 L 12 0 A 12 12 0 0 0 0 12 Z" 
            fill="rgba(19, 15, 18, 0.75)" 
          />
          <path 
            d="M 12 0 A 12 12 0 0 0 0 12" 
            fill="none" 
            stroke="rgba(65, 47, 59, 0.4)" 
            strokeWidth="1" 
          />
        </svg>

        {/* Right Outward Fillet */}
        <svg 
          width="12" 
          height="12" 
          viewBox="0 0 12 12" 
          className="absolute right-0 top-[36px] pointer-events-none z-50"
        >
          <path 
            d="M 12 0 L 0 0 A 12 12 0 0 1 12 12 Z" 
            fill="rgba(19, 15, 18, 0.75)" 
          />
          <path 
            d="M 0 0 A 12 12 0 0 1 12 12" 
            fill="none" 
            stroke="rgba(65, 47, 59, 0.4)" 
            strokeWidth="1" 
          />
        </svg>

      </header>

      {/* ==================================================================== */}
      {/* 3. INTERACTIVE QUICKSHELL CONTROL CENTER MODAL (SUPER + C) */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {controlCenterOpen && (
          <>
            <div 
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs"
              onClick={() => setControlCenterOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="fixed top-11 right-2 left-2 sm:left-auto sm:right-3 w-auto sm:w-80 max-w-sm rounded-2xl p-4 z-50 border shadow-2xl mx-auto"
              style={{
                background: "rgba(31, 24, 29, 0.95)",
                backdropFilter: "blur(24px)",
                borderColor: "rgba(65, 47, 59, 0.6)",
              }}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <LuSlidersHorizontal className="w-4 h-4 text-primary" />
                  <span className="font-mono font-bold text-xs text-white">Control Center</span>
                </div>
                <button 
                  onClick={() => setControlCenterOpen(false)}
                  className="p-1 rounded-md text-white/50 hover:text-white hover:bg-white/10"
                >
                  <LuX className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Quick Settings Toggles Grid */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button 
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-primary/20 border border-primary/40 text-left transition-colors"
                >
                  <LuWifi className="w-4 h-4 text-primary" />
                  <div>
                    <div className="text-xs font-semibold text-white">Wi-Fi</div>
                    <div className="text-[10px] text-primary">Connected</div>
                  </div>
                </button>

                <button 
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-primary/20 border border-primary/40 text-left transition-colors"
                >
                  <LuBluetooth className="w-4 h-4 text-primary" />
                  <div>
                    <div className="text-xs font-semibold text-white">Bluetooth</div>
                    <div className="text-[10px] text-primary">Active</div>
                  </div>
                </button>

                <button 
                  onClick={() => setCaffeineActive(!caffeineActive)}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-colors ${
                    caffeineActive ? "bg-primary/20 border-primary/40" : "bg-white/5 border-white/10 text-white/70"
                  }`}
                >
                  <LuCoffee className={`w-4 h-4 ${caffeineActive ? "text-primary" : "text-white/50"}`} />
                  <div>
                    <div className="text-xs font-semibold text-white">Caffeine</div>
                    <div className={`text-[10px] ${caffeineActive ? "text-primary" : "text-white/40"}`}>
                      {caffeineActive ? "Active" : "Off"}
                    </div>
                  </div>
                </button>

                <button 
                  onClick={() => setDndActive(!dndActive)}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-colors ${
                    dndActive ? "bg-amber-500/20 border-amber-500/40" : "bg-white/5 border-white/10 text-white/70"
                  }`}
                >
                  <LuBell className={`w-4 h-4 ${dndActive ? "text-amber-400" : "text-white/50"}`} />
                  <div>
                    <div className="text-xs font-semibold text-white">DND</div>
                    <div className={`text-[10px] ${dndActive ? "text-amber-400" : "text-white/40"}`}>
                      {dndActive ? "Muted" : "Off"}
                    </div>
                  </div>
                </button>
              </div>

              {/* Sliders: Volume & Brightness */}
              <div className="space-y-3 mb-4 bg-black/20 p-3 rounded-xl border border-white/5">
                <div>
                  <div className="flex justify-between text-[11px] font-mono text-white/70 mb-1">
                    <span className="flex items-center gap-1.5"><LuVolume2 className="w-3.5 h-3.5 text-primary" /> Volume</span>
                    <span>{volume}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={volume} 
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-full accent-primary h-1.5 bg-white/20 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-mono text-white/70 mb-1">
                    <span className="flex items-center gap-1.5"><LuSun className="w-3.5 h-3.5 text-primary" /> Backlight</span>
                    <span>{brightness}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="100" 
                    value={brightness} 
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    className="w-full accent-primary h-1.5 bg-white/20 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Power Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-white/60">
                <span className="text-[11px] font-mono truncate mr-2">Arch Linux · Hyprland</span>
                <div className="flex items-center gap-2 shrink-0">
                  <button className="p-1.5 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary transition-colors" title="Lock Screen">
                    <LuMoon className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary transition-colors" title="Restart Session">
                    <LuRefreshCw className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors" title="Power Menu">
                    <LuPower className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ==================================================================== */}
      {/* 4. INTERACTIVE CLIPSET / CHAT POPUP */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {clipseOpen && (
          <>
            <div 
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs"
              onClick={() => setClipseOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="fixed top-11 left-2 right-2 sm:right-auto sm:left-3 w-auto sm:w-84 max-w-sm rounded-2xl p-4 z-50 border shadow-2xl mx-auto"
              style={{
                background: "rgba(31, 24, 29, 0.96)",
                backdropFilter: "blur(24px)",
                borderColor: "rgba(65, 47, 59, 0.6)",
              }}
            >
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <LuMessageCircle className="w-4 h-4 text-primary" />
                  <span className="font-mono font-bold text-xs text-white">Clipse Clipboard</span>
                </div>
                <button 
                  onClick={() => setClipseOpen(false)}
                  className="p-1 rounded-md text-white/50 hover:text-white"
                >
                  <LuX className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2">
                {[
                  { id: "c1", text: "curl -fsSL https://dotfiles-web-pi.vercel.app/install | sh", label: "Installer One-Liner" },
                  { id: "c2", text: "hyprctl dispatch togglefloating", label: "Hyprland Dispatch" },
                  { id: "c3", text: "~/Dotfiles/install.sh --core", label: "Dotfiles Core Command" },
                  { id: "c4", text: "python3 ~/.config/hypr/scripts/generate-theme.py", label: "Theme Generator" },
                ].map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => handleCopyText(item.text, item.id)}
                    className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 hover:border-primary/40 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-primary mb-1">
                      <span>{item.label}</span>
                      {copiedItem === item.id ? (
                        <span className="text-emerald-400 flex items-center gap-1 text-[10px]">
                          <LuCheck className="w-3 h-3" /> Copied
                        </span>
                      ) : (
                        <LuCopy className="w-3 h-3 text-white/40 group-hover:text-primary transition-colors" />
                      )}
                    </div>
                    <div className="font-mono text-xs text-white/90 truncate">{item.text}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ==================================================================== */}
      {/* 5. INTERACTIVE OMARCHY-LEDGE DRAWER */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {ledgeOpen && (
          <>
            <div 
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs"
              onClick={() => setLedgeOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="fixed top-11 right-2 left-2 sm:left-auto sm:right-20 w-auto sm:w-80 max-w-sm rounded-2xl p-4 z-50 border shadow-2xl mx-auto"
              style={{
                background: "rgba(31, 24, 29, 0.96)",
                backdropFilter: "blur(24px)",
                borderColor: "rgba(65, 47, 59, 0.6)",
              }}
            >
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <LuFolder className="w-4 h-4 text-primary" />
                  <span className="font-mono font-bold text-xs text-white">omarchy-ledge Pin Shelf</span>
                </div>
                <button 
                  onClick={() => setLedgeOpen(false)}
                  className="p-1 rounded-md text-white/50 hover:text-white"
                >
                  <LuX className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2">
                {[
                  { name: "hyprland.conf", size: "8.2 KB", path: "~/.config/hypr/hyprland.conf" },
                  { name: "colors.json", size: "1.4 KB", path: "~/.config/my-desktop/theme/colors.json" },
                  { name: "install.sh", size: "14.6 KB", path: "~/Dotfiles/install.sh" },
                ].map((file, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-white/[0.04] border border-white/5">
                    <div className="flex items-center gap-2 truncate mr-2">
                      <LuPin className="w-3.5 h-3.5 text-primary shrink-0" />
                      <div className="truncate">
                        <div className="font-mono text-xs font-medium text-white truncate">{file.name}</div>
                        <div className="font-mono text-[10px] text-white/40 truncate">{file.path}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-white/50 shrink-0">{file.size}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ==================================================================== */}
      {/* 6. INTERACTIVE APP LAUNCHER MODAL (SUPER + SPACE) */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {appLauncherOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-lg rounded-2xl p-4 sm:p-6 border shadow-2xl relative"
              style={{
                background: "rgba(31, 24, 29, 0.96)",
                borderColor: "rgba(225, 131, 194, 0.4)",
                boxShadow: "0 0 35px -5px rgba(225, 131, 194, 0.25)",
              }}
            >
              {/* Close Button */}
              <button 
                onClick={() => setAppLauncherOpen(false)}
                className="absolute top-4 right-4 p-1 rounded-lg text-white/50 hover:text-white"
              >
                <LuX className="w-4 h-4" />
              </button>

              {/* Launcher Header & Input */}
              <div className="flex items-center gap-3 pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-white/10 pr-8">
                <LuSearch className="w-5 h-5 text-primary shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search applications, keybindings, files..." 
                  className="w-full bg-transparent text-xs sm:text-sm font-mono text-white focus:outline-hidden placeholder:text-white/40"
                  autoFocus
                />
              </div>

              {/* Quick Launch App Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
                {[
                  { name: "Ghostty", cmd: "SUPER + RETURN", icon: LuTerminal },
                  { name: "Themes", cmd: "SUPER + T", icon: LuSparkles },
                  { name: "Files", cmd: "SUPER + E", icon: LuFolder },
                  { name: "Brave", cmd: "SUPER + B", icon: SiBrave },
                  { name: "Settings", cmd: "SUPER + C", icon: LuSlidersHorizontal },
                  { name: "PiP Pin", cmd: "SUPER + P", icon: LuPin },
                ].map((app, i) => (
                  <button 
                    key={i}
                    onClick={() => setAppLauncherOpen(false)}
                    className="flex flex-col items-start p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-white/5 hover:border-primary/50 hover:bg-primary/10 transition-all text-left group"
                  >
                    <app.icon className="w-4 h-4 text-primary mb-1 sm:mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-semibold text-white">{app.name}</span>
                    <span className="text-[10px] font-mono text-white/40 truncate w-full">{app.cmd}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
