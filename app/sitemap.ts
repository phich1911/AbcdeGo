import { MetadataRoute } from "next";
import { COURSES, LESSONS } from "@/lib/data";
import { ARTICLES } from "@/lib/articles";

// Hardcoded (not imported from lib/exam-data) since that module is guarded
// to throw if ever pulled into a client-bundled file — matches the same
// pattern used in app/exam/[id]/page.tsx.
const EXAM_IDS = ["kp-mock-1", "kp-mock-2", "toeic-mock-1"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://abcdego.com";

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/courses`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/courses?cat=kp`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/courses?cat=eng-m`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/courses?cat=math-m`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/courses?cat=thai-m`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/courses?cat=physics-m`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/courses?cat=law`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/courses?cat=civil`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/courses?cat=toeic`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/e-exam`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/leaderboard`, lastModified: new Date(), changeFrequency: "daily", priority: 0.6 },
    { url: `${base}/tips`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/shop`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
    { url: `${base}/game`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/tarot`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/news`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
  ];

  const coursePages: MetadataRoute.Sitemap = COURSES.map((course) => ({
    url: `${base}/course/${course.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const articlePages: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: `${base}${article.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const lessonPages: MetadataRoute.Sitemap = LESSONS.map((lesson) => ({
    url: `${base}/lesson/${lesson.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const examPages: MetadataRoute.Sitemap = EXAM_IDS.map((id) => ({
    url: `${base}/exam/${id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...coursePages, ...articlePages, ...lessonPages, ...examPages];
}
