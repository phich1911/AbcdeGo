import { NextResponse } from "next/server";
import { getLearnerCount } from "@/lib/supabase";

export async function GET() {
  const count = await getLearnerCount();
  return NextResponse.json({ count });
}
