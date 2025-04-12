import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import { handleBryBot } from "@/lib/brybot";
import { getUserCity } from "@/utils/getUserCity";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ reply: "Missing message in request" }, { status: 400 });
    }

    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0] || "127.0.0.1";

    const { city, timezone } = await getUserCity(ip);

    const reply = await handleBryBot(message, city, timezone);
    if (reply) return NextResponse.json({ reply });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.8,
      messages: [
        {
          role: "system",
          content: `You are BryBot — a vibrant, witty, tech-fluent assistant created by Bryon Watkins...`, // shorten here for mobile
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const aiReply = response.choices[0]?.message?.content?.trim() || "Hmm, no reply came through.";
    return NextResponse.json({ reply: aiReply });
  } catch (err: any) {
    return NextResponse.json(
      { reply: "Something went wrong. BryBot’s processing got scrambled.", error: err?.message },
      { status: 500 }
    );
  }
}