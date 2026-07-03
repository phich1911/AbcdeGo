import { NextRequest, NextResponse } from "next/server";
import { getPublicExam } from "@/lib/exam-data";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const exam = getPublicExam(id);
  if (!exam) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(exam);
}
