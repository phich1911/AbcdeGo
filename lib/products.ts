export interface Product {
  id: string;
  title: string;
  description: string;
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
    price: 299,
    paddlePriceId: "pri_01kvnfaja4x5y82c7ben28xw2d",
    questionCount: 100,
    timeLimit: 180,
    examId: "kp-mock-1",
  },
  {
    id: "mock-kp-2",
    title: "ข้อสอบจำลอง ก.พ. ชุดที่ 2",
    description: "วิชาภาษาไทย 100 ข้อ จับเวลา 150 นาที",
    category: "ก.พ.",
    price: 299,
    paddlePriceId: null,
    questionCount: 100,
    timeLimit: 150,
  },
  {
    id: "mock-dsi-1",
    title: "ข้อสอบจำลอง DSI ชุดที่ 1",
    description: "กฎหมายและกระบวนการสืบสวน 100 ข้อ จับเวลา 120 นาที",
    category: "DSI",
    price: 299,
    paddlePriceId: null,
    questionCount: 100,
    timeLimit: 120,
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
