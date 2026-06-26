"use client";

import { useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { GlowActionButton } from "@/components/motion-primitives/glow-action-button";
import { GlowCard } from "@/components/motion-primitives/glow-card";
import { formatResponse } from "@/lib/format-response";
import { isQuizIncomplete, parseQuizResponse } from "@/lib/parse-quiz-response";
import { ResultExportActions } from "@/components/tools/result-export-actions";
import { cn } from "@/lib/utils";

type QuizResultProps = {
  response: string;
  title?: string;
  icon: LucideIcon;
  exportFileName?: string;
  exportSubtitle?: string;
  sharePath?: string;
  expectedCount?: number;
};

export function QuizResult({
  response,
  title = "Your Quiz",
  icon: Icon,
  exportFileName,
  exportSubtitle,
  sharePath,
  expectedCount,
}: QuizResultProps) {
  const questions = useMemo(() => parseQuizResponse(response), [response]);
  const parsed = questions.length > 0;
  const incomplete = parsed && isQuizIncomplete(questions, expectedCount);
  const [revealed, setRevealed] = useState<Set<number>>(() => new Set());

  function toggleReveal(questionNumber: number) {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(questionNumber)) next.delete(questionNumber);
      else next.add(questionNumber);
      return next;
    });
  }

  const resolvedFileName = exportFileName ?? "ai-result";
  const [glowActive, setGlowActive] = useState(true);

  useEffect(() => {
    setGlowActive(true);
    const timer = window.setTimeout(() => setGlowActive(false), 3500);
    return () => window.clearTimeout(timer);
  }, [response]);

  return (
    <GlowCard active={glowActive}>
      <div className="glass-card animate-fade-up rounded-2xl">
      <div className="border-b border-slate-200 bg-sky-400/5">
        <div className="flex items-center gap-3 px-4 pt-4 sm:px-6">
          <Icon className="h-5 w-5 shrink-0 text-sky-400" />
          <h2 className="font-semibold text-slate-900">{title}</h2>
        </div>
        <div className="px-4 pb-4 pt-3 sm:px-6">
          <ResultExportActions
            content={response}
            fileName={resolvedFileName}
            title={title}
            subtitle={exportSubtitle}
            sharePath={sharePath}
          />
        </div>
      </div>

      {parsed ? (
        <div className="space-y-4 px-4 py-5 sm:space-y-5 sm:px-6 sm:py-6">
          {incomplete && (
            <p className="theme-error-banner rounded-lg border px-3 py-2.5 text-sm">
              This quiz looks incomplete ({questions.length}
              {expectedCount ? ` of ${expectedCount}` : ""} questions shown). Please generate
              again — try fewer questions if the problem continues.
            </p>
          )}
          {questions.map((question) => {
            const isRevealed = revealed.has(question.number);

            return (
              <article
                key={question.number}
                className="theme-quiz-card rounded-xl border p-4 sm:p-5"
              >
                <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
                  Question {question.number}
                </h3>
                {question.question && (
                  <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
                    {question.question}
                  </p>
                )}

                {question.options.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {question.options.map((option) => {
                      const isCorrect =
                        isRevealed &&
                        question.answerLetter &&
                        option.letter.toUpperCase() === question.answerLetter;

                      return (
                        <li
                          key={option.letter}
                          className={cn(
                            "rounded-lg border px-3 py-2 text-sm",
                            isCorrect ? "theme-quiz-option-correct" : "theme-quiz-option"
                          )}
                        >
                          <span className="theme-quiz-option-letter font-semibold">
                            {option.letter})
                          </span>{" "}
                          {option.text}
                        </li>
                      );
                    })}
                  </ul>
                )}

                <div className="mt-4">
                  <GlowActionButton
                    onClick={() => toggleReveal(question.number)}
                    contentClassName="gap-1.5 px-3 py-1.5 text-xs sm:text-sm"
                  >
                    {isRevealed ? (
                      <>
                        <EyeOff className="h-3.5 w-3.5" />
                        Hide Answer
                      </>
                    ) : (
                      <>
                        <Eye className="h-3.5 w-3.5" />
                        Reveal Answer
                      </>
                    )}
                  </GlowActionButton>
                </div>

                {isRevealed && (question.answerLetter || question.explanation) && (
                  <div className="theme-quiz-answer-box mt-3 rounded-lg border px-3 py-2.5 text-sm">
                    {question.answerLetter && (
                      <p className="theme-quiz-answer-title font-semibold">
                        Correct answer: {question.answerLetter}
                      </p>
                    )}
                    {question.explanation && (
                      <p className={cn("leading-relaxed", question.answerLetter && "mt-1")}>
                        {question.explanation}
                      </p>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      ) : (
        <div
          className="prose-response space-y-1 px-4 py-5 text-sm leading-relaxed text-slate-700 sm:px-6 sm:text-base"
          dangerouslySetInnerHTML={{
            __html: `<p class='mb-2 text-slate-700'>${formatResponse(response)}</p>`,
          }}
        />
      )}
      </div>
    </GlowCard>
  );
}
