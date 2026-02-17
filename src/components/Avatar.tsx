"use client";

const AVATAR_COLORS = [
  "bg-[#3d7068]",
  "bg-[#6b5b73]",
  "bg-[#7a6455]",
  "bg-[#4a6670]",
  "bg-[#6b6347]",
  "bg-[#5c6b5c]",
  "bg-[#70565e]",
  "bg-[#556b6b]",
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

const sizeClasses = {
  sm: "w-7 h-7 text-xs",
  md: "w-12 h-12 text-sm",
  lg: "w-16 h-16 text-lg",
} as const;

interface AvatarProps {
  name: string;
  avatar?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Avatar({ name, avatar, size = "md", className = "" }: AvatarProps) {
  const sizeClass = sizeClasses[size];

  if (avatar) {
    return (
      <img
        src={avatar}
        alt={name}
        className={`${sizeClass} rounded-full object-cover flex-shrink-0 ${className}`}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} rounded-full ${getAvatarColor(name)} flex items-center justify-center text-white font-mono font-bold flex-shrink-0 ${className}`}
    >
      {getInitials(name)}
    </div>
  );
}
