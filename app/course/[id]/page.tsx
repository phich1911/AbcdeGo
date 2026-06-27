"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import AuthModal from "@/components/AuthModal";
import { getCourse, getLessonsForCourse } from "@/lib/data";
import { isLessonCompleted, getCourseProgress, getLessonScore } from "@/lib/progress";
import { getUser, onAuthChange } from "@/lib/supabase";
import { Lock, CheckCircle, Zap } from "lucide-react";
import type { User } from "@supabase/supabase-js";

export default function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const course = getCourse(id);
  if (!course) notFound();

  const lessons = getLessonsForCourse(id);
  const [completed, setCompleted] = useState<boolean[]>([]);
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [authOpen, setAuthOpen] = useState(false);

  const freeLimit = Math.ceil(lessons.length / 3);

  useEffect(() => {
    setCompleted(lessons.map((l) => isLessonCompleted(l.id)));
    setProgress(getCourseProgress(id, course.totalLessons));
    getUser().then(setUser);
    return onAuthChange(setUser);
  }, [id]);

  const firstIncomplete = lessons.findIndex((_, i) => !completed[i]);
  const nextLesson = firstIncomplete >= 0 ? lessons[firstIncomplete] : null;

  return (
    <>
      {authOpen && (
        <AuthModal
          onClose={() => setAuthOpen(false)}
          onSuccess={(email) => { setUser({ email } as User); setAuthOpen(false); }}
        />
      )}
      <main className="max-w-3xl mx-auto px-6 pt-28 pb-12">
        {/* Header */}
        <div className="glass rounded-2xl p-8 mb-8">
          <div className="mb-4">
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: `${course.color}22`, color: course.color }}
            >
              {course.tag}
            </span>
            <h1 className="text-2xl font-black mt-1">{course.title}</h1>
          </div>
          <p style={{ color: "var(--text-muted)" }}>{course.description}</p>

          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span style={{ color: "var(--text-muted)" }}>ความก้าวหน้า</span>
              <span className="font-bold" style={{ color: "var(--primary-light)" }}>{progress}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {nextLesson && (
            <Link
              href={`/lesson/${nextLesson.id}`}
              className="inline-block mt-6 px-6 py-3 rounded-full font-bold text-white glow transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-light))" }}
            >
              {progress === 0 ? "เริ่มเรียน →" : "เรียนต่อ →"}
            </Link>
          )}
          {progress === 100 && (
            <div className="flex flex-col items-center gap-3 mt-6">
              <div
                className="inline-block px-6 py-3 rounded-full font-bold"
                style={{ background: "rgba(16,185,129,0.15)", color: "var(--accent-green)" }}
              >
                ✦ เรียนจบแล้ว!
              </div>
              <Link
                href="/courses"
                className="inline-block px-6 py-3 rounded-full font-bold text-white glow transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-light))" }}
              >
                🎉 ดูคอร์สอื่น
              </Link>
            </div>
          )}
        </div>

        {/* Lesson list */}
        <h2 className="text-xl font-black mb-4">บทเรียน</h2>
        <div className="flex flex-col gap-3">
          {lessons.map((lesson, i) => {
            const done = completed[i];
            const sequentialLock = !done && i > 0 && !completed[i - 1];
            const memberOnly = !user && i >= freeLimit;
            const isLocked = sequentialLock || memberOnly;

            return (
              <div
                key={lesson.id}
                className={`glass rounded-xl p-5 flex items-center gap-4 transition-all ${isLocked ? "opacity-50" : "hover:scale-[1.01]"}`}
                style={memberOnly ? { borderColor: "rgba(124,58,237,0.3)" } : {}}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0"
                  style={{
                    background: done ? "rgba(16,185,129,0.2)" : memberOnly ? "rgba(124,58,237,0.15)" : "var(--surface-2)",
                    color: done ? "var(--accent-green)" : memberOnly ? "var(--primary-light)" : "var(--text-muted)",
                  }}
                >
                  {done ? <CheckCircle size={16} /> : memberOnly ? <Lock size={14} /> : i + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold">{lesson.title}</h3>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {lesson.steps.length} ขั้นตอน · <Zap size={11} style={{ display: "inline", verticalAlign: "middle" }} fill="currentColor" /> {lesson.xpReward} XP
                    {memberOnly && <span style={{ color: "var(--primary-light)" }}> · สมาชิกเท่านั้น</span>}
                    {done && (() => { const s = getLessonScore(lesson.id); return s && s.correct < s.total ? <span style={{ color: "#ef4444", marginLeft: 6 }}>({s.correct}/{s.total})</span> : null; })()}
                  </p>
                </div>

                {memberOnly ? (
                  <button
                    onClick={() => setAuthOpen(true)}
                    className="px-4 py-2 rounded-full text-sm font-bold transition-all hover:scale-105"
                    style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-light))", color: "white" }}
                  >
                    สมัครสมาชิก
                  </button>
                ) : !isLocked ? (
                  <Link
                    href={`/lesson/${lesson.id}`}
                    className="px-4 py-2 rounded-full text-sm font-bold transition-all hover:scale-105"
                    style={
                      done
                        ? { background: "rgba(16,185,129,0.15)", color: "var(--accent-green)" }
                        : { background: "var(--primary)", color: "white" }
                    }
                  >
                    {done ? "ทบทวน" : "เริ่ม"}
                  </Link>
                ) : (
                  <Lock size={16} style={{ color: "var(--text-muted)" }} />
                )}
              </div>
            );
          })}

          {!user && lessons.length > freeLimit && (
            <div
              className="rounded-2xl p-6 text-center mt-4"
              style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(124,58,237,0.05))", border: "1px solid rgba(124,58,237,0.3)" }}
            >
              <p className="font-bold mb-1 flex items-center justify-center gap-2"><Lock size={14} /> {lessons.length - freeLimit} บทเรียนถัดไปสำหรับสมาชิก</p>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>สมัครฟรี เข้าถึงบทเรียนทั้งหมดได้ทันที</p>
              <button
                onClick={() => setAuthOpen(true)}
                className="px-6 py-2 rounded-full font-bold text-white text-sm glow transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-light))" }}
              >
                สมัครสมาชิกฟรี →
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
