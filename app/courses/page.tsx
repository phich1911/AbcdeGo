"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { COURSES } from "@/lib/data";
import { getCourseProgress } from "@/lib/progress";
import { useEffect, useState } from "react";

const CATEGORY_META: Record<string, { label: string; icon: string; color: string; description: string }> = {
  "ปลัดอำเภอ": {
    label: "หมวดปลัดอำเภอ",
    icon: "🏛️",
    color: "#7c3aed",
    description: "กฎหมายและระเบียบที่เกี่ยวข้องกับงานปลัดอำเภอ",
  },
};

function CourseCard({ course, pct }: { course: (typeof COURSES)[0]; pct: number }) {
  return (
    <Link
      href={`/course/${course.id}`}
      className="glass rounded-2xl p-6 flex flex-col gap-4 transition-all hover:scale-[1.02] hover:glow"
    >
      <div className="flex items-start justify-between">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
          style={{ background: `${course.color}22` }}
        >
          {course.icon}
        </div>
        {pct === 100 && (
          <span className="text-sm px-2 py-1 rounded-full font-bold" style={{ background: "rgba(16,185,129,0.15)", color: "var(--accent-green)" }}>
            ✓ เสร็จแล้ว
          </span>
        )}
      </div>

      <div>
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{ background: `${course.color}22`, color: course.color }}
        >
          {course.tag}
        </span>
        <h2 className="font-black text-xl mt-2">{course.title}</h2>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          {course.description}
        </p>
      </div>

      <div className="mt-auto">
        <div className="flex justify-between text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>
          <span>ความก้าวหน้า</span>
          <span style={{ color: pct > 0 ? "var(--primary-light)" : undefined }}>{pct}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex justify-between mt-3 text-sm">
          <span style={{ color: "var(--text-muted)" }}>{course.totalLessons} บทเรียน</span>
          <span className="font-bold" style={{ color: "var(--accent)" }}>⚡ {course.xpReward} XP</span>
        </div>
      </div>
    </Link>
  );
}

export default function CoursesPage() {
  const [progresses, setProgresses] = useState<Record<string, number>>({});

  useEffect(() => {
    const p: Record<string, number> = {};
    COURSES.forEach((c) => {
      p[c.id] = getCourseProgress(c.id, c.totalLessons);
    });
    setProgresses(p);
  }, []);

  const categorized = COURSES.filter((c) => c.category === "ปลัดอำเภอ");
  const general = COURSES.filter((c) => !c.category);

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 pt-28 pb-16">
        <h1 className="text-4xl font-black mb-2">คอร์สทั้งหมด</h1>
        <p className="mb-12" style={{ color: "var(--text-muted)" }}>
          เลือกวิชาที่คุณอยากเรียน แล้วเริ่มได้เลย
        </p>

        {/* ปลัดอำเภอ section */}
        <section className="mb-14">
          <div
            className="flex items-center gap-3 mb-6 pb-4"
            style={{ borderBottom: "1px solid rgba(124,58,237,0.25)" }}
          >
            <span className="text-2xl">🏛️</span>
            <div>
              <h2 className="text-xl font-black tracking-wide" style={{ color: "#fff" }}>
                หมวด ปลัดอำเภอ
              </h2>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                กฎหมายและระเบียบที่เกี่ยวข้องกับงานปลัดอำเภอ
              </p>
            </div>
            <span
              className="ml-auto text-xs font-bold px-3 py-1 rounded-full"
              style={{ background: "rgba(124,58,237,0.15)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.3)" }}
            >
              {categorized.length} วิชา
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {categorized.map((course) => (
              <CourseCard key={course.id} course={course} pct={progresses[course.id] ?? 0} />
            ))}
          </div>
        </section>

        {/* General courses section */}
        {general.length > 0 && (
          <section>
            <div
              className="flex items-center gap-3 mb-6 pb-4"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
            >
              <span className="text-2xl">📚</span>
              <div>
                <h2 className="text-xl font-black tracking-wide" style={{ color: "#fff" }}>
                  วิชาทั่วไป
                </h2>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  คณิตศาสตร์ ภาษาอังกฤษ และโปรแกรมมิ่ง
                </p>
              </div>
              <span
                className="ml-auto text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                {general.length} วิชา
              </span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {general.map((course) => (
                <CourseCard key={course.id} course={course} pct={progresses[course.id] ?? 0} />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
