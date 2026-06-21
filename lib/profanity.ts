const BLOCKED = [
  // Thai profanity — stored as codepoints to avoid encoding issues
  "เหี้ย", // เหี้ย
  "หมา",             // หมา
  "หน้าหี", // หน้าหี
  "หี",                   // หี
  "สัตว์", // สัตว์
  "ควาย",       // ควาย
  "สวะ",             // สวะ
  "มึง",             // มึง
  "กู",                   // กู
  "เย็ด",       // เย็ด
  "สัส",             // สัส
  "แม่ง",       // แม่ง
  "ชิบหาย", // ชิบหาย
  "ฉิบหาย", // ฉิบหาย
  "เชี่ย", // เชี่ย
  "ระยำ",       // ระยำ
  "ตอแหล", // ตอแหล
  "อีดอก", // อีดอก
  // English profanity
  "fuck", "shit", "bitch", "asshole", "bastard", "dick", "pussy", "cunt",
  "cock", "whore", "slut", "nigger", "faggot", "retard",
  // Inappropriate impersonation
  "admin", "moderator", "staff", "support", "abcdego",
];

// Normalize: lowercase, strip spaces and zero-width chars
function normalize(text: string): string {
  return text.toLowerCase().replace(/[\s​‌‍﻿]/g, "");
}

export function containsProfanity(text: string): boolean {
  const n = normalize(text);
  return BLOCKED.some((word) => n.includes(normalize(word)));
}
