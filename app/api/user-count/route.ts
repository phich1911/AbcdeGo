import { NextResponse } from "next/server";
import { getRegisteredUserCount } from "@/lib/registered-count";

export async function GET() {
  const count = await getRegisteredUserCount();
  return NextResponse.json({ count });
}
