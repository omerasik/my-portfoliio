import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "@/styles/globals.css";
import FloatingParticles from "@/components/FloatingParticles";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "Omer Asik | Full-Stack Developer",
  description:
    "Full-stack developer based in Drongen, Belgium focused on building scalable web applications, automation workflows, and practical AI-powered features.",
  metadataBase: new URL("https://omerasik.dev"),
  icons: {
    icon: "/oa_logo.webp",
    shortcut: "/oa_logo.webp",
    apple: "/oa_logo.webp",
  },
  openGraph: {
    title: "Omer Asik | Full-Stack Developer",
    description:
      "Full-stack developer based in Drongen, Belgium focused on building scalable web applications, automation workflows, and practical AI-powered features.",
    url: "https://omerasik.dev",
    siteName: "Omer Asik Portfolio",
    locale: "en_GB",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} bg-charcoal text-white antialiased`}>
        <div className="fixed inset-0 -z-20 bg-charcoal">
          <div className="absolute inset-0 bg-grid-lines bg-[length:120px_120px] opacity-20" aria-hidden />
          <div className="absolute inset-0 bg-gradient-mesh opacity-60" aria-hidden />
        </div>
        <FloatingParticles />
        <Navbar />
        <div className="relative z-0 px-4 pb-16 pt-24 sm:px-6 lg:px-10 xl:px-16">{children}</div>
      </body>
    </html>
  );
}
