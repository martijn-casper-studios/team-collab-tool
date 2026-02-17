"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { Avatar } from "@/components/Avatar";
import { TeamMember } from "@/data/team";
import Link from "next/link";

export default function TeamMemberProfile() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [member, setMember] = useState<TeamMember | null>(null);
  const [allMembers, setAllMembers] = useState<TeamMember[]>([]);
  const [memberLoading, setMemberLoading] = useState(true);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !member || !user) return;

    setUploadingAvatar(true);
    try {
      const canvas = document.createElement("canvas");
      const img = new Image();
      const reader = new FileReader();

      const dataUrl = await new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      await new Promise<void>((resolve) => {
        img.onload = () => {
          const maxSize = 200;
          let w = img.width;
          let h = img.height;
          if (w > h) {
            if (w > maxSize) { h = (h * maxSize) / w; w = maxSize; }
          } else {
            if (h > maxSize) { w = (w * maxSize) / h; h = maxSize; }
          }
          canvas.width = w;
          canvas.height = h;
          canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
          resolve();
        };
        img.src = dataUrl;
      });

      const resizedDataUrl = canvas.toDataURL("image/jpeg", 0.8);

      const res = await fetch("/api/update-avatar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, avatar: resizedDataUrl }),
      });

      if (!res.ok) throw new Error("Failed to upload");

      const { profile } = await res.json();
      setMember(profile);
    } catch (err) {
      console.error("Avatar upload failed:", err);
    } finally {
      setUploadingAvatar(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

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
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[var(--accent)]"></div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="max-w-4xl mx-auto px-4 py-10">
          <div className="text-center py-16">
            <h1 className="font-serif text-2xl text-[var(--fg)]">Team member not found</h1>
            <Link href="/dashboard" className="text-[var(--accent)] hover:underline mt-4 inline-block text-sm">
              Back to team directory
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 py-10">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--fg)] mb-8 text-sm transition-editorial">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to team
        </Link>

        {/* Header */}
        <div className="bg-white border border-[var(--border)] p-8 mb-6">
          <div className="flex items-start gap-6">
            <div className="relative group">
              <Avatar name={member.name} avatar={member.avatar} size="lg" />
              {isOwnProfile && (
                <>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingAvatar}
                    className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-all cursor-pointer"
                  >
                    <svg className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </>
              )}
              {uploadingAvatar && (
                <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h1 className="font-serif text-3xl font-light tracking-tight text-[var(--fg)]">{member.name}</h1>
              {member.role && <p className="text-sm text-[var(--muted)] mt-1">{member.role}</p>}
              <p className="text-xs text-[var(--muted)] mt-0.5 font-mono">{member.email}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                <span className="label-mono px-2.5 py-1 border border-[var(--border)] text-[var(--fg)]">
                  {member.mbti}
                </span>
                <span className="label-mono px-2.5 py-1 border border-[var(--border)] text-[var(--fg)]">
                  DISC: {member.disc}
                </span>
                {member.enneagram && member.enneagram !== "Not specified" && (
                  <span className="label-mono px-2.5 py-1 border border-[var(--border)] text-[var(--muted)]">
                    {member.enneagram}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isOwnProfile && (
                <button
                  onClick={() => router.push("/onboarding")}
                  className="px-4 py-2 border border-[var(--border)] text-[var(--fg)] text-sm hover:bg-[var(--accent-light)] transition-editorial"
                >
                  Retake Assessment
                </button>
              )}
              <button
                onClick={() => router.push(`/chat?about=${member.id}`)}
                className="px-4 py-2 bg-[var(--accent)] text-white font-mono text-xs uppercase tracking-[0.15em] hover:bg-[var(--accent-hover)] transition-editorial"
              >
                Ask about {member.name.split(" ")[0]}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Big Five */}
          <div className="bg-white border border-[var(--border)] p-6">
            <h2 className="label-mono text-[var(--muted)] mb-4">Big Five (OCEAN)</h2>
            <div className="space-y-3">
              {Object.entries(member.bigFive).map(([trait, level]) => (
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
            <h2 className="label-mono text-[var(--muted)] mb-4">CliftonStrengths</h2>
            <div className="flex flex-wrap gap-2">
              {member.cliftonStrengths.map((strength) => (
                <span key={strength} className="px-3 py-1.5 bg-[var(--accent-light)] text-[var(--accent)] text-sm font-mono">
                  {strength}
                </span>
              ))}
            </div>
          </div>

          {/* Communication Style */}
          <div className="bg-white border border-[var(--border)] p-6">
            <h2 className="label-mono text-[var(--muted)] mb-4">Communication Style</h2>
            <div className="space-y-4">
              <div>
                <h3 className="label-mono text-[var(--accent)] mb-2">How to communicate</h3>
                <ul className="space-y-2">
                  {member.communicationStyle.howToCommunicate.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--fg)]">
                      <span className="text-[var(--accent)] mt-1 text-xs">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-3 border-t border-[var(--border)]">
                <h3 className="label-mono text-[var(--accent)] mb-2">Feedback preference</h3>
                <ul className="space-y-2">
                  {member.communicationStyle.feedbackPreference.map((item, i) => (
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
            <h2 className="label-mono text-[var(--muted)] mb-4">Ideal Collaborator</h2>
            <p className="text-sm text-[var(--fg)] leading-relaxed">{member.idealCollaborator}</p>
          </div>

          {/* User Manual */}
          <div className="bg-white border border-[var(--border)] p-6 lg:col-span-2">
            <h2 className="label-mono text-[var(--muted)] mb-4">User Manual</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="label-mono text-[var(--accent)] mb-3">How to get the best out of me</h3>
                <ul className="space-y-2">
                  {member.userManual.howToGetBestOut.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--fg)]">
                      <span className="text-[var(--accent)] mt-1 text-xs">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-l border-[var(--border)] pl-6">
                <h3 className="label-mono text-[#8b5e5e] mb-3">What shuts me down</h3>
                <ul className="space-y-2">
                  {member.userManual.whatShutsDown.map((item, i) => (
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

        {/* Compare with others */}
        <div className="mt-8 border border-[var(--border)] bg-white p-6">
          <h2 className="label-mono text-[var(--muted)] mb-4">Compare with other team members</h2>
          <div className="flex flex-wrap gap-2">
            {allMembers.filter(m => m.id !== member.id).map((other) => (
              <Link
                key={other.id}
                href={`/compare?a=${member.id}&b=${other.id}`}
                className="px-4 py-2 border border-[var(--border)] text-[var(--fg)] text-sm font-mono hover:border-[var(--accent)] hover:bg-[var(--accent-light)] transition-editorial"
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
