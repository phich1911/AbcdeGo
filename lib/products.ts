export interface Product {
  id: string;
  title: string;
  description: string;
  highlights?: string[];
  category: string;
  price: number; // THB
  paddlePriceId: string | null; // null = coming soon
  questionCount: number;
  timeLimit: number; // minutes
  examId?: string; // links to exam data in lib/exam-data/
}

export const PRODUCTS: Product[] = [
  {
    id: "mock-kp-1",
    title: "ข้อสอบจำลอง ก.พ. ชุดที่ 1",
    description: "ครบ 3 วิชา 100 ข้อ จับเวลา 180 นาที เหมือนสอบจริงทุกอย่าง",
    category: "ก.พ.",
    price: 149,
    paddlePriceId: null,
    questionCount: 100,
    timeLimit: 180,
    examId: "kp-mock-1",
    highlights: [
      "โหมด 1 — วิชาความรู้ทั่วไป 50 ข้อ (คณิตศาสตร์ & ภาษาไทย) ผ่าน 60%",
      "โหมด 2 — วิชาภาษาอังกฤษ 25 ข้อ ผ่าน 50% (ปลดล็อคหลังผ่านโหมด 1)",
      "โหมด 3 — วิชากฎหมายข้าราชการ 25 ข้อ ผ่าน 60% (ปลดล็อคหลังผ่านโหมด 2)",
      "โหมด 4 — ข้อสอบเต็มชุด 100 ข้อ จับเวลา 180 นาที เหมือนสอบจริง (ปลดล็อคหลังผ่านครบ 3 วิชา)",
    ],
  },
];

// XP discount: every 500 XP = 10 THB off, max 50 THB
export function calcDiscount(xp: number): number {
  const steps = Math.min(Math.floor(xp / 500), 5);
  return steps * 10;
}

export function finalPrice(price: number, xp: number): number {
  return price - calcDiscount(xp);
}
