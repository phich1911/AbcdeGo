import { NextRequest, NextResponse } from "next/server";
import { verifyUser } from "@/lib/auth-server";

const PADDLE_API = "https://api.paddle.com";
const SUPABASE_URL = "https://eaxskmgekbdrmmczptmq.supabase.co";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export async function POST(req: NextRequest) {
  const user = await verifyUser(req);
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!SERVICE_KEY) return NextResponse.json({ error: "no SERVICE_KEY" }, { status: 500 });

  // Read the authenticated user's real XP server-side — never trust a client-supplied value.
  const xpRes = await fetch(
    `${SUPABASE_URL}/rest/v1/user_progress?select=xp&user_id=eq.${encodeURIComponent(user.id)}`,
    { headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` } }
  );
  const xpData = xpRes.ok ? await xpRes.json() : [];
  const xp: number = xpData?.[0]?.xp ?? 0;

  const steps = Math.min(Math.floor(xp / 1000), 10);
  const discountAmount = steps * 10;

  if (discountAmount <= 0) {
    return NextResponse.json({ discountCode: null });
  }

  // Create a one-time-use discount code in Paddle
  const res = await fetch(`${PADDLE_API}/discounts`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.PADDLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: String(discountAmount * 100),
      description: `XP Discount (${xp} XP)`,
      type: "flat",
      currency_code: "THB",
      enabled_for_checkout: true,
      usage_limit: 1,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Paddle discount error:", data);
    return NextResponse.json({ discountCode: null });
  }

  return NextResponse.json({ discountCode: data.data.code });
}
