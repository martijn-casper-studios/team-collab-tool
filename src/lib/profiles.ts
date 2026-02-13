import fs from "fs";
import path from "path";
import { TeamMember, teamMembers } from "@/data/team";

const GENERATED_PROFILES_PATH = path.join(
  process.cwd(),
  "data",
  "generated-profiles.json"
);

export function getGeneratedProfiles(): TeamMember[] {
  try {
    const raw = fs.readFileSync(GENERATED_PROFILES_PATH, "utf-8");
    return JSON.parse(raw) as TeamMember[];
  } catch {
    return [];
  }
}

export function getAllTeamMembers(): TeamMember[] {
  const generated = getGeneratedProfiles();
  const generatedEmails = new Set(generated.map((p) => p.email.toLowerCase()));

  // Generated profiles override hardcoded ones
  const hardcodedOnly = teamMembers.filter(
    (m) => !generatedEmails.has(m.email.toLowerCase())
  );

  return [...hardcodedOnly, ...generated];
}

export function findTeamMemberByEmail(
  email: string
): TeamMember | undefined {
  const all = getAllTeamMembers();
  return all.find((m) => m.email.toLowerCase() === email.toLowerCase());
}

export function findTeamMemberById(id: string): TeamMember | undefined {
  const all = getAllTeamMembers();
  return all.find((m) => m.id === id);
}

export function hasProfile(email: string): boolean {
  return !!findTeamMemberByEmail(email);
}

export function saveProfile(profile: TeamMember): void {
  const profiles = getGeneratedProfiles();
  const idx = profiles.findIndex(
    (p) => p.email.toLowerCase() === profile.email.toLowerCase()
  );
  if (idx >= 0) {
    profiles[idx] = profile;
  } else {
    profiles.push(profile);
  }
  fs.writeFileSync(GENERATED_PROFILES_PATH, JSON.stringify(profiles, null, 2));
}
