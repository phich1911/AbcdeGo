"use client";

import { useEffect, useState } from "react";
import { getSession } from "@/lib/supabase";
import { KP_MOCK_1 } from "@/lib/exam-data/kp-mock-1";

const ADMIN_EMAIL = "phich1911@gmail.com";

export default function AdminExamPage() {
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [showAnswer, setShowAnswer] = useState<Record<number, boolean>>({});

  useEffect(() => {
    getSession().then((s) => {
      setAllowed(s?.user?.email === ADMIN_EMAIL);
    });
  }, []);

  if (allowed === null) return <div style={{ padding: 80, textAlign: "center", color: "var(--text-muted)" }}>กำลังตรวจสอบสิทธิ์...</div>;
  if (!allowed) return <div style={{ padding: 80, textAlign: "center", color: "var(--accent-red)" }}>ไม่มีสิทธิ์เข้าถึงหน้านี้</div>;

  const section = KP_MOCK_1.sections[activeSection];

  function toggleAnswer(id: number) {
    setShowAnswer((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function showAll() {
    const all: Record<number, boolean> = {};
    section.questions.forEach((q) => { all[q.id] = true; });
    setShowAnswer(all);
  }

  function hideAll() {
    setShowAnswer({});
  }

  return (
    <main style={{ maxWidth: 860, margin: "0 auto", padding: "80px 16px 64px" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}> Admin — ตรวจข้อสอบ</h1>
        <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{KP_MOCK_1.title}</p>
      </div>

      {/* Section tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {KP_MOCK_1.sections.map((sec, i) => (
          <button key={sec.id} onClick={() => { setActiveSection(i); setShowAnswer({}); }}
            style={{
              padding: "6px 16px", borderRadius: 980, fontSize: 13, fontWeight: 500,
              cursor: "pointer", border: "1px solid var(--border)",
              background: activeSection === i ? "var(--primary)" : "var(--surface)",
              color: activeSection === i ? "#fff" : "var(--text-muted)",
            }}>
            {sec.shortTitle} ({sec.questionCount} ข้อ)
          </button>
        ))}
      </div>

      {/* Section info */}
      <div className="card" style={{ padding: "16px 20px", marginBottom: 24, display: "flex", gap: 24, flexWrap: "wrap" }}>
        <span style={{ fontSize: 13, color: "var(--text-muted)" }}>ผ่านเกณฑ์: <strong style={{ color: "var(--text)" }}>{section.passingPercent}%</strong></span>
        <span style={{ fontSize: 13, color: "var(--text-muted)" }}>คะแนนเต็ม: <strong style={{ color: "var(--text)" }}>{section.totalScore} คะแนน</strong></span>
        <span style={{ fontSize: 13, color: "var(--text-muted)" }}>เวลาแนะนำ: <strong style={{ color: "var(--text)" }}>{section.timeRecommended} นาที</strong></span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button onClick={showAll} style={{ fontSize: 12, padding: "4px 12px", borderRadius: 6, border: "1px solid var(--border)", background: "var(--surface-2)", color: "var(--text-muted)", cursor: "pointer" }}>เปิดเฉลยทั้งหมด</button>
          <button onClick={hideAll} style={{ fontSize: 12, padding: "4px 12px", borderRadius: 6, border: "1px solid var(--border)", background: "var(--surface-2)", color: "var(--text-muted)", cursor: "pointer" }}>ซ่อนทั้งหมด</button>
        </div>
      </div>

      {/* Questions */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {section.questions.map((q, qi) => (
          <div key={q.id} className="card" style={{ padding: "20px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
              <p style={{ fontSize: 14, fontWeight: 600, margin: 0, flex: 1, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                <span style={{ color: "var(--text-muted)", marginRight: 8 }}>ข้อ {qi + 1}.</span>
                {q.question}
              </p>
              <button onClick={() => toggleAnswer(q.id)}
                style={{ fontSize: 12, padding: "4px 10px", borderRadius: 6, border: "1px solid var(--border)", background: "var(--surface-2)", color: "var(--primary)", cursor: "pointer", flexShrink: 0 }}>
                {showAnswer[q.id] ? "ซ่อนเฉลย" : "ดูเฉลย"}
              </button>
            </div>

            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
              {q.choices.map((choice, ci) => {
                const isCorrect = ci === q.correct;
                const show = showAnswer[q.id];
                return (
                  <div key={ci} style={{
                    padding: "8px 12px", borderRadius: 8, fontSize: 13,
                    background: show && isCorrect ? "rgba(52,199,89,0.1)" : "var(--surface-2)",
                    border: `1px solid ${show && isCorrect ? "rgba(52,199,89,0.4)" : "var(--border)"}`,
                    color: show && isCorrect ? "var(--accent-green)" : "var(--text-muted)",
                    fontWeight: show && isCorrect ? 600 : 400,
                    display: "flex", alignItems: "center", gap: 8,
                  }}>
                    <span style={{ flexShrink: 0, opacity: 0.5 }}>{["ก", "ข", "ค", "ง"][ci]}.</span>
                    {choice}
                    {show && isCorrect && <span style={{ marginLeft: "auto" }}>✓ </span>}
                  </div>
                );
              })}
            </div>

            {showAnswer[q.id] && q.explanation && (
              <div style={{ marginTop: 10, padding: "10px 14px", borderRadius: 8, background: "rgba(0,122,255,0.06)", border: "1px solid rgba(0,122,255,0.15)", fontSize: 12, color: "var(--text-muted)", lineHeight: 1.7 }}>
                 {q.explanation}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
