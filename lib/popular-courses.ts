import { createClient } from "@supabase/supabase-js";
import { COURSES, getLessonsForCourse } from "@/lib/data";

// Build lesson-id → course-id map
const lessonToCourse: Record<string, string> = {};
for (const course of COURSES) {
  for (const lesson of getLessonsForCourse(course.id)) {
    lessonToCourse[lesson.id] = course.id;
  }
}

function categoryKey(courseId: string) {
  return COURSES.find((c) => c.id === courseId)?.category ?? "";
}

const FALLBACKS = ["kp-general", "dsi-2547", "eng-grammar"];

export async function getPopularCourseIds(): Promise<string[]> {
  try {
    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await admin
      .from("user_progress")
      .select("completed_lessons");

    if (error || !data) return FALLBACKS;

    // Count completions per course
    const counts: Record<string, number> = {};
    for (const row of data) {
      for (const lessonId of (row.completed_lessons ?? [])) {
        const courseId = lessonToCourse[lessonId];
        if (courseId) counts[courseId] = (counts[courseId] ?? 0) + 1;
      }
    }

    // Pick best course per category
    const bestPerCategory: Record<string, { id: string; count: number }> = {};
    for (const [id, count] of Object.entries(counts)) {
      const cat = categoryKey(id);
      if (!bestPerCategory[cat] || count > bestPerCategory[cat].count) {
        bestPerCategory[cat] = { id, count };
      }
    }

    const top6 = Object.values(bestPerCategory)
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)
      .map((e) => e.id);

    // Pad with fallbacks (one per category) if fewer than 3
    const result = [...top6];
    for (const fb of FALLBACKS) {
      if (result.length >= 3) break;
      const fbCat = categoryKey(fb);
      if (!result.some((id) => categoryKey(id) === fbCat)) result.push(fb);
    }

    return result;
  } catch {
    return FALLBACKS;
  }
}
