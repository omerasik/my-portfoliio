import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Syne } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import GlowCursor from "@/components/GlowCursor";
import Intro from "@/components/Intro";
import { LanguageProvider } from "@/lib/i18n";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne", weight: ["400", "600", "700", "800"], display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

const SITE_URL = "https://omerasik.dev";
const TITLE = "Omer Asik | Full-Stack Developer & Automation Engineer";
const DESCRIPTION =
  "Omer Asik is a full-stack developer in Ghent, Belgium, building modern web applications, business automation with the Microsoft Power Platform and AI agents.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  keywords: [
    "Omer Asik", "full-stack developer", "automation engineer", "AI agents",
    "Power Platform developer", "Business Central", "Power Apps", "Power Automate",
    "Azure DevOps", "React developer", "Next.js developer", "web developer Ghent",
    "developer Belgium"
  ],
  authors: [{ name: "Omer Asik", url: SITE_URL }],
  creator: "Omer Asik",
  alternates: { canonical: SITE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 }
  },
  icons: { icon: "/oa_logo.webp", shortcut: "/oa_logo.webp", apple: "/oa_logo.webp" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Omer Asik",
    locale: "en_GB",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION
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

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Omer Asik",
  url: SITE_URL,
  email: "mailto:omerfarukasik54@gmail.com",
  jobTitle: "Full-Stack Developer",
  description: DESCRIPTION,
  address: { "@type": "PostalAddress", addressLocality: "Ghent", addressCountry: "BE" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Artevelde University of Applied Sciences" },
  worksFor: { "@type": "Organization", name: "Astena" },
  knowsAbout: [
    "Full-Stack Development", "React", "Next.js", "Node.js", "TypeScript",
    "Business Automation", "Microsoft Power Platform", "Dynamics 365 Business Central",
    "Power Apps", "Power Automate", "Azure DevOps", "AI Agents"
  ],
  sameAs: ["https://github.com/omerasik", "https://www.linkedin.com/in/omerasik/"]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <body className="bg-bg text-ink antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />

        {/* Ambient background */}
        <div className="ambient-bg" aria-hidden>
          <div className="blueprint-grid" />
        </div>

        <LanguageProvider>
          <Intro />
          <ScrollProgress />
          <GlowCursor />
          <Navbar />

          <div className="relative z-0 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
