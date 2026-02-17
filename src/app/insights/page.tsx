"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Avatar } from "@/components/Avatar";
import Link from "next/link";

interface InsightEntry {
  id: string;
  name: string;
  reason: string;
}

interface Insights {
  similar: InsightEntry;
  compatible: InsightEntry;
  communicationMatch: InsightEntry;
  growthPartner: InsightEntry;
}

const insightMeta: {
  key: keyof Insights;
  label: string;
  sublabel: string;
  symbol: string;
}[] = [
  {
    key: "similar",
    label: "Most Similar",
    sublabel: "Shares the most traits",
    symbol: "~",
  },
  {
    key: "compatible",
    label: "Most Compatible",
    sublabel: "Best collaboration partner",
    symbol: "+",
  },
  {
    key: "communicationMatch",
    label: "Communication Match",
    sublabel: "Most aligned styles",
    symbol: "=",
  },
  {
    key: "growthPartner",
    label: "Growth Partner",
    sublabel: "Productive challenge",
    symbol: "^",
  },
];

export default function InsightsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [insights, setInsights] = useState<Insights | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleShare = async (key: string, label: string, entry: InsightEntry) => {
    const compareUrl = `${window.location.origin}/compare?a=${user?.teamMember?.id ?? ""}&b=${entry.id}`;
    const message = `Check out our team compatibility! ${user?.name} and ${entry.name} are a ${label} match → ${compareUrl}`;
    await navigator.clipboard.writeText(message);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/");
      return;
    }
    if (!user.hasProfile) {
      router.push("/onboarding");
      return;
    }

    fetch("/api/insights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load insights");
        return res.json();
      })
      .then((data) => {
        setInsights(data.insights);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="flex items-center justify-center py-32">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent)]" />
            <p className="text-sm text-[var(--muted)]">Generating your team insights...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <p className="text-[#8b5e5e] text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[var(--accent)] text-white font-mono text-xs uppercase tracking-[0.15em] hover:bg-[var(--accent-hover)] transition-editorial"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!insights || !user) return null;

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-10">
          <h1 className="font-serif text-3xl font-light tracking-tight text-[var(--fg)]">
            Your Team Insights
          </h1>
          <p className="text-sm text-[var(--muted)] mt-2">
            AI-powered analysis of how you relate to your teammates, {user.name.split(" ")[0]}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {insightMeta.map(({ key, label, sublabel, symbol }) => {
            const entry = insights[key];
            if (!entry) return null;
            return (
              <div
                key={key}
                className="bg-white border border-[var(--border)] p-6 transition-editorial hover:border-[var(--accent)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 border border-[var(--border)] flex items-center justify-center font-mono text-sm font-bold text-[var(--accent)]">
                    {symbol}
                  </div>
                  <div>
                    <h2 className="label-mono text-[var(--fg)]">{label}</h2>
                    <p className="text-xs text-[var(--muted)] mt-0.5">{sublabel}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-3 pl-11">
                  <Avatar name={entry.name} size="sm" />
                  <span className="font-serif text-lg text-[var(--fg)]">{entry.name}</span>
                </div>

                <p className="text-sm text-[var(--muted)] leading-relaxed pl-11 mb-4">
                  {entry.reason}
                </p>

                <div className="pl-11 flex items-center gap-4">
                  <Link
                    href={`/compare?a=${user.teamMember?.id ?? ""}&b=${entry.id}`}
                    className="label-mono text-[var(--accent)] hover:text-[var(--accent-hover)] transition-editorial"
                  >
                    Compare with {entry.name.split(" ")[0]} →
                  </Link>
                  <button
                    onClick={() => handleShare(key, label, entry)}
                    className="label-mono text-[var(--muted)] hover:text-[var(--fg)] transition-editorial flex items-center gap-1.5"
                  >
                    {copiedKey === key ? (
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
                </div>
              </div>
            );
          })}
        </div>

        <div className="border border-[var(--border)] bg-white p-6 text-center">
          <p className="text-sm text-[var(--muted)] mb-4">
            Want to explore more team dynamics?
          </p>
          <Link
            href="/compare"
            className="inline-block px-5 py-2.5 bg-[var(--accent)] text-white font-mono text-xs uppercase tracking-[0.2em] hover:bg-[var(--accent-hover)] transition-editorial"
          >
            Go to Compare
          </Link>
        </div>
      </main>
    </div>
  );
}
