import { NextRequest, NextResponse } from "next/server";
import { verifyUser } from "@/lib/auth-server";
import { SET2_LESSONS } from "@/lib/lesson-data/set2-lessons";

const ADMIN_EMAIL = "phich1911@gmail.com";

export async function GET(req: NextRequest) {
  const caller = await verifyUser(req);
  if (!caller || caller.email !== ADMIN_EMAIL)
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  return NextResponse.json({ lessons: SET2_LESSONS });
}
