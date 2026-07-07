// Contains the exam answer key — must never be imported from a "use client" file.
if (typeof window !== "undefined") {
  throw new Error("lib/exam-data/toeic/part1 must only be imported on the server");
}

import type { ExamQuestion } from "../kp-mock-1";

// TOEIC Part 1 — Photographs. Real CC-licensed photos (downloaded to
// public/toeic/exam/), distinct from the 5 already used in the free TOEIC
// Listening lesson course (public/toeic/).
//   p1-office.jpg       — Brooke Cagle, CC0, Wikimedia Commons (Unsplash)
//   p1-construction.jpg — Paul Keleher, CC BY 2.0, Wikimedia Commons
//   p1-park.jpg         — Bill Branson / National Cancer Institute, public domain, Wikimedia Commons
//   p1-restaurant.jpg   — Kimberlyjocely, CC BY-SA 3.0, Wikimedia Commons
//   p1-warehouse.jpg    — Goterrestrial, CC BY 4.0, Wikimedia Commons
//   p1-trainstation.jpg — Clem Onojeghuo, CC0, Wikimedia Commons (Unsplash)

export const TOEIC_PART1: ExamQuestion[] = [
  {
    id: 1,
    question: "Look at the picture and choose the sentence that best describes it.",
    imageUrl: "/toeic/exam/p1-office.jpg",
    audioScript:
      "Look at the picture marked number 1. (A) The woman is closing her laptop. (B) The woman is typing on a laptop. (C) The woman is talking on the phone. (D) The woman is drinking coffee.",
    choices: [
      "The woman is closing her laptop.",
      "The woman is typing on a laptop.",
      "The woman is talking on the phone.",
      "The woman is drinking coffee.",
    ],
    spokenChoices: true,
    correct: 1,
    explanation: "ภาพแสดงผู้หญิงกำลังพิมพ์งานบนแล็ปท็อป จึงตรงกับ (B) The woman is typing on a laptop.",
  },
  {
    id: 2,
    question: "Look at the picture and choose the sentence that best describes it.",
    imageUrl: "/toeic/exam/p1-construction.jpg",
    audioScript:
      "Look at the picture marked number 2. (A) The workers are painting a wall. (B) The workers are planting trees. (C) The workers are wearing hard hats. (D) The workers are loading a truck.",
    choices: [
      "The workers are painting a wall.",
      "The workers are planting trees.",
      "The workers are wearing hard hats.",
      "The workers are loading a truck.",
    ],
    spokenChoices: true,
    correct: 2,
    explanation: "คนงานในภาพสวมหมวกนิรภัย (hard hats) จึงตรงกับ (C) The workers are wearing hard hats.",
  },
  {
    id: 3,
    question: "Look at the picture and choose the sentence that best describes it.",
    imageUrl: "/toeic/exam/p1-park.jpg",
    audioScript:
      "Look at the picture marked number 3. (A) The couple is sitting on a bench. (B) The couple is walking along a path. (C) The couple is riding bicycles. (D) The couple is having a picnic.",
    choices: [
      "The couple is sitting on a bench.",
      "The couple is walking along a path.",
      "The couple is riding bicycles.",
      "The couple is having a picnic.",
    ],
    spokenChoices: true,
    correct: 1,
    explanation: "ภาพแสดงคู่รักกำลังเดินไปตามทางเดินในสวนสาธารณะ จึงตรงกับ (B) The couple is walking along a path.",
  },
  {
    id: 4,
    question: "Look at the picture and choose the sentence that best describes it.",
    imageUrl: "/toeic/exam/p1-restaurant.jpg",
    audioScript:
      "Look at the picture marked number 4. (A) The people are cooking a meal. (B) The people are washing dishes. (C) The people are sitting at a table. (D) The people are leaving the restaurant.",
    choices: [
      "The people are cooking a meal.",
      "The people are washing dishes.",
      "The people are sitting at a table.",
      "The people are leaving the restaurant.",
    ],
    spokenChoices: true,
    correct: 2,
    explanation: "ภาพแสดงกลุ่มคนนั่งอยู่ที่โต๊ะในร้านอาหาร จึงตรงกับ (C) The people are sitting at a table.",
  },
  {
    id: 5,
    question: "Look at the picture and choose the sentence that best describes it.",
    imageUrl: "/toeic/exam/p1-warehouse.jpg",
    audioScript:
      "Look at the picture marked number 5. (A) The forklift is being repaired. (B) The forklift is loading a container. (C) The forklift is parked outside the building. (D) The worker is sweeping the floor.",
    choices: [
      "The forklift is being repaired.",
      "The forklift is loading a container.",
      "The forklift is parked outside the building.",
      "The worker is sweeping the floor.",
    ],
    spokenChoices: true,
    correct: 1,
    explanation: "ภาพแสดงรถโฟล์กลิฟต์กำลังบรรจุสินค้าเข้าตู้คอนเทนเนอร์ จึงตรงกับ (B) The forklift is loading a container.",
  },
  {
    id: 6,
    question: "Look at the picture and choose the sentence that best describes it.",
    imageUrl: "/toeic/exam/p1-trainstation.jpg",
    audioScript:
      "Look at the picture marked number 6. (A) The traveler is boarding a plane. (B) The traveler is waiting on the platform. (C) The traveler is buying a ticket. (D) The traveler is checking a map.",
    choices: [
      "The traveler is boarding a plane.",
      "The traveler is waiting on the platform.",
      "The traveler is buying a ticket.",
      "The traveler is checking a map.",
    ],
    spokenChoices: true,
    correct: 1,
    explanation: "ภาพแสดงนักเดินทางกำลังรอที่ชานชาลาสถานีรถไฟ จึงตรงกับ (B) The traveler is waiting on the platform.",
  },
];
