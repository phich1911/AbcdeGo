// Contains the exam answer key — must never be imported from a "use client" file.
if (typeof window !== "undefined") {
  throw new Error("lib/exam-data/toeic/part6 must only be imported on the server");
}

import type { ExamQuestion } from "../kp-mock-1";

// TOEIC Part 6 — Text Completion. 4 short passages (email/memo/letter),
// 4 blanks each (16 total). Following the kp-mock-1.ts precedent: the full
// passage (with numbered blanks) is embedded in the first question of each
// group of 4, and the following 3 questions reference back to it instead of
// repeating the whole text.

const PASSAGE_1 =
  "To: All Staff\nFrom: Facilities Management\nSubject: Office Renovation Notice\n\n" +
  "We are pleased to announce that renovations to the third-floor break room will begin next Monday. " +
  "The work is (131) ______ to take about two weeks to complete. During this time, staff are asked to use the break room on the second floor instead. " +
  "We apologize for any (132) ______ this may cause and appreciate your patience. If you have any questions, please (133) ______ the facilities team directly. " +
  "A full schedule of the renovation (134) ______ will be posted on the notice board by Friday.";

const PASSAGE_2 =
  "Memo\nTo: Department Managers\nRe: Updated Expense Reporting Policy\n\n" +
  "Starting next month, all expense reports must be (135) ______ through the new online portal instead of paper forms. " +
  "Employees should attach digital copies of all receipts (136) ______ submitting a claim. Reports submitted without receipts will not be (137) ______. " +
  "The finance department will hold a short training session next week to explain the new system in (138) ______ detail.";

const PASSAGE_3 =
  "Dear Ms. Alvarez,\n\nThank you for your recent order. We regret to inform you that your shipment has been (139) ______ due to a delay at our supplier's warehouse. " +
  "We expect the items to arrive at our facility within three business days, (140) ______ which we will ship them to you immediately. " +
  "As an apology for the inconvenience, we would like to (141) ______ you a ten percent discount on your next purchase. " +
  "Please do not hesitate to contact us if you have any (142) ______ concerns.";

const PASSAGE_4 =
  "To: All Employees\nFrom: Human Resources\nSubject: Upcoming Training Session\n\n" +
  "All new employees are (143) ______ to attend a training session on workplace safety this Thursday at two p.m. " +
  "The session will cover emergency procedures, proper equipment use, and how to (144) ______ any hazards you notice. " +
  "Attendance will be recorded, so please make sure to sign in (145) ______ arriving. " +
  "Refreshments will be (146) ______ during the short break halfway through the session.";

export const TOEIC_PART6: ExamQuestion[] = [
  // Passage 1 — office renovation notice
  {
    id: 131, question: PASSAGE_1,
    choices: ["expect", "expected", "expecting", "expects"],
    correct: 1, explanation: "'is expected to' เป็นโครงสร้าง passive voice ที่ถูกต้อง",
  },
  {
    id: 132, question: "จากข้อความเดิม (ข้อ 131) เติมคำในช่องว่างข้อ 132: 'We apologize for any ______ this may cause'",
    choices: ["convenience", "inconvenience", "convenient", "inconveniently"],
    correct: 1, explanation: "ต้องใช้คำนาม inconvenience (ความไม่สะดวก) หลัง any",
  },
  {
    id: 133, question: "จากข้อความเดิม (ข้อ 131) เติมคำในช่องว่างข้อ 133: 'please ______ the facilities team directly'",
    choices: ["contact", "contacting", "contacted", "contacts"],
    correct: 0, explanation: "หลัง please ใช้กริยาช่องที่ 1 (imperative) → contact",
  },
  {
    id: 134, question: "จากข้อความเดิม (ข้อ 131) เติมคำในช่องว่างข้อ 134: 'A full schedule of the renovation ______ will be posted'",
    choices: ["work", "works", "worked", "working"],
    correct: 0, explanation: "'renovation work' เป็น compound noun หมายถึงงานปรับปรุง ใช้รูปเอกพจน์",
  },

  // Passage 2 — expense reporting policy memo
  {
    id: 135, question: PASSAGE_2,
    choices: ["submit", "submitted", "submitting", "submission"],
    correct: 1, explanation: "'must be submitted' เป็น passive voice ที่ถูกต้อง",
  },
  {
    id: 136, question: "จากข้อความเดิม (ข้อ 135) เติมคำในช่องว่างข้อ 136: 'attach digital copies of all receipts ______ submitting a claim'",
    choices: ["before", "after", "during", "since"],
    correct: 0, explanation: "ต้องแนบใบเสร็จ 'ก่อน' ยื่นคำร้อง → before",
  },
  {
    id: 137, question: "จากข้อความเดิม (ข้อ 135) เติมคำในช่องว่างข้อ 137: 'Reports submitted without receipts will not be ______'",
    choices: ["process", "processed", "processing", "processes"],
    correct: 1, explanation: "'will not be processed' เป็น passive voice ที่ถูกต้อง",
  },
  {
    id: 138, question: "จากข้อความเดิม (ข้อ 135) เติมคำในช่องว่างข้อ 138: 'explain the new system in ______ detail'",
    choices: ["far", "much", "more", "very"],
    correct: 2, explanation: "'in more detail' เป็นสำนวนหมายถึงอธิบายอย่างละเอียดมากขึ้น",
  },

  // Passage 3 — delayed shipment letter
  {
    id: 139, question: PASSAGE_3,
    choices: ["delay", "delayed", "delaying", "delays"],
    correct: 1, explanation: "'has been delayed' เป็น passive voice present perfect ที่ถูกต้อง",
  },
  {
    id: 140, question: "จากข้อความเดิม (ข้อ 139) เติมคำในช่องว่างข้อ 140: 'within three business days, ______ which we will ship them'",
    choices: ["after", "before", "during", "until"],
    correct: 0, explanation: "'after which' หมายถึงหลังจากนั้น",
  },
  {
    id: 141, question: "จากข้อความเดิม (ข้อ 139) เติมคำในช่องว่างข้อ 141: 'we would like to ______ you a ten percent discount'",
    choices: ["offer", "offering", "offered", "offers"],
    correct: 0, explanation: "หลัง 'would like to' ใช้กริยาช่องที่ 1 → offer",
  },
  {
    id: 142, question: "จากข้อความเดิม (ข้อ 139) เติมคำในช่องว่างข้อ 142: 'if you have any ______ concerns'",
    choices: ["farther", "further", "furthest", "furthermore"],
    correct: 1, explanation: "'further concerns' หมายถึงข้อกังวลเพิ่มเติม",
  },

  // Passage 4 — training session memo
  {
    id: 143, question: PASSAGE_4,
    choices: ["require", "required", "requiring", "requires"],
    correct: 1, explanation: "'are required to' เป็น passive voice ที่ถูกต้อง",
  },
  {
    id: 144, question: "จากข้อความเดิม (ข้อ 143) เติมคำในช่องว่างข้อ 144: 'how to ______ any hazards you notice'",
    choices: ["report", "reporting", "reported", "reports"],
    correct: 0, explanation: "หลัง 'how to' ใช้กริยาช่องที่ 1 → report",
  },
  {
    id: 145, question: "จากข้อความเดิม (ข้อ 143) เติมคำในช่องว่างข้อ 145: 'please make sure to sign in ______ arriving'",
    choices: ["upon", "onto", "into", "about"],
    correct: 0, explanation: "'upon arriving' หมายถึงทันทีที่มาถึง",
  },
  {
    id: 146, question: "จากข้อความเดิม (ข้อ 143) เติมคำในช่องว่างข้อ 146: 'Refreshments will be ______ during the short break'",
    choices: ["provide", "provided", "providing", "provides"],
    correct: 1, explanation: "'will be provided' เป็น passive voice ที่ถูกต้อง",
  },
];
