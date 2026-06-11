export type Course = {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  totalLessons: number;
  xpReward: number;
  tag: string;
};

export type Lesson = {
  id: string;
  courseId: string;
  title: string;
  order: number;
  xpReward: number;
  steps: Step[];
};

export type Step =
  | { type: "info"; content: string; title: string }
  | { type: "quiz"; question: string; choices: string[]; correct: number; explanation: string }
  | { type: "fill"; question: string; answer: string; hint: string };

export const COURSES: Course[] = [
  {
    id: "math-101",
    title: "คณิตศาสตร์พื้นฐาน",
    description: "จากตัวเลขสู่พีชคณิต เรียนรู้ทีละขั้น",
    icon: "📐",
    color: "#7c3aed",
    totalLessons: 3,
    xpReward: 300,
    tag: "คณิตศาสตร์",
  },
  {
    id: "eng-101",
    title: "English Essentials",
    description: "Vocabulary, grammar, and everyday conversations",
    icon: "🌏",
    color: "#0891b2",
    totalLessons: 3,
    xpReward: 300,
    tag: "ภาษาอังกฤษ",
  },
  {
    id: "code-101",
    title: "Coding for Beginners",
    description: "เขียนโปรแกรมครั้งแรกไม่ต้องกลัว",
    icon: "💻",
    color: "#059669",
    totalLessons: 3,
    xpReward: 300,
    tag: "โปรแกรมมิ่ง",
  },
];

export const LESSONS: Lesson[] = [
  // Math course
  {
    id: "math-101-1",
    courseId: "math-101",
    title: "การบวกและลบ",
    order: 1,
    xpReward: 50,
    steps: [
      {
        type: "info",
        title: "การบวก คืออะไร?",
        content: "การบวก คือการรวมจำนวนสองจำนวนเข้าด้วยกัน เช่น 3 + 4 = 7 เราใช้เครื่องหมาย + เพื่อบวก ลองนึกถึงการนับลูกแอปเปิล 🍎🍎🍎 + 🍎🍎🍎🍎 = 7 ลูก",
      },
      {
        type: "quiz",
        question: "5 + 3 = ?",
        choices: ["6", "7", "8", "9"],
        correct: 2,
        explanation: "5 + 3 = 8 นับต่อจาก 5 ไปอีก 3 ขั้นได้ 8",
      },
      {
        type: "fill",
        question: "10 - 4 = ___",
        answer: "6",
        hint: "ลบ 4 ออกจาก 10",
      },
    ],
  },
  {
    id: "math-101-2",
    courseId: "math-101",
    title: "การคูณ",
    order: 2,
    xpReward: 75,
    steps: [
      {
        type: "info",
        title: "การคูณ = การบวกซ้ำ",
        content: "การคูณคือการบวกซ้ำ ๆ เช่น 3 × 4 = 3 + 3 + 3 + 3 = 12 คิดง่าย ๆ ว่ามี 4 กลุ่ม กลุ่มละ 3 ชิ้น รวมกันได้ 12 ชิ้น",
      },
      {
        type: "quiz",
        question: "6 × 7 = ?",
        choices: ["36", "42", "48", "54"],
        correct: 1,
        explanation: "6 × 7 = 42 จำตารางสูตรคูณ: 6×7 = 42",
      },
      {
        type: "fill",
        question: "9 × 9 = ___",
        answer: "81",
        hint: "ลองใช้ตารางสูตรคูณแม่ 9",
      },
    ],
  },
  {
    id: "math-101-3",
    courseId: "math-101",
    title: "เศษส่วนเบื้องต้น",
    order: 3,
    xpReward: 100,
    steps: [
      {
        type: "info",
        title: "เศษส่วนคืออะไร?",
        content: "เศษส่วนแทนส่วนหนึ่งของทั้งหมด เช่น 1/2 หมายถึงครึ่งหนึ่ง ถ้าเราแบ่งพิซซ่า 🍕 ออกเป็น 4 ชิ้น แล้วกิน 1 ชิ้น เราได้กิน 1/4 ของพิซซ่า",
      },
      {
        type: "quiz",
        question: "1/2 + 1/2 = ?",
        choices: ["1/4", "2/4", "1", "2"],
        correct: 2,
        explanation: "1/2 + 1/2 = 2/2 = 1 เต็ม เหมือนกับครึ่งบวกครึ่งได้หนึ่งเต็ม",
      },
      {
        type: "fill",
        question: "3/4 ของ 8 = ___",
        answer: "6",
        hint: "8 ÷ 4 × 3 = ?",
      },
    ],
  },
  // English course
  {
    id: "eng-101-1",
    courseId: "eng-101",
    title: "Greetings & Introductions",
    order: 1,
    xpReward: 50,
    steps: [
      {
        type: "info",
        title: "How to Greet Someone",
        content: "Common greetings in English:\n• Hello / Hi — สวัสดี\n• Good morning — สวัสดีตอนเช้า\n• Good afternoon — สวัสดีตอนบ่าย\n• Good evening — สวัสดีตอนเย็น\n• Nice to meet you — ยินดีที่ได้รู้จัก",
      },
      {
        type: "quiz",
        question: "Which is the most formal greeting?",
        choices: ["Hey!", "Yo!", "Good morning.", "What's up?"],
        correct: 2,
        explanation: "'Good morning' is a formal, polite greeting suitable for professional settings.",
      },
      {
        type: "fill",
        question: "Complete: 'Nice to ___ you!'",
        answer: "meet",
        hint: "It rhymes with 'greet'",
      },
    ],
  },
  {
    id: "eng-101-2",
    courseId: "eng-101",
    title: "Present Simple Tense",
    order: 2,
    xpReward: 75,
    steps: [
      {
        type: "info",
        title: "Present Simple — ปัจจุบันกาลสามัญ",
        content: "ใช้บอกสิ่งที่เกิดขึ้นเป็นประจำหรือเป็นความจริงทั่วไป\n\nโครงสร้าง: Subject + Verb (base form)\n• I eat rice every day.\n• She works at a hospital.\n• They play football on weekends.",
      },
      {
        type: "quiz",
        question: "Choose the correct sentence:",
        choices: [
          "He go to school every day.",
          "He goes to school every day.",
          "He going to school every day.",
          "He gone to school every day.",
        ],
        correct: 1,
        explanation: "With he/she/it, add -s or -es to the verb: go → goes",
      },
      {
        type: "fill",
        question: "She ___ (study) English every night.",
        answer: "studies",
        hint: "study + es (เปลี่ยน y → ie แล้วเติม s)",
      },
    ],
  },
  {
    id: "eng-101-3",
    courseId: "eng-101",
    title: "Common Vocabulary",
    order: 3,
    xpReward: 100,
    steps: [
      {
        type: "info",
        title: "Essential Everyday Words",
        content: "คำศัพท์ที่ใช้บ่อยในชีวิตประจำวัน:\n• Busy — ยุ่ง\n• Important — สำคัญ\n• Remember — จำ\n• Different — แตกต่าง\n• Together — ด้วยกัน",
      },
      {
        type: "quiz",
        question: "What does 'important' mean in Thai?",
        choices: ["น่าสนใจ", "สำคัญ", "ยุ่ง", "แตกต่าง"],
        correct: 1,
        explanation: "'Important' แปลว่า สำคัญ เช่น 'This is very important.'",
      },
      {
        type: "fill",
        question: "Let's do this ___! (ด้วยกัน)",
        answer: "together",
        hint: "starts with 't'",
      },
    ],
  },
  // Coding course
  {
    id: "code-101-1",
    courseId: "code-101",
    title: "โปรแกรมคืออะไร?",
    order: 1,
    xpReward: 50,
    steps: [
      {
        type: "info",
        title: "โปรแกรม = ชุดคำสั่ง",
        content: "โปรแกรมคือชุดคำสั่งที่บอกให้คอมพิวเตอร์ทำงาน เหมือนสูตรทำอาหาร 🍳 ที่บอกทีละขั้นตอน\n\nภาษาโปรแกรมที่นิยม:\n• Python — เริ่มต้นง่าย\n• JavaScript — ทำเว็บได้\n• Java — ใช้ในองค์กร",
      },
      {
        type: "quiz",
        question: "ภาษาโปรแกรมใดที่เหมาะสำหรับผู้เริ่มต้นมากที่สุด?",
        choices: ["Assembly", "C++", "Python", "Rust"],
        correct: 2,
        explanation: "Python มี syntax ที่อ่านง่าย ใกล้เคียงภาษาอังกฤษ เหมาะสำหรับผู้เริ่มต้น",
      },
      {
        type: "fill",
        question: "print('___') — พิมพ์คำว่า Hello",
        answer: "Hello",
        hint: "คำทักทายภาษาอังกฤษ",
      },
    ],
  },
  {
    id: "code-101-2",
    courseId: "code-101",
    title: "ตัวแปร (Variables)",
    order: 2,
    xpReward: 75,
    steps: [
      {
        type: "info",
        title: "ตัวแปรคือกล่องเก็บข้อมูล",
        content: "ตัวแปรเปรียบเหมือนกล่องที่มีป้ายชื่อ เราสามารถเก็บข้อมูลไว้ในนั้นได้\n\nตัวอย่างใน Python:\n• name = 'AbcdeGo'\n• age = 20\n• score = 9.5\n\nแต่ละบรรทัดสร้างกล่องใหม่ 1 ใบ",
      },
      {
        type: "quiz",
        question: "x = 5\ny = 3\nprint(x + y)\nจะแสดงผลอะไร?",
        choices: ["53", "8", "x+y", "Error"],
        correct: 1,
        explanation: "x = 5 และ y = 3 ดังนั้น x + y = 8 Python จะแสดงผล 8",
      },
      {
        type: "fill",
        question: "___ = 'AbcdeGo'  (ตั้งชื่อตัวแปรว่า name)",
        answer: "name",
        hint: "คำที่แปลว่า 'ชื่อ' ในภาษาอังกฤษ",
      },
    ],
  },
  {
    id: "code-101-3",
    courseId: "code-101",
    title: "เงื่อนไข if/else",
    order: 3,
    xpReward: 100,
    steps: [
      {
        type: "info",
        title: "if/else — การตัดสินใจ",
        content: "if/else ทำให้โปรแกรมตัดสินใจได้ เหมือนคนตัดสินใจในชีวิตประจำวัน\n\nตัวอย่าง:\n```\nif score >= 50:\n    print('ผ่าน! 🎉')\nelse:\n    print('ยังไม่ผ่าน ลองใหม่!')\n```",
      },
      {
        type: "quiz",
        question: "score = 75\nif score >= 50:\n    print('Pass')\nelse:\n    print('Fail')\nจะแสดงผลว่าอะไร?",
        choices: ["Fail", "Pass", "75", "Error"],
        correct: 1,
        explanation: "score = 75 ซึ่ง >= 50 เป็นจริง ดังนั้นจะเข้า if แสดงผล 'Pass'",
      },
      {
        type: "fill",
        question: "if age ___ 18:  (ถ้าอายุมากกว่าหรือเท่ากับ 18)",
        answer: ">=",
        hint: "เครื่องหมาย 'มากกว่าหรือเท่ากับ'",
      },
    ],
  },
];

export function getCourse(id: string): Course | undefined {
  return COURSES.find((c) => c.id === id);
}

export function getLessonsForCourse(courseId: string): Lesson[] {
  return LESSONS.filter((l) => l.courseId === courseId).sort((a, b) => a.order - b.order);
}

export function getLesson(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}
