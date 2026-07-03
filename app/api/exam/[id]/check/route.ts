import { NextRequest, NextResponse } from "next/server";
import { checkAnswer } from "@/lib/exam-data";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { sectionIndex, questionIndex, choice } = await req.json();
  if (typeof sectionIndex !== "number" || typeof questionIndex !== "number" || typeof choice !== "number")
    return NextResponse.json({ error: "invalid body" }, { status: 400 });

  const result = checkAnswer(id, sectionIndex, questionIndex, choice);
  if (!result) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(result);
}
