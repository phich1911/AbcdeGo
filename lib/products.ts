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

export const PRODUCTS: Product[] = [];

// XP discount: every 500 XP = 10 THB off, max 50 THB
export function calcDiscount(xp: number): number {
  const steps = Math.min(Math.floor(xp / 500), 5);
  return steps * 10;
}

export function finalPrice(price: number, xp: number): number {
  return price - calcDiscount(xp);
}
