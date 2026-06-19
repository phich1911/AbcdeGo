"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { saveGameScore, getTopGameScore } from "@/lib/supabase";

const WORDS = [
  "about","above","abuse","actor","acute","admit","adopt","adult","after","again",
  "agent","agree","ahead","alarm","album","alert","alike","alive","alley","allow",
  "alone","along","alter","angel","anger","angle","angry","anime","ankle","annex",
  "apart","apple","apply","arena","argue","arise","armor","army","arose","array",
  "aside","asked","asset","avoid","awake","award","aware","awful","badly","basic",
  "basis","batch","beach","beard","beast","began","begin","being","below","bench",
  "billy","birth","black","blade","blame","bland","blank","blast","blaze","bleed",
  "blend","bless","blind","block","blood","bloom","blown","board","boast","bonus",
  "bound","boxed","brain","brand","brave","bread","break","breed","brick","bride",
  "brief","bring","broad","broke","brook","brown","brush","buddy","build","built",
  "bunch","burst","buyer","cabin","cable","camel","candy","carry","catch","cause",
  "cease","chain","chair","chaos","chart","chase","cheap","check","cheek","cheer",
  "chess","chest","chief","child","china","chips","choir","chose","civil","claim",
  "class","clean","clear","clerk","click","cliff","climb","clock","close","cloud",
  "coach","coast","color","comet","comic","comma","coral","count","cover","craft",
  "crane","crazy","cream","creek","crime","crisp","cross","crowd","crown","cruel",
  "crush","curve","cycle","daily","dance","death","debut","delay","depth","derby",
  "dirty","disco","dizzy","dodge","doubt","dough","draft","drain","drama","drawn",
  "dream","dress","drift","drink","drive","drone","drove","dying","eager","early",
  "earth","eight","elite","empty","enemy","enjoy","enter","entry","equal","error",
  "essay","event","every","exact","exist","extra","faint","faith","false","fame",
  "fancy","fatal","fault","feast","fence","fever","fewer","field","fifth","fifty",
  "fight","final","first","fixed","flame","flash","flask","fleet","flesh","float",
  "flood","floor","flour","fluid","flute","focus","force","forge","forth","forum",
  "found","frame","frank","fraud","fresh","front","frost","froze","fruit","fully",
  "funds","funny","ghost","giant","given","gland","glass","globe","glory","gloom",
  "glove","going","grace","grade","grand","grant","grasp","grass","grave","great",
  "greed","green","greet","grief","grill","grind","groan","gross","group","grove",
  "grown","guard","guess","guest","guide","guild","guilt","habit","happy","harsh",
  "heart","heavy","hence","herbs","hinge","honor","horse","hotel","house","human",
  "humor","hurry","ideal","image","imply","index","indie","inner","input","issue",
  "japan","jewel","joint","joker","judge","juice","juicy","jumbo","keeps","knife",
  "knock","known","labor","lance","large","laser","later","laugh","layer","learn",
  "lease","leave","legal","lemon","level","light","limit","linen","liner","liver",
  "local","logic","loose","lover","lower","lucky","lunar","lunch","lyric","magic",
  "major","maker","manor","maple","march","match","mayor","media","merge","merit",
  "metal","might","minor","minus","mixed","model","money","month","moral","mouse",
  "mouth","moved","movie","music","naive","nerve","never","night","noble","noise",
  "north","noted","novel","nurse","nylon","occur","ocean","offer","often","olive",
  "onset","opera","orbit","order","organ","other","ought","outer","owned","oxide",
  "ozone","paint","panel","paper","peace","pearl","penny","phase","phone","photo",
  "piano","piece","pilot","pitch","pixel","pizza","place","plain","plane","plant",
  "plate","plaza","plead","pluck","plumb","plume","plunge","point","polar","power",
  "press","price","pride","prime","print","prior","prize","probe","prone","proof",
  "prose","proud","prove","psalm","pulse","punch","pupil","queen","quest","queue",
  "quick","quiet","quota","quote","rabbi","radar","radio","raise","rally","ranch",
  "range","rapid","ratio","reach","react","ready","rebel","refer","reign","relax",
  "repay","reply","reset","reuse","rider","ridge","rifle","right","rigid","risky",
  "river","robot","rocky","rouge","rough","round","route","royal","rugby","ruler",
  "rural","saint","salad","sauce","scale","scare","scene","scope","score","scout",
  "serve","seven","shade","shake","shall","shame","shape","share","sharp","sheer",
  "shelf","shell","shift","shine","shirt","shoot","short","shout","sight","silly",
  "since","sixth","sixty","sized","skill","skull","slash","slave","sleep","slice",
  "slide","slope","smart","smell","smile","smoke","snake","solar","solid","solve",
  "sound","south","space","spare","spark","speak","speed","spend","spice","spill",
  "spine","spite","split","spoke","spoon","sport","spray","squad","staff","stage",
  "stake","stale","stall","stand","stark","start","state","stays","steam","steel",
  "steep","steer","stern","stick","still","stock","stomp","stone","stood","store",
  "storm","story","stove","strap","straw","stream","strip","stuck","study","stuff",
  "style","sugar","suite","sunny","super","surge","swamp","swear","sweep","sweet",
  "swept","swift","sword","swore","sworn","table","taunt","teeth","tenor","tense",
  "tenth","texas","thank","theme","there","thick","thing","think","thorn","three",
  "threw","throw","thumb","tiger","tight","timer","tired","title","today","token",
  "topic","total","touch","tough","tower","toxic","track","trade","trail","train",
  "trait","tramp","trick","tried","troop","truck","truly","trump","trunk","trust",
  "truth","tumor","tuner","twist","tying","ultra","uncle","under","union","unity",
  "until","upper","upset","urban","usage","usual","utter","vague","valid","value",
  "valve","video","villa","viral","virus","visit","vista","vital","vivid","vocal",
  "voice","voter","wagon","waste","water","weigh","weird","whale","wheat","wheel",
  "where","which","while","white","whole","whose","wider","witch","woman","women",
  "world","worry","worse","worst","worth","would","wound","wrath","wrist","write",
  "wrote","yacht","yield","young","youth","zebra","zonal"
].filter(w => w.length === 5);

const KEYBOARD_ROWS = [
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L"],
  ["ENTER","Z","X","C","V","B","N","M","BACK"],
];

type LetterState = "correct" | "present" | "absent" | "empty" | "tbd";

function pickWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
}

export default function WordlePage() {
  const [answer, setAnswer] = useState(() => pickWord());
  const [guesses, setGuesses] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">("playing");
  const [shake, setShake] = useState(false);
  const [reveal, setReveal] = useState<number>(-1);
  const [topScore, setTopScore] = useState<{ display_name: string; score: number } | null>(null);
  const [score, setScore] = useState(0);   // cumulative across words
  const [streak, setStreak] = useState(0); // words guessed in a row
  const [lastGain, setLastGain] = useState(0);

  useEffect(() => {
    getTopGameScore("wordle").then(setTopScore);
  }, []);

  const MAX_GUESSES = 6;
  const WORD_LEN = 5;

  const getLetterStates = useCallback((guess: string): LetterState[] => {
    const result: LetterState[] = Array(WORD_LEN).fill("absent");
    const ansArr = answer.split("");
    const guessArr = guess.split("");
    const used = Array(WORD_LEN).fill(false);

    // First pass: correct
    for (let i = 0; i < WORD_LEN; i++) {
      if (guessArr[i] === ansArr[i]) {
        result[i] = "correct";
        used[i] = true;
      }
    }
    // Second pass: present
    for (let i = 0; i < WORD_LEN; i++) {
      if (result[i] === "correct") continue;
      for (let j = 0; j < WORD_LEN; j++) {
        if (!used[j] && guessArr[i] === ansArr[j]) {
          result[i] = "present";
          used[j] = true;
          break;
        }
      }
    }
    return result;
  }, [answer]);

  const keyStates = useCallback((): Record<string, LetterState> => {
    const map: Record<string, LetterState> = {};
    for (const guess of guesses) {
      const states = getLetterStates(guess);
      guess.split("").forEach((ch, i) => {
        const prev = map[ch];
        const next = states[i];
        if (prev === "correct") return;
        if (next === "correct") { map[ch] = "correct"; return; }
        if (prev === "present") return;
        if (next === "present") { map[ch] = "present"; return; }
        map[ch] = "absent";
      });
    }
    return map;
  }, [guesses, getLetterStates]);

  const submitGuess = useCallback(() => {
    if (current.length !== WORD_LEN || gameState !== "playing") return;
    if (!WORDS.includes(current.toLowerCase())) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    const newGuesses = [...guesses, current];
    setGuesses(newGuesses);
    setReveal(newGuesses.length - 1);
    setCurrent("");
    if (current === answer) {
      const gain = (MAX_GUESSES + 1 - newGuesses.length) * 100;
      setTimeout(() => {
        setGameState("won");
        setLastGain(gain);
        setScore(s => s + gain);
        setStreak(s => s + 1);
        // Auto-advance to a new word — keep the run going
        setTimeout(() => {
          setAnswer(pickWord());
          setGuesses([]);
          setCurrent("");
          setReveal(-1);
          setGameState("playing");
        }, 1300);
      }, 400 * WORD_LEN);
    } else if (newGuesses.length >= MAX_GUESSES) {
      setTimeout(() => {
        setGameState("lost");
        // Save the cumulative run score
        const finalScore = score;
        if (finalScore > 0) saveGameScore("wordle", finalScore).then(() => getTopGameScore("wordle").then(setTopScore));
      }, 400 * WORD_LEN);
    }
  }, [current, guesses, answer, gameState, score]);

  const handleKey = useCallback((key: string) => {
    if (gameState !== "playing") return;
    if (key === "ENTER") { submitGuess(); return; }
    if (key === "BACK" || key === "Backspace") {
      setCurrent(c => c.slice(0, -1));
      return;
    }
    if (/^[A-Z]$/.test(key) && current.length < WORD_LEN) {
      setCurrent(c => c + key);
    }
  }, [gameState, submitGuess, current]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      if (e.key === "Enter") handleKey("ENTER");
      else if (e.key === "Backspace") handleKey("BACK");
      else if (/^[a-zA-Z]$/.test(e.key)) handleKey(e.key.toUpperCase());
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleKey]);

  function restart() {
    setAnswer(pickWord());
    setGuesses([]);
    setCurrent("");
    setGameState("playing");
    setReveal(-1);
    setScore(0);
    setStreak(0);
    setLastGain(0);
  }

  const keyMap = keyStates();

  const tileColor = (state: LetterState) => {
    if (state === "correct") return { background: "#538d4e", border: "2px solid #538d4e", color: "#fff" };
    if (state === "present") return { background: "#b59f3b", border: "2px solid #b59f3b", color: "#fff" };
    if (state === "absent") return { background: "#3a3a3c", border: "2px solid #3a3a3c", color: "#fff" };
    if (state === "tbd") return { background: "var(--surface-2)", border: "2px solid var(--border)", color: "var(--text)" };
    return { background: "var(--surface)", border: "2px solid var(--border)", color: "var(--text)" };
  };

  const keyColor = (state: LetterState | undefined) => {
    if (state === "correct") return { background: "#538d4e", color: "#fff" };
    if (state === "present") return { background: "#b59f3b", color: "#fff" };
    if (state === "absent") return { background: "#3a3a3c", color: "#888" };
    return { background: "var(--surface-2)", color: "var(--text)" };
  };

  return (
    <>
      <main className="flex flex-col items-center pt-20 pb-6 px-2" style={{ minHeight: "100vh" }}>
        <div className="flex items-center gap-4 mb-4">
          <Link href="/game" style={{ color: "var(--text-muted)", fontSize: 13 }}>Games</Link>
          <span style={{ color: "var(--text-muted)" }}>/</span>
          <span style={{ color: "var(--text)", fontWeight: 700 }}>Word Guess</span>
        </div>

        {topScore && (
          <div className="flex items-center gap-2 mb-4 px-4 py-2 rounded-xl" style={{ background: "var(--surface)", border: "1px solid var(--border)", fontSize: 13 }}>
            <span style={{ fontSize: 18 }}>🏆</span>
            <span style={{ color: "var(--text-muted)" }}>Top:</span>
            <span style={{ fontWeight: 700, color: "var(--text)" }}>{topScore.display_name}</span>
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>{topScore.score} pts</span>
          </div>
        )}

        {/* Score / streak */}
        <div style={{ display: "flex", gap: 8, marginBottom: 12, width: "100%", maxWidth: 330, justifyContent: "center" }}>
          <div style={{ flex: 1, textAlign: "center", background: "var(--surface-2)", borderRadius: 8, padding: "6px 10px" }}>
            <div style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>Score</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: "var(--text)" }}>{score.toLocaleString()}</div>
          </div>
          <div style={{ flex: 1, textAlign: "center", background: "var(--surface-2)", borderRadius: 8, padding: "6px 10px" }}>
            <div style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>ทายถูกติดกัน</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: "var(--text)" }}>{streak}</div>
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%", maxWidth: 330, alignItems: "center" }}>
          {Array.from({ length: MAX_GUESSES }, (_, row) => {
            const isCurrentRow = row === guesses.length && gameState === "playing";
            const isSubmittedRow = row < guesses.length;
            const guess = isSubmittedRow ? guesses[row] : isCurrentRow ? current : "";
            const states: LetterState[] = isSubmittedRow ? getLetterStates(guesses[row]) : [];

            return (
              <div
                key={row}
                style={{ display: "flex", gap: 6, width: "100%", justifyContent: "center" }}
                className={isCurrentRow && shake ? "animate-shake" : ""}
              >
                {Array.from({ length: WORD_LEN }, (_, col) => {
                  const letter = guess[col] || "";
                  let state: LetterState = "empty";
                  if (isSubmittedRow) {
                    state = states[col];
                  } else if (letter) {
                    state = "tbd";
                  }

                  const shouldReveal = isSubmittedRow && reveal === row;
                  const delay = shouldReveal ? `${col * 0.4}s` : "0s";

                  return (
                    <div
                      key={col}
                      style={{
                        flex: "1 1 0",
                        aspectRatio: "1 / 1",
                        maxWidth: 58,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "clamp(20px, 7vw, 28px)",
                        fontWeight: 900,
                        borderRadius: 4,
                        userSelect: "none",
                        transition: shouldReveal ? `background ${0.1}s ease ${delay}, border-color ${0.1}s ease ${delay}` : "border-color 0.1s",
                        ...(isSubmittedRow && !shouldReveal
                          ? tileColor(state)
                          : isSubmittedRow && shouldReveal
                          ? tileColor(state)
                          : tileColor(state)),
                      }}
                    >
                      {letter}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Status */}
        {gameState === "won" && (
          <div className="mt-6 flex flex-col items-center gap-1">
            <div style={{ color: "#538d4e", fontWeight: 900, fontSize: 22 }}>ถูกต้อง! +{lastGain}</div>
            <div style={{ color: "var(--text-muted)", fontSize: 13 }}>คำต่อไป...</div>
          </div>
        )}
        {gameState === "lost" && (
          <div className="mt-6 flex flex-col items-center gap-3">
            <div style={{ color: "#ef4444", fontWeight: 900, fontSize: 22 }}>
              Game Over — <span style={{ letterSpacing: "0.1em" }}>{answer}</span>
            </div>
            <div style={{ color: "var(--text)", fontSize: 15, fontWeight: 700 }}>
              ทายถูก {streak} คำ · คะแนนรวม {score.toLocaleString()}
            </div>
            <button
              onClick={restart}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-80"
              style={{ background: "var(--primary)", color: "#fff" }}
            >
              <RotateCcw size={15} />
              เล่นใหม่
            </button>
          </div>
        )}

        {/* Keyboard */}
        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 6, alignItems: "center", width: "100%", maxWidth: 480 }}>
          {KEYBOARD_ROWS.map((row, ri) => (
            <div key={ri} style={{ display: "flex", gap: 4, width: "100%", justifyContent: "center" }}>
              {row.map(key => {
                const isWide = key === "ENTER" || key === "BACK";
                return (
                  <button
                    key={key}
                    onPointerDown={e => { e.preventDefault(); handleKey(key); }}
                    style={{
                      flex: isWide ? "1.5 1 0" : "1 1 0",
                      minWidth: 0,
                      height: 52,
                      borderRadius: 6,
                      border: "none",
                      fontSize: isWide ? 10 : "clamp(13px, 4vw, 18px)",
                      fontWeight: 700,
                      cursor: "pointer",
                      userSelect: "none",
                      touchAction: "manipulation",
                      transition: "background 0.2s",
                      ...keyColor(keyMap[key]),
                    }}
                  >
                    {key === "BACK" ? "DEL" : key}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </main>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        .animate-shake { animation: shake 0.5s ease; }
      `}</style>
    </>
  );
}
