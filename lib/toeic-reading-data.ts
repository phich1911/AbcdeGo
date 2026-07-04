import type { Lesson } from "@/lib/data";

// TOEIC Reading — Parts 5-7. Pure text/multiple-choice, so it reuses the
// existing "quiz"/"info" step types directly (no audio or images needed).

export const TOEIC_READING_LESSONS: Lesson[] = [
  {
    id: "toeic-r1",
    courseId: "toeic-reading",
    title: "Part 5: Incomplete Sentences",
    order: 1,
    xpReward: 90,
    steps: [
      {
        type: "info",
        title: "Part 5: Incomplete Sentences คืออะไร?",
        content:
          "ในข้อสอบจริงมี 30 ข้อ เป็นประโยคที่เว้นช่องว่างไว้ 1 จุด ให้เลือกคำที่ถูกต้องจาก 4 ตัวเลือกไปเติม วัดความรู้เรื่องไวยากรณ์ (Grammar) และคำศัพท์ (Vocabulary)\n\n► เคล็ดลับ\n• ดูตำแหน่งช่องว่างในประโยคก่อน — อยู่หลัง \"to\" มักต้องใช้กริยาช่องที่ 1, อยู่หน้าคำนามมักต้องใช้คำคุณศัพท์\n• ข้อสอบไวยากรณ์ทำได้เร็วกว่าข้อคำศัพท์มาก ควรทำให้เสร็จเร็วเพื่อเก็บเวลาไว้ให้ Part 7\n\nลองฝึกกับ 6 ข้อตัวอย่างด้านล่างนี้ได้เลย!",
      },
      {
        type: "quiz",
        question: "The company decided to ___ its office to a larger building next year.",
        choices: ["move", "moves", "moving", "moved"],
        correct: 0,
        explanation: "หลัง \"to\" (infinitive) ต้องตามด้วยกริยาช่องที่ 1 (base form) เสมอ",
      },
      {
        type: "quiz",
        question: "Sales figures this quarter were significantly ___ than last quarter's.",
        choices: ["high", "higher", "highest", "highly"],
        correct: 1,
        explanation: "เปรียบเทียบสองสิ่ง (this quarter vs last quarter) ต้องใช้ comparative form \"higher\" ตามด้วย than",
      },
      {
        type: "quiz",
        question: "All visitors must sign in at the front desk ___ entering the building.",
        choices: ["despite", "before", "although", "unless"],
        correct: 1,
        explanation: "\"before\" (ก่อน) เหมาะกับบริบทที่ต้องเซ็นชื่อก่อนเข้าอาคาร ตัวเลือกอื่นความหมายไม่สอดคล้อง",
      },
      {
        type: "quiz",
        question: "The new employee handbook was written ___ for easy understanding by all staff.",
        choices: ["clear", "clarity", "clearly", "clearness"],
        correct: 2,
        explanation: "ช่องว่างขยายกริยา \"written\" ต้องใช้ adverb คือ \"clearly\"",
      },
      {
        type: "quiz",
        question: "Please submit your expense report ___ the end of this week.",
        choices: ["by", "since", "during", "among"],
        correct: 0,
        explanation: "\"by\" ใช้กับ deadline (ภายในเวลาที่กำหนด) — \"by the end of this week\"",
      },
      {
        type: "quiz",
        question: "The manager praised the team for their ___ effort on the project.",
        choices: ["outstand", "outstanding", "outstandingly", "outstands"],
        correct: 1,
        explanation: "ช่องว่างอยู่หน้าคำนาม \"effort\" ต้องใช้คำคุณศัพท์ \"outstanding\"",
      },
    ],
  },
  {
    id: "toeic-r2",
    courseId: "toeic-reading",
    title: "Part 6: Text Completion",
    order: 2,
    xpReward: 90,
    steps: [
      {
        type: "info",
        title: "Part 6: Text Completion คืออะไร?",
        content:
          "ในข้อสอบจริงมี 4 บทความ บทความละ 4 ข้อ (รวม 16 ข้อ) เป็นบทความสั้นๆ เช่น อีเมลหรือจดหมาย ที่เว้นช่องว่างไว้หลายจุดในเนื้อเรื่อง ให้เลือกคำหรือประโยคที่เหมาะสมไปเติม\n\n► เคล็ดลับ\n• ต้องอ่านบริบทรอบๆ ช่องว่าง ไม่ใช่แค่ประโยคเดียว บางข้อคำตอบต้องดูประโยคก่อนหน้าหรือถัดไปประกอบ\n• บางข้อเป็นตัวเลือกทั้งประโยค ไม่ใช่แค่คำศัพท์ ต้องเช็คว่าเนื้อหาต่อเนื่องสมเหตุสมผลไหม\n\nลองฝึกกับอีเมลตัวอย่างด้านล่างนี้ได้เลย — มี 4 ช่องว่างให้ฝึก!",
      },
      {
        type: "quiz",
        question:
          "Dear Team,\n\nI am writing to inform you that our quarterly meeting has been rescheduled ___(1)___ next Monday due to a scheduling conflict.\n\n(เลือกคำเติมช่องว่างที่ (1))",
        choices: ["to", "from", "at", "of"],
        correct: 0,
        explanation: "สำนวน \"reschedule to [วัน/เวลาใหม่]\" ใช้ \"to\" เสมอ",
      },
      {
        type: "quiz",
        question:
          "...rescheduled to next Monday due to a scheduling conflict. Please make sure to ___(2)___ the updated agenda before the meeting.\n\n(เลือกคำเติมช่องว่างที่ (2))",
        choices: ["review", "reviewing", "reviewed", "reviews"],
        correct: 0,
        explanation: "หลัง \"to\" (infinitive) ต้องตามด้วยกริยาช่องที่ 1 คือ \"review\"",
      },
      {
        type: "quiz",
        question:
          "Please make sure to review the updated agenda before the meeting. If you have any questions, feel free to ___(3)___ me directly.\n\n(เลือกคำเติมช่องว่างที่ (3))",
        choices: ["contact", "contacting", "contacted", "contacts"],
        correct: 0,
        explanation: "สำนวน \"feel free to + กริยาช่องที่ 1\" คือ \"feel free to contact\"",
      },
      {
        type: "quiz",
        question:
          "If you have any questions, feel free to contact me directly. We look forward ___(4)___ seeing everyone there.\n\n(เลือกคำเติมช่องว่างที่ (4))",
        choices: ["to", "for", "on", "in"],
        correct: 0,
        explanation: "สำนวน \"look forward to + Ving\" ใช้ \"to\" ตามด้วยกริยาเติม ing",
      },
    ],
  },
  {
    id: "toeic-r3",
    courseId: "toeic-reading",
    title: "Part 7: Reading Comprehension",
    order: 3,
    xpReward: 90,
    steps: [
      {
        type: "info",
        title: "Part 7: Reading Comprehension คืออะไร?",
        content:
          "พาร์ทนี้มี 54 ข้อ ยาวที่สุดในข้อสอบ Reading ทั้งหมด แบ่งเป็น 2 แบบ\n\n► Single Passages (บทความเดี่ยว)\nอ่าน 1 บทความ (เช่น ประกาศ โฆษณา บทความข่าว) แล้วตอบคำถามที่เกี่ยวข้อง\n\n► Multiple Passages (บทความชุด)\nอ่านบทความ 2-3 บทความที่เกี่ยวข้องกัน (เช่น อีเมลกับคำตอบกลับ) แล้วนำข้อมูลจากทุกบทความมาเชื่อมโยงเพื่อตอบคำถาม\n\n► เคล็ดลับ\n• อ่านคำถามก่อนอ่านบทความทั้งหมด จะได้รู้ว่าต้องหาข้อมูลอะไร\n• พาร์ทนี้กินเวลาที่สุด ควรบริหารเวลาให้ดี อย่าอ่านซ้ำโดยไม่จำเป็น\n\nลองฝึกกับ 1 บทความเดี่ยว และ 1 ชุดบทความคู่ด้านล่างนี้ได้เลย!",
      },
      {
        type: "quiz",
        question:
          "NOTICE TO ALL CUSTOMERS\n\nGreenLeaf Supermarket will be closed on July 10th for annual inventory. All regular services will resume on July 11th at 8:00 AM. During the closure, our online store will remain open, but delivery may be delayed by 1-2 days. We apologize for any inconvenience and thank you for your understanding.\n\n— GreenLeaf Management\n\nWhy will the store be closed?",
        choices: ["For renovation", "For annual inventory", "For a public holiday", "Due to a power outage"],
        correct: 1,
        explanation: "ประกาศระบุว่า \"closed on July 10th for annual inventory\"",
      },
      {
        type: "quiz",
        question:
          "NOTICE TO ALL CUSTOMERS\n\nGreenLeaf Supermarket will be closed on July 10th for annual inventory. All regular services will resume on July 11th at 8:00 AM. During the closure, our online store will remain open, but delivery may be delayed by 1-2 days. We apologize for any inconvenience and thank you for your understanding.\n\n— GreenLeaf Management\n\nWhat time will the store reopen?",
        choices: ["8:00 AM", "9:00 AM", "10:00 AM", "Noon"],
        correct: 0,
        explanation: "ประกาศระบุว่า \"resume on July 11th at 8:00 AM\"",
      },
      {
        type: "quiz",
        question:
          "NOTICE TO ALL CUSTOMERS\n\nGreenLeaf Supermarket will be closed on July 10th for annual inventory. All regular services will resume on July 11th at 8:00 AM. During the closure, our online store will remain open, but delivery may be delayed by 1-2 days. We apologize for any inconvenience and thank you for your understanding.\n\n— GreenLeaf Management\n\nWhat will happen to online orders during the closure?",
        choices: ["They will be canceled", "They will not be accepted", "They may be delayed", "They will be free of charge"],
        correct: 2,
        explanation: "ประกาศระบุว่า \"delivery may be delayed by 1-2 days\"",
      },
      {
        type: "quiz",
        question:
          "Email 1 — From: Anna Lee, To: customerservice@techstore.com, Subject: Defective Product\n\"Hello, I purchased a laptop from your store last week (Order #4521), but it stopped working after two days. I would like to request a replacement or a full refund. Please let me know the next steps. Thank you, Anna Lee\"\n\nEmail 2 — From: TechStore Customer Service, To: Anna Lee, Subject: RE: Defective Product\n\"Dear Ms. Lee, We are sorry to hear about the issue with your laptop. Since your order is within the 30-day warranty period, we will send you a replacement unit at no extra cost. Please return the defective laptop using the prepaid shipping label attached to this email. Best regards, TechStore Customer Service\"\n\nWhat is the purpose of Anna's email?",
        choices: ["To ask about a discount", "To report a defective product", "To cancel her order", "To change her shipping address"],
        correct: 1,
        explanation: "อีเมลของ Anna แจ้งว่าแล็ปท็อป \"stopped working after two days\" และขอเปลี่ยน/คืนเงิน",
      },
      {
        type: "quiz",
        question:
          "Email 1 — From: Anna Lee, To: customerservice@techstore.com, Subject: Defective Product\n\"Hello, I purchased a laptop from your store last week (Order #4521), but it stopped working after two days. I would like to request a replacement or a full refund. Please let me know the next steps. Thank you, Anna Lee\"\n\nEmail 2 — From: TechStore Customer Service, To: Anna Lee, Subject: RE: Defective Product\n\"Dear Ms. Lee, We are sorry to hear about the issue with your laptop. Since your order is within the 30-day warranty period, we will send you a replacement unit at no extra cost. Please return the defective laptop using the prepaid shipping label attached to this email. Best regards, TechStore Customer Service\"\n\nWhat does the customer service team offer to do?",
        choices: ["Give a partial refund", "Send a replacement laptop for free", "Repair the laptop for a fee", "Extend the warranty period"],
        correct: 1,
        explanation: "อีเมลตอบกลับระบุว่า \"we will send you a replacement unit at no extra cost\"",
      },
      {
        type: "quiz",
        question:
          "Email 1 — From: Anna Lee, To: customerservice@techstore.com, Subject: Defective Product\n\"Hello, I purchased a laptop from your store last week (Order #4521), but it stopped working after two days. I would like to request a replacement or a full refund. Please let me know the next steps. Thank you, Anna Lee\"\n\nEmail 2 — From: TechStore Customer Service, To: Anna Lee, Subject: RE: Defective Product\n\"Dear Ms. Lee, We are sorry to hear about the issue with your laptop. Since your order is within the 30-day warranty period, we will send you a replacement unit at no extra cost. Please return the defective laptop using the prepaid shipping label attached to this email. Best regards, TechStore Customer Service\"\n\nWhat should Anna do to return the defective laptop?",
        choices: ["Pay for shipping herself", "Bring it to a local store", "Use the prepaid shipping label", "Mail it without any label"],
        correct: 2,
        explanation: "อีเมลตอบกลับระบุว่าให้ \"return the defective laptop using the prepaid shipping label\"",
      },
    ],
  },
];
