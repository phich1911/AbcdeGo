// Contains the exam answer key — must never be imported from a "use client" file.
if (typeof window !== "undefined") {
  throw new Error("lib/exam-data/toeic/part2 must only be imported on the server");
}

import type { ExamQuestion } from "../kp-mock-1";

// TOEIC Part 2 — Question-Response. Audio only (question/statement + 3
// spoken responses A/B/C); nothing is printed on the real test, so
// spokenChoices hides the choice text until the exam is over.

export const TOEIC_PART2: ExamQuestion[] = [
  {
    id: 7,
    question: "Listen to the question and choose the best response.",
    audioScript:
      "Where is the quarterly report? (A) It's on your desk. (B) About two hours ago. (C) Yes, I already read it.",
    choices: ["It's on your desk.", "About two hours ago.", "Yes, I already read it."],
    spokenChoices: true,
    correct: 0,
    explanation: "คำถามขึ้นต้นด้วย Where ต้องตอบสถานที่ → (A) It's on your desk.",
  },
  {
    id: 8,
    question: "Listen to the question and choose the best response.",
    audioScript:
      "Who's presenting at the meeting tomorrow? (A) At nine o'clock sharp. (B) Mr. Wilson from marketing. (C) In the main conference room.",
    choices: ["At nine o'clock sharp.", "Mr. Wilson from marketing.", "In the main conference room."],
    spokenChoices: true,
    correct: 1,
    explanation: "คำถามขึ้นต้นด้วย Who ต้องตอบชื่อคน → (B) Mr. Wilson from marketing.",
  },
  {
    id: 9,
    question: "Listen to the question and choose the best response.",
    audioScript:
      "Have you finished the budget proposal? (A) Not yet, I need another day. (B) It costs about five thousand dollars. (C) I proposed it last week.",
    choices: ["Not yet, I need another day.", "It costs about five thousand dollars.", "I proposed it last week."],
    spokenChoices: true,
    correct: 0,
    explanation: "คำถาม Yes/No ('Have you...') ตอบสถานะงานได้โดยตรง → (A) Not yet, I need another day.",
  },
  {
    id: 10,
    question: "Listen to the question and choose the best response.",
    audioScript:
      "Why was the shipment delayed? (A) It arrived this morning. (B) Because of a customs inspection. (C) The warehouse is nearby.",
    choices: ["It arrived this morning.", "Because of a customs inspection.", "The warehouse is nearby."],
    spokenChoices: true,
    correct: 1,
    explanation: "คำถามขึ้นต้นด้วย Why ต้องตอบเหตุผล → (B) Because of a customs inspection.",
  },
  {
    id: 11,
    question: "Listen to the question and choose the best response.",
    audioScript:
      "Would you like tea or coffee? (A) Coffee, please. (B) Yes, I would. (C) It's on the table.",
    choices: ["Coffee, please.", "Yes, I would.", "It's on the table."],
    spokenChoices: true,
    correct: 0,
    explanation: "เป็นคำถามให้เลือก (A or B) จึงต้องระบุตัวเลือก ไม่ตอบ Yes/No → (A) Coffee, please.",
  },
  {
    id: 12,
    question: "Listen to the question and choose the best response.",
    audioScript:
      "How long will the training session last? (A) About three hours. (B) In the training room. (C) Every Monday.",
    choices: ["About three hours.", "In the training room.", "Every Monday."],
    spokenChoices: true,
    correct: 0,
    explanation: "คำถาม How long ถามระยะเวลา → (A) About three hours.",
  },
  {
    id: 13,
    question: "Listen to the question and choose the best response.",
    audioScript:
      "Isn't the client meeting supposed to start at ten? (A) Yes, but it's been moved to eleven. (B) The client is from London. (C) I'll meet him at the airport.",
    choices: ["Yes, but it's been moved to eleven.", "The client is from London.", "I'll meet him at the airport."],
    spokenChoices: true,
    correct: 0,
    explanation: "คำถามปฏิเสธ (negative question) ตอบยืนยัน/แก้ไขข้อมูลตรง → (A).",
  },
  {
    id: 14,
    question: "Listen to the question and choose the best response.",
    audioScript:
      "Could you send me the invoice by Friday? (A) Sure, I'll email it today. (B) The invoice was ten dollars. (C) Friday is my day off.",
    choices: ["Sure, I'll email it today.", "The invoice was ten dollars.", "Friday is my day off."],
    spokenChoices: true,
    correct: 0,
    explanation: "เป็นคำขอร้อง (request) ตอบรับ/ปฏิเสธคำขอ → (A) Sure, I'll email it today.",
  },
  {
    id: 15,
    question: "Listen to the question and choose the best response.",
    audioScript:
      "What time does the flight depart? (A) From gate twelve. (B) At six thirty in the evening. (C) It's a two-hour flight.",
    choices: ["From gate twelve.", "At six thirty in the evening.", "It's a two-hour flight."],
    spokenChoices: true,
    correct: 1,
    explanation: "คำถาม What time ถามเวลา → (B) At six thirty in the evening.",
  },
  {
    id: 16,
    question: "Listen to the question and choose the best response.",
    audioScript:
      "Do you know where the nearest printer is? (A) It's down the hall, next to the copier. (B) I printed twenty copies. (C) Yes, I know him well.",
    choices: ["It's down the hall, next to the copier.", "I printed twenty copies.", "Yes, I know him well."],
    spokenChoices: true,
    correct: 0,
    explanation: "เป็นคำถามฝัง (embedded question) ถามสถานที่ → (A).",
  },
  {
    id: 17,
    question: "Listen to the question and choose the best response.",
    audioScript:
      "Should we reschedule the interview or keep the original time? (A) Let's keep it as planned. (B) The interview went well. (C) He scheduled it himself.",
    choices: ["Let's keep it as planned.", "The interview went well.", "He scheduled it himself."],
    spokenChoices: true,
    correct: 0,
    explanation: "คำถามให้เลือกระหว่างสองทางเลือก ต้องระบุทางเลือกที่ต้องการ → (A).",
  },
  {
    id: 18,
    question: "Listen to the question and choose the best response.",
    audioScript:
      "The copier is out of order again, isn't it? (A) Yes, someone's calling a technician. (B) It's a black and white copier. (C) I ordered new paper.",
    choices: ["Yes, someone's calling a technician.", "It's a black and white copier.", "I ordered new paper."],
    spokenChoices: true,
    correct: 0,
    explanation: "Tag question ยืนยันสถานการณ์ ตอบรับตรงประเด็น → (A).",
  },
  {
    id: 19,
    question: "Listen to the question and choose the best response.",
    audioScript:
      "Which department handles customer complaints? (A) Customer service, on the third floor. (B) They complained about the price. (C) About once a week.",
    choices: ["Customer service, on the third floor.", "They complained about the price.", "About once a week."],
    spokenChoices: true,
    correct: 0,
    explanation: "คำถาม Which department ถามหน่วยงาน → (A).",
  },
  {
    id: 20,
    question: "Listen to the question and choose the best response.",
    audioScript:
      "Why don't we take a short break before continuing? (A) That sounds like a good idea. (B) We broke the record. (C) The meeting is short.",
    choices: ["That sounds like a good idea.", "We broke the record.", "The meeting is short."],
    spokenChoices: true,
    correct: 0,
    explanation: "'Why don't we...' เป็นข้อเสนอแนะ ตอบรับ/ปฏิเสธข้อเสนอ → (A).",
  },
  {
    id: 21,
    question: "Listen to the question and choose the best response.",
    audioScript:
      "How much does the annual subscription cost? (A) It renews every January. (B) About two hundred dollars. (C) I subscribed last year.",
    choices: ["It renews every January.", "About two hundred dollars.", "I subscribed last year."],
    spokenChoices: true,
    correct: 1,
    explanation: "คำถาม How much ถามราคา → (B).",
  },
  {
    id: 22,
    question: "Listen to the question and choose the best response.",
    audioScript:
      "You submitted the expense report already, right? (A) No, I'll do it this afternoon. (B) The report is five pages long. (C) I expensed the taxi fare.",
    choices: ["No, I'll do it this afternoon.", "The report is five pages long.", "I expensed the taxi fare."],
    spokenChoices: true,
    correct: 0,
    explanation: "คำถามยืนยัน ตอบสถานะที่แท้จริงตรงประเด็น → (A).",
  },
  {
    id: 23,
    question: "Listen to the question and choose the best response.",
    audioScript:
      "Where should I park for the conference? (A) There's a lot behind the building. (B) The conference starts at nine. (C) I parked my car already.",
    choices: ["There's a lot behind the building.", "The conference starts at nine.", "I parked my car already."],
    spokenChoices: true,
    correct: 0,
    explanation: "คำถาม Where ถามสถานที่จอดรถ → (A).",
  },
  {
    id: 24,
    question: "Listen to the question and choose the best response.",
    audioScript:
      "Did you receive my email about the schedule change? (A) Yes, I saw it this morning. (B) I changed my schedule last year. (C) The email server is down.",
    choices: ["Yes, I saw it this morning.", "I changed my schedule last year.", "The email server is down."],
    spokenChoices: true,
    correct: 0,
    explanation: "คำถาม Yes/No ตอบยืนยันตรงประเด็น → (A).",
  },
  {
    id: 25,
    question: "Listen to the question and choose the best response.",
    audioScript:
      "Who approved this purchase order? (A) It was approved yesterday. (B) The finance manager did. (C) I ordered two units.",
    choices: ["It was approved yesterday.", "The finance manager did.", "I ordered two units."],
    spokenChoices: true,
    correct: 1,
    explanation: "คำถาม Who ถามผู้อนุมัติ → (B) The finance manager did.",
  },
  {
    id: 26,
    question: "Listen to the question and choose the best response.",
    audioScript:
      "Is the new office on the fifth floor or the sixth? (A) It's on the sixth floor. (B) The office is quite large. (C) It opened last month.",
    choices: ["It's on the sixth floor.", "The office is quite large.", "It opened last month."],
    spokenChoices: true,
    correct: 0,
    explanation: "คำถามให้เลือกชั้น ต้องระบุคำตอบตรง → (A).",
  },
  {
    id: 27,
    question: "Listen to the question and choose the best response.",
    audioScript:
      "How do I access the shared drive? (A) You'll need a password from IT. (B) The drive is nearly full. (C) I accessed it this morning.",
    choices: ["You'll need a password from IT.", "The drive is nearly full.", "I accessed it this morning."],
    spokenChoices: true,
    correct: 0,
    explanation: "คำถาม How ถามวิธีการ → (A).",
  },
  {
    id: 28,
    question: "Listen to the question and choose the best response.",
    audioScript:
      "Wasn't the deadline extended to next Friday? (A) Yes, the manager confirmed it. (B) The deadline is very strict. (C) I extended my vacation.",
    choices: ["Yes, the manager confirmed it.", "The deadline is very strict.", "I extended my vacation."],
    spokenChoices: true,
    correct: 0,
    explanation: "คำถามปฏิเสธยืนยันข้อเท็จจริง ตอบยืนยันตรงประเด็น → (A).",
  },
  {
    id: 29,
    question: "Listen to the question and choose the best response.",
    audioScript:
      "What's the best way to contact the supplier? (A) By phone is usually fastest. (B) The supplier is overseas. (C) I contacted three suppliers.",
    choices: ["By phone is usually fastest.", "The supplier is overseas.", "I contacted three suppliers."],
    spokenChoices: true,
    correct: 0,
    explanation: "คำถาม What's the best way ถามวิธีการติดต่อ → (A).",
  },
  {
    id: 30,
    question: "Listen to the question and choose the best response.",
    audioScript:
      "Can you help me set up the projector? (A) Sure, give me a minute. (B) The projector is broken. (C) I set it up yesterday.",
    choices: ["Sure, give me a minute.", "The projector is broken.", "I set it up yesterday."],
    spokenChoices: true,
    correct: 0,
    explanation: "คำขอร้อง ('Can you help...') ตอบรับ/ปฏิเสธ → (A).",
  },
  {
    id: 31,
    question: "Listen to the question and choose the best response.",
    audioScript:
      "When is the next staff meeting scheduled? (A) In the main office. (B) Next Wednesday at ten. (C) The staff meeting was helpful.",
    choices: ["In the main office.", "Next Wednesday at ten.", "The staff meeting was helpful."],
    spokenChoices: true,
    correct: 1,
    explanation: "คำถาม When ถามวันเวลา → (B).",
  },
];
