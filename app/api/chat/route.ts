import { NextRequest, NextResponse } from "next/server";

const BASE_PROMPT = `คุณคือ JarnGo ผู้ช่วย AI ของเว็บไซต์ AbcdeGo แพลตฟอร์มเรียนออนไลน์ภาษาไทย
ตอบเป็นภาษาไทยเสมอ กระชับ ชัดเจน เป็นกันเอง เหมือนเพื่อนติวที่คอยช่วยเหลือ

ข้อมูลคอร์สในระบบ:
- สอบ ก.พ.: วิชาความรู้ทั่วไป (อนุกรม, เงื่อนไขสัญลักษณ์/ภาษา, ร้อยละ, ตาราง/กราฟ, ภาษาไทย) และภาษาอังกฤษ
- เจ้าหน้าที่คดีพิเศษ (DSI): กฎหมายคดีพิเศษ การสอบสวน
- ประถมตอนต้น: คณิตศาสตร์ (จำนวน, การวัด, เรขาคณิต, แบบรูป, สถิติ)

เรียนฟรีทุกคอร์ส ไม่ต้องสมัครสมาชิกก็เรียนได้ XP คือแต้มสะสมจากการเรียนจบบทเรียน ทุก 100 XP = 1 Level
มีเกมฝึกสมอง (Word Guess, 2048) และดูดวงไพ่ทาโรต์ด้วย

ถ้าถามเรื่องเนื้อหากฎหมายหรือวิชาการ ให้ช่วยอธิบายอย่างเต็มที่`;

type UserContext = { name?: string; xp?: number; level?: number } | null;

function buildSystemPrompt(user: UserContext): string {
  if (user && user.name) {
    return `${BASE_PROMPT}

ผู้ใช้ที่กำลังคุยด้วยตอนนี้: ชื่อ "${user.name}" มี ${user.xp ?? 0} XP อยู่ Level ${user.level ?? 1}
ทักทายด้วยชื่อของเขาได้ และถ้าเหมาะสมก็ชวนให้เรียนต่อเพื่อเก็บ XP เพิ่ม`;
  }
  return BASE_PROMPT;
}

// Try a provider; returns the fetch Response (may be ok or not)
function callProvider(url: string, key: string, model: string, messages: unknown[]) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({ model, messages, max_tokens: 1024, stream: true }),
  });
}

const REST_MESSAGE =
  "ขออภัยครับ วันนี้มีคนใช้งานผมเยอะมาก ระบบประมวลผล AI เต็มชั่วคราว ผมขอตัวไปพักผ่อนก่อนนะครับ แล้วจะกลับมาคุยกันใหม่ในวันพรุ่งนี้";

const LIMIT_GUEST = 5;
const LIMIT_USER = 20;

export async function POST(req: NextRequest) {
  const { messages, user } = await req.json();

  // Count user messages in this session
  const userMsgCount = (messages as { role: string }[]).filter((m) => m.role === "user").length;
  const limit = user ? LIMIT_USER : LIMIT_GUEST;

  if (userMsgCount > limit) {
    const hint = user
      ? "วันนี้อาจารย์โกตอบไปเยอะแล้วนะ พักก่อน พรุ่งนี้มาถามอาจารย์ใหม่ได้เลย ขอตัวไปพักก่อนเด้อ 😄"
      : "อาจารย์โกให้โอกาสแค่นี้ก่อนนะ ไปสมัครสมาชิกก่อน แล้วกลับมาถามโกได้อีก 20 คำถาม 😄";
    return NextResponse.json({ exhausted: true, message: hint }, { status: 429 });
  }

  const fullMessages = [{ role: "system", content: buildSystemPrompt(user ?? null) }, ...messages];

  // 1) Primary: Groq
  if (process.env.GROQ_API_KEY) {
    try {
      const res = await callProvider(
        "https://api.groq.com/openai/v1/chat/completions",
        process.env.GROQ_API_KEY,
        "llama-3.3-70b-versatile",
        fullMessages
      );
      if (res.ok && res.body) {
        return new NextResponse(res.body, {
          headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
        });
      }
    } catch {
      // fall through to backup
    }
  }

  // 2) Fallback: Cerebras (same Llama model → consistent personality)
  if (process.env.CEREBRAS_API_KEY) {
    try {
      const res = await callProvider(
        "https://api.cerebras.ai/v1/chat/completions",
        process.env.CEREBRAS_API_KEY,
        "llama-3.3-70b",
        fullMessages
      );
      if (res.ok && res.body) {
        return new NextResponse(res.body, {
          headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
        });
      }
    } catch {
      // fall through to rest message
    }
  }

  // 3) Both providers exhausted/unavailable → polite "resting" message
  return NextResponse.json({ exhausted: true, message: REST_MESSAGE }, { status: 503 });
}
