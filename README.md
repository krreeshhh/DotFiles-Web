# Arch Linux + Hyprland Showcase & Installer Website

A modern showcase and automated installer distribution web application built with **Next.js 16 (Turbopack)**, **React 19**, **Tailwind CSS**, **Framer Motion**, and **Anime.js**.

---

## Features

- **Interactive Quickshell Topbar Navbar:** Exact 36px edge-to-edge system bar with vector outward corner fillets, dynamic workspace pills (1-5), live synchronized clock, Ledge pin shelf, and interactive Control Center (`SUPER + C`).
- **Live Material You Dynamic Palette Engine:** 3D Cover Flow carousel replicating `carousel-picker.py`. Selecting wallpapers shifts CSS variables across the site with hardware-accelerated fluid transitions.
- **Cinematic Desktop Canvas Simulation:** Pixel-perfect Hyprland environment with borderless Ghostty terminal (0.20 opacity, blur, glowing active window border), tab switching (`fastfetch`, `hyprctl`, `verify.sh`), and floating Universal PiP video pin.
- **One-Line Automated Curl Installer:** High-performance route handler serving raw shell installer payload for `curl -fsSL https://<domain>/install | sh`.
- **Searchable Compositor Hotkey Matrix:** Filterable keyboard shortcuts with styled physical keycaps (`SUPER`, `SPACE`, `C`, `E`, `B`, `RETURN`, `F7`, `F8`).
- **High-Performance WebP Assets:** Preloaded and GPU-accelerated wallpaper imagery.

---

## Tech Stack

- **Framework:** [Next.js 16 (App Router + Turbopack)](https://nextjs.org/)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Motion & Animations:** [Framer Motion](https://www.framer.com/motion/) and [Anime.js](https://animejs.com/)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/) (Lucide & Simple Icons)
- **Runtime & Package Manager:** [Bun](https://bun.sh/)

---

## Getting Started

### Prerequisites
- [Bun](https://bun.sh/) (or Node.js 20+)

### Installation
```bash
git clone https://github.com/krreeshhh/dotfiles-web.git
cd dotfiles-web
bun install
```

### Development Server
```bash
bun run dev -p 3000
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Start
```bash
bun run build
bun run start -p 3000
```

---

## API Endpoints

- `GET /install` : Returns raw automated bash installer script (`text/plain`).
- `GET /install.sh` : Alternate alias for installer payload.

Example execution:
```bash
curl -fsSL http://localhost:3000/install | sh
```
