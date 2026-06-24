"use client";

import { useEffect, useState } from "react";
import { HelpCircle } from "lucide-react";
import { useAITool } from "@/hooks/use-ai-tool";
import { GradeSelect } from "@/components/tools/grade-select";
import { SubjectSelect } from "@/components/tools/subject-select";
import { SubmitButton } from "@/components/tools/submit-button";
import { AIToolInputField } from "@/components/tools/ai-tool-input-field";
import { AIEmptyState, AIToolStatus } from "@/components/tools/ai-response";
import { QuizResult } from "@/components/tools/quiz-result";
import { slugifyFileName } from "@/lib/export-result";
import { getSubjectNamesForClass } from "@/lib/syllabus-2026-27";
import { inputClassName, labelClassName, quizCountOptions } from "@/lib/tool-form-config";
import { appendVoiceText } from "@/lib/voice-text";

export function QuizGeneratorForm() {
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState(7);
  const [count, setCount] = useState(5);
  const { response, error, loading, submit, signInRequired, guestUsesRemaining, isAuthenticated } =
    useAITool("/api/quiz-generator");

  useEffect(() => {
    const subjects = getSubjectNamesForClass(grade);
    if (subject && !subjects.includes(subject)) {
      setSubject("");
    }
  }, [grade, subject]);

  const canSubmit = subject.trim().length > 0 || topic.trim().length >= 3;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit({
      topic: topic.trim(),
      subject: subject || undefined,
      grade,
      count,
    });
  }

  const quizLabel = topic.trim() || subject || "General";
  const exportSubtitle = [`Class ${grade}`, subject || null, topic.trim() || null, `${count} MCQs`]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="glass-card space-y-5 rounded-2xl p-6 sm:p-8">
        <div className="grid gap-5 md:grid-cols-3">
          <GradeSelect value={grade} onChange={setGrade} />
          <SubjectSelect
            classNumber={grade}
            value={subject}
            onChange={setSubject}
            optional={false}
          />
          <div>
            <label htmlFor="count" className={labelClassName}>
              Number of Questions
            </label>
            <select
              id="count"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className={inputClassName}
            >
              {quizCountOptions.map((n) => (
                <option key={n} value={n}>
                  {n} MCQs
                </option>
              ))}
            </select>
          </div>
        </div>

        <AIToolInputField
          id="topic"
          label={
            <>
              Quiz Topic <span className="text-sky-300/40">(optional)</span>
            </>
          }
          value={topic}
          onChange={setTopic}
          placeholder="e.g. Photosynthesis, Fractions — or leave blank to quiz the whole subject"
          disabled={loading}
          onVoiceTranscript={(text) => setTopic((prev) => appendVoiceText(prev, text))}
          hint={
            <p className="mt-1.5 text-xs text-sky-300/40">
              Pick a subject only for a syllabus-wide quiz, or add a topic to focus the questions.
            </p>
          }
        />

        <AIToolStatus
          error={error}
          signInRequired={signInRequired}
          guestUsesRemaining={guestUsesRemaining}
          isAuthenticated={isAuthenticated}
        />

        <SubmitButton
          loading={loading}
          disabled={!canSubmit || signInRequired}
          label="Generate Quiz"
          loadingLabel="Creating quiz..."
        />
      </form>

      {response && (
        <QuizResult
          response={response}
          title="Your Quiz"
          icon={HelpCircle}
          exportFileName={`${slugifyFileName(quizLabel)}-class-${grade}-quiz`}
          exportSubtitle={exportSubtitle}
        />
      )}
      {!response && !loading && (
        <AIEmptyState message="Select a subject or enter a topic to get MCQs with answers and explanations." />
      )}
    </div>
  );
}
