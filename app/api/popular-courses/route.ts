import { getPopularCourseIds } from "@/lib/popular-courses";
import { NextResponse } from "next/server";

export async function GET() {
  const ids = await getPopularCourseIds();
  return NextResponse.json(ids, {
    headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=60" },
  });
}
