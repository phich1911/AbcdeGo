"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSession } from "@/lib/supabase";
import { COURSES, getLessonsForCourse } from "@/lib/data";
import type { Lesson } from "@/lib/data";

const ADMIN_EMAIL = "phich1911@gmail.com";

const SET_COURSE_IDS: Record<"1" | "2", string[]> = {
  "1": ["kp-general-1", "kp-english", "kp-law"],
  "2": ["kp-general-2", "kp-english-2", "kp-law-2"],
};

function AdminPreviewInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeSet: "1" | "2" = searchParams.get("set") === "1" ? "1" : "2";

  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [activeCourse, setActiveCourse] = useState(SET_COURSE_IDS[activeSet][0]);
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});
  const [set2Lessons, setSet2Lessons] = useState<Lesson[] | null>(null);

  useEffect(() => {
    getSession().then((s) => {
      const isAdmin = s?.user?.email === ADMIN_EMAIL;
      setAllowed(isAdmin);
      if (!isAdmin) return;
      fetch("/api/admin/set2-lessons", {
        headers: { Authorization: `Bearer ${s?.access_token ?? ""}` },
      })
        .then((r) => (r.ok ? r.json() : { lessons: [] }))
        .then((data) => setSet2Lessons(data.lessons));
    });
  }, []);

  useEffect(() => {
    setActiveCourse(SET_COURSE_IDS[activeSet][0]);
    setActiveLesson(null);
  }, [activeSet]);

  if (allowed === null) return <div style={{ padding: 80, textAlign: "center", color: "var(--text-muted)" }}>กำลังตรวจสอบสิทธิ์...</div>;
  if (!allowed) return <div style={{ padding: 80, textAlign: "center", color: "var(--accent-red)" }}>ไม่มีสิทธิ์เข้าถึงหน้านี้</div>;
  if (activeSet === "2" && !set2Lessons) return <div style={{ padding: 80, textAlign: "center", color: "var(--text-muted)" }}>กำลังโหลดเนื้อหา...</div>;

  const courses = COURSES.filter((c) => SET_COURSE_IDS[activeSet].includes(c.id));
  const lessons =
    activeSet === "1"
      ? getLessonsForCourse(activeCourse)
      : (set2Lessons ?? []).filter((l) => l.courseId === activeCourse).sort((a, b) => a.order - b.order);
  const lesson = activeLesson ? lessons.find((l) => l.id === activeLesson) : null;

  function toggleStep(key: string) {
    setExpandedSteps((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function switchSet(set: "1" | "2") {
    router.push(`/admin/preview?set=${set}`);
  }

  return (
    <main className="max-w-5xl mx-auto px-6 pt-24 pb-16">
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full" style={{ background: "rgba(239,68,68,0.15)", color: "var(--accent-red)" }}>
           Admin Only
        </span>
        <h1 className="text-3xl font-black mt-3 mb-1">Preview ชุดที่ {activeSet}</h1>
        <p style={{ color: "var(--text-muted)" }} className="text-sm">ดูเนื้อหาทุกบทเรียน ก่อน unlock ให้ผู้ใช้</p>
      </div>

      {/* Set tabs */}
      <div className="flex gap-2 mb-4">
        {(["1", "2"] as const).map((set) => (
          <button
            key={set}
            onClick={() => switchSet(set)}
            className="px-4 py-2 rounded-full font-bold text-sm transition-all"
            style={{
              background: activeSet === set ? "var(--text)" : "var(--surface-2)",
              color: activeSet === set ? "var(--bg)" : "var(--text-muted)",
            }}
          >
            ก.พ. ชุดที่ {set}
          </button>
        ))}
      </div>

      {/* Course tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {courses.map((c) => (
          <button
            key={c.id}
            onClick={() => { setActiveCourse(c.id); setActiveLesson(null); }}
            className="px-4 py-2 rounded-full font-bold text-sm transition-all"
            style={{
              background: activeCourse === c.id ? "linear-gradient(135deg, var(--primary), var(--primary-light))" : "var(--surface-2)",
              color: activeCourse === c.id ? "#fff" : "var(--text-muted)",
            }}
          >
            {c.icon} {c.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Lesson list */}
        <div className="flex flex-col gap-2">
          {lessons.map((l) => (
            <button
              key={l.id}
              onClick={() => setActiveLesson(l.id === activeLesson ? null : l.id)}
              className="text-left px-4 py-3 rounded-xl font-medium transition-all hover:scale-[1.01]"
              style={{
                background: activeLesson === l.id ? "rgba(99,102,241,0.15)" : "var(--surface-2)",
                border: `1px solid ${activeLesson === l.id ? "var(--primary)" : "var(--border)"}`,
                color: activeLesson === l.id ? "var(--primary-light)" : "var(--text)",
              }}
            >
              <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>บทที่ {l.order}</div>
              <div className="text-sm font-bold leading-snug">{l.title}</div>
              <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{l.xpReward} XP · {l.steps.length} steps</div>
            </button>
          ))}
        </div>

        {/* Lesson content */}
        <div className="md:col-span-2">
          {!lesson && (
            <div className="glass rounded-2xl p-10 text-center" style={{ color: "var(--text-muted)" }}>
              เลือกบทเรียนทางซ้ายเพื่อดูเนื้อหา
            </div>
          )}
          {lesson && (
            <div className="flex flex-col gap-4">
              <div className="glass rounded-2xl p-5">
                <h2 className="text-xl font-black mb-1">{lesson.title}</h2>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {lesson.steps.length} steps · {lesson.xpReward} XP
                </p>
              </div>

              {lesson.steps.map((step, i) => {
                const key = `${lesson.id}-${i}`;
                const expanded = expandedSteps[key] ?? true;
                return (
                  <div key={key} className="glass rounded-2xl overflow-hidden">
                    <button
                      onClick={() => toggleStep(key)}
                      className="w-full text-left px-5 py-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{
                            background: step.type === "info" ? "rgba(99,102,241,0.15)" : step.type === "quiz" ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)",
                            color: step.type === "info" ? "var(--primary-light)" : step.type === "quiz" ? "var(--accent-green)" : "var(--accent)",
                          }}
                        >
                          {step.type === "info" ? " INFO" : step.type === "quiz" ? "✓ QUIZ" : "️ FILL"}
                        </span>
                        <span className="font-bold text-sm">
                          {step.type === "info" ? step.title : step.question.slice(0, 60) + (step.question.length > 60 ? "..." : "")}
                        </span>
                      </div>
                      <span style={{ color: "var(--text-muted)" }}>{expanded ? "▲" : "▼"}</span>
                    </button>

                    {expanded && (
                      <div className="px-5 pb-5 border-t" style={{ borderColor: "var(--border)" }}>
                        {step.type === "info" && (
                          <p className="text-sm leading-relaxed whitespace-pre-line mt-4" style={{ color: "var(--text)" }}>
                            {step.content}
                          </p>
                        )}

                        {step.type === "quiz" && (
                          <div className="mt-4 flex flex-col gap-3">
                            <p className="font-bold whitespace-pre-line">{step.question}</p>
                            <div className="grid gap-2">
                              {step.choices.map((c, ci) => (
                                <div
                                  key={ci}
                                  className="px-4 py-3 rounded-xl text-sm"
                                  style={{
                                    background: ci === step.correct ? "rgba(16,185,129,0.12)" : "var(--surface-2)",
                                    border: `1px solid ${ci === step.correct ? "var(--accent-green)" : "var(--border)"}`,
                                    color: ci === step.correct ? "var(--accent-green)" : "var(--text)",
                                  }}
                                >
                                  <span className="font-bold mr-2" style={{ color: "var(--text-muted)" }}>{String.fromCharCode(65 + ci)}.</span>
                                  {c}
                                  {ci === step.correct && <span className="ml-2 text-xs">✓ เฉลย</span>}
                                </div>
                              ))}
                            </div>
                            <div className="rounded-xl p-3 text-sm mt-1" style={{ background: "rgba(16,185,129,0.08)", color: "var(--accent-green)" }}>
                              <span className="font-bold">คำอธิบาย: </span>{step.explanation}
                            </div>
                          </div>
                        )}

                        {step.type === "fill" && (
                          <div className="mt-4 flex flex-col gap-3">
                            <p className="font-bold">{step.question}</p>
                            <div className="text-sm" style={{ color: "var(--text-muted)" }}> {step.hint}</div>
                            <div className="px-4 py-3 rounded-xl text-sm font-bold" style={{ background: "rgba(245,158,11,0.12)", color: "var(--accent)", border: "1px solid rgba(245,158,11,0.3)" }}>
                              ✓ คำตอบ: {step.answer}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function AdminPreviewPage() {
  return (
    <Suspense fallback={<div style={{ padding: 80, textAlign: "center", color: "var(--text-muted)" }}>กำลังโหลด...</div>}>
      <AdminPreviewInner />
    </Suspense>
  );
}
