"use client";

import React, { useState } from "react";
import { 
  LuFolderTree, 
  LuPackage, 
  LuServer, 
  LuTerminal, 
  LuCheckCheck, 
  LuFileText,
  LuExternalLink,
  LuCopy,
  LuCheck
} from "react-icons/lu";

export function ArchitectureDocs() {
  const [activeDocTab, setActiveDocTab] = useState<"structure" | "packages" | "installer">("structure");
  const [copiedScript, setCopiedScript] = useState(false);

  const handleCopyInstall = () => {
    navigator.clipboard.writeText("curl -fsSL https://dotfiles-web-pi.vercel.app/install | sh");
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <section id="architecture" className="py-12 sm:py-24 relative bg-background">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/80 border border-primary/40 text-xs font-mono text-primary mb-3">
            <LuFolderTree className="w-3.5 h-3.5" />
            <span>Deterministic Reproduction</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-on-surface mb-3 sm:mb-4">
            Deployment & System Manifests
          </h2>
          <p className="text-on-surface-variant text-xs sm:text-base px-2 sm:px-0">
            Every file, daemon unit, standalone binary, and package dependency is tracked and validated across 72 automated checks.
          </p>
        </div>

        {/* Tab Navigation with smooth horizontal scrolling */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 overflow-x-auto pb-1.5 sm:pb-0 no-scrollbar w-full flex-nowrap">
          <button
            onClick={() => setActiveDocTab("structure")}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all whitespace-nowrap shrink-0 ${
              activeDocTab === "structure"
                ? "bg-primary text-on-primary font-bold shadow-md shadow-primary/20"
                : "bg-surface text-on-surface-variant hover:text-on-surface hover:bg-surface-variant border border-outline/40"
            }`}
          >
            <LuFolderTree className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>File Structure</span>
          </button>

          <button
            onClick={() => setActiveDocTab("packages")}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all whitespace-nowrap shrink-0 ${
              activeDocTab === "packages"
                ? "bg-primary text-on-primary font-bold shadow-md shadow-primary/20"
                : "bg-surface text-on-surface-variant hover:text-on-surface hover:bg-surface-variant border border-outline/40"
            }`}
          >
            <LuPackage className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Package Manifests</span>
          </button>

          <button
            onClick={() => setActiveDocTab("installer")}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all whitespace-nowrap shrink-0 ${
              activeDocTab === "installer"
                ? "bg-primary text-on-primary font-bold shadow-md shadow-primary/20"
                : "bg-surface text-on-surface-variant hover:text-on-surface hover:bg-surface-variant border border-outline/40"
            }`}
          >
            <LuTerminal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Installer Options</span>
          </button>
        </div>

        {/* Content Panels */}
        <div className="rounded-2xl glass-panel border border-outline/60 p-4 sm:p-6 shadow-2xl text-left">
          
          {/* TAB 1: File Structure */}
          {activeDocTab === "structure" && (
            <div className="font-mono text-xs text-on-surface space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-outline/30 pb-3">
                <span className="text-primary font-bold text-xs sm:text-sm">DotFiles Repository Blueprint (395 Items)</span>
                <a 
                  href="https://github.com/krreeshhh/DotFiles/blob/main/MANIFEST.md" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] sm:text-xs text-on-surface-variant hover:text-primary transition-colors"
                >
                  <span>View full MANIFEST.md</span>
                  <LuExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <pre className="bg-background/90 p-3 sm:p-4 rounded-xl border border-outline/30 overflow-x-auto text-[10px] sm:text-[11px] leading-relaxed text-on-surface-variant font-mono">
{`DotFiles/
├── assets/
│   ├── fonts/               # Custom fonts (The Last Shuriken, Torus)
│   ├── hypr-pip/            # Chromium extension for Universal Picture-in-Picture
│   ├── share/               # Custom .desktop launchers & webapp icons
│   ├── themes/
│   │   ├── grub/silent/     # Minimalist GRUB bootloader theme
│   │   └── sddm/qylock-sword/ # Animated video-backed SDDM login theme
│   └── wallpapers/          # Packaged collection (27 aesthetic wallpapers)
├── bin/                     # Standalone binaries (hypr-pip-helper, clipse, strata)
├── config/
│   ├── clipse/              # Clipboard manager config
│   ├── dunst/               # Notification styling
│   ├── environment.d/       # Session environment variables
│   ├── ghostty/             # Ghostty terminal config (0.20 opacity)
│   ├── gtk-3.0/ & gtk-4.0/  # GTK interface themes (WhiteSur-dark)
│   ├── hypr/                # Hyprland (hyprland.lua, pip.lua, scripts/)
│   ├── my-desktop/          # Dynamic Material You theme extractor & wallpaper picker
│   ├── nwg-bar/             # Power menu layout
│   ├── quickshell/          # Modular QML desktop shell (Bar, Popups, OSD, Plugins)
│   ├── systemd/user/        # User services (elephant, hypr-pip, quickshell)
│   ├── walker/              # Walker launcher application provider config
│   └── yazi/                # Terminal file manager configuration
├── packages/                # Package manifests (pacman-runtime, aur-runtime, fonts)
├── scripts/                 # Automated test runner (verify.sh)
├── install.sh               # Fully automated installer with hardware autodetection
├── MANIFEST.md              # Complete catalog of all 392 tracked files
└── REPRODUCTION.md          # Step-by-step reproduction guide`}
              </pre>
            </div>
          )}

          {/* TAB 2: Package Manifests */}
          {activeDocTab === "packages" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                
                {/* Pacman Runtime */}
                <div className="bg-background/90 p-4 sm:p-5 rounded-xl border border-outline/40">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-primary flex items-center gap-1.5">
                      <LuServer className="w-4 h-4" /> Official Pacman Manifest
                    </span>
                    <span className="text-[10px] font-mono text-on-surface-variant">pacman-runtime.txt</span>
                  </div>
                  <ul className="font-mono text-xs space-y-1.5 text-on-surface-variant">
                    <li>• <strong className="text-on-surface">hyprland</strong> (Wayland Compositor)</li>
                    <li>• <strong className="text-on-surface">ghostty</strong> (GPU Terminal)</li>
                    <li>• <strong className="text-on-surface">pipewire, wireplumber</strong> (Audio Core)</li>
                    <li>• <strong className="text-on-surface">nautilus, file-roller</strong> (File Management)</li>
                    <li>• <strong className="text-on-surface">dunst, libnotify</strong> (Notifications)</li>
                    <li>• <strong className="text-on-surface">brightnessctl, playerctl</strong> (Hardware)</li>
                    <li>• <strong className="text-on-surface">python-pillow, python-gobject</strong> (Theme Engine)</li>
                  </ul>
                </div>

                {/* AUR Runtime */}
                <div className="bg-background/90 p-4 sm:p-5 rounded-xl border border-outline/40">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-secondary flex items-center gap-1.5">
                      <LuPackage className="w-4 h-4" /> Arch User Repository (AUR)
                    </span>
                    <span className="text-[10px] font-mono text-on-surface-variant">aur-runtime.txt</span>
                  </div>
                  <ul className="font-mono text-xs space-y-1.5 text-on-surface-variant">
                    <li>• <strong className="text-on-surface">quickshell-git</strong> (Modular QML Shell & App Launcher)</li>
                    <li>• <strong className="text-on-surface">walker-bin, elephant-bin</strong> (Search Engine Daemon)</li>
                    <li>• <strong className="text-on-surface">brave-bin</strong> (Web Browser)</li>
                    <li>• <strong className="text-on-surface">vesktop-bin</strong> (Discord Client)</li>
                    <li>• <strong className="text-on-surface">whitesur-gtk-theme</strong> (GTK Aesthetics)</li>
                    <li>• <strong className="text-on-surface">bibata-cursor-theme</strong> (Modern Cursors)</li>
                    <li>• <strong className="text-on-surface">sddm-git</strong> (Display Manager)</li>
                  </ul>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: Installer Options */}
          {activeDocTab === "installer" && (
            <div className="space-y-4 font-mono text-xs text-on-surface">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-outline/30 pb-3">
                <span className="text-primary font-bold text-xs sm:text-sm">install.sh CLI Flags & Automation Arguments</span>
                <button
                  onClick={handleCopyInstall}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface border border-outline hover:border-primary text-[11px] text-on-surface transition-colors cursor-pointer"
                >
                  {copiedScript ? <LuCheck className="w-3.5 h-3.5 text-emerald-400" /> : <LuCopy className="w-3.5 h-3.5 text-primary" />}
                  <span>{copiedScript ? "Copied" : "Copy Live One-Liner"}</span>
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-3 sm:p-4 rounded-xl bg-background/90 border border-outline/30">
                  <p className="font-bold text-primary mb-1">./install.sh --core</p>
                  <p className="text-on-surface-variant text-[11px]">
                    Installs Hyprland, Quickshell, audio/backlight daemons, Ghostty, GTK themes, and copies all ~/.config directories.
                  </p>
                </div>

                <div className="p-3 sm:p-4 rounded-xl bg-background/90 border border-outline/30">
                  <p className="font-bold text-primary mb-1">./install.sh --all</p>
                  <p className="text-on-surface-variant text-[11px]">
                    Includes standard core plus extra desktop applications: Brave Browser, Vesktop (Discord), Telegram Desktop, and media utilities.
                  </p>
                </div>

                <div className="p-3 sm:p-4 rounded-xl bg-background/90 border border-outline/30">
                  <p className="font-bold text-primary mb-1">./install.sh --config-only</p>
                  <p className="text-on-surface-variant text-[11px]">
                    Skips pacman and paru package installations; creates timestamped backups of existing ~/.config folders and deploys dotfiles.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
