import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { DesktopSimulation } from "@/components/DesktopSimulation";
import { WallpaperPalettePicker } from "@/components/WallpaperPalettePicker";
import { ScrollShowcase } from "@/components/ScrollShowcase";
import { KeybindingsMatrix } from "@/components/KeybindingsMatrix";
import { ArchitectureDocs } from "@/components/ArchitectureDocs";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-on-surface relative">
      <Navbar />
      <Hero />
      <DesktopSimulation />
      <WallpaperPalettePicker />
      <ScrollShowcase />
      <KeybindingsMatrix />
      <ArchitectureDocs />
      <Footer />
    </main>
  );
}
