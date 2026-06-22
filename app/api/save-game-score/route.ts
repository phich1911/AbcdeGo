import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = "https://eaxskmgekbdrmmczptmq.supabase.co";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

const hdrs = () => ({
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=minimal",
});

export async function POST(req: NextRequest) {
  if (!SERVICE_KEY) return NextResponse.json({ error: "no SERVICE_KEY" }, { status: 500 });

  const { game, score, user_id, display_name } = await req.json();
  if (!game || score == null || !user_id || !display_name)
    return NextResponse.json({ error: "missing fields" }, { status: 400 });
  if (typeof score !== "number" || score < 0)
    return NextResponse.json({ error: "invalid score" }, { status: 400 });

  // Get existing best score for this user+game
  const existRes = await fetch(
    `${SUPABASE_URL}/rest/v1/game_scores?select=score&user_id=eq.${encodeURIComponent(user_id)}&game=eq.${encodeURIComponent(game)}&order=score.desc&limit=1`,
    { headers: hdrs() }
  );
  const existing = existRes.ok ? await existRes.json() : [];
  const best: number = existing?.[0]?.score ?? -1;

  if (score <= best) {
    // Update display_name only
    await fetch(
      `${SUPABASE_URL}/rest/v1/game_scores?user_id=eq.${encodeURIComponent(user_id)}&game=eq.${encodeURIComponent(game)}`,
      { method: "PATCH", headers: hdrs(), body: JSON.stringify({ display_name }) }
    );
    return NextResponse.json({ ok: true, updated: "name_only" });
  }

  // New best — delete old rows then insert
  await fetch(
    `${SUPABASE_URL}/rest/v1/game_scores?user_id=eq.${encodeURIComponent(user_id)}&game=eq.${encodeURIComponent(game)}`,
    { method: "DELETE", headers: hdrs() }
  );
  const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/game_scores`, {
    method: "POST",
    headers: hdrs(),
    body: JSON.stringify({ user_id, display_name, game, score }),
  });

  if (!insertRes.ok) {
    const body = await insertRes.text();
    return NextResponse.json({ error: body }, { status: 500 });
  }

  return NextResponse.json({ ok: true, updated: "new_best" });
}
