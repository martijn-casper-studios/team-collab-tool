"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Navigation } from "@/components/Navigation";
import { TeamCard } from "@/components/TeamCard";
import { teamMembers, getTeamMemberById, TeamMember } from "@/data/team";

function CompareContent() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [personA, setPersonA] = useState<TeamMember | null>(null);
  const [personB, setPersonB] = useState<TeamMember | null>(null);
  const [comparison, setComparison] = useState<string | null>(null);
  const [isComparing, setIsComparing] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const aParam = searchParams.get("a");
    const bParam = searchParams.get("b");

    if (aParam) {
      const member = getTeamMemberById(aParam);
      if (member) setPersonA(member);
    }
    if (bParam) {
      const member = getTeamMemberById(bParam);
      if (member) setPersonB(member);
    }
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

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Compare Team Members</h1>
          <p className="text-gray-500 mt-1">
            Select two team members to see how their personalities complement each other
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Person A Selection */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
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
                  className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {teamMembers.filter(m => m.id !== personB?.id).map((member) => (
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
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
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
                  className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {teamMembers.filter(m => m.id !== personA?.id).map((member) => (
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {personA.name.split(" ")[0]} & {personB.name.split(" ")[0]} — Compatibility Analysis
              </h2>
              <button
                onClick={runComparison}
                disabled={isComparing}
                className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-200 transition-colors disabled:opacity-50"
              >
                {isComparing ? "Analyzing..." : "Refresh Analysis"}
              </button>
            </div>

            {isComparing ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center gap-4">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                  <p className="text-gray-500">Analyzing compatibility...</p>
                </div>
              </div>
            ) : comparison ? (
              <div className="prose prose-gray max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {comparison}
                </div>
              </div>
            ) : null}

            {/* Quick Stats */}
            {!isComparing && comparison && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-medium text-gray-500 mb-4">At a Glance</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">MBTI</p>
                    <p className="font-medium text-gray-900">{personA.mbti} ↔ {personB.mbti}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">DISC</p>
                    <p className="font-medium text-gray-900">{personA.disc.split(" ")[0]} ↔ {personB.disc.split(" ")[0]}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">Enneagram</p>
                    <p className="font-medium text-gray-900 text-sm">
                      {personA.enneagram.split(" ").slice(0, 2).join(" ")} ↔ {personB.enneagram.split(" ").slice(0, 2).join(" ")}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">Top Strengths</p>
                    <p className="font-medium text-gray-900 text-sm">
                      {personA.cliftonStrengths[0]} ↔ {personB.cliftonStrengths[0]}
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    }>
      <CompareContent />
    </Suspense>
  );
}
