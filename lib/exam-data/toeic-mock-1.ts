// Contains the exam answer key — must never be imported from a "use client" file.
if (typeof window !== "undefined") {
  throw new Error("lib/exam-data/toeic-mock-1 must only be imported on the server");
}

import type { ExamSection, MockExam } from "./kp-mock-1";
import { TOEIC_PART1 } from "./toeic/part1";
import { TOEIC_PART2 } from "./toeic/part2";
import { TOEIC_PART3 } from "./toeic/part3";
import { TOEIC_PART4 } from "./toeic/part4";
import { TOEIC_PART5 } from "./toeic/part5";
import { TOEIC_PART6 } from "./toeic/part6";
import { TOEIC_PART7 } from "./toeic/part7";

// Full-length TOEIC mock exam: Listening (Parts 1-4, 100 Q, ~45 min) +
// Reading (Parts 5-7, 100 Q, ~75 min) = 200 Q, 120 min total. Sections are
// split by official TOEIC Part so practice mode can drill each part
// individually — the exam engine (scoreExam/checkAnswer) is fully generic
// over sections[].questions[], so this needed no engine changes beyond the
// image/audio/spokenChoices fields added to ExamQuestion.
//
// No official TOEIC scaled score (5-495) conversion — this MVP shows raw
// correct/total per part and an overall raw score out of 200.

// passingPercent is unused for display/gating here (scoringMode "toeic"
// replaces pass/fail with a scaled score + proficiency band in the UI) but
// is kept populated since ExamSection requires it and scoreExam still
// computes it internally.
const part1: ExamSection = {
  id: "toeic-p1", title: "Part 1: Photographs", shortTitle: "Part 1", group: "listening",
  questionCount: TOEIC_PART1.length, totalScore: TOEIC_PART1.length, passingPercent: 60, timeRecommended: 6,
  questions: TOEIC_PART1,
};

const part2: ExamSection = {
  id: "toeic-p2", title: "Part 2: Question-Response", shortTitle: "Part 2", group: "listening",
  questionCount: TOEIC_PART2.length, totalScore: TOEIC_PART2.length, passingPercent: 60, timeRecommended: 12,
  questions: TOEIC_PART2,
};

const part3: ExamSection = {
  id: "toeic-p3", title: "Part 3: Conversations", shortTitle: "Part 3", group: "listening",
  questionCount: TOEIC_PART3.length, totalScore: TOEIC_PART3.length, passingPercent: 60, timeRecommended: 15,
  questions: TOEIC_PART3,
};

const part4: ExamSection = {
  id: "toeic-p4", title: "Part 4: Talks", shortTitle: "Part 4", group: "listening",
  questionCount: TOEIC_PART4.length, totalScore: TOEIC_PART4.length, passingPercent: 60, timeRecommended: 12,
  questions: TOEIC_PART4,
};

const part5: ExamSection = {
  id: "toeic-p5", title: "Part 5: Incomplete Sentences", shortTitle: "Part 5", group: "reading",
  questionCount: TOEIC_PART5.length, totalScore: TOEIC_PART5.length, passingPercent: 60, timeRecommended: 20,
  questions: TOEIC_PART5,
};

const part6: ExamSection = {
  id: "toeic-p6", title: "Part 6: Text Completion", shortTitle: "Part 6", group: "reading",
  questionCount: TOEIC_PART6.length, totalScore: TOEIC_PART6.length, passingPercent: 60, timeRecommended: 15,
  questions: TOEIC_PART6,
};

const part7: ExamSection = {
  id: "toeic-p7", title: "Part 7: Reading Comprehension", shortTitle: "Part 7", group: "reading",
  questionCount: TOEIC_PART7.length, totalScore: TOEIC_PART7.length, passingPercent: 60, timeRecommended: 40,
  questions: TOEIC_PART7,
};

export const TOEIC_MOCK_1: MockExam = {
  id: "toeic-mock-1",
  title: "ข้อสอบจำลอง TOEIC ชุดที่ 1",
  totalTime: 120,
  xpReward: 1800,
  rankReward: "ผู้พิชิต TOEIC จำลอง",
  sections: [part1, part2, part3, part4, part5, part6, part7],
  scoringMode: "toeic",
};
