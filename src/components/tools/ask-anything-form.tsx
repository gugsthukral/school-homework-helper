"use client";

import { useState } from "react";
import { MessageCircleQuestion } from "lucide-react";
import { useAITool } from "@/hooks/use-ai-tool";
import { SubmitButton } from "@/components/tools/submit-button";
import { AIToolInputField } from "@/components/tools/ai-tool-input-field";
import { AIResponseCard, AIEmptyState, AIToolStatus } from "@/components/tools/ai-response";
import {
  buildDocumentContext,
  type DocumentExtract,
  type UploadedImage,
} from "@/lib/attachment-utils";
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
        <AIToolInputField
          id="question"
          label="Your Question"
          value={question}
          onChange={setQuestion}
          placeholder="Ask anything about homework, concepts, exams, or school topics..."
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
        <AIEmptyState message="Ask any school question — type, speak, or upload a photo or document." />
      )}
    </div>
  );
}
