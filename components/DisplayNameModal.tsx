"use client";

import { useState } from "react";
import { setDisplayName } from "@/lib/supabase";

interface Props {
  onDone: (name: string) => void;
}

export default function DisplayNameModal({ onDone }: Props) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    const err = await setDisplayName(name.trim());
    if (err) { setError(err); setLoading(false); return; }
    onDone(name.trim());
  }

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-8"
        style={{ background: "rgba(12,10,26,0.98)", border: "1px solid rgba(124,58,237,0.3)", boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}
      >
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">👤</div>
          <h2 className="text-xl font-black mb-1">ตั้งชื่อที่แสดง</h2>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
            ชื่อนี้จะใช้แสดงในตาราง Leaderboard<br />สามารถเปลี่ยนได้ภายหลัง
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ชื่อเล่น / นามแฝง"
            maxLength={20}
            autoFocus
            required
            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}
            onFocus={(e) => (e.target.style.borderColor = "rgba(124,58,237,0.6)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
          />

          {error && (
            <p className="text-xs text-center px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !name.trim()}
            className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 disabled:opacity-40"
            style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-light))" }}
          >
            {loading ? "กำลังบันทึก..." : "ยืนยัน →"}
          </button>
        </form>
      </div>
    </div>
  );
}
