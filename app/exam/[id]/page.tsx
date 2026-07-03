"use client";

import { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { PublicMockExam, PublicExamSection, ExamSectionResult } from "@/lib/exam-data/public-types";
import { completeLesson, pushProgressToCloud } from "@/lib/progress";
import { syncLeaderboard, saveExamScore, hasExamScore } from "@/lib/supabase";

type Phase = "loading" | "notfound" | "intro" | "mode" | "exam" | "results";
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

const THAI_MONTHS = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];

function formatThaiDateTime(d: Date) {
  const day = d.getDate();
  const month = THAI_MONTHS[d.getMonth()];
  const year = d.getFullYear() + 543;
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${day} ${month} ${year} เวลา ${hh}:${mm} น.`;
}

// Character-based wrap — Thai script has no inter-word spaces to break on.
function wrapTextChars(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  let line = "";
  for (const ch of text) {
    const test = line + ch;
    if (line && ctx.measureText(test).width > maxWidth) {
      lines.push(line);
      line = ch;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.fill();
}

export default function ExamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [exam, setExam] = useState<PublicMockExam | null>(null);
  const [examNotFound, setExamNotFound] = useState(false);

  const [phase, setPhase] = useState<Phase>("intro");
  const [mode, setMode] = useState<ExamMode>("full");
  const [sectionIdx, setSectionIdx] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [passedSections, setPassedSections] = useState<number[]>([]);
  const [lockedAnswers, setLockedAnswers] = useState<Record<number, boolean>>({});
  const [revealed, setRevealed] = useState<Record<number, { correctIndex: number; explanation: string }>>({});
  const [examResults, setExamResults] = useState<ExamSectionResult[] | null>(null);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [timedOut, setTimedOut] = useState(false);
  const [resultTime, setResultTime] = useState<Date | null>(null);
  const [hasFullAttempt, setHasFullAttempt] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (id) setPassedSections(getPassedSections(id));
  }, [id]);

  useEffect(() => {
    if (!exam) return;
    hasExamScore(exam.id).then(setHasFullAttempt);
  }, [exam]);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/exam/${id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled) return;
        if (data) setExam(data);
        else setExamNotFound(true);
      })
      .catch(() => { if (!cancelled) setExamNotFound(true); });
    return () => { cancelled = true; };
  }, [id]);

  // Derive which sections are active for the current mode
  const activeSections: PublicExamSection[] = exam
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

  if (examNotFound) {
    return <div className="p-10 text-center">ไม่พบข้อสอบนี้</div>;
  }
  if (!exam) {
    return <div className="p-10 text-center" style={{ color: "var(--text-muted)" }}>กำลังโหลด...</div>;
  }

  const sectionOffsets = activeSections.reduce<number[]>((acc, sec, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + activeSections[i - 1].questions.length);
    return acc;
  }, []);

  const totalQ = activeSections.reduce((s, sec) => s + sec.questions.length, 0);
  const currentSection: PublicExamSection = activeSections[sectionIdx];
  const currentFlatIdx = (sectionOffsets[sectionIdx] ?? 0) + questionIdx;
  const currentQ = currentSection?.questions[questionIdx];

  function startExam(selectedMode: ExamMode) {
    setMode(selectedMode);
    setAnswers({});
    setLockedAnswers({});
    setRevealed({});
    setExamResults(null);
    setSectionIdx(0);
    setQuestionIdx(0);
    setSubmitted(false);
    setTimedOut(false);
    const secs =
      selectedMode === "full"
        ? exam!.totalTime * 60
        : exam!.sections[selectedMode as number].timeRecommended * 60;
    setTimeLeft(secs);
    setPhase("exam");
  }

  async function handleAnswer(choice: number) {
    if (isSectionMode && lockedAnswers[currentFlatIdx]) return; // already locked
    setAnswers((prev) => ({ ...prev, [currentFlatIdx]: choice }));
    if (isSectionMode) {
      setLockedAnswers((prev) => ({ ...prev, [currentFlatIdx]: true }));
      try {
        const res = await fetch(`/api/exam/${exam!.id}/check`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sectionIndex: mode as number, questionIndex: questionIdx, choice }),
        });
        if (res.ok) {
          const data = await res.json();
          setRevealed((prev) => ({ ...prev, [currentFlatIdx]: { correctIndex: data.correctIndex, explanation: data.explanation } }));
        }
      } catch {}
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

  async function handleSubmit() {
    if (timerRef.current) clearInterval(timerRef.current);
    setSubmitted(true);
    setResultTime(new Date());
    try {
      const res = await fetch(`/api/exam/${exam!.id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, answers }),
      });
      if (res.ok) {
        const data = await res.json();
        setExamResults(data.results);
        setTotalCorrect(data.totalCorrect);
      }
    } catch {}
    setPhase("results");
  }

  function downloadResultImage() {
    if (!examResults) return;
    const results = examResults;
    const allPassed = results.every((r) => r.passed);
    const dateStr = formatThaiDateTime(resultTime ?? new Date());

    const W = 680;
    const PAD = 40;
    const measureCanvas = document.createElement("canvas");
    const mctx = measureCanvas.getContext("2d");
    if (!mctx) return;

    const titleFont = "bold 22px sans-serif";
    const rowFont = "bold 14px sans-serif";
    const rowSubFont = "12px sans-serif";

    mctx.font = titleFont;
    const titleLines = wrapTextChars(mctx, exam!.title, W - PAD * 2);

    const tableX = PAD;
    const tableW = W - PAD * 2;
    const subjectColWidth = tableW - 170;

    const lineH = 20;
    const rowPaddingY = 16;
    const rows = results.map(({ title, correct, passed, questionCount, totalScore, passingPercent }) => {
      mctx.font = rowFont;
      const subjectLines = wrapTextChars(mctx, title, subjectColWidth);
      mctx.font = rowSubFont;
      const got = Math.round((correct / questionCount) * totalScore);
      const passScore = Math.round((totalScore * passingPercent) / 100);
      const criteriaText = `เกณฑ์ผ่าน: ร้อยละ ${passingPercent} (${passScore} คะแนนขึ้นไป)`;
      const criteriaLines = wrapTextChars(mctx, criteriaText, subjectColWidth);
      const height = subjectLines.length * lineH + criteriaLines.length * 15 + rowPaddingY * 2;
      return { subjectLines, criteriaLines, full: totalScore, got, passed, height };
    });

    const titleBlockHeight = titleLines.length * 28;
    const topHeight = 20 + 76 + titleBlockHeight + 8 + 20 + 22 + 24;
    const tableHeaderHeight = 40;
    const tableRowsHeight = rows.reduce((a, r) => a + r.height, 0);
    const badgeHeight = 32 + 56 + 32;
    const footerHeight = 22 + 24;
    const H = topHeight + tableHeaderHeight + tableRowsHeight + badgeHeight + footerHeight + PAD;

    const scale = 2;
    const canvas = document.createElement("canvas");
    canvas.width = W * scale;
    canvas.height = H * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(scale, scale);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, W - 1, H - 1);

    let y = 20;
    ctx.textAlign = "center";
    ctx.font = "48px sans-serif";
    ctx.fillText("🏆", W / 2, y + 44);
    y += 76;

    ctx.fillStyle = "#111827";
    ctx.font = titleFont;
    titleLines.forEach((line) => {
      ctx.fillText(line, W / 2, y);
      y += 28;
    });
    y += 8;

    ctx.fillStyle = "#6b7280";
    ctx.font = "14px sans-serif";
    ctx.fillText("ผลการสอบ", W / 2, y);
    y += 20;
    ctx.fillText(dateStr, W / 2, y);
    y += 30;

    const colFullX = tableX + tableW - 130;
    const colGotX = tableX + tableW - 40;

    ctx.textAlign = "left";
    ctx.fillStyle = "#f3f4f6";
    ctx.fillRect(tableX, y, tableW, tableHeaderHeight);
    ctx.fillStyle = "#374151";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText("วิชาที่สอบ", tableX + 12, y + 25);
    ctx.textAlign = "center";
    ctx.fillText("คะแนนเต็ม", colFullX, y + 25);
    ctx.fillText("คะแนนที่ได้", colGotX, y + 25);
    ctx.textAlign = "left";
    y += tableHeaderHeight;

    rows.forEach((row, i) => {
      if (i % 2 === 1) {
        ctx.fillStyle = "#fafafa";
        ctx.fillRect(tableX, y, tableW, row.height);
      }
      let ry = y + rowPaddingY + lineH - 4;
      ctx.fillStyle = "#111827";
      ctx.font = rowFont;
      row.subjectLines.forEach((line) => {
        ctx.fillText(line, tableX + 12, ry);
        ry += lineH;
      });
      ctx.fillStyle = row.passed ? "#16a34a" : "#dc2626";
      ctx.font = rowSubFont;
      row.criteriaLines.forEach((line) => {
        ctx.fillText(line, tableX + 12, ry);
        ry += 15;
      });

      ctx.textAlign = "center";
      ctx.fillStyle = "#374151";
      ctx.font = "bold 16px sans-serif";
      ctx.fillText(row.full.toFixed(2), colFullX, y + row.height / 2 + 5);
      ctx.fillStyle = row.passed ? "#16a34a" : "#dc2626";
      ctx.fillText(row.got.toFixed(2), colGotX, y + row.height / 2 + 5);
      ctx.textAlign = "left";

      y += row.height;
      ctx.strokeStyle = "#e5e7eb";
      ctx.beginPath();
      ctx.moveTo(tableX, y);
      ctx.lineTo(tableX + tableW, y);
      ctx.stroke();
    });

    y += 24;

    ctx.textAlign = "center";
    const badgeColor = allPassed ? "#16a34a" : "#dc2626";
    ctx.fillStyle = allPassed ? "rgba(22,163,74,0.1)" : "rgba(220,38,38,0.1)";
    const badgeW = 200, badgeBoxH = 56;
    roundRect(ctx, W / 2 - badgeW / 2, y, badgeW, badgeBoxH, 28);
    ctx.fillStyle = badgeColor;
    ctx.font = "bold 20px sans-serif";
    ctx.fillText(allPassed ? "✓ ผ่าน" : "✗ ไม่ผ่าน", W / 2, y + 36);
    y += badgeBoxH + 32;

    ctx.fillStyle = "#9ca3af";
    ctx.font = "12px sans-serif";
    ctx.fillText("ทำข้อสอบฟรีที่", W / 2, y);
    y += 22;
    ctx.fillStyle = "#0ea5e9";
    ctx.font = "bold 18px sans-serif";
    ctx.fillText("AbcdeGo.com", W / 2, y);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const fileName = `ผลสอบ-${exam!.id}-${Date.now()}.png`;
      const file = new File([blob], fileName, { type: "image/png" });
      const nav = navigator as Navigator & {
        canShare?: (data: { files: File[] }) => boolean;
        share?: (data: { files: File[]; title?: string; text?: string }) => Promise<void>;
      };
      if (nav.canShare?.({ files: [file] }) && nav.share) {
        nav.share({ files: [file], title: exam!.title, text: allPassed ? "ผ่านข้อสอบจำลอง!" : "ผลสอบข้อสอบจำลอง" }).catch(() => {});
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
      }
    }, "image/png");
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
        locked: !hasFullAttempt,
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
          {!hasFullAttempt && (
            <p style={{ color: "var(--text-muted)", fontSize: 12, margin: "6px 0 0" }}>
              🔒 ต้องสอบ &quot;เต็มรูปแบบ&quot; ให้จบก่อน 1 ครั้งถึงจะฝึกรายวิชาได้ — เพื่อให้ครั้งแรกของทุกคนวัดผลจริง ไม่เห็นเฉลยล่วงหน้า
            </p>
          )}
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
                      ? "ต้องสอบ \"เต็มรูปแบบ\" ให้จบก่อน 1 ครั้ง (แบบไม่ดูเฉลย) ถึงจะฝึกรายวิชานี้ได้"
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
    if (!examResults) {
      return <div className="p-10 text-center" style={{ color: "var(--text-muted)" }}>กำลังตรวจคำตอบ...</div>;
    }
    const results = examResults;
    const allPassed = results.every((r) => r.passed);

    if (isFullMode && allPassed) {
      const updated = completeLesson(`exam-${exam.id}`, exam.xpReward, { correct: answeredCount, total: totalQ });
      syncLeaderboard(updated.xp);
      pushProgressToCloud();
    }

    if (isFullMode) {
      saveExamScore(exam.id, totalCorrect, totalQ);
      // Attempting a full run blind is what unlocks practice mode — flip it
      // optimistically so "เปลี่ยนโหมด" reflects it without a reload.
      if (!hasFullAttempt) setHasFullAttempt(true);
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
          {results.map(({ sectionId, title, correct, scorePercent, passed, questionCount, passingPercent }) => (
            <div key={sectionId} className="card" style={{ padding: "16px 20px", borderColor: passed ? "rgba(52,199,89,0.3)" : "rgba(255,59,48,0.3)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                <div>
                  <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: 14 }}>{title}</p>
                  <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)" }}>
                    ถูก {correct}/{questionCount} ข้อ · เกณฑ์ผ่าน {passingPercent}%
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

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <button
            onClick={downloadResultImage}
            style={{ padding: "10px 24px", borderRadius: 980, border: "none", background: "var(--accent-green)", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}
          >
            📸 บันทึก/แชร์ผลสอบ
          </button>
        </div>

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
              const reveal = revealed[currentFlatIdx];
              const isCorrect = reveal ? ci === reveal.correctIndex : false;
              const showResult = locked && Boolean(reveal);
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
          {isSectionMode && lockedAnswers[currentFlatIdx] && revealed[currentFlatIdx]?.explanation && (
            <div style={{ marginTop: 16, padding: "12px 16px", borderRadius: 12, background: "rgba(0,122,255,0.06)", border: "1px solid rgba(0,122,255,0.2)", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7 }}>
               <strong style={{ color: "var(--primary)" }}>เฉลย:</strong> {revealed[currentFlatIdx]?.explanation}
            </div>
          )}
          {isSectionMode && lockedAnswers[currentFlatIdx] && revealed[currentFlatIdx] && !revealed[currentFlatIdx]?.explanation && (
            <div style={{ marginTop: 16, padding: "10px 14px", borderRadius: 12, background: "rgba(52,199,89,0.06)", border: "1px solid rgba(52,199,89,0.2)", fontSize: 13, color: "var(--accent-green)" }}>
              ✓ คำตอบที่ถูกต้องคือข้อ {String.fromCharCode(65 + (revealed[currentFlatIdx]?.correctIndex ?? 0))}
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
