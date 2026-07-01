"use client";

import Link from "next/link";
import { COURSES } from "@/lib/data";
import { getCourseProgress } from "@/lib/progress";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Fuse from "fuse.js";

const SLUG_TO_CATEGORY: Record<string, string> = {
  kp: "สอบ ก.พ.",
  "eng-m": "ภาษาอังกฤษ ม.ปลาย",
  "math-m": "คณิตศาสตร์ ม.ปลาย",
  "thai-m": "ภาษาไทย ม.ปลาย",
  "physics-m": "ฟิสิกส์ ม.ปลาย",
  "law": "กฎหมาย",
  "civil": "ข้าราชการ",
};

const CATEGORY_SLUGS: Record<string, string> = {
  "สอบ ก.พ.": "kp",
  "ภาษาอังกฤษ ม.ปลาย": "eng-m",
  "คณิตศาสตร์ ม.ปลาย": "math-m",
  "ภาษาไทย ม.ปลาย": "thai-m",
  "ฟิสิกส์ ม.ปลาย": "physics-m",
  "กฎหมาย": "law",
  "ข้าราชการ": "civil",
};

const CATEGORY_META: Record<string, { description: string }> = {
  "สอบ ก.พ.": { description: "วิชาความสามารถทั่วไป ภาษาไทย และภาษาอังกฤษ สำหรับสอบ ก.พ." },
  "ภาษาอังกฤษ ม.ปลาย": { description: "ไวยากรณ์ การอ่าน คำศัพท์ บทสนทนา และการเขียน สำหรับระดับ ม.4–ม.6" },
  "คณิตศาสตร์ ม.ปลาย": { description: "จำนวนและพีชคณิต เรขาคณิต สถิติ และแคลคูลัส สำหรับระดับ ม.4–ม.6" },
  "ภาษาไทย ม.ปลาย": { description: "หลักการใช้ภาษา ทักษะการสื่อสาร และวรรณคดีวรรณกรรม สำหรับระดับ ม.4–ม.6" },
  "ฟิสิกส์ ม.ปลาย": { description: "กลศาสตร์ คลื่น ไฟฟ้า ความร้อน และฟิสิกส์สมัยใหม่ สำหรับระดับ ม.4–ม.6" },
  "กฎหมาย": { description: "รัฐธรรมนูญ กฎหมายแพ่ง กฎหมายอาญา และกฎหมายที่เกี่ยวข้องกับการสอบราชการ" },
  "ข้าราชการ": { description: "ความรู้เกี่ยวกับระบบราชการ จริยธรรม และการพัฒนาตนเองสำหรับข้าราชการ" },
};

// ก.พ. sets
const KP_SETS = [
  {
    slug: "1",
    label: "ชุดที่ 1",
    description: "ความรู้ทั่วไป ภาษาอังกฤษ และความรู้และลักษณะการเป็นข้าราชการที่ดี",
    cats: ["สอบ ก.พ."],
  },
  {
    slug: "2",
    label: "ชุดที่ 2",
    description: "อนุกรม เงื่อนไขสัญลักษณ์ ภาษาอังกฤษ (บทสนทนา/Reading) และกฎหมายราชการ",
    cats: ["สอบ ก.พ."],
  },
];

// Top-level categories shown on /courses
const TOP_LEVEL = [
  { slug: "kp", label: "สอบ ก.พ.", description: "วิชาความสามารถทั่วไป ภาษาไทย และภาษาอังกฤษ สำหรับสอบ ก.พ.", cats: ["สอบ ก.พ."] },
  {
    slug: "mplatai", label: "มัธยมศึกษาตอนปลาย (ม.4–6)",
    description: "ภาษาอังกฤษ คณิตศาสตร์ และภาษาไทย สำหรับระดับ ม.4–ม.6",
    cats: ["ภาษาอังกฤษ ม.ปลาย", "คณิตศาสตร์ ม.ปลาย", "ภาษาไทย ม.ปลาย", "ฟิสิกส์ ม.ปลาย"],
  },
  { slug: "law", label: "กฎหมายพื้นฐานที่ควรรู้", description: "รัฐธรรมนูญ กฎหมายแพ่ง กฎหมายอาญา และกฎหมายที่เกี่ยวข้องกับการสอบราชการ", cats: ["กฎหมาย"] },
  { slug: "toeic", label: "TOEIC", description: "เตรียมสอบ TOEIC ทักษะ Listening และ Reading สำหรับการทำงานและสมัครงาน", cats: ["TOEIC"], comingSoon: true },
  { slug: "civil", label: "ข้าราชการ พนักงานราชการ ลูกจ้างชั่วคราว และพนักงานของรัฐ", description: "ความรู้เกี่ยวกับระบบราชการ จริยธรรม และการพัฒนาตนเองสำหรับข้าราชการ", cats: ["ข้าราชการ"] },
];

// Groups inside ข้าราชการ
const CIVIL_GROUPS: Record<string, { label: string; icon: string; description: string }> = {
  amlo: { label: "สำนักงาน ปปง. (AMLO)", icon: "🏦", description: "พระราชบัญญัติป้องกันและปราบปรามการฟอกเงิน · กฎกระทรวงแบ่งส่วนราชการ" },
  dsi: { label: "กรมสอบสวนคดีพิเศษ (DSI)", icon: "🔍", description: "พระราชบัญญัติการสอบสวนคดีพิเศษ พ.ศ. 2547 · คณะกรรมการ กคพ. · อำนาจพนักงานสอบสวนคดีพิเศษ" },
  moj: { label: "นักวิชาการยุติธรรม (สป.ยธ.)", icon: "🏛️", description: "กระทรวงยุติธรรม · สำนักงานปลัดกระทรวงยุติธรรม · นักวิชาการยุติธรรมปฏิบัติการ" },
};

// Standalone subject groups inside สอบ ก.พ. (not tied to a specific set)
const KP_GROUPS: Record<string, { label: string; icon: string; description: string }> = {
  general: { label: "วิชาความรู้ความสามารถทั่วไป (คณิตศาสตร์ & ภาษาไทย)", icon: "🧮", description: "อนุกรม เงื่อนไขสัญลักษณ์ เงื่อนไขภาษา ร้อยละและสมการ การอ่านตารางข้อมูลและกราฟ และภาษาไทย" },
};

// Sub-categories inside มัธยมศึกษาตอนปลาย
const MPLATAI_SUBS = [
  { slug: "eng-m", label: "ภาษาอังกฤษ", description: "ไวยากรณ์ การอ่าน คำศัพท์ บทสนทนา และการเขียน สำหรับระดับ ม.4–ม.6", cat: "ภาษาอังกฤษ ม.ปลาย" },
  { slug: "math-m", label: "คณิตศาสตร์", description: "จำนวนและพีชคณิต เรขาคณิต สถิติ และแคลคูลัส สำหรับระดับ ม.4–ม.6", cat: "คณิตศาสตร์ ม.ปลาย" },
  { slug: "thai-m", label: "ภาษาไทย", description: "หลักการใช้ภาษา ทักษะการสื่อสาร และวรรณคดีวรรณกรรม สำหรับระดับ ม.4–ม.6", cat: "ภาษาไทย ม.ปลาย" },
  { slug: "physics-m", label: "ฟิสิกส์", description: "กลศาสตร์ คลื่น ไฟฟ้า ความร้อน และฟิสิกส์สมัยใหม่ สำหรับระดับ ม.4–ม.6", cat: "ฟิสิกส์ ม.ปลาย" },
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
          <span style={{ color: "var(--accent)", fontWeight: 500 }}>{course.xpReward} XP</span>
        </div>
      </div>
    </Link>
  );
}

function CoursesInner() {
  const searchParams = useSearchParams();
  const catSlug = searchParams.get("cat");
  const setSlug = searchParams.get("set");
  const subSlug = searchParams.get("sub");
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

  // ก.พ. group sub-view (e.g. ?cat=kp&sub=general) — standalone subject, not tied to a set
  if (catSlug === "kp" && setSlug === null && subSlug !== null) {
    const groupMeta = KP_GROUPS[subSlug];
    const courses = COURSES.filter((c) => c.category === "สอบ ก.พ." && c.group === subSlug);
    return (
      <main className="max-w-4xl mx-auto px-6 pb-16" style={{ paddingTop: 72 }}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 2 }}>{groupMeta?.icon} {groupMeta?.label}</h1>
            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{groupMeta?.description}</p>
          </div>
          <Link href="/courses?cat=kp" style={{ fontSize: 13, color: "var(--primary)", textDecoration: "none" }}>← สอบ ก.พ.</Link>
        </div>
        <SearchBar query={query} setQuery={setQuery} />
        <div className="grid md:grid-cols-2 gap-3">
          {courses.map((c) => <CourseCard key={c.id} course={c} pct={progresses[c.id] ?? 0} />)}
        </div>
      </main>
    );
  }

  // ก.พ. set view — show courses inside a set
  if (catSlug === "kp" && setSlug !== null) {
    const courses = COURSES.filter((c) => c.category === "สอบ ก.พ." && !c.group && (c.kpSet ?? 1) === Number(setSlug));
    return (
      <main className="max-w-4xl mx-auto px-6 pb-16" style={{ paddingTop: 72 }}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 2 }}>สอบ ก.พ. — ชุดที่ {setSlug}</h1>
            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>เลือกวิชาที่คุณอยากเรียน</p>
          </div>
          <Link href="/courses?cat=kp" style={{ fontSize: 13, color: "var(--primary)", textDecoration: "none" }}>← ชุดข้อสอบ</Link>
        </div>
        <SearchBar query={query} setQuery={setQuery} />
        <div className="grid md:grid-cols-2 gap-3">
          {courses.map((c) => <CourseCard key={c.id} course={c} pct={progresses[c.id] ?? 0} />)}
        </div>
      </main>
    );
  }

  // ก.พ. sets view — show set cards
  if (catSlug === "kp") {
    return (
      <main className="max-w-4xl mx-auto px-6 pb-16" style={{ paddingTop: 72 }}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 2 }}>สอบ ก.พ.</h1>
            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>เลือกชุดข้อสอบที่ต้องการเรียน</p>
          </div>
          <Link href="/courses" style={{ fontSize: 13, color: "var(--primary)", textDecoration: "none" }}>← หมวดหมู่</Link>
        </div>
        <details className="card-lg mb-5" style={{ padding: "14px 18px" }} open>
          <summary style={{ cursor: "pointer", fontSize: 14, fontWeight: 700, color: "var(--text)", listStyle: "none" }}>
            เกี่ยวกับการสอบ ก.พ.
          </summary>
          <p style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.8, whiteSpace: "pre-line", marginTop: 12 }}>{COURSES.find((c) => c.category === "สอบ ก.พ.")?.intro}</p>
        </details>
        <SearchBar query={query} setQuery={setQuery} />
        <div className="grid sm:grid-cols-2 gap-4">
          {Object.keys(KP_GROUPS).map((g) => {
            const gm = KP_GROUPS[g];
            const groupCourses = COURSES.filter((c) => c.category === "สอบ ก.พ." && c.group === g);
            return (
              <Link key={g} href={`/courses?cat=kp&sub=${g}`}
                className="card-lg flex flex-col gap-3 p-5" style={{ textDecoration: "none" }}>
                <span className="badge" style={{ fontSize: 11, width: "fit-content" }}>{groupCourses.length} วิชา</span>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", margin: 0 }}>{gm.icon} {gm.label}</h2>
                <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>{gm.description}</p>
                <div className="mt-auto flex items-center gap-1" style={{ fontSize: 12, color: "var(--primary)", fontWeight: 500 }}>
                  <span>ดูวิชาทั้งหมด</span><span>→</span>
                </div>
              </Link>
            );
          })}
          {KP_SETS.map((set) => {
            const count = COURSES.filter((c) => c.category === "สอบ ก.พ." && !c.group && (c.kpSet ?? 1) === Number(set.slug)).length;
            const isLocked = (set as { locked?: boolean }).locked;
            if (isLocked) {
              return (
                <div key={set.slug} className="card-lg flex flex-col gap-3 p-5" style={{ opacity: 0.6, cursor: "default" }}>
                  <span className="badge" style={{ fontSize: 11, width: "fit-content" }}> เร็วๆ นี้</span>
                  <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", margin: 0 }}>{set.label}</h2>
                  <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>{set.description}</p>
                  <div className="mt-auto flex items-center gap-1" style={{ fontSize: 12, color: "var(--text-subtle)", fontWeight: 500 }}>
                    <span>กำลังเตรียมเนื้อหา</span>
                  </div>
                </div>
              );
            }
            return (
              <Link key={set.slug} href={`/courses?cat=kp&set=${set.slug}`}
                className="card-lg flex flex-col gap-3 p-5" style={{ textDecoration: "none" }}>
                <span className="badge" style={{ fontSize: 11, width: "fit-content" }}>{count} วิชา</span>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", margin: 0 }}>{set.label}</h2>
                <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>{set.description}</p>
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

  // ข้าราชการ — group sub-view (e.g. ?cat=civil&sub=amlo)
  if (catSlug === "civil" && subSlug !== null) {
    const groupMeta = CIVIL_GROUPS[subSlug];
    const courses = COURSES.filter((c) => c.category === "ข้าราชการ" && (c as { group?: string }).group === subSlug);
    return (
      <main className="max-w-4xl mx-auto px-6 pb-16" style={{ paddingTop: 72 }}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 2 }}>{groupMeta?.icon} {groupMeta?.label}</h1>
            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{groupMeta?.description}</p>
          </div>
          <Link href="/courses?cat=civil" style={{ fontSize: 13, color: "var(--primary)", textDecoration: "none" }}>← ข้าราชการ</Link>
        </div>
        <SearchBar query={query} setQuery={setQuery} />
        <div className="grid md:grid-cols-2 gap-3">
          {courses.map((c) => <CourseCard key={c.id} course={c} pct={progresses[c.id] ?? 0} />)}
        </div>
      </main>
    );
  }

  // Subject category view — show courses
  if (activeCat !== null) {
    const allCourses = COURSES.filter((c) => c.category === activeCat);
    const meta = CATEGORY_META[activeCat];
    const intro = allCourses.find((c) => c.intro)?.intro;
    const isMplataiSub = ["eng-m", "math-m", "thai-m", "physics-m"].includes(catSlug ?? "");

    // For ข้าราชการ: render group cards + ungrouped course cards
    let courseCards: React.ReactNode;
    if (catSlug === "civil") {
      const ungrouped = allCourses.filter((c) => !c.group);
      courseCards = (
        <div className="grid md:grid-cols-2 gap-3">
          {Object.keys(CIVIL_GROUPS).map((g) => {
            const gm = CIVIL_GROUPS[g];
            const groupCourses = allCourses.filter((c) => c.group === g);
            const hasContent = groupCourses.length > 0;
            const totalLessons = groupCourses.reduce((s, c) => s + c.totalLessons, 0);
            const totalXp = groupCourses.reduce((s, c) => s + c.xpReward, 0);
            const avgPct = hasContent
              ? Math.round(groupCourses.reduce((s, c) => s + (progresses[c.id] ?? 0), 0) / groupCourses.length)
              : 0;
            if (!hasContent) {
              return (
                <div key={g} className="card-lg flex flex-col gap-3 p-4" style={{ opacity: 0.5, cursor: "default" }}>
                  <div className="flex gap-1.5">
                    <span className="badge" style={{ fontSize: 11 }}>ข้าราชการ</span>
                    <span className="badge" style={{ fontSize: 11 }}>เร็วๆ นี้</span>
                  </div>
                  <div>
                    <h2 style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 3 }}>{gm.icon} {gm.label}</h2>
                    <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5 }}>{gm.description}</p>
                  </div>
                  <div className="mt-auto" style={{ fontSize: 12, color: "var(--text-subtle)" }}>กำลังเตรียมเนื้อหา</div>
                </div>
              );
            }
            return (
              <Link key={g} href={`/courses?cat=civil&sub=${g}`}
                className="card-lg flex flex-col gap-3 p-4 transition-colors hover:border-[color:var(--text-subtle)]"
                style={{ textDecoration: "none" }}>
                <div className="flex gap-1.5">
                  <span className="badge" style={{ fontSize: 11 }}>ข้าราชการ</span>
                  <span className="badge" style={{ fontSize: 11 }}>{groupCourses.length} วิชา</span>
                </div>
                <div>
                  <h2 style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 3 }}>{gm.icon} {gm.label}</h2>
                  <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5 }}>{gm.description}</p>
                </div>
                <div className="mt-auto">
                  <div className="flex justify-between mb-1.5" style={{ fontSize: 11, color: "var(--text-muted)" }}>
                    <span>ความก้าวหน้า</span>
                    <span style={{ color: avgPct > 0 ? "var(--primary)" : undefined }}>{avgPct}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${avgPct}%` }} />
                  </div>
                  <div className="flex justify-between mt-3" style={{ fontSize: 12 }}>
                    <span style={{ color: "var(--text-muted)" }}>{totalLessons} บทเรียน</span>
                    <span style={{ color: "var(--accent)", fontWeight: 500 }}>{totalXp} XP</span>
                  </div>
                </div>
              </Link>
            );
          })}
          {ungrouped.map((c) => <CourseCard key={c.id} course={c} pct={progresses[c.id] ?? 0} />)}
        </div>
      );
    } else {
      courseCards = (
        <div className="grid md:grid-cols-2 gap-3">
          {allCourses.map((c) => <CourseCard key={c.id} course={c} pct={progresses[c.id] ?? 0} />)}
        </div>
      );
    }

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
              เกี่ยวกับการสอบ
            </summary>
            <p style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.8, whiteSpace: "pre-line", marginTop: 12 }}>{intro}</p>
          </details>
        )}
        <SearchBar query={query} setQuery={setQuery} />
        {courseCards}
      </main>
    );
  }

  // Default — top-level category cards
  return (
    <main className="max-w-4xl mx-auto px-6 pb-16" style={{ paddingTop: 72 }}>
      <div className="mb-5">
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 2 }}>เลือกหมวดหมู่</h1>
        <p style={{ fontSize: 13, color: "var(--text-muted)" }}>เลือกหมวดหมู่ที่คุณสนใจ แล้วเริ่มเรียนได้เลย</p>
      </div>
      <SearchBar query={query} setQuery={setQuery} />
      <div className="grid sm:grid-cols-3 gap-4">
        {TOP_LEVEL.map((item) => {
          const count = COURSES.filter((c) => item.cats.includes(c.category ?? "")).length;
          if ((item as { comingSoon?: boolean }).comingSoon) {
            return (
              <div key={item.slug} className="card-lg flex flex-col gap-3 p-5" style={{ opacity: 0.6, cursor: "default" }}>
                <span className="badge" style={{ fontSize: 11, width: "fit-content" }}>เร็วๆ นี้</span>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", margin: 0 }}>{item.label}</h2>
                <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>{item.description}</p>
                <div className="mt-auto flex items-center gap-1" style={{ fontSize: 12, color: "var(--text-subtle)", fontWeight: 500 }}>
                  <span>กำลังเตรียมเนื้อหา</span>
                </div>
              </div>
            );
          }
          return (
            <Link key={item.slug} href={`/courses?cat=${item.slug}`}
              className="card-lg flex flex-col gap-3 p-5" style={{ textDecoration: "none" }}>
              <span className="badge" style={{ fontSize: 11, width: "fit-content" }}>{count} คอร์ส</span>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", margin: 0 }}>{item.label}</h2>
              <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>{item.description}</p>
              <div className="mt-auto flex items-center gap-1" style={{ fontSize: 12, color: "var(--primary)", fontWeight: 500 }}>
                <span>ดูคอร์ส</span><span>→</span>
              </div>
            </Link>
          );
        })}
      </div>
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

function CoursesPageInner() {
  const searchParams = useSearchParams();
  const key = searchParams.toString();
  return <CoursesInner key={key} />;
}

export default function CoursesPage() {
  return (
    <Suspense>
      <CoursesPageInner />
    </Suspense>
  );
}
