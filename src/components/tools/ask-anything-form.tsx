"use client";

import { useState } from "react";
import { MessageCircleQuestion } from "lucide-react";
import { useAITool } from "@/hooks/use-ai-tool";
import { SubmitButton } from "@/components/tools/submit-button";
import { AttachmentUpload } from "@/components/tools/attachment-upload";
import { FieldLabelWithVoice } from "@/components/tools/field-label-with-voice";
import { AIResponseCard, AIEmptyState, AIToolStatus } from "@/components/tools/ai-response";
import {
  buildDocumentContext,
  type DocumentExtract,
  type UploadedImage,
} from "@/lib/attachment-utils";
import { inputClassName, labelClassName } from "@/lib/tool-form-config";
import { slugifyFileName } from "@/lib/export-result";
import { appendVoiceText } from "@/lib/voice-text";

export function AskAnythingForm() {
  const [question, setQuestion] = useState("");
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
      images: images.length > 0 ? images.map((img) => img.dataUrl) : undefined,
    });
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="glass-card space-y-5 rounded-2xl p-6 sm:p-8">
        <div>
          <FieldLabelWithVoice
            htmlFor="question"
            onVoiceTranscript={(text) => setQuestion((prev) => appendVoiceText(prev, text))}
            voiceDisabled={loading}
          >
            Your Question
          </FieldLabelWithVoice>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything about homework, concepts, exams, or school topics... (or use Voice)"
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
          exportFileName={`ask-${slugifyFileName(question.slice(0, 40) || "question")}`}
          exportSubtitle="Ask Anything"
          sharePath="/tools/ask-anything"
        />
      )}
      {!response && !loading && (
        <AIEmptyState message="Ask any school question — type or tap Voice to speak your question." />
      )}
    </div>
  );
}
