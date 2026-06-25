"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";
import { useAITool } from "@/hooks/use-ai-tool";
import { GradeSelect } from "@/components/tools/grade-select";
import { SubmitButton } from "@/components/tools/submit-button";
import { AIToolInputField } from "@/components/tools/ai-tool-input-field";
import { AIResponseCard, AIEmptyState, AIToolLoadingCard, AIToolStatus } from "@/components/tools/ai-response";
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

        <AIToolInputField
          id="problem"
          label="Math Problem"
          value={problem}
          onChange={setProblem}
          placeholder="Type the problem, or use the icons to speak or upload a photo..."
          multiline
          rows={4}
          disabled={loading}
          onVoiceTranscript={(text) => setProblem((prev) => appendVoiceText(prev, text))}
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
          label="Solve Problem"
          loadingLabel="Solving..."
        />
      </form>

      {loading && <AIToolLoadingCard message="Solving..." />}

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
