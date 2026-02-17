"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { TeamCard } from "@/components/TeamCard";
import { TeamMember } from "@/data/team";
import Link from "next/link";

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [membersLoading, setMembersLoading] = useState(true);

  useEffect(() => {
    fetch("/api/team")
      .then((res) => res.json())
      .then((data) => {
        setMembers(data);
        setMembersLoading(false);
      })
      .catch(() => setMembersLoading(false));
  }, []);

  if (isLoading || membersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[var(--accent)]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="max-w-6xl mx-auto px-4 py-10">
        {user && !user.hasProfile && (
          <div className="mb-8 border border-[var(--accent)] bg-[var(--accent-light)] px-5 py-4 flex items-center justify-between">
            <span className="text-sm text-[var(--fg)]">
              Welcome, {user.name}. Take the personality assessment to create your collaboration profile.
            </span>
            <Link
              href="/onboarding"
              className="ml-4 px-4 py-1.5 bg-[var(--accent)] text-white font-mono text-xs uppercase tracking-[0.2em] hover:bg-[var(--accent-hover)] transition-editorial flex-shrink-0"
            >
              Take Assessment
            </Link>
          </div>
        )}

        <div className="mb-10">
          <h1 className="font-serif text-3xl font-light tracking-tight text-[var(--fg)]">
            Team Directory
          </h1>
          <p className="text-sm text-[var(--muted)] mt-2">
            Click on a team member to view their full profile and collaboration guide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {members.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>

        <div className="mt-14 border border-[var(--border)] bg-white p-6">
          <h2 className="label-mono text-[var(--muted)] mb-5">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => router.push("/chat")}
              className="flex items-center gap-4 p-4 border border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--accent-light)] transition-editorial text-left"
            >
              <div className="w-9 h-9 bg-[var(--accent-light)] flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-[var(--fg)]">Ask AI Assistant</h3>
                <p className="text-xs text-[var(--muted)] mt-0.5">Personalized advice on working with teammates</p>
              </div>
            </button>

            <button
              onClick={() => router.push("/compare")}
              className="flex items-center gap-4 p-4 border border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--accent-light)] transition-editorial text-left"
            >
              <div className="w-9 h-9 bg-[var(--accent-light)] flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-[var(--fg)]">Compare Team Members</h3>
                <p className="text-xs text-[var(--muted)] mt-0.5">See how two personalities complement each other</p>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
