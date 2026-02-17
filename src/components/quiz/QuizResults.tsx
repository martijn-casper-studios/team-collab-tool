"use client";

import { TeamMember } from "@/data/team";
import { Avatar } from "@/components/Avatar";

interface QuizResultsProps {
  profile: TeamMember;
  onConfirm: () => void;
  onRetake: () => void;
  isSaving: boolean;
}

export function QuizResults({
  profile,
  onConfirm,
  onRetake,
  isSaving,
}: QuizResultsProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="font-serif text-3xl font-light tracking-tight text-[var(--fg)] mb-2">
          Your Collaboration Profile
        </h1>
        <p className="text-sm text-[var(--muted)]">
          Review your AI-generated profile below. If it feels right, join the team.
        </p>
      </div>

      {/* Header */}
      <div className="bg-white border border-[var(--border)] p-8 mb-5">
        <div className="flex items-start gap-6">
          <Avatar name={profile.name} avatar={profile.avatar} size="lg" />
          <div className="flex-1">
            <h2 className="font-serif text-2xl text-[var(--fg)]">{profile.name}</h2>
            <p className="text-xs text-[var(--muted)] mt-1 font-mono">{profile.email}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="label-mono px-2.5 py-1 border border-[var(--border)] text-[var(--fg)]">
                {profile.mbti}
              </span>
              <span className="label-mono px-2.5 py-1 border border-[var(--border)] text-[var(--fg)]">
                DISC: {profile.disc}
              </span>
              {profile.enneagram && profile.enneagram !== "Not specified" && (
                <span className="label-mono px-2.5 py-1 border border-[var(--border)] text-[var(--muted)]">
                  {profile.enneagram}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Big Five */}
        <div className="bg-white border border-[var(--border)] p-6">
          <h3 className="label-mono text-[var(--muted)] mb-4">Big Five (OCEAN)</h3>
          <div className="space-y-3">
            {Object.entries(profile.bigFive).map(([trait, level]) => (
              <div key={trait} className="flex items-center justify-between">
                <span className="text-sm text-[var(--fg)] capitalize">{trait}</span>
                <span className="label-mono px-2 py-0.5 border border-[var(--border)] text-[var(--muted)]">
                  {level}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths */}
        <div className="bg-white border border-[var(--border)] p-6">
          <h3 className="label-mono text-[var(--muted)] mb-4">CliftonStrengths</h3>
          <div className="flex flex-wrap gap-2">
            {profile.cliftonStrengths.map((strength) => (
              <span
                key={strength}
                className="px-3 py-1.5 bg-[var(--accent-light)] text-[var(--accent)] text-sm font-mono"
              >
                {strength}
              </span>
            ))}
          </div>
        </div>

        {/* Communication Style */}
        <div className="bg-white border border-[var(--border)] p-6">
          <h3 className="label-mono text-[var(--muted)] mb-4">Communication Style</h3>
          <div className="space-y-4">
            <div>
              <h4 className="label-mono text-[var(--accent)] mb-2">How to communicate</h4>
              <ul className="space-y-2">
                {profile.communicationStyle.howToCommunicate.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[var(--fg)]">
                    <span className="text-[var(--accent)] mt-1 text-xs">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-3 border-t border-[var(--border)]">
              <h4 className="label-mono text-[var(--accent)] mb-2">Feedback preference</h4>
              <ul className="space-y-2">
                {profile.communicationStyle.feedbackPreference.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[var(--fg)]">
                    <span className="text-[var(--accent)] mt-1 text-xs">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Ideal Collaborator */}
        <div className="bg-white border border-[var(--border)] p-6">
          <h3 className="label-mono text-[var(--muted)] mb-4">Ideal Collaborator</h3>
          <p className="text-sm text-[var(--fg)] leading-relaxed">
            {profile.idealCollaborator}
          </p>
        </div>

        {/* User Manual */}
        <div className="bg-white border border-[var(--border)] p-6 lg:col-span-2">
          <h3 className="label-mono text-[var(--muted)] mb-4">User Manual</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="label-mono text-[var(--accent)] mb-3">How to get the best out of me</h4>
              <ul className="space-y-2">
                {profile.userManual.howToGetBestOut.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[var(--fg)]">
                    <span className="text-[var(--accent)] mt-1 text-xs">+</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-l border-[var(--border)] pl-6">
              <h4 className="label-mono text-[#8b5e5e] mb-3">What shuts me down</h4>
              <ul className="space-y-2">
                {profile.userManual.whatShutsDown.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[var(--fg)]">
                    <span className="text-[#8b5e5e] mt-1 text-xs">×</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-10 flex items-center justify-center gap-6">
        <button
          onClick={onRetake}
          disabled={isSaving}
          className="px-6 py-3 text-[var(--muted)] hover:text-[var(--fg)] text-sm transition-editorial disabled:opacity-40"
        >
          Retake Assessment
        </button>
        <button
          onClick={onConfirm}
          disabled={isSaving}
          className="px-8 py-3 bg-[var(--accent)] text-white font-mono text-sm uppercase tracking-[0.2em] hover:bg-[var(--accent-hover)] transition-editorial disabled:opacity-40"
        >
          {isSaving ? "Saving..." : "Join the Team"}
        </button>
      </div>
    </div>
  );
}
