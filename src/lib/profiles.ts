import { prisma } from "@/lib/prisma";
import { TeamMember, teamMembers } from "@/data/team";
import { Prisma } from "@prisma/client";

export async function getGeneratedProfiles(): Promise<TeamMember[]> {
  const rows = await prisma.profile.findMany();
  return rows.map((r) => r.data as unknown as TeamMember);
}

export async function getAllTeamMembers(): Promise<TeamMember[]> {
  const generated = await getGeneratedProfiles();
  const generatedEmails = new Set(generated.map((p) => p.email.toLowerCase()));

  const hardcodedOnly = teamMembers.filter(
    (m) => !generatedEmails.has(m.email.toLowerCase())
  );

  return [...hardcodedOnly, ...generated];
}

export async function findTeamMemberByEmail(
  email: string
): Promise<TeamMember | undefined> {
  const row = await prisma.profile.findUnique({
    where: { email: email.toLowerCase() },
  });
  if (row) return row.data as unknown as TeamMember;

  return teamMembers.find(
    (m) => m.email.toLowerCase() === email.toLowerCase()
  );
}

export async function findTeamMemberById(
  id: string
): Promise<TeamMember | undefined> {
  const row = await prisma.profile.findUnique({
    where: { slug: id },
  });
  if (row) return row.data as unknown as TeamMember;

  return teamMembers.find((m) => m.id === id);
}

export async function hasProfile(email: string): Promise<boolean> {
  const member = await findTeamMemberByEmail(email);
  return !!member;
}

export async function saveProfile(profile: TeamMember): Promise<void> {
  await prisma.profile.upsert({
    where: { email: profile.email.toLowerCase() },
    update: {
      slug: profile.id,
      name: profile.name,
      data: JSON.parse(JSON.stringify(profile)) as Prisma.InputJsonValue,
    },
    create: {
      slug: profile.id,
      email: profile.email.toLowerCase(),
      name: profile.name,
      data: JSON.parse(JSON.stringify(profile)) as Prisma.InputJsonValue,
    },
  });
}
