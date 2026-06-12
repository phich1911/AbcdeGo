"use client";

export type UserProgress = {
  completedLessons: string[];
  xp: number;
  streak: number;
  lastActive: string;
};

const KEY = "abcdego_progress";

export function getProgress(): UserProgress {
  if (typeof window === "undefined") return defaultProgress();
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : defaultProgress();
  } catch {
    return defaultProgress();
  }
}

function defaultProgress(): UserProgress {
  return { completedLessons: [], xp: 0, streak: 1, lastActive: new Date().toISOString() };
}

export function saveProgress(p: UserProgress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(p));
}

export function completeLesson(lessonId: string, xpReward: number): UserProgress {
  const p = getProgress();
  if (!p.completedLessons.includes(lessonId)) {
    p.completedLessons.push(lessonId);
    p.xp += xpReward;
  }
  p.lastActive = new Date().toISOString();
  saveProgress(p);
  return p;
}

export function isLessonCompleted(lessonId: string): boolean {
  return getProgress().completedLessons.includes(lessonId);
}

export function getCourseProgress(courseId: string, totalLessons: number): number {
  const { completedLessons } = getProgress();
  const done = completedLessons.filter((id) => id.startsWith(courseId)).length;
  if (totalLessons === 0) return 0;
  return Math.round((done / totalLessons) * 100);
}
