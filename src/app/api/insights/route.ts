import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { findTeamMemberByEmail, getAllTeamMembers } from "@/lib/profiles";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const currentUser = await findTeamMemberByEmail(email);
    if (!currentUser) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    const allMembers = await getAllTeamMembers();
    const teammates = allMembers.filter(
      (m) => m.email.toLowerCase() !== email.toLowerCase()
    );

    if (teammates.length === 0) {
      return NextResponse.json(
        { error: "No teammates found to compare against" },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const formatProfile = (m: typeof currentUser) =>
      `- ${m.name} (id: ${m.id}): MBTI ${m.mbti}, DISC ${m.disc}, Enneagram ${m.enneagram}, Strengths: ${m.cliftonStrengths.join(", ")}, Big Five: O=${m.bigFive.openness} C=${m.bigFive.conscientiousness} E=${m.bigFive.extraversion} A=${m.bigFive.agreeableness} N=${m.bigFive.neuroticism}, Communication: ${m.communicationStyle.howToCommunicate.join("; ")}, Ideal Collaborator: ${m.idealCollaborator}`;

    const prompt = `Given this person's personality profile:
${formatProfile(currentUser)}

And these teammates:
${teammates.map(formatProfile).join("\n")}

Identify:
1. Most Similar - who shares the most personality traits and working style
2. Most Compatible - who would be the best collaboration partner (complementary strengths)
3. Best Communication Match - who has the most aligned communication preferences
4. Growth Partner - who would challenge them in the most productive ways

Return ONLY valid JSON (no markdown, no code fences) in this exact format:
{"similar":{"id":"teammate-id","name":"Name","reason":"1-2 sentence explanation"},"compatible":{"id":"teammate-id","name":"Name","reason":"1-2 sentence explanation"},"communicationMatch":{"id":"teammate-id","name":"Name","reason":"1-2 sentence explanation"},"growthPartner":{"id":"teammate-id","name":"Name","reason":"1-2 sentence explanation"}}`;

    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const textContent = response.content.find((b) => b.type === "text");
    if (!textContent || textContent.type !== "text") {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    const insights = JSON.parse(textContent.text);

    return NextResponse.json({ insights });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Insights API error:", errorMessage);
    return NextResponse.json(
      { error: `Failed to generate insights: ${errorMessage}` },
      { status: 500 }
    );
  }
}
