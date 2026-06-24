export type Avatar = { id: string; emoji: string; bg: string };

export const AVATARS: Avatar[] = [
  { id: "cat",     emoji: "🐱", bg: "#f59e0b" },
  { id: "dog",     emoji: "🐶", bg: "#ef4444" },
  { id: "fox",     emoji: "🦊", bg: "#f97316" },
  { id: "bear",    emoji: "🐻", bg: "#92400e" },
  { id: "panda",   emoji: "🐼", bg: "#6b7280" },
  { id: "rabbit",  emoji: "🐰", bg: "#ec4899" },
  { id: "hamster", emoji: "🐹", bg: "#d97706" },
  { id: "frog",    emoji: "🐸", bg: "#16a34a" },
  { id: "penguin", emoji: "🐧", bg: "#0284c7" },
  { id: "owl",     emoji: "🦉", bg: "#7c3aed" },
  { id: "duck",    emoji: "🐥", bg: "#ca8a04" },
  { id: "koala",   emoji: "🐨", bg: "#4b5563" },
  { id: "tiger",   emoji: "🐯", bg: "#b45309" },
  { id: "lion",    emoji: "🦁", bg: "#d97706" },
  { id: "monkey",  emoji: "🐵", bg: "#92400e" },
  { id: "whale",   emoji: "🐳", bg: "#0369a1" },
  { id: "dino",    emoji: "🦖", bg: "#15803d" },
  { id: "unicorn", emoji: "🦄", bg: "#db2777" },
  { id: "shark",   emoji: "🦈", bg: "#1d4ed8" },
  { id: "crab",    emoji: "🦀", bg: "#dc2626" },
  { id: "turtle",  emoji: "🐢", bg: "#059669" },
  { id: "wolf",    emoji: "🐺", bg: "#6b7280" },
  { id: "parrot",  emoji: "🦜", bg: "#0891b2" },
  { id: "octopus", emoji: "🐙", bg: "#9333ea" },
];

const KEY = "user_avatar";

export function getAvatar(): Avatar {
  if (typeof window === "undefined") return AVATARS[0];
  const id = localStorage.getItem(KEY);
  return AVATARS.find((a) => a.id === id) ?? AVATARS[0];
}

export function saveAvatar(id: string) {
  localStorage.setItem(KEY, id);
}
