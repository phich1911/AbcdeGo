const BLOCKED = [
  // Thai profanity
  "สัตว์", "ควาย", "หมา", "หน้าหี", "หี", "สวะ", "เหี้ย", "อีสัตว์", "อีควาย", "อีหมา",
  "มึง", "กู", "เย็ด", "สัส", "แม่ง", "ไอ้สัตว์", "ไอ้ควาย", "ไอ้หมา", "ไอ้เหี้ย",
  "หน้าหมา", "ชิบหาย", "ฉิบหาย", "บ้าหี", "อีดอก", "อีตัว", "หน้าตัวเมีย",
  "เชี่ย", "ชาติชั่ว", "อีโง่", "ไอ้โง่", "ระยำ", "ตอแหล", "ไอ้ตอแหล",
  // English profanity
  "fuck", "shit", "bitch", "asshole", "bastard", "dick", "pussy", "cunt",
  "cock", "whore", "slut", "nigger", "faggot", "retard",
  // Inappropriate impersonation
  "admin", "moderator", "staff", "support", "abcdego",
];

export function containsProfanity(text: string): boolean {
  const lower = text.toLowerCase().replace(/\s+/g, "");
  return BLOCKED.some((word) => lower.includes(word.toLowerCase()));
}
