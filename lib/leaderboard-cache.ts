import { unstable_cache } from "next/cache";
import { dedupeLeaderboard, type LeaderboardRow } from "@/lib/leaderboard-dedupe";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://eaxskmgekbdrmmczptmq.supabase.co";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_bVnYGDvGfIiB1s26IUYo9A_vefPQl8R";

// Server-only cache (30s) around the raw Supabase read, shared by the
// /api/leaderboard route (client fetches) and server components alike.
export const getCachedLeaderboardRows = unstable_cache(
  async (): Promise<LeaderboardRow[]> => {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/leaderboard?select=name,xp,avatar&order=xp.desc&limit=200`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
    );
    if (!res.ok) return [];
    return await res.json();
  },
  ["leaderboard-raw"],
  { revalidate: 30 }
);

export async function getLeaderboardServer(limit = 100): Promise<LeaderboardRow[]> {
  const data = await getCachedLeaderboardRows();
  if (!data || data.length === 0) return [];
  return dedupeLeaderboard(data, limit);
}
