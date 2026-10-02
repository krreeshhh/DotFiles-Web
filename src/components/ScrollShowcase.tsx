"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  LuCode, 
  LuLayers, 
  LuPlay, 
  LuCpu, 
  LuShieldCheck, 
  LuSlidersHorizontal, 
  LuZap
} from "react-icons/lu";

const STAGES = [
  {
    icon: LuCode,
    title: "Native Lua Compositor",
    desc: 'Configured via hyprland.lua using the official native Lua API. Features dynamic master-stack layouts, dual blur passes, window opacity rules, and fluid gesture handling.',
    code: 'hl.bind(mainMod .. " + SPACE", appLauncher)',
    codeHighlight: "text-primary font-bold"
  },
  {
    icon: LuSlidersHorizontal,
    title: "Quickshell Modular QML",
    desc: 'Full-featured custom desktop shell with split modules: bar/Bar.qml, popups/Osd.qml, and ControlCenter.qml with live hardware stats.',
    code: 'quickshell ipc call shell toggleControlCenter',
    codeHighlight: "text-emerald-400"
  },
  {
    icon: LuPlay,
    title: "Universal Picture-in-Picture",
    desc: 'Dedicated background daemon (hypr-pip-helper) and Chromium browser extension for automatic sticky floating video playback on top of any workspace.',
    code: 'service: hypr-pip-helper.service [active]',
    codeHighlight: "text-primary"
  },
  {
    icon: LuCpu,
    title: "NVIDIA Open DKMS & VRAM",
    desc: 'Zero graphical artifacting on sleep and wake. Configured with nvidia.NVreg_PreserveVideoMemoryAllocations=1 in GRUB and power management user services.',
    code: 'systemctl: nvidia-suspend.service [enabled]',
    codeHighlight: "text-emerald-400"
  },
  {
    icon: LuZap,
    title: "Quickshell App Launcher",
    desc: 'Custom QML layer-shell launcher with dynamic application search, web app integration, and plugin management bound to SUPER + SPACE.',
    code: 'ipc: quickshell ipc call shell toggleAppLauncher',
    codeHighlight: "text-primary"
  },
  {
    icon: LuShieldCheck,
    title: "Boot to Desktop Experience",
    desc: 'Seamless boot continuity using the minimalist silent GRUB theme and animated video-backed qylock-sword SDDM login greeter.',
    code: 'greeter: /usr/share/sddm/themes/qylock-sword',
    codeHighlight: "text-primary"
  }
];

export function ScrollShowcase() {
  return (
    <section id="architecture" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/80 border border-primary/40 text-xs font-mono text-primary mb-3 shadow-xs">
            <LuLayers className="w-3.5 h-3.5" />
            <span>Deep Dive Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-on-surface mb-4 section-title">
            Engineering Behind the Glass
          </h2>
          <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
            Engineered from compositor to bootloader for low latency, reproducible builds, and seamless aesthetics.
          </p>
        </motion.div>

        {/* Feature Grid with Hardware-Accelerated Staggered Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {STAGES.map((stage, idx) => (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ 
                duration: 0.45, 
                delay: idx * 0.07,
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="rounded-2xl glass-panel border border-white/10 p-6 flex flex-col justify-between hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 gpu-layer shadow-xl"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary-container/80 border border-primary/40 flex items-center justify-center text-primary mb-5 shadow-xs">
                  <stage.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-on-surface mb-2 tracking-tight">{stage.title}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                  {stage.desc}
                </p>
              </div>
              <div className="rounded-xl bg-background/90 p-3 border border-outline/40 font-mono text-[11px] text-on-surface-variant shadow-inner">
                <span className={stage.codeHighlight}>{stage.code}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
