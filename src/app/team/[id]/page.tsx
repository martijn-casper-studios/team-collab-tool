"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { TeamMember } from "@/data/team";
import Link from "next/link";

function getInitials(name: string): string {
  return name.split(" ").map(n => n[0]).join("").toUpperCase();
}

function getAvatarColor(name: string): string {
  const colors = [
    "bg-indigo-500", "bg-purple-500", "bg-pink-500", "bg-red-500",
    "bg-orange-500", "bg-amber-500", "bg-emerald-500", "bg-teal-500",
    "bg-cyan-500", "bg-blue-500",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export default function TeamMemberProfile() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [member, setMember] = useState<TeamMember | null>(null);
  const [allMembers, setAllMembers] = useState<TeamMember[]>([]);
  const [memberLoading, setMemberLoading] = useState(true);

  useEffect(() => {
    const id = params.id as string;
    Promise.all([
      fetch(`/api/team/${id}`).then((res) => (res.ok ? res.json() : null)),
      fetch("/api/team").then((res) => res.json()),
    ])
      .then(([memberData, allData]) => {
        setMember(memberData);
        setAllMembers(allData);
        setMemberLoading(false);
      })
      .catch(() => setMemberLoading(false));
  }, [params.id]);

  const isOwnProfile = user?.email && member?.email && user.email.toLowerCase() === member.email.toLowerCase();

  if (isLoading || memberLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900">Team member not found</h1>
            <Link href="/dashboard" className="text-indigo-600 hover:underline mt-4 inline-block">
              Back to team directory
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to team
        </Link>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
          <div className="flex items-start gap-6">
            <div className={`w-20 h-20 rounded-2xl ${getAvatarColor(member.name)} flex items-center justify-center text-white font-bold text-2xl`}>
              {getInitials(member.name)}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{member.name}</h1>
              {member.role && <p className="text-gray-500 mt-1">{member.role}</p>}
              <p className="text-sm text-gray-400 mt-1">{member.email}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                  {member.mbti}
                </span>
                <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                  DISC: {member.disc}
                </span>
                {member.enneagram && member.enneagram !== "Not specified" && (
                  <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-amber-100 text-amber-700">
                    {member.enneagram}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isOwnProfile && (
                <button
                  onClick={() => router.push("/onboarding")}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Retake Assessment
                </button>
              )}
              <button
                onClick={() => router.push(`/chat?about=${member.id}`)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Ask about {member.name.split(" ")[0]}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Big Five */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Big Five (OCEAN)</h2>
            <div className="space-y-3">
              {Object.entries(member.bigFive).map(([trait, level]) => (
                <div key={trait} className="flex items-center justify-between">
                  <span className="text-gray-600 capitalize">{trait}</span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    level.toLowerCase().includes("high") || level.toLowerCase().includes("very high")
                      ? "bg-green-100 text-green-700"
                      : level.toLowerCase().includes("low")
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {level}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">CliftonStrengths</h2>
            <div className="flex flex-wrap gap-2">
              {member.cliftonStrengths.map((strength) => (
                <span key={strength} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium">
                  {strength}
                </span>
              ))}
            </div>
          </div>

          {/* Communication Style */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Communication Style</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">How to communicate</h3>
                <ul className="space-y-2">
                  {member.communicationStyle.howToCommunicate.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Feedback preference</h3>
                <ul className="space-y-2">
                  {member.communicationStyle.feedbackPreference.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Ideal Collaborator */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Ideal Collaborator</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{member.idealCollaborator}</p>
          </div>

          {/* User Manual */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">User Manual</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="flex items-center gap-2 text-sm font-medium text-green-700 mb-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  How to get the best out of me
                </h3>
                <ul className="space-y-2">
                  {member.userManual.howToGetBestOut.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-green-500 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="flex items-center gap-2 text-sm font-medium text-red-700 mb-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  What shuts me down
                </h3>
                <ul className="space-y-2">
                  {member.userManual.whatShutsDown.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-red-500 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Compare with others */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Compare with other team members</h2>
          <div className="flex flex-wrap gap-2">
            {allMembers.filter(m => m.id !== member.id).map((other) => (
              <Link
                key={other.id}
                href={`/compare?a=${member.id}&b=${other.id}`}
                className="px-4 py-2 bg-gray-50 hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 rounded-lg text-sm transition-colors"
              >
                vs {other.name}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
