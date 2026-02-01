import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getTeamMemberById } from "@/data/team";

export async function POST(request: Request) {
  try {
    const { personAId, personBId } = await request.json();

    if (!personAId || !personBId) {
      return NextResponse.json(
        { error: "Both person IDs are required" },
        { status: 400 }
      );
    }

    const personA = getTeamMemberById(personAId);
    const personB = getTeamMemberById(personBId);

    if (!personA || !personB) {
      return NextResponse.json(
        { error: "One or both team members not found" },
        { status: 404 }
      );
    }

    const comparisonPrompt = `Analyze the compatibility and collaboration dynamics between these two team members:

## ${personA.name}
- **MBTI**: ${personA.mbti}
- **DISC**: ${personA.disc}
- **Enneagram**: ${personA.enneagram}
- **CliftonStrengths**: ${personA.cliftonStrengths.join(", ")}
- **Big Five**: Openness: ${personA.bigFive.openness}, Conscientiousness: ${personA.bigFive.conscientiousness}, Extraversion: ${personA.bigFive.extraversion}, Agreeableness: ${personA.bigFive.agreeableness}, Neuroticism: ${personA.bigFive.neuroticism}
- **Communication Style**: ${personA.communicationStyle.howToCommunicate.join(" | ")}
- **What helps them thrive**: ${personA.userManual.howToGetBestOut.join(" | ")}
- **What shuts them down**: ${personA.userManual.whatShutsDown.join(" | ")}
- **Ideal Collaborator**: ${personA.idealCollaborator}

## ${personB.name}
- **MBTI**: ${personB.mbti}
- **DISC**: ${personB.disc}
- **Enneagram**: ${personB.enneagram}
- **CliftonStrengths**: ${personB.cliftonStrengths.join(", ")}
- **Big Five**: Openness: ${personB.bigFive.openness}, Conscientiousness: ${personB.bigFive.conscientiousness}, Extraversion: ${personB.bigFive.extraversion}, Agreeableness: ${personB.bigFive.agreeableness}, Neuroticism: ${personB.bigFive.neuroticism}
- **Communication Style**: ${personB.communicationStyle.howToCommunicate.join(" | ")}
- **What helps them thrive**: ${personB.userManual.howToGetBestOut.join(" | ")}
- **What shuts them down**: ${personB.userManual.whatShutsDown.join(" | ")}
- **Ideal Collaborator**: ${personB.idealCollaborator}

Provide a detailed compatibility analysis with the following sections:

**Compatibility Overview**
A brief 2-3 sentence summary of how these two work together.

**Complementary Strengths**
How their different traits balance each other out. Be specific.

**Potential Friction Points**
Where they might clash and why. Be honest but constructive.

**Communication Tips**
Specific advice for how ${personA.name.split(" ")[0]} should communicate with ${personB.name.split(" ")[0]} and vice versa.

**Collaboration Strategies**
3-4 actionable tips for working together effectively on projects.

**Best Project Scenarios**
What types of work or projects would this pair excel at together?

Keep the tone professional but warm. Be specific and reference their actual personality data.`;

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

    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: comparisonPrompt,
        },
      ],
    });

    const textContent = response.content.find(block => block.type === "text");
    const comparisonText = textContent ? textContent.text : "Unable to generate comparison.";

    return NextResponse.json({ comparison: comparisonText });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Compare API error:", errorMessage);
    return NextResponse.json(
      { error: `Failed to process comparison: ${errorMessage}` },
      { status: 500 }
    );
  }
}
