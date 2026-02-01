import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export async function GET() {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  // Check if key exists
  if (!apiKey) {
    return NextResponse.json({
      status: "error",
      message: "ANTHROPIC_API_KEY environment variable is not set",
      keyExists: false
    });
  }

  // Check key format
  const keyPreview = `${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 4)}`;

  try {
    const anthropic = new Anthropic({
      apiKey: apiKey,
    });

    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 50,
      messages: [
        {
          role: "user",
          content: "Say hello in exactly 3 words.",
        },
      ],
    });

    const textContent = response.content.find(block => block.type === "text");

    return NextResponse.json({
      status: "success",
      message: "API connection working!",
      keyPreview: keyPreview,
      apiResponse: textContent?.text || "No text response"
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const errorName = error instanceof Error ? error.name : "Unknown";

    return NextResponse.json({
      status: "error",
      message: "API call failed",
      keyPreview: keyPreview,
      keyExists: true,
      errorName: errorName,
      errorMessage: errorMessage,
      fullError: String(error)
    });
  }
}
