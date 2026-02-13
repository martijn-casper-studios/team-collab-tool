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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {user && !user.hasProfile && (
          <div className="mb-6 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg px-4 py-3 text-sm flex items-center justify-between">
            <span>
              Welcome, {user.name}! Take the personality assessment to create your collaboration profile.
            </span>
            <Link
              href="/onboarding"
              className="ml-4 px-4 py-1.5 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors flex-shrink-0"
            >
              Take Assessment
            </Link>
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Team Directory</h1>
          <p className="text-gray-500 mt-1">
            Click on a team member to view their full profile and collaboration guide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => router.push("/chat")}
              className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50 transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Ask AI Assistant</h3>
                <p className="text-sm text-gray-500">Get personalized advice on working with teammates</p>
              </div>
            </button>

            <button
              onClick={() => router.push("/compare")}
              className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50 transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Compare Team Members</h3>
                <p className="text-sm text-gray-500">See how two personalities complement each other</p>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
