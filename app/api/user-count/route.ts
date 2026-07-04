import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { getRegisteredUserCount } from "@/lib/registered-count";

const getCachedUserCount = unstable_cache(
  getRegisteredUserCount,
  ["registered-user-count"],
  { revalidate: 300 }
);

export async function GET() {
  const count = await getCachedUserCount();
  return NextResponse.json({ count });
}
