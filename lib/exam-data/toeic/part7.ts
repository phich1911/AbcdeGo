// Contains the exam answer key — must never be imported from a "use client" file.
if (typeof window !== "undefined") {
  throw new Error("lib/exam-data/toeic/part7 must only be imported on the server");
}

import type { ExamQuestion } from "../kp-mock-1";

// TOEIC Part 7 — Reading Comprehension. 10 single passages (29 questions)
// + 5 multi-passage sets (2 double-passage, 3 triple-passage, 25 questions).
// Following the kp-mock-1.ts precedent: full passage(s) embedded in the
// first question of each group, follow-ups reference back instead of
// repeating the text.

// ── Single passages ──────────────────────────────────────────────────────

const P1_JOB_POSTING =
  "Job Posting: Marketing Coordinator — Bright Horizon Inc.\n\n" +
  "Bright Horizon Inc. is seeking a Marketing Coordinator to join our growing team. The ideal candidate has at least two years of experience in digital marketing and strong writing skills. " +
  "Responsibilities include managing our social media accounts, writing newsletters, and assisting with event planning. " +
  "Interested candidates should submit a resume and cover letter to careers@brighthorizon.com by August 15th. Only shortlisted candidates will be contacted for an interview.";

const P2_GYM_AD =
  "GreenLeaf Fitness Center — Summer Membership Special\n\n" +
  "Join GreenLeaf Fitness Center this summer and save! New members who sign up before July 31st will receive 20% off their first three months, plus a free personal training session. " +
  "Our facility includes a swimming pool, group fitness classes, and modern weight-training equipment. " +
  "To sign up, visit our front desk or register online at greenleaffitness.com. Membership includes access to all three of our locations.";

const P3_OFFICE_HOURS_MEMO =
  "Memo\nTo: All Staff\nFrom: Office of the General Manager\nSubject: Change in Office Hours\n\n" +
  "Starting next Monday, our office hours will change from 9:00 a.m.–5:00 p.m. to 8:00 a.m.–4:00 p.m. This change is being made to better accommodate our clients in different time zones. " +
  "All staff are expected to adjust their schedules accordingly. Employees who need a different arrangement should speak with their supervisor by the end of this week.";

const P4_BAKERY_ARTICLE =
  "Local Bakery Expands to Second Location\n\n" +
  "Sweet Cart Bakery, a popular local business known for its sourdough bread and pastries, announced this week that it will open a second location downtown next month. " +
  "Owner Maria Chen said the expansion comes after two years of steady growth and strong customer demand. " +
  "The new location will offer the same menu as the original store, along with a small seating area for customers who want to enjoy their pastries on-site.";

const P5_COFFEE_MACHINE_MANUAL =
  "Quick Start Guide: BrewMaster 3000 Coffee Machine\n\n" +
  "1. Fill the water tank to the marked line. 2. Insert a coffee pod into the pod holder and close the lid firmly. 3. Press the power button and wait for the light to turn green. " +
  "4. Place a cup under the spout and press the brew button.\n\n" +
  "Warning: Do not open the pod holder while the machine is brewing. If the machine does not turn on, check that it is properly plugged in before contacting customer support.";

const P6_CHARITY_RUN_FLYER =
  "Annual Riverside Charity Run\n\n" +
  "Join us for the 10th Annual Riverside Charity Run on September 20th! All proceeds will support the local children's hospital. " +
  "Registration fee is $25 for the 5K and $35 for the 10K, and includes a T-shirt and finisher's medal. " +
  "Early registration ends September 10th; after that date, the fee increases by $10. Register online at riversiderun.org or in person at the community center.";

const P7_COMPLAINT_LETTER =
  "Dear Customer Service Team,\n\n" +
  "I am writing to express my disappointment with a blender I purchased from your store last month. After only two weeks of light use, the motor stopped working entirely. " +
  "I have attached a copy of my receipt as proof of purchase. Given that the product is still under warranty, I would like to request a full refund or a replacement unit. " +
  "I look forward to your prompt response.\n\nSincerely,\nJordan Lee";

const P8_MEETING_AGENDA =
  "Quarterly Sales Meeting — Agenda\nDate: Thursday, 10:00 a.m.–12:00 p.m.\n\n" +
  "10:00–10:15 — Welcome and opening remarks (Sales Director)\n" +
  "10:15–11:00 — Q3 sales performance review (Regional Managers)\n" +
  "11:00–11:45 — New product launch strategy (Marketing Team)\n" +
  "11:45–12:00 — Q&A and closing remarks\n\n" +
  "Please arrive ten minutes early to collect your printed materials at the registration table.";

const P9_REMOTE_WORK_POLICY =
  "Remote Work Policy — Summary\n\n" +
  "Employees who have completed at least six months of employment are eligible to apply for remote work arrangements. " +
  "Approved employees may work remotely up to three days per week, but must be present in the office on Tuesdays and Thursdays for team meetings. " +
  "All remote work requests must be submitted to and approved by the employee's direct supervisor at least two weeks in advance.";

const P10_BLENDER_REVIEW =
  "Product Review: PowerBlend X500\n\n" +
  "I was skeptical at first, but this blender exceeded my expectations. It crushes ice smoothly and the motor is much quieter than my old blender. " +
  "The only downside is that the pitcher is a bit small for large families. Overall, I would definitely recommend it to anyone looking for a reliable, affordable blender.";

export const TOEIC_PART7_SINGLE: ExamQuestion[] = [
  // 1. Job posting (3 questions)
  {
    id: 147, question: P1_JOB_POSTING,
    choices: ["One year of marketing experience", "Two years of digital marketing experience", "A degree in business", "Five years of management experience"],
    correct: 1, explanation: "ประกาศระบุว่าต้องการผู้สมัครที่มีประสบการณ์ด้านการตลาดดิจิทัลอย่างน้อยสองปี",
  },
  {
    id: 148, question: "จากประกาศงานเดิม (ข้อ 147): เมื่อไหร่คือกำหนดส่งใบสมัคร?",
    choices: ["July 15th", "August 15th", "September 15th", "There is no deadline"],
    correct: 1, explanation: "ต้องส่งใบสมัครภายในวันที่ 15 สิงหาคม",
  },
  {
    id: 149, question: "จากประกาศงานเดิม (ข้อ 147): ผู้สมัครที่ผ่านการคัดเลือกจะได้รับอะไร?",
    choices: ["An automatic offer", "A phone call within a day", "An interview invitation", "A written test"],
    correct: 2, explanation: "มีเพียงผู้สมัครที่ผ่านการคัดเลือกเบื้องต้นเท่านั้นที่จะได้รับการติดต่อให้สัมภาษณ์",
  },

  // 2. Gym ad (3 questions)
  {
    id: 150, question: P2_GYM_AD,
    choices: ["A free gym bag", "20% off the first three months", "A free water bottle", "Half-price membership for a year"],
    correct: 1, explanation: "สมาชิกใหม่ที่สมัครก่อนวันที่ 31 กรกฎาคมจะได้ส่วนลด 20% ในสามเดือนแรก",
  },
  {
    id: 151, question: "จากโฆษณาเดิม (ข้อ 150): ต้องสมัครก่อนวันใดจึงจะได้รับส่วนลด?",
    choices: ["June 30th", "July 31st", "August 31st", "There is no deadline"],
    correct: 1, explanation: "ต้องสมัครก่อนวันที่ 31 กรกฎาคม",
  },
  {
    id: 152, question: "จากโฆษณาเดิม (ข้อ 150): สมาชิกภาพนี้ครอบคลุมอะไร?",
    choices: ["Only one location", "All three locations", "Online classes only", "Personal training only"],
    correct: 1, explanation: "สมาชิกภาพครอบคลุมทั้งสามสาขา",
  },

  // 3. Office hours memo (3 questions)
  {
    id: 153, question: P3_OFFICE_HOURS_MEMO,
    choices: ["To announce a new manager", "To announce a change in office hours", "To announce a holiday schedule", "To announce a new office location"],
    correct: 1, explanation: "บันทึกฉบับนี้ประกาศเปลี่ยนแปลงเวลาทำการของสำนักงาน",
  },
  {
    id: 154, question: "จากบันทึกเดิม (ข้อ 153): เวลาทำการใหม่คือช่วงใด?",
    choices: ["9:00 a.m.–5:00 p.m.", "8:00 a.m.–4:00 p.m.", "7:00 a.m.–3:00 p.m.", "10:00 a.m.–6:00 p.m."],
    correct: 1, explanation: "เวลาทำการใหม่คือ 8:00 น. ถึง 16:00 น.",
  },
  {
    id: 155, question: "จากบันทึกเดิม (ข้อ 153): พนักงานที่ต้องการเวลาทำงานแบบอื่นควรทำอย่างไร?",
    choices: ["Ignore the memo", "Talk to their supervisor by the end of the week", "Submit a form to HR", "Wait until next month"],
    correct: 1, explanation: "ต้องพูดคุยกับหัวหน้างานภายในสิ้นสัปดาห์นี้",
  },

  // 4. Bakery article (3 questions)
  {
    id: 156, question: P4_BAKERY_ARTICLE,
    choices: ["A bakery is closing", "A bakery is opening a second location", "A bakery is changing its menu", "A bakery won an award"],
    correct: 1, explanation: "บทความพูดถึงร้านเบเกอรี่ที่กำลังจะเปิดสาขาที่สอง",
  },
  {
    id: 157, question: "จากบทความเดิม (ข้อ 156): เจ้าของร้านให้เหตุผลอะไรสำหรับการขยายกิจการ?",
    choices: ["A new investor", "Two years of steady growth", "Government support", "A change in ownership"],
    correct: 1, explanation: "เจ้าของร้านกล่าวว่ามาจากการเติบโตอย่างต่อเนื่องสองปี",
  },
  {
    id: 158, question: "จากบทความเดิม (ข้อ 156): สาขาใหม่จะมีอะไรเพิ่มเติม?",
    choices: ["A larger kitchen", "A seating area", "A drive-through", "A parking lot"],
    correct: 1, explanation: "สาขาใหม่จะมีพื้นที่นั่งเล็กๆ ให้ลูกค้า",
  },

  // 5. Coffee machine manual (3 questions)
  {
    id: 159, question: P5_COFFEE_MACHINE_MANUAL,
    choices: ["Fill the water tank", "Insert a coffee pod", "Press the power button", "Place a cup under the spout"],
    correct: 0, explanation: "ขั้นตอนแรกคือเติมน้ำในถังให้ถึงขีดที่กำหนด",
  },
  {
    id: 160, question: "จากคู่มือเดิม (ข้อ 159): ควรทำอย่างไรหากเครื่องไม่ติด?",
    choices: ["Open the pod holder", "Check that it is properly plugged in", "Add more water", "Restart the whole process"],
    correct: 1, explanation: "หากเครื่องไม่ติด ควรตรวจสอบว่าเสียบปลั๊กเรียบร้อยก่อนติดต่อฝ่ายบริการลูกค้า",
  },
  {
    id: 161, question: "จากคู่มือเดิม (ข้อ 159): คำเตือนในคู่มือเกี่ยวกับอะไร?",
    choices: ["Not opening the pod holder while brewing", "Not using tap water", "Not touching the spout", "Not leaving the machine on overnight"],
    correct: 0, explanation: "ห้ามเปิดที่ใส่แคปซูลกาแฟขณะกำลังชง",
  },

  // 6. Charity run flyer (3 questions)
  {
    id: 162, question: P6_CHARITY_RUN_FLYER,
    choices: ["A local school", "A children's hospital", "An animal shelter", "A public library"],
    correct: 1, explanation: "รายได้ทั้งหมดจะมอบให้โรงพยาบาลเด็กในท้องถิ่น",
  },
  {
    id: 163, question: "จากใบปลิวเดิม (ข้อ 162): ค่าลงทะเบียนวิ่ง 5K คือเท่าไหร่?",
    choices: ["$15", "$25", "$35", "$45"],
    correct: 1, explanation: "ค่าลงทะเบียนวิ่ง 5K คือ 25 ดอลลาร์",
  },
  {
    id: 164, question: "จากใบปลิวเดิม (ข้อ 162): จะเกิดอะไรขึ้นหากลงทะเบียนหลังวันที่ 10 กันยายน?",
    choices: ["Registration closes", "The fee increases by $10", "A discount is applied", "Only the 10K is available"],
    correct: 1, explanation: "หากลงทะเบียนหลังวันที่ 10 กันยายน ค่าธรรมเนียมจะเพิ่มขึ้น 10 ดอลลาร์",
  },

  // 7. Complaint letter (3 questions)
  {
    id: 165, question: P7_COMPLAINT_LETTER,
    choices: ["A missing item", "A defective blender", "A billing error", "A late delivery"],
    correct: 1, explanation: "ผู้เขียนบ่นเกี่ยวกับเครื่องปั่นที่มอเตอร์เสีย",
  },
  {
    id: 166, question: "จากจดหมายเดิม (ข้อ 165): ผู้เขียนแนบเอกสารอะไรมาด้วย?",
    choices: ["A warranty card", "A copy of the receipt", "A photo of the product", "A repair estimate"],
    correct: 1, explanation: "ผู้เขียนแนบสำเนาใบเสร็จมาเป็นหลักฐาน",
  },
  {
    id: 167, question: "จากจดหมายเดิม (ข้อ 165): ผู้เขียนต้องการอะไร?",
    choices: ["An apology only", "A full refund or replacement", "Store credit only", "A discount coupon"],
    correct: 1, explanation: "ผู้เขียนขอคืนเงินเต็มจำนวนหรือเปลี่ยนสินค้าใหม่",
  },

  // 8. Meeting agenda (3 questions)
  {
    id: 168, question: P8_MEETING_AGENDA,
    choices: ["Q&A session", "Welcome and opening remarks", "Sales performance review", "Product launch strategy"],
    correct: 1, explanation: "หัวข้อแรกของวาระการประชุมคือการกล่าวต้อนรับและเปิดงาน",
  },
  {
    id: 169, question: "จากวาระการประชุมเดิม (ข้อ 168): ใครเป็นผู้นำเสนอเรื่องกลยุทธ์การเปิดตัวผลิตภัณฑ์ใหม่?",
    choices: ["Sales Director", "Regional Managers", "Marketing Team", "Customer Service"],
    correct: 2, explanation: "ทีมการตลาดเป็นผู้นำเสนอกลยุทธ์การเปิดตัวผลิตภัณฑ์ใหม่",
  },
  {
    id: 170, question: "จากวาระการประชุมเดิม (ข้อ 168): ผู้เข้าร่วมควรมาถึงกี่นาทีก่อนเวลาเริ่ม?",
    choices: ["Five minutes", "Ten minutes", "Fifteen minutes", "Thirty minutes"],
    correct: 1, explanation: "ควรมาถึงก่อนสิบนาทีเพื่อรับเอกสารที่โต๊ะลงทะเบียน",
  },

  // 9. Remote work policy (3 questions)
  {
    id: 171, question: P9_REMOTE_WORK_POLICY,
    choices: ["Three months", "Six months", "One year", "Two years"],
    correct: 1, explanation: "พนักงานต้องทำงานมาอย่างน้อยหกเดือนจึงจะมีสิทธิ์สมัคร",
  },
  {
    id: 172, question: "จากนโยบายเดิม (ข้อ 171): พนักงานที่ได้รับอนุมัติต้องเข้าออฟฟิศวันใด?",
    choices: ["Mondays and Wednesdays", "Tuesdays and Thursdays", "Fridays only", "Every day"],
    correct: 1, explanation: "ต้องเข้าออฟฟิศวันอังคารและพฤหัสบดีเพื่อประชุมทีม",
  },
  {
    id: 173, question: "จากนโยบายเดิม (ข้อ 171): คำขอทำงานทางไกลต้องส่งล่วงหน้ากี่สัปดาห์?",
    choices: ["One week", "Two weeks", "One month", "No advance notice needed"],
    correct: 1, explanation: "ต้องส่งคำขอล่วงหน้าอย่างน้อยสองสัปดาห์",
  },

  // 10. Blender review (2 questions)
  {
    id: 174, question: P10_BLENDER_REVIEW,
    choices: ["Disappointed", "Skeptical but ultimately impressed", "Angry", "Indifferent"],
    correct: 1, explanation: "ผู้เขียนเริ่มต้นด้วยความสงสัยแต่สุดท้ายประทับใจมาก",
  },
  {
    id: 175, question: "จากรีวิวเดิม (ข้อ 174): ข้อเสียเพียงอย่างเดียวที่กล่าวถึงคืออะไร?",
    choices: ["It is too loud", "The pitcher is too small", "It is too expensive", "It doesn't crush ice well"],
    correct: 1, explanation: "ข้อเสียเดียวที่กล่าวถึงคือเหยือกเล็กเกินไปสำหรับครอบครัวใหญ่",
  },
];

// ── Double-passage sets (2 sets × 5 questions = 10) ──────────────────────

const D1_EMAIL_1 =
  "From: Chris Tanaka\nTo: HR Department\nSubject: Follow-up on Application\n\n" +
  "Dear HR Team,\n\nI submitted my application for the Graphic Designer position two weeks ago and wanted to follow up on its status. " +
  "I remain very interested in the role and would welcome the opportunity to discuss my portfolio further. Please let me know if you need any additional materials.\n\nBest regards,\nChris Tanaka";

const D1_EMAIL_2 =
  "From: HR Department\nTo: Chris Tanaka\nSubject: Re: Follow-up on Application\n\n" +
  "Dear Mr. Tanaka,\n\nThank you for your patience. We are pleased to inform you that you have been selected for an interview. " +
  "Please come to our office next Tuesday at 2:00 p.m. and bring a printed copy of your portfolio. " +
  "If this time does not work for you, please reply to arrange an alternative.\n\nBest regards,\nHR Department";

const D2_ADVERTISEMENT =
  "TechZone Electronics — Weekend Sale\n\n" +
  "This weekend only, save 15% on all laptops and 25% on all headphones at TechZone Electronics. " +
  "Additionally, any customer who spends over $200 will receive a free wireless mouse. " +
  "This offer is valid in-store only and cannot be combined with other promotions. Visit us at 45 Market Street.";

const D2_EMAIL_INQUIRY =
  "From: Priya Nair\nTo: TechZone Electronics\nSubject: Question about the Weekend Sale\n\n" +
  "Hello,\n\nI saw your advertisement for the weekend sale and I'm interested in buying a laptop and a pair of headphones. " +
  "If I spend $250 total, will I receive the free wireless mouse as well as both discounts? " +
  "Also, is the sale available online, or only at your physical store?\n\nThank you,\nPriya Nair";

export const TOEIC_PART7_DOUBLE: ExamQuestion[] = [
  // Set A — job application follow-up (email + reply)
  {
    id: 176, question: `${D1_EMAIL_1}\n\n---\n\n${D1_EMAIL_2}`,
    choices: ["To request a raise", "To follow up on a job application", "To resign from a position", "To request time off"],
    correct: 1, explanation: "อีเมลแรกเป็นการติดตามผลใบสมัครงาน",
  },
  {
    id: 177, question: "จากอีเมลเดิม (ข้อ 176): Chris ส่งใบสมัครมานานเท่าไหร่แล้วก่อนติดตามผล?",
    choices: ["One week", "Two weeks", "One month", "Three months"],
    correct: 1, explanation: "Chris ระบุว่าส่งใบสมัครไปแล้วสองสัปดาห์",
  },
  {
    id: 178, question: "จากอีเมลเดิม (ข้อ 176): ผลลัพธ์ของการติดตามคืออะไร?",
    choices: ["He was rejected", "He was selected for an interview", "He withdrew his application", "He needs to resubmit his resume"],
    correct: 1, explanation: "ฝ่ายบุคคลแจ้งว่าเขาได้รับเลือกให้สัมภาษณ์",
  },
  {
    id: 179, question: "จากอีเมลเดิม (ข้อ 176): Chris ควรนำอะไรมาในวันสัมภาษณ์?",
    choices: ["A printed portfolio", "A reference letter", "A cover letter", "His resume only"],
    correct: 0, explanation: "ฝ่ายบุคคลขอให้นำแฟ้มผลงานที่พิมพ์มาด้วย",
  },
  {
    id: 180, question: "จากอีเมลเดิม (ข้อ 176): Chris ควรทำอย่างไรหากเวลานัดหมายไม่สะดวก?",
    choices: ["Ignore the email", "Reply to arrange another time", "Cancel the interview", "Call the office immediately"],
    correct: 1, explanation: "หากเวลานัดหมายไม่สะดวก ให้ตอบกลับอีเมลเพื่อนัดเวลาใหม่",
  },

  // Set B — weekend sale ad + customer inquiry
  {
    id: 181, question: `${D2_ADVERTISEMENT}\n\n---\n\n${D2_EMAIL_INQUIRY}`,
    choices: ["10%", "15%", "25%", "50%"],
    correct: 1, explanation: "โฆษณาระบุว่าลด 15% สำหรับแล็ปท็อปทั้งหมด",
  },
  {
    id: 182, question: "จากโฆษณาเดิม (ข้อ 181): ลูกค้าต้องใช้จ่ายเท่าไหร่จึงจะได้เมาส์ไร้สายฟรี?",
    choices: ["$100", "$150", "$200", "$300"],
    correct: 2, explanation: "ต้องใช้จ่ายเกิน 200 ดอลลาร์จึงจะได้เมาส์ไร้สายฟรี",
  },
  {
    id: 183, question: "จากอีเมลของ Priya (ข้อ 181): เธอวางแผนจะซื้ออะไรบ้าง?",
    choices: ["Only a laptop", "Only headphones", "A laptop and headphones", "A laptop and a mouse"],
    correct: 2, explanation: "เธอสนใจซื้อทั้งแล็ปท็อปและหูฟัง",
  },
  {
    id: 184, question: "จากอีเมลของ Priya (ข้อ 181): เธอถามคำถามเกี่ยวกับเรื่องใด?",
    choices: ["The store's opening hours", "Whether the sale applies online", "The store's return policy", "The warranty period"],
    correct: 1, explanation: "เธอถามว่าโปรโมชั่นนี้ใช้ได้กับการสั่งซื้อออนไลน์หรือไม่",
  },
  {
    id: 185, question: "จากโฆษณาเดิม (ข้อ 181): โปรโมชั่นนี้สามารถใช้ร่วมกับโปรโมชั่นอื่นได้หรือไม่?",
    choices: ["Yes, always", "No, it cannot be combined", "Only for laptops", "Only for online orders"],
    correct: 1, explanation: "โฆษณาระบุชัดเจนว่าไม่สามารถใช้ร่วมกับโปรโมชั่นอื่นได้",
  },
];

// ── Triple-passage sets (3 sets × 5 questions = 15) ───────────────────────

const T1_EMAIL_REQUEST =
  "From: Alex Rivera\nTo: Sunrise Travel Agency\nSubject: Business Trip to Singapore\n\n" +
  "Hello,\n\nI need to arrange a business trip to Singapore from October 10th to October 14th. " +
  "Could you find a direct flight and a hotel near the Marina Bay area? My budget for the hotel is around $150 per night.\n\nThank you,\nAlex Rivera";

const T1_ITINERARY =
  "Sunrise Travel Agency — Proposed Itinerary\n\n" +
  "Flight: Direct flight departing October 10th, 9:00 a.m., returning October 14th, 6:00 p.m.\n" +
  "Hotel: Marina View Hotel, five-minute walk from Marina Bay, $140 per night, includes breakfast.\n" +
  "Additional note: Airport transfer can be added for an extra $30 each way.";

const T1_CONFIRMATION_EMAIL =
  "From: Sunrise Travel Agency\nTo: Alex Rivera\nSubject: Re: Business Trip to Singapore\n\n" +
  "Hello Mr. Rivera,\n\nThank you for approving the proposed itinerary. Your flight and hotel have been booked and confirmed. " +
  "I have also added the airport transfer as you requested in your phone call this morning. " +
  "Your confirmation number is SG-7734. Please let us know if you need any further assistance.\n\nBest regards,\nSunrise Travel Agency";

const T2_MEMO_PRICE =
  "Memo\nTo: Sales Team\nFrom: Pricing Department\nSubject: Updated Price List\n\n" +
  "Please find attached the updated price list effective next month. The price of Model A will increase from $50 to $55, " +
  "while Model B will decrease from $80 to $75 due to a new manufacturing process. Model C remains unchanged at $120.";

const T2_PRICE_LIST =
  "Updated Price List (Effective Next Month)\n\n" +
  "Model A: $55 (previously $50)\n" +
  "Model B: $75 (previously $80)\n" +
  "Model C: $120 (unchanged)\n" +
  "Model D: $200 (new product, released next month)";

const T2_CUSTOMER_EMAIL =
  "From: Wanida Suk\nTo: Sales Team\nSubject: Question about Model B Pricing\n\n" +
  "Hello,\n\nI noticed that Model B's price is decreasing next month. I'm planning to place a bulk order of fifty units. " +
  "Should I wait until next month to get the lower price, or is there a way to get the new price now?\n\nThank you,\nWanida Suk";

const T3_JOB_AD =
  "Job Posting: Senior Accountant — Delta Finance Group\n\n" +
  "Delta Finance Group is looking for a Senior Accountant with at least five years of experience in corporate accounting. " +
  "Candidates should be proficient in financial reporting software and have strong analytical skills. " +
  "Please send your resume and cover letter to hr@deltafinance.com by the end of the month.";

const T3_COVER_LETTER =
  "Dear Hiring Manager,\n\nI am writing to apply for the Senior Accountant position at Delta Finance Group. " +
  "I have seven years of experience in corporate accounting and am highly skilled in several financial reporting platforms, including the one listed in your posting. " +
  "I have attached my resume for your review and look forward to the opportunity to discuss my qualifications further.\n\nSincerely,\nSamuel Osei";

const T3_INTERVIEW_EMAIL =
  "From: Delta Finance Group HR\nTo: Samuel Osei\nSubject: Interview Invitation\n\n" +
  "Dear Mr. Osei,\n\nThank you for your application. We were impressed by your experience and would like to invite you for an interview next Wednesday at 10:00 a.m. " +
  "Please bring a copy of your certifications. If this time is inconvenient, kindly let us know as soon as possible.\n\nBest regards,\nDelta Finance Group HR";

export const TOEIC_PART7_TRIPLE: ExamQuestion[] = [
  // Set C — travel booking (email + itinerary + confirmation)
  {
    id: 186, question: `${T1_EMAIL_REQUEST}\n\n---\n\n${T1_ITINERARY}\n\n---\n\n${T1_CONFIRMATION_EMAIL}`,
    choices: ["A vacation", "A business trip", "A conference abroad", "A family visit"],
    correct: 1, explanation: "Alex ต้องการเดินทางไปสิงคโปร์เพื่อธุรกิจ",
  },
  {
    id: 187, question: "จากอีเมลเดิม (ข้อ 186): งบประมาณโรงแรมของ Alex คือเท่าไหร่ต่อคืน?",
    choices: ["$100", "$140", "$150", "$200"],
    correct: 2, explanation: "Alex ระบุงบประมาณโรงแรมประมาณ 150 ดอลลาร์ต่อคืน",
  },
  {
    id: 188, question: "จากใบรายการเดิม (ข้อ 186): ราคาโรงแรมที่เสนอคือเท่าไหร่ต่อคืน?",
    choices: ["$120", "$140", "$150", "$160"],
    correct: 1, explanation: "โรงแรม Marina View เสนอราคา 140 ดอลลาร์ต่อคืน ซึ่งต่ำกว่างบที่ตั้งไว้",
  },
  {
    id: 189, question: "จากอีเมลยืนยันเดิม (ข้อ 186): มีการเพิ่มบริการอะไรตามคำขอทางโทรศัพท์?",
    choices: ["A rental car", "Airport transfer", "A tour guide", "Travel insurance"],
    correct: 1, explanation: "บริการรับส่งสนามบินถูกเพิ่มเข้าไปตามที่ขอทางโทรศัพท์",
  },
  {
    id: 190, question: "จากอีเมลยืนยันเดิม (ข้อ 186): หมายเลขยืนยันการจองของ Alex คืออะไร?",
    choices: ["SG-7734", "SG-4477", "SG-7743", "SG-3774"],
    correct: 0, explanation: "หมายเลขยืนยันคือ SG-7734",
  },

  // Set D — pricing memo + price list + customer email
  {
    id: 191, question: `${T2_MEMO_PRICE}\n\n---\n\n${T2_PRICE_LIST}\n\n---\n\n${T2_CUSTOMER_EMAIL}`,
    choices: ["Model A only", "Model B only", "Model A and Model B", "All models"],
    correct: 2, explanation: "บันทึกระบุว่าราคา Model A เพิ่มขึ้น และ Model B ลดลง",
  },
  {
    id: 192, question: "จากบันทึกเดิม (ข้อ 191): ทำไมราคา Model B จึงลดลง?",
    choices: ["Lower demand", "A new manufacturing process", "A pricing error", "Reduced quality"],
    correct: 1, explanation: "ราคา Model B ลดลงเนื่องจากกระบวนการผลิตใหม่",
  },
  {
    id: 193, question: "จากใบราคาเดิม (ข้อ 191): Model D คืออะไร?",
    choices: ["A discontinued product", "A new product releasing next month", "The most expensive existing model", "A model with no price change"],
    correct: 1, explanation: "Model D เป็นสินค้าใหม่ที่จะวางจำหน่ายเดือนหน้า",
  },
  {
    id: 194, question: "จากอีเมลของ Wanida เดิม (ข้อ 191): เธอวางแผนจะสั่งซื้ออะไร?",
    choices: ["Twenty units of Model A", "Fifty units of Model B", "Ten units of Model C", "One hundred units of Model D"],
    correct: 1, explanation: "เธอวางแผนสั่งซื้อ Model B จำนวนห้าสิบชิ้น",
  },
  {
    id: 195, question: "จากใบราคาเดิม (ข้อ 191): ราคาเดิมของ Model B ก่อนปรับคือเท่าไหร่?",
    choices: ["$50", "$55", "$75", "$80"],
    correct: 3, explanation: "ราคาเดิมของ Model B คือ 80 ดอลลาร์ ก่อนลดเหลือ 75 ดอลลาร์",
  },

  // Set E — job ad + cover letter + interview invitation
  {
    id: 196, question: `${T3_JOB_AD}\n\n---\n\n${T3_COVER_LETTER}\n\n---\n\n${T3_INTERVIEW_EMAIL}`,
    choices: ["Three years", "Five years", "Seven years", "Ten years"],
    correct: 1, explanation: "ประกาศงานระบุว่าต้องการผู้มีประสบการณ์อย่างน้อยห้าปี",
  },
  {
    id: 197, question: "จากจดหมายสมัครงานเดิม (ข้อ 196): Samuel มีประสบการณ์กี่ปี?",
    choices: ["Five years", "Six years", "Seven years", "Eight years"],
    correct: 2, explanation: "Samuel ระบุว่ามีประสบการณ์เจ็ดปี ซึ่งมากกว่าเกณฑ์ขั้นต่ำ",
  },
  {
    id: 198, question: "จากประกาศงานเดิม (ข้อ 196): ต้องส่งใบสมัครไปที่ไหน?",
    choices: ["hr@deltafinance.com", "jobs@deltafinance.com", "careers@deltafinance.com", "apply@deltafinance.com"],
    correct: 0, explanation: "ต้องส่งใบสมัครไปที่ hr@deltafinance.com",
  },
  {
    id: 199, question: "จากอีเมลเชิญสัมภาษณ์เดิม (ข้อ 196): Samuel ควรนำอะไรมาในวันสัมภาษณ์?",
    choices: ["A reference letter", "A copy of his certifications", "His university transcript", "A portfolio"],
    correct: 1, explanation: "ฝ่ายบุคคลขอให้นำสำเนาใบรับรองมาด้วย",
  },
  {
    id: 200, question: "จากอีเมลเชิญสัมภาษณ์เดิม (ข้อ 196): หากเวลานัดหมายไม่สะดวก Samuel ควรทำอย่างไร?",
    choices: ["Not respond at all", "Let them know as soon as possible", "Cancel the application", "Ask a friend to attend instead"],
    correct: 1, explanation: "หากเวลาไม่สะดวก ควรแจ้งให้ทราบโดยเร็วที่สุด",
  },
];

export const TOEIC_PART7: ExamQuestion[] = [
  ...TOEIC_PART7_SINGLE,
  ...TOEIC_PART7_DOUBLE,
  ...TOEIC_PART7_TRIPLE,
];
