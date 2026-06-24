"use client";

import type { DocumentExtract, UploadedImage } from "@/lib/attachment-utils";
import { labelClassName } from "@/lib/tool-form-config";
import { AttachmentPreviews, AttachmentUpload } from "@/components/tools/attachment-upload";
import { VoiceInputButton } from "@/components/tools/voice-input-button";
import { cn } from "@/lib/utils";

type AIToolInputFieldProps = {
  id: string;
  label: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
  onVoiceTranscript?: (text: string) => void;
  hint?: React.ReactNode;
  attachments?: {
    images: UploadedImage[];
    onImagesChange: (images: UploadedImage[]) => void;
    documents: DocumentExtract[];
    onDocumentsChange: (documents: DocumentExtract[]) => void;
    error?: string;
    onError?: (message: string) => void;
  };
};

const fieldShellClassName =
  "relative overflow-hidden rounded-xl border border-sky-400/20 bg-navy-950/60 transition-colors focus-within:border-sky-400/50 focus-within:ring-2 focus-within:ring-sky-400/20";

const inputInnerClassName =
  "w-full min-w-0 border-0 bg-transparent px-4 py-3 text-white outline-none placeholder:text-sky-300/35";

export function AIToolInputField({
  id,
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
  rows = 5,
  required = false,
  disabled = false,
  onVoiceTranscript,
  hint,
  attachments,
}: AIToolInputFieldProps) {
  const showActions = Boolean(onVoiceTranscript || attachments);
  const inputPadding = showActions ? "pb-10 pr-3" : "";

  return (
    <div>
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>

      <div className={fieldShellClassName}>
        {multiline ? (
          <textarea
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            required={required}
            disabled={disabled}
            className={cn(inputInnerClassName, "resize-none", inputPadding)}
          />
        ) : (
          <input
            id={id}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={cn(inputInnerClassName, inputPadding)}
          />
        )}

        {showActions && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-end bg-gradient-to-t from-navy-950/90 via-navy-950/50 to-transparent px-2 pb-1.5 pt-4 sm:px-2.5 sm:pb-2">
            <div className="pointer-events-auto flex items-center gap-1">
              {onVoiceTranscript && (
                <VoiceInputButton
                  onTranscript={onVoiceTranscript}
                  disabled={disabled}
                  compact
                />
              )}
              {attachments && (
                <AttachmentUpload
                  layout="inline"
                  images={attachments.images}
                  onImagesChange={attachments.onImagesChange}
                  documents={attachments.documents}
                  onDocumentsChange={attachments.onDocumentsChange}
                  error={attachments.error}
                  onError={attachments.onError}
                  disabled={disabled}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {attachments?.error && (
        <p className="mt-1.5 text-xs text-red-300">{attachments.error}</p>
      )}

      {hint}
      {attachments && (
        <div className="mt-3">
          <AttachmentPreviews
            images={attachments.images}
            onImagesChange={attachments.onImagesChange}
            documents={attachments.documents}
            onDocumentsChange={attachments.onDocumentsChange}
          />
        </div>
      )}
    </div>
  );
}
