import type { Lesson } from "@/lib/data";

// TOEIC Listening — Parts 1-4. Audio is synthesized client-side via
// lib/tts.ts (Web Speech API), so questions carry a spoken `script` plus
// visible `question`/`choices` for rendering and review after answering.

const SVG_DESK_READING =
  "<svg viewBox='0 0 320 200' xmlns='http://www.w3.org/2000/svg'>" +
  "<rect width='320' height='200' fill='#eef2f7'/>" +
  "<rect x='60' y='130' width='150' height='12' fill='#64748b'/>" +
  "<rect x='70' y='142' width='10' height='40' fill='#64748b'/>" +
  "<rect x='190' y='142' width='10' height='40' fill='#64748b'/>" +
  "<circle cx='135' cy='75' r='20' fill='#1e293b'/>" +
  "<rect x='115' y='95' width='40' height='45' rx='10' fill='#0891b2'/>" +
  "<rect x='118' y='120' width='60' height='30' fill='#ffffff' stroke='#1e293b' stroke-width='2'/>" +
  "<line x1='148' y1='120' x2='148' y2='150' stroke='#1e293b' stroke-width='2'/>" +
  "</svg>";

const SVG_HANDSHAKE =
  "<svg viewBox='0 0 320 200' xmlns='http://www.w3.org/2000/svg'>" +
  "<rect width='320' height='200' fill='#eef2f7'/>" +
  "<circle cx='110' cy='70' r='18' fill='#1e293b'/>" +
  "<rect x='92' y='88' width='36' height='60' rx='10' fill='#0891b2'/>" +
  "<circle cx='210' cy='70' r='18' fill='#1e293b'/>" +
  "<rect x='192' y='88' width='36' height='60' rx='10' fill='#ea580c'/>" +
  "<line x1='128' y1='115' x2='192' y2='115' stroke='#1e293b' stroke-width='6' stroke-linecap='round'/>" +
  "<rect x='60' y='170' width='200' height='10' fill='#94a3b8'/>" +
  "</svg>";

const SVG_WATERING =
  "<svg viewBox='0 0 320 200' xmlns='http://www.w3.org/2000/svg'>" +
  "<rect width='320' height='200' fill='#eef2f7'/>" +
  "<rect x='0' y='170' width='320' height='30' fill='#86efac'/>" +
  "<circle cx='120' cy='70' r='18' fill='#1e293b'/>" +
  "<rect x='102' y='88' width='36' height='70' rx='10' fill='#f472b6'/>" +
  "<rect x='140' y='110' width='40' height='20' rx='4' fill='#0891b2'/>" +
  "<circle cx='230' cy='150' r='14' fill='#16a34a'/>" +
  "<rect x='224' y='150' width='12' height='30' fill='#78350f'/>" +
  "<circle cx='260' cy='140' r='10' fill='#16a34a'/>" +
  "<rect x='255' y='140' width='10' height='40' fill='#78350f'/>" +
  "</svg>";

const SVG_STREET =
  "<svg viewBox='0 0 320 200' xmlns='http://www.w3.org/2000/svg'>" +
  "<rect width='320' height='200' fill='#eef2f7'/>" +
  "<rect x='0' y='140' width='320' height='60' fill='#cbd5e1'/>" +
  "<rect x='30' y='110' width='70' height='35' rx='8' fill='#0891b2'/>" +
  "<circle cx='45' cy='148' r='9' fill='#1e293b'/>" +
  "<circle cx='85' cy='148' r='9' fill='#1e293b'/>" +
  "<rect x='140' y='110' width='70' height='35' rx='8' fill='#ea580c'/>" +
  "<circle cx='155' cy='148' r='9' fill='#1e293b'/>" +
  "<circle cx='195' cy='148' r='9' fill='#1e293b'/>" +
  "<circle cx='260' cy='90' r='16' fill='#16a34a'/>" +
  "<rect x='256' y='90' width='8' height='30' fill='#78350f'/>" +
  "</svg>";

const SVG_MEETING =
  "<svg viewBox='0 0 320 200' xmlns='http://www.w3.org/2000/svg'>" +
  "<rect width='320' height='200' fill='#eef2f7'/>" +
  "<ellipse cx='160' cy='130' rx='90' ry='30' fill='#94a3b8'/>" +
  "<circle cx='100' cy='80' r='14' fill='#1e293b'/>" +
  "<rect x='87' y='94' width='26' height='40' rx='8' fill='#0891b2'/>" +
  "<circle cx='160' cy='70' r='14' fill='#1e293b'/>" +
  "<rect x='147' y='84' width='26' height='40' rx='8' fill='#ea580c'/>" +
  "<circle cx='220' cy='80' r='14' fill='#1e293b'/>" +
  "<rect x='207' y='94' width='26' height='40' rx='8' fill='#16a34a'/>" +
  "</svg>";

export const TOEIC_LESSONS: Lesson[] = [
  {
    id: "toeic-l1",
    courseId: "toeic-listening",
    title: "Part 1: Photographs",
    order: 1,
    xpReward: 90,
    steps: [
      {
        type: "info",
        title: "Part 1: Photographs คืออะไร?",
        content:
          "ในข้อสอบจริงมี 6 ข้อ คุณจะเห็นภาพถ่าย 1 ภาพ แล้วได้ยินประโยคภาษาอังกฤษ 4 ประโยค (A-D) พูดอธิบายภาพนั้น (ไม่มีข้อความให้อ่าน) หน้าที่ของคุณคือเลือกประโยคที่ตรงกับภาพมากที่สุด\n\n► เคล็ดลับ\n• สังเกตคน สถานที่ และการกระทำในภาพก่อนกดฟัง\n• ตัวเลือกที่ผิดมักพูดถึงสิ่งที่ไม่ได้อยู่ในภาพเลย หรือใช้คำคล้ายกันแต่ความหมายต่างกัน\n\nลองฝึกกับ 5 ข้อตัวอย่างด้านล่างนี้ได้เลย!",
      },
      {
        type: "listening",
        part: 1,
        question: "ฟังตัวเลือก A-D แล้วเลือกประโยคที่ตรงกับภาพมากที่สุด",
        script:
          "Look at the picture. (A) The man is writing a letter. (B) The man is reading a book at his desk. (C) The man is sleeping on the desk. (D) The man is standing near the window.",
        imageSvg: SVG_DESK_READING,
        choices: [
          "The man is writing a letter.",
          "The man is reading a book at his desk.",
          "The man is sleeping on the desk.",
          "The man is standing near the window.",
        ],
        spokenChoices: true,
        correct: 1,
        explanation: "ภาพเป็นชายนั่งอ่านหนังสือที่โต๊ะ ตรงกับตัวเลือก (B) เท่านั้น",
      },
      {
        type: "listening",
        part: 1,
        question: "ฟังตัวเลือก A-D แล้วเลือกประโยคที่ตรงกับภาพมากที่สุด",
        script:
          "Look at the picture. (A) The people are shaking hands. (B) The people are eating lunch. (C) The people are arguing loudly. (D) The people are walking outside.",
        imageSvg: SVG_HANDSHAKE,
        choices: [
          "The people are shaking hands.",
          "The people are eating lunch.",
          "The people are arguing loudly.",
          "The people are walking outside.",
        ],
        spokenChoices: true,
        correct: 0,
        explanation: "ภาพเป็นคนสองคนกำลังจับมือกัน ตรงกับตัวเลือก (A)",
      },
      {
        type: "listening",
        part: 1,
        question: "ฟังตัวเลือก A-D แล้วเลือกประโยคที่ตรงกับภาพมากที่สุด",
        script:
          "Look at the picture. (A) The woman is painting a fence. (B) The woman is watering the plants. (C) The woman is riding a bicycle. (D) The woman is reading a newspaper.",
        imageSvg: SVG_WATERING,
        choices: [
          "The woman is painting a fence.",
          "The woman is watering the plants.",
          "The woman is riding a bicycle.",
          "The woman is reading a newspaper.",
        ],
        spokenChoices: true,
        correct: 1,
        explanation: "ภาพเป็นผู้หญิงถือกระป๋องรดน้ำต้นไม้ ตรงกับตัวเลือก (B)",
      },
      {
        type: "listening",
        part: 1,
        question: "ฟังตัวเลือก A-D แล้วเลือกประโยคที่ตรงกับภาพมากที่สุด",
        script:
          "Look at the picture. (A) The cars are parked along the street. (B) The street is empty of vehicles. (C) Workers are repairing the road. (D) The trees have been cut down.",
        imageSvg: SVG_STREET,
        choices: [
          "The cars are parked along the street.",
          "The street is empty of vehicles.",
          "Workers are repairing the road.",
          "The trees have been cut down.",
        ],
        spokenChoices: true,
        correct: 0,
        explanation: "ภาพเป็นรถยนต์จอดเรียงกันริมถนน ตรงกับตัวเลือก (A)",
      },
      {
        type: "listening",
        part: 1,
        question: "ฟังตัวเลือก A-D แล้วเลือกประโยคที่ตรงกับภาพมากที่สุด",
        script:
          "Look at the picture. (A) The people are playing cards. (B) The room is empty. (C) The people are having a meeting around the table. (D) The people are cooking in the kitchen.",
        imageSvg: SVG_MEETING,
        choices: [
          "The people are playing cards.",
          "The room is empty.",
          "The people are having a meeting around the table.",
          "The people are cooking in the kitchen.",
        ],
        spokenChoices: true,
        correct: 2,
        explanation: "ภาพเป็นคนสามคนนั่งล้อมโต๊ะประชุม ตรงกับตัวเลือก (C)",
      },
    ],
  },
  {
    id: "toeic-l2",
    courseId: "toeic-listening",
    title: "Part 2: Question-Response",
    order: 2,
    xpReward: 90,
    steps: [
      {
        type: "info",
        title: "Part 2: Question-Response คืออะไร?",
        content:
          "ในข้อสอบจริงมี 25 ข้อ คุณจะได้ยินคำถามหรือประโยคสั้นๆ 1 ประโยค ตามด้วยตัวเลือกคำตอบ 3 แบบ (A-C) — พาร์ทนี้**ไม่มีข้อความหรือช้อยส์ให้ดูในกระดาษข้อสอบเลย ต้องตั้งใจฟังอย่างเดียว**\n\n► เคล็ดลับ\n• ฟังคำขึ้นต้นประโยคให้ดี (Who, What, When, Where, Why, How) จะช่วยตัดตัวเลือกที่ตอบไม่ตรงคำถามได้ทันที\n• ระวังตัวเลือกที่ใช้คำคล้องจองกับคำถามแต่ตอบคนละเรื่อง\n\nลองฝึกกับ 6 ข้อตัวอย่างด้านล่างนี้ได้เลย!",
      },
      {
        type: "listening",
        part: 2,
        question: "ฟังคำถามและตัวเลือก A-C (ไม่มีข้อความให้อ่าน) แล้วเลือกคำตอบที่เหมาะสมที่สุด",
        script:
          "Where is the nearest bus stop? (A) It's just around the corner. (B) I bought a new car. (C) See you at three o'clock.",
        choices: ["It's just around the corner.", "I bought a new car.", "See you at three o'clock."],
        spokenChoices: true,
        correct: 0,
        explanation: "คำถามถามหาสถานที่ (Where) คำตอบที่ตรงคือ (A) บอกตำแหน่งป้ายรถเมล์",
      },
      {
        type: "listening",
        part: 2,
        question: "ฟังคำถามและตัวเลือก A-C (ไม่มีข้อความให้อ่าน) แล้วเลือกคำตอบที่เหมาะสมที่สุด",
        script:
          "Who's going to lead the meeting tomorrow? (A) It starts at 9 AM. (B) Sarah will lead it. (C) I left it on the table.",
        choices: ["It starts at 9 AM.", "Sarah will lead it.", "I left it on the table."],
        spokenChoices: true,
        correct: 1,
        explanation: "คำถามถามหาบุคคล (Who) คำตอบที่ตรงคือ (B) ระบุชื่อคนที่จะนำประชุม",
      },
      {
        type: "listening",
        part: 2,
        question: "ฟังคำถามและตัวเลือก A-C (ไม่มีข้อความให้อ่าน) แล้วเลือกคำตอบที่เหมาะสมที่สุด",
        script:
          "Could you send me the report by Friday? (A) Sure, no problem. (B) The weather is nice today. (C) I'm from Chicago.",
        choices: ["Sure, no problem.", "The weather is nice today.", "I'm from Chicago."],
        spokenChoices: true,
        correct: 0,
        explanation: "เป็นประโยคขอร้อง (Could you...) คำตอบที่ตรงคือ (A) ตอบรับคำขอ",
      },
      {
        type: "listening",
        part: 2,
        question: "ฟังคำถามและตัวเลือก A-C (ไม่มีข้อความให้อ่าน) แล้วเลือกคำตอบที่เหมาะสมที่สุด",
        script:
          "How long have you worked here? (A) About five years. (B) It's on the second floor. (C) Yes, I'd like some coffee.",
        choices: ["About five years.", "It's on the second floor.", "Yes, I'd like some coffee."],
        spokenChoices: true,
        correct: 0,
        explanation: "คำถามถามระยะเวลา (How long) คำตอบที่ตรงคือ (A) บอกระยะเวลา",
      },
      {
        type: "listening",
        part: 2,
        question: "ฟังคำถามและตัวเลือก A-C (ไม่มีข้อความให้อ่าน) แล้วเลือกคำตอบที่เหมาะสมที่สุด",
        script:
          "Isn't the printer out of paper again? (A) Yes, let me refill it. (B) He's my new colleague. (C) The train leaves at noon.",
        choices: ["Yes, let me refill it.", "He's my new colleague.", "The train leaves at noon."],
        spokenChoices: true,
        correct: 0,
        explanation: "เป็นคำถามเชิงยืนยัน (Isn't...) คำตอบที่ตรงคือ (A) รับทราบและจะจัดการให้",
      },
      {
        type: "listening",
        part: 2,
        question: "ฟังคำถามและตัวเลือก A-C (ไม่มีข้อความให้อ่าน) แล้วเลือกคำตอบที่เหมาะสมที่สุด",
        script:
          "Would you like to join us for lunch? (A) I already ate, thanks. (B) It's a red car. (C) The library closes at eight.",
        choices: ["I already ate, thanks.", "It's a red car.", "The library closes at eight."],
        spokenChoices: true,
        correct: 0,
        explanation: "เป็นคำชวน (Would you like...) คำตอบที่ตรงคือ (A) ตอบเรื่องการกินข้าว",
      },
    ],
  },
  {
    id: "toeic-l3",
    courseId: "toeic-listening",
    title: "Part 3: Conversations",
    order: 3,
    xpReward: 90,
    steps: [
      {
        type: "info",
        title: "Part 3: Conversations คืออะไร?",
        content:
          "ในข้อสอบจริงมี 13 บทสนทนา (39 ข้อ) ฟังบทสนทนาระหว่างคน 2-3 คน แล้วตอบคำถาม 3 ข้อต่อบทสนทนา — คำถามและตัวเลือกคำตอบพิมพ์ให้อ่านได้ในกระดาษข้อสอบ (ต่างจาก Part 2)\n\n► เคล็ดลับ\n• อ่านคำถามทั้ง 3 ข้อล่วงหน้าก่อนฟัง จะรู้ว่าต้องฟังจับประเด็นอะไรบ้าง\n• บทสนทนาจะเล่นแค่ครั้งเดียวในข้อสอบจริง ในแบบฝึกนี้กดฟังซ้ำได้ตามใจ\n\nลองฝึกกับ 2 บทสนทนาด้านล่างนี้ได้เลย!",
      },
      {
        type: "listening",
        part: 3,
        question: "What problem are the speakers discussing?",
        script:
          "Woman: Hi, do you know why the printer on the third floor isn't working? Man: I think it's out of toner. I already called IT support. Woman: Great, did they say when they'd fix it? Man: They said someone would come by this afternoon.",
        choices: ["A broken printer", "A computer virus", "A late delivery", "A canceled meeting"],
        spokenChoices: false,
        correct: 0,
        explanation: "ผู้หญิงถามว่าทำไมเครื่องพิมพ์ถึงใช้งานไม่ได้ — ปัญหาคือเครื่องพิมพ์เสีย",
      },
      {
        type: "listening",
        part: 3,
        question: "What has the man already done?",
        script:
          "Woman: Hi, do you know why the printer on the third floor isn't working? Man: I think it's out of toner. I already called IT support. Woman: Great, did they say when they'd fix it? Man: They said someone would come by this afternoon.",
        choices: ["Fixed the printer himself", "Called IT support", "Bought a new printer", "Sent an email to his boss"],
        spokenChoices: false,
        correct: 1,
        explanation: "ผู้ชายพูดว่า \"I already called IT support\" — เขาโทรแจ้งฝ่าย IT ไปแล้ว",
      },
      {
        type: "listening",
        part: 3,
        question: "When will the problem likely be solved?",
        script:
          "Woman: Hi, do you know why the printer on the third floor isn't working? Man: I think it's out of toner. I already called IT support. Woman: Great, did they say when they'd fix it? Man: They said someone would come by this afternoon.",
        choices: ["Tomorrow morning", "Next week", "This afternoon", "In an hour"],
        spokenChoices: false,
        correct: 2,
        explanation: "ผู้ชายบอกว่า \"They said someone would come by this afternoon\"",
      },
      {
        type: "listening",
        part: 3,
        question: "Why is the woman calling?",
        script:
          "Man: Good afternoon, Bella Italia restaurant. Woman: Hi, I'd like to make a reservation for four people this Saturday at 7 PM. Man: Let me check... I'm sorry, we're fully booked at 7, but I can offer 8:30. Woman: That works for me. Can I get a table near the window?",
        choices: ["To cancel an order", "To ask about a job", "To make a reservation", "To complain about service"],
        spokenChoices: false,
        correct: 2,
        explanation: "ผู้หญิงพูดว่า \"I'd like to make a reservation\" — โทรมาจองโต๊ะ",
      },
      {
        type: "listening",
        part: 3,
        question: "What problem does the man mention?",
        script:
          "Man: Good afternoon, Bella Italia restaurant. Woman: Hi, I'd like to make a reservation for four people this Saturday at 7 PM. Man: Let me check... I'm sorry, we're fully booked at 7, but I can offer 8:30. Woman: That works for me. Can I get a table near the window?",
        choices: ["The restaurant is closed", "The 7 PM slot is fully booked", "The menu has changed", "The kitchen is out of food"],
        spokenChoices: false,
        correct: 1,
        explanation: "ผู้ชายบอกว่า \"we're fully booked at 7\" — ช่วงเวลา 7 โมงเต็มแล้ว",
      },
      {
        type: "listening",
        part: 3,
        question: "What does the woman request?",
        script:
          "Man: Good afternoon, Bella Italia restaurant. Woman: Hi, I'd like to make a reservation for four people this Saturday at 7 PM. Man: Let me check... I'm sorry, we're fully booked at 7, but I can offer 8:30. Woman: That works for me. Can I get a table near the window?",
        choices: ["A table near the window", "A private room", "A discount", "A birthday cake"],
        spokenChoices: false,
        correct: 0,
        explanation: "ผู้หญิงพูดว่า \"Can I get a table near the window?\"",
      },
    ],
  },
  {
    id: "toeic-l4",
    courseId: "toeic-listening",
    title: "Part 4: Talks",
    order: 4,
    xpReward: 90,
    steps: [
      {
        type: "info",
        title: "Part 4: Talks คืออะไร?",
        content:
          "ในข้อสอบจริงมี 10 บทพูดคนเดียว (30 ข้อ) เช่น ประกาศในสนามบิน รายงานสภาพอากาศ หรือข้อความเสียงฝากไว้ ฟังแล้วตอบคำถาม 3 ข้อต่อบทพูด — คำถามและตัวเลือกคำตอบพิมพ์ให้อ่านได้เหมือน Part 3\n\n► เคล็ดลับ\n• ฟังหาใจความสำคัญตอนต้นเรื่อง (ใคร ทำอะไร ที่ไหน) มักเป็นคำตอบข้อแรกเสมอ\n• รายละเอียดตัวเลข เวลา และสถานที่ มักถูกถามในข้อถัดไป\n\nลองฝึกกับ 2 บทพูดด้านล่างนี้ได้เลย!",
      },
      {
        type: "listening",
        part: 4,
        question: "What is the announcement about?",
        script:
          "Attention passengers. Flight 205 to New York has been delayed due to bad weather. The new departure time is 3:45 PM. Passengers may wait at Gate 12. We apologize for the inconvenience and thank you for your patience.",
        choices: ["A flight delay", "A gate change only", "A lost baggage claim", "A ticket price increase"],
        spokenChoices: false,
        correct: 0,
        explanation: "ประกาศเริ่มด้วย \"Flight 205 ... has been delayed\" — เรื่องเที่ยวบินล่าช้า",
      },
      {
        type: "listening",
        part: 4,
        question: "Why was the flight delayed?",
        script:
          "Attention passengers. Flight 205 to New York has been delayed due to bad weather. The new departure time is 3:45 PM. Passengers may wait at Gate 12. We apologize for the inconvenience and thank you for your patience.",
        choices: ["Mechanical problems", "Bad weather", "A staff shortage", "A security issue"],
        spokenChoices: false,
        correct: 1,
        explanation: "ประกาศระบุว่า \"delayed due to bad weather\"",
      },
      {
        type: "listening",
        part: 4,
        question: "Where should passengers wait?",
        script:
          "Attention passengers. Flight 205 to New York has been delayed due to bad weather. The new departure time is 3:45 PM. Passengers may wait at Gate 12. We apologize for the inconvenience and thank you for your patience.",
        choices: ["Gate 5", "Gate 12", "The baggage claim", "The check-in counter"],
        spokenChoices: false,
        correct: 1,
        explanation: "ประกาศระบุว่า \"Passengers may wait at Gate 12\"",
      },
      {
        type: "listening",
        part: 4,
        question: "What will the weather be like in the morning?",
        script:
          "Good morning, here is today's weather forecast. It will be sunny in the morning with temperatures around 25 degrees. However, we expect rain in the afternoon, so please bring an umbrella if you're heading out later. Tomorrow will be cooler with clear skies.",
        choices: ["Rainy", "Sunny", "Snowy", "Windy"],
        spokenChoices: false,
        correct: 1,
        explanation: "บทพูดระบุว่า \"sunny in the morning\"",
      },
      {
        type: "listening",
        part: 4,
        question: "What should people bring for the afternoon?",
        script:
          "Good morning, here is today's weather forecast. It will be sunny in the morning with temperatures around 25 degrees. However, we expect rain in the afternoon, so please bring an umbrella if you're heading out later. Tomorrow will be cooler with clear skies.",
        choices: ["Sunglasses", "A jacket", "An umbrella", "A hat"],
        spokenChoices: false,
        correct: 2,
        explanation: "บทพูดแนะนำว่า \"please bring an umbrella\"",
      },
      {
        type: "listening",
        part: 4,
        question: "How will the weather be tomorrow?",
        script:
          "Good morning, here is today's weather forecast. It will be sunny in the morning with temperatures around 25 degrees. However, we expect rain in the afternoon, so please bring an umbrella if you're heading out later. Tomorrow will be cooler with clear skies.",
        choices: ["Hot and humid", "Cooler with clear skies", "Stormy", "Same as today"],
        spokenChoices: false,
        correct: 1,
        explanation: "บทพูดปิดท้ายว่า \"Tomorrow will be cooler with clear skies\"",
      },
    ],
  },
];
