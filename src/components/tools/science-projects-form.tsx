"use client";

import { useMemo, useState } from "react";
import { useAITool } from "@/hooks/use-ai-tool";
import { parseProjectsForDisplay } from "@/lib/science-project-media";
import { GradeSelect } from "@/components/tools/grade-select";
import { SubmitButton } from "@/components/tools/submit-button";
import { FieldLabelWithVoice } from "@/components/tools/field-label-with-voice";
import { AIEmptyState, AIErrorBanner, AIToolStatus } from "@/components/tools/ai-response";
import { ScienceProjectsResult } from "@/components/tools/science-projects-result";
import { inputClassName } from "@/lib/tool-form-config";
import { appendVoiceText } from "@/lib/voice-text";

export function ScienceProjectsForm() {
  const [grade, setGrade] = useState(6);
  const [interest, setInterest] = useState("");
  const {
    response,
    projects,
    error,
    loading,
    submit,
    signInRequired,
    guestUsesRemaining,
    isAuthenticated,
  } = useAITool("/api/science-projects");

  const displayProjects = useMemo(() => {
    if (projects && projects.length > 0) return projects;
    if (response) return parseProjectsForDisplay(response);
    return null;
  }, [projects, response]);

  const markdown = useMemo(() => {
    if (response && !response.trim().startsWith("{")) return response;
    return "";
  }, [response]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit({ grade, interest: interest.trim() || undefined });
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="glass-card space-y-5 rounded-2xl p-6 sm:p-8">
        <GradeSelect value={grade} onChange={setGrade} />

        <div>
          <FieldLabelWithVoice
            htmlFor="interest"
            onVoiceTranscript={(text) => setInterest((prev) => appendVoiceText(prev, text))}
            voiceDisabled={loading}
          >
            Area of Interest (optional)
          </FieldLabelWithVoice>
          <input
            id="interest"
            type="text"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            placeholder="e.g. plants, electricity, space, chemistry"
            className={inputClassName}
          />
        </div>

        <AIToolStatus
          error={error}
          signInRequired={signInRequired}
          guestUsesRemaining={guestUsesRemaining}
          isAuthenticated={isAuthenticated}
        />

        <SubmitButton
          loading={loading}
          disabled={signInRequired}
          label="Get Project Ideas"
          loadingLabel="Finding ideas..."
        />
      </form>

      {displayProjects && displayProjects.length > 0 && !loading && (
        <ScienceProjectsResult
          projects={displayProjects}
          markdown={markdown}
          grade={grade}
        />
      )}

      {!displayProjects?.length && !loading && !error && (
        response?.trim().startsWith("{") ? (
          <AIErrorBanner message="We received project data but couldn't display it. Please try again." />
        ) : (
          <AIEmptyState message="Select your class to get 4 science project ideas (2 easy, 1 medium, 1 hard) you can do at home or school." />
        )
      )}
    </div>
  );
}
