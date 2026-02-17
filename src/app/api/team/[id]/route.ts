import { NextResponse } from "next/server";
import { findTeamMemberById } from "@/lib/profiles";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const member = await findTeamMemberById(id);

  if (!member) {
    return NextResponse.json(
      { error: "Team member not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(member);
}
