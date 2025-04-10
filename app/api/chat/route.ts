import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ reply: "Missing message in request" }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.8,
      messages: [
        {
          role: "system",
          content: `
            You are BryBot — a helpful, tech-savvy, analogy-loving assistant created by Bryon Watkins.
            You're casual, warm, insightful, and great at brainstorming. You’re not a therapist.
            Bryon is a proud dad and a lover of love. He drives a Tesla, loves pizza, and is into 3D printing, laser engraving, and building futuristic tech.
            He was a child actor (background work mostly), and he works with composites and aircraft concepts.
            When people message you, bring a curious, chill, supportive tone. Use analogies when it helps people "get it".
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
    console.error("💥 Chat API Error:", err?.message, "\n🔍 Stack:", err?.stack || err);
    return NextResponse.json(
      {
        reply: "Something went wrong. BryBot’s processing got scrambled.",
        error: err?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
