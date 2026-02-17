import { NextResponse } from "next/server";
import { saveProfile } from "@/lib/profiles";
import { TeamMember } from "@/data/team";

export async function POST(request: Request) {
  try {
    const profile: TeamMember = await request.json();

    if (!profile.id || !profile.name || !profile.email) {
      return NextResponse.json(
        { error: "Profile must include id, name, and email" },
        { status: 400 }
      );
    }

    await saveProfile(profile);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Save profile error:", errorMessage);
    return NextResponse.json(
      { error: `Failed to save profile: ${errorMessage}` },
      { status: 500 }
    );
  }
}
