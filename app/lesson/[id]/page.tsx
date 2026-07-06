import { LESSONS } from "@/lib/data";
import LessonClient from "./LessonClient";

// All lesson ids are known at build time (static data) — prerender them
// instead of server-rendering this page on every request.
export async function generateStaticParams() {
  return LESSONS.map((l) => ({ id: l.id }));
}

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <LessonClient id={id} />;
}
