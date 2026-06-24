"use client";

import { useState } from "react";
import { PenLine } from "lucide-react";
import { useAITool } from "@/hooks/use-ai-tool";
import { GradeSelect } from "@/components/tools/grade-select";
import { SubmitButton } from "@/components/tools/submit-button";
import { AIToolInputField } from "@/components/tools/ai-tool-input-field";
import { AIResponseCard, AIEmptyState, AIToolStatus } from "@/components/tools/ai-response";
import { inputClassName, labelClassName, wordCountOptions } from "@/lib/tool-form-config";
import { slugifyFileName } from "@/lib/export-result";
import { appendVoiceText } from "@/lib/voice-text";

export function EssayGeneratorForm() {
  const [topic, setTopic] = useState("");
  const [wordCount, setWordCount] = useState(200);
  const [grade, setGrade] = useState(6);
  const { response, error, loading, submit, signInRequired, guestUsesRemaining, isAuthenticated } =
    useAITool("/api/essay-generator");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit({ topic: topic.trim(), wordCount, grade });
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="glass-card space-y-5 rounded-2xl p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <GradeSelect value={grade} onChange={setGrade} />
          <div>
            <label htmlFor="wordCount" className={labelClassName}>
              Word Count
            </label>
            <select
              id="wordCount"
              value={wordCount}
              onChange={(e) => setWordCount(Number(e.target.value))}
              className={inputClassName}
            >
              {wordCountOptions.map((n) => (
                <option key={n} value={n}>
                  {n} words
                </option>
              ))}
            </select>
          </div>
        </div>

        <AIToolInputField
          id="topic"
          label="Essay Topic"
          value={topic}
          onChange={setTopic}
          placeholder="e.g. The Importance of Trees"
          required
          disabled={loading}
          onVoiceTranscript={(text) => setTopic((prev) => appendVoiceText(prev, text))}
        />

        <AIToolStatus
          error={error}
          signInRequired={signInRequired}
          guestUsesRemaining={guestUsesRemaining}
          isAuthenticated={isAuthenticated}
        />

        <SubmitButton
          loading={loading}
          disabled={topic.trim().length < 3 || signInRequired}
          label="Generate Essay"
          loadingLabel="Writing..."
        />
      </form>

      {response && (
        <AIResponseCard
          response={response}
          title="Your Essay"
          icon={PenLine}
          exportFileName={`${slugifyFileName(topic)}-class-${grade}-essay`}
          exportSubtitle={`Class ${grade} · ${wordCount} words · ${topic.trim()}`}
          sharePath="/tools/essay-generator"
        />
      )}
      {!response && !loading && (
        <AIEmptyState message="Enter a topic and get a class-appropriate essay with intro, body, and conclusion." />
      )}
    </div>
  );
}
