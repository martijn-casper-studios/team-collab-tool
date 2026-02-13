import { NextResponse } from "next/server";
import { findTeamMemberByEmail, hasProfile } from "@/lib/profiles";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ hasProfile: false, profile: null });
  }

  const profileExists = hasProfile(email);
  const profile = profileExists ? findTeamMemberByEmail(email) : null;

  return NextResponse.json({ hasProfile: profileExists, profile });
}
