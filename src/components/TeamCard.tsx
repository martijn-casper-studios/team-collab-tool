"use client";

import { TeamMember } from "@/data/team";
import Link from "next/link";

const mbtiColors: Record<string, string> = {
  "INTJ": "bg-purple-100 text-purple-700",
  "ENTJ": "bg-red-100 text-red-700",
  "ENTJ-A": "bg-red-100 text-red-700",
  "ENTP": "bg-orange-100 text-orange-700",
  "INFJ": "bg-green-100 text-green-700",
  "ENFJ": "bg-pink-100 text-pink-700",
  "ENFJ/INFJ": "bg-pink-100 text-pink-700",
  "ESTJ": "bg-blue-100 text-blue-700",
  "ESTJ/INTJ-A": "bg-blue-100 text-blue-700",
  "default": "bg-gray-100 text-gray-700"
};

const discColors: Record<string, string> = {
  "D": "bg-red-50 text-red-600",
  "I": "bg-yellow-50 text-yellow-600",
  "S": "bg-green-50 text-green-600",
  "C": "bg-blue-50 text-blue-600",
  "default": "bg-gray-50 text-gray-600"
};

function getMbtiColor(mbti: string): string {
  return mbtiColors[mbti] || mbtiColors["default"];
}

function getDiscColor(disc: string): string {
  const firstLetter = disc.charAt(0).toUpperCase();
  return discColors[firstLetter] || discColors["default"];
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map(n => n[0])
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

interface TeamCardProps {
  member: TeamMember;
  selected?: boolean;
  onSelect?: () => void;
  selectable?: boolean;
}

export function TeamCard({ member, selected, onSelect, selectable }: TeamCardProps) {
  const cardContent = (
    <div
      className={`team-card bg-white rounded-xl shadow-sm border p-6 cursor-pointer ${
        selected ? 'ring-2 ring-indigo-500 border-indigo-500' : 'border-gray-100 hover:border-gray-200'
      }`}
      onClick={selectable ? onSelect : undefined}
    >
      <div className="flex items-start gap-4">
        <div className={`w-14 h-14 rounded-full ${getAvatarColor(member.name)} flex items-center justify-center text-white font-semibold text-lg flex-shrink-0`}>
          {getInitials(member.name)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-lg">{member.name}</h3>
          {member.role && (
            <p className="text-sm text-gray-500">{member.role}</p>
          )}
          <div className="flex flex-wrap gap-2 mt-3">
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getMbtiColor(member.mbti)}`}>
              {member.mbti}
            </span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getDiscColor(member.disc)}`}>
              {member.disc.split(" ")[0]}
            </span>
            {member.enneagram && member.enneagram !== "Not specified" && (
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                {member.enneagram.split(" ")[0]} {member.enneagram.split(" ")[1]}
              </span>
            )}
          </div>
        </div>
        {selectable && (
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
            selected ? 'bg-indigo-500 border-indigo-500' : 'border-gray-300'
          }`}>
            {selected && (
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-50">
        <p className="text-sm text-gray-600 line-clamp-2">
          {member.userManual.howToGetBestOut[0]}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {member.cliftonStrengths.slice(0, 3).map((strength) => (
          <span key={strength} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
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
