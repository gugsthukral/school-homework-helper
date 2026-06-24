"use client";

import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import { GradeSelect } from "@/components/tools/grade-select";
import { SubjectSelect } from "@/components/tools/subject-select";
import { AIToolInputField } from "@/components/tools/ai-tool-input-field";
import { SubmitButton } from "@/components/tools/submit-button";
import { AIResponseCard, AIEmptyState, AIToolStatus } from "@/components/tools/ai-response";
import { useAITool } from "@/hooks/use-ai-tool";
import {
  buildDocumentContext,
  type DocumentExtract,
  type UploadedImage,
} from "@/lib/attachment-utils";
import { getSubjectNamesForClass } from "@/lib/syllabus-2026-27";
import { slugifyFileName } from "@/lib/export-result";
import { appendVoiceText } from "@/lib/voice-text";

export function HomeworkSolverForm() {
  const [question, setQuestion] = useState("");
  const [grade, setGrade] = useState(5);
  const [subject, setSubject] = useState("");
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [documents, setDocuments] = useState<DocumentExtract[]>([]);
  const [uploadError, setUploadError] = useState("");
  const { response, error, loading, submit, signInRequired, guestUsesRemaining, isAuthenticated } =
    useAITool("/api/homework-solver");

  useEffect(() => {
    const subjects = getSubjectNamesForClass(grade);
    if (subject && !subjects.includes(subject)) {
      setSubject("");
    }
  }, [grade, subject]);

  const fullQuestion = (question.trim() + buildDocumentContext(documents)).trim();
  const canSubmit = fullQuestion.length >= 5 || images.length > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit({
      question: fullQuestion,
      grade,
      subject: subject || undefined,
      images: images.length > 0 ? images.map((img) => img.dataUrl) : undefined,
    });
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="glass-card space-y-5 rounded-2xl p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <GradeSelect value={grade} onChange={setGrade} />
          <SubjectSelect classNumber={grade} value={subject} onChange={setSubject} />
        </div>

        <AIToolInputField
          id="question"
          label="Your Homework Question"
          value={question}
          onChange={setQuestion}
          placeholder="Type your question, or use the icons to speak or upload..."
          multiline
          rows={5}
          disabled={loading}
          onVoiceTranscript={(text) => setQuestion((prev) => appendVoiceText(prev, text))}
          attachments={{
            images,
            onImagesChange: setImages,
            documents,
            onDocumentsChange: setDocuments,
            error: uploadError,
            onError: setUploadError,
          }}
          hint={
            <p className="mt-1.5 text-xs text-sky-300/40">{question.length}/2000 characters</p>
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
          label="Get Step-by-Step Solution"
          loadingLabel="Solving..."
        />
      </form>

      {response && (
        <AIResponseCard
          response={response}
          title="Your Solution"
          icon={BookOpen}
          exportFileName={`homework-class-${grade}${subject ? `-${slugifyFileName(subject)}` : ""}`}
          exportSubtitle={[`Class ${grade}`, subject].filter(Boolean).join(" · ")}
        />
      )}
      {!response && !loading && (
        <AIEmptyState message="Type your question or upload a homework photo/document for a class-appropriate explanation." />
      )}
    </div>
  );
}
