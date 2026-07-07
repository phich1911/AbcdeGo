// Contains the exam answer key — must never be imported from a "use client" file.
if (typeof window !== "undefined") {
  throw new Error("lib/exam-data/toeic/part3 must only be imported on the server");
}

import type { ExamQuestion } from "../kp-mock-1";

// TOEIC Part 3 — Conversations. 13 short two/three-speaker conversations,
// 3 questions each (39 total). Each trio of questions shares the same
// `audioScript` (the full conversation) — duplicating it per question avoids
// needing a shared-passage construct, matching how kp-mock-1.ts repeats
// reading passages across grouped questions.

const CONVO_1 =
  "Woman: Hi, I wanted to check if we could move tomorrow's marketing meeting to Thursday instead. " +
  "Man: Let me check my calendar... Thursday afternoon works for me, but the design team said they're only free in the morning. " +
  "Woman: Okay, let's do Thursday at ten then. I'll send a new invite. " +
  "Man: Sounds good. Could you also add the new intern to the invite list?";

const CONVO_2 =
  "Man: Thank you for calling Nova Electronics, how can I help you? " +
  "Woman: Hi, I'm interested in the wireless keyboard your company sells. Does it come in black? " +
  "Man: Yes, it comes in black and silver. The black one is currently on sale for twenty percent off. " +
  "Woman: Great, I'll take the black one. Can I pick it up today? " +
  "Man: Sure, it'll be ready for pickup in about an hour.";

const CONVO_3 =
  "Woman: The printer on the third floor keeps jamming every time I try to print more than five pages. " +
  "Man: That's the second complaint about that machine this week. I'll send a technician up today. " +
  "Woman: Thanks. In the meantime, can I use the printer on the fifth floor? " +
  "Man: Of course, just make sure to log out when you're done since it's shared with accounting.";

const CONVO_4 =
  "Man: I'd like to change my reservation at the Grandview Hotel from a single room to a double room. " +
  "Woman: Sure, may I have your confirmation number? " +
  "Man: It's GV-4471. " +
  "Woman: I see your reservation for next Monday to Wednesday. A double room will cost twenty dollars more per night. " +
  "Man: That's fine, please go ahead and make the change.";

const CONVO_5 =
  "Woman: I'd like to reserve a table for six people this Friday evening for a client dinner. " +
  "Man: We have availability at seven and at eight thirty. Which would you prefer? " +
  "Woman: Seven would be better, since some guests are coming straight from the airport. " +
  "Man: Understood. I'll reserve a table by the window under your company name.";

const CONVO_6 =
  "Man: Thank you for coming in for a second interview. Do you have any questions about the position? " +
  "Woman: Yes, I wanted to ask about the training program for new hires. " +
  "Man: New employees go through a two-week training program before starting on their own projects. " +
  "Woman: That sounds great. When would I know the final decision? " +
  "Man: We'll contact all candidates by the end of next week.";

const CONVO_7 =
  "Woman: I'm calling about order number 8823. It was supposed to arrive yesterday but I still haven't received it. " +
  "Man: I'm sorry for the inconvenience. Let me check the tracking information... it looks like it's been delayed at the distribution center. " +
  "Woman: Is there any way to speed it up? " +
  "Man: I can offer you a refund of the shipping fee, and it should arrive by tomorrow afternoon.";

const CONVO_8 =
  "Man: We need to rent a projector and microphones for the conference next month. " +
  "Woman: I already contacted a rental company. They can provide two projectors and four microphones for three hundred dollars total. " +
  "Man: That's within our budget. Did you also ask about setup and technical support during the event? " +
  "Woman: Yes, they'll send a technician for the full day at no extra charge.";

const CONVO_9 =
  "Woman: I wanted to ask if I could take next Monday and Tuesday off. My cousin is visiting from out of town. " +
  "Man: Let me check the schedule. Those days should be fine since the big project deadline isn't until the following week. " +
  "Woman: Thank you. Should I submit a formal request through the HR system? " +
  "Man: Yes, please do that today so it gets approved before the weekend.";

const CONVO_10 =
  "Man: I'd like to return this jacket. I bought it last week but it doesn't fit properly. " +
  "Woman: Do you have the receipt with you? " +
  "Man: Yes, here it is. " +
  "Woman: Since it's within thirty days and the tags are still attached, I can give you a full refund or exchange it for a different size. " +
  "Man: I'll exchange it for a larger size, please.";

const CONVO_11 =
  "Woman: I need to book a flight to Chicago for a business trip next Wednesday. " +
  "Man: There's a morning flight at eight and an evening flight at six. The morning flight is a direct flight. " +
  "Woman: I'll take the morning flight then, since I have a meeting at noon. " +
  "Man: Great, I'll also book a hotel near the conference center if you'd like. " +
  "Woman: Yes, please, that would save me some time.";

const CONVO_12 =
  "Man: We're almost out of printer paper and toner in the supply room. " +
  "Woman: I'll place an order today. Should we also order more folders and sticky notes while we're at it? " +
  "Man: Good idea. Let's check with the accounting team first, though, since they mentioned running low on binders too. " +
  "Woman: I'll email them now and combine everything into one order.";

const CONVO_13 =
  "Woman: How is the new product launch project coming along? " +
  "Man: We're a bit behind schedule because the packaging design needs another round of revisions. " +
  "Woman: Do you think we can still meet the launch date? " +
  "Man: If the design team finishes by Friday, we should be able to catch up during production. " +
  "Woman: Alright, please keep me updated on their progress.";

export const TOEIC_PART3: ExamQuestion[] = [
  // Conversation 1 — rescheduling a meeting
  {
    id: 32, question: "What does the woman want to do?", audioScript: CONVO_1,
    choices: ["Cancel the marketing meeting", "Reschedule the marketing meeting", "Invite a client to the meeting", "Change the meeting location"],
    correct: 1, explanation: "ผู้หญิงขอเลื่อนประชุมจากพรุ่งนี้เป็นวันพฤหัสบดี",
  },
  {
    id: 33, question: "Why is Thursday morning not suitable for everyone?", audioScript: CONVO_1,
    choices: ["The man is unavailable", "The design team is only free then", "The design team is busy then", "The room is booked"],
    correct: 2, explanation: "ทีมออกแบบว่างเฉพาะช่วงเช้า จึงต้องเลือกช่วงบ่ายแทน",
  },
  {
    id: 34, question: "What does the man ask the woman to do?", audioScript: CONVO_1,
    choices: ["Book a conference room", "Add the intern to the invite", "Cancel the old invite", "Print the agenda"],
    correct: 1, explanation: "ผู้ชายขอให้เพิ่มอินเทิร์นใหม่เข้าไปในรายชื่อผู้รับเชิญ",
  },

  // Conversation 2 — electronics store call
  {
    id: 35, question: "What is the woman interested in buying?", audioScript: CONVO_2,
    choices: ["A wireless mouse", "A wireless keyboard", "A laptop", "A monitor"],
    correct: 1, explanation: "ผู้หญิงถามเกี่ยวกับคีย์บอร์ดไร้สาย",
  },
  {
    id: 36, question: "According to the man, what is special about the black keyboard?", audioScript: CONVO_2,
    choices: ["It is out of stock", "It is on sale", "It is more expensive", "It is a new model"],
    correct: 1, explanation: "คีย์บอร์ดสีดำกำลังลดราคาอยู่ยี่สิบเปอร์เซ็นต์",
  },
  {
    id: 37, question: "When will the item be ready for pickup?", audioScript: CONVO_2,
    choices: ["Tomorrow", "In about an hour", "Next week", "This evening"],
    correct: 1, explanation: "ผู้ชายบอกว่าจะพร้อมให้มารับภายในประมาณหนึ่งชั่วโมง",
  },

  // Conversation 3 — printer issue
  {
    id: 38, question: "What problem does the woman report?", audioScript: CONVO_3,
    choices: ["The printer is out of paper", "The printer keeps jamming", "The printer is too slow", "The printer is missing"],
    correct: 1, explanation: "เครื่องพิมพ์ชั้นสามกระดาษติดบ่อยเมื่อพิมพ์เกินห้าแผ่น",
  },
  {
    id: 39, question: "What will the man do next?", audioScript: CONVO_3,
    choices: ["Buy a new printer", "Send a technician", "Move the printer", "Order more toner"],
    correct: 1, explanation: "ผู้ชายจะส่งช่างเทคนิคขึ้นไปดูแลในวันนี้",
  },
  {
    id: 40, question: "What does the man remind the woman about the fifth-floor printer?", audioScript: CONVO_3,
    choices: ["It requires a password", "It is shared with accounting", "It only prints in color", "It is being repaired"],
    correct: 1, explanation: "เครื่องพิมพ์ชั้นห้าใช้ร่วมกับแผนกบัญชี ต้องล็อกเอาต์ทุกครั้ง",
  },

  // Conversation 4 — hotel reservation change
  {
    id: 41, question: "What does the man want to change?", audioScript: CONVO_4,
    choices: ["His check-in date", "His room type", "His payment method", "His check-out date"],
    correct: 1, explanation: "ผู้ชายต้องการเปลี่ยนจากห้องเดี่ยวเป็นห้องคู่",
  },
  {
    id: 42, question: "What does the woman need from the man first?", audioScript: CONVO_4,
    choices: ["His name", "His confirmation number", "His credit card", "His phone number"],
    correct: 1, explanation: "พนักงานขอหมายเลขยืนยันการจองก่อน",
  },
  {
    id: 43, question: "What will happen as a result of the change?", audioScript: CONVO_4,
    choices: ["The stay will be shorter", "The price will increase", "The room will be smaller", "The reservation will be canceled"],
    correct: 1, explanation: "ห้องคู่มีค่าใช้จ่ายเพิ่มอีกยี่สิบดอลลาร์ต่อคืน",
  },

  // Conversation 5 — restaurant reservation
  {
    id: 44, question: "Why is the woman making the reservation?", audioScript: CONVO_5,
    choices: ["For a birthday party", "For a client dinner", "For a wedding", "For a staff lunch"],
    correct: 1, explanation: "ผู้หญิงจองโต๊ะสำหรับมื้อค่ำกับลูกค้า",
  },
  {
    id: 45, question: "Why does the woman prefer the earlier time?", audioScript: CONVO_5,
    choices: ["The restaurant closes early", "Some guests arrive from the airport", "It is cheaper", "The chef recommended it"],
    correct: 1, explanation: "แขกบางคนเดินทางมาจากสนามบินโดยตรง จึงเลือกเวลาที่เร็วกว่า",
  },
  {
    id: 46, question: "Where will the table be located?", audioScript: CONVO_5,
    choices: ["Near the kitchen", "By the window", "On the second floor", "Outside on the patio"],
    correct: 1, explanation: "พนักงานจะจัดโต๊ะไว้ริมหน้าต่าง",
  },

  // Conversation 6 — job interview
  {
    id: 47, question: "What is the woman's question about?", audioScript: CONVO_6,
    choices: ["The salary", "The training program", "The office location", "The dress code"],
    correct: 1, explanation: "ผู้หญิงถามเกี่ยวกับโปรแกรมฝึกอบรมพนักงานใหม่",
  },
  {
    id: 48, question: "How long is the training program?", audioScript: CONVO_6,
    choices: ["One week", "Two weeks", "One month", "Three months"],
    correct: 1, explanation: "โปรแกรมฝึกอบรมใช้เวลาสองสัปดาห์",
  },
  {
    id: 49, question: "When will candidates hear about the final decision?", audioScript: CONVO_6,
    choices: ["Tomorrow", "By the end of next week", "In one month", "Immediately after the interview"],
    correct: 1, explanation: "ผู้สมัครทุกคนจะได้รับการติดต่อภายในสิ้นสัปดาห์หน้า",
  },

  // Conversation 7 — delivery complaint
  {
    id: 50, question: "What is the woman calling about?", audioScript: CONVO_7,
    choices: ["A billing error", "A late delivery", "A wrong item", "A cancelled order"],
    correct: 1, explanation: "ผู้หญิงโทรมาแจ้งว่าสินค้าที่ควรมาถึงเมื่อวานยังไม่ได้รับ",
  },
  {
    id: 51, question: "According to the man, where is the package now?", audioScript: CONVO_7,
    choices: ["At the customer's address", "Delayed at the distribution center", "Lost in transit", "Returned to the sender"],
    correct: 1, explanation: "พัสดุถูกดีเลย์อยู่ที่ศูนย์กระจายสินค้า",
  },
  {
    id: 52, question: "What does the man offer the woman?", audioScript: CONVO_7,
    choices: ["A full refund", "A discount on her next order", "A refund of the shipping fee", "A free gift"],
    correct: 2, explanation: "ผู้ชายเสนอคืนค่าจัดส่งให้",
  },

  // Conversation 8 — conference equipment rental
  {
    id: 53, question: "What are the speakers planning?", audioScript: CONVO_8,
    choices: ["A product launch", "A conference", "A staff party", "A training session"],
    correct: 1, explanation: "ทั้งสองกำลังวางแผนงานประชุมเดือนหน้า",
  },
  {
    id: 54, question: "How much will the equipment rental cost?", audioScript: CONVO_8,
    choices: ["One hundred dollars", "Two hundred dollars", "Three hundred dollars", "Four hundred dollars"],
    correct: 2, explanation: "ค่าเช่าอุปกรณ์ทั้งหมดอยู่ที่สามร้อยดอลลาร์",
  },
  {
    id: 55, question: "What additional service will the rental company provide?", audioScript: CONVO_8,
    choices: ["Free delivery", "Technical support for the day", "A discount for future rentals", "Extra chairs"],
    correct: 1, explanation: "บริษัทให้บริการช่างเทคนิคดูแลตลอดวันโดยไม่มีค่าใช้จ่ายเพิ่ม",
  },

  // Conversation 9 — time off request
  {
    id: 56, question: "Why does the woman want to take time off?", audioScript: CONVO_9,
    choices: ["She is sick", "Her cousin is visiting", "She has a conference", "She is moving house"],
    correct: 1, explanation: "ญาติของผู้หญิงจะมาเยี่ยมจากต่างเมือง",
  },
  {
    id: 57, question: "Why does the man approve the request easily?", audioScript: CONVO_9,
    choices: ["The project deadline is far away", "He is going on leave too", "The woman rarely takes time off", "The office will be closed anyway"],
    correct: 0, explanation: "กำหนดส่งงานสำคัญยังไม่ถึงจนกว่าสัปดาห์ถัดไป",
  },
  {
    id: 58, question: "What does the man ask the woman to do today?", audioScript: CONVO_9,
    choices: ["Finish her project early", "Submit a formal request through HR", "Talk to another manager", "Cancel her plans"],
    correct: 1, explanation: "ผู้ชายขอให้ยื่นคำขอลาผ่านระบบ HR ภายในวันนี้",
  },

  // Conversation 10 — store return
  {
    id: 59, question: "What is the man's problem with the jacket?", audioScript: CONVO_10,
    choices: ["It is the wrong color", "It doesn't fit properly", "It is damaged", "It was too expensive"],
    correct: 1, explanation: "เสื้อแจ็คเก็ตใส่ไม่พอดีตัว",
  },
  {
    id: 60, question: "What does the woman ask to see?", audioScript: CONVO_10,
    choices: ["His ID card", "His receipt", "His credit card", "His membership card"],
    correct: 1, explanation: "พนักงานขอดูใบเสร็จก่อนดำเนินการคืนสินค้า",
  },
  {
    id: 61, question: "What does the man decide to do?", audioScript: CONVO_10,
    choices: ["Get a full refund", "Exchange for a larger size", "Keep the jacket", "Buy a different item"],
    correct: 1, explanation: "ผู้ชายเลือกเปลี่ยนเป็นไซส์ที่ใหญ่ขึ้นแทนการคืนเงิน",
  },

  // Conversation 11 — booking a flight
  {
    id: 62, question: "Why does the woman need to travel to Chicago?", audioScript: CONVO_11,
    choices: ["For a vacation", "For a business trip", "To visit family", "To attend a wedding"],
    correct: 1, explanation: "ผู้หญิงเดินทางไปชิคาโกเพื่อทำธุรกิจ",
  },
  {
    id: 63, question: "Why does the woman choose the morning flight?", audioScript: CONVO_11,
    choices: ["It's cheaper", "She has a meeting at noon", "It has better seats", "It's the only flight available"],
    correct: 1, explanation: "เธอมีนัดประชุมตอนเที่ยง จึงต้องขึ้นเที่ยวบินเช้าที่บินตรง",
  },
  {
    id: 64, question: "What does the man offer to do in addition to booking the flight?", audioScript: CONVO_11,
    choices: ["Rent a car", "Book a hotel", "Arrange a taxi", "Buy travel insurance"],
    correct: 1, explanation: "ผู้ชายเสนอจะจองโรงแรมใกล้ศูนย์ประชุมให้ด้วย",
  },

  // Conversation 12 — office supplies
  {
    id: 65, question: "What supplies are running low, according to the man?", audioScript: CONVO_12,
    choices: ["Pens and staplers", "Printer paper and toner", "Folders and envelopes", "Chairs and desks"],
    correct: 1, explanation: "กระดาษพิมพ์และหมึกพิมพ์ในห้องเก็บของใกล้หมด",
  },
  {
    id: 66, question: "Which department does the woman say to check with?", audioScript: CONVO_12,
    choices: ["Marketing", "Human resources", "Accounting", "IT"],
    correct: 2, explanation: "ผู้หญิงจะตรวจสอบกับแผนกบัญชีก่อน เพราะพวกเขาก็ใกล้หมดสมุดบันทึกเช่นกัน",
  },
  {
    id: 67, question: "What will the woman do next?", audioScript: CONVO_12,
    choices: ["Call the supplier directly", "Email accounting and combine the order", "Ask the manager for approval", "Order only paper for now"],
    correct: 1, explanation: "เธอจะส่งอีเมลถึงแผนกบัญชีแล้วรวมคำสั่งซื้อเข้าด้วยกัน",
  },

  // Conversation 13 — project status
  {
    id: 68, question: "Why is the project behind schedule?", audioScript: CONVO_13,
    choices: ["The budget was cut", "The packaging design needs revisions", "The team is short-staffed", "The client changed requirements"],
    correct: 1, explanation: "งานออกแบบบรรจุภัณฑ์ต้องแก้ไขอีกรอบ",
  },
  {
    id: 69, question: "What does the man think will happen if the design is finished by Friday?", audioScript: CONVO_13,
    choices: ["The launch will be delayed anyway", "They can catch up during production", "The budget will increase", "The client will be notified"],
    correct: 1, explanation: "หากทีมออกแบบเสร็จทันวันศุกร์ ทีมจะตามงานทันในขั้นตอนการผลิต",
  },
  {
    id: 70, question: "What does the woman ask the man to do?", audioScript: CONVO_13,
    choices: ["Finish the project himself", "Keep her updated on progress", "Contact the client", "Extend the deadline"],
    correct: 1, explanation: "ผู้หญิงขอให้อัปเดตความคืบหน้าให้เธอทราบอย่างต่อเนื่อง",
  },
];
