import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = "https://eaxskmgekbdrmmczptmq.supabase.co";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

const hdrs = () => ({
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
  "Content-Type": "application/json",
});

export async function POST(req: NextRequest) {
  if (!SERVICE_KEY) return NextResponse.json({ error: "no SERVICE_KEY" }, { status: 500 });

  const { user_id } = await req.json();
  if (!user_id) return NextResponse.json({ error: "missing user_id" }, { status: 400 });

  // Delete from leaderboard
  await fetch(`${SUPABASE_URL}/rest/v1/leaderboard?user_id=eq.${encodeURIComponent(user_id)}`, {
    method: "DELETE", headers: hdrs(),
  });

  // Delete from user_progress
  await fetch(`${SUPABASE_URL}/rest/v1/user_progress?user_id=eq.${encodeURIComponent(user_id)}`, {
    method: "DELETE", headers: hdrs(),
  });

  // Delete from game_scores
  await fetch(`${SUPABASE_URL}/rest/v1/game_scores?user_id=eq.${encodeURIComponent(user_id)}`, {
    method: "DELETE", headers: hdrs(),
  });

  // Delete auth user (requires admin API)
  const res = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${user_id}`, {
    method: "DELETE", headers: hdrs(),
  });

  if (!res.ok) {
    const body = await res.text();
    return NextResponse.json({ error: body }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
