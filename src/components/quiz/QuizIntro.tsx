"use client";

interface QuizIntroProps {
  userName: string;
  userImage?: string;
  onStart: () => void;
}

export function QuizIntro({ userName, userImage, onStart }: QuizIntroProps) {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="mb-10">
        {userImage ? (
          <img
            src={userImage}
            alt={userName}
            className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-[var(--border)]"
          />
        ) : (
          <div className="w-16 h-16 rounded-full mx-auto mb-4 border border-[var(--border)] bg-[var(--bg)] flex items-center justify-center">
            <span className="text-xl font-mono font-bold text-[var(--fg)]">
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <h1 className="font-serif text-3xl font-light tracking-tight text-[var(--fg)] mb-2">
          Welcome, {userName.split(" ")[0]}
        </h1>
        <p className="text-sm text-[var(--muted)]">
          Let&apos;s build your team collaboration profile
        </p>
      </div>

      <div className="bg-white border border-[var(--border)] p-8 mb-8 text-left">
        <h2 className="label-mono text-[var(--muted)] mb-5">
          How this works
        </h2>
        <div className="space-y-5 text-sm text-[var(--fg)]">
          <div className="flex items-start gap-4">
            <div className="w-7 h-7 border border-[var(--border)] flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="font-mono text-xs font-bold text-[var(--accent)]">1</span>
            </div>
            <p>
              Answer <strong>10 workplace scenario questions</strong> — there
              are no right or wrong answers, just pick what feels most natural.
            </p>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-7 h-7 border border-[var(--border)] flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="font-mono text-xs font-bold text-[var(--accent)]">2</span>
            </div>
            <p>
              Our AI analyzes your responses across{" "}
              <strong>5 personality frameworks</strong> (MBTI, DISC, Enneagram,
              CliftonStrengths, Big Five).
            </p>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-7 h-7 border border-[var(--border)] flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="font-mono text-xs font-bold text-[var(--accent)]">3</span>
            </div>
            <p>
              You get a <strong>complete collaboration profile</strong> —
              communication style, user manual, ideal collaborator, and more.
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onStart}
        className="px-8 py-3 bg-[var(--accent)] text-white font-mono text-sm uppercase tracking-[0.2em] hover:bg-[var(--accent-hover)] transition-editorial"
      >
        Start Assessment
      </button>
      <p className="mt-3 label-mono text-[var(--muted)]">10 questions</p>
    </div>
  );
}
