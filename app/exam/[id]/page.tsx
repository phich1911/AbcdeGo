import type { Metadata } from "next";
import ExamClient from "./ExamClient";

// Known exam ids, prerendered at build time instead of server-rendered per
// request. Hardcoded (not imported from lib/exam-data) since that module is
// guarded to throw if ever pulled into the client-bundled ExamClient. The
// metadata below is duplicated here (not derived from lib/exam-data) for
// the same reason — keeps the answer-key module out of this page's import graph entirely.
const EXAM_META: Record<string, { title: string; description: string }> = {
  "kp-mock-1": { title: "ข้อสอบจำลอง ก.พ. ชุดที่ 1", description: "ข้อสอบจำลอง ก.พ. ครบ 3 วิชา 100 ข้อ จับเวลา 180 นาที เหมือนสอบจริงทุกอย่าง ทำฟรีบน AbcdeGo" },
  "kp-mock-2": { title: "ข้อสอบจำลอง ก.พ. ชุดที่ 2", description: "ข้อสอบจำลอง ก.พ. ชุดที่ 2 ครบ 3 วิชา 100 ข้อ จับเวลา 180 นาที โจทย์ยากขึ้นกว่าชุดที่ 1" },
  "toeic-mock-1": { title: "ข้อสอบจำลอง TOEIC ชุดที่ 1", description: "ข้อสอบจำลอง TOEIC Listening + Reading ครบ 200 ข้อ จับเวลา 120 นาที เหมือนสอบจริงทุกอย่าง" },
};

export async function generateStaticParams() {
  return [{ id: "kp-mock-1" }, { id: "kp-mock-2" }, { id: "toeic-mock-1" }];
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const meta = EXAM_META[id];
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/exam/${id}` },
    openGraph: { title: meta.title, description: meta.description },
  };
}

export default async function ExamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ExamClient id={id} />;
}
