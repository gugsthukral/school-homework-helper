"use client";

import { useState } from "react";
import { SpellCheck } from "lucide-react";
import { useAITool } from "@/hooks/use-ai-tool";
import { GradeSelect } from "@/components/tools/grade-select";
import { SubmitButton } from "@/components/tools/submit-button";
import { FieldLabelWithVoice } from "@/components/tools/field-label-with-voice";
import { AttachmentUpload } from "@/components/tools/attachment-upload";
import { AIResponseCard, AIEmptyState, AIToolStatus } from "@/components/tools/ai-response";
import {
  buildDocumentContext,
  type DocumentExtract,
  type UploadedImage,
} from "@/lib/attachment-utils";
import { inputClassName, labelClassName } from "@/lib/tool-form-config";
import { appendVoiceText } from "@/lib/voice-text";

export function GrammarCheckerForm() {
  const [text, setText] = useState("");
  const [grade, setGrade] = useState(8);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [documents, setDocuments] = useState<DocumentExtract[]>([]);
  const [uploadError, setUploadError] = useState("");
  const { response, error, loading, submit, signInRequired, guestUsesRemaining, isAuthenticated } =
    useAITool("/api/grammar-checker");

  const fullText = (text.trim() + buildDocumentContext(documents)).trim();
  const canSubmit = fullText.length >= 10 || images.length > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit({
      text: fullText,
      grade,
      images: images.length > 0 ? images.map((img) => img.dataUrl) : undefined,
    });
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="glass-card space-y-5 rounded-2xl p-6 sm:p-8">
        <GradeSelect value={grade} onChange={setGrade} />

        <div>
          <FieldLabelWithVoice
            htmlFor="text"
            onVoiceTranscript={(text) => setText((prev) => appendVoiceText(prev, text))}
            voiceDisabled={loading}
          >
            Your Writing
          </FieldLabelWithVoice>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your paragraph or essay, or upload a photo of handwritten work..."
            rows={6}
            className={`${inputClassName} resize-none`}
          />
          <p className="mt-1.5 text-xs text-sky-300/40">{text.length}/3000 characters</p>
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
          label="Check Grammar"
          loadingLabel="Checking..."
        />
      </form>

      {response && (
        <AIResponseCard
          response={response}
          title="Grammar Check Result"
          icon={SpellCheck}
          exportFileName={`grammar-class-${grade}`}
          exportSubtitle={`Class ${grade}`}
        />
      )}
      {!response && !loading && (
        <AIEmptyState message="Paste your writing or upload a photo of handwritten text for grammar corrections and tips." />
      )}
    </div>
  );
}
