import { NextRequest, NextResponse } from "next/server";

const PADDLE_API = "https://api.paddle.com";

export async function POST(req: NextRequest) {
  const { xp } = await req.json();

  const steps = Math.min(Math.floor((xp ?? 0) / 500), 5);
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
      amount: String(discountAmount),
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
