import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { TeamMember } from "@/data/team";
import { Prisma } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const { email, avatar } = await request.json();

    if (!email || !avatar) {
      return NextResponse.json(
        { error: "email and avatar are required" },
        { status: 400 }
      );
    }

    const row = await prisma.profile.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!row) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    const data = row.data as unknown as TeamMember;
    data.avatar = avatar;

    await prisma.profile.update({
      where: { email: email.toLowerCase() },
      data: {
        data: JSON.parse(JSON.stringify(data)) as Prisma.InputJsonValue,
      },
    });

    return NextResponse.json({ success: true, profile: data });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Update avatar error:", errorMessage);
    return NextResponse.json(
      { error: `Failed to update avatar: ${errorMessage}` },
      { status: 500 }
    );
  }
}
