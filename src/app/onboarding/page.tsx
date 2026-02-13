"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { QuizIntro } from "@/components/quiz/QuizIntro";
import { QuizQuestion } from "@/components/quiz/QuizQuestion";
import { QuizResults } from "@/components/quiz/QuizResults";
import { quizQuestions } from "@/data/quiz-questions";
import { TeamMember } from "@/data/team";

type Stage = "intro" | "questions" | "generating" | "preview";

export default function OnboardingPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const [stage, setStage] = useState<Stage>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [generatedProfile, setGeneratedProfile] = useState<TeamMember | null>(
    null
  );
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    router.push("/");
    return null;
  }

  const handleStartQuiz = () => {
    setStage("questions");
    setCurrentQuestion(0);
    setAnswers({});
    setError(null);
  };

  const handleSelectAnswer = (label: string) => {
    setAnswers((prev) => ({ ...prev, [quizQuestions[currentQuestion].id]: label }));
  };

  const handleNext = async () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Last question — generate profile
      setStage("generating");
      setError(null);
      try {
        const response = await fetch("/api/generate-profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            answers,
            userName: user.name,
            userEmail: user.email,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate profile");
        }

        const data = await response.json();
        setGeneratedProfile(data.profile);
        setStage("preview");
      } catch {
        setError(
          "Something went wrong generating your profile. Please try again."
        );
        setStage("questions");
        setCurrentQuestion(quizQuestions.length - 1);
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleConfirm = async () => {
    if (!generatedProfile) return;
    setIsSaving(true);
    try {
      const response = await fetch("/api/save-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(generatedProfile),
      });

      if (!response.ok) {
        throw new Error("Failed to save profile");
      }

      router.push("/dashboard");
    } catch {
      setError("Failed to save your profile. Please try again.");
      setIsSaving(false);
    }
  };

  const handleRetake = () => {
    setStage("intro");
    setCurrentQuestion(0);
    setAnswers({});
    setGeneratedProfile(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 rounded-lg px-4 py-3 text-sm max-w-2xl mx-auto">
            {error}
          </div>
        )}

        {stage === "intro" && (
          <QuizIntro
            userName={user.name}
            userImage={user.image}
            onStart={handleStartQuiz}
          />
        )}

        {stage === "questions" && (
          <QuizQuestion
            question={quizQuestions[currentQuestion]}
            currentIndex={currentQuestion}
            totalQuestions={quizQuestions.length}
            selectedAnswer={
              answers[quizQuestions[currentQuestion].id] ?? null
            }
            onSelect={handleSelectAnswer}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {stage === "generating" && (
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-6"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Generating your profile...
            </h2>
            <p className="text-gray-500">
              Our AI is analyzing your responses across 5 personality frameworks
            </p>
          </div>
        )}

        {stage === "preview" && generatedProfile && (
          <QuizResults
            profile={generatedProfile}
            onConfirm={handleConfirm}
            onRetake={handleRetake}
            isSaving={isSaving}
          />
        )}
      </main>
    </div>
  );
}
