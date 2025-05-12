
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request) {
  const body = await request.json();
  const message = body.message;

  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.DEFAULT_MODEL || "gpt-3.5-turbo";

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: message }]
    })
  });

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content || "Sorry, something went wrong.";

  return NextResponse.json({ reply });
}
