import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = "https://eaxskmgekbdrmmczptmq.supabase.co";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

const HEADERS = () => ({
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=minimal",
});

export async function POST(req: NextRequest) {
  if (!SERVICE_KEY) return NextResponse.json({ error: "no SERVICE_KEY" }, { status: 500 });

  const { name, xp, avatar, user_id } = await req.json();
  if (!name || xp == null || !user_id) return NextResponse.json({ error: "missing fields" }, { status: 400 });
  if (typeof xp !== "number" || xp < 0 || xp > 500000) return NextResponse.json({ error: "invalid xp" }, { status: 400 });

  const hdrs = HEADERS();

  // Check if row exists
  const checkRes = await fetch(
    `${SUPABASE_URL}/rest/v1/leaderboard?select=id&user_id=eq.${encodeURIComponent(user_id)}&limit=1`,
    { headers: hdrs }
  );
  const rows = checkRes.ok ? await checkRes.json() : [];
  const exists = Array.isArray(rows) && rows.length > 0;

  let result: Response;
  if (exists) {
    result = await fetch(
      `${SUPABASE_URL}/rest/v1/leaderboard?user_id=eq.${encodeURIComponent(user_id)}`,
      { method: "PATCH", headers: hdrs, body: JSON.stringify({ name, xp, avatar: avatar ?? null }) }
    );
  } else {
    result = await fetch(
      `${SUPABASE_URL}/rest/v1/leaderboard`,
      { method: "POST", headers: hdrs, body: JSON.stringify({ user_id, name, xp, avatar: avatar ?? null }) }
    );
  }

  if (!result.ok) {
    const body = await result.text();
    return NextResponse.json({ error: body, action: exists ? "update" : "insert" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, v2: true });
}
