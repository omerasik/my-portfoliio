import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Omer Asik — Portfolio",
    short_name: "Omer Asik",
    description:
      "Portfolio of Omer Asik, a full-stack developer and automation engineer in Ghent, Belgium.",
    start_url: "/",
    display: "standalone",
    background_color: "#0e141b",
    theme_color: "#0e141b",
    lang: "en",
    categories: ["portfolio", "technology", "developer"],
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }
    ]
  };
}
