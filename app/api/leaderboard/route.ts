import { NextResponse } from "next/server";
import { getCachedLeaderboardRows } from "@/lib/leaderboard-cache";

export async function GET() {
  const data = await getCachedLeaderboardRows();
  return NextResponse.json(data);
}
