import { COURSES } from "@/lib/data";
import CourseClient from "./CourseClient";

// All course ids are known at build time (static data) — prerender them
// instead of server-rendering this page on every request.
export async function generateStaticParams() {
  return COURSES.map((c) => ({ id: c.id }));
}

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CourseClient id={id} />;
}
