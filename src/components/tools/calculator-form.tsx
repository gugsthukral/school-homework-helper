"use client";

import { useState } from "react";
import { SquareFunction } from "lucide-react";
import { GlowButtonShell } from "@/components/motion-primitives/glow-button-shell";
import { useAITool } from "@/hooks/use-ai-tool";
import { SubmitButton } from "@/components/tools/submit-button";
import { AIToolInputField } from "@/components/tools/ai-tool-input-field";
import { AIResponseCard, AIEmptyState, AIToolLoadingCard, AIToolStatus } from "@/components/tools/ai-response";
import {
  calculatorTypes,
  type CalculatorType,
} from "@/lib/tool-form-config";
import { slugifyFileName } from "@/lib/export-result";
import { appendVoiceText } from "@/lib/voice-text";
import { cn } from "@/lib/utils";

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
          <p className="mb-3 text-sm font-medium text-slate-700">Calculator Type</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {calculatorTypes.map((type) => {
              const selected = calcType === type.value;
              return (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setCalcType(type.value)}
                  className="w-full transition-transform hover:scale-[1.01]"
                >
                  <GlowButtonShell
                    className="w-full"
                    contentClassName={cn(
                      "w-full flex-col items-start gap-0 px-3 py-3 text-left",
                      selected && "ring-2 ring-sky-400/30"
                    )}
                  >
                    <span
                      className={cn(
                        "block text-sm font-semibold",
                        selected ? "text-orange-600" : "text-slate-700"
                      )}
                    >
                      {type.label}
                    </span>
                    <span className="mt-1 block text-xs leading-snug text-slate-500">
                      {type.description}
                    </span>
                  </GlowButtonShell>
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
          hint={<p className="mt-2 text-xs text-slate-400">{activeType.description}</p>}
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

      {loading && <AIToolLoadingCard message="Calculating..." />}

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
