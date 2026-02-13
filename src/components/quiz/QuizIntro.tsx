"use client";

interface QuizIntroProps {
  userName: string;
  userImage?: string;
  onStart: () => void;
}

export function QuizIntro({ userName, userImage, onStart }: QuizIntroProps) {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="mb-8">
        {userImage ? (
          <img
            src={userImage}
            alt={userName}
            className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-indigo-100"
          />
        ) : (
          <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-indigo-100 flex items-center justify-center">
            <span className="text-2xl font-bold text-indigo-600">
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome, {userName.split(" ")[0]}!
        </h1>
        <p className="text-gray-500 text-lg">
          Let&apos;s build your team collaboration profile
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8 text-left">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          How this works
        </h2>
        <div className="space-y-4 text-gray-600">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-sm font-bold text-indigo-600">1</span>
            </div>
            <p>
              Answer <strong>10 workplace scenario questions</strong> — there
              are no right or wrong answers, just pick what feels most natural.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-sm font-bold text-indigo-600">2</span>
            </div>
            <p>
              Our AI analyzes your responses across{" "}
              <strong>5 personality frameworks</strong> (MBTI, DISC, Enneagram,
              CliftonStrengths, Big Five).
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-sm font-bold text-indigo-600">3</span>
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
        className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors text-lg"
      >
        Start Assessment
      </button>
      <p className="mt-3 text-sm text-gray-400">10 questions — takes a few minutes</p>
    </div>
  );
}
