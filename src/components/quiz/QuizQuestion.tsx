"use client";

import { QuizQuestion as QuizQuestionType } from "@/data/quiz-questions";

interface QuizQuestionProps {
  question: QuizQuestionType;
  currentIndex: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  onSelect: (label: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function QuizQuestion({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onSelect,
  onNext,
  onBack,
}: QuizQuestionProps) {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="label-mono text-[var(--muted)]">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span className="label-mono text-[var(--muted)]">{question.topic}</span>
        </div>
        <div className="w-full h-px bg-[var(--border)] relative">
          <div
            className="h-px bg-[var(--accent)] transition-editorial absolute inset-y-0 left-0"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white border border-[var(--border)] p-8 mb-6">
        <h2 className="font-serif text-xl text-[var(--fg)] mb-6 leading-relaxed">
          {question.scenario}
        </h2>

        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.label}
              onClick={() => onSelect(option.label)}
              className={`w-full text-left p-4 border transition-editorial ${
                selectedAnswer === option.label
                  ? "border-[var(--accent)] bg-[var(--accent-light)]"
                  : "border-[var(--border)] hover:border-[var(--accent)]"
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`w-7 h-7 flex items-center justify-center flex-shrink-0 font-mono text-xs font-bold border ${
                    selectedAnswer === option.label
                      ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                      : "border-[var(--border)] text-[var(--muted)]"
                  }`}
                >
                  {option.label}
                </span>
                <span
                  className={`text-sm leading-relaxed pt-0.5 ${
                    selectedAnswer === option.label
                      ? "text-[var(--fg)] font-medium"
                      : "text-[var(--fg)]"
                  }`}
                >
                  {option.text}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 px-4 py-2 text-[var(--muted)] hover:text-[var(--fg)] disabled:opacity-30 disabled:cursor-not-allowed transition-editorial text-sm"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <button
          onClick={onNext}
          disabled={!selectedAnswer}
          className="flex items-center gap-2 px-6 py-2 bg-[var(--accent)] text-white font-mono text-xs uppercase tracking-[0.15em] hover:bg-[var(--accent-hover)] disabled:opacity-40 disabled:cursor-not-allowed transition-editorial"
        >
          {currentIndex === totalQuestions - 1 ? "See Results" : "Next"}
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
