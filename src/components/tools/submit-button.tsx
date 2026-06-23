import { Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type SubmitButtonProps = {
  loading: boolean;
  disabled?: boolean;
  label: string;
  loadingLabel: string;
};

export function SubmitButton({ loading, disabled, label, loadingLabel }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className={cn(
        "flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-orange-500/25 transition-all sm:w-auto",
        loading || disabled
          ? "cursor-not-allowed opacity-60"
          : "hover:scale-[1.02] hover:shadow-orange-500/40"
      )}
    >
      {loading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          {loadingLabel}
        </>
      ) : (
        <>
          <Sparkles className="h-5 w-5" />
          {label}
        </>
      )}
    </button>
  );
}
