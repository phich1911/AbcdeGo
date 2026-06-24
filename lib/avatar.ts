export type Avatar = { id: string; label: string; bg: string };

export const AVATARS: Avatar[] = [
  { id: "cat",     label: "CAT", bg: "#f59e0b" },
  { id: "dog",     label: "DOG", bg: "#ef4444" },
  { id: "fox",     label: "FOX", bg: "#f97316" },
  { id: "bear",    label: "BER", bg: "#92400e" },
  { id: "panda",   label: "PND", bg: "#6b7280" },
  { id: "rabbit",  label: "RBT", bg: "#ec4899" },
  { id: "hamster", label: "HMS", bg: "#d97706" },
  { id: "frog",    label: "FRG", bg: "#16a34a" },
  { id: "penguin", label: "PGN", bg: "#0284c7" },
  { id: "owl",     label: "OWL", bg: "#7c3aed" },
  { id: "duck",    label: "DCK", bg: "#ca8a04" },
  { id: "koala",   label: "KLA", bg: "#4b5563" },
  { id: "tiger",   label: "TGR", bg: "#b45309" },
  { id: "lion",    label: "LIN", bg: "#d97706" },
  { id: "monkey",  label: "MNK", bg: "#92400e" },
  { id: "whale",   label: "WHL", bg: "#0369a1" },
  { id: "dino",    label: "DNO", bg: "#15803d" },
  { id: "unicorn", label: "UNI", bg: "#db2777" },
  { id: "shark",   label: "SHK", bg: "#1d4ed8" },
  { id: "crab",    label: "CRB", bg: "#dc2626" },
  { id: "turtle",  label: "TRT", bg: "#059669" },
  { id: "wolf",    label: "WLF", bg: "#6b7280" },
  { id: "parrot",  label: "PRT", bg: "#0891b2" },
  { id: "octopus", label: "OCT", bg: "#9333ea" },
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
