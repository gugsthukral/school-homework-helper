"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";
import { useAITool } from "@/hooks/use-ai-tool";
import { GradeSelect } from "@/components/tools/grade-select";
import { SubmitButton } from "@/components/tools/submit-button";
import { AttachmentUpload } from "@/components/tools/attachment-upload";
import { FieldLabelWithVoice } from "@/components/tools/field-label-with-voice";
import { AIResponseCard, AIEmptyState, AIToolStatus } from "@/components/tools/ai-response";
import {
  buildDocumentContext,
  type DocumentExtract,
  type UploadedImage,
} from "@/lib/attachment-utils";
import { inputClassName, labelClassName, mathTypes } from "@/lib/tool-form-config";
import { slugifyFileName } from "@/lib/export-result";
import { appendVoiceText } from "@/lib/voice-text";

export function MathSolverForm() {
  const [problem, setProblem] = useState("");
  const [grade, setGrade] = useState(5);
  const [mathType, setMathType] = useState("arithmetic");
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [documents, setDocuments] = useState<DocumentExtract[]>([]);
  const [uploadError, setUploadError] = useState("");
  const { response, error, loading, submit, signInRequired, guestUsesRemaining, isAuthenticated } =
    useAITool("/api/math-solver");

  const fullProblem = (problem.trim() + buildDocumentContext(documents)).trim();
  const canSubmit = fullProblem.length >= 3 || images.length > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit({
      problem: fullProblem,
      grade,
      mathType,
      images: images.length > 0 ? images.map((img) => img.dataUrl) : undefined,
    });
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="glass-card space-y-5 rounded-2xl p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <GradeSelect value={grade} onChange={setGrade} />
          <div>
            <label htmlFor="mathType" className={labelClassName}>
              Problem Type
            </label>
            <select
              id="mathType"
              value={mathType}
              onChange={(e) => setMathType(e.target.value)}
              className={inputClassName}
            >
              {mathTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <FieldLabelWithVoice
            htmlFor="problem"
            onVoiceTranscript={(text) => setProblem((prev) => appendVoiceText(prev, text))}
            voiceDisabled={loading}
          >
            Math Problem
          </FieldLabelWithVoice>
          <textarea
            id="problem"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Type the problem, or upload a photo of the question..."
            rows={4}
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
          label="Solve Problem"
          loadingLabel="Solving..."
        />
      </form>

      {response && (
        <AIResponseCard
          response={response}
          title="Step-by-Step Solution"
          icon={Calculator}
          exportFileName={`math-${slugifyFileName(mathType)}-class-${grade}`}
          exportSubtitle={`Class ${grade} · ${mathTypes.find((t) => t.value === mathType)?.label ?? mathType}`}
        />
      )}
      {!response && !loading && (
        <AIEmptyState message="Type a math problem or upload a photo — arithmetic, algebra, geometry, or word problems." />
      )}
    </div>
  );
}
