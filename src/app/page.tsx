import { Navbar } from "@/components/Navbar";
import { ThemeAtmosphere } from "@/components/ThemeAtmosphere";
import { Hero } from "@/components/Hero";
import { DesktopSimulation } from "@/components/DesktopSimulation";
import { WallpaperScratchpad } from "@/components/WallpaperScratchpad";
import { ScrollShowcase } from "@/components/ScrollShowcase";
import { KeybindingsMatrix } from "@/components/KeybindingsMatrix";
import { ArchitectureDocs } from "@/components/ArchitectureDocs";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-on-surface relative">
      <ThemeAtmosphere />
      <Navbar />
      <Hero />
      <DesktopSimulation />
      <WallpaperScratchpad />
      <ScrollShowcase />
      <KeybindingsMatrix />
      <ArchitectureDocs />
      <Footer />
    </main>
  );
}
