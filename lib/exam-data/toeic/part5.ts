// Contains the exam answer key — must never be imported from a "use client" file.
if (typeof window !== "undefined") {
  throw new Error("lib/exam-data/toeic/part5 must only be imported on the server");
}

import type { ExamQuestion } from "../kp-mock-1";

// TOEIC Part 5 — Incomplete Sentences. Pure text grammar/vocabulary
// gap-fills, no audio/image needed.

export const TOEIC_PART5: ExamQuestion[] = [
  {
    id: 101, question: "The new employee handbook ______ all company policies in detail.",
    choices: ["explain", "explains", "explaining", "to explain"],
    correct: 1, explanation: "ประธานเอกพจน์ (handbook) ใช้กริยาเติม -s ในปัจจุบันกาล → explains",
  },
  {
    id: 102, question: "Please make sure the report is submitted ______ Friday afternoon.",
    choices: ["until", "by", "since", "during"],
    correct: 1, explanation: "'by + เวลา' หมายถึงภายในกำหนดเวลานั้น",
  },
  {
    id: 103, question: "The marketing team worked ______ to finish the campaign before the deadline.",
    choices: ["efficient", "efficiency", "efficiently", "efficiencies"],
    correct: 2, explanation: "ต้องใช้ adverb ขยายกริยา worked → efficiently",
  },
  {
    id: 104, question: "Neither the manager nor the assistants ______ available for the call yesterday.",
    choices: ["was", "were", "is", "has been"],
    correct: 1, explanation: "'neither...nor' กริยาต้องสอดคล้องกับคำนามที่อยู่ใกล้ที่สุด (assistants, พหูพจน์) → were",
  },
  {
    id: 105, question: "The company plans to expand its operations ______ Southeast Asia next year.",
    choices: ["into", "onto", "at", "up"],
    correct: 0, explanation: "'expand into' เป็น collocation ที่ใช้บ่อยเมื่อพูดถึงการขยายกิจการเข้าสู่ตลาดใหม่",
  },
  {
    id: 106, question: "All visitors must sign in at the front desk ______ entering the building.",
    choices: ["before", "despite", "although", "unless"],
    correct: 0, explanation: "ต้องลงชื่อ 'ก่อน' เข้าอาคาร → before",
  },
  {
    id: 107, question: "The consultant gave us several ______ suggestions for improving productivity.",
    choices: ["value", "valued", "valuable", "valuably"],
    correct: 2, explanation: "ต้องใช้ adjective ขยายคำนาม suggestions → valuable",
  },
  {
    id: 108, question: "If the shipment ______ on time, we would not have missed the deadline.",
    choices: ["arrives", "arrived", "had arrived", "will arrive"],
    correct: 2, explanation: "Conditional type 3 (เหตุการณ์ในอดีตที่ไม่เป็นจริง) ใช้ had + V3 ในประโยคเงื่อนไข",
  },
  {
    id: 109, question: "The board of directors ______ meet again next Tuesday to finalize the budget.",
    choices: ["is", "will", "has", "does"],
    correct: 1, explanation: "ต้องใช้ 'will' เพื่อบอกเหตุการณ์ในอนาคต + กริยาแท้ (meet)",
  },
  {
    id: 110, question: "Employees are required to complete the safety training ______ their first week.",
    choices: ["during", "while", "for", "since"],
    correct: 0, explanation: "'during + noun phrase' ใช้บอกช่วงเวลา",
  },
  {
    id: 111, question: "The new software update improves both speed ______ security.",
    choices: ["but", "or", "and", "so"],
    correct: 2, explanation: "'both A and B' เป็นโครงสร้างคู่ที่ใช้เชื่อมสองสิ่ง",
  },
  {
    id: 112, question: "Despite the ______ weather, the outdoor event proceeded as planned.",
    choices: ["rain", "rainy", "rains", "raining"],
    correct: 1, explanation: "ต้องใช้ adjective ขยายคำนาม weather → rainy",
  },
  {
    id: 113, question: "The manager asked her assistant to ______ the meeting minutes to all attendees.",
    choices: ["distribute", "distributed", "distribution", "distributing"],
    correct: 0, explanation: "หลัง 'to' (infinitive) ต้องใช้กริยาช่องที่ 1 → distribute",
  },
  {
    id: 114, question: "The client was impressed ______ the team's attention to detail.",
    choices: ["of", "with", "for", "about"],
    correct: 1, explanation: "'impressed with/by' เป็น collocation ที่ถูกต้อง",
  },
  {
    id: 115, question: "______ the budget cuts, the department managed to complete the project successfully.",
    choices: ["Because of", "Despite", "Due to", "As a result of"],
    correct: 1, explanation: "'Despite' ตามด้วย noun phrase แสดงความขัดแย้ง (ทั้งที่มีการตัดงบ แต่ก็ยังสำเร็จ)",
  },
  {
    id: 116, question: "The new policy will take ______ starting next month.",
    choices: ["effect", "affect", "effective", "effecting"],
    correct: 0, explanation: "'take effect' เป็นสำนวนหมายถึงเริ่มมีผลบังคับใช้",
  },
  {
    id: 117, question: "Each department head is responsible ______ submitting their own budget report.",
    choices: ["of", "for", "to", "with"],
    correct: 1, explanation: "'responsible for' เป็น collocation ที่ถูกต้อง",
  },
  {
    id: 118, question: "The survey results indicate that customer satisfaction has ______ significantly this year.",
    choices: ["improve", "improved", "improving", "improvement"],
    correct: 1, explanation: "ต้องใช้ present perfect tense (has + V3) → improved",
  },
  {
    id: 119, question: "We need to find a more ______ solution to reduce shipping costs.",
    choices: ["cost-effect", "cost-effective", "cost-effectively", "cost-effectiveness"],
    correct: 1, explanation: "ต้องใช้ adjective ขยายคำนาม solution → cost-effective",
  },
  {
    id: 120, question: "The seminar has been postponed ______ further notice.",
    choices: ["until", "since", "for", "during"],
    correct: 0, explanation: "'until further notice' เป็นสำนวนหมายถึงจนกว่าจะมีประกาศเพิ่มเติม",
  },
  {
    id: 121, question: "The technician recommended replacing the part ______ than repairing it.",
    choices: ["rather", "instead", "other", "more"],
    correct: 0, explanation: "'rather than' ใช้เปรียบเทียบสองทางเลือก",
  },
  {
    id: 122, question: "By the time the manager arrives, the presentation ______ already.",
    choices: ["will finish", "will have finished", "finishes", "is finishing"],
    correct: 1, explanation: "Future perfect tense ใช้บอกเหตุการณ์ที่จะเสร็จก่อนอีกเหตุการณ์ในอนาคต",
  },
  {
    id: 123, question: "The company's revenue grew ______ over the past three years.",
    choices: ["steady", "steadily", "steadiness", "steadier"],
    correct: 1, explanation: "ต้องใช้ adverb ขยายกริยา grew → steadily",
  },
  {
    id: 124, question: "This contract is legally binding ______ both parties sign it.",
    choices: ["unless", "once", "although", "whereas"],
    correct: 1, explanation: "'once' หมายถึงทันทีที่เกิดเหตุการณ์นั้น (เมื่อทั้งสองฝ่ายเซ็นแล้ว)",
  },
  {
    id: 125, question: "The finance department is currently ______ the annual report.",
    choices: ["review", "reviewed", "reviewing", "to review"],
    correct: 2, explanation: "Present continuous tense (is + V-ing) → reviewing",
  },
  {
    id: 126, question: "The proposal was rejected ______ its high cost.",
    choices: ["because", "because of", "so that", "even though"],
    correct: 1, explanation: "'because of + noun phrase' ใช้บอกเหตุผล",
  },
  {
    id: 127, question: "All applicants must submit their resumes ______ the online portal.",
    choices: ["through", "along", "beside", "toward"],
    correct: 0, explanation: "'through the portal' หมายถึงผ่านช่องทางออนไลน์",
  },
  {
    id: 128, question: "The CEO's speech was both informative ______ inspiring.",
    choices: ["and", "but", "or", "yet"],
    correct: 0, explanation: "'both...and' เป็นโครงสร้างคู่",
  },
  {
    id: 129, question: "The negotiations are expected to ______ several more weeks.",
    choices: ["last", "lasting", "lasted", "lastly"],
    correct: 0, explanation: "หลัง 'to' (infinitive) ต้องใช้กริยาช่องที่ 1 → last",
  },
  {
    id: 130, question: "The IT department upgraded the system ______ improve overall performance.",
    choices: ["so", "in order to", "so as", "for"],
    correct: 1, explanation: "'in order to + V1' ใช้บอกจุดประสงค์",
  },
];
