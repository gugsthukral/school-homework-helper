"use client";

import { useState } from "react";
import { SquareFunction } from "lucide-react";
import { useAITool } from "@/hooks/use-ai-tool";
import { GradeSelect } from "@/components/tools/grade-select";
import { SubmitButton } from "@/components/tools/submit-button";
import { FieldLabelWithVoice } from "@/components/tools/field-label-with-voice";
import { AIResponseCard, AIEmptyState, AIToolStatus } from "@/components/tools/ai-response";
import { calculatorTypes, inputClassName, labelClassName } from "@/lib/tool-form-config";
import { slugifyFileName } from "@/lib/export-result";
import { appendVoiceText } from "@/lib/voice-text";

export function CalculatorForm() {
  const [expression, setExpression] = useState("");
  const [grade, setGrade] = useState(8);
  const [calcType, setCalcType] = useState("basic");
  const { response, error, loading, submit, signInRequired, guestUsesRemaining, isAuthenticated } =
    useAITool("/api/calculator");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit({ expression: expression.trim(), grade, calcType });
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="glass-card space-y-5 rounded-2xl p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <GradeSelect value={grade} onChange={setGrade} />
          <div>
            <label htmlFor="calcType" className={labelClassName}>
              Calculation Type
            </label>
            <select
              id="calcType"
              value={calcType}
              onChange={(e) => setCalcType(e.target.value)}
              className={inputClassName}
            >
              {calculatorTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <FieldLabelWithVoice
            htmlFor="expression"
            onVoiceTranscript={(text) => setExpression((prev) => appendVoiceText(prev, text))}
            voiceDisabled={loading}
          >
            Enter Calculation
          </FieldLabelWithVoice>
          <input
            id="expression"
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="e.g. 25% of 480, (12+8)×3, sqrt(144), 5 km to metres"
            required
            className={inputClassName}
          />
          <p className="mt-2 text-xs text-sky-300/50">
            Supports arithmetic, percentages, ratios, scientific notation, and unit conversions.
          </p>
        </div>

        <AIToolStatus
          error={error}
          signInRequired={signInRequired}
          guestUsesRemaining={guestUsesRemaining}
          isAuthenticated={isAuthenticated}
        />

        <SubmitButton
          loading={loading}
          disabled={expression.trim().length < 1 || signInRequired}
          label="Calculate"
          loadingLabel="Calculating..."
        />
      </form>

      {response && (
        <AIResponseCard
          response={response}
          title="Calculation Result"
          icon={SquareFunction}
          exportFileName={`calculator-${slugifyFileName(calcType)}-class-${grade}`}
          exportSubtitle={`Class ${grade} · ${calculatorTypes.find((t) => t.value === calcType)?.label ?? calcType}`}
          sharePath="/tools/calculator"
        />
      )}
      {!response && !loading && (
        <AIEmptyState message="Type any calculation — get the answer with clear step-by-step working." />
      )}
    </div>
  );
}
