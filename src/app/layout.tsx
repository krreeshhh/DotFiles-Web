import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "DotFiles · Arch Linux + Hyprland + Quickshell",
  description: "A reproducible, dynamic Material You Wayland desktop environment for Arch Linux featuring Hyprland (Lua API), Quickshell, and Universal PiP.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-background text-on-surface antialiased selection:bg-primary selection:text-on-primary">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
