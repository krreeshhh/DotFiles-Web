"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import anime from "animejs";
import { 
  LuCode, 
  LuLayers, 
  LuPlay, 
  LuCpu, 
  LuShieldCheck, 
  LuServer, 
  LuSlidersHorizontal, 
  LuZap,
  LuSparkles
} from "react-icons/lu";

export function ScrollShowcase() {
  const animeContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(animeContainerRef, { once: false, amount: 0.3 });

  useEffect(() => {
    if (isInView && animeContainerRef.current) {
      anime({
        targets: ".stagger-card",
        translateY: [30, 0],
        opacity: [0, 1],
        delay: anime.stagger(120, { start: 100 }),
        easing: "easeOutExpo",
        duration: 800,
      });

      anime({
        targets: ".pulse-line",
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: "easeInOutSine",
        duration: 1500,
        delay: anime.stagger(200),
        loop: true,
        direction: "alternate",
      });
    }
  }, [isInView]);

  return (
    <section id="architecture" className="py-24 relative overflow-hidden" ref={animeContainerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/80 border border-primary/40 text-xs font-mono text-primary mb-3">
            <LuLayers className="w-3.5 h-3.5" />
            <span>Deep Dive Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-on-surface mb-5">
            Engineering Behind the Glass
          </h2>
          <p className="text-on-surface-variant text-sm sm:text-base">
            Engineered from compositor to bootloader for low latency, reproducible builds, and seamless aesthetics.
          </p>
        </div>

        {/* Feature Grid with Staggered Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Stage 1: Hyprland Lua Configuration */}
          <div className="stagger-card rounded-2xl glass-panel border border-outline/60 p-6 flex flex-col justify-between hover:border-primary/50 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary-container/80 border border-primary/40 flex items-center justify-center text-primary mb-5 shadow-sm">
                <LuCode className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-2">Native Lua Compositor</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                Configured via <code className="text-primary font-mono">hyprland.lua</code> using the official native Lua API. Features dynamic master-stack layouts, dual blur passes, window opacity rules, and fluid gesture handling.
              </p>
            </div>
            <div className="rounded-xl bg-background/90 p-3 border border-outline/40 font-mono text-[11px] text-on-surface-variant">
              <span className="text-primary font-bold">hl.bind</span>(mainMod .. &quot; + SPACE&quot;, appLauncher)
            </div>
          </div>

          {/* Stage 2: Modular Quickshell Desktop Shell */}
          <div className="stagger-card rounded-2xl glass-panel border border-outline/60 p-6 flex flex-col justify-between hover:border-primary/50 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary-container/80 border border-primary/40 flex items-center justify-center text-primary mb-5 shadow-sm">
                <LuSlidersHorizontal className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-2">Quickshell Modular QML</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                Full-featured custom desktop shell with split modules: <code className="text-primary font-mono">bar/Bar.qml</code>, <code className="text-primary font-mono">popups/Osd.qml</code>, and <code className="text-primary font-mono">ControlCenter.qml</code> with live hardware stats.
              </p>
            </div>
            <div className="rounded-xl bg-background/90 p-3 border border-outline/40 font-mono text-[11px] text-on-surface-variant">
              <span className="text-emerald-400">quickshell</span> ipc call shell toggleControlCenter
            </div>
          </div>

          {/* Stage 3: Universal Picture-in-Picture */}
          <div className="stagger-card rounded-2xl glass-panel border border-outline/60 p-6 flex flex-col justify-between hover:border-primary/50 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary-container/80 border border-primary/40 flex items-center justify-center text-primary mb-5 shadow-sm">
                <LuPlay className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-2">Universal Picture-in-Picture</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                Dedicated background daemon (<code className="text-primary font-mono">hypr-pip-helper</code>) and Chromium browser extension for automatic sticky floating video playback on top of any workspace.
              </p>
            </div>
            <div className="rounded-xl bg-background/90 p-3 border border-outline/40 font-mono text-[11px] text-on-surface-variant">
              <span className="text-primary">service:</span> hypr-pip-helper.service [active]
            </div>
          </div>

          {/* Stage 4: NVIDIA Open DKMS & Hardware Tuning */}
          <div className="stagger-card rounded-2xl glass-panel border border-outline/60 p-6 flex flex-col justify-between hover:border-primary/50 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary-container/80 border border-primary/40 flex items-center justify-center text-primary mb-5 shadow-sm">
                <LuCpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-2">NVIDIA Open DKMS & VRAM</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                Zero graphical artifacting on sleep and wake. Configured with <code className="text-primary font-mono">nvidia.NVreg_PreserveVideoMemoryAllocations=1</code> in GRUB and power management user services.
              </p>
            </div>
            <div className="rounded-xl bg-background/90 p-3 border border-outline/40 font-mono text-[11px] text-on-surface-variant">
              <span className="text-emerald-400">systemctl:</span> nvidia-suspend.service [enabled]
            </div>
          </div>

          {/* Stage 5: Walker & Elephant D-Bus Providers */}
          <div className="stagger-card rounded-2xl glass-panel border border-outline/60 p-6 flex flex-col justify-between hover:border-primary/50 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary-container/80 border border-primary/40 flex items-center justify-center text-primary mb-5 shadow-sm">
                <LuZap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-2">Walker + Elephant D-Bus</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                Sub-millisecond application and command search engine running over native D-Bus providers, integrated directly into Quickshell QML dialogs.
              </p>
            </div>
            <div className="rounded-xl bg-background/90 p-3 border border-outline/40 font-mono text-[11px] text-on-surface-variant">
              <span className="text-primary">backend:</span> elephant-desktopapplications-bin
            </div>
          </div>

          {/* Stage 6: Silent GRUB & qylock-sword SDDM */}
          <div className="stagger-card rounded-2xl glass-panel border border-outline/60 p-6 flex flex-col justify-between hover:border-primary/50 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary-container/80 border border-primary/40 flex items-center justify-center text-primary mb-5 shadow-sm">
                <LuShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-2">Boot to Desktop Experience</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                Seamless boot continuity using the minimalist <code className="text-primary font-mono">silent</code> GRUB theme and animated video-backed <code className="text-primary font-mono">qylock-sword</code> SDDM login greeter.
              </p>
            </div>
            <div className="rounded-xl bg-background/90 p-3 border border-outline/40 font-mono text-[11px] text-on-surface-variant">
              <span className="text-primary">greeter:</span> /usr/share/sddm/themes/qylock-sword
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
