"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { PRODUCTS, calcDiscount, finalPrice } from "@/lib/products";
import { getProgress } from "@/lib/progress";
import { getSession } from "@/lib/supabase";
import AuthModal from "@/components/AuthModal";
import type { User } from "@supabase/supabase-js";

declare global {
  interface Window {
    Paddle?: {
      Initialize: (opts: { token: string }) => void;
      Checkout: { open: (opts: { items: { priceId: string; quantity: number }[]; customer?: { email: string }; discountCode?: string }) => void };
    };
  }
}

const CATEGORY_ICON: Record<string, string> = {
  "ก.พ.": "",
  "DSI": "",
};

export default function ShopPage() {
  const [xp, setXp] = useState(0);
  const [selectedCat, setSelectedCat] = useState<string>("ทั้งหมด");
  const [user, setUser] = useState<User | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [pendingPriceId, setPendingPriceId] = useState<string | null>(null);

  useEffect(() => {
    setXp(getProgress().xp);
    getSession().then((s) => setUser(s?.user ?? null)).catch(() => {});
  }, []);

  async function openPaddleCheckout(priceId: string, email: string) {
    let discountCode: string | null = null;
    if (xp >= 1000) {
      try {
        const session = await getSession();
        const res = await fetch("/api/create-discount", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token ?? ""}` },
        });
        const data = await res.json();
        discountCode = data.discountCode ?? null;
      } catch {}
    }

    window.Paddle?.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      customer: { email },
      ...(discountCode ? { discountCode } : {}),
    });
  }

  function handleBuy(priceId: string) {
    if (!user) {
      setPendingPriceId(priceId);
      setAuthOpen(true);
      return;
    }
    openPaddleCheckout(priceId, user.email!);
  }

  const categories = ["ทั้งหมด", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];
  const filtered = selectedCat === "ทั้งหมด" ? PRODUCTS : PRODUCTS.filter((p) => p.category === selectedCat);
  const discount = calcDiscount(xp);
  const xpToNext = discount < 100 ? 1000 - (xp % 1000) : 0;

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "80px 16px 48px" }}>
      <Script
        src="https://cdn.paddle.com/paddle/v2/paddle.js"
        onLoad={() => {
          window.Paddle?.Initialize({ token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN! });
        }}
      />
      {authOpen && (
        <AuthModal
          onClose={() => { setAuthOpen(false); setPendingPriceId(null); }}
          onSuccess={(email) => {
            const u = { email } as User;
            setUser(u);
            setAuthOpen(false);
            if (pendingPriceId) {
              openPaddleCheckout(pendingPriceId, email);
              setPendingPriceId(null);
            }
          }}
        />
      )}
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <h1 style={{ fontSize: "clamp(28px,5vw,40px)", fontWeight: 800, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
          ร้านค้า
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, margin: 0 }}>
          ข้อสอบจำลองจับเวลา เตรียมสอบราชการได้เลย
        </p>
      </div>

      {/* XP Discount Banner */}
      <div className="card" style={{ padding: "20px 24px", marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 32 }}></span>
          <div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: 16 }}>XP ของคุณ: {xp.toLocaleString()} XP</p>
            <p style={{ margin: "2px 0 0", fontSize: 13, color: "var(--text-muted)" }}>
              {discount > 0
                ? `ได้ส่วนลด ${discount} บาท ทุกชิ้น`
                : `สะสม XP อีก ${xpToNext} XP เพื่อรับส่วนลด 10 บาท`}
            </p>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 200 }}>
          {[1000, 2500, 5000, 7500, 10000].map((threshold) => (
            <div key={threshold} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 120, height: 6, borderRadius: 3, background: "var(--border)", overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 3, background: xp >= threshold ? "var(--accent-green)" : "var(--primary)", width: `${Math.min((xp / threshold) * 100, 100)}%`, transition: "width 0.4s" }} />
              </div>
              <span style={{ fontSize: 12, color: xp >= threshold ? "var(--accent-green)" : "var(--text-muted)" }}>
                {xp >= threshold ? "✓ " : ""} {threshold.toLocaleString()} XP = ลด {Math.floor(threshold / 1000) * 10} ฿
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Category filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {categories.map((cat) => (
          <button key={cat} onClick={() => setSelectedCat(cat)}
            style={{
              padding: "6px 16px", borderRadius: 980, fontSize: 13, fontWeight: 500, cursor: "pointer", border: "1px solid var(--border)",
              background: selectedCat === cat ? "var(--primary)" : "var(--surface)",
              color: selectedCat === cat ? "#fff" : "var(--text-muted)",
              transition: "all 0.15s",
            }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Products grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
        {filtered.map((product) => {
          const discounted = finalPrice(product.price, xp);
          const isSoon = !product.paddlePriceId;
          return (
            <div key={product.id} className="card-lg" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16, opacity: isSoon ? 0.85 : 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 28 }}>{CATEGORY_ICON[product.category] ?? ""}</span>
                <div>
                  <span style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 500 }}>{product.category}</span>
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, lineHeight: 1.3 }}>{product.title}</h3>
                </div>
              </div>

              <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>{product.description}</p>

              {product.highlights && (
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
                  {product.highlights.map((h) => (
                    <li key={h} style={{ fontSize: 12, color: "var(--text-muted)", display: "flex", gap: 6, alignItems: "flex-start" }}>
                      <span style={{ color: "var(--accent-green)", fontWeight: 700, flexShrink: 0 }}>✓ </span>
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ textAlign: "center" }}>
                  <p style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>{product.questionCount}</p>
                  <p style={{ margin: 0, fontSize: 11, color: "var(--text-muted)" }}>ข้อ</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>{product.timeLimit}</p>
                  <p style={{ margin: 0, fontSize: 11, color: "var(--text-muted)" }}>นาที</p>
                </div>
              </div>

              <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  {discount > 0 && (
                    <p style={{ margin: 0, fontSize: 12, color: "var(--text-muted)", textDecoration: "line-through" }}>
                      {product.price} บาท
                    </p>
                  )}
                  <p style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "var(--primary)" }}>
                    {discounted} บาท
                    {discount > 0 && <span style={{ fontSize: 12, color: "var(--accent-green)", marginLeft: 6 }}>-{discount}฿</span>}
                  </p>
                </div>
                <button
                  disabled={isSoon}
                  onClick={() => { if (!isSoon) handleBuy(product.paddlePriceId!); }}
                  style={{
                    padding: "8px 18px", borderRadius: 980, fontSize: 13, fontWeight: 600, border: "none", cursor: isSoon ? "default" : "pointer",
                    background: isSoon ? "var(--surface-2)" : "var(--primary)",
                    color: isSoon ? "var(--text-muted)" : "#fff",
                    transition: "opacity 0.15s",
                  }}
                >
                  {isSoon ? "เร็วๆ นี้" : "ซื้อเลย"}
                </button>
              </div>
              {!isSoon && (
                <p style={{ fontSize: 11, color: "var(--text-subtle)", textAlign: "center", margin: "4px 0 0" }}>
                  ไม่ต้องซื้อก็ได้ ถ้าอยากวัดดวง 
                </p>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
