import type { Lesson } from "@/lib/data";

// TOEIC Vocabulary — high-frequency business English words grouped by theme.
// Pure text/multiple-choice, reuses the existing "quiz"/"info" step types.

export const TOEIC_VOCAB_LESSONS: Lesson[] = [
  {
    id: "toeic-v1",
    courseId: "toeic-vocab",
    title: "คำศัพท์: ที่ทำงาน (Office & Workplace)",
    order: 1,
    xpReward: 90,
    steps: [
      {
        type: "info",
        title: "คำศัพท์ที่ทำงาน — ควรจำก่อนสอบ TOEIC",
        content:
          "colleague (n.) — เพื่อนร่วมงาน\ndeadline (n.) — กำหนดเวลาส่งงาน\nsupervisor (n.) — หัวหน้างาน\nassignment (n.) — งานที่ได้รับมอบหมาย\nresign (v.) — ลาออก\npromote (v.) — เลื่อนตำแหน่ง\novertime (n.) — การทำงานล่วงเวลา\nvacant (adj.) — ว่าง (ตำแหน่งงาน)\nqualification (n.) — คุณสมบัติ\ncandidate (n.) — ผู้สมัคร\n\nลองฝึกกับ 6 ข้อตัวอย่างด้านล่างนี้ได้เลย!",
      },
      {
        type: "quiz",
        question: "\"Deadline\" most nearly means:",
        choices: ["a time limit for completing something", "a type of contract", "a job title", "a piece of equipment"],
        correct: 0,
        explanation: "deadline = กำหนดเวลาสุดท้ายที่ต้องทำงานให้เสร็จ",
      },
      {
        type: "quiz",
        question: "The manager decided to ___ Sarah to senior analyst after her excellent performance.",
        choices: ["resign", "promote", "retire", "apply"],
        correct: 1,
        explanation: "promote = เลื่อนตำแหน่ง เข้ากับบริบท \"เลื่อนตำแหน่งเป็น senior analyst\"",
      },
      {
        type: "quiz",
        question: "\"Candidate\" most nearly means:",
        choices: ["someone who applies for a job", "someone who is retiring", "a type of document", "a company department"],
        correct: 0,
        explanation: "candidate = ผู้สมัคร (งาน/ตำแหน่ง)",
      },
      {
        type: "quiz",
        question: "All employees must submit their reports before the ___ on Friday.",
        choices: ["deadline", "colleague", "vacancy", "resignation"],
        correct: 0,
        explanation: "deadline = กำหนดส่งงาน เข้ากับบริบท \"ก่อนวันศุกร์\"",
      },
      {
        type: "quiz",
        question: "\"Supervisor\" most nearly means:",
        choices: ["a person who oversees others' work", "a new employee", "a type of software", "a customer"],
        correct: 0,
        explanation: "supervisor = หัวหน้างานที่ดูแล/ควบคุมงานของผู้อื่น",
      },
      {
        type: "quiz",
        question: "There is currently one ___ position in the marketing department.",
        choices: ["vacant", "qualified", "retired", "promoted"],
        correct: 0,
        explanation: "vacant = ว่าง เข้ากับบริบท \"ตำแหน่งว่าง\"",
      },
    ],
  },
  {
    id: "toeic-v2",
    courseId: "toeic-vocab",
    title: "คำศัพท์: การประชุมและการสื่อสาร (Meetings)",
    order: 2,
    xpReward: 90,
    steps: [
      {
        type: "info",
        title: "คำศัพท์การประชุมและการสื่อสารทางธุรกิจ",
        content:
          "agenda (n.) — วาระการประชุม\npostpone (v.) — เลื่อนออกไป\nattend (v.) — เข้าร่วม\nnegotiate (v.) — เจรจาต่อรอง\nproposal (n.) — ข้อเสนอ\nfeedback (n.) — ความคิดเห็นสะท้อนกลับ\nclarify (v.) — ชี้แจงให้ชัดเจน\ncorrespondence (n.) — จดหมาย/การติดต่อสื่อสาร\n\nลองฝึกกับ 6 ข้อตัวอย่างด้านล่างนี้ได้เลย!",
      },
      {
        type: "quiz",
        question: "\"Agenda\" most nearly means:",
        choices: ["a list of topics to discuss in a meeting", "a type of contract", "an employee's salary", "a company logo"],
        correct: 0,
        explanation: "agenda = รายการหัวข้อที่จะพูดคุยในที่ประชุม",
      },
      {
        type: "quiz",
        question: "Due to bad weather, the conference has been ___ until next month.",
        choices: ["postponed", "attended", "negotiated", "clarified"],
        correct: 0,
        explanation: "postpone = เลื่อนออกไป เข้ากับบริบท \"เลื่อนงานประชุม\"",
      },
      {
        type: "quiz",
        question: "Could you please ___ what you meant by that comment?",
        choices: ["clarify", "postpone", "resign", "promote"],
        correct: 0,
        explanation: "clarify = ชี้แจงให้ชัดเจน เข้ากับบริบท \"อธิบายสิ่งที่พูดให้ชัดขึ้น\"",
      },
      {
        type: "quiz",
        question: "\"Feedback\" most nearly means:",
        choices: ["comments or opinions about performance", "a written contract", "a formal complaint", "a job title"],
        correct: 0,
        explanation: "feedback = ความคิดเห็น/ข้อเสนอแนะที่สะท้อนกลับ",
      },
      {
        type: "quiz",
        question: "The two companies will ___ a new contract next week.",
        choices: ["negotiate", "attend", "clarify", "postpone"],
        correct: 0,
        explanation: "negotiate = เจรจาต่อรอง เข้ากับบริบท \"ทำสัญญาใหม่\"",
      },
      {
        type: "quiz",
        question: "\"Proposal\" most nearly means:",
        choices: ["a plan or suggestion put forward for consideration", "an employee handbook", "a meeting room", "a type of software"],
        correct: 0,
        explanation: "proposal = ข้อเสนอ/แผนงานที่นำเสนอให้พิจารณา",
      },
    ],
  },
  {
    id: "toeic-v3",
    courseId: "toeic-vocab",
    title: "คำศัพท์: การเดินทาง (Travel)",
    order: 3,
    xpReward: 90,
    steps: [
      {
        type: "info",
        title: "คำศัพท์การเดินทางและการขนส่ง",
        content:
          "itinerary (n.) — กำหนดการเดินทาง\nboarding pass (n.) — บัตรขึ้นเครื่อง\ndeparture (n.) — การออกเดินทาง\narrival (n.) — การมาถึง\nreservation (n.) — การจอง\nfare (n.) — ค่าโดยสาร\nluggage (n.) — สัมภาระ\ndelay (n./v.) — ความล่าช้า / ล่าช้า\n\nลองฝึกกับ 6 ข้อตัวอย่างด้านล่างนี้ได้เลย!",
      },
      {
        type: "quiz",
        question: "\"Itinerary\" most nearly means:",
        choices: ["a detailed plan for a trip", "a type of ticket", "a hotel room", "a customs form"],
        correct: 0,
        explanation: "itinerary = กำหนดการเดินทางโดยละเอียด",
      },
      {
        type: "quiz",
        question: "Passengers must show their ___ before boarding the plane.",
        choices: ["boarding pass", "itinerary", "luggage", "fare"],
        correct: 0,
        explanation: "boarding pass = บัตรที่ใช้แสดงก่อนขึ้นเครื่องบิน",
      },
      {
        type: "quiz",
        question: "Due to a technical problem, the flight's ___ was delayed by two hours.",
        choices: ["departure", "arrival", "fare", "luggage"],
        correct: 0,
        explanation: "departure = การออกเดินทาง เข้ากับบริบท \"เที่ยวบินออกช้ากว่ากำหนด\"",
      },
      {
        type: "quiz",
        question: "I'd like to make a ___ for a table for four at 7 PM.",
        choices: ["reservation", "fare", "luggage", "delay"],
        correct: 0,
        explanation: "reservation = การจอง เข้ากับบริบท \"จองโต๊ะ\"",
      },
      {
        type: "quiz",
        question: "\"Fare\" most nearly means:",
        choices: ["the price paid for a trip", "a piece of luggage", "a boarding document", "a hotel discount"],
        correct: 0,
        explanation: "fare = ค่าโดยสาร",
      },
      {
        type: "quiz",
        question: "Please make sure your ___ meets the airline's weight limit.",
        choices: ["luggage", "fare", "itinerary", "arrival"],
        correct: 0,
        explanation: "luggage = สัมภาระ เข้ากับบริบท \"น้ำหนักกระเป๋าตามที่สายการบินกำหนด\"",
      },
    ],
  },
  {
    id: "toeic-v4",
    courseId: "toeic-vocab",
    title: "คำศัพท์: ธุรกิจและการเงิน (Shopping & Finance)",
    order: 4,
    xpReward: 90,
    steps: [
      {
        type: "info",
        title: "คำศัพท์ธุรกิจ การซื้อขาย และการเงิน",
        content:
          "invoice (n.) — ใบแจ้งหนี้\nrefund (n./v.) — การคืนเงิน / คืนเงิน\ndiscount (n.) — ส่วนลด\nwarranty (n.) — การรับประกัน\nbudget (n.) — งบประมาณ\nexpense (n.) — ค่าใช้จ่าย\nreceipt (n.) — ใบเสร็จ\ninstallment (n.) — การผ่อนชำระ\n\nลองฝึกกับ 6 ข้อตัวอย่างด้านล่างนี้ได้เลย!",
      },
      {
        type: "quiz",
        question: "\"Invoice\" most nearly means:",
        choices: ["a document requesting payment for goods or services", "a type of discount", "a customer complaint", "a product review"],
        correct: 0,
        explanation: "invoice = ใบแจ้งหนี้เรียกเก็บเงินค่าสินค้า/บริการ",
      },
      {
        type: "quiz",
        question: "If the product is defective, you may request a full ___.",
        choices: ["refund", "invoice", "budget", "installment"],
        correct: 0,
        explanation: "refund = การคืนเงิน เข้ากับบริบท \"สินค้ามีตำหนิ\"",
      },
      {
        type: "quiz",
        question: "\"Warranty\" most nearly means:",
        choices: ["a guarantee to repair or replace a product", "a type of receipt", "a discount code", "a payment plan"],
        correct: 0,
        explanation: "warranty = การรับประกันสินค้า",
      },
      {
        type: "quiz",
        question: "The company must stay within its annual ___ for marketing expenses.",
        choices: ["budget", "refund", "warranty", "receipt"],
        correct: 0,
        explanation: "budget = งบประมาณ เข้ากับบริบท \"ค่าใช้จ่ายด้านการตลาดต่อปี\"",
      },
      {
        type: "quiz",
        question: "Please keep your ___ in case you need to return the item.",
        choices: ["receipt", "invoice", "installment", "discount"],
        correct: 0,
        explanation: "receipt = ใบเสร็จรับเงิน ใช้เป็นหลักฐานตอนคืนสินค้า",
      },
      {
        type: "quiz",
        question: "Customers can pay in monthly ___ instead of one lump sum.",
        choices: ["installments", "refunds", "discounts", "warranties"],
        correct: 0,
        explanation: "installment = การผ่อนชำระเป็นงวดๆ",
      },
    ],
  },
];
