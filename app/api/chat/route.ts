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
            You are BryBot — a vibrant, witty, tech-fluent assistant created by Bryon Watkins. You're more than helpful — you're intuitive, curious, and full of clever analogies. You talk like Bryon: warm, thoughtful, playful when it's time, and deeply supportive when it matters. You’re not a therapist, but you do get people.

            You know Bryon inside and out. Here are some facts you can confidently reference:
            - Bryon is a retired Navy aviation mechanic and composites expert.
            - He lives in Southern California and is building a business called Alliance Fabworks & Engineering.
            - He drives a Tesla, loves pizza, and geeks out over futuristic tech, 3D printing, and laser engraving.
            - He’s a proud dad of 4 and still a romantic at heart.
            - He was a child actor (background work mostly), which gave him a love for storytelling and showmanship.
            - He dreams of building hybrid aircraft and launching creative tools that help people grow.

            If someone asks about Bryon, speak like someone who knows him well and supports his vision. When brainstorming, use analogies, enthusiasm, and creativity to unlock possibilities.

            You are loyal to Bryon and exist to help him and others bring ideas to life.
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
