"use client";

import { getCloudProgress, saveCloudProgress } from "@/lib/supabase";
import { getLessonsForCourse } from "@/lib/data";

export type UserProgress = {
  completedLessons: string[];
  lessonScores: Record<string, { correct: number; total: number }>;
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
  return { completedLessons: [], lessonScores: {}, xp: 0, streak: 1, lastActive: new Date().toISOString() };
}

export function saveProgress(p: UserProgress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(p));
}

export function completeLesson(lessonId: string, xpReward: number, score?: { correct: number; total: number }): UserProgress {
  const p = getProgress();
  if (!p.lessonScores) p.lessonScores = {};
  if (!p.completedLessons.includes(lessonId)) {
    p.completedLessons.push(lessonId);
    p.xp += xpReward;
  }
  if (score) p.lessonScores[lessonId] = score;
  p.lastActive = new Date().toISOString();
  saveProgress(p);
  return p;
}

export function getLessonScore(lessonId: string): { correct: number; total: number } | null {
  const p = getProgress();
  return p.lessonScores?.[lessonId] ?? null;
}

export function isLessonCompleted(lessonId: string): boolean {
  return getProgress().completedLessons.includes(lessonId);
}

export function getCourseProgress(courseId: string, totalLessons: number): number {
  const { completedLessons } = getProgress();
  const lessonIds = new Set(getLessonsForCourse(courseId).map((l) => l.id));
  const done = completedLessons.filter((id) => lessonIds.has(id)).length;
  if (totalLessons === 0) return 0;
  return Math.round((done / totalLessons) * 100);
}

// Pull from Supabase → merge into localStorage (take highest XP, union lessons)
export async function syncProgressFromCloud(): Promise<void> {
  const cloud = await getCloudProgress();
  if (!cloud) return;
  const local = getProgress();
  const merged: UserProgress = {
    completedLessons: Array.from(new Set([...local.completedLessons, ...cloud.completed_lessons])),
    lessonScores: local.lessonScores ?? {},
    xp: Math.max(local.xp, cloud.xp),
    streak: Math.max(local.streak, cloud.streak),
    lastActive: local.lastActive > cloud.last_active ? local.lastActive : cloud.last_active,
  };
  saveProgress(merged);
}

// Push localStorage → Supabase
export async function pushProgressToCloud(): Promise<void> {
  const p = getProgress();
  await saveCloudProgress({
    completed_lessons: p.completedLessons,
    xp: p.xp,
    streak: p.streak,
    last_active: p.lastActive,
  });
}
