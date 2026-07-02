"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex-1 flex items-center justify-center px-6" style={{ paddingTop: 60, minHeight: "60vh" }}>
      <div style={{ textAlign: "center", maxWidth: 420 }}>
        <p style={{ fontSize: 15, fontWeight: 700, color: "var(--accent-red, #ef4444)", letterSpacing: "0.08em" }}>
          เกิดข้อผิดพลาด
        </p>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "var(--text)", margin: "8px 0 12px", letterSpacing: "-0.02em" }}>
          มีบางอย่างผิดพลาด
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 28, lineHeight: 1.7 }}>
          ขออภัยในความไม่สะดวก ลองโหลดหน้านี้ใหม่อีกครั้ง หรือกลับไปหน้าแรก
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button onClick={() => unstable_retry()} className="btn-primary" style={{ padding: "10px 22px", fontSize: 14 }}>
            ลองอีกครั้ง
          </button>
          <Link href="/" className="btn-secondary" style={{ padding: "10px 22px", fontSize: 14 }}>
            กลับหน้าแรก
          </Link>
        </div>
      </div>
    </main>
  );
}
