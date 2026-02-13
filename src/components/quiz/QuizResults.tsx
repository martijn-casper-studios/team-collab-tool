"use client";

import { TeamMember } from "@/data/team";

interface QuizResultsProps {
  profile: TeamMember;
  onConfirm: () => void;
  onRetake: () => void;
  isSaving: boolean;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function getAvatarColor(name: string): string {
  const colors = [
    "bg-indigo-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-red-500",
    "bg-orange-500",
    "bg-amber-500",
    "bg-emerald-500",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-blue-500",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export function QuizResults({
  profile,
  onConfirm,
  onRetake,
  isSaving,
}: QuizResultsProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Your Collaboration Profile
        </h1>
        <p className="text-gray-500">
          Review your AI-generated profile below. If it feels right, join the
          team!
        </p>
      </div>

      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
        <div className="flex items-start gap-6">
          <div
            className={`w-20 h-20 rounded-2xl ${getAvatarColor(profile.name)} flex items-center justify-center text-white font-bold text-2xl`}
          >
            {getInitials(profile.name)}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
            <p className="text-sm text-gray-400 mt-1">{profile.email}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                {profile.mbti}
              </span>
              <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                DISC: {profile.disc}
              </span>
              {profile.enneagram && profile.enneagram !== "Not specified" && (
                <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-amber-100 text-amber-700">
                  {profile.enneagram}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Big Five */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Big Five (OCEAN)
          </h3>
          <div className="space-y-3">
            {Object.entries(profile.bigFive).map(([trait, level]) => (
              <div key={trait} className="flex items-center justify-between">
                <span className="text-gray-600 capitalize">{trait}</span>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    level.toLowerCase().includes("high") ||
                    level.toLowerCase().includes("very high")
                      ? "bg-green-100 text-green-700"
                      : level.toLowerCase().includes("low")
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {level}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            CliftonStrengths
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.cliftonStrengths.map((strength) => (
              <span
                key={strength}
                className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium"
              >
                {strength}
              </span>
            ))}
          </div>
        </div>

        {/* Communication Style */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Communication Style
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                How to communicate
              </h4>
              <ul className="space-y-2">
                {profile.communicationStyle.howToCommunicate.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <svg
                      className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Feedback preference
              </h4>
              <ul className="space-y-2">
                {profile.communicationStyle.feedbackPreference.map(
                  (item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <svg
                        className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Ideal Collaborator */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Ideal Collaborator
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {profile.idealCollaborator}
          </p>
        </div>

        {/* User Manual */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            User Manual
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="flex items-center gap-2 text-sm font-medium text-green-700 mb-3">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                How to get the best out of me
              </h4>
              <ul className="space-y-2">
                {profile.userManual.howToGetBestOut.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <span className="text-green-500 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="flex items-center gap-2 text-sm font-medium text-red-700 mb-3">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                What shuts me down
              </h4>
              <ul className="space-y-2">
                {profile.userManual.whatShutsDown.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <span className="text-red-500 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={onRetake}
          disabled={isSaving}
          className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors disabled:opacity-50"
        >
          Retake Assessment
        </button>
        <button
          onClick={onConfirm}
          disabled={isSaving}
          className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Join the Team"}
        </button>
      </div>
    </div>
  );
}
