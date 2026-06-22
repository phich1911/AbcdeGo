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

  const { name, xp, oldName, avatar } = await req.json();
  if (!name || xp == null) return NextResponse.json({ error: "missing fields" }, { status: 400 });

  const auth = req.headers.get("authorization");
  const token = auth?.replace("Bearer ", "").trim();
  if (!token) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: { user }, error: authErr } = await admin.auth.getUser(token);
  if (!user) return NextResponse.json({ error: "unauthorized", detail: authErr?.message }, { status: 401 });

  // Upsert by user_id — prevents duplicates across devices/name changes
  const { error: insErr } = await admin.from("leaderboard").upsert(
    { user_id: user.id, name, xp, avatar: avatar ?? null },
    { onConflict: "user_id" }
  );
  if (insErr) return NextResponse.json({ error: insErr.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
