import { NextRequest, NextResponse } from "next/server";
import { scoreExam } from "@/lib/exam-data";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { mode, answers } = await req.json();
  const validMode = mode === "full" || typeof mode === "number";
  if (!validMode || typeof answers !== "object" || answers === null)
    return NextResponse.json({ error: "invalid body" }, { status: 400 });

  const result = scoreExam(id, mode, answers);
  if (!result) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(result);
}
