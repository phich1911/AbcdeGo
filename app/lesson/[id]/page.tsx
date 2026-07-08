import type { Metadata } from "next";
import { LESSONS, getLesson, getCourse } from "@/lib/data";
import LessonClient from "./LessonClient";

// All lesson ids are known at build time (static data) — prerender them
// instead of server-rendering this page on every request.
export async function generateStaticParams() {
  return LESSONS.map((l) => ({ id: l.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const lesson = getLesson(id);
  if (!lesson) return {};
  const course = getCourse(lesson.courseId);
  const title = course ? `${lesson.title} — ${course.title}` : lesson.title;
  const description = course
    ? `บทเรียน "${lesson.title}" ในคอร์ส ${course.title} เรียนฟรี รับ ${lesson.xpReward.toLocaleString()} XP บน AbcdeGo`
    : `บทเรียน "${lesson.title}" เรียนฟรีบน AbcdeGo`;
  return {
    title,
    description,
    alternates: { canonical: `/lesson/${id}` },
    openGraph: { title, description },
  };
}

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <LessonClient id={id} />;
}
