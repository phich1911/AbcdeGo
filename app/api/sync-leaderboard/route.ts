import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://eaxskmgekbdrmmczptmq.supabase.co";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(req: NextRequest) {
  const { name, xp, oldName } = await req.json();
  if (!name || xp == null) return NextResponse.json({ error: "missing fields" }, { status: 400 });

  // Verify caller is authenticated
  const auth = req.headers.get("authorization");
  if (!auth) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const userClient = createClient(SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    global: { headers: { Authorization: auth } },
  });
  const { data: { user } } = await userClient.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  // Use service role to bypass RLS
  const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Collect all names ever used by this user
  const previousNames: string[] = user.user_metadata?.previous_names ?? [];
  const allNames = Array.from(new Set([name, oldName, ...previousNames].filter(Boolean)));

  // Delete all leaderboard entries for any name this user has used
  for (const n of allNames) {
    await admin.from("leaderboard").delete().eq("name", n);
  }

  // Save updated name history back to user metadata
  if (oldName && oldName !== name) {
    const updatedHistory = Array.from(new Set([oldName, ...previousNames]));
    await admin.auth.admin.updateUserById(user.id, {
      user_metadata: { ...user.user_metadata, previous_names: updatedHistory },
    });
  }

  // Insert fresh entry with current name only
  await admin.from("leaderboard").insert({ name, xp });

  return NextResponse.json({ ok: true });
}
