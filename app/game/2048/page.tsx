"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { saveGameScore, getTopGameScore } from "@/lib/supabase";

type Board = (number | null)[][];

const TILE_COLORS: Record<number, { bg: string; color: string }> = {
  2:    { bg: "#eee4da", color: "#776e65" },
  4:    { bg: "#ede0c8", color: "#776e65" },
  8:    { bg: "#f2b179", color: "#fff" },
  16:   { bg: "#f59563", color: "#fff" },
  32:   { bg: "#f67c5f", color: "#fff" },
  64:   { bg: "#f65e3b", color: "#fff" },
  128:  { bg: "#edcf72", color: "#fff" },
  256:  { bg: "#edcc61", color: "#fff" },
  512:  { bg: "#edc850", color: "#fff" },
  1024: { bg: "#edc53f", color: "#fff" },
  2048: { bg: "#edc22e", color: "#fff" },
};

function emptyBoard(): Board {
  return Array.from({ length: 4 }, () => Array(4).fill(null));
}

function addRandomTile(board: Board): Board {
  const empty: [number, number][] = [];
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++)
      if (!board[r][c]) empty.push([r, c]);
  if (!empty.length) return board;
  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  const next = board.map(row => [...row]);
  next[r][c] = Math.random() < 0.9 ? 2 : 4;
  return next;
}

function slideRow(row: (number | null)[]): { row: (number | null)[]; score: number } {
  const nums = row.filter(Boolean) as number[];
  let score = 0;
  const merged: number[] = [];
  let i = 0;
  while (i < nums.length) {
    if (i + 1 < nums.length && nums[i] === nums[i + 1]) {
      const val = nums[i] * 2;
      merged.push(val);
      score += val;
      i += 2;
    } else {
      merged.push(nums[i]);
      i++;
    }
  }
  while (merged.length < 4) merged.push(0);
  return { row: merged.map(v => v || null), score };
}

function moveLeft(board: Board): { board: Board; score: number; moved: boolean } {
  let score = 0;
  let moved = false;
  const next = board.map(row => {
    const { row: newRow, score: s } = slideRow(row);
    score += s;
    if (newRow.some((v, i) => v !== row[i])) moved = true;
    return newRow;
  });
  return { board: next, score, moved };
}

function rotateRight(board: Board): Board {
  return board[0].map((_, c) => board.map(row => row[c]).reverse());
}

function rotateLeft(board: Board): Board {
  return board[0].map((_, c) => board.map(row => row[row.length - 1 - c]));
}

function move(board: Board, dir: "left" | "right" | "up" | "down"): { board: Board; score: number; moved: boolean } {
  if (dir === "left") return moveLeft(board);
  if (dir === "right") {
    const flipped = board.map(r => [...r].reverse());
    const { board: b, score, moved } = moveLeft(flipped);
    return { board: b.map(r => [...r].reverse()), score, moved };
  }
  if (dir === "up") {
    const rot = rotateLeft(board);
    const { board: b, score, moved } = moveLeft(rot);
    return { board: rotateRight(b), score, moved };
  }
  // down
  const rot = rotateRight(board);
  const { board: b, score, moved } = moveLeft(rot);
  return { board: rotateLeft(b), score, moved };
}

function hasWon(board: Board) {
  return board.some(row => row.some(v => v === 2048));
}

function hasMoves(board: Board) {
  for (const dir of ["left", "right", "up", "down"] as const) {
    if (move(board, dir).moved) return true;
  }
  return false;
}

function newGame() {
  let b = emptyBoard();
  b = addRandomTile(b);
  b = addRandomTile(b);
  return b;
}

export default function Game2048Page() {
  const [board, setBoard] = useState<Board>(() => newGame());
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">("playing");
  const [wonDismissed, setWonDismissed] = useState(false);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const [topScore, setTopScore] = useState<{ display_name: string; score: number } | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    getTopGameScore("2048").then(setTopScore);
  }, []);

  const doMove = useCallback((dir: "left" | "right" | "up" | "down") => {
    setBoard(prev => {
      const { board: next, score: gained, moved } = move(prev, dir);
      if (!moved) return prev;
      const withTile = addRandomTile(next);
      setScore(s => {
        const ns = s + gained;
        setBest(b => {
          const nb = Math.max(b, ns);
          if (nb > b) {
            // Debounce score save — only save if score improved
            if (saveTimer.current) clearTimeout(saveTimer.current);
            saveTimer.current = setTimeout(() => {
              saveGameScore("2048", nb).then(() => getTopGameScore("2048").then(setTopScore));
            }, 1500);
          }
          return nb;
        });
        return ns;
      });
      if (hasWon(withTile)) setGameState("won");
      else if (!hasMoves(withTile)) setGameState("lost");
      return withTile;
    });
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (gameState === "lost") return;
      if (e.key === "ArrowLeft")  { e.preventDefault(); doMove("left"); }
      if (e.key === "ArrowRight") { e.preventDefault(); doMove("right"); }
      if (e.key === "ArrowUp")    { e.preventDefault(); doMove("up"); }
      if (e.key === "ArrowDown")  { e.preventDefault(); doMove("down"); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [doMove, gameState]);

  // Robust mobile swipe — non-passive listeners on the board so preventDefault stops page scroll
  useEffect(() => {
    const el = boardRef.current;
    if (!el) return;
    let start: { x: number; y: number } | null = null;
    const onStart = (e: TouchEvent) => {
      const t = e.touches[0];
      start = { x: t.clientX, y: t.clientY };
    };
    const onMove = (e: TouchEvent) => {
      if (start) e.preventDefault();
    };
    const onEnd = (e: TouchEvent) => {
      if (!start) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      start = null;
      if (Math.abs(dx) < 24 && Math.abs(dy) < 24) return;
      if (Math.abs(dx) > Math.abs(dy)) doMove(dx > 0 ? "right" : "left");
      else doMove(dy > 0 ? "down" : "up");
    };
    el.addEventListener("touchstart", onStart, { passive: false });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd, { passive: false });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
    };
  }, [doMove]);

  function restart() {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    setBoard(newGame());
    setScore(0);
    setGameState("playing");
    setWonDismissed(false);
  }

  const tileFont = (v: number) => v >= 1000 ? 20 : v >= 100 ? 24 : 30;

  return (
    <>
      <main className="flex flex-col items-center pt-20 pb-8 px-4" style={{ minHeight: "100vh" }}>
        <div className="flex items-center gap-4 mb-4">
          <Link href="/game" style={{ color: "var(--text-muted)", fontSize: 13 }}>Games</Link>
          <span style={{ color: "var(--text-muted)" }}>/</span>
          <span style={{ color: "var(--text)", fontWeight: 700 }}>2048</span>
        </div>

        {topScore && (
          <div className="flex items-center gap-2 mb-4 px-4 py-2 rounded-xl" style={{ background: "var(--surface)", border: "1px solid var(--border)", fontSize: 13 }}>
            <span style={{ fontSize: 18 }}>🏆</span>
            <span style={{ color: "var(--text-muted)" }}>Top:</span>
            <span style={{ fontWeight: 700, color: "var(--text)" }}>{topScore.display_name}</span>
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>{topScore.score.toLocaleString()} pts</span>
          </div>
        )}

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: 360, marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 32, fontWeight: 900, color: "var(--text)", letterSpacing: "-1px" }}>2048</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Merge tiles to reach 2048</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ textAlign: "center", background: "var(--surface-2)", borderRadius: 8, padding: "6px 14px" }}>
              <div style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>Score</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: "var(--text)" }}>{score}</div>
            </div>
            <div style={{ textAlign: "center", background: "var(--surface-2)", borderRadius: 8, padding: "6px 14px" }}>
              <div style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>Best</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: "var(--text)" }}>{best}</div>
            </div>
          </div>
        </div>

        {/* Board */}
        <div
          ref={boardRef}
          style={{
            background: "#bbada0",
            borderRadius: 10,
            padding: 8,
            display: "inline-block",
            touchAction: "none",
            userSelect: "none",
            position: "relative",
          }}
        >
          {/* Overlay */}
          {(gameState === "lost" || (gameState === "won" && !wonDismissed)) && (
            <div style={{
              position: "absolute", inset: 0, borderRadius: 10,
              background: gameState === "won" ? "rgba(237,197,60,0.88)" : "rgba(30,20,20,0.75)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              zIndex: 10, gap: 12,
            }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: gameState === "won" ? "#fff" : "#fff" }}>
                {gameState === "won" ? "You reached 2048!" : "Game Over"}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {gameState === "won" && (
                  <button
                    onClick={() => setWonDismissed(true)}
                    style={{ padding: "8px 18px", borderRadius: 8, border: "none", background: "#fff", color: "#b59f3b", fontWeight: 700, cursor: "pointer", fontSize: 14 }}
                  >
                    Keep Going
                  </button>
                )}
                <button
                  onClick={restart}
                  style={{ padding: "8px 18px", borderRadius: 8, border: "none", background: "#776e65", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14 }}
                >
                  New Game
                </button>
              </div>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, var(--cell))", gap: "var(--gap)", ["--cell" as string]: "min(80px, calc((100vw - 88px) / 4))", ["--gap" as string]: "8px" }}>
            {board.flat().map((val, i) => {
              const style = val ? TILE_COLORS[val] || { bg: "#3c3a32", color: "#fff" } : null;
              return (
                <div
                  key={i}
                  style={{
                    width: "var(--cell)", height: "var(--cell)",
                    borderRadius: 6,
                    background: style ? style.bg : "rgba(238,228,218,0.35)",
                    color: style ? style.color : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: val ? `min(${tileFont(val)}px, 8vw)` : 28,
                    fontWeight: 900,
                    transition: "background 0.1s",
                  }}
                >
                  {val || ""}
                </div>
              );
            })}
          </div>
        </div>

        {/* New Game button */}
        <button
          onClick={restart}
          className="flex items-center gap-2 mt-5 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-80"
          style={{ background: "#8f7a66", color: "#fff" }}
        >
          <RotateCcw size={15} />
          New Game
        </button>

        <p className="mt-3 text-xs" style={{ color: "var(--text-muted)" }}>
          Arrow keys or swipe to move tiles
        </p>
      </main>
    </>
  );
}
