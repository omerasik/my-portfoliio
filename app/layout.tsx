import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Syne } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import GlowCursor from "@/components/GlowCursor";
import Intro from "@/components/Intro";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne", weight: ["400", "600", "700", "800"], display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  title: "Ömer Aşık — Full-Stack Developer · Automation & AI",
  description:
    "Full-stack developer based in Ghent, Belgium. Building modern web applications, business automation, and AI agents.",
  metadataBase: new URL("https://omerasik.dev"),
  icons: { icon: "/oa_logo.webp", shortcut: "/oa_logo.webp", apple: "/oa_logo.webp" },
  openGraph: {
    title: "Ömer Aşık — Full-Stack Developer · Automation & AI",
    description:
      "Full-stack developer based in Ghent, Belgium. Building modern web applications, business automation, and AI agents.",
    url: "https://omerasik.dev",
    siteName: "Ömer Aşık",
    locale: "en_GB",
    type: "website"
  }
};

const themeScript = `
(function() {
  try {
    var t = localStorage.getItem("theme");
    if (t !== "light" && t !== "dark") t = "dark";
    document.documentElement.setAttribute("data-theme", t);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <body className="bg-bg text-ink antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Aurora ambient background */}
        <div className="aurora-bg" aria-hidden>
          <div className="aurora-grid" />
        </div>

        <Intro />
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
