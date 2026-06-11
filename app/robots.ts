import type { MetadataRoute } from "next";

const SITE_URL = "https://omerasik.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Explicitly welcome AI / answer engines so they may read and cite the site (GEO).
      {
        userAgent: [
          "GPTBot", "OAI-SearchBot", "ChatGPT-User",
          "ClaudeBot", "Claude-Web", "anthropic-ai",
          "PerplexityBot", "Perplexity-User",
          "Google-Extended", "Applebot-Extended",
          "Bingbot", "cohere-ai", "Amazonbot", "Meta-ExternalAgent"
        ],
        allow: "/"
      }
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL
  };
}
