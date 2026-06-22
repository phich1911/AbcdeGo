import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://eaxskmgekbdrmmczptmq.supabase.co";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export async function POST(req: NextRequest) {
  if (!SERVICE_KEY) return NextResponse.json({ error: "SERVICE_KEY missing" }, { status: 500 });

  const auth = req.headers.get("authorization");
  if (!auth) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Get all rows
  const { data, error } = await admin.from("leaderboard").select("name, xp, avatar");
  if (error || !data) return NextResponse.json({ error: error?.message }, { status: 500 });

  // Find names with duplicates, keep highest XP row
  const best = new Map<string, { xp: number; avatar: string | null }>();
  for (const row of data) {
    if (!best.has(row.name) || row.xp > best.get(row.name)!.xp) {
      best.set(row.name, { xp: row.xp, avatar: row.avatar });
    }
  }

  // Delete all, then re-insert best
  const { error: delErr } = await admin.from("leaderboard").delete().neq("name", "");
  if (delErr) return NextResponse.json({ error: delErr.message }, { status: 500 });

  const rows = Array.from(best.entries()).map(([name, { xp, avatar }]) => ({ name, xp, avatar }));
  const { error: insErr } = await admin.from("leaderboard").insert(rows);
  if (insErr) return NextResponse.json({ error: insErr.message }, { status: 500 });

  return NextResponse.json({ ok: true, cleaned: data.length, after: rows.length });
}
