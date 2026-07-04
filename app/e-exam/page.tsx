"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getUser, getExamLeaderboard } from "@/lib/supabase";
import { getProgress } from "@/lib/progress";
import AuthModal from "@/components/AuthModal";

interface EExamProduct {
  id: string;
  examId: string;
  title: string;
  description: string;
  questionCount: number;
  timeLimit: number;
  xpRequired?: number;
}

interface EExamCategory {
  name: string;
  exams: EExamProduct[];
}

const E_EXAM_CATEGORIES: EExamCategory[] = [
  {
    name: "สอบ ก.พ.",
    exams: [
      {
        id: "mock-kp-1",
        examId: "kp-mock-1",
        title: "ข้อสอบจำลอง ก.พ. ชุดที่ 1",
        description: "ครบ 3 วิชา 100 ข้อ จับเวลา 180 นาที เหมือนสอบจริงทุกอย่าง",
        questionCount: 100,
        timeLimit: 180,
      },
      {
        id: "mock-kp-2",
        examId: "kp-mock-2",
        title: "ข้อสอบจำลอง ก.พ. ชุดที่ 2",
        description: "ครบ 3 วิชา 100 ข้อ จับเวลา 180 นาที โจทย์ยากขึ้นกว่าชุดที่ 1",
        questionCount: 100,
        timeLimit: 180,
        xpRequired: 2000,
      },
    ],
  },
];

const E_EXAMS = E_EXAM_CATEGORIES.flatMap((c) => c.exams);

type Passer = { name: string; avatar: string | null; rank: string | null };
type ExamScore = { display_name: string; score: number; total: number };

const VISIBLE_PASSERS = 8;

export default function EExamPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [passers, setPassers] = useState<Record<string, Passer[]>>({});
  const [scoreBoards, setScoreBoards] = useState<Record<string, ExamScore[]>>({});
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedPassers, setExpandedPassers] = useState<Record<string, boolean>>({});
  const [xp, setXp] = useState(0);

  useEffect(() => {
    setXp(getProgress().xp);
    getUser().then((u) => setUserEmail(u?.email ?? null));
    E_EXAMS.forEach((product) => {
      fetch(`/api/exam-passers?examId=${product.examId}`)
        .then((r) => r.json())
        .then((data) => setPassers((prev) => ({ ...prev, [product.examId]: data.passers ?? [] })))
        .catch(() => {});
      getExamLeaderboard(product.examId, 5)
        .then((rows) => setScoreBoards((prev) => ({ ...prev, [product.examId]: rows })))
        .catch(() => {});
    });
  }, []);

  function handleEnter(product: EExamProduct) {
    if (product.xpRequired && xp < product.xpRequired) return;
    if (!userEmail) { setAuthOpen(true); return; }
    router.push(`/exam/${product.examId}`);
  }

  const category = E_EXAM_CATEGORIES.find((c) => c.name === activeCategory) ?? null;

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      {authOpen && (
        <AuthModal
          onClose={() => setAuthOpen(false)}
          onSuccess={(email) => { setUserEmail(email); setAuthOpen(false); }}
        />
      )}
      <div className="max-w-3xl mx-auto px-4 pt-24 pb-12">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--text)" }}>e-Exam</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>ข้อสอบจำลองฟรี — แค่ login ก็เข้าสอบได้เลย</p>
        </div>

        {category === null ? (
          /* Category Cards */
          <div className="flex flex-col gap-4">
            {E_EXAM_CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className="card-lg flex items-center justify-between gap-3 p-6 text-left w-full"
              >
                <div>
                  <h2 className="font-bold" style={{ color: "var(--text)", fontSize: 18 }}>{cat.name}</h2>
                  <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>{cat.exams.length} ชุดข้อสอบ</p>
                </div>
                <span style={{ color: "var(--primary)", fontSize: 20 }}>→</span>
              </button>
            ))}
          </div>
        ) : (
          /* Exam Sets Inside Category */
          <div>
            <button
              onClick={() => setActiveCategory(null)}
              className="text-sm mb-4"
              style={{ color: "var(--primary)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              ← หมวดหมู่
            </button>
            <div
              className="rounded-xl p-6"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <h2 className="font-bold mb-4" style={{ color: "var(--text)", fontSize: 18 }}>{category.name}</h2>
              <div className="flex flex-col gap-3">
                {category.exams.map((product) => {
                  const examPassers = passers[product.examId];
                  const locked = !!product.xpRequired && xp < product.xpRequired;
                  return (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 rounded-lg p-4"
                      style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(34,197,94,0.15)", color: "var(--accent-green)", border: "1px solid rgba(34,197,94,0.3)" }}>
                            ✓ เรียนฟรี
                          </span>
                          {product.xpRequired && (
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: locked ? "rgba(240,136,62,0.15)" : "rgba(34,197,94,0.15)", color: locked ? "var(--accent)" : "var(--accent-green)", border: `1px solid ${locked ? "rgba(240,136,62,0.3)" : "rgba(34,197,94,0.3)"}` }}>
                              {locked ? "🔒" : "✓"} ต้องมี {product.xpRequired.toLocaleString()} XP
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold mt-1" style={{ color: "var(--text)", fontSize: 17 }}>{product.title}</h3>
                        <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>{product.description}</p>
                        {locked ? (
                          <p className="text-xs mt-1 font-semibold" style={{ color: "var(--accent)" }}>
                            ตอนนี้มี {xp.toLocaleString()} / {product.xpRequired!.toLocaleString()} XP — เก็บอีก {(product.xpRequired! - xp).toLocaleString()} XP เพื่อปลดล็อก (XP ไม่ถูกหัก)
                            <br />
                            <Link href="/courses" style={{ color: "var(--primary)", textDecoration: "underline" }}>
                              หา XP ได้จากการเรียนบทเรียนในคอร์สเรียน →
                            </Link>
                          </p>
                        ) : examPassers === undefined ? null : examPassers.length === 0 ? (
                          <p className="text-xs mt-1 font-semibold" style={{ color: "#ef4444" }}>⚠️ ยังไม่มีใครผ่านข้อสอบชุดนี้ — ลองเป็นคนแรกไหม?</p>
                        ) : (
                          <div className="mt-1">
                            <p className="text-xs" style={{ color: "var(--accent-green)" }}>
                              ✓ ผู้สอบผ่าน ({examPassers.length}):{" "}
                              {(expandedPassers[product.examId] ? examPassers : examPassers.slice(0, VISIBLE_PASSERS))
                                .map((p) => p.name)
                                .join(", ")}
                              {!expandedPassers[product.examId] && examPassers.length > VISIBLE_PASSERS && (
                                <>
                                  {" "}
                                  <button
                                    onClick={() => setExpandedPassers((prev) => ({ ...prev, [product.examId]: true }))}
                                    className="font-semibold"
                                    style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "var(--accent-green)", textDecoration: "underline" }}
                                  >
                                    และอีก {examPassers.length - VISIBLE_PASSERS} คน →
                                  </button>
                                </>
                              )}
                              {expandedPassers[product.examId] && examPassers.length > VISIBLE_PASSERS && (
                                <>
                                  {" "}
                                  <button
                                    onClick={() => setExpandedPassers((prev) => ({ ...prev, [product.examId]: false }))}
                                    className="font-semibold"
                                    style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "var(--accent-green)", textDecoration: "underline" }}
                                  >
                                    ย่อ ←
                                  </button>
                                </>
                              )}
                            </p>
                            {examPassers[0]?.rank && (
                              <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                                🏅 ทุกคนปลดล็อกยศ &quot;{examPassers[0].rank}&quot;
                              </p>
                            )}
                          </div>
                        )}
                        {!locked && scoreBoards[product.examId] && scoreBoards[product.examId].length > 0 && (
                          <div className="mt-2 rounded-lg p-2.5" style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)" }}>
                            <p className="text-xs font-semibold mb-1" style={{ color: "#f59e0b" }}>🏆 อันดับคะแนนสูงสุด</p>
                            <div className="flex flex-col gap-0.5">
                              {scoreBoards[product.examId].map((s, i) => (
                                <p key={i} className="text-xs" style={{ color: "var(--text-muted)" }}>
                                  {i + 1}. <strong style={{ color: "var(--text)" }}>{s.display_name}</strong> — {s.score}/{s.total}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleEnter(product)}
                        disabled={locked}
                        className={locked ? "px-5 py-2 text-sm rounded-lg font-semibold shrink-0 cursor-not-allowed" : "btn-primary px-5 py-2 text-sm shrink-0"}
                        style={locked ? { background: "var(--surface-2)", color: "var(--text-muted)", border: "1px solid var(--border)" } : undefined}
                      >
                        {locked ? "🔒 ล็อกอยู่" : "เข้าสอบ →"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <p className="text-center text-xs mt-8" style={{ color: "var(--text-subtle)" }}>
          ข้อสอบเพิ่มเติมกำลังมาเร็วๆ นี้
        </p>
      </div>
    </div>
  );
}
