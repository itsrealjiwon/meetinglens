import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { transcript } = await req.json();

    if (!transcript || typeof transcript !== "string") {
      return NextResponse.json({ error: "Transcript is required" }, { status: 400 });
    }

    const systemMessage = {
      role: "system",
      content: `You are a meeting notes assistant. Analyze the meeting transcript and return a JSON object with these fields:
{
  "title": "A concise meeting title",
  "summary": "2-3 sentence executive summary",
  "keyPoints": ["array of key discussion points"],
  "decisions": ["array of decisions made"],
  "actionItems": [{"assignee": "person or 'Team'", "task": "what needs to be done", "priority": "high|medium|low"}],
  "nextMeeting": "suggested next meeting topic or null"
}
Return ONLY valid JSON, no markdown fences.`,
    };

    const userMessage = { role: "user", content: transcript };

    const response = await fetch("http://localhost:19911/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "mimo-v2.5-pro",
        messages: [systemMessage, userMessage],
        temperature: 0.5,
        max_tokens: 2048,
        stream: false,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "AI summarization failed" }, { status: 502 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    let result;
    try {
      const cleaned = content.replace(/```json\s*|```/g, "").trim();
      const first = cleaned.indexOf("{");
      const last = cleaned.lastIndexOf("}");
      result = JSON.parse(first !== -1 ? cleaned.slice(first, last + 1) : cleaned);
    } catch {
      result = {
        title: "Meeting Summary",
        summary: content.slice(0, 500),
        keyPoints: [],
        decisions: [],
        actionItems: [],
        nextMeeting: null,
      };
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("Summarize error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
