"use client";

import { TeamMember } from "@/data/team";
import Link from "next/link";
import { Avatar } from "@/components/Avatar";

interface TeamCardProps {
  member: TeamMember;
  selected?: boolean;
  onSelect?: () => void;
  selectable?: boolean;
}

export function TeamCard({ member, selected, onSelect, selectable }: TeamCardProps) {
  const cardContent = (
    <div
      className={`team-card bg-white border p-6 cursor-pointer ${
        selected
          ? "border-[var(--accent)] bg-[var(--accent-light)]"
          : "border-[var(--border)] hover:border-[var(--accent)]"
      }`}
      onClick={selectable ? onSelect : undefined}
    >
      <div className="flex items-start gap-4">
        <Avatar name={member.name} avatar={member.avatar} size="md" />
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-lg text-[var(--fg)]">{member.name}</h3>
          {member.role && (
            <p className="text-xs text-[var(--muted)] mt-0.5">{member.role}</p>
          )}
          <div className="flex flex-wrap gap-1.5 mt-3">
            <span className="label-mono px-2 py-1 border border-[var(--border)] text-[var(--fg)]">
              {member.mbti}
            </span>
            <span className="label-mono px-2 py-1 border border-[var(--border)] text-[var(--fg)]">
              {member.disc.split(" ")[0]}
            </span>
            {member.enneagram && member.enneagram !== "Not specified" && (
              <span className="label-mono px-2 py-1 border border-[var(--border)] text-[var(--muted)]">
                {member.enneagram.split(" ")[0]} {member.enneagram.split(" ")[1]}
              </span>
            )}
          </div>
        </div>
        {selectable && (
          <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-editorial ${
              selected
                ? "bg-[var(--accent)] border-[var(--accent)]"
                : "border-[var(--border)]"
            }`}
          >
            {selected && (
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-[var(--border)]">
        <p className="text-sm text-[var(--muted)] line-clamp-2 leading-relaxed">
          {member.userManual.howToGetBestOut[0]}
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {member.cliftonStrengths.slice(0, 3).map((strength) => (
          <span
            key={strength}
            className="px-2 py-0.5 bg-[var(--accent-light)] text-[var(--accent)] text-xs font-mono"
          >
            {strength}
          </span>
        ))}
      </div>
    </div>
  );

  if (selectable) {
    return cardContent;
  }

  return (
    <Link href={`/team/${member.id}`}>
      {cardContent}
    </Link>
  );
}
