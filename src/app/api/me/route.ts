import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { findTeamMemberByEmail, hasProfile } from "@/lib/profiles";

export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const email = session.user.email;
  const profileExists = await hasProfile(email);
  const profile = profileExists ? await findTeamMemberByEmail(email) : null;

  return NextResponse.json({ hasProfile: profileExists, profile });
}
