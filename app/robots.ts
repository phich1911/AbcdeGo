import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://abcdego.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
