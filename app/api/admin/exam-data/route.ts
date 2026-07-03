import { NextRequest, NextResponse } from "next/server";
import { verifyUser } from "@/lib/auth-server";
import { EXAMS } from "@/lib/exam-data";

const ADMIN_EMAIL = "phich1911@gmail.com";

export async function GET(req: NextRequest) {
  const caller = await verifyUser(req);
  if (!caller || caller.email !== ADMIN_EMAIL)
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  return NextResponse.json({ exams: Object.values(EXAMS) });
}
