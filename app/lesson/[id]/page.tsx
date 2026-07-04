"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { getLesson, getCourse, getLessonsForCourse, LESSONS } from "@/lib/data";
import { completeLesson, pushProgressToCloud } from "@/lib/progress";
import AuthModal from "@/components/AuthModal";
import { getSession, onAuthChange, syncLeaderboard } from "@/lib/supabase";
import { speakEnglish, stopSpeaking } from "@/lib/tts";
import { Lock, PartyPopper, Lightbulb, Zap, Volume2 } from "lucide-react";
import type { User } from "@supabase/supabase-js";

export default function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const lessonData = getLesson(id);
  if (!lessonData) notFound();
  const lesson = lessonData;

  const course = getCourse(lesson.courseId);
  const nextLesson = LESSONS.find(
    (l) => l.courseId === lesson.courseId && l.order === lesson.order + 1
  );
  const [stepIndex, setStepIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [fillInput, setFillInput] = useState("");
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [shake, setShake] = useState(false);
  const [done, setDone] = useState(false);
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [authOpen, setAuthOpen] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);
  const [stepEarned, setStepEarned] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const answerableCount = lesson.steps.filter((s) => s.type !== "info").length;
  const xpPerStep = answerableCount > 0 ? Math.round(lesson.xpReward / answerableCount) : 0;

  useEffect(() => {
    getSession().then((session) => setUser(session?.user ?? null)).catch(() => setUser(null));
    return onAuthChange(setUser);
  }, []);

  // Discourage copying lesson content (right-click, copy, cut). Inputs still work.
  useEffect(() => {
    const isInput = (t: EventTarget | null) => {
      const el = t as HTMLElement | null;
      return !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA");
    };
    const block = (e: Event) => { if (!isInput(e.target)) e.preventDefault(); };
    document.addEventListener("contextmenu", block);
    document.addEventListener("copy", block);
    document.addEventListener("cut", block);
    return () => {
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("copy", block);
      document.removeEventListener("cut", block);
    };
  }, []);

  const step = lesson.steps[stepIndex];
  const progress = Math.round((stepIndex / lesson.steps.length) * 100);

  // Stop any in-flight speech when moving on so audio doesn't bleed into the next step.
  useEffect(() => stopSpeaking, [stepIndex]);

  function nextStep() {
    setSelected(null);
    setFillInput("");
    setAnswered(false);
    setCorrect(false);
    setStepEarned(false);
    if (stepIndex + 1 >= lesson.steps.length) {
      const updated = completeLesson(lesson.id, earnedXp, { correct: correctCount, total: answerableCount });
      syncLeaderboard(updated.xp);
      pushProgressToCloud();
      setDone(true);
    } else {
      setStepIndex((s) => s + 1);
    }
  }


  function checkQuiz(idx: number) {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if ((step.type === "quiz" || step.type === "listening") && idx === step.correct) {
      setCorrect(true);
      if (!stepEarned) {
        setEarnedXp((x) => x + xpPerStep);
        setCorrectCount((c) => c + 1);
        setStepEarned(true);
      }
    } else {
      setCorrect(false);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }

  function checkFill() {
    if (answered || step.type !== "fill") return;
    setAnswered(true);
    const isCorrect = fillInput.trim().toLowerCase() === step.answer.toLowerCase();
    setCorrect(isCorrect);
    if (isCorrect) {
      if (!stepEarned) {
        setEarnedXp((x) => x + xpPerStep);
        setCorrectCount((c) => c + 1);
        setStepEarned(true);
      }
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }

  const courseLessons = getLessonsForCourse(lesson.courseId);
  const freeLimit = Math.ceil(courseLessons.length / 3);
  const lessonIndex = courseLessons.findIndex((l) => l.id === lesson.id);
  const isMemberOnly = user === null && lessonIndex >= freeLimit;

  if (isMemberOnly) {
    return (
      <>
        {authOpen && (
          <AuthModal
            onClose={() => setAuthOpen(false)}
            onSuccess={(email) => { setUser({ email } as User); setAuthOpen(false); }}
          />
        )}
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
          <div className="mb-6 flex justify-center"><Lock size={52} style={{ color: "var(--text-muted)" }} /></div>
          <h1 className="text-3xl font-black mb-3">บทเรียนนี้สำหรับสมาชิก</h1>
          <p className="mb-2" style={{ color: "var(--text-muted)" }}>
            สมัครฟรีเพื่อเข้าถึงบทเรียนทั้งหมด
          </p>
          <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
            ทดลองเรียน {freeLimit} บทเรียนแรกได้โดยไม่ต้องสมัคร
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => setAuthOpen(true)}
              className="px-8 py-3 rounded-full font-bold text-white glow transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-light))" }}
            >
              สมัครสมาชิกฟรี →
            </button>
            <button
              onClick={() => router.push(`/course/${lesson.courseId}`)}
              className="px-8 py-3 rounded-full font-bold transition-all hover:scale-105"
              style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}
            >
              กลับไปที่คอร์ส
            </button>
          </div>
        </div>
      </>
    );
  }

  // Only wait for auth state on gated (member-only) lessons; free lessons render immediately
  if (lessonIndex >= freeLimit && user === undefined) return null;

  if (done) {
    return (
      <>
        {authOpen && (
          <AuthModal
            onClose={() => setAuthOpen(false)}
            onSuccess={(email) => { setUser({ email } as User); setAuthOpen(false); }}
          />
        )}
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
          <div className="animate-bounce-in">
            <div className="mb-6 flex justify-center"><PartyPopper size={64} style={{ color: "var(--accent)" }} /></div>
            <h1 className="text-4xl font-black mb-3">ยอดเยี่ยม!</h1>
            <p className="text-xl mb-2" style={{ color: "var(--text-muted)" }}>
              คุณผ่านบทเรียน <strong style={{ color: "var(--text)" }}>{lesson.title}</strong>
            </p>
            <div
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xl font-black my-6"
              style={{ background: "rgba(245,158,11,0.15)", color: "var(--accent)" }}
            >
              <Zap size={20} fill="currentColor" /> +{earnedXp} XP {earnedXp < lesson.xpReward && <span style={{ fontSize: "0.7em", opacity: 0.6 }}>/ {lesson.xpReward} XP</span>}
            </div>

            {/* XP save prompt — guest only */}
            {!user && earnedXp > 0 && (
              <div
                className="mb-6 mx-auto max-w-xs rounded-2xl p-4 text-left"
                style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)" }}
              >
                <p className="font-bold text-sm mb-1" style={{ color: "var(--accent)" }}>
                  XP ของคุณกำลังจะหาย!
                </p>
                <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
                  สมัครฟรีเพื่อบันทึก {earnedXp} XP และขึ้นตารางผู้นำ
                </p>
                <button
                  onClick={() => setAuthOpen(true)}
                  className="w-full py-2 rounded-full font-bold text-sm text-white"
                  style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-light))" }}
                >
                  บันทึก XP + ขึ้น Leaderboard →
                </button>
              </div>
            )}

            <div className="flex flex-col items-center gap-3 mt-4 w-full max-w-xs mx-auto">
              {correctCount < answerableCount && (
                <button
                  onClick={() => { setStepIndex(0); setAnswered(false); setSelected(null); setFillInput(""); setCorrect(false); setEarnedXp(0); setCorrectCount(0); setStepEarned(false); setDone(false); }}
                  className="w-full px-6 py-3 rounded-full font-bold transition-all hover:scale-105"
                  style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}
                >
                  ลองใหม่ ({correctCount}/{answerableCount} ถูก)
                </button>
              )}
              {nextLesson && (
                <button
                  onClick={() => router.push(`/lesson/${nextLesson.id}`)}
                  className="w-full px-6 py-3 rounded-full font-bold text-white glow transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-light))" }}
                >
                  บทเรียนถัดไป → {nextLesson.title}
                </button>
              )}
              {!nextLesson && (
                <button
                  onClick={() => router.push("/courses")}
                  className="w-full px-6 py-3 rounded-full font-bold text-white glow transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-light))" }}
                >
                  🎉 ดูคอร์สอื่น
                </button>
              )}
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => router.push(`/course/${lesson.courseId}`)}
                  className="flex-1 px-4 py-3 rounded-full font-bold"
                  style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}
                >
                  กลับไปที่คอร์ส
                </button>
                {nextLesson && (
                  <button
                    onClick={() => router.push("/courses")}
                    className="flex-1 px-4 py-3 rounded-full font-bold"
                    style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}
                  >
                    ดูคอร์สอื่น
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <main className="max-w-2xl mx-auto px-6 pt-24 pb-10" style={{ userSelect: "none", WebkitUserSelect: "none" }}>
        {/* Top bar */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => {
              if (step.type === "info" && stepIndex > 0) {
                setStepIndex((s) => s - 1);
                setSelected(null);
                setFillInput("");
                setAnswered(false);
                setCorrect(false);
              } else {
                router.push(`/course/${lesson.courseId}`);
              }
            }}
            className="text-xl p-2 rounded-full transition-colors hover:bg-white/5"
            style={{ color: "var(--text-muted)" }}
          >
            ←
          </button>
          <div className="flex-1 progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-sm font-bold" style={{ color: "var(--text-muted)" }}>
            {stepIndex + 1}/{lesson.steps.length}
          </span>
        </div>

        {/* Lesson title */}
        <p className="text-sm mb-2" style={{ color: "var(--text-muted)" }}>
          {course?.icon} {course?.title} · {lesson.title}
        </p>

        {/* Step card */}
        <div className={`glass rounded-2xl p-8 min-h-[300px] ${shake ? "animate-shake" : ""}`}>
          {step.type === "info" && (
            <div className="flex flex-col gap-4 animate-bounce-in">
              <h2 className="text-2xl font-black">{step.title}</h2>
              <p
                className="text-base leading-relaxed whitespace-pre-line"
                style={{ color: "var(--text)" }}
              >
                {step.content}
              </p>
              <button
                onClick={nextStep}
                className="mt-6 self-end px-8 py-3 rounded-full font-bold text-white glow transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-light))" }}
              >
                ต่อไป →
              </button>
            </div>
          )}

          {step.type === "quiz" && (
            <div className="flex flex-col gap-5 animate-bounce-in">
              <div
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: "var(--primary-light)" }}
              >
                คำถาม
              </div>
              <h2 className="text-xl font-black whitespace-pre-line">{step.question}</h2>
              <div className="grid gap-3">
                {step.choices.map((c, i) => {
                  let bg = "var(--surface-2)";
                  let border = "var(--border)";
                  let color = "var(--text)";
                  if (answered) {
                    if (i === step.correct) {
                      bg = "rgba(16,185,129,0.15)";
                      border = "var(--accent-green)";
                      color = "var(--accent-green)";
                    } else if (i === selected && i !== step.correct) {
                      bg = "rgba(239,68,68,0.15)";
                      border = "var(--accent-red)";
                      color = "var(--accent-red)";
                    }
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => checkQuiz(i)}
                      disabled={answered}
                      className="text-left px-5 py-4 rounded-xl font-medium transition-all hover:scale-[1.01] disabled:cursor-default"
                      style={{ background: bg, border: `1px solid ${border}`, color }}
                    >
                      <span className="font-bold mr-3" style={{ color: "var(--text-muted)" }}>
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {c}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div
                  className="rounded-xl p-4 animate-bounce-in"
                  style={{
                    background: correct ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
                    border: `1px solid ${correct ? "var(--accent-green)" : "var(--accent-red)"}`,
                    color: correct ? "var(--accent-green)" : "var(--accent-red)",
                  }}
                >
                  <p className="font-bold mb-1">
                    {correct ? `✓ ถูกต้อง! +${xpPerStep} XP` : "✗ ยังไม่ถูก — ลองใหม่ได้เลย"}
                  </p>
                  <p className="text-sm opacity-90">{step.explanation}</p>
                </div>
              )}

              {answered && (
                <div className="flex gap-3 self-end">
                  <button
                    onClick={nextStep}
                    className="px-8 py-3 rounded-full font-bold text-white glow transition-all hover:scale-105"
                    style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-light))" }}
                  >
                    ต่อไป →
                  </button>
                </div>
              )}
            </div>
          )}

          {step.type === "fill" && (
            <div className="flex flex-col gap-5 animate-bounce-in">
              <div
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: "var(--accent)" }}
              >
                เติมคำ
              </div>
              <h2 className="text-xl font-black">{step.question}</h2>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                <Lightbulb size={14} style={{ display: "inline", marginRight: 4, color: "var(--accent)" }} />{step.hint}
              </p>
              <input
                type="text"
                value={fillInput}
                onChange={(e) => setFillInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !answered && checkFill()}
                disabled={answered}
                placeholder="พิมพ์คำตอบ..."
                className="px-5 py-4 rounded-xl text-base outline-none transition-all disabled:opacity-70"
                style={{
                  background: "var(--surface-2)",
                  border: answered
                    ? `2px solid ${correct ? "var(--accent-green)" : "var(--accent-red)"}`
                    : "2px solid var(--border)",
                  color: "var(--text)",
                }}
              />

              {answered && (
                <div
                  className="rounded-xl p-4 animate-bounce-in"
                  style={{
                    background: correct ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
                    border: `1px solid ${correct ? "var(--accent-green)" : "var(--accent-red)"}`,
                    color: correct ? "var(--accent-green)" : "var(--accent-red)",
                  }}
                >
                  <p className="font-bold mb-1">
                    {correct ? `✓ ถูกต้อง! +${xpPerStep} XP` : `✗ ยังไม่ถูก — คำตอบที่ถูก: "${step.answer}"`}
                  </p>
                  {step.explanation && <p className="text-sm opacity-90">{step.explanation}</p>}
                </div>
              )}

              <div className="flex gap-3 self-end">
                {!answered && (
                  <button
                    onClick={checkFill}
                    disabled={!fillInput.trim()}
                    className="px-8 py-3 rounded-full font-bold text-white disabled:opacity-40 transition-all hover:scale-105"
                    style={{ background: "var(--primary)" }}
                  >
                    ตรวจ
                  </button>
                )}
                {answered && (
                  <button
                    onClick={nextStep}
                    className="px-8 py-3 rounded-full font-bold text-white glow transition-all hover:scale-105"
                    style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-light))" }}
                  >
                    ต่อไป →
                  </button>
                )}
              </div>
            </div>
          )}

          {step.type === "listening" && (
            <div className="flex flex-col gap-5 animate-bounce-in">
              <div
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: "var(--primary-light)" }}
              >
                TOEIC Listening · Part {step.part}
              </div>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>{step.question}</p>

              {step.imageUrl && (
                <div
                  className="rounded-xl overflow-hidden flex items-center justify-center"
                  style={{ border: "1px solid var(--border)", background: "var(--surface-2)", padding: 8 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={step.imageUrl}
                    alt="TOEIC Part 1 photograph"
                    className="rounded-lg"
                    style={{ maxHeight: 360, maxWidth: "100%", width: "auto", height: "auto", objectFit: "contain" }}
                  />
                </div>
              )}

              <button
                onClick={() => speakEnglish(step.script)}
                className="self-start flex items-center gap-2 px-5 py-3 rounded-full font-bold transition-all hover:scale-105"
                style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--primary-light)" }}
              >
                <Volume2 size={18} /> ฟังเสียง
              </button>

              <div className="grid gap-3">
                {step.choices.map((c, i) => {
                  let bg = "var(--surface-2)";
                  let border = "var(--border)";
                  let color = "var(--text)";
                  if (answered) {
                    if (i === step.correct) {
                      bg = "rgba(16,185,129,0.15)";
                      border = "var(--accent-green)";
                      color = "var(--accent-green)";
                    } else if (i === selected && i !== step.correct) {
                      bg = "rgba(239,68,68,0.15)";
                      border = "var(--accent-red)";
                      color = "var(--accent-red)";
                    }
                  }
                  const hideText = step.spokenChoices && !answered;
                  return (
                    <button
                      key={i}
                      onClick={() => checkQuiz(i)}
                      disabled={answered}
                      className="text-left px-5 py-4 rounded-xl font-medium transition-all hover:scale-[1.01] disabled:cursor-default"
                      style={{ background: bg, border: `1px solid ${border}`, color }}
                    >
                      <span className="font-bold mr-3" style={{ color: "var(--text-muted)" }}>
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {hideText ? <span style={{ opacity: 0.5 }}>(ฟังจากเสียง)</span> : c}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div
                  className="rounded-xl p-4 animate-bounce-in"
                  style={{
                    background: correct ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
                    border: `1px solid ${correct ? "var(--accent-green)" : "var(--accent-red)"}`,
                    color: correct ? "var(--accent-green)" : "var(--accent-red)",
                  }}
                >
                  <p className="font-bold mb-1">
                    {correct ? `✓ ถูกต้อง! +${xpPerStep} XP` : "✗ ยังไม่ถูก — ลองใหม่ได้เลย"}
                  </p>
                  <p className="text-sm opacity-90">{step.explanation}</p>
                </div>
              )}

              {answered && (
                <div className="flex gap-3 self-end">
                  <button
                    onClick={nextStep}
                    className="px-8 py-3 rounded-full font-bold text-white glow transition-all hover:scale-105"
                    style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-light))" }}
                  >
                    ต่อไป →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* XP preview */}
        <div className="mt-4 flex justify-between text-sm" style={{ color: "var(--text-muted)" }}>
          <span>ตอบถูกทุกข้อ = {lesson.xpReward} XP</span>
          <span>สะสมแล้ว <strong style={{ color: "var(--accent)" }}>{earnedXp}</strong> XP</span>
        </div>
      </main>
    </>
  );
}
