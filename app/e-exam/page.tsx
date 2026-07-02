"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/supabase";
import AuthModal from "@/components/AuthModal";

interface EExamProduct {
  id: string;
  examId: string;
  title: string;
  description: string;
  questionCount: number;
  timeLimit: number;
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
    ],
  },
];

const E_EXAMS = E_EXAM_CATEGORIES.flatMap((c) => c.exams);

type Passer = { name: string; avatar: string | null; rank: string | null };

export default function EExamPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [passers, setPassers] = useState<Record<string, Passer[]>>({});
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    getUser().then((u) => setUserEmail(u?.email ?? null));
    E_EXAMS.forEach((product) => {
      fetch(`/api/exam-passers?examId=${product.examId}`)
        .then((r) => r.json())
        .then((data) => setPassers((prev) => ({ ...prev, [product.examId]: data.passers ?? [] })))
        .catch(() => {});
    });
  }, []);

  function handleEnter(product: EExamProduct) {
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
                  return (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 rounded-lg p-4"
                      style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
                    >
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(34,197,94,0.15)", color: "var(--accent-green)", border: "1px solid rgba(34,197,94,0.3)" }}>
                          ✓ เรียนฟรี
                        </span>
                        <h3 className="font-bold mt-1" style={{ color: "var(--text)", fontSize: 17 }}>{product.title}</h3>
                        <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>{product.description}</p>
                        {examPassers === undefined ? null : examPassers.length === 0 ? (
                          <p className="text-xs mt-1 font-semibold" style={{ color: "#ef4444" }}>⚠️ ยังไม่มีใครผ่านข้อสอบชุดนี้ — ลองเป็นคนแรกไหม?</p>
                        ) : (
                          <div className="mt-1">
                            <p className="text-xs" style={{ color: "var(--accent-green)" }}>
                              ✓ ผู้สอบผ่าน ({examPassers.length}): {examPassers.map((p) => p.name).join(", ")}
                            </p>
                            {examPassers[0]?.rank && (
                              <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                                🏅 ทุกคนปลดล็อกยศ &quot;{examPassers[0].rank}&quot;
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleEnter(product)}
                        className="btn-primary px-5 py-2 text-sm shrink-0"
                      >
                        เข้าสอบ →
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
