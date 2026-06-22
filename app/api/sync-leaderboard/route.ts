import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://eaxskmgekbdrmmczptmq.supabase.co";
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export async function POST(req: NextRequest) {
  // Debug: check env vars are loaded
  if (!SERVICE_KEY) {
    return NextResponse.json({ error: "SERVICE_KEY missing", env_keys: Object.keys(process.env).filter(k => k.includes("SUPA")) }, { status: 500 });
  }

  const { name, xp, avatar, user_id } = await req.json();
  if (!name || xp == null || !user_id) return NextResponse.json({ error: "missing fields" }, { status: 400 });
  if (typeof xp !== "number" || xp < 0 || xp > 500000) return NextResponse.json({ error: "invalid xp" }, { status: 400 });

  const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { error: insErr } = await admin.from("leaderboard").upsert(
    { user_id, name, xp, avatar: avatar ?? null },
    { onConflict: "user_id" }
  );
  if (insErr) return NextResponse.json({ error: insErr.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
