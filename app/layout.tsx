import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Syne } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import FloatingParticles from "@/components/FloatingParticles";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import GlowCursor from "@/components/GlowCursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne", weight: ["400","600","700","800"], display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  title: "Omer Asik — Full-Stack Developer",
  description: "Full-stack developer based in Ghent, Belgium. Building modern web applications, automation tools, and AI-powered products.",
  metadataBase: new URL("https://omerasik.dev"),
  icons: { icon: "/oa_logo.webp", shortcut: "/oa_logo.webp", apple: "/oa_logo.webp" },
  openGraph: {
    title: "Omer Asik — Full-Stack Developer",
    description: "Full-stack developer based in Ghent, Belgium. Building modern web applications, automation tools, and AI-powered products.",
    url: "https://omerasik.dev",
    siteName: "Omer Asik",
    locale: "en_GB",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${jetbrains.variable}`}>
      <body className="bg-void text-ink antialiased">
        {/* Layered background */}
        <div className="fixed inset-0 -z-20 bg-void" aria-hidden>
          {/* Grid */}
          <div className="absolute inset-0 bg-grid-void bg-[size:60px_60px] opacity-100" />
          {/* Radial glow top */}
          <div className="absolute inset-0 bg-radial-glow" />
          {/* Lime accent right */}
          <div className="absolute inset-0 bg-lime-glow" />
        </div>

        <FloatingParticles />
        <ScrollProgress />
        <GlowCursor />
        <Navbar />

        <div className="relative z-0 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {children}
        </div>
      </body>
    </html>
  );
}
