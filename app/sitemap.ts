import type { MetadataRoute } from "next";
import { LESSONS } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.abcdego.com";

  const staticRoutes = [
    { url: base, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${base}/courses`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${base}/about`, priority: 0.6, changeFrequency: "monthly" as const },
    { url: `${base}/contact`, priority: 0.6, changeFrequency: "monthly" as const },
    { url: `${base}/privacy`, priority: 0.4, changeFrequency: "monthly" as const },
    { url: `${base}/game`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${base}/tarot`, priority: 0.7, changeFrequency: "monthly" as const },
  ];

  const lessonRoutes = LESSONS.map((lesson) => ({
    url: `${base}/lesson/${lesson.id}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  return [...staticRoutes, ...lessonRoutes];
}
