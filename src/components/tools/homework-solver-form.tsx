"use client";

import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import { GradeSelect } from "@/components/tools/grade-select";
import { SubjectSelect } from "@/components/tools/subject-select";
import { AttachmentUpload } from "@/components/tools/attachment-upload";
import { SubmitButton } from "@/components/tools/submit-button";
import { AIResponseCard, AIEmptyState, AIToolStatus } from "@/components/tools/ai-response";
import { useAITool } from "@/hooks/use-ai-tool";
import {
  buildDocumentContext,
  type DocumentExtract,
  type UploadedImage,
} from "@/lib/attachment-utils";
import { getSubjectNamesForClass } from "@/lib/syllabus-2026-27";
import { inputClassName, labelClassName } from "@/lib/tool-form-config";
import { slugifyFileName } from "@/lib/export-result";

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

        <div>
          <label htmlFor="question" className={labelClassName}>
            Your Homework Question
          </label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question, or upload a photo / document below..."
            rows={5}
            className={`${inputClassName} resize-none`}
          />
          <p className="mt-1.5 text-xs text-sky-300/40">{question.length}/2000 characters</p>
        </div>

        <div>
          <p className={labelClassName}>Upload image or document (optional)</p>
          <AttachmentUpload
            images={images}
            onImagesChange={setImages}
            documents={documents}
            onDocumentsChange={setDocuments}
            error={uploadError}
            onError={setUploadError}
            disabled={loading}
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
