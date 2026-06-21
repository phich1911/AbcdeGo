"use client";

import { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { KP_MOCK_1 } from "@/lib/exam-data/kp-mock-1";
import type { MockExam, ExamSection } from "@/lib/exam-data/kp-mock-1";
import { completeLesson } from "@/lib/progress";
import { syncLeaderboard } from "@/lib/supabase";

const EXAMS: Record<string, MockExam> = {
  "kp-mock-1": KP_MOCK_1,
};

type Phase = "intro" | "exam" | "results";

function formatTime(secs: number) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function ExamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const exam = EXAMS[id];

  const [phase, setPhase] = useState<Phase>("intro");
  const [sectionIdx, setSectionIdx] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  // answers: flat index → choice index
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(exam ? exam.totalTime * 60 : 0);
  const [submitted, setSubmitted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (phase === "exam" && !submitted) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current!);
            handleSubmit();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, submitted]);

  if (!exam) {
    return <div className="p-10 text-center">ไม่พบข้อสอบนี้</div>;
  }

  // Build flat question list with section info
  const flatQuestions = exam.sections.flatMap((sec) =>
    sec.questions.map((q) => ({ ...q, section: sec }))
  );
  const totalQ = flatQuestions.length;

  // Offset per section for flat index
  const sectionOffsets = exam.sections.reduce<number[]>((acc, sec, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + exam.sections[i - 1].questions.length);
    return acc;
  }, []);

  const currentSection: ExamSection = exam.sections[sectionIdx];
  const currentFlatIdx = sectionOffsets[sectionIdx] + questionIdx;
  const currentQ = currentSection.questions[questionIdx];

  function handleAnswer(choice: number) {
    setAnswers((prev) => ({ ...prev, [currentFlatIdx]: choice }));
  }

  function goNext() {
    if (questionIdx + 1 < currentSection.questions.length) {
      setQuestionIdx((i) => i + 1);
    } else if (sectionIdx + 1 < exam.sections.length) {
      setSectionIdx((i) => i + 1);
      setQuestionIdx(0);
    }
  }

  function goPrev() {
    if (questionIdx > 0) {
      setQuestionIdx((i) => i - 1);
    } else if (sectionIdx > 0) {
      const prevSec = exam.sections[sectionIdx - 1];
      setSectionIdx((i) => i - 1);
      setQuestionIdx(prevSec.questions.length - 1);
    }
  }

  function handleSubmit() {
    if (timerRef.current) clearInterval(timerRef.current);
    setSubmitted(true);
    setPhase("results");
  }

  // ── Results calculation ────────────────────────────────────────
  function calcResults() {
    return exam.sections.map((sec, si) => {
      const offset = sectionOffsets[si];
      let correct = 0;
      sec.questions.forEach((_, qi) => {
        const flatIdx = offset + qi;
        if (answers[flatIdx] === sec.questions[qi].correct) correct++;
      });
      const scorePercent = Math.round((correct / sec.questionCount) * 100);
      const passed = scorePercent >= sec.passingPercent;
      return { sec, correct, scorePercent, passed };
    });
  }

  const answeredCount = Object.keys(answers).length;
  const timerColor = timeLeft < 600 ? "#ff3b30" : timeLeft < 1800 ? "#ff9500" : "var(--accent-green)";

  // ── INTRO ──────────────────────────────────────────────────────
  if (phase === "intro") {
    return (
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "80px 16px 48px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>
            {exam.title}
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 15, margin: 0 }}>
            อ่านคำแนะนำก่อนเริ่มสอบ
          </p>
        </div>

        {/* Overview card */}
        <div className="card" style={{ padding: 24, marginBottom: 20 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>ภาพรวมข้อสอบ</h2>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {[
              { label: "จำนวนข้อ", value: `${totalQ} ข้อ` },
              { label: "เวลารวม", value: `${exam.totalTime} นาที` },
              { label: "จำนวนวิชา", value: `${exam.sections.length} วิชา` },
              { label: "XP รางวัล", value: `${exam.xpReward.toLocaleString()} XP` },
            ].map((s) => (
              <div key={s.label}>
                <p style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "var(--primary)" }}>{s.value}</p>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: "var(--text-muted)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sections breakdown */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
          {exam.sections.map((sec, i) => (
            <div key={sec.id} className="card" style={{ padding: "16px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                <div>
                  <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: 14 }}>
                    วิชาที่ {i + 1}: {sec.title}
                  </p>
                  <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)" }}>
                    {sec.questionCount} ข้อ · {sec.totalScore} คะแนน · ผ่าน {sec.passingPercent}%
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "var(--accent)" }}>
                    ⏱ แนะนำ {sec.timeRecommended} นาที
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rules */}
        <div className="card" style={{ padding: 20, marginBottom: 28, background: "rgba(255,190,0,0.05)", borderColor: "rgba(255,190,0,0.2)" }}>
          <p style={{ margin: "0 0 8px", fontWeight: 700, fontSize: 13, color: "var(--accent)" }}>⚠️ กติกาข้อสอบ</p>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: "var(--text-muted)", lineHeight: 1.9 }}>
            <li>เวลารวม <strong style={{ color: "var(--text)" }}>3 ชั่วโมง (180 นาที)</strong> เมื่อหมดเวลาระบบส่งอัตโนมัติ</li>
            <li>ต้องผ่านทุกวิชาตามเกณฑ์จึงจะถือว่าสอบผ่าน</li>
            <li>สามารถข้ามข้อและย้อนกลับมาแก้ไขได้ตลอด</li>
            <li>ผ่านครบทุกวิชา → รับ <strong style={{ color: "var(--accent)" }}>{exam.xpReward.toLocaleString()} XP</strong> และยศ <strong style={{ color: "var(--primary)" }}>{exam.rankReward}</strong></li>
          </ul>
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button
            onClick={() => router.back()}
            style={{ padding: "10px 24px", borderRadius: 980, border: "1px solid var(--border)", background: "transparent", color: "var(--text-muted)", fontWeight: 600, cursor: "pointer", fontSize: 14 }}
          >
            ← กลับ
          </button>
          <button
            onClick={() => setPhase("exam")}
            style={{ padding: "10px 32px", borderRadius: 980, border: "none", background: "var(--primary)", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14 }}
          >
            เริ่มสอบเลย →
          </button>
        </div>
      </main>
    );
  }

  // ── RESULTS ────────────────────────────────────────────────────
  if (phase === "results") {
    const results = calcResults();
    const allPassed = results.every((r) => r.passed);

    if (allPassed) {
      // Award XP
      const updated = completeLesson(`exam-${exam.id}`, exam.xpReward, { correct: answeredCount, total: totalQ });
      syncLeaderboard(updated.xp);
    }

    return (
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "80px 16px 48px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>{allPassed ? "🎉" : "📊"}</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 6px", color: allPassed ? "var(--accent-green)" : "var(--text)" }}>
            {allPassed ? "ผ่านการสอบ!" : "ยังไม่ผ่านในครั้งนี้"}
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 14, margin: 0 }}>
            ตอบแล้ว {answeredCount}/{totalQ} ข้อ
          </p>
        </div>

        {allPassed && (
          <div className="card" style={{ padding: 20, marginBottom: 20, textAlign: "center", background: "rgba(52,199,89,0.06)", borderColor: "rgba(52,199,89,0.3)" }}>
            <p style={{ margin: "0 0 4px", fontWeight: 800, fontSize: 18, color: "var(--accent-green)" }}>
              ⚡ +{exam.xpReward.toLocaleString()} XP
            </p>
            <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)" }}>
              ได้รับยศ: <strong style={{ color: "var(--primary)" }}>{exam.rankReward}</strong>
            </p>
          </div>
        )}

        {/* Per-section results */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
          {results.map(({ sec, correct, scorePercent, passed }) => (
            <div key={sec.id} className="card" style={{ padding: "16px 20px", borderColor: passed ? "rgba(52,199,89,0.3)" : "rgba(255,59,48,0.3)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                <div>
                  <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: 14 }}>{sec.title}</p>
                  <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)" }}>
                    ถูก {correct}/{sec.questionCount} ข้อ · เกณฑ์ผ่าน {sec.passingPercent}%
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ margin: "0 0 2px", fontSize: 22, fontWeight: 800, color: passed ? "var(--accent-green)" : "var(--accent-red)" }}>
                    {scorePercent}%
                  </p>
                  <span style={{ fontSize: 12, fontWeight: 600, color: passed ? "var(--accent-green)" : "var(--accent-red)" }}>
                    {passed ? "✓ ผ่าน" : "✗ ไม่ผ่าน"}
                  </span>
                </div>
              </div>
              {/* Score bar */}
              <div style={{ marginTop: 10, height: 6, borderRadius: 3, background: "var(--border)", overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 3, width: `${scorePercent}%`, background: passed ? "var(--accent-green)" : "var(--accent-red)", transition: "width 0.6s" }} />
              </div>
            </div>
          ))}
        </div>

        {!allPassed && (
          <div className="card" style={{ padding: 16, marginBottom: 20, background: "rgba(255,59,48,0.04)", borderColor: "rgba(255,59,48,0.2)" }}>
            <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)" }}>
              💡 ต้องผ่านทุกวิชาตามเกณฑ์ ลองทบทวนบทเรียนในคอร์สฟรีแล้วกลับมาสอบใหม่ได้เลย
            </p>
          </div>
        )}

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => { setPhase("intro"); setAnswers({}); setTimeLeft(exam.totalTime * 60); setSubmitted(false); setSectionIdx(0); setQuestionIdx(0); }}
            style={{ padding: "10px 24px", borderRadius: 980, border: "1px solid var(--border)", background: "transparent", color: "var(--text-muted)", fontWeight: 600, cursor: "pointer", fontSize: 14 }}
          >
            สอบใหม่อีกครั้ง
          </button>
          <button
            onClick={() => router.push("/shop")}
            style={{ padding: "10px 28px", borderRadius: 980, border: "none", background: "var(--primary)", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14 }}
          >
            กลับร้านค้า
          </button>
        </div>
      </main>
    );
  }

  // ── EXAM ───────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "var(--bg)", borderBottom: "1px solid var(--border)",
        padding: "10px 16px", display: "flex", alignItems: "center", gap: 12,
      }}>
        {/* Section tabs */}
        <div style={{ display: "flex", gap: 6, flex: 1, overflow: "auto" }}>
          {exam.sections.map((sec, i) => {
            const offset = sectionOffsets[i];
            const answered = sec.questions.filter((_, qi) => answers[offset + qi] !== undefined).length;
            return (
              <button
                key={sec.id}
                onClick={() => { setSectionIdx(i); setQuestionIdx(0); }}
                style={{
                  padding: "5px 12px", borderRadius: 980, fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
                  border: "1px solid var(--border)",
                  background: sectionIdx === i ? "var(--primary)" : "var(--surface)",
                  color: sectionIdx === i ? "#fff" : "var(--text-muted)",
                }}
              >
                {sec.shortTitle} ({answered}/{sec.questionCount})
              </button>
            );
          })}
        </div>

        {/* Timer */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>⏱</span>
          <span style={{ fontSize: 16, fontWeight: 800, fontVariantNumeric: "tabular-nums", color: timerColor }}>
            {formatTime(timeLeft)}
          </span>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          style={{ padding: "6px 16px", borderRadius: 980, border: "none", background: "var(--primary)", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer", flexShrink: 0 }}
        >
          ส่งคำตอบ
        </button>
      </div>

      {/* Question area */}
      <main style={{ maxWidth: 720, margin: "0 auto", padding: "80px 16px 120px", flex: 1 }}>
        {/* Question number breadcrumb */}
        <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>
          {currentSection.shortTitle} · ข้อ {questionIdx + 1} จาก {currentSection.questions.length}
        </p>

        <div className="card" style={{ padding: 28, marginBottom: 20 }}>
          <p style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.7, whiteSpace: "pre-line", margin: "0 0 24px" }}>
            {currentFlatIdx + 1}. {currentQ.question}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {currentQ.choices.map((choice, ci) => {
              const selected = answers[currentFlatIdx] === ci;
              return (
                <button
                  key={ci}
                  onClick={() => handleAnswer(ci)}
                  style={{
                    textAlign: "left", padding: "12px 16px", borderRadius: 12, cursor: "pointer", fontWeight: 500, fontSize: 14, lineHeight: 1.5,
                    border: `2px solid ${selected ? "var(--primary)" : "var(--border)"}`,
                    background: selected ? "rgba(0,122,255,0.08)" : "var(--surface)",
                    color: selected ? "var(--primary)" : "var(--text)",
                    transition: "all 0.15s",
                  }}
                >
                  <span style={{ fontWeight: 700, marginRight: 8, color: "var(--text-muted)" }}>
                    {String.fromCharCode(65 + ci)}.
                  </span>
                  {choice}
                </button>
              );
            })}
          </div>
        </div>

        {/* Prev / Next */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            onClick={goPrev}
            disabled={sectionIdx === 0 && questionIdx === 0}
            style={{ padding: "8px 20px", borderRadius: 980, border: "1px solid var(--border)", background: "transparent", color: "var(--text-muted)", fontWeight: 600, fontSize: 13, cursor: "pointer", opacity: (sectionIdx === 0 && questionIdx === 0) ? 0.3 : 1 }}
          >
            ← ก่อนหน้า
          </button>
          <button
            onClick={goNext}
            disabled={sectionIdx === exam.sections.length - 1 && questionIdx === currentSection.questions.length - 1}
            style={{ padding: "8px 20px", borderRadius: 980, border: "none", background: "var(--primary)", color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer", opacity: (sectionIdx === exam.sections.length - 1 && questionIdx === currentSection.questions.length - 1) ? 0.3 : 1 }}
          >
            ถัดไป →
          </button>
        </div>
      </main>

      {/* Question grid navigator (bottom) */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "var(--bg)", borderTop: "1px solid var(--border)",
        padding: "10px 16px",
      }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", gap: 6, flexWrap: "wrap" }}>
          {currentSection.questions.map((_, qi) => {
            const flatIdx = sectionOffsets[sectionIdx] + qi;
            const isAnswered = answers[flatIdx] !== undefined;
            const isCurrent = qi === questionIdx;
            return (
              <button
                key={qi}
                onClick={() => setQuestionIdx(qi)}
                style={{
                  width: 30, height: 30, borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: "pointer",
                  border: isCurrent ? "2px solid var(--primary)" : "1px solid var(--border)",
                  background: isCurrent ? "var(--primary)" : isAnswered ? "rgba(0,122,255,0.12)" : "var(--surface)",
                  color: isCurrent ? "#fff" : isAnswered ? "var(--primary)" : "var(--text-muted)",
                }}
              >
                {qi + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
