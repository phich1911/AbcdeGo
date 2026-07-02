"use client";

import { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { KP_MOCK_1 } from "@/lib/exam-data/kp-mock-1";
import type { MockExam, ExamSection } from "@/lib/exam-data/kp-mock-1";
import { KP_MOCK_2 } from "@/lib/exam-data/kp-mock-2";
import { completeLesson, pushProgressToCloud } from "@/lib/progress";
import { syncLeaderboard } from "@/lib/supabase";

const EXAMS: Record<string, MockExam> = {
  "kp-mock-1": KP_MOCK_1,
  "kp-mock-2": KP_MOCK_2,
};

type Phase = "intro" | "mode" | "exam" | "results";
// "full" = all sections, number = section index (0/1/2)
type ExamMode = "full" | number;

function formatTime(secs: number) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function getPassedSections(examId: string): number[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(`exam-passed-${examId}`) ?? "[]");
  } catch { return []; }
}

function savePassedSection(examId: string, sectionIndex: number) {
  const passed = getPassedSections(examId);
  if (!passed.includes(sectionIndex)) {
    localStorage.setItem(`exam-passed-${examId}`, JSON.stringify([...passed, sectionIndex]));
  }
}

export default function ExamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const exam = EXAMS[id];

  const [phase, setPhase] = useState<Phase>("intro");
  const [mode, setMode] = useState<ExamMode>("full");
  const [sectionIdx, setSectionIdx] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [passedSections, setPassedSections] = useState<number[]>([]);
  const [lockedAnswers, setLockedAnswers] = useState<Record<number, boolean>>({});
  const [timedOut, setTimedOut] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (id) setPassedSections(getPassedSections(id));
  }, [id]);

  // Derive which sections are active for the current mode
  const activeSections: ExamSection[] = exam
    ? mode === "full"
      ? exam.sections
      : [exam.sections[mode as number]]
    : [];

  const activeTime =
    mode === "full"
      ? exam?.totalTime ?? 0
      : exam?.sections[mode as number]?.timeRecommended ?? 0;

  const isSectionMode = mode !== "full";

  useEffect(() => {
    if (phase === "exam" && !submitted) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current!);
            setTimedOut(true);
            handleSubmit();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, submitted, isSectionMode]);

  if (!exam) {
    return <div className="p-10 text-center">ไม่พบข้อสอบนี้</div>;
  }

  const sectionOffsets = activeSections.reduce<number[]>((acc, sec, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + activeSections[i - 1].questions.length);
    return acc;
  }, []);

  const totalQ = activeSections.reduce((s, sec) => s + sec.questions.length, 0);
  const currentSection: ExamSection = activeSections[sectionIdx];
  const currentFlatIdx = (sectionOffsets[sectionIdx] ?? 0) + questionIdx;
  const currentQ = currentSection?.questions[questionIdx];

  function startExam(selectedMode: ExamMode) {
    setMode(selectedMode);
    setAnswers({});
    setLockedAnswers({});
    setSectionIdx(0);
    setQuestionIdx(0);
    setSubmitted(false);
    setTimedOut(false);
    const secs =
      selectedMode === "full"
        ? exam.totalTime * 60
        : exam.sections[selectedMode as number].timeRecommended * 60;
    setTimeLeft(secs);
    setPhase("exam");
  }

  function handleAnswer(choice: number) {
    if (isSectionMode && lockedAnswers[currentFlatIdx]) return; // already locked
    setAnswers((prev) => ({ ...prev, [currentFlatIdx]: choice }));
    if (isSectionMode) {
      setLockedAnswers((prev) => ({ ...prev, [currentFlatIdx]: true }));
    }
  }

  function goNext() {
    if (questionIdx + 1 < currentSection.questions.length) {
      setQuestionIdx((i) => i + 1);
    } else if (sectionIdx + 1 < activeSections.length) {
      setSectionIdx((i) => i + 1);
      setQuestionIdx(0);
    }
  }

  function goPrev() {
    if (questionIdx > 0) {
      setQuestionIdx((i) => i - 1);
    } else if (sectionIdx > 0) {
      const prevSec = activeSections[sectionIdx - 1];
      setSectionIdx((i) => i - 1);
      setQuestionIdx(prevSec.questions.length - 1);
    }
  }

  function handleSubmit() {
    if (timerRef.current) clearInterval(timerRef.current);
    setSubmitted(true);
    setPhase("results");
  }

  function calcResults() {
    return activeSections.map((sec, si) => {
      const offset = sectionOffsets[si];
      let correct = 0;
      sec.questions.forEach((q, qi) => {
        if (answers[offset + qi] === q.correct) correct++;
      });
      const scorePercent = Math.round((correct / sec.questionCount) * 100);
      const passed = scorePercent >= sec.passingPercent;
      return { sec, correct, scorePercent, passed };
    });
  }

  const answeredCount = Object.keys(answers).length;
  const timerColor = timeLeft < 600 ? "#ff3b30" : timeLeft < 1800 ? "#ff9500" : "var(--accent-green)";
  const isFullMode = mode === "full";

  // ── INTRO ──────────────────────────────────────────────────────
  if (phase === "intro") {
    return (
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "80px 16px 48px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}></div>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>
            {exam.title}
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 15, margin: 0 }}>
            เลือกโหมดการฝึกก่อนเริ่มสอบ
          </p>
        </div>

        {/* Overview card */}
        <div className="card" style={{ padding: 24, marginBottom: 20 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>ภาพรวมข้อสอบ</h2>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {[
              { label: "จำนวนข้อ", value: `${exam.sections.reduce((s, sec) => s + sec.questionCount, 0)} ข้อ` },
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
                     แนะนำ {sec.timeRecommended} นาที
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button
            onClick={() => router.back()}
            style={{ padding: "10px 24px", borderRadius: 980, border: "1px solid var(--border)", background: "transparent", color: "var(--text-muted)", fontWeight: 600, cursor: "pointer", fontSize: 14 }}
          >
            ← กลับ
          </button>
          <button
            onClick={() => setPhase("mode")}
            style={{ padding: "10px 32px", borderRadius: 980, border: "none", background: "var(--primary)", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14 }}
          >
            เลือกโหมด →
          </button>
        </div>
      </main>
    );
  }

  // ── MODE SELECTION ──────────────────────────────────────────────
  if (phase === "mode") {
    const modeOptions: { label: string; sub: string; badge: string; badgeColor: string; value: ExamMode; locked: boolean }[] = [
      ...exam.sections.map((sec, i) => ({
        label: `วิชาที่ ${i + 1}: ${sec.shortTitle}`,
        sub: `${sec.questionCount} ข้อ · ${sec.timeRecommended} นาที · ผ่าน ${sec.passingPercent}%`,
        badge: passedSections.includes(i) ? "✓ ผ่านแล้ว" : "ฝึกรายวิชา",
        badgeColor: passedSections.includes(i) ? "rgba(52,199,89,0.12)" : "rgba(0,122,255,0.12)",
        value: i as ExamMode,
        locked: false,
      })),
      {
        label: "ข้อสอบจำลองเต็มรูปแบบ",
        sub: `ครบ 3 วิชา 100 ข้อ · ${exam.totalTime} นาที · รับ ${exam.xpReward.toLocaleString()} XP`,
        badge: "แนะนำ",
        badgeColor: "rgba(52,199,89,0.12)",
        value: "full" as ExamMode,
        locked: false,
      },
    ];

    return (
      <main style={{ maxWidth: 640, margin: "0 auto", padding: "80px 16px 48px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px" }}>
            เลือกโหมดการฝึก
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 14, margin: 0 }}>
            1 สินค้านี้ปลดล็อคทุกโหมดด้านล่าง
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
          {modeOptions.map((opt) => (
            <button
              key={String(opt.value)}
              disabled={opt.locked}
              onClick={() => !opt.locked && startExam(opt.value)}
              style={{
                textAlign: "left", padding: "18px 20px", borderRadius: 16,
                cursor: opt.locked ? "not-allowed" : "pointer",
                border: `1px solid ${opt.locked ? "var(--border)" : "var(--border)"}`,
                background: opt.locked ? "var(--surface)" : "var(--surface)",
                opacity: opt.locked ? 0.5 : 1,
                transition: "border-color 0.15s, background 0.15s",
              }}
              onMouseEnter={(e) => {
                if (opt.locked) return;
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--primary)";
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,122,255,0.04)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLButtonElement).style.background = "var(--surface)";
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: 15, color: "var(--text)", display: "flex", alignItems: "center", gap: 6 }}>
                    {opt.locked && <span></span>}
                    {opt.label}
                  </p>
                  <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)" }}>
                    {opt.locked
                      ? typeof opt.value === "number"
                        ? `ต้องผ่านวิชาที่ ${opt.value} ก่อน`
                        : "ต้องผ่านครบทั้ง 3 วิชาก่อน"
                      : opt.sub}
                  </p>
                </div>
                <span style={{
                  flexShrink: 0, padding: "3px 10px", borderRadius: 980, fontSize: 11, fontWeight: 700,
                  background: opt.badgeColor,
                  color: passedSections.includes(opt.value as number) ? "var(--accent-green)" : opt.value === "full" ? "var(--accent-green)" : "var(--primary)",
                }}>
                  {opt.badge}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => setPhase("intro")}
            style={{ padding: "8px 20px", borderRadius: 980, border: "1px solid var(--border)", background: "transparent", color: "var(--text-muted)", fontWeight: 600, cursor: "pointer", fontSize: 13 }}
          >
            ← ย้อนกลับ
          </button>
        </div>
      </main>
    );
  }

  // ── RESULTS ────────────────────────────────────────────────────
  if (phase === "results") {
    const results = calcResults();
    const allPassed = results.every((r) => r.passed);

    if (isFullMode && allPassed) {
      const updated = completeLesson(`exam-${exam.id}`, exam.xpReward, { correct: answeredCount, total: totalQ });
      syncLeaderboard(updated.xp);
      pushProgressToCloud();
    }

    // Save section pass to localStorage
    if (!isFullMode && allPassed) {
      savePassedSection(id, mode as number);
      if (!passedSections.includes(mode as number)) {
        setPassedSections((prev) => [...prev, mode as number]);
      }
    }

    const sectionXp = isFullMode ? 0 : Math.round(exam.xpReward / 4);

    return (
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "80px 16px 48px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>{allPassed ? "" : timedOut ? "" : "✗"}</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 6px", color: allPassed ? "var(--accent-green)" : "#ff3b30" }}>
            {allPassed ? (isFullMode ? "ผ่านการสอบ!" : "ผ่านวิชานี้!") : timedOut ? "หมดเวลา!" : "ไม่ผ่านเกณฑ์"}
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 14, margin: 0 }}>
            ตอบแล้ว {answeredCount}/{totalQ} ข้อ
            {!isFullMode && ` · ${activeSections[0].title}`}
          </p>
        </div>

        {/* Full mode fail alert */}
        {isFullMode && !allPassed && (
          <div className="card" style={{ padding: 20, marginBottom: 20, background: "rgba(255,59,48,0.05)", borderColor: "rgba(255,59,48,0.3)", textAlign: "center" }}>
            <p style={{ margin: "0 0 6px", fontWeight: 800, fontSize: 16, color: "#ff3b30" }}>
              {timedOut ? " หมดเวลาก่อนทำครบ" : "✗ ยังไม่ผ่านเกณฑ์บางวิชา"}
            </p>
            <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)" }}>
              ต้องผ่านทุกวิชาตามเกณฑ์และทันเวลา — กดสอบใหม่อีกครั้งได้เลย
            </p>
          </div>
        )}

        {allPassed && isFullMode && (
          <div className="card" style={{ padding: 20, marginBottom: 20, textAlign: "center", background: "rgba(52,199,89,0.06)", borderColor: "rgba(52,199,89,0.3)" }}>
            <p style={{ margin: "0 0 4px", fontWeight: 800, fontSize: 18, color: "var(--accent-green)" }}>
              +{exam.xpReward.toLocaleString()} XP
            </p>
            <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)" }}>
              ได้รับยศ: <strong style={{ color: "var(--primary)" }}>{exam.rankReward}</strong>
            </p>
          </div>
        )}

        {allPassed && !isFullMode && sectionXp > 0 && (
          <div className="card" style={{ padding: 16, marginBottom: 20, textAlign: "center", background: "rgba(52,199,89,0.06)", borderColor: "rgba(52,199,89,0.3)" }}>
            <p style={{ margin: 0, fontSize: 14, color: "var(--text-muted)" }}>
              ทำครบ 3 วิชาในโหมดเต็มรูปแบบเพื่อรับ <strong style={{ color: "var(--accent-green)" }}>{exam.xpReward.toLocaleString()} XP</strong>
            </p>
          </div>
        )}

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
                  <p style={{ margin: "0 0 2px", fontSize: 22, fontWeight: 800, color: passed ? "var(--accent-green)" : "var(--accent-red, #ff3b30)" }}>
                    {scorePercent}%
                  </p>
                  <span style={{ fontSize: 12, fontWeight: 600, color: passed ? "var(--accent-green)" : "var(--accent-red, #ff3b30)" }}>
                    {passed ? "✓ ผ่าน" : "✗ ไม่ผ่าน"}
                  </span>
                </div>
              </div>
              <div style={{ marginTop: 10, height: 6, borderRadius: 3, background: "var(--border)", overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 3, width: `${scorePercent}%`, background: passed ? "var(--accent-green)" : "#ff3b30", transition: "width 0.6s" }} />
              </div>
            </div>
          ))}
        </div>

        {!allPassed && (
          <div className="card" style={{ padding: 16, marginBottom: 20, background: "rgba(255,59,48,0.04)", borderColor: "rgba(255,59,48,0.2)" }}>
            <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)" }}>
               ลองทบทวนบทเรียนในคอร์สฟรีแล้วกลับมาสอบใหม่ได้เลย
            </p>
          </div>
        )}

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => startExam(mode)}
            style={{ padding: "10px 24px", borderRadius: 980, border: "1px solid var(--border)", background: "transparent", color: "var(--text-muted)", fontWeight: 600, cursor: "pointer", fontSize: 14 }}
          >
            สอบใหม่อีกครั้ง
          </button>
          <button
            onClick={() => setPhase("mode")}
            style={{ padding: "10px 24px", borderRadius: 980, border: "1px solid var(--primary)", background: "transparent", color: "var(--primary)", fontWeight: 600, cursor: "pointer", fontSize: 14 }}
          >
            เปลี่ยนโหมด
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
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", userSelect: "none" }} onCopy={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}>
      {/* Top bar */}
      <div style={{
        position: "fixed", top: 60, left: 0, right: 0, zIndex: 90,
        background: "var(--bg)", borderBottom: "1px solid var(--border)",
        padding: "10px 16px", display: "flex", alignItems: "center", gap: 12,
      }}>
        {/* Section tabs (only show if multiple sections active) */}
        {activeSections.length > 1 && (
          <div style={{ display: "flex", gap: 6, flex: 1, overflow: "auto" }}>
            {activeSections.map((sec, i) => {
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
        )}

        {/* Section label (single section mode) */}
        {activeSections.length === 1 && (
          <div style={{ flex: 1, fontWeight: 700, fontSize: 13, color: "var(--text)" }}>
            {activeSections[0].shortTitle}
          </div>
        )}

        {/* Timer */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}></span>
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
      <main style={{ maxWidth: 720, margin: "0 auto", padding: "130px 16px 120px", flex: 1 }}>
        <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>
          {currentSection?.shortTitle} · ข้อ {questionIdx + 1} จาก {currentSection?.questions.length}
        </p>

        <div className="card" style={{ padding: 28, marginBottom: 20 }}>
          <p style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.7, whiteSpace: "pre-line", margin: "0 0 24px" }}>
            {currentQ?.id}. {currentQ?.question}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {currentQ?.choices.map((choice, ci) => {
              const selected = answers[currentFlatIdx] === ci;
              const locked = isSectionMode && lockedAnswers[currentFlatIdx];
              const isCorrect = ci === currentQ.correct;
              const showResult = locked;
              let borderColor = "var(--border)";
              let bg = "var(--surface)";
              let color = "var(--text)";
              if (showResult && isCorrect) { borderColor = "rgba(52,199,89,0.6)"; bg = "rgba(52,199,89,0.1)"; color = "var(--accent-green)"; }
              else if (showResult && selected && !isCorrect) { borderColor = "rgba(255,59,48,0.5)"; bg = "rgba(255,59,48,0.08)"; color = "#ff3b30"; }
              else if (!showResult && selected) { borderColor = "var(--primary)"; bg = "rgba(0,122,255,0.08)"; color = "var(--primary)"; }
              return (
                <button
                  key={ci}
                  onClick={() => handleAnswer(ci)}
                  disabled={locked}
                  style={{
                    textAlign: "left", padding: "12px 16px", borderRadius: 12,
                    cursor: locked ? "default" : "pointer",
                    fontWeight: 500, fontSize: 14, lineHeight: 1.5,
                    border: `2px solid ${borderColor}`,
                    background: bg, color,
                    transition: "all 0.15s",
                  }}
                >
                  <span style={{ fontWeight: 700, marginRight: 8, opacity: 0.6 }}>
                    {String.fromCharCode(65 + ci)}.
                  </span>
                  {choice}
                  {showResult && isCorrect && <span style={{ marginLeft: 8 }}>✓ </span>}
                </button>
              );
            })}
          </div>

          {/* Explanation — section mode only */}
          {isSectionMode && lockedAnswers[currentFlatIdx] && currentQ?.explanation && (
            <div style={{ marginTop: 16, padding: "12px 16px", borderRadius: 12, background: "rgba(0,122,255,0.06)", border: "1px solid rgba(0,122,255,0.2)", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7 }}>
               <strong style={{ color: "var(--primary)" }}>เฉลย:</strong> {currentQ.explanation}
            </div>
          )}
          {isSectionMode && lockedAnswers[currentFlatIdx] && !currentQ?.explanation && (
            <div style={{ marginTop: 16, padding: "10px 14px", borderRadius: 12, background: "rgba(52,199,89,0.06)", border: "1px solid rgba(52,199,89,0.2)", fontSize: 13, color: "var(--accent-green)" }}>
              ✓ คำตอบที่ถูกต้องคือข้อ {String.fromCharCode(65 + (currentQ?.correct ?? 0))}
            </div>
          )}
        </div>

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
            disabled={sectionIdx === activeSections.length - 1 && questionIdx === (currentSection?.questions.length ?? 0) - 1}
            style={{ padding: "8px 20px", borderRadius: 980, border: "none", background: "var(--primary)", color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer", opacity: (sectionIdx === activeSections.length - 1 && questionIdx === (currentSection?.questions.length ?? 0) - 1) ? 0.3 : 1 }}
          >
            ถัดไป →
          </button>
        </div>
      </main>

      {/* Question grid navigator */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "var(--bg)", borderTop: "1px solid var(--border)",
        padding: "10px 16px",
      }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", gap: 6, flexWrap: "wrap" }}>
          {currentSection?.questions.map((q, qi) => {
            const flatIdx = (sectionOffsets[sectionIdx] ?? 0) + qi;
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
                {q.id}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
