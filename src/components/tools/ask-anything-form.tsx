"use client";

import { useState } from "react";
import { MessageCircleQuestion } from "lucide-react";
import { useAITool } from "@/hooks/use-ai-tool";
import { GradeSelect } from "@/components/tools/grade-select";
import { SubjectSelect } from "@/components/tools/subject-select";
import { SubmitButton } from "@/components/tools/submit-button";
import { AttachmentUpload } from "@/components/tools/attachment-upload";
import { AIResponseCard, AIEmptyState, AIToolStatus } from "@/components/tools/ai-response";
import {
  buildDocumentContext,
  type DocumentExtract,
  type UploadedImage,
} from "@/lib/attachment-utils";
import { inputClassName, labelClassName } from "@/lib/tool-form-config";
import { slugifyFileName } from "@/lib/export-result";

export function AskAnythingForm() {
  const [question, setQuestion] = useState("");
  const [grade, setGrade] = useState(8);
  const [subject, setSubject] = useState("");
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [documents, setDocuments] = useState<DocumentExtract[]>([]);
  const [uploadError, setUploadError] = useState("");
  const { response, error, loading, submit, signInRequired, guestUsesRemaining, isAuthenticated } =
    useAITool("/api/ask-anything");

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
          <SubjectSelect
            classNumber={grade}
            value={subject}
            onChange={setSubject}
            id="askSubject"
          />
        </div>

        <div>
          <label htmlFor="question" className={labelClassName}>
            Your Question
          </label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything about homework, concepts, exams, or school topics..."
            rows={5}
            className={`${inputClassName} resize-none`}
          />
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
          label="Ask AI Tutor"
          loadingLabel="Thinking..."
        />
      </form>

      {response && (
        <AIResponseCard
          response={response}
          title="Answer"
          icon={MessageCircleQuestion}
          exportFileName={`ask-${slugifyFileName(subject || "general")}-class-${grade}`}
          exportSubtitle={`Class ${grade}${subject ? ` · ${subject}` : ""}`}
          sharePath="/tools/ask-anything"
        />
      )}
      {!response && !loading && (
        <AIEmptyState message="Ask any school question — Maths, Science, English, SST, or general study doubts." />
      )}
    </div>
  );
}
