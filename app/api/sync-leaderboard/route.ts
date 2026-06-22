import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://eaxskmgekbdrmmczptmq.supabase.co";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export async function POST(req: NextRequest) {
  if (!SERVICE_KEY) {
    return NextResponse.json({ error: "SERVICE_KEY missing" }, { status: 500 });
  }

  const { name, xp, avatar, user_id } = await req.json();
  if (!name || xp == null || !user_id) return NextResponse.json({ error: "missing fields" }, { status: 400 });
  if (typeof xp !== "number" || xp < 0 || xp > 500000) return NextResponse.json({ error: "invalid xp" }, { status: 400 });

  const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // No unique constraint on user_id — select first, then update or insert
  const { data: existing } = await admin.from("leaderboard").select("id").eq("user_id", user_id).maybeSingle();

  let dbErr;
  if (existing) {
    const { error } = await admin.from("leaderboard").update({ name, xp, avatar: avatar ?? null }).eq("user_id", user_id);
    dbErr = error;
  } else {
    const { error } = await admin.from("leaderboard").insert({ user_id, name, xp, avatar: avatar ?? null });
    dbErr = error;
  }
  if (dbErr) return NextResponse.json({ error: dbErr.message }, { status: 500 });

  return NextResponse.json({ ok: true, v: "aaea106" });
}
