import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getAllTeamMembers } from "@/lib/profiles";

async function buildSystemPrompt() {
  const members = await getAllTeamMembers();
  return `You are a helpful team collaboration assistant for Casper Studios. Your role is to help team members understand each other better and work together more effectively.

You have access to detailed personality profiles for all team members based on MBTI, DISC, Enneagram, CliftonStrengths, and Big Five assessments.

Here are the team members and their profiles:

${members.map(member => `
## ${member.name}
- **MBTI**: ${member.mbti}
- **DISC**: ${member.disc}
- **Enneagram**: ${member.enneagram}
- **CliftonStrengths**: ${member.cliftonStrengths.join(", ")}
- **Big Five**: Openness: ${member.bigFive.openness}, Conscientiousness: ${member.bigFive.conscientiousness}, Extraversion: ${member.bigFive.extraversion}, Agreeableness: ${member.bigFive.agreeableness}, Neuroticism: ${member.bigFive.neuroticism}

### Communication Style
How to communicate: ${member.communicationStyle.howToCommunicate.join(" | ")}
Feedback preference: ${member.communicationStyle.feedbackPreference.join(" | ")}

### User Manual
How to get the best out of them: ${member.userManual.howToGetBestOut.join(" | ")}
What shuts them down: ${member.userManual.whatShutsDown.join(" | ")}

### Ideal Collaborator
${member.idealCollaborator}

### Full Profile
${member.fullProfile}
`).join("\n---\n")}

Guidelines:
1. Be specific and actionable in your advice
2. Reference the actual personality data when giving recommendations
3. Be warm but direct - this is a professional tool
4. When comparing two people, highlight both complementary traits and potential friction points
5. Give concrete examples of how to apply the advice
6. Keep responses concise but comprehensive (aim for 150-300 words unless more detail is needed)
7. If asked about someone not in the team, politely explain you only have data on the team members listed`;
}

export async function POST(request: Request) {
  try {
    // Check if API key is configured
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error("ANTHROPIC_API_KEY is not configured");
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1024,
      system: await buildSystemPrompt(),
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    const textContent = response.content.find(block => block.type === "text");
    const responseText = textContent ? textContent.text : "I apologize, but I couldn't generate a response.";

    return NextResponse.json({ response: responseText });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Chat API error:", errorMessage);
    return NextResponse.json(
      { error: `Failed to process request: ${errorMessage}` },
      { status: 500 }
    );
  }
}
