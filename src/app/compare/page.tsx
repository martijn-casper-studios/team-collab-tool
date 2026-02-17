"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Navigation } from "@/components/Navigation";
import { TeamCard } from "@/components/TeamCard";
import { TeamMember } from "@/data/team";

function CompareContent() {
  const { isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [allMembers, setAllMembers] = useState<TeamMember[]>([]);
  const [personA, setPersonA] = useState<TeamMember | null>(null);
  const [personB, setPersonB] = useState<TeamMember | null>(null);
  const [comparison, setComparison] = useState<string | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [membersLoading, setMembersLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleShareComparison = async () => {
    if (!personA || !personB) return;
    const compareUrl = `${window.location.origin}/compare?a=${personA.id}&b=${personB.id}`;
    const message = `Check out our team compatibility! ${personA.name} & ${personB.name} comparison → ${compareUrl}`;
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    fetch("/api/team")
      .then((res) => res.json())
      .then((data: TeamMember[]) => {
        setAllMembers(data);
        setMembersLoading(false);

        const aParam = searchParams.get("a");
        const bParam = searchParams.get("b");

        if (aParam) {
          const member = data.find((m: TeamMember) => m.id === aParam);
          if (member) setPersonA(member);
        }
        if (bParam) {
          const member = data.find((m: TeamMember) => m.id === bParam);
          if (member) setPersonB(member);
        }
      })
      .catch(() => setMembersLoading(false));
  }, [searchParams]);

  const runComparison = async () => {
    if (!personA || !personB) return;

    setIsComparing(true);
    setComparison(null);

    try {
      const response = await fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personAId: personA.id,
          personBId: personB.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get comparison");
      }

      const data = await response.json();
      setComparison(data.comparison);
    } catch (error) {
      setComparison("Sorry, I encountered an error generating the comparison. Please try again.");
    } finally {
      setIsComparing(false);
    }
  };

  useEffect(() => {
    if (personA && personB) {
      runComparison();
    }
  }, [personA?.id, personB?.id]);

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
        <div className="mb-10">
          <h1 className="font-serif text-3xl font-light tracking-tight text-[var(--fg)]">Compare Team Members</h1>
          <p className="text-sm text-[var(--muted)] mt-2">
            Select two team members to see how their personalities complement each other
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Person A Selection */}
          <div>
            <h2 className="label-mono text-[var(--muted)] mb-4">
              {personA ? "Person A" : "Select Person A"}
            </h2>
            {personA ? (
              <div className="relative">
                <TeamCard member={personA} />
                <button
                  onClick={() => {
                    setPersonA(null);
                    setComparison(null);
                  }}
                  className="absolute top-3 right-3 w-7 h-7 bg-white border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--fg)] transition-editorial"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {allMembers.filter(m => m.id !== personB?.id).map((member) => (
                  <TeamCard
                    key={member.id}
                    member={member}
                    selectable
                    onSelect={() => setPersonA(member)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Person B Selection */}
          <div>
            <h2 className="label-mono text-[var(--muted)] mb-4">
              {personB ? "Person B" : "Select Person B"}
            </h2>
            {personB ? (
              <div className="relative">
                <TeamCard member={personB} />
                <button
                  onClick={() => {
                    setPersonB(null);
                    setComparison(null);
                  }}
                  className="absolute top-3 right-3 w-7 h-7 bg-white border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--fg)] transition-editorial"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {allMembers.filter(m => m.id !== personA?.id).map((member) => (
                  <TeamCard
                    key={member.id}
                    member={member}
                    selectable
                    onSelect={() => setPersonB(member)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Comparison Result */}
        {(personA && personB) && (
          <div className="bg-white border border-[var(--border)] p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-xl text-[var(--fg)]">
                {personA.name.split(" ")[0]} & {personB.name.split(" ")[0]} — Compatibility Analysis
              </h2>
              <div className="flex items-center gap-2">
                {!isComparing && comparison && (
                  <button
                    onClick={handleShareComparison}
                    className="px-4 py-2 border border-[var(--border)] text-[var(--fg)] font-mono text-xs uppercase tracking-[0.15em] hover:border-[var(--accent)] hover:bg-[var(--accent-light)] transition-editorial flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <svg className="w-3.5 h-3.5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        Share
                      </>
                    )}
                  </button>
                )}
                <button
                  onClick={runComparison}
                  disabled={isComparing}
                  className="px-4 py-2 border border-[var(--border)] text-[var(--fg)] font-mono text-xs uppercase tracking-[0.15em] hover:border-[var(--accent)] hover:bg-[var(--accent-light)] transition-editorial disabled:opacity-40"
                >
                  {isComparing ? "Analyzing..." : "Refresh"}
                </button>
              </div>
            </div>

            {isComparing ? (
              <div className="flex items-center justify-center py-16">
                <div className="flex flex-col items-center gap-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent)]"></div>
                  <p className="text-sm text-[var(--muted)]">Analyzing compatibility...</p>
                </div>
              </div>
            ) : comparison ? (
              <div className="prose prose-gray max-w-none">
                <div className="whitespace-pre-wrap text-sm text-[var(--fg)] leading-relaxed">
                  {comparison}
                </div>
              </div>
            ) : null}

            {/* Quick Stats */}
            {!isComparing && comparison && (
              <div className="mt-8 pt-6 border-t border-[var(--border)]">
                <h3 className="label-mono text-[var(--muted)] mb-4">At a Glance</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="border border-[var(--border)] p-4">
                    <p className="label-mono text-[var(--muted)] mb-1">MBTI</p>
                    <p className="font-mono text-sm text-[var(--fg)]">{personA.mbti} / {personB.mbti}</p>
                  </div>
                  <div className="border border-[var(--border)] p-4">
                    <p className="label-mono text-[var(--muted)] mb-1">DISC</p>
                    <p className="font-mono text-sm text-[var(--fg)]">{personA.disc.split(" ")[0]} / {personB.disc.split(" ")[0]}</p>
                  </div>
                  <div className="border border-[var(--border)] p-4">
                    <p className="label-mono text-[var(--muted)] mb-1">Enneagram</p>
                    <p className="font-mono text-xs text-[var(--fg)]">
                      {personA.enneagram.split(" ").slice(0, 2).join(" ")} / {personB.enneagram.split(" ").slice(0, 2).join(" ")}
                    </p>
                  </div>
                  <div className="border border-[var(--border)] p-4">
                    <p className="label-mono text-[var(--muted)] mb-1">Top Strength</p>
                    <p className="font-mono text-sm text-[var(--fg)]">
                      {personA.cliftonStrengths[0]} / {personB.cliftonStrengths[0]}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[var(--accent)]"></div>
      </div>
    }>
      <CompareContent />
    </Suspense>
  );
}
