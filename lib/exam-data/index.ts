import { KP_MOCK_1 } from "./kp-mock-1";
import { KP_MOCK_2 } from "./kp-mock-2";
import { TOEIC_MOCK_1 } from "./toeic-mock-1";
import type { ExamSection, MockExam } from "./kp-mock-1";
import type { ExamSectionResult, PublicMockExam } from "./public-types";

export const EXAMS: Record<string, MockExam> = {
  "kp-mock-1": KP_MOCK_1,
  "kp-mock-2": KP_MOCK_2,
  "toeic-mock-1": TOEIC_MOCK_1,
};

export function getExam(id: string): MockExam | undefined {
  return EXAMS[id];
}

export function getPublicExam(id: string): PublicMockExam | undefined {
  const exam = EXAMS[id];
  if (!exam) return undefined;
  return {
    id: exam.id,
    title: exam.title,
    totalTime: exam.totalTime,
    xpReward: exam.xpReward,
    rankReward: exam.rankReward,
    scoringMode: exam.scoringMode,
    sections: exam.sections.map((sec) => ({
      id: sec.id,
      title: sec.title,
      shortTitle: sec.shortTitle,
      questionCount: sec.questionCount,
      totalScore: sec.totalScore,
      passingPercent: sec.passingPercent,
      timeRecommended: sec.timeRecommended,
      group: sec.group,
      questions: sec.questions.map((q) => ({
        id: q.id,
        question: q.question,
        choices: q.choices,
        imageUrl: q.imageUrl,
        audioScript: q.audioScript,
        spokenChoices: q.spokenChoices,
      })),
    })),
  };
}

export function checkAnswer(
  id: string,
  sectionIndex: number,
  questionIndex: number,
  choice: number
): { correct: boolean; correctIndex: number; explanation: string } | undefined {
  const exam = EXAMS[id];
  const section = exam?.sections[sectionIndex];
  const question = section?.questions[questionIndex];
  if (!question) return undefined;
  return {
    correct: choice === question.correct,
    correctIndex: question.correct,
    explanation: question.explanation,
  };
}

// Mirrors the client's activeSections derivation: "full" = all sections,
// a number = a single section by index.
function activeSectionsFor(exam: MockExam, mode: "full" | number): ExamSection[] {
  return mode === "full" ? exam.sections : [exam.sections[mode]].filter((s): s is ExamSection => Boolean(s));
}

export function scoreExam(
  id: string,
  mode: "full" | number,
  answers: Record<number, number>
): { results: ExamSectionResult[]; totalCorrect: number; totalQ: number } | undefined {
  const exam = EXAMS[id];
  if (!exam) return undefined;
  const activeSections = activeSectionsFor(exam, mode);
  if (activeSections.length === 0) return undefined;

  let offset = 0;
  let totalCorrect = 0;
  let totalQ = 0;
  const results: ExamSectionResult[] = activeSections.map((sec) => {
    let correct = 0;
    sec.questions.forEach((q, qi) => {
      if (answers[offset + qi] === q.correct) correct++;
    });
    offset += sec.questions.length;
    totalCorrect += correct;
    totalQ += sec.questionCount;
    const scorePercent = Math.round((correct / sec.questionCount) * 100);
    return {
      sectionId: sec.id,
      title: sec.title,
      shortTitle: sec.shortTitle,
      correct,
      scorePercent,
      passed: scorePercent >= sec.passingPercent,
      totalScore: sec.totalScore,
      questionCount: sec.questionCount,
      passingPercent: sec.passingPercent,
    };
  });

  return { results, totalCorrect, totalQ };
}
