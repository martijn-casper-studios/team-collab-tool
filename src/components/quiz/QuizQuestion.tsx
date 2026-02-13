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
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span>
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span>{question.topic}</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {question.scenario}
        </h2>

        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.label}
              onClick={() => onSelect(option.label)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedAnswer === option.label
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                    selectedAnswer === option.label
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {option.label}
                </span>
                <span
                  className={`text-sm leading-relaxed pt-1 ${
                    selectedAnswer === option.label
                      ? "text-indigo-900 font-medium"
                      : "text-gray-700"
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
          className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>

        <button
          onClick={onNext}
          disabled={!selectedAnswer}
          className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {currentIndex === totalQuestions - 1 ? "See Results" : "Next"}
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
