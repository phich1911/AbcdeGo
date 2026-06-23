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

  const { user_id, exam_id, xp_cost } = await req.json();
  if (!user_id || !exam_id || !xp_cost)
    return NextResponse.json({ error: "missing fields" }, { status: 400 });

  // Check already unlocked
  const checkRes = await fetch(
    `${SUPABASE_URL}/rest/v1/user_exams?select=exam_id&user_id=eq.${user_id}&exam_id=eq.${exam_id}`,
    { headers: hdrs() }
  );
  const existing = checkRes.ok ? await checkRes.json() : [];
  if (existing.length > 0) return NextResponse.json({ ok: true, already: true });

  // Get current XP from user_progress
  const xpRes = await fetch(
    `${SUPABASE_URL}/rest/v1/user_progress?select=xp&user_id=eq.${user_id}`,
    { headers: hdrs() }
  );
  const xpData = xpRes.ok ? await xpRes.json() : [];
  const currentXP: number = xpData?.[0]?.xp ?? 0;

  if (currentXP < xp_cost)
    return NextResponse.json({ error: `XP ไม่พอ (มี ${currentXP} XP, ต้องการ ${xp_cost} XP)` }, { status: 400 });

  // Insert unlock record (XP is not deducted — it's a level requirement, not currency)
  const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/user_exams`, {
    method: "POST",
    headers: hdrs(),
    body: JSON.stringify({ user_id, exam_id, unlocked_at: new Date().toISOString() }),
  });
  if (!insertRes.ok) return NextResponse.json({ error: "บันทึกการปลดล็อคไม่สำเร็จ" }, { status: 500 });

  return NextResponse.json({ ok: true });
}
