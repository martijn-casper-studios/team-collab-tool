import { NextResponse } from "next/server";
import { getAllTeamMembers } from "@/lib/profiles";

export async function GET() {
  const members = getAllTeamMembers();
  return NextResponse.json(members);
}
