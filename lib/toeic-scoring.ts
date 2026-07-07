// Shared TOEIC scaled-score helpers — used by both the exam engine
// (ExamClient.tsx, per-section Listening/Reading breakdown) and the e-Exam
// leaderboard (app/e-exam/page.tsx, overall score from raw correct/total,
// since exam_scores only stores the combined total, not the per-section
// split). There's no official public ETS conversion table, so both are
// linear approximations from the raw correct ratio — always labeled as an
// estimate in the UI.

// Per-section (Listening or Reading): raw 0-100 -> scaled 5-495, step 5.
export function toeicSectionScore(correct: number, total: number): number {
  if (total <= 0) return 5;
  const pct = correct / total;
  const raw = 5 + pct * 490;
  return Math.min(495, Math.max(5, Math.round(raw / 5) * 5));
}

// Overall (Listening + Reading combined): raw 0-200 -> scaled 10-990, step 10.
export function toeicOverallScore(correct: number, total: number): number {
  if (total <= 0) return 10;
  const pct = correct / total;
  const raw = 10 + pct * 980;
  return Math.min(990, Math.max(10, Math.round(raw / 10) * 10));
}

export const TOEIC_BANDS = [
  { min: 900, label: "Expert", desc: "เหมาะกับสายงานที่ใช้ภาษาอังกฤษเป็นหลัก" },
  { min: 750, label: "Advanced", desc: "มาตรฐานบริษัทข้ามชาติและหน่วยงานรัฐชั้นนำ" },
  { min: 550, label: "Intermediate", desc: "มาตรฐานทั่วไปสำหรับการสมัครงานส่วนใหญ่ในไทย" },
  { min: 0, label: "Basic", desc: "ยังต้องพัฒนาเพิ่มเติมก่อนนำไปใช้สมัครงาน" },
];

export function toeicBand(total: number) {
  return TOEIC_BANDS.find((b) => total >= b.min)!;
}
