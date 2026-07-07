// Contains the exam answer key — must never be imported from a "use client" file.
if (typeof window !== "undefined") {
  throw new Error("lib/exam-data/kp-mock-1 must only be imported on the server");
}

export interface ExamQuestion {
  id: number;
  question: string;
  choices: string[];
  correct: number;
  explanation: string;
  // TOEIC-only optional fields — a Part 1 photograph, the English text to
  // speak via lib/tts.ts for listening questions, and whether choices should
  // render as bare A/B/C/D labels (never printed on the real test, Part 1 & 2).
  imageUrl?: string;
  audioScript?: string;
  spokenChoices?: boolean;
}

export interface ExamSection {
  id: string;
  title: string;
  shortTitle: string;
  questionCount: number;
  totalScore: number;
  passingPercent: number;
  timeRecommended: number;
  questions: ExamQuestion[];
  // TOEIC-only: which scaled-score group (Listening/Reading) this section
  // rolls up into. Used only when the exam's scoringMode is "toeic".
  group?: "listening" | "reading";
}

export interface MockExam {
  id: string;
  title: string;
  totalTime: number;
  xpReward: number;
  rankReward: string;
  sections: ExamSection[];
  // When set to "toeic", the exam has no per-section pass/fail — results
  // instead show a TOEIC-style scaled score (10-990) and proficiency band,
  // and full-mode completion always awards XP (there's nothing to "fail").
  scoringMode?: "toeic";
}

const section1: ExamSection = {
  id: "s1",
  title: "วิชาความรู้ความสามารถทั่วไป (คณิตศาสตร์ & ภาษาไทย)",
  shortTitle: "วิชาที่ 1",
  questionCount: 50,
  totalScore: 100,
  passingPercent: 60,
  timeRecommended: 90,
  questions: [
    // ── 1. อนุกรมตัวเลข ──────────────────────────────────────
    {
      id: 1,
      question: "อนุกรม 3, 6, 11, 18, 27, ? มีค่าเท่าใด",
      choices: ["36", "37", "38", "39"],
      correct: 2,
      explanation: "ผลต่างเพิ่มทีละ 2 คือ 3,5,7,9,11 → 27+11 = 38",
    },
    {
      id: 2,
      question: "อนุกรม 512, 256, 128, 64, 32, ? มีค่าเท่าใด",
      choices: ["8", "16", "20", "24"],
      correct: 1,
      explanation: "หารด้วย 2 ทุกครั้ง: 32÷2 = 16",
    },
    {
      id: 3,
      question: "อนุกรม 1, 2, 4, 7, 11, 16, ? มีค่าเท่าใด",
      choices: ["20", "21", "22", "23"],
      correct: 2,
      explanation: "ผลต่างเพิ่มทีละ 1 คือ 1,2,3,4,5,6 → 16+6 = 22",
    },
    {
      id: 4,
      question: "อนุกรม 2, 5, 10, 17, 26, 37, ? มีค่าเท่าใด",
      choices: ["48", "49", "50", "52"],
      correct: 2,
      explanation: "ผลต่างเพิ่มทีละ 2 คือ 3,5,7,9,11,13 → 37+13 = 50",
    },
    {
      id: 5,
      question: "อนุกรม 2, 3, 5, 9, 17, 33, ? มีค่าเท่าใด",
      choices: ["60", "63", "65", "67"],
      correct: 2,
      explanation: "กฎ ×2−1: 33×2−1 = 65",
    },
    // ── 2. คณิตศาสตร์ทั่วไป ──────────────────────────────────
    {
      id: 6,
      question: "สินค้าราคา 800 บาท ลดราคา 15% แล้วบวกกำไรอีก 10% ราคาขายจริงเท่าใด",
      choices: ["728 บาท", "738 บาท", "748 บาท", "758 บาท"],
      correct: 2,
      explanation: "800×0.85 = 680 บาท แล้ว 680×1.10 = 748 บาท",
    },
    {
      id: 7,
      question: "ซื้อสินค้ามา 1,500 บาท ขายไป 1,200 บาท ขาดทุนกี่เปอร์เซ็นต์",
      choices: ["15%", "20%", "25%", "30%"],
      correct: 1,
      explanation: "(1,500−1,200)/1,500 × 100 = 300/1,500 × 100 = 20%",
    },
    {
      id: 8,
      question: "แบ่งเงิน 7,200 บาท ในอัตราส่วน 1:2:3 ส่วนที่มากที่สุดได้เท่าใด",
      choices: ["2,400 บาท", "3,000 บาท", "3,600 บาท", "4,200 บาท"],
      correct: 2,
      explanation: "รวมสัดส่วน = 6 ส่วน → ส่วนใหญ่สุด = 7,200÷6×3 = 3,600 บาท",
    },
    {
      id: 9,
      question: "รถ A ออกจากเมือง X ด้วยความเร็ว 80 กม./ชม. รถ B ออกจากเมือง Y (ห่างกัน 400 กม.) พร้อมกันด้วยความเร็ว 120 กม./ชม. ทั้งคู่จะพบกันหลังจากกี่ชั่วโมง",
      choices: ["1.5 ชั่วโมง", "2 ชั่วโมง", "2.5 ชั่วโมง", "3 ชั่วโมง"],
      correct: 1,
      explanation: "เวลา = ระยะทาง/(ความเร็วรวม) = 400/(80+120) = 400/200 = 2 ชั่วโมง",
    },
    {
      id: 10,
      question: "ห.ร.ม. ของ 48 และ 72 คือเท่าใด",
      choices: ["12", "18", "24", "36"],
      correct: 2,
      explanation: "48 = 2⁴×3, 72 = 2³×3² → ห.ร.ม. = 2³×3 = 24",
    },
    // ── 3. ตารางข้อมูล ────────────────────────────────────────
    {
      id: 11,
      question: "ตารางยอดขาย 4 สาขา (พันบาท)\nสาขา A: Q1=120 Q2=150 Q3=180 Q4=210\nสาขา B: Q1=200 Q2=180 Q3=160 Q4=140\nสาขา C: Q1=80  Q2=100 Q3=120 Q4=100\nสาขา D: Q1=150 Q2=150 Q3=150 Q4=150\n\nสาขาใดมียอดขายรวมตลอดปีสูงสุด",
      choices: ["สาขา A", "สาขา B", "สาขา C", "สาขา D"],
      correct: 1,
      explanation: "A=660, B=680, C=400, D=600 พันบาท → สาขา B สูงสุดด้วย 680 พันบาท",
    },
    {
      id: 12,
      question: "ตารางยอดขาย 4 สาขา (พันบาท)\nสาขา A: Q1=120 Q2=150 Q3=180 Q4=210\nสาขา B: Q1=200 Q2=180 Q3=160 Q4=140\nสาขา C: Q1=80  Q2=100 Q3=120 Q4=100\nสาขา D: Q1=150 Q2=150 Q3=150 Q4=150\n\nยอดขายเฉลี่ยต่อไตรมาสของสาขา A เท่าใด",
      choices: ["155 พันบาท", "160 พันบาท", "165 พันบาท", "170 พันบาท"],
      correct: 2,
      explanation: "(120+150+180+210)/4 = 660/4 = 165 พันบาท",
    },
    {
      id: 13,
      question: "ตารางยอดขาย 4 สาขา (พันบาท)\nสาขา A: Q1=120 Q2=150 Q3=180 Q4=210\nสาขา B: Q1=200 Q2=180 Q3=160 Q4=140\nสาขา C: Q1=80  Q2=100 Q3=120 Q4=100\nสาขา D: Q1=150 Q2=150 Q3=150 Q4=150\n\nไตรมาสใดมียอดขายรวมทุกสาขาสูงสุด",
      choices: ["ไตรมาส 1", "ไตรมาส 2", "ไตรมาส 3", "ไตรมาส 4"],
      correct: 2,
      explanation: "Q1=550, Q2=580, Q3=610, Q4=600 → ไตรมาส 3 สูงสุด",
    },
    {
      id: 14,
      question: "ตารางยอดขาย 4 สาขา (พันบาท)\nสาขา A: Q1=120 Q2=150 Q3=180 Q4=210\nสาขา B: Q1=200 Q2=180 Q3=160 Q4=140\nสาขา C: Q1=80  Q2=100 Q3=120 Q4=100\nสาขา D: Q1=150 Q2=150 Q3=150 Q4=150\n\nสาขา B มียอดขายลดลงจาก Q1 ถึง Q4 คิดเป็นกี่เปอร์เซ็นต์",
      choices: ["20%", "25%", "30%", "35%"],
      correct: 2,
      explanation: "(200−140)/200 × 100 = 60/200 × 100 = 30%",
    },
    {
      id: 15,
      question: "ตารางยอดขาย 4 สาขา (พันบาท)\nสาขา A: Q1=120 Q2=150 Q3=180 Q4=210\nสาขา B: Q1=200 Q2=180 Q3=160 Q4=140\nสาขา C: Q1=80  Q2=100 Q3=120 Q4=100\nสาขา D: Q1=150 Q2=150 Q3=150 Q4=150\n\nยอดขายรวมทั้ง 4 สาขาตลอดทั้งปีเท่าใด (พันบาท)",
      choices: ["2,200", "2,300", "2,340", "2,400"],
      correct: 2,
      explanation: "660+680+400+600 = 2,340 พันบาท",
    },
    // ── 4. เงื่อนไขสัญลักษณ์ (อสมการ) ──────────────────────
    {
      id: 16,
      question: "กำหนดให้ x > y > 0 และ z = x + y\nข้อสรุปที่ 1: z > x\nข้อสรุปที่ 2: z > 2y\nข้อใดถูกต้อง",
      choices: [
        "ข้อสรุปที่ 1 ถูก และข้อสรุปที่ 2 ถูก",
        "ข้อสรุปที่ 1 ถูก และข้อสรุปที่ 2 ผิด",
        "ข้อสรุปที่ 1 ผิด และข้อสรุปที่ 2 ถูก",
        "ข้อสรุปที่ 1 ผิด และข้อสรุปที่ 2 ผิด",
      ],
      correct: 0,
      explanation: "z=x+y > x (เพราะ y>0) ✓ และ z=x+y > 2y เพราะ x>y ✓ ดังนั้นทั้งสองถูก",
    },
    {
      id: 17,
      question: "กำหนดให้ x > y > 0 และ z = x + y\nข้อสรุปที่ 1: x > z/2\nข้อสรุปที่ 2: y > z/2\nข้อใดถูกต้อง",
      choices: [
        "ข้อสรุปที่ 1 ถูก และข้อสรุปที่ 2 ถูก",
        "ข้อสรุปที่ 1 ถูก และข้อสรุปที่ 2 ผิด",
        "ข้อสรุปที่ 1 ผิด และข้อสรุปที่ 2 ถูก",
        "ข้อสรุปที่ 1 ผิด และข้อสรุปที่ 2 ผิด",
      ],
      correct: 1,
      explanation: "z/2=(x+y)/2 → x>(x+y)/2  x>y (ถูก) ✓ แต่ y>(x+y)/2  y>x (ผิด เพราะ x>y)",
    },
    {
      id: 18,
      question: "กำหนดให้ a > 0 และ b < 0\nข้อสรุปที่ 1: a > b\nข้อสรุปที่ 2: ab < 0\nข้อใดถูกต้อง",
      choices: [
        "ข้อสรุปที่ 1 ถูก และข้อสรุปที่ 2 ถูก",
        "ข้อสรุปที่ 1 ถูก และข้อสรุปที่ 2 ผิด",
        "ข้อสรุปที่ 1 ผิด และข้อสรุปที่ 2 ถูก",
        "ข้อสรุปที่ 1 ผิด และข้อสรุปที่ 2 ผิด",
      ],
      correct: 0,
      explanation: "a>0>b ดังนั้น a>b ✓ และ a>0, b<0 → ab<0 ✓ ทั้งสองถูก",
    },
    {
      id: 19,
      question: "กำหนดให้ a > 0 และ b < 0\nข้อสรุปที่ 1: a − b > 0\nข้อสรุปที่ 2: a + b > 0\nข้อใดถูกต้อง",
      choices: [
        "ข้อสรุปที่ 1 ถูก และข้อสรุปที่ 2 ถูก",
        "ข้อสรุปที่ 1 ถูก และข้อสรุปที่ 2 ผิด",
        "ข้อสรุปที่ 1 ผิด และข้อสรุปที่ 2 ถูก",
        "ข้อสรุปที่ 1 ผิด และข้อสรุปที่ 2 ผิด",
      ],
      correct: 1,
      explanation: "a>0, b<0 → −b>0 → a−b>0 ✓ แต่ a+b อาจบวกหรือลบก็ได้ สรุปไม่ได้ว่า >0 จึงถือว่าผิด",
    },
    {
      id: 20,
      question: "กำหนดให้ p = 12, q = 8, r = p/q\nข้อสรุปที่ 1: r > 1\nข้อสรุปที่ 2: p − q = r × 2\nข้อใดถูกต้อง",
      choices: [
        "ข้อสรุปที่ 1 ถูก และข้อสรุปที่ 2 ถูก",
        "ข้อสรุปที่ 1 ถูก และข้อสรุปที่ 2 ผิด",
        "ข้อสรุปที่ 1 ผิด และข้อสรุปที่ 2 ถูก",
        "ข้อสรุปที่ 1 ผิด และข้อสรุปที่ 2 ผิด",
      ],
      correct: 1,
      explanation: "r=12/8=1.5 → r>1 ✓ แต่ p−q=4 และ r×2=3 → 4≠3 ผิด",
    },
    {
      id: 21,
      question: "กำหนดให้ p = 12, q = 8, r = p/q\nข้อสรุปที่ 1: p > q + r\nข้อสรุปที่ 2: q > p − r × 4\nข้อใดถูกต้อง",
      choices: [
        "ข้อสรุปที่ 1 ถูก และข้อสรุปที่ 2 ถูก",
        "ข้อสรุปที่ 1 ถูก และข้อสรุปที่ 2 ผิด",
        "ข้อสรุปที่ 1 ผิด และข้อสรุปที่ 2 ถูก",
        "ข้อสรุปที่ 1 ผิด และข้อสรุปที่ 2 ผิด",
      ],
      correct: 0,
      explanation: "q+r=8+1.5=9.5 → p=12>9.5 ✓ และ p−r×4=12−6=6 → q=8>6 ✓ ทั้งสองถูก",
    },
    {
      id: 22,
      question: "กำหนดให้ A = 15% ของ 200 และ B = 20% ของ 100\nข้อสรุปที่ 1: A > B\nข้อสรุปที่ 2: A + B = 50\nข้อใดถูกต้อง",
      choices: [
        "ข้อสรุปที่ 1 ถูก และข้อสรุปที่ 2 ถูก",
        "ข้อสรุปที่ 1 ถูก และข้อสรุปที่ 2 ผิด",
        "ข้อสรุปที่ 1 ผิด และข้อสรุปที่ 2 ถูก",
        "ข้อสรุปที่ 1 ผิด และข้อสรุปที่ 2 ผิด",
      ],
      correct: 0,
      explanation: "A=30, B=20 → A>B ✓ และ A+B=50 ✓ ทั้งสองถูก",
    },
    {
      id: 23,
      question: "กำหนดให้ A = 15% ของ 200 และ B = 20% ของ 100\nข้อสรุปที่ 1: A − B = 5\nข้อสรุปที่ 2: A/B = 1.5\nข้อใดถูกต้อง",
      choices: [
        "ข้อสรุปที่ 1 ถูก และข้อสรุปที่ 2 ถูก",
        "ข้อสรุปที่ 1 ถูก และข้อสรุปที่ 2 ผิด",
        "ข้อสรุปที่ 1 ผิด และข้อสรุปที่ 2 ถูก",
        "ข้อสรุปที่ 1 ผิด และข้อสรุปที่ 2 ผิด",
      ],
      correct: 2,
      explanation: "A=30, B=20 → A−B=10≠5 ผิด แต่ A/B=30/20=1.5 ✓ ",
    },
    {
      id: 24,
      question: "กำหนดให้ m > 0, n > 0 และ m + n = 20, m − n = 4\nข้อสรุปที่ 1: m > 10\nข้อสรุปที่ 2: n < 10\nข้อใดถูกต้อง",
      choices: [
        "ข้อสรุปที่ 1 ถูก และข้อสรุปที่ 2 ถูก",
        "ข้อสรุปที่ 1 ถูก และข้อสรุปที่ 2 ผิด",
        "ข้อสรุปที่ 1 ผิด และข้อสรุปที่ 2 ถูก",
        "ข้อสรุปที่ 1 ผิด และข้อสรุปที่ 2 ผิด",
      ],
      correct: 0,
      explanation: "m+n=20, m−n=4 → บวก: 2m=24 → m=12>10 ✓ และ n=8<10 ✓ ทั้งสองถูก",
    },
    {
      id: 25,
      question: "กำหนดให้ m > 0, n > 0 และ m + n = 20, m − n = 4\nข้อสรุปที่ 1: m × n = 96\nข้อสรุปที่ 2: m² − n² = 80\nข้อใดถูกต้อง",
      choices: [
        "ข้อสรุปที่ 1 ถูก และข้อสรุปที่ 2 ถูก",
        "ข้อสรุปที่ 1 ถูก และข้อสรุปที่ 2 ผิด",
        "ข้อสรุปที่ 1 ผิด และข้อสรุปที่ 2 ถูก",
        "ข้อสรุปที่ 1 ผิด และข้อสรุปที่ 2 ผิด",
      ],
      correct: 0,
      explanation: "m=12, n=8 → m×n=96 ✓ และ m²−n²=(m+n)(m−n)=20×4=80 ✓ ทั้งสองถูก",
    },
    // ── 5. อุปมาอุปไมย ────────────────────────────────────────
    {
      id: 26,
      question: "หมอ : โรงพยาบาล :: ครู : ?",
      choices: ["ห้องสมุด", "โรงเรียน", "ร้านหนังสือ", "มหาวิทยาลัย"],
      correct: 1,
      explanation: "หมอทำงานที่โรงพยาบาล ครูทำงานที่โรงเรียน (สถานที่ทำงานหลัก)",
    },
    {
      id: 27,
      question: "ปากกา : เขียน :: กรรไกร : ?",
      choices: ["ตัด", "เย็บ", "พิมพ์", "วาด"],
      correct: 0,
      explanation: "ปากกาใช้เขียน กรรไกรใช้ตัด (ความสัมพันธ์: อุปกรณ์ : หน้าที่)",
    },
    {
      id: 28,
      question: "นก : ฟ้า :: ปลา : ?",
      choices: ["แม่น้ำ", "ทะเลสาบ", "น้ำ", "ดิน"],
      correct: 2,
      explanation: "นกอยู่ในฟ้า ปลาอยู่ในน้ำ (ความสัมพันธ์: สิ่งมีชีวิต : ที่อยู่อาศัย)",
    },
    {
      id: 29,
      question: "แพทย์ : ผู้ป่วย :: ทนาย : ?",
      choices: ["ผู้พิพากษา", "อาชญากร", "ลูกความ", "พยาน"],
      correct: 2,
      explanation: "แพทย์ดูแลผู้ป่วย ทนายดูแลลูกความ (ความสัมพันธ์: วิชาชีพ : ผู้รับบริการ)",
    },
    {
      id: 30,
      question: "ร้อน : หนาว :: มืด : ?",
      choices: ["กลางคืน", "แสง", "สว่าง", "ดาว"],
      correct: 2,
      explanation: "ร้อนและหนาวเป็นคำตรงข้ามกัน มืดและสว่างเป็นคำตรงข้ามกัน",
    },
    // ── 6. เงื่อนไขภาษา ───────────────────────────────────────
    {
      id: 31,
      question: "นาย A B C D E นั่งเรียงกัน 5 ที่นั่งจากซ้ายไปขวา\nเงื่อนไข: A นั่งซ้ายสุด / C นั่งติดกับ B / D นั่งระหว่าง C และ E\nใครนั่งขวาสุด",
      choices: ["B", "C", "D", "E"],
      correct: 3,
      explanation: "A นั่งที่ 1 → ได้ลำดับ A B C D E: C ติดกับ B ✓ D อยู่ระหว่าง C และ E ✓ → E นั่งขวาสุด",
    },
    {
      id: 32,
      question: "มีงาน ก ข ค ง จ ต้องทำตามเงื่อนไข\nเงื่อนไข: ก ต้องทำก่อน ข / ข ต้องทำก่อน ค / ค ต้องทำก่อน ง\nลำดับใดถูกต้อง",
      choices: ["ก ข ค ง จ", "ข ก ค ง จ", "ก ค ข ง จ", "ก ข ง ค จ"],
      correct: 0,
      explanation: "ก→ข→ค→ง ต้องเรียงตามลำดับ จ ทำเมื่อใดก็ได้ → ก ข ค ง จ ถูกต้อง",
    },
    {
      id: 33,
      question: "บุคคล 1 2 3 4 5 ยืนเรียงกัน\nเงื่อนไข: 1 สูงกว่า 2 / 2 สูงกว่า 3 / 5 สูงกว่า 4 / 4 สูงกว่า 3\nใครเตี้ยที่สุด",
      choices: ["2", "3", "4", "5"],
      correct: 1,
      explanation: "1>2>3 และ 5>4>3 → 3 อยู่ล่างสุดของทั้งสองสาย จึงเตี้ยที่สุด",
    },
    {
      id: 34,
      question: "วางกล่อง A B C D E ซ้อนกัน\nเงื่อนไข: E อยู่เหนือ A / A อยู่เหนือ B / B อยู่เหนือ C / D อยู่เหนือ C\nกล่องใดอยู่ล่างสุด",
      choices: ["A", "C", "D", "E"],
      correct: 1,
      explanation: "E>A>B>C และ D>C → C อยู่ล่างสุดในทุกสาย",
    },
    {
      id: 35,
      question: "โต๊ะประชุมกลม 6 ที่นั่ง (ที่ 1-6 ตามเข็มนาฬิกา)\nเงื่อนไข: นาย ก นั่งที่ 1 / นาย ข นั่งตรงข้าม ก (ที่ 4) / นาย ค นั่งที่ถัดจาก ก ทางขวา\nนาย ค นั่งที่เท่าใด",
      choices: ["ที่ 2", "ที่ 3", "ที่ 5", "ที่ 6"],
      correct: 0,
      explanation: "ก=ที่1, ข=ที่4, ถัดจากที่1ทางขวา (ตามเข็มนาฬิกา) = ที่2 → ค นั่งที่ 2",
    },
    // ── 7. เรียงประโยค ────────────────────────────────────────
    {
      id: 36,
      question: "จงเรียงประโยคต่อไปนี้ให้ถูกต้อง\nก. จึงทำให้ประสิทธิภาพการทำงานลดลง\nข. พนักงานที่ขาดการพักผ่อนเพียงพอ\nค. ควรนอนหลับอย่างน้อย 7-8 ชั่วโมงต่อคืน\nง. มักมีสมาธิสั้นและตัดสินใจผิดพลาด",
      choices: ["ข ง ก ค", "ค ข ง ก", "ข ก ง ค", "ง ข ก ค"],
      correct: 0,
      explanation: "ข(พนักงานขาดพัก)→ง(สมาธิสั้น)→ก(ประสิทธิภาพลด)→ค(ข้อเสนอแนะ)",
    },
    {
      id: 37,
      question: "จงเรียงประโยคต่อไปนี้ให้ถูกต้อง\nก. อย่างไรก็ตามการท่องเที่ยวก็มีผลเสียต่อสิ่งแวดล้อม\nข. การท่องเที่ยวเป็นอุตสาหกรรมที่สร้างรายได้ให้ประเทศ\nค. ดังนั้นจึงต้องมีการท่องเที่ยวอย่างยั่งยืน\nง. เช่น การทิ้งขยะและการทำลายธรรมชาติ",
      choices: ["ข ก ค ง", "ก ข ง ค", "ข ก ง ค", "ง ข ก ค"],
      correct: 2,
      explanation: "ข(รายได้)→ก(แต่มีผลเสีย)→ง(เช่น ขยะ)→ค(ดังนั้นต้องยั่งยืน)",
    },
    {
      id: 38,
      question: "จงเรียงประโยคต่อไปนี้ให้ถูกต้อง\nก. ดังนั้นควรปลูกพืชคลุมดินและทำแนวกั้น\nข. การพังทลายของดินเกิดจากการชะล้างของน้ำฝน\nค. ทำให้หน้าดินสูญเสียแร่ธาตุที่จำเป็น\nง. ส่งผลให้ผลผลิตทางการเกษตรลดลง",
      choices: ["ข ค ง ก", "ค ข ง ก", "ก ข ค ง", "ข ง ค ก"],
      correct: 0,
      explanation: "ข(สาเหตุ)→ค(ผลต่อหน้าดิน)→ง(ผลต่อเกษตร)→ก(แนวทางแก้ไข)",
    },
    {
      id: 39,
      question: "จงเรียงประโยคต่อไปนี้ให้ถูกต้อง\nก. รัฐบาลหลายประเทศจึงส่งเสริมการลงทุนด้านนี้\nข. การใช้พลังงานทดแทนกำลังได้รับความนิยม\nค. เช่น พลังงานแสงอาทิตย์ พลังงานลม และพลังงานน้ำ\nง. เนื่องจากช่วยลดการใช้เชื้อเพลิงฟอสซิลและลดมลพิษ",
      choices: ["ข ค ง ก", "ข ง ค ก", "ค ข ง ก", "ง ข ค ก"],
      correct: 0,
      explanation: "ข(พลังงานทดแทนนิยม)→ค(เช่น)→ง(เพราะลดมลพิษ)→ก(รัฐส่งเสริม)",
    },
    {
      id: 40,
      question: "จงเรียงประโยคต่อไปนี้ให้ถูกต้อง\nก. จึงนำไปสู่ปัญหาสุขภาพในระยะยาว\nข. คนในเมืองใหญ่มักมีความเครียดสะสมสูง\nค. ดังนั้นควรหาเวลาพักผ่อนและออกกำลังกายสม่ำเสมอ\nง. เนื่องจากชีวิตที่เร่งรีบและการแข่งขันสูง",
      choices: ["ข ง ก ค", "ง ข ก ค", "ข ก ง ค", "ก ข ง ค"],
      correct: 0,
      explanation: "ข(คนเมืองเครียด)→ง(เพราะชีวิตเร่งรีบ)→ก(จึงมีปัญหาสุขภาพ)→ค(ควรพักผ่อน)",
    },
    // ── 8. เลือกใช้คำ ─────────────────────────────────────────
    {
      id: 41,
      question: "ข้อใดใช้คำ \"เนื่องจาก\" ได้ถูกต้อง",
      choices: [
        "เขาสำเร็จการศึกษา เนื่องจากจะไปทำงาน",
        "เขาไม่มาทำงาน เนื่องจากป่วย",
        "เขาเนื่องจากขยันจึงได้รับรางวัล",
        "เนื่องจากเขาสำเร็จการศึกษา จะไปทำงาน",
      ],
      correct: 1,
      explanation: "\"เนื่องจาก\" ใช้บอกสาเหตุ วางหลังผล: ไม่มา (ผล) เนื่องจากป่วย (เหตุ)",
    },
    {
      id: 42,
      question: "ข้อใดใช้ภาษาได้ถูกต้องและกระชับที่สุด",
      choices: [
        "เขาได้ทำการเดินทางไปยังกรุงเทพมหานครเพื่อที่จะประชุม",
        "เขาเดินทางไปกรุงเทพฯ เพื่อประชุม",
        "เขาได้ไปทำการประชุมที่กรุงเทพมหานคร",
        "เขาทำการเดินทางไปประชุมที่กรุงเทพมหานคร",
      ],
      correct: 1,
      explanation: "ข้อ ข. ไม่ใช้ \"ได้\" \"ทำการ\" เกินความจำเป็น กระชับและถูกต้องที่สุด",
    },
    {
      id: 43,
      question: "คำใดเป็นคำพ้องความหมายกับ \"อนุมัติ\"",
      choices: ["ปฏิเสธ", "เห็นชอบ", "คัดค้าน", "ประวิงเวลา"],
      correct: 1,
      explanation: "อนุมัติ หมายถึง เห็นชอบ ยินยอม ให้ทำได้",
    },
    {
      id: 44,
      question: "ข้อใดสะกดถูกต้องทุกคำ",
      choices: [
        "กิจการ, วิสาหกิจ, ราชการ",
        "กิจกาล, วิสาหกิจ, ราชการ",
        "กิจการ, วิสาหกิจ, ราชกาน",
        "กิจการ, วิสาหกิต, ราชการ",
      ],
      correct: 0,
      explanation: "กิจการ, วิสาหกิจ, ราชการ ล้วนสะกดถูกต้อง",
    },
    {
      id: 45,
      question: "สำนวน \"น้ำขึ้นให้รีบตัก\" หมายความว่าอย่างไร",
      choices: [
        "รีบตักน้ำก่อนน้ำลด",
        "ฉวยโอกาสดีให้เป็นประโยชน์ทันที",
        "ทำงานให้รวดเร็ว",
        "อย่ารอช้าในทุกเรื่อง",
      ],
      correct: 1,
      explanation: "สำนวนนี้หมายถึงการฉวยโอกาสที่ดีให้ทันท่วงที เหมือนตักน้ำตอนน้ำขึ้น",
    },
    // ── 9. อ่านจับใจความ ─────────────────────────────────────
    {
      id: 46,
      question: "อ่านข้อความต่อไปนี้แล้วตอบคำถาม\n\n\"ระบบราชการไทยกำลังเผชิญกับการเปลี่ยนแปลงครั้งสำคัญ จากการนำเทคโนโลยีดิจิทัลมาใช้ในการบริการประชาชน ทำให้ขั้นตอนต่างๆ สะดวก รวดเร็ว และโปร่งใสมากขึ้น อย่างไรก็ตาม ความสำเร็จของการเปลี่ยนแปลงนี้ขึ้นอยู่กับความสามารถในการปรับตัวของข้าราชการ และการสนับสนุนจากภาครัฐอย่างต่อเนื่อง\"\n\nข้อใดคือใจความสำคัญของบทความ",
      choices: [
        "ระบบราชการไทยล้าหลัง",
        "เทคโนโลยีดิจิทัลกำลังปรับปรุงระบบราชการให้ดีขึ้น",
        "ข้าราชการต้องเรียนรู้ใหม่ทั้งหมด",
        "ภาครัฐต้องลงทุนด้านดิจิทัลเพิ่มขึ้น",
      ],
      correct: 1,
      explanation: "บทความพูดถึงการนำดิจิทัลมาปรับปรุงระบบราชการให้สะดวก รวดเร็ว โปร่งใสมากขึ้น",
    },
    {
      id: 47,
      question: "จากบทความเดิม (ข้อ 46) ประโยชน์ที่กล่าวถึงคืออะไร",
      choices: [
        "ประหยัดงบประมาณของรัฐ",
        "ลดจำนวนข้าราชการ",
        "สะดวก รวดเร็ว และโปร่งใสมากขึ้น",
        "เพิ่มรายได้จากภาษี",
      ],
      correct: 2,
      explanation: "บทความระบุชัดว่า \"ทำให้ขั้นตอนต่างๆ สะดวก รวดเร็ว และโปร่งใสมากขึ้น\"",
    },
    {
      id: 48,
      question: "จากบทความเดิม (ข้อ 46) ความสำเร็จของการเปลี่ยนแปลงขึ้นอยู่กับอะไร",
      choices: [
        "งบประมาณจากภาครัฐเท่านั้น",
        "จำนวนข้าราชการที่ลดลง",
        "การปรับตัวของข้าราชการและการสนับสนุนจากภาครัฐ",
        "เทคโนโลยีที่ทันสมัยที่สุด",
      ],
      correct: 2,
      explanation: "บทความระบุว่าขึ้นอยู่กับ \"ความสามารถในการปรับตัวของข้าราชการ และการสนับสนุนจากภาครัฐ\"",
    },
    {
      id: 49,
      question: "จากบทความเดิม (ข้อ 46) คำว่า \"โปร่งใส\" ในบริบทนี้หมายถึงอะไร",
      choices: [
        "ชัดเจน ไม่ซับซ้อน",
        "ตรวจสอบได้ ไม่มีการทุจริต",
        "รวดเร็ว",
        "สะดวก",
      ],
      correct: 1,
      explanation: "โปร่งใสในบริบทราชการ หมายถึง ตรวจสอบได้ เปิดเผย ไม่มีการทุจริต",
    },
    {
      id: 50,
      question: "จากบทความเดิม (ข้อ 46) ข้อใดสะท้อนทัศนะผู้เขียนได้ดีที่สุด",
      choices: [
        "ระบบราชการไทยล้มเหลวอย่างสิ้นเชิง",
        "เทคโนโลยีดิจิทัลแก้ปัญหาทุกอย่างได้เอง",
        "การเปลี่ยนผ่านสู่ดิจิทัลมีโอกาสสำเร็จหากทุกฝ่ายร่วมมือกัน",
        "ข้าราชการต่อต้านการเปลี่ยนแปลงเสมอ",
      ],
      correct: 2,
      explanation: "ผู้เขียนมองเชิงบวกแต่มีเงื่อนไข: ดิจิทัลช่วยได้ แต่ต้องอาศัยความร่วมมือจากข้าราชการและภาครัฐ",
    },
  ],
};

const section2: ExamSection = {
  id: "s2",
  title: "วิชาภาษาอังกฤษ",
  shortTitle: "วิชาที่ 2",
  questionCount: 25,
  totalScore: 50,
  passingPercent: 50,
  timeRecommended: 45,
  questions: [
    // ── Conversation (Q51–55) ────────────────────────────────
    {
      id: 51,
      question: "A: \"I'd like to schedule a meeting with you this week. When would be convenient?\"\nB: \"______\"\n\nChoose the most appropriate response.",
      choices: [
        "I don't know.",
        "Anytime is fine, just come.",
        "How about Thursday afternoon? I'm free after 2 p.m.",
        "I'm very busy this week.",
      ],
      correct: 2,
      explanation: "การตอบในเชิงมืออาชีพควรเสนอวัน-เวลาที่ชัดเจนและแสดงความยินดีที่จะนัดหมาย",
    },
    {
      id: 52,
      question: "A: \"The client has complained about the delay in delivery.\"\nB: \"______\"\n\nWhich response is most professional?",
      choices: [
        "It's not our fault.",
        "I apologise for the inconvenience. We will investigate and update you shortly.",
        "The client should be more patient.",
        "Tell the client to wait.",
      ],
      correct: 1,
      explanation: "การตอบสนองต่อข้อร้องเรียนควรแสดงความรับผิดชอบ ขอโทษ และให้คำมั่นว่าจะแก้ไข",
    },
    {
      id: 53,
      question: "A: \"Could I take a few minutes of your time to explain our proposal?\"\nB: \"______\"\n\nChoose the best polite refusal.",
      choices: [
        "No, go away.",
        "Certainly, please go ahead.",
        "I'm afraid I'm rather tied up right now. Could we arrange a time tomorrow?",
        "I don't have time for this.",
      ],
      correct: 2,
      explanation: "'I'm afraid I'm rather tied up' เป็นการปฏิเสธอย่างสุภาพโดยเสนอทางเลือกอื่น แสดงความมีมารยาทในการสื่อสาร",
    },
    {
      id: 54,
      question: "A: \"We noticed some errors in the financial report you submitted.\"\nB: \"______\"\n\nChoose the most appropriate reply.",
      choices: [
        "That's impossible, I never make mistakes.",
        "Thank you for pointing that out. I'll review and correct it immediately.",
        "Maybe someone else made the mistake.",
        "The errors are not important.",
      ],
      correct: 1,
      explanation: "การรับฟังและตอบสนองต่อข้อผิดพลาดด้วยความรับผิดชอบและความมุ่งมั่นที่จะแก้ไขเป็นสิ่งสำคัญในสภาพแวดล้อมการทำงาน",
    },
    {
      id: 55,
      question: "A: \"Would you mind reviewing this document before the presentation?\"\nB: \"______\"\n\nWhich response shows willingness?",
      choices: [
        "I mind very much.",
        "Not at all. I'll look it over this afternoon.",
        "Why should I do that?",
        "You should do it yourself.",
      ],
      correct: 1,
      explanation: "'Not at all' เป็นการตอบรับ 'Would you mind...?' ในเชิงบวก หมายความว่าไม่รังเกียจและยินดีช่วย",
    },
    // ── Vocabulary (Q56–60) ──────────────────────────────────
    {
      id: 56,
      question: "Choose the word closest in meaning to \"INTEGRITY\".",
      choices: ["Dishonesty", "Moral uprightness", "Intelligence", "Ambition"],
      correct: 1,
      explanation: "INTEGRITY หมายถึง ความซื่อสัตย์ มีหลักการทางจริยธรรมที่แข็งแกร่ง ตรงกับ 'moral uprightness'",
    },
    {
      id: 57,
      question: "The word \"TRANSPARENT\" as used in official contexts most nearly means:",
      choices: ["Hidden", "Open and easy to understand", "Complex", "Confidential"],
      correct: 1,
      explanation: "TRANSPARENT ในบริบทราชการหมายถึง โปร่งใส เปิดเผยข้อมูลได้ตรวจสอบได้ ตรงกับ 'open and easy to understand'",
    },
    {
      id: 58,
      question: "\"The new regulation will be ______ starting next fiscal year.\" Choose the best word.",
      choices: ["implemented", "imagined", "ignored", "implied"],
      correct: 0,
      explanation: "'Implemented' (นำไปปฏิบัติใช้) เหมาะสมที่สุดในบริบทของการบังคับใช้ระเบียบใหม่",
    },
    {
      id: 59,
      question: "Choose the word opposite in meaning to \"COMPULSORY\".",
      choices: ["Mandatory", "Required", "Optional", "Enforced"],
      correct: 2,
      explanation: "COMPULSORY แปลว่า บังคับ จำเป็นต้องทำ คำตรงข้ามคือ OPTIONAL (ไม่บังคับ ตามความสมัครใจ)",
    },
    {
      id: 60,
      question: "\"The official's conduct was deemed ______ after a thorough investigation.\" Choose the most appropriate word.",
      choices: ["improper", "irrelevant", "inevitable", "immovable"],
      correct: 0,
      explanation: "'Improper' (ไม่เหมาะสม ผิดระเบียบ) เหมาะสมที่สุดในบริบทของการกระทำที่ถูกตรวจสอบและพบว่าไม่ถูกต้อง",
    },
    // ── Grammar (Q61–65) ─────────────────────────────────────
    {
      id: 61,
      question: "Choose the correct sentence:",
      choices: [
        "She doesn't knows the answer.",
        "She don't know the answer.",
        "She doesn't know the answer.",
        "She not knows the answer.",
      ],
      correct: 2,
      explanation: "ประธานบุรุษที่ 3 เอกพจน์ (She/He/It) ใช้ doesn't + กริยาช่องที่ 1 เสมอ → doesn't know",
    },
    {
      id: 62,
      question: "\"By the time the inspector arrived, the documents ______ already ______.\"",
      choices: ["had / been destroyed", "has / been destroyed", "was / destroyed", "will / be destroyed"],
      correct: 0,
      explanation: "Past Perfect Passive (had + been + V3) ใช้เมื่อเหตุการณ์หนึ่งเกิดและสิ้นสุดก่อนอีกเหตุการณ์ในอดีต",
    },
    {
      id: 63,
      question: "Choose the correct passive form of: \"The committee approved the budget.\"",
      choices: [
        "The budget is approved by the committee.",
        "The budget was approved by the committee.",
        "The budget has approved by the committee.",
        "The budget approved by the committee.",
      ],
      correct: 1,
      explanation: "Passive Voice ในอดีต (Simple Past) ใช้ was/were + V3 เพราะ budget เป็นเอกพจน์ → was approved",
    },
    {
      id: 64,
      question: "\"If the budget ______ approved last month, we could have started the project.\"",
      choices: ["was", "were", "had been", "has been"],
      correct: 2,
      explanation: "Third Conditional ใช้ If + had + V3 เพื่อสมมติสถานการณ์ในอดีตที่ไม่ได้เกิดขึ้น → had been approved",
    },
    {
      id: 65,
      question: "Choose the sentence with correct subject-verb agreement:",
      choices: [
        "The committee have reached a decision.",
        "Each of the officers are required to attend.",
        "The number of complaints has increased significantly.",
        "A number of files is missing.",
      ],
      correct: 2,
      explanation: "'The number of...' ใช้กริยาเอกพจน์ (has) เสมอ · 'A number of...' ใช้กริยาพหูพจน์ · 'Each of...' ใช้เอกพจน์",
    },
    // ── Reading Comprehension — Passage 1 (Q66–70) ──────────
    {
      id: 66,
      question: "Read the following passage and answer Questions 66–70.\n\n\"Good governance in the public sector requires transparency, accountability, and public participation. Government agencies must disclose information to citizens, justify their decisions, and invite feedback on policies. When these principles are applied consistently, public trust in government institutions tends to increase. However, implementing good governance often faces resistance from bureaucratic structures that prioritise internal procedures over public service outcomes.\"\n\nWhat is the main purpose of this passage?",
      choices: [
        "To criticise government agencies for being secretive.",
        "To explain the principles of good governance and the challenges of applying them.",
        "To argue that bureaucracy should be abolished.",
        "To show that public participation is unnecessary.",
      ],
      correct: 1,
      explanation: "บทความอธิบายหลักการธรรมาภิบาล (transparency, accountability, participation) และความท้าทายในการนำไปปฏิบัติ",
    },
    {
      id: 67,
      question: "According to the passage, what tends to happen when good governance principles are consistently applied?",
      choices: [
        "Government agencies become more secretive.",
        "Bureaucratic resistance increases.",
        "Public trust in government institutions increases.",
        "Citizens stop participating in policy-making.",
      ],
      correct: 2,
      explanation: "บทความระบุว่า 'public trust in government institutions tends to increase' เมื่อหลักธรรมาภิบาลถูกนำไปใช้อย่างสม่ำเสมอ",
    },
    {
      id: 68,
      question: "The word \"accountability\" in the passage most nearly means:",
      choices: [
        "The ability to keep financial accounts",
        "The responsibility to explain and justify one's actions",
        "The freedom to make decisions without oversight",
        "The authority to create new policies",
      ],
      correct: 1,
      explanation: "Accountability ในบริบทนี้หมายถึง ความรับผิดชอบที่ต้องอธิบายและพิสูจน์การกระทำของตน ไม่ใช่แค่การทำบัญชี",
    },
    {
      id: 69,
      question: "According to the passage, what is a major obstacle to implementing good governance?",
      choices: [
        "Lack of public interest in government affairs",
        "Insufficient funding for government agencies",
        "Bureaucratic structures that prioritise internal procedures",
        "Too much public participation in decision-making",
      ],
      correct: 2,
      explanation: "บทความระบุว่าอุปสรรคหลักคือ 'bureaucratic structures that prioritise internal procedures over public service outcomes'",
    },
    {
      id: 70,
      question: "Which of the following best describes the tone of the passage?",
      choices: [
        "Emotional and persuasive",
        "Humorous and informal",
        "Informative and objective",
        "Critical and aggressive",
      ],
      correct: 2,
      explanation: "บทความนำเสนอข้อมูลและข้อเท็จจริงอย่างเป็นกลาง ไม่มีอารมณ์หรือความลำเอียง จึงเป็นการเขียนเชิง 'informative and objective'",
    },
    // ── Reading Comprehension — Passage 2 (Q71–75) ──────────
    {
      id: 71,
      question: "Read the following passage and answer Questions 71–75.\n\n\"Digital transformation in the public sector is no longer optional — it is essential. Citizens now expect government services to be accessible online, available around the clock, and processed without unnecessary delays. Countries that have successfully digitised their public services report significant reductions in corruption, as human interaction in routine transactions is minimised. Thailand's government has introduced the 'Bhumibol' e-service platform and various digital ID initiatives as part of its broader push toward Thailand 4.0. Nevertheless, challenges remain, particularly in rural areas where internet access and digital literacy are limited.\"\n\nWhat is the central argument of this passage?",
      choices: [
        "Digital transformation is a choice that governments can delay.",
        "Digital public services are essential and bring benefits, but challenges remain.",
        "Rural areas should not receive digital services.",
        "Human interaction in government services should be completely eliminated.",
      ],
      correct: 1,
      explanation: "บทความนำเสนอว่าการเปลี่ยนแปลงสู่ดิจิทัลเป็นสิ่งจำเป็น มีประโยชน์ แต่ยังมีความท้าทายในพื้นที่ห่างไกล",
    },
    {
      id: 72,
      question: "According to the passage, one benefit of digitising public services is:",
      choices: [
        "Increasing the number of government staff.",
        "Making services available only during office hours.",
        "Reducing corruption by minimising human interaction.",
        "Eliminating the need for the internet.",
      ],
      correct: 2,
      explanation: "บทความระบุว่า 'significant reductions in corruption, as human interaction in routine transactions is minimised'",
    },
    {
      id: 73,
      question: "The word \"digitised\" in the passage most nearly means:",
      choices: [
        "Converted into digital format or systems",
        "Printed and distributed widely",
        "Translated into another language",
        "Classified as confidential",
      ],
      correct: 0,
      explanation: "'Digitised' หมายถึง การแปลงบริการหรือข้อมูลให้อยู่ในรูปแบบดิจิทัล",
    },
    {
      id: 74,
      question: "According to the passage, what challenges remain in Thailand's digital transformation?",
      choices: [
        "Lack of political will to adopt digital services",
        "Citizens refusing to use online platforms",
        "Limited internet access and digital literacy in rural areas",
        "Excessive corruption in urban areas",
      ],
      correct: 2,
      explanation: "บทความระบุว่า 'challenges remain, particularly in rural areas where internet access and digital literacy are limited'",
    },
    {
      id: 75,
      question: "The phrase \"around the clock\" in the passage means:",
      choices: [
        "Near a clock tower",
        "During office hours only",
        "Once every hour",
        "24 hours a day, every day",
      ],
      correct: 3,
      explanation: "'Around the clock' เป็น idiom หมายถึง ตลอด 24 ชั่วโมง ทุกวัน ไม่มีหยุด",
    },
  ],
};

const section3: ExamSection = {
  id: "s3",
  title: "วิชาความรู้และลักษณะการเป็นข้าราชการที่ดี",
  shortTitle: "วิชาที่ 3",
  questionCount: 25,
  totalScore: 50,
  passingPercent: 60,
  timeRecommended: 45,
  questions: [
    // ── 1. พ.ร.บ.ระเบียบบริหารราชการแผ่นดิน ─────────────────
    {
      id: 76,
      question: "พ.ร.บ.ระเบียบบริหารราชการแผ่นดิน พ.ศ. 2534 แบ่งการจัดระเบียบบริหารราชการแผ่นดินออกเป็นกี่ส่วน",
      choices: ["2 ส่วน", "3 ส่วน", "4 ส่วน", "5 ส่วน"],
      correct: 1,
      explanation: "แบ่งเป็น 3 ส่วน ได้แก่ ราชการส่วนกลาง ราชการส่วนภูมิภาค และราชการส่วนท้องถิ่น",
    },
    {
      id: 77,
      question: "ตาม พ.ร.บ.ระเบียบบริหารราชการแผ่นดิน กระทรวงหนึ่งมีผู้บังคับบัญชาสูงสุดคือใคร",
      choices: ["ปลัดกระทรวง", "อธิบดี", "รัฐมนตรีว่าการกระทรวง", "เลขาธิการ"],
      correct: 2,
      explanation: "รัฐมนตรีว่าการกระทรวงเป็นผู้บังคับบัญชาสูงสุดของกระทรวง มีอำนาจนโยบายและกำกับดูแลทุกหน่วยงานในกระทรวง",
    },
    {
      id: 78,
      question: "ราชการส่วนภูมิภาคตาม พ.ร.บ.ระเบียบบริหารราชการแผ่นดิน ประกอบด้วยหน่วยงานใด",
      choices: [
        "จังหวัดและอำเภอ",
        "จังหวัด อำเภอ และตำบล",
        "ภาค จังหวัด และอำเภอ",
        "จังหวัด อำเภอ ตำบล และหมู่บ้าน",
      ],
      correct: 0,
      explanation: "ราชการส่วนภูมิภาคมีเพียง 2 ระดับ คือ จังหวัด (มีผู้ว่าราชการจังหวัด) และอำเภอ (มีนายอำเภอ)",
    },
    {
      id: 79,
      question: "ตาม พ.ร.บ.ระเบียบบริหารราชการแผ่นดิน ผู้ว่าราชการจังหวัดมีฐานะเป็นอย่างไร",
      choices: [
        "หัวหน้าส่วนราชการส่วนท้องถิ่น",
        "ผู้แทนรัฐบาลและหัวหน้าราชการส่วนภูมิภาคในจังหวัด",
        "ข้าราชการการเมือง",
        "ผู้ช่วยรัฐมนตรีว่าการกระทรวงมหาดไทย",
      ],
      correct: 1,
      explanation: "ผู้ว่าราชการจังหวัดเป็นผู้แทนรัฐบาลและหัวหน้าบังคับบัญชาข้าราชการทุกฝ่ายในจังหวัด (ยกเว้นฝ่ายตุลาการ)",
    },
    {
      id: 80,
      question: "ตาม พ.ร.บ.ระเบียบบริหารราชการแผ่นดิน กรมมีหน้าที่หลักในการปฏิบัติงานด้านใด",
      choices: [
        "กำหนดนโยบายระดับชาติ",
        "ปฏิบัติงานตามภารกิจที่กระทรวงมอบหมาย",
        "กำกับดูแลราชการส่วนท้องถิ่น",
        "ออกกฎหมายและระเบียบข้อบังคับ",
      ],
      correct: 1,
      explanation: "กรมมีหน้าที่ปฏิบัติงานตามภารกิจที่ได้รับมอบหมายจากกระทรวง โดยมีอธิบดีเป็นหัวหน้า",
    },
    // ── 2. พ.ร.ฎ.ว่าด้วยหลักเกณฑ์และวิธีการบริหารกิจการบ้านเมืองที่ดี ──
    {
      id: 81,
      question: "พ.ร.ฎ.ว่าด้วยหลักเกณฑ์และวิธีการบริหารกิจการบ้านเมืองที่ดี พ.ศ. 2546 กำหนดเป้าหมายการบริหารกิจการบ้านเมืองที่ดีไว้กี่ประการ",
      choices: ["5 ประการ", "6 ประการ", "7 ประการ", "8 ประการ"],
      correct: 2,
      explanation: "กำหนดเป้าหมาย 7 ประการ เช่น เกิดประโยชน์สุขของประชาชน เกิดผลสัมฤทธิ์ต่อภารกิจรัฐ ประชาชนได้รับความสะดวก เป็นต้น",
    },
    {
      id: 82,
      question: "ตาม พ.ร.ฎ.บริหารกิจการบ้านเมืองที่ดี ส่วนราชการต้องจัดทำ \"แผนปฏิบัติราชการ\" เป็นแผนกี่ปี",
      choices: ["1 ปี", "3 ปี", "4 ปี", "5 ปี"],
      correct: 3,
      explanation: "ส่วนราชการต้องจัดทำแผนปฏิบัติราชการ 5 ปี ให้สอดคล้องกับแผนการบริหารราชการแผ่นดิน",
    },
    {
      id: 83,
      question: "ตาม พ.ร.ฎ.บริหารกิจการบ้านเมืองที่ดี หากส่วนราชการใดไม่สามารถปฏิบัติงานให้บรรลุผลสัมฤทธิ์ได้ ต้องดำเนินการอย่างไร",
      choices: [
        "ยุบส่วนราชการทันที",
        "รายงานต่อรัฐสภา",
        "เสนอแผนการปรับปรุงต่อ ก.พ.ร.",
        "ยุบรวมกับส่วนราชการอื่น",
      ],
      correct: 2,
      explanation: "ต้องเสนอแผนการปรับปรุงต่อคณะกรรมการพัฒนาระบบราชการ (ก.พ.ร.) เพื่อพิจารณาแก้ไข",
    },
    {
      id: 84,
      question: "ตาม พ.ร.ฎ.บริหารกิจการบ้านเมืองที่ดี หลักการ \"ลดขั้นตอนการปฏิบัติงาน\" มีวัตถุประสงค์หลักเพื่ออะไร",
      choices: [
        "ลดจำนวนข้าราชการ",
        "อำนวยความสะดวกและลดภาระแก่ประชาชน",
        "ประหยัดงบประมาณของรัฐ",
        "เพิ่มอำนาจให้ผู้บริหาร",
      ],
      correct: 1,
      explanation: "หลักการลดขั้นตอนมีเป้าหมายเพื่ออำนวยความสะดวก ลดระยะเวลา และลดภาระค่าใช้จ่ายแก่ประชาชน",
    },
    {
      id: 85,
      question: "ตาม พ.ร.ฎ.บริหารกิจการบ้านเมืองที่ดี \"การบริหารราชการแบบบูรณาการ\" หมายถึงข้อใด",
      choices: [
        "การรวมส่วนราชการเข้าด้วยกัน",
        "การประสานงานระหว่างส่วนราชการเพื่อให้บรรลุเป้าหมายร่วม",
        "การโอนงบประมาณระหว่างกระทรวง",
        "การใช้เทคโนโลยีดิจิทัลในการทำงาน",
      ],
      correct: 1,
      explanation: "การบริหารแบบบูรณาการคือการประสานและเชื่อมโยงการทำงานระหว่างส่วนราชการต่างๆ เพื่อให้บรรลุเป้าหมายร่วมกัน",
    },
    // ── 3. พ.ร.บ.วิธีปฏิบัติราชการทางปกครอง ─────────────────
    {
      id: 86,
      question: "พ.ร.บ.วิธีปฏิบัติราชการทางปกครอง พ.ศ. 2539 มีวัตถุประสงค์หลักเพื่ออะไร",
      choices: [
        "กำหนดขั้นตอนการออกกฎหมาย",
        "คุ้มครองสิทธิของผู้ได้รับผลกระทบจากคำสั่งทางปกครอง",
        "กำหนดโครงสร้างองค์กรของรัฐ",
        "ควบคุมการใช้งบประมาณของส่วนราชการ",
      ],
      correct: 1,
      explanation: "กฎหมายนี้มุ่งคุ้มครองสิทธิประชาชนที่ได้รับผลกระทบจากคำสั่งทางปกครอง โดยกำหนดขั้นตอนที่เป็นธรรม",
    },
    {
      id: 87,
      question: "ตาม พ.ร.บ.วิธีปฏิบัติราชการทางปกครอง คำสั่งทางปกครองที่กระทบสิทธิของบุคคล ต้องแจ้งให้คู่กรณีทราบล่วงหน้าก่อนมีคำสั่งอย่างน้อยกี่วัน",
      choices: ["7 วัน", "15 วัน", "ไม่มีกำหนดตายตัว แต่ต้องมีเวลาเพียงพอ", "30 วัน"],
      correct: 2,
      explanation: "กฎหมายไม่ได้กำหนดจำนวนวันที่แน่นอน แต่ต้องให้คู่กรณีมีเวลาเพียงพอในการโต้แย้งและแสดงพยานหลักฐาน",
    },
    {
      id: 88,
      question: "ตาม พ.ร.บ.วิธีปฏิบัติราชการทางปกครอง คำสั่งทางปกครองที่เป็นหนังสือต้องระบุสิ่งใดเป็นสาระสำคัญ",
      choices: [
        "ชื่อเจ้าหน้าที่ผู้ออกคำสั่งเท่านั้น",
        "เหตุผล วันเดือนปี และสิทธิอุทธรณ์",
        "ลายมือชื่อและตราประทับ",
        "งบประมาณที่เกี่ยวข้อง",
      ],
      correct: 1,
      explanation: "คำสั่งทางปกครองเป็นหนังสือต้องระบุ เหตุผล วันเดือนปีที่ออกคำสั่ง และสิทธิอุทธรณ์ของผู้รับคำสั่ง",
    },
    {
      id: 89,
      question: "ตาม พ.ร.บ.วิธีปฏิบัติราชการทางปกครอง ระยะเวลาอุทธรณ์คำสั่งทางปกครองโดยปกติคือกี่วันนับแต่วันที่รับทราบคำสั่ง",
      choices: ["15 วัน", "30 วัน", "45 วัน", "60 วัน"],
      correct: 1,
      explanation: "ระยะเวลาอุทธรณ์ปกติคือ 15 วัน แต่ถ้าคำสั่งไม่แจ้งสิทธิอุทธรณ์จะขยายเป็น 1 ปี",
    },
    {
      id: 90,
      question: "ตาม พ.ร.บ.วิธีปฏิบัติราชการทางปกครอง เจ้าหน้าที่ที่มีประโยชน์ได้เสียในเรื่องที่พิจารณาต้องดำเนินการอย่างไร",
      choices: [
        "ดำเนินการต่อไปได้โดยแจ้งให้ผู้บังคับบัญชาทราบ",
        "ถอนตัวจากการพิจารณาเรื่องนั้น",
        "ขอให้ผู้มีส่วนได้เสียทำหนังสือยินยอม",
        "ส่งเรื่องให้ ป.ป.ช. ตรวจสอบก่อน",
      ],
      correct: 1,
      explanation: "เจ้าหน้าที่ที่มีส่วนได้เสียต้องถอนตัวออกจากการพิจารณา เพื่อป้องกันการขัดกันแห่งผลประโยชน์",
    },
    // ── 4. ประมวลจริยธรรมข้าราชการ ────────────────────────────
    {
      id: 91,
      question: "ประมวลจริยธรรมข้าราชการพลเรือน พ.ศ. 2564 กำหนดมาตรฐานทางจริยธรรมไว้กี่ประการ",
      choices: ["5 ประการ", "7 ประการ", "9 ประการ", "12 ประการ"],
      correct: 2,
      explanation: "ประมวลจริยธรรมฯ กำหนดมาตรฐานทางจริยธรรม 9 ประการ เช่น ยึดมั่นในสถาบันหลัก ซื่อสัตย์สุจริต มีจิตสาธารณะ เป็นต้น",
    },
    {
      id: 92,
      question: "ข้อใดเป็นพฤติกรรมที่ขัดต่อประมวลจริยธรรมข้าราชการพลเรือนอย่างชัดเจน",
      choices: [
        "ปฏิบัติงานล่วงเวลาโดยไม่มีค่าตอบแทน",
        "รับของขวัญจากผู้มาติดต่อในเทศกาลปีใหม่มูลค่าเกิน 3,000 บาท",
        "ขอลาป่วยเมื่อเจ็บป่วยจริง",
        "แสดงความคิดเห็นในเรื่องส่วนตัวบนสื่อสังคมออนไลน์",
      ],
      correct: 1,
      explanation: "การรับของขวัญมูลค่าเกิน 3,000 บาท ขัดต่อประมวลจริยธรรมและระเบียบ ป.ป.ช. ว่าด้วยการรับทรัพย์สินฯ",
    },
    {
      id: 93,
      question: "ตามประมวลจริยธรรมข้าราชการพลเรือน \"การยึดถือประโยชน์ส่วนรวม\" หมายถึงข้อใด",
      choices: [
        "ทำงานให้ได้ผลงานมากที่สุด",
        "ไม่นำผลประโยชน์ส่วนตัวมาเป็นตัวกำหนดในการปฏิบัติหน้าที่",
        "เลือกงานที่ตนถนัดเป็นหลัก",
        "รายงานผลงานให้ผู้บังคับบัญชาทราบเสมอ",
      ],
      correct: 1,
      explanation: "หลักนี้กำหนดให้ข้าราชการต้องวางตัวเป็นกลาง ไม่ใช้หน้าที่เพื่อประโยชน์ส่วนตนหรือพวกพ้อง",
    },
    {
      id: 94,
      question: "ผู้มีหน้าที่รับผิดชอบในการบังคับใช้ประมวลจริยธรรมข้าราชการพลเรือนในแต่ละส่วนราชการคือใคร",
      choices: [
        "รัฐมนตรีว่าการกระทรวง",
        "หัวหน้าส่วนราชการ",
        "คณะกรรมการจริยธรรมประจำส่วนราชการ",
        "สำนักงาน ก.พ.",
      ],
      correct: 2,
      explanation: "แต่ละส่วนราชการต้องจัดตั้งคณะกรรมการจริยธรรมประจำส่วนราชการ เพื่อส่งเสริมและกำกับดูแลการปฏิบัติตามประมวลจริยธรรม",
    },
    {
      id: 95,
      question: "ตามประมวลจริยธรรมข้าราชการพลเรือน ข้าราชการที่ฝ่าฝืนมาตรฐานทางจริยธรรม จะได้รับการดำเนินการอย่างไรเป็นขั้นแรก",
      choices: [
        "ถูกดำเนินคดีอาญาทันที",
        "ถูกลงโทษทางวินัยทันที",
        "ถูกแนะนำให้ปรับปรุงพฤติกรรมก่อน",
        "ถูกพักราชการ",
      ],
      correct: 2,
      explanation: "การฝ่าฝืนจริยธรรมไม่ใช่ความผิดวินัยโดยตรง ขั้นแรกคณะกรรมการจริยธรรมจะแนะนำให้ปรับปรุง หากยังฝ่าฝืนจึงดำเนินการทางวินัยต่อไป",
    },
    // ── 5. กฎหมายอาญาความผิดต่อตำแหน่งหน้าที่ ───────────────
    {
      id: 96,
      question: "ประมวลกฎหมายอาญา มาตรา 149 บัญญัติเกี่ยวกับความผิดฐานใด",
      choices: [
        "เจ้าพนักงานปฏิบัติหน้าที่โดยมิชอบ",
        "เจ้าพนักงานรับสินบน",
        "เจ้าพนักงานเรียกรับทรัพย์สินโดยทุจริต",
        "เจ้าพนักงานละเว้นการปฏิบัติหน้าที่",
      ],
      correct: 1,
      explanation: "มาตรา 149 บัญญัติว่า เจ้าพนักงานผู้ใดเรียก รับ หรือยอมจะรับทรัพย์สินหรือประโยชน์อื่นใด เพื่อกระทำการหรือไม่กระทำการอย่างใดในตำแหน่ง มีความผิดฐานรับสินบน",
    },
    {
      id: 97,
      question: "ประมวลกฎหมายอาญา มาตรา 157 บัญญัติว่าเจ้าพนักงานที่ปฏิบัติหน้าที่โดยมิชอบ มีโทษอย่างไร",
      choices: [
        "ปรับไม่เกิน 10,000 บาท",
        "จำคุกไม่เกิน 1 ปี หรือปรับ หรือทั้งจำทั้งปรับ",
        "จำคุกตั้งแต่ 1 ปีถึง 10 ปี หรือปรับ หรือทั้งจำทั้งปรับ",
        "จำคุกไม่เกิน 6 เดือน",
      ],
      correct: 2,
      explanation: "มาตรา 157 กำหนดโทษจำคุกตั้งแต่ 1 ปีถึง 10 ปี หรือปรับตั้งแต่ 20,000–200,000 บาท หรือทั้งจำทั้งปรับ",
    },
    {
      id: 98,
      question: "ความผิดฐาน \"เจ้าพนักงานยักยอกทรัพย์\" ตามประมวลกฎหมายอาญาอยู่ในมาตราใด",
      choices: ["มาตรา 147", "มาตรา 149", "มาตรา 151", "มาตรา 157"],
      correct: 0,
      explanation: "มาตรา 147 บัญญัติว่า เจ้าพนักงานเบียดบังเอาทรัพย์ที่ตนมีหน้าที่ดูแลเป็นของตนหรือผู้อื่น มีความผิดฐานยักยอกทรัพย์",
    },
    {
      id: 99,
      question: "ข้าราชการที่ \"ละเว้นการปฏิบัติหน้าที่\" โดยมิชอบ เพื่อให้เกิดความเสียหายแก่ผู้หนึ่งผู้ใด มีความผิดตามมาตราใด",
      choices: ["มาตรา 148", "มาตรา 149", "มาตรา 157", "มาตรา 162"],
      correct: 2,
      explanation: "มาตรา 157 ครอบคลุมทั้งการปฏิบัติหน้าที่โดยมิชอบ และการละเว้นการปฏิบัติหน้าที่โดยมิชอบ ซึ่งทำให้ผู้อื่นเสียหาย",
    },
    {
      id: 100,
      question: "ผู้ที่เสนอให้สินบนแก่เจ้าพนักงานตามประมวลกฎหมายอาญา มีความผิดหรือไม่",
      choices: [
        "ไม่มีความผิด เพราะผู้เสนอไม่ใช่เจ้าพนักงาน",
        "มีความผิดตามมาตรา 144 ฐานให้สินบนเจ้าพนักงาน",
        "มีความผิดแต่ได้รับการยกเว้นโทษหากแจ้งความ",
        "มีความผิดเฉพาะเมื่อเจ้าพนักงานรับสินบนแล้วเท่านั้น",
      ],
      correct: 1,
      explanation: "มาตรา 144 กำหนดให้ผู้เสนอ ให้ หรือรับว่าจะให้ทรัพย์สินหรือประโยชน์แก่เจ้าพนักงาน มีความผิดฐานให้สินบน โทษจำคุกไม่เกิน 5 ปี หรือปรับ หรือทั้งจำทั้งปรับ",
    },
  ],
};

export const KP_MOCK_1: MockExam = {
  id: "kp-mock-1",
  title: "ข้อสอบจำลอง ก.พ. ชุดที่ 1",
  totalTime: 180,
  xpReward: 2000,
  rankReward: "ผู้ผ่านด่าน ก.พ. ระดับ 1",
  sections: [section1, section2, section3],
};
