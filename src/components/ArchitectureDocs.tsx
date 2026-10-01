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
    navigator.clipboard.writeText("curl -fsSL https://raw.githubusercontent.com/krreeshhh/DotFiles/main/install.sh | bash");
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <section id="install" className="py-24 relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/80 border border-primary/40 text-xs font-mono text-primary mb-3">
            <LuFolderTree className="w-3.5 h-3.5" />
            <span>Deterministic Reproduction</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-on-surface mb-4">
            Deployment & System Manifests
          </h2>
          <p className="text-on-surface-variant text-sm sm:text-base">
            Every file, daemon unit, standalone binary, and package dependency is tracked and validated across 72 automated checks.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveDocTab("structure")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
              activeDocTab === "structure"
                ? "bg-primary text-on-primary font-bold shadow-md shadow-primary/20"
                : "bg-surface text-on-surface-variant hover:text-on-surface hover:bg-surface-variant border border-outline/40"
            }`}
          >
            <LuFolderTree className="w-4 h-4" />
            <span>File Structure</span>
          </button>

          <button
            onClick={() => setActiveDocTab("packages")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
              activeDocTab === "packages"
                ? "bg-primary text-on-primary font-bold shadow-md shadow-primary/20"
                : "bg-surface text-on-surface-variant hover:text-on-surface hover:bg-surface-variant border border-outline/40"
            }`}
          >
            <LuPackage className="w-4 h-4" />
            <span>Package Manifests</span>
          </button>

          <button
            onClick={() => setActiveDocTab("installer")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
              activeDocTab === "installer"
                ? "bg-primary text-on-primary font-bold shadow-md shadow-primary/20"
                : "bg-surface text-on-surface-variant hover:text-on-surface hover:bg-surface-variant border border-outline/40"
            }`}
          >
            <LuTerminal className="w-4 h-4" />
            <span>Installer Options</span>
          </button>
        </div>

        {/* Content Panels */}
        <div className="rounded-2xl glass-panel border border-outline/60 p-6 shadow-2xl text-left">
          
          {/* TAB 1: File Structure */}
          {activeDocTab === "structure" && (
            <div className="font-mono text-xs text-on-surface space-y-4">
              <div className="flex items-center justify-between border-b border-outline/30 pb-3">
                <span className="text-primary font-bold">DotFiles Repository Blueprint (395 Tracked Items)</span>
                <a 
                  href="https://github.com/krreeshhh/DotFiles/blob/main/MANIFEST.md" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-on-surface-variant hover:text-primary transition-colors"
                >
                  <span>View full MANIFEST.md</span>
                  <LuExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <pre className="bg-background/90 p-4 rounded-xl border border-outline/30 overflow-x-auto text-[11px] leading-relaxed text-on-surface-variant">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Pacman Runtime */}
                <div className="rounded-xl bg-background/80 p-4 border border-outline/40">
                  <h4 className="text-xs font-mono font-bold text-primary mb-2 flex items-center gap-2">
                    <LuPackage className="w-4 h-4" /> Pacman Core Runtime
                  </h4>
                  <ul className="text-[11px] font-mono text-on-surface-variant space-y-1">
                    <li>• hyprland (Compositor)</li>
                    <li>• quickshell (Modular desktop shell)</li>
                    <li>• ghostty (Terminal emulator)</li>
                    <li>• nautilus (GTK4 file manager)</li>
                    <li>• pipewire, wireplumber (Audio stack)</li>
                    <li>• networkmanager, bluez (Connectivity)</li>
                    <li>• nvidia-open-dkms (Open GPU drivers)</li>
                    <li>• sddm (Display manager)</li>
                  </ul>
                </div>

                {/* AUR Packages */}
                <div className="rounded-xl bg-background/80 p-4 border border-outline/40">
                  <h4 className="text-xs font-mono font-bold text-secondary mb-2 flex items-center gap-2">
                    <LuPackage className="w-4 h-4" /> AUR Runtime & Applications
                  </h4>
                  <ul className="text-[11px] font-mono text-on-surface-variant space-y-1">
                    <li>• whitesur-icon-theme (WhiteSur-dark)</li>
                    <li>• bibata-cursor-theme (Bibata-Modern-Ice)</li>
                    <li>• walker-bin, elephant-bin (D-Bus launcher)</li>
                    <li>• brave-origin-bin (Hardware video browser)</li>
                    <li>• vesktop-bin (Discord client)</li>
                    <li>• visual-studio-code-bin (Development IDE)</li>
                  </ul>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: Installer Options */}
          {activeDocTab === "installer" && (
            <div className="space-y-4 font-mono text-xs">
              <p className="text-on-surface-variant">
                The installer script detects graphics hardware automatically, enables required systemd units, symlinks Quickshell modules, and extracts initial palette tones.
              </p>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-background/80 border border-outline/30 flex items-start justify-between">
                  <div>
                    <span className="text-primary font-bold">./install.sh --core</span>
                    <p className="text-[11px] text-on-surface-variant mt-1">
                      Installs essential Hyprland compositor, Quickshell, drivers, fonts, and configurations.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-background/80 border border-outline/30 flex items-start justify-between">
                  <div>
                    <span className="text-primary font-bold">./install.sh --all</span>
                    <p className="text-[11px] text-on-surface-variant mt-1">
                      Full desktop installation including browsers, communication apps, and development tools.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-background/80 border border-outline/30 flex items-start justify-between">
                  <div>
                    <span className="text-primary font-bold">./install.sh --config-only</span>
                    <p className="text-[11px] text-on-surface-variant mt-1">
                      Deploys configurations, standalone binaries, and theme assets without package manager operations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
