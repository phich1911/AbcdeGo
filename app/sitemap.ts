import { MetadataRoute } from "next";
import { COURSES } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://abcdego.com";

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/courses`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/courses?cat=kp`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/courses?cat=dsi`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/courses?cat=eng-m`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/courses?cat=math-m`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/courses?cat=thai-m`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/progress`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
  ];

  const coursePages: MetadataRoute.Sitemap = COURSES.map((course) => ({
    url: `${base}/course/${course.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...coursePages];
}
