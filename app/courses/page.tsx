import type { Metadata } from "next";
import CoursesClient from "./CoursesClient";

// Duplicated (small, stable) from CoursesClient.tsx rather than imported —
// keeps this server component free of any "use client" coupling, matching
// the pattern used for course/[id] and exam/[id] metadata.
const CATEGORY_META: Record<string, { label: string; description: string }> = {
  kp: { label: "สอบ ก.พ.", description: "วิชาความสามารถทั่วไป ภาษาไทย และภาษาอังกฤษ สำหรับสอบ ก.พ." },
  "eng-m": { label: "ภาษาอังกฤษ ม.ปลาย", description: "ไวยากรณ์ การอ่าน คำศัพท์ บทสนทนา และการเขียน สำหรับระดับ ม.4–ม.6" },
  "math-m": { label: "คณิตศาสตร์ ม.ปลาย", description: "จำนวนและพีชคณิต เรขาคณิต สถิติ และแคลคูลัส สำหรับระดับ ม.4–ม.6" },
  "thai-m": { label: "ภาษาไทย ม.ปลาย", description: "หลักการใช้ภาษา ทักษะการสื่อสาร และวรรณคดีวรรณกรรม สำหรับระดับ ม.4–ม.6" },
  "physics-m": { label: "ฟิสิกส์ ม.ปลาย", description: "กลศาสตร์ คลื่น ไฟฟ้า ความร้อน และฟิสิกส์สมัยใหม่ สำหรับระดับ ม.4–ม.6" },
  law: { label: "กฎหมายพื้นฐานที่ควรรู้", description: "รัฐธรรมนูญ กฎหมายแพ่ง กฎหมายอาญา และกฎหมายที่เกี่ยวข้องกับการสอบราชการ" },
  civil: { label: "ข้าราชการ พนักงานราชการ ลูกจ้างชั่วคราว และพนักงานของรัฐ", description: "ความรู้เกี่ยวกับระบบราชการ จริยธรรม และการพัฒนาตนเองสำหรับข้าราชการ" },
  toeic: { label: "TOEIC", description: "เตรียมสอบ TOEIC ทักษะ Listening และ Reading สำหรับการทำงานและสมัครงาน" },
  mplatai: { label: "มัธยมศึกษาตอนปลาย (ม.4–6)", description: "ภาษาอังกฤษ คณิตศาสตร์ ภาษาไทย และฟิสิกส์ สำหรับระดับ ม.4–ม.6" },
};

const KP_SET_META: Record<string, { label: string; description: string }> = {
  "1": { label: "สอบ ก.พ. — ชุดที่ 1", description: "ความรู้ทั่วไป ภาษาอังกฤษ และความรู้และลักษณะการเป็นข้าราชการที่ดี" },
  "2": { label: "สอบ ก.พ. — ชุดที่ 2", description: "อนุกรม เงื่อนไขสัญลักษณ์ ภาษาอังกฤษ (บทสนทนา/Reading) และกฎหมายราชการ" },
};

const KP_SUB_META: Record<string, { label: string; description: string }> = {
  general: { label: "วิชาความรู้ความสามารถทั่วไป (คณิตศาสตร์ & ภาษาไทย)", description: "อนุกรม อุปมาอุปไมย เงื่อนไขสัญลักษณ์ เงื่อนไขภาษา ร้อยละและสมการ การอ่านตารางข้อมูลและกราฟ และภาษาไทย" },
};

const CIVIL_SUB_META: Record<string, { label: string; description: string }> = {
  amlo: { label: "สำนักงาน ปปง. (AMLO)", description: "พระราชบัญญัติป้องกันและปราบปรามการฟอกเงิน · กฎกระทรวงแบ่งส่วนราชการ" },
  dsi: { label: "กรมสอบสวนคดีพิเศษ (DSI)", description: "พระราชบัญญัติการสอบสวนคดีพิเศษ พ.ศ. 2547 · คณะกรรมการ กคพ. · อำนาจพนักงานสอบสวนคดีพิเศษ" },
  moj: { label: "นักวิชาการยุติธรรม (สป.ยธ.)", description: "กระทรวงยุติธรรม · สำนักงานปลัดกระทรวงยุติธรรม · นักวิชาการยุติธรรมปฏิบัติการ" },
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; set?: string; sub?: string }>;
}): Promise<Metadata> {
  const { cat, set, sub } = await searchParams;

  let meta: { label: string; description: string } | null = null;
  const params = new URLSearchParams();
  if (cat) params.set("cat", cat);
  if (set) params.set("set", set);
  if (sub) params.set("sub", sub);

  if (cat === "kp" && set) meta = KP_SET_META[set] ?? null;
  else if (cat === "kp" && sub) meta = KP_SUB_META[sub] ?? null;
  else if (cat === "civil" && sub) meta = CIVIL_SUB_META[sub] ?? null;
  else if (cat) meta = CATEGORY_META[cat] ?? null;

  const title = meta ? meta.label : "คอร์สเรียนทั้งหมด";
  const description = meta ? meta.description : "เลือกหมวดหมู่คอร์สเรียนฟรีที่คุณสนใจ — สอบ ก.พ., TOEIC, ม.ปลาย, กฎหมาย และข้าราชการ";
  const qs = params.toString();
  const canonical = qs ? `/courses?${qs}` : "/courses";
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description },
  };
}

export default function CoursesPage() {
  return <CoursesClient />;
}
