import { NextRequest } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://eaxskmgekbdrmmczptmq.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_bVnYGDvGfIiB1s26IUYo9A_vefPQl8R";

// Verifies the caller's Supabase access token against GoTrue and returns the
// authenticated user's id/email — never trust a client-supplied user_id alone.
export async function verifyUser(req: NextRequest): Promise<{ id: string; email: string | null } | null> {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  const token = auth.slice(7).trim();
  if (!token) return null;
  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    const user = await res.json();
    if (!user?.id) return null;
    return { id: user.id as string, email: (user.email as string) ?? null };
  } catch {
    return null;
  }
}
