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
import { projects } from "@/lib/data";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne", weight: ["400", "600", "700", "800"], display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

const SITE_URL = "https://omerasik.dev";

/* Brand shown everywhere on the site is the ASCII "Omer Asik".
   Turkish spellings live only in invisible SEO metadata (keywords + JSON-LD
   alternateName/description) so Turkish searches still resolve to this person. */
const FULL_NAME = "Omer Asik";
const NAME_VARIATIONS = [
  "Ömer Faruk Aşık",
  "Omer Faruk Asik",
  "Ömer Aşık",
  "Omer Asik",
  "Ömer Faruk Asik",
  "Omer Faruk Aşık",
  "Ömer Asik",
  "Omer Asık"
];

const TITLE = "Omer Asik | Full-Stack & Automation Developer";
const DESCRIPTION =
  "Omer Asik is a full-stack developer and automation engineer based in Ghent, Belgium — building web apps with React, Next.js and TypeScript and AI-driven automation on the Microsoft Power Platform and Dynamics 365 Business Central.";
const PROFILE_IMAGE = `${SITE_URL}/images/me_formeel.png`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  keywords: [
    ...NAME_VARIATIONS,
    "Omer Asik developer", "Omer Asik Ghent", "Omer Asik Belgium",
    "Omer Asik full-stack developer", "Omer Asik Power Platform",
    "Omer Asik AI automation", "Omer Asik portfolio", "Ömer Aşık kimdir",
    "Ömer Aşık developer", "full-stack developer", "automation engineer", "AI agents",
    "Power Platform developer", "Business Central", "Power Apps", "Power Automate",
    "Azure DevOps", "React developer", "Next.js developer", "web developer Ghent",
    "developer Belgium", "Astena", "Artevelde University"
  ],
  authors: [{ name: FULL_NAME, url: SITE_URL }],
  creator: FULL_NAME,
  publisher: FULL_NAME,
  applicationName: "Omer Asik — Portfolio",
  category: "technology",
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0e141b" },
    { media: "(prefers-color-scheme: light)", color: "#f6f5f0" }
  ],
  alternates: { canonical: SITE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 }
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg", apple: "/oa_logo.webp" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Omer Asik",
    locale: "en_GB",
    alternateLocale: ["nl_BE", "tr_TR", "fr_FR", "es_ES"],
    type: "profile",
    firstName: "Omer",
    lastName: "Asik",
    username: "omerasik"
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

/* Map real (publicly linkable) projects to schema entities so search engines and
   AI assistants can enumerate and cite Omer Asik's actual work. */
const projectListItems = projects
  .map((p) => {
    const link = p.links.find((l) => typeof l.href === "string" && l.href.startsWith("http"));
    if (!link?.href) return null;
    const isRepo = link.href.includes("github.com");
    return {
      "@type": "SoftwareSourceCode",
      name: p.title,
      description: p.description,
      ...(isRepo ? { codeRepository: link.href } : { url: link.href }),
      programmingLanguage: p.stack,
      keywords: p.stack.join(", "),
      author: { "@id": `${SITE_URL}/#person` }
    };
  })
  .filter(Boolean)
  .map((item, i) => ({ "@type": "ListItem", position: i + 1, item }));

const personJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: FULL_NAME,
      alternateName: NAME_VARIATIONS,
      givenName: "Omer",
      additionalName: "Faruk",
      familyName: "Asik",
      url: SITE_URL,
      image: PROFILE_IMAGE,
      email: "mailto:omerfarukasik54@gmail.com",
      jobTitle: ["Full-Stack Developer", "Automation Engineer"],
      mainEntityOfPage: { "@id": `${SITE_URL}/#profilepage` },
      description:
        "Ömer Faruk Aşık (also written Omer Asik or Omer Faruk Asik) is a full-stack developer and automation engineer based in Ghent, Belgium. He builds modern web applications with React, Next.js, TypeScript, Node.js and Laravel, and business automation and AI agents on the Microsoft Power Platform and Dynamics 365 Business Central.",
      disambiguatingDescription:
        "Full-stack developer and automation engineer in Ghent, Belgium. The names Ömer Aşık and Omer Asik refer to the same person.",
      knowsLanguage: ["English", "Dutch", "Turkish"],
      homeLocation: { "@type": "Place", name: "Ghent, Belgium" },
      address: { "@type": "PostalAddress", addressLocality: "Ghent", addressRegion: "East Flanders", addressCountry: "BE" },
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "Artevelde University of Applied Sciences" },
        { "@type": "EducationalOrganization", name: "CVO Gent" }
      ],
      worksFor: { "@type": "Organization", name: "Astena" },
      hasOccupation: {
        "@type": "Occupation",
        name: "Full-Stack Developer & Automation Engineer",
        occupationLocation: { "@type": "City", name: "Ghent, Belgium" }
      },
      knowsAbout: [
        "Full-Stack Development", "React", "Next.js", "TypeScript", "JavaScript", "Node.js",
        "PHP", "Laravel", "React Native", "Expo", "Tailwind CSS", "Supabase", "MySQL", "Prisma",
        "Docker", "Git", "CI/CD", "Azure DevOps", "Business Automation",
        "Microsoft Power Platform", "Power Apps", "Power Automate",
        "Dynamics 365 Business Central", "AL", "AI Agents", "REST APIs"
      ],
      sameAs: ["https://github.com/omerasik", "https://www.linkedin.com/in/omerasik/"]
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Omer Asik",
      alternateName: ["Omer Asik Portfolio", "Ömer Aşık", "Omer Asik"],
      description: DESCRIPTION,
      inLanguage: ["en", "nl", "fr", "es", "tr"],
      publisher: { "@id": `${SITE_URL}/#person` },
      about: { "@id": `${SITE_URL}/#person` }
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: TITLE,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#person` },
      mainEntity: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en",
      primaryImageOfPage: PROFILE_IMAGE
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#projects`,
      name: "Projects by Omer Asik",
      description:
        "Selected web, mobile, automation and AI projects built by Omer Asik.",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: projectListItems.length,
      itemListElement: projectListItems
    }
  ]
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
