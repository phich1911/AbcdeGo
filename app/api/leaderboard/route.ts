import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://eaxskmgekbdrmmczptmq.supabase.co";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_bVnYGDvGfIiB1s26IUYo9A_vefPQl8R";

const getCachedLeaderboard = unstable_cache(
  async () => {
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

export async function GET() {
  const data = await getCachedLeaderboard();
  return NextResponse.json(data);
}
