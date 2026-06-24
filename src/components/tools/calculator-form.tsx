"use client";

import { useState } from "react";
import { SquareFunction } from "lucide-react";
import { useAITool } from "@/hooks/use-ai-tool";
import { SubmitButton } from "@/components/tools/submit-button";
import { AIToolInputField } from "@/components/tools/ai-tool-input-field";
import { AIResponseCard, AIEmptyState, AIToolStatus } from "@/components/tools/ai-response";
import {
  calculatorTypes,
  type CalculatorType,
} from "@/lib/tool-form-config";
import { slugifyFileName } from "@/lib/export-result";
import { appendVoiceText } from "@/lib/voice-text";

export function CalculatorForm() {
  const [expression, setExpression] = useState("");
  const [calcType, setCalcType] = useState<CalculatorType>("basic");
  const { response, error, loading, submit, signInRequired, guestUsesRemaining, isAuthenticated } =
    useAITool("/api/calculator");

  const activeType = calculatorTypes.find((t) => t.value === calcType) ?? calculatorTypes[0];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit({ expression: expression.trim(), calcType });
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="glass-card space-y-5 rounded-2xl p-6 sm:p-8">
        <div>
          <p className="mb-3 text-sm font-medium text-sky-200">Calculator Type</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {calculatorTypes.map((type) => {
              const selected = calcType === type.value;
              return (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setCalcType(type.value)}
                  className={[
                    "rounded-xl border px-3 py-3 text-left transition-colors",
                    selected
                      ? "border-sky-400/50 bg-sky-400/10 ring-2 ring-sky-400/20"
                      : "border-sky-400/15 bg-navy-950/40 hover:border-sky-400/30 hover:bg-sky-400/5",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "block text-sm font-semibold",
                      selected ? "text-sky-200" : "text-sky-100/90",
                    ].join(" ")}
                  >
                    {type.label}
                  </span>
                  <span className="mt-1 block text-xs leading-snug text-sky-300/55">
                    {type.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <AIToolInputField
          id="expression"
          label="Enter Calculation"
          value={expression}
          onChange={setExpression}
          placeholder={activeType.placeholder}
          required
          disabled={loading}
          onVoiceTranscript={(text) => setExpression((prev) => appendVoiceText(prev, text))}
          hint={<p className="mt-2 text-xs text-sky-300/50">{activeType.description}</p>}
        />

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
          exportFileName={`calculator-${slugifyFileName(calcType)}`}
          exportSubtitle={activeType.label}
          sharePath="/tools/calculator"
        />
      )}
      {!response && !loading && (
        <AIEmptyState message="Choose a calculator type, enter your expression, and get step-by-step working." />
      )}
    </div>
  );
}
