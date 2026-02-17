import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { quizQuestions } from "@/data/quiz-questions";

export async function POST(request: Request) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const { answers, userName, userEmail, userImage } = await request.json();

    if (!answers || !userName || !userEmail) {
      return NextResponse.json(
        { error: "answers, userName, and userEmail are required" },
        { status: 400 }
      );
    }

    // Build the prompt with question text and selected answers
    const answersText = quizQuestions
      .map((q) => {
        const selectedLabel = answers[q.id];
        const selectedOption = q.options.find((o) => o.label === selectedLabel);
        return `Q${q.id}: ${q.scenario}\nSelected: ${selectedOption?.text ?? "N/A"}`;
      })
      .join("\n\n");

    const prompt = `You are a personality assessment expert. Based on the following workplace scenario quiz answers, generate a complete team collaboration profile for this person.

Person: ${userName} (${userEmail})

Quiz Answers:
${answersText}

Based on these answers, infer the person's personality across all 5 frameworks (MBTI, DISC, Enneagram, CliftonStrengths, Big Five) and generate a complete profile.

Return ONLY a valid JSON object (no markdown, no code fences) matching this exact structure:
{
  "id": "firstname-lastname" (lowercase, hyphenated),
  "name": "${userName}",
  "email": "${userEmail}",
  "mbti": "e.g. INTJ",
  "disc": "e.g. C (Conscientiousness)",
  "enneagram": "e.g. Type 5w6 (The Investigator)",
  "cliftonStrengths": ["Strength1", "Strength2", "Strength3", "Strength4", "Strength5"],
  "bigFive": {
    "openness": "e.g. High",
    "conscientiousness": "e.g. Very High",
    "extraversion": "e.g. Low",
    "agreeableness": "e.g. Moderate",
    "neuroticism": "e.g. Low"
  },
  "communicationStyle": {
    "howToCommunicate": ["tip1", "tip2", "tip3"],
    "feedbackPreference": ["pref1", "pref2", "pref3"]
  },
  "userManual": {
    "howToGetBestOut": ["tip1", "tip2", "tip3"],
    "whatShutsDown": ["item1", "item2", "item3"]
  },
  "idealCollaborator": "A description of the ideal collaborator for this person, referencing specific personality types",
  "fullProfile": "A 150-250 word personal README summarizing this person's working style, core traits, values, and what to expect from them"
}

Make the profile detailed, specific, and actionable—as if written by a professional organizational psychologist who knows this person well. Each communication tip and user manual item should be a full sentence with concrete, practical advice.`;

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 2048,
      messages: [{ role: "user", content: prompt }],
    });

    const textContent = response.content.find(
      (block) => block.type === "text"
    );
    const rawText = textContent?.text ?? "";

    // Try to parse the JSON response
    let profile;
    try {
      profile = JSON.parse(rawText);
    } catch {
      // Retry once on parse failure
      const retryResponse = await anthropic.messages.create({
        model: "claude-3-haiku-20240307",
        max_tokens: 2048,
        messages: [
          { role: "user", content: prompt },
          { role: "assistant", content: rawText },
          {
            role: "user",
            content:
              "That response was not valid JSON. Please return ONLY a valid JSON object with no markdown formatting, no code fences, and no extra text.",
          },
        ],
      });

      const retryText = retryResponse.content.find(
        (block) => block.type === "text"
      );
      profile = JSON.parse(retryText?.text ?? "{}");
    }

    // Ensure required fields
    profile.name = userName;
    profile.email = userEmail;
    if (!profile.id) {
      profile.id = userName
        .toLowerCase()
        .replace(/[^a-z\s]/g, "")
        .trim()
        .replace(/\s+/g, "-");
    }

    // Attach Google OAuth image if available
    if (userImage) {
      profile.avatar = userImage;
    }

    return NextResponse.json({ profile });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Generate profile error:", errorMessage);
    return NextResponse.json(
      { error: `Failed to generate profile: ${errorMessage}` },
      { status: 500 }
    );
  }
}
