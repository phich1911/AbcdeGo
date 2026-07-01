import { NextRequest, NextResponse } from "next/server";
import { KP_MOCK_1 } from "@/lib/exam-data/kp-mock-1";

const SUPABASE_URL = "https://eaxskmgekbdrmmczptmq.supabase.co";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

const RANK_BY_EXAM: Record<string, string> = {
  "kp-mock-1": KP_MOCK_1.rankReward,
};

export async function GET(req: NextRequest) {
  const examId = req.nextUrl.searchParams.get("examId");
  if (!examId || !SERVICE_KEY) return NextResponse.json({ passers: [] });

  const rank = RANK_BY_EXAM[examId] ?? null;

  const lessonId = `exam-${examId}`;
  const hdrs = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` };

  try {
    const progRes = await fetch(
      `${SUPABASE_URL}/rest/v1/user_progress?select=user_id&completed_lessons=cs.{${lessonId}}`,
      { headers: hdrs }
    );
    if (!progRes.ok) return NextResponse.json({ passers: [] });
    const rows: { user_id: string }[] = await progRes.json();
    if (rows.length === 0) return NextResponse.json({ passers: [] });

    const ids = rows.map((r) => r.user_id);
    const orFilter = ids.map((id) => `user_id.eq.${id}`).join(",");
    const lbRes = await fetch(
      `${SUPABASE_URL}/rest/v1/leaderboard?select=name,avatar,user_id&or=(${orFilter})`,
      { headers: hdrs }
    );
    const lb: { name: string; avatar: string | null; user_id: string }[] = lbRes.ok ? await lbRes.json() : [];

    const passers = ids.map((id) => {
      const entry = lb.find((l) => l.user_id === id);
      return { name: entry?.name ?? "ผู้เรียน", avatar: entry?.avatar ?? null, rank };
    });

    return NextResponse.json({ passers: passers.slice(0, 20) });
  } catch {
    return NextResponse.json({ passers: [] });
  }
}
