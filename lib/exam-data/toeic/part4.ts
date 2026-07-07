// Contains the exam answer key — must never be imported from a "use client" file.
if (typeof window !== "undefined") {
  throw new Error("lib/exam-data/toeic/part4 must only be imported on the server");
}

import type { ExamQuestion } from "../kp-mock-1";

// TOEIC Part 4 — Talks. 10 single-speaker talks, 3 questions each (30 total).
// Same duplication-per-question pattern as Part 3.

const TALK_1 =
  "Good morning, this is your weather update for the region. Today will be mostly sunny with a high of twenty-eight degrees. " +
  "However, we expect scattered thunderstorms to move in by early evening, so if you're planning outdoor activities, it's best to finish before five p.m. " +
  "Tomorrow will be cooler with clear skies throughout the day.";

const TALK_2 =
  "Attention passengers, Flight 205 to Osaka is now boarding at gate fourteen. " +
  "Passengers seated in rows one through fifteen may board at this time. All other passengers, please remain seated until your row is called. " +
  "We remind all passengers that boarding will close fifteen minutes before departure.";

const TALK_3 =
  "Hi, this is Daniel from Bright Path Consulting returning your call about the marketing proposal. " +
  "I've reviewed the document you sent and I think it looks great overall, though I have a few suggestions about the budget section. " +
  "Could you give me a call back this afternoon so we can go over the details before the client meeting tomorrow?";

const TALK_4 =
  "Attention shoppers, for the next thirty minutes only, all winter clothing is fifty percent off in the second-floor department. " +
  "This includes coats, sweaters, and boots. Please see a sales associate if you need help finding your size. " +
  "This sale ends at six p.m. sharp, so don't miss out.";

const TALK_5 =
  "Welcome to the city history museum. Our guided tour will begin in the main lobby in about ten minutes. " +
  "The tour lasts approximately ninety minutes and includes the ancient artifacts room, the modern art wing, and the rooftop garden. " +
  "Please note that photography is allowed everywhere except in the ancient artifacts room.";

const TALK_6 =
  "Before we begin today's shift, I want to remind everyone about the new safety procedure for the loading dock. " +
  "All workers must wear a hard hat and safety vest when operating near the forklifts. " +
  "If you notice any equipment malfunctioning, report it to your supervisor immediately instead of trying to fix it yourself.";

const TALK_7 =
  "Are you tired of slow internet at home? Switch to SpeedNet today and get double the speed at the same price. " +
  "For a limited time, new customers who sign up this month will also receive a free router installation. " +
  "Visit our website or call our customer service line to learn more.";

const TALK_8 =
  "Good afternoon, everyone, and welcome to the annual business leadership conference. " +
  "We have an exciting lineup of speakers today, starting with a keynote address on innovation in the workplace. " +
  "Please remember to pick up your name badge and schedule at the registration desk if you haven't already.";

const TALK_9 =
  "This is an important announcement regarding our portable blender model X200. " +
  "We have discovered a defect in the power cord that may pose a safety risk. " +
  "If you own this model, please stop using it immediately and contact our customer support team for a free replacement.";

const TALK_10 =
  "Welcome to today's workshop on effective time management. Before we start the first exercise, please make sure you have a notebook and pen ready. " +
  "We'll begin with a short group discussion, followed by an individual planning activity. " +
  "There will be a fifteen-minute break halfway through the session.";

export const TOEIC_PART4: ExamQuestion[] = [
  // Talk 1 — weather report
  {
    id: 71, question: "What is the weather like today, according to the report?", audioScript: TALK_1,
    choices: ["Rainy all day", "Mostly sunny with storms later", "Snowing", "Cloudy and cold"],
    correct: 1, explanation: "วันนี้แดดจัดเป็นส่วนใหญ่ แต่จะมีพายุฝนฟ้าคะนองช่วงเย็น",
  },
  {
    id: 72, question: "What does the speaker suggest people do?", audioScript: TALK_1,
    choices: ["Cancel outdoor plans entirely", "Finish outdoor activities before five p.m.", "Bring an umbrella all day", "Wait until tomorrow"],
    correct: 1, explanation: "ผู้พูดแนะนำให้ทำกิจกรรมกลางแจ้งให้เสร็จก่อนห้าโมงเย็น",
  },
  {
    id: 73, question: "How will the weather be tomorrow?", audioScript: TALK_1,
    choices: ["Warmer and rainy", "Cooler with clear skies", "The same as today", "Very windy"],
    correct: 1, explanation: "พรุ่งนี้อากาศจะเย็นลงและท้องฟ้าแจ่มใสตลอดวัน",
  },

  // Talk 2 — airport boarding announcement
  {
    id: 74, question: "Where is this announcement most likely being made?", audioScript: TALK_2,
    choices: ["At a train station", "At an airport", "At a bus terminal", "At a hotel"],
    correct: 1, explanation: "เป็นประกาศเรียกผู้โดยสารขึ้นเครื่องที่ประตูขึ้นเครื่อง",
  },
  {
    id: 75, question: "Who may board the plane first?", audioScript: TALK_2,
    choices: ["Passengers in rows one through fifteen", "All passengers at once", "Passengers with children", "First class passengers only"],
    correct: 0, explanation: "ผู้โดยสารแถวที่หนึ่งถึงสิบห้าขึ้นเครื่องได้ก่อน",
  },
  {
    id: 76, question: "When will boarding close?", audioScript: TALK_2,
    choices: ["Right at departure time", "Fifteen minutes before departure", "One hour before departure", "It never closes"],
    correct: 1, explanation: "การขึ้นเครื่องจะปิดก่อนเวลาบินสิบห้านาที",
  },

  // Talk 3 — voicemail
  {
    id: 77, question: "Why is Daniel calling?", audioScript: TALK_3,
    choices: ["To cancel a meeting", "To discuss a marketing proposal", "To request a refund", "To schedule an interview"],
    correct: 1, explanation: "แดเนียลโทรกลับเพื่อพูดคุยเกี่ยวกับข้อเสนอด้านการตลาด",
  },
  {
    id: 78, question: "What part of the proposal does Daniel have concerns about?", audioScript: TALK_3,
    choices: ["The timeline", "The budget section", "The design", "The client list"],
    correct: 1, explanation: "เขามีข้อเสนอแนะเกี่ยวกับส่วนงบประมาณ",
  },
  {
    id: 79, question: "What does Daniel ask the listener to do?", audioScript: TALK_3,
    choices: ["Send a new proposal", "Call him back this afternoon", "Meet him tomorrow morning", "Email the client directly"],
    correct: 1, explanation: "เขาขอให้โทรกลับหาเขาในช่วงบ่ายวันนี้",
  },

  // Talk 4 — store sale announcement
  {
    id: 80, question: "What is on sale?", audioScript: TALK_4,
    choices: ["Electronics", "Winter clothing", "Kitchenware", "Furniture"],
    correct: 1, explanation: "เสื้อผ้าฤดูหนาวลดราคาห้าสิบเปอร์เซ็นต์",
  },
  {
    id: 81, question: "How long will the sale last?", audioScript: TALK_4,
    choices: ["All day", "The next thirty minutes", "One week", "Until tomorrow"],
    correct: 1, explanation: "โปรโมชั่นนี้มีผลเพียงสามสิบนาทีเท่านั้น",
  },
  {
    id: 82, question: "What time does the sale end?", audioScript: TALK_4,
    choices: ["Five p.m.", "Six p.m.", "Seven p.m.", "Midnight"],
    correct: 1, explanation: "โปรโมชั่นสิ้นสุดตรงเวลาหกโมงเย็น",
  },

  // Talk 5 — museum tour
  {
    id: 83, question: "Where will the tour begin?", audioScript: TALK_5,
    choices: ["In the rooftop garden", "In the main lobby", "In the art wing", "At the front entrance"],
    correct: 1, explanation: "ทัวร์จะเริ่มต้นที่ล็อบบี้หลัก",
  },
  {
    id: 84, question: "How long does the tour last?", audioScript: TALK_5,
    choices: ["Thirty minutes", "Sixty minutes", "About ninety minutes", "Two full days"],
    correct: 2, explanation: "ทัวร์ใช้เวลาประมาณเก้าสิบนาที",
  },
  {
    id: 85, question: "Where is photography not allowed?", audioScript: TALK_5,
    choices: ["The rooftop garden", "The modern art wing", "The ancient artifacts room", "The main lobby"],
    correct: 2, explanation: "ห้ามถ่ายภาพเฉพาะในห้องโบราณวัตถุ",
  },

  // Talk 6 — safety briefing
  {
    id: 86, question: "What is this talk mainly about?", audioScript: TALK_6,
    choices: ["A new employee benefit", "A safety procedure at the loading dock", "A change in work hours", "A new product line"],
    correct: 1, explanation: "เป็นการชี้แจงขั้นตอนความปลอดภัยใหม่ที่ท่าขนถ่ายสินค้า",
  },
  {
    id: 87, question: "What must workers wear near the forklifts?", audioScript: TALK_6,
    choices: ["Gloves only", "A hard hat and safety vest", "A uniform", "Safety goggles"],
    correct: 1, explanation: "ต้องสวมหมวกนิรภัยและเสื้อกั๊กสะท้อนแสง",
  },
  {
    id: 88, question: "What should workers do if they notice a malfunction?", audioScript: TALK_6,
    choices: ["Fix it themselves", "Ignore it", "Report it to their supervisor", "Turn off all equipment"],
    correct: 2, explanation: "ต้องรายงานให้หัวหน้างานทราบทันที ห้ามซ่อมเอง",
  },

  // Talk 7 — radio ad
  {
    id: 89, question: "What product or service is being advertised?", audioScript: TALK_7,
    choices: ["A mobile phone plan", "An internet service", "A streaming service", "A home security system"],
    correct: 1, explanation: "เป็นโฆษณาบริการอินเทอร์เน็ตความเร็วสูง",
  },
  {
    id: 90, question: "What benefit do new customers receive this month?", audioScript: TALK_7,
    choices: ["A free month of service", "A free router installation", "A cash discount", "A free phone"],
    correct: 1, explanation: "ลูกค้าใหม่ที่สมัครเดือนนี้จะได้ติดตั้งเราเตอร์ฟรี",
  },
  {
    id: 91, question: "How can listeners learn more?", audioScript: TALK_7,
    choices: ["By visiting a physical store only", "By visiting the website or calling customer service", "By sending a text message", "By downloading an app"],
    correct: 1, explanation: "สามารถเข้าเว็บไซต์หรือโทรหาศูนย์บริการลูกค้า",
  },

  // Talk 8 — conference welcome
  {
    id: 92, question: "What event is taking place?", audioScript: TALK_8,
    choices: ["A product launch", "A business leadership conference", "A job fair", "A trade exhibition"],
    correct: 1, explanation: "เป็นงานประชุมผู้นำธุรกิจประจำปี",
  },
  {
    id: 93, question: "What will the keynote address focus on?", audioScript: TALK_8,
    choices: ["Innovation in the workplace", "Employee benefits", "Marketing strategy", "Financial planning"],
    correct: 0, explanation: "การกล่าวปาฐกถาหลักเน้นเรื่องนวัตกรรมในที่ทำงาน",
  },
  {
    id: 94, question: "What should attendees pick up at the registration desk?", audioScript: TALK_8,
    choices: ["A gift bag", "Their name badge and schedule", "Meal tickets", "A parking pass"],
    correct: 1, explanation: "ผู้เข้าร่วมต้องรับป้ายชื่อและตารางงานที่โต๊ะลงทะเบียน",
  },

  // Talk 9 — product recall
  {
    id: 95, question: "What product does this announcement concern?", audioScript: TALK_9,
    choices: ["A toaster", "A portable blender", "A coffee maker", "A vacuum cleaner"],
    correct: 1, explanation: "เป็นประกาศเกี่ยวกับเครื่องปั่นแบบพกพารุ่น X200",
  },
  {
    id: 96, question: "What is the defect related to?", audioScript: TALK_9,
    choices: ["The blades", "The power cord", "The battery", "The lid"],
    correct: 1, explanation: "ข้อบกพร่องเกี่ยวกับสายไฟที่อาจก่อให้เกิดอันตราย",
  },
  {
    id: 97, question: "What should owners of this product do?", audioScript: TALK_9,
    choices: ["Continue using it carefully", "Stop using it and contact customer support", "Return it to any store", "Wait for a firmware update"],
    correct: 1, explanation: "ควรหยุดใช้ทันทีและติดต่อฝ่ายบริการลูกค้าเพื่อขอเปลี่ยนสินค้าฟรี",
  },

  // Talk 10 — workshop instructions
  {
    id: 98, question: "What is the workshop about?", audioScript: TALK_10,
    choices: ["Public speaking", "Time management", "Financial planning", "Team building"],
    correct: 1, explanation: "เป็นเวิร์กช็อปเกี่ยวกับการบริหารเวลาอย่างมีประสิทธิภาพ",
  },
  {
    id: 99, question: "What should participants have ready before starting?", audioScript: TALK_10,
    choices: ["A laptop", "A notebook and pen", "A printed handout", "A calculator"],
    correct: 1, explanation: "ผู้เข้าร่วมควรเตรียมสมุดจดและปากกาให้พร้อม",
  },
  {
    id: 100, question: "What will happen halfway through the session?", audioScript: TALK_10,
    choices: ["A guest speaker will join", "There will be a fifteen-minute break", "The session will end", "Participants will get certificates"],
    correct: 1, explanation: "จะมีการพักสิบห้านาทีตรงกลางเซสชัน",
  },
];
