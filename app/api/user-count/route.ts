import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://eaxskmgekbdrmmczptmq.supabase.co";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export async function GET() {
  if (!SERVICE_KEY) return NextResponse.json({ count: 0 });
  try {
    const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const { data, error } = await admin.auth.admin.listUsers({ page: 1, perPage: 1 });
    if (error) return NextResponse.json({ count: 0 });
    return NextResponse.json({ count: data.total ?? 0 });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
