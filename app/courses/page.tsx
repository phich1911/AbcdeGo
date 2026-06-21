"use client";

import Link from "next/link";
import { COURSES } from "@/lib/data";
import { getCourseProgress } from "@/lib/progress";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Fuse from "fuse.js";

const SLUG_TO_CATEGORY: Record<string, string> = {
  kp: "สอบ ก.พ.",
  dsi: "เจ้าหน้าที่คดีพิเศษ (DSI)",
  "eng-m": "ภาษาอังกฤษ ม.ปลาย",
  "math-m": "คณิตศาสตร์ ม.ปลาย",
  "thai-m": "ภาษาไทย ม.ปลาย",
};

const CATEGORY_SLUGS: Record<string, string> = {
  "สอบ ก.พ.": "kp",
  "เจ้าหน้าที่คดีพิเศษ (DSI)": "dsi",
  "ภาษาอังกฤษ ม.ปลาย": "eng-m",
  "คณิตศาสตร์ ม.ปลาย": "math-m",
  "ภาษาไทย ม.ปลาย": "thai-m",
};

const CATEGORY_META: Record<string, { description: string }> = {
  "สอบ ก.พ.": { description: "วิชาความสามารถทั่วไป ภาษาไทย และภาษาอังกฤษ สำหรับสอบ ก.พ." },
  "เจ้าหน้าที่คดีพิเศษ (DSI)": { description: "กฎหมายและกระบวนการสอบสวนคดีพิเศษ กรมสอบสวนคดีพิเศษ" },
  "ภาษาอังกฤษ ม.ปลาย": { description: "ไวยากรณ์ การอ่าน คำศัพท์ บทสนทนา และการเขียน สำหรับระดับ ม.4–ม.6" },
  "คณิตศาสตร์ ม.ปลาย": { description: "จำนวนและพีชคณิต เรขาคณิต สถิติ และแคลคูลัส สำหรับระดับ ม.4–ม.6" },
  "ภาษาไทย ม.ปลาย": { description: "หลักการใช้ภาษา ทักษะการสื่อสาร และวรรณคดีวรรณกรรม สำหรับระดับ ม.4–ม.6" },
};

// Top-level categories shown on /courses
const TOP_LEVEL = [
  { slug: "kp", label: "สอบ ก.พ.", description: "วิชาความสามารถทั่วไป ภาษาไทย และภาษาอังกฤษ สำหรับสอบ ก.พ.", cats: ["สอบ ก.พ."] },
  { slug: "dsi", label: "เจ้าหน้าที่คดีพิเศษ (DSI)", description: "กฎหมายและกระบวนการสอบสวนคดีพิเศษ กรมสอบสวนคดีพิเศษ", cats: ["เจ้าหน้าที่คดีพิเศษ (DSI)"] },
  {
    slug: "mplatai", label: "มัธยมศึกษาตอนปลาย (ม.4–6)",
    description: "ภาษาอังกฤษ คณิตศาสตร์ และภาษาไทย สำหรับระดับ ม.4–ม.6",
    cats: ["ภาษาอังกฤษ ม.ปลาย", "คณิตศาสตร์ ม.ปลาย", "ภาษาไทย ม.ปลาย"],
  },
];

// Sub-categories inside มัธยมศึกษาตอนปลาย
const MPLATAI_SUBS = [
  { slug: "eng-m", label: "ภาษาอังกฤษ", description: "ไวยากรณ์ การอ่าน คำศัพท์ บทสนทนา และการเขียน สำหรับระดับ ม.4–ม.6", cat: "ภาษาอังกฤษ ม.ปลาย" },
  { slug: "math-m", label: "คณิตศาสตร์", description: "จำนวนและพีชคณิต เรขาคณิต สถิติ และแคลคูลัส สำหรับระดับ ม.4–ม.6", cat: "คณิตศาสตร์ ม.ปลาย" },
  { slug: "thai-m", label: "ภาษาไทย", description: "หลักการใช้ภาษา ทักษะการสื่อสาร และวรรณคดีวรรณกรรม สำหรับระดับ ม.4–ม.6", cat: "ภาษาไทย ม.ปลาย" },
];

function CourseCard({ course, pct }: { course: (typeof COURSES)[0]; pct: number }) {
  return (
    <Link
      href={`/course/${course.id}`}
      className="card-lg flex flex-col gap-3 p-4 transition-colors hover:border-[color:var(--text-subtle)]"
      style={{ textDecoration: "none" }}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          {pct === 100 && (
            <span className="badge" style={{ color: "var(--accent-green)", borderColor: "rgba(63,185,80,0.4)", background: "rgba(63,185,80,0.08)", fontSize: 11 }}>✓ เสร็จแล้ว</span>
          )}
          <span className="badge" style={{ fontSize: 11 }}>{course.tag}</span>
        </div>
      </div>
      <div>
        <h2 style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 3 }}>{course.title}</h2>
        <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5 }}>{course.description}</p>
      </div>
      <div className="mt-auto">
        <div className="flex justify-between mb-1.5" style={{ fontSize: 11, color: "var(--text-muted)" }}>
          <span>ความก้าวหน้า</span>
          <span style={{ color: pct > 0 ? "var(--primary)" : undefined }}>{pct}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex justify-between mt-3" style={{ fontSize: 12 }}>
          <span style={{ color: "var(--text-muted)" }}>{course.totalLessons} บทเรียน</span>
          <span style={{ color: "var(--accent)", fontWeight: 500 }}>⚡ {course.xpReward} XP</span>
        </div>
      </div>
    </Link>
  );
}

function CoursesInner() {
  const searchParams = useSearchParams();
  const catSlug = searchParams.get("cat");
  const activeCat = catSlug !== null ? (SLUG_TO_CATEGORY[catSlug] ?? null) : null;
  const [progresses, setProgresses] = useState<Record<string, number>>({});
  const [query, setQuery] = useState("");

  useEffect(() => {
    const p: Record<string, number> = {};
    COURSES.forEach((c) => { p[c.id] = getCourseProgress(c.id, c.totalLessons); });
    setProgresses(p);
  }, []);

  const searchResults = useMemo(() => {
    const q = query.trim();
    if (!q) return null;
    return new Fuse(COURSES, { keys: ["title", "description", "tag", "category"], threshold: 0.4 }).search(q).map((r) => r.item);
  }, [query]);

  // Search mode
  if (searchResults !== null) {
    return (
      <main className="max-w-4xl mx-auto px-6 pb-16" style={{ paddingTop: 72 }}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 2 }}>ค้นหาคอร์ส</h1>
            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>เลือกวิชาที่คุณอยากเรียน แล้วเริ่มได้เลย</p>
          </div>
        </div>
        <SearchBar query={query} setQuery={setQuery} />
        {searchResults.length === 0 ? (
          <div className="text-center py-16" style={{ color: "var(--text-muted)" }}>
            <p style={{ fontSize: 13 }}>ไม่พบคอร์สที่ตรงกัน — ลองค้นหาด้วยคำอื่น</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-3">
            {searchResults.map((c) => <CourseCard key={c.id} course={c} pct={progresses[c.id] ?? 0} />)}
          </div>
        )}
      </main>
    );
  }

  // มัธยมศึกษาตอนปลาย — show 3 subject sub-categories
  if (catSlug === "mplatai") {
    return (
      <main className="max-w-4xl mx-auto px-6 pb-16" style={{ paddingTop: 72 }}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 2 }}>มัธยมศึกษาตอนปลาย (ม.4–6)</h1>
            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>เลือกวิชาที่คุณอยากเรียน</p>
          </div>
          <Link href="/courses" style={{ fontSize: 13, color: "var(--primary)", textDecoration: "none" }}>← หมวดหมู่</Link>
        </div>
        <SearchBar query={query} setQuery={setQuery} />
        <div className="grid sm:grid-cols-3 gap-4">
          {MPLATAI_SUBS.map((sub) => {
            const count = COURSES.filter((c) => c.category === sub.cat).length;
            return (
              <Link key={sub.slug} href={`/courses?cat=${sub.slug}`}
                className="card-lg flex flex-col gap-3 p-5" style={{ textDecoration: "none" }}>
                <span className="badge" style={{ fontSize: 11, width: "fit-content" }}>{count} วิชา</span>
                <div>
                  <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>{sub.label}</h2>
                  <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6 }}>{sub.description}</p>
                </div>
                <div className="mt-auto flex items-center gap-1" style={{ fontSize: 12, color: "var(--primary)", fontWeight: 500 }}>
                  <span>ดูวิชาทั้งหมด</span><span>→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    );
  }

  // Subject category view — show courses
  if (activeCat !== null) {
    const courses = COURSES.filter((c) => c.category === activeCat);
    const meta = CATEGORY_META[activeCat];
    const intro = courses.find((c) => c.intro)?.intro;
    const isMplataiSub = ["eng-m", "math-m", "thai-m"].includes(catSlug ?? "");
    return (
      <main className="max-w-4xl mx-auto px-6 pb-16" style={{ paddingTop: 72 }}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 2 }}>{activeCat}</h1>
            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{meta?.description}</p>
          </div>
          <Link href={isMplataiSub ? "/courses?cat=mplatai" : "/courses"}
            style={{ fontSize: 13, color: "var(--primary)", textDecoration: "none" }}>
            ← {isMplataiSub ? "ม.ปลาย" : "หมวดหมู่"}
          </Link>
        </div>
        {intro && (
          <details className="card-lg mb-5" style={{ padding: "14px 18px" }} open>
            <summary style={{ cursor: "pointer", fontSize: 14, fontWeight: 700, color: "var(--text)", listStyle: "none" }}>
              📋 เกี่ยวกับการสอบ
            </summary>
            <p style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.8, whiteSpace: "pre-line", marginTop: 12 }}>{intro}</p>
          </details>
        )}
        <SearchBar query={query} setQuery={setQuery} />
        <div className="grid md:grid-cols-2 gap-3">
          {courses.map((c) => <CourseCard key={c.id} course={c} pct={progresses[c.id] ?? 0} />)}
        </div>
      </main>
    );
  }

  // Default — show all courses grouped by category
  return (
    <main className="max-w-4xl mx-auto px-6 pb-16" style={{ paddingTop: 72 }}>
      <div className="mb-5">
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 2 }}>คอร์สทั้งหมด</h1>
        <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{COURSES.length} คอร์ส — เลือกเรียนได้เลย</p>
      </div>
      <SearchBar query={query} setQuery={setQuery} />
      {TOP_LEVEL.map((group) => {
        const groupCourses = COURSES.filter((c) => group.cats.includes(c.category ?? ""));
        if (groupCourses.length === 0) return null;
        return (
          <div key={group.slug} style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", margin: 0 }}>{group.label}</h2>
              <Link href={`/courses?cat=${group.slug}`} style={{ fontSize: 12, color: "var(--primary)", textDecoration: "none" }}>ดูทั้งหมด →</Link>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {groupCourses.map((c) => <CourseCard key={c.id} course={c} pct={progresses[c.id] ?? 0} />)}
            </div>
          </div>
        );
      })}
    </main>
  );
}

function SearchBar({ query, setQuery }: { query: string; setQuery: (q: string) => void }) {
  return (
    <div className="relative mb-8">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="14" viewBox="0 0 13 13" fill="none" style={{ color: "var(--text-muted)" }}>
        <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M8.5 8.5L11.5 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="ค้นหาคอร์ส เช่น ก.พ., DSI, คณิต, ภาษาอังกฤษ..."
        className="w-full rounded-lg py-2.5 pl-9 pr-9 text-sm outline-none transition-all"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          color: "var(--text)",
          caretColor: "var(--primary)",
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(31,111,235,0.15)"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
      />
      {query && (
        <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70" style={{ color: "var(--text-muted)", fontSize: 12 }}>✕</button>
      )}
    </div>
  );
}

export default function CoursesPage() {
  return (
    <Suspense>
      <CoursesInner />
    </Suspense>
  );
}
