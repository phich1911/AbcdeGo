// Thin wrapper around the browser's built-in Web Speech API — used for TOEIC
// listening practice so we don't need to host/generate audio files.
//
// Setting `utterance.lang` alone isn't enough on some platforms (notably iOS
// Safari) — it can still fall back to the device's default system voice
// (e.g. a Thai Siri voice reading English phonetically). Explicitly picking
// an English SpeechSynthesisVoice fixes that.

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    const existing = window.speechSynthesis.getVoices();
    if (existing.length > 0) { resolve(existing); return; }
    const handler = () => {
      window.speechSynthesis.removeEventListener("voiceschanged", handler);
      resolve(window.speechSynthesis.getVoices());
    };
    window.speechSynthesis.addEventListener("voiceschanged", handler);
    // Some browsers never fire voiceschanged — don't hang forever.
    setTimeout(() => resolve(window.speechSynthesis.getVoices()), 500);
  });
}

function pickEnglishVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  return (
    voices.find((v) => v.lang === "en-US") ??
    voices.find((v) => v.lang?.toLowerCase().startsWith("en-us")) ??
    voices.find((v) => v.lang?.toLowerCase().startsWith("en")) ??
    null
  );
}

export async function speakEnglish(text: string): Promise<void> {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const voices = await loadVoices();
  const voice = pickEnglishVoice(voices);
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  utter.rate = 0.95;
  if (voice) utter.voice = voice;
  window.speechSynthesis.speak(utter);
}

export function stopSpeaking(): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
}
