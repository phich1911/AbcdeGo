import { NextRequest, NextResponse } from "next/server";
import { verifyUser } from "@/lib/auth-server";

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

  const caller = await verifyUser(req);
  if (!caller) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { exam_id, score, total, display_name } = await req.json();
  if (!exam_id || score == null || !total || !display_name)
    return NextResponse.json({ error: "missing fields" }, { status: 400 });
  if (typeof score !== "number" || score < 0 || typeof total !== "number" || total <= 0 || score > total)
    return NextResponse.json({ error: "invalid score" }, { status: 400 });

  // Always write under the authenticated caller's own id — never a client-supplied user_id.
  const user_id = caller.id;

  // A ranked score is locked on the first submission — retaking the exam
  // (with memorized answers) never changes it, only the display name.
  const existRes = await fetch(
    `${SUPABASE_URL}/rest/v1/exam_scores?select=score&user_id=eq.${encodeURIComponent(user_id)}&exam_id=eq.${encodeURIComponent(exam_id)}&limit=1`,
    { headers: hdrs() }
  );
  const existing = existRes.ok ? await existRes.json() : [];

  if (existing.length > 0) {
    // Already has a locked score — update display_name only
    await fetch(
      `${SUPABASE_URL}/rest/v1/exam_scores?user_id=eq.${encodeURIComponent(user_id)}&exam_id=eq.${encodeURIComponent(exam_id)}`,
      { method: "PATCH", headers: hdrs(), body: JSON.stringify({ display_name }) }
    );
    return NextResponse.json({ ok: true, updated: "name_only" });
  }

  // First-ever submission for this user+exam — this becomes their locked score
  const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/exam_scores`, {
    method: "POST",
    headers: hdrs(),
    body: JSON.stringify({ user_id, exam_id, display_name, score, total }),
  });

  if (!insertRes.ok) {
    const body = await insertRes.text();
    return NextResponse.json({ error: body }, { status: 500 });
  }

  return NextResponse.json({ ok: true, updated: "locked_in" });
}
