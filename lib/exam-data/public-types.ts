// Types only — safe to import from client components. Never re-export the
// data modules (kp-mock-1.ts / kp-mock-2.ts) from a client file; those carry
// the answer key and are guarded to throw if imported in the browser.

export interface PublicExamQuestion {
  id: number;
  question: string;
  choices: string[];
}

export interface PublicExamSection {
  id: string;
  title: string;
  shortTitle: string;
  questionCount: number;
  totalScore: number;
  passingPercent: number;
  timeRecommended: number;
  questions: PublicExamQuestion[];
}

export interface PublicMockExam {
  id: string;
  title: string;
  totalTime: number;
  xpReward: number;
  rankReward: string;
  sections: PublicExamSection[];
}

export interface ExamSectionResult {
  sectionId: string;
  title: string;
  shortTitle: string;
  correct: number;
  scorePercent: number;
  passed: boolean;
  totalScore: number;
  questionCount: number;
  passingPercent: number;
}

export interface ExamSubmitResult {
  results: ExamSectionResult[];
  totalCorrect: number;
  totalQ: number;
}
