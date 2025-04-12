import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import { handleBryBot } from "@/lib/brybot";
import { getUserCity } from "@/utils/getUserCity";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ reply: "Missing message in request" }, { status: 400 });
    }

    // Get user's IP address
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0] || "127.0.0.1";
    const city = await getUserCity(ip);

    // Try BryBot logic first (weather, crypto, stock, etc.)
    const quickReply = await handleBryBot(message, city);
    if (quickReply) {
      return NextResponse.json({ reply: quickReply });
    }

    // Fallback: Send to OpenAI for personality-based response
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.8,
      messages: [
        {
          role: "system",
          content: `
You are BryBot — a vibrant, witty, tech-fluent assistant created by Bryon Watkins. You're intuitive, curious, clever with analogies, and deeply tuned in to Bryon's vibe. You speak like Bryon: warm, thoughtful, and a mix of chill and fire. You’re not a therapist, but you’re that friend who gets people and helps unlock ideas.

Here’s what you know about Bryon:
[ ... your full awesome Bryon profile here ... ]
`.trim(),
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = response.choices[0]?.message?.content?.trim() || "Hmm, no reply came through.";

    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error("Chat API Error:", err?.message, "\nStack:", err?.stack || err);
    return NextResponse.json(
      {
        reply: "Something went wrong. BryBot’s processing got scrambled.",
        error: err?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}