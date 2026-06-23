"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProgress } from "@/lib/progress";
import { getUser, getUnlockedExams, unlockExamWithXP } from "@/lib/supabase";

const XP_COST = 1000;

interface EExamProduct {
  id: string;
  examId: string;
  title: string;
  description: string;
  highlights: string[];
  questionCount: number;
  timeLimit: number;
  badge: string;
}

const E_EXAMS: EExamProduct[] = [
  {
    id: "mock-kp-1",
    examId: "kp-mock-1",
    title: "ข้อสอบจำลอง ก.พ. ชุดที่ 1",
    description: "ครบ 3 วิชา 100 ข้อ จับเวลา 180 นาที เหมือนสอบจริงทุกอย่าง",
    badge: "ก.พ.",
    questionCount: 100,
    timeLimit: 180,
    highlights: [],
  },
];

export default function EExamPage() {
  const router = useRouter();
  const [xp, setXp] = useState(0);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    setXp(getProgress().xp);
    getUser().then((u) => {
      setUserEmail(u?.email ?? null);
      if (u) getUnlockedExams().then(setUnlocked);
    });
  }, []);

  async function handleUnlock(product: EExamProduct) {
    if (!userEmail) { setAuthOpen(true); return; }
    if (xp < XP_COST) {
      setError(`XP ไม่พอ (มี ${xp.toLocaleString()} XP, ต้องการ ${XP_COST.toLocaleString()} XP)`);
      return;
    }
    setLoading(product.id);
    setError(null);
    const result = await unlockExamWithXP(product.examId, XP_COST);
    setLoading(null);
    if (!result.ok) { setError(result.error ?? "เกิดข้อผิดพลาด"); return; }

    setUnlocked((prev) => [...prev, product.examId]);
    setSuccess(`ปลดล็อค "${product.title}" สำเร็จ!`);
    setTimeout(() => setSuccess(null), 4000);
  }

  const stepsTo1000 = Math.ceil((XP_COST - xp) / 50);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <div className="max-w-3xl mx-auto px-4 pt-24 pb-12">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--text)" }}>e-Exam</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>สะสม XP ให้ครบ แล้วปลดล็อคข้อสอบจำลองได้ฟรี — XP ไม่ถูกหัก</p>
        </div>

        {/* XP Banner */}
        <div className="rounded-xl p-5 mb-8" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div className="flex items-center gap-3 mb-3">
            <span style={{ fontSize: 28 }}>⚡</span>
            <div>
              <p className="font-bold" style={{ color: "var(--text)", fontSize: 17 }}>
                XP ของคุณ: {xp.toLocaleString()} XP
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                {xp >= XP_COST
                  ? "✓ XP พอสำหรับปลดล็อคข้อสอบแล้ว!"
                  : `ต้องการอีก ${(XP_COST - xp).toLocaleString()} XP · เรียนบทเรียนเพิ่มอีกประมาณ ${stepsTo1000} บท`}
              </p>
            </div>
          </div>
          <div className="w-full rounded-full overflow-hidden" style={{ height: 8, background: "var(--surface-2)" }}>
            <div
              style={{
                height: "100%",
                borderRadius: 99,
                width: `${Math.min((xp / XP_COST) * 100, 100)}%`,
                background: xp >= XP_COST ? "var(--accent-green)" : "var(--primary)",
                transition: "width 0.5s",
              }}
            />
          </div>
          <p className="text-xs mt-1.5 text-right" style={{ color: "var(--text-subtle)" }}>
            {Math.min(xp, XP_COST).toLocaleString()} / {XP_COST.toLocaleString()} XP
          </p>
        </div>

        {/* Success / Error */}
        {success && (
          <div className="mb-4 px-4 py-3 rounded-lg text-sm" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", color: "var(--accent-green)" }}>
            ✓ {success}
          </div>
        )}
        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg text-sm" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "var(--accent-red)" }}>
            {error}
          </div>
        )}

        {/* Product Cards */}
        <div className="flex flex-col gap-5">
          {E_EXAMS.map((product) => {
            const isUnlocked = unlocked.includes(product.examId);
            const canAfford = xp >= XP_COST;
            const isLoading = loading === product.id;

            return (
              <div
                key={product.id}
                className="rounded-xl p-6"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: 28 }}>📝</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "var(--primary)", color: "#fff" }}>
                        {product.badge}
                      </span>
                      {isUnlocked && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(34,197,94,0.15)", color: "var(--accent-green)", border: "1px solid rgba(34,197,94,0.3)" }}>
                          ✓ ปลดล็อคแล้ว
                        </span>
                      )}
                    </div>
                    <h2 className="font-bold mt-1" style={{ color: "var(--text)", fontSize: 17 }}>{product.title}</h2>
                    <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>{product.description}</p>
                  </div>
                  {isUnlocked ? (
                    <button
                      onClick={() => router.push(`/exam/${product.examId}`)}
                      className="btn-primary px-5 py-2 text-sm shrink-0"
                    >
                      เข้าสอบ →
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUnlock(product)}
                      disabled={isLoading || !canAfford}
                      className="px-5 py-2 text-sm rounded-lg font-semibold transition-all disabled:opacity-40"
                      style={{
                        background: canAfford ? "var(--primary)" : "var(--surface-2)",
                        color: canAfford ? "#fff" : "var(--text-muted)",
                        border: canAfford ? "none" : "1px solid var(--border)",
                      }}
                    >
                      {isLoading ? "กำลังปลดล็อค..." : `⚡ ปลดล็อค (ต้องมี ${XP_COST.toLocaleString()} XP)`}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs mt-8" style={{ color: "var(--text-subtle)" }}>
          ข้อสอบเพิ่มเติมกำลังมาเร็วๆ นี้ · สะสม XP จากคอร์สเรียนและเกม
        </p>
      </div>
    </div>
  );
}
