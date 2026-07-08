import type { Metadata } from "next";
import { COURSES, getCourse } from "@/lib/data";
import CourseClient from "./CourseClient";

// All course ids are known at build time (static data) — prerender them
// instead of server-rendering this page on every request.
export async function generateStaticParams() {
  return COURSES.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const course = getCourse(id);
  if (!course) return {};
  const title = `${course.title} — เรียนฟรี ${course.totalLessons} บทเรียน`;
  const description = course.description || `เรียน ${course.title} ฟรี ${course.totalLessons} บทเรียน รับ ${course.xpReward.toLocaleString()} XP บน AbcdeGo`;
  return {
    title,
    description,
    alternates: { canonical: `/course/${id}` },
    openGraph: { title, description, images: [{ url: `/course/${id}/opengraph-image` }] },
    twitter: { card: "summary_large_image", title, description, images: [`/course/${id}/opengraph-image`] },
  };
}

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = getCourse(id);
  const jsonLd = course
    ? {
        "@context": "https://schema.org",
        "@type": "Course",
        name: course.title,
        description: course.description || `เรียน ${course.title} ฟรี บน AbcdeGo`,
        provider: { "@type": "Organization", name: "AbcdeGo", sameAs: "https://abcdego.com" },
        url: `https://abcdego.com/course/${id}`,
        isAccessibleForFree: true,
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "online",
          courseWorkload: `PT${course.totalLessons}H`,
        },
      }
    : null;
  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <CourseClient id={id} />
    </>
  );
}
