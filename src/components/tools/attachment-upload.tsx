"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, FileText, FileUp, X } from "lucide-react";
import {
  type DocumentExtract,
  type UploadedImage,
  MAX_ATTACHMENTS,
  ACCEPTED_FILE_TYPES,
  processUploadFile,
} from "@/lib/attachment-utils";
import { InputActionIconButton } from "@/components/tools/input-action-icon-button";
import { cn } from "@/lib/utils";

type AttachmentUploadProps = {
  images: UploadedImage[];
  onImagesChange: (images: UploadedImage[]) => void;
  documents: DocumentExtract[];
  onDocumentsChange: (documents: DocumentExtract[]) => void;
  error?: string;
  onError?: (message: string) => void;
  disabled?: boolean;
  layout?: "standalone" | "inline";
  className?: string;
};

function useMobileOrTablet() {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    function check() {
      const touch =
        typeof window !== "undefined" &&
        ("ontouchstart" in window || navigator.maxTouchPoints > 0);
      const narrow = window.matchMedia("(max-width: 1024px)").matches;
      setIsMobileOrTablet(Boolean(touch && narrow));
    }

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobileOrTablet;
}

export function AttachmentUpload({
  images,
  onImagesChange,
  documents,
  onDocumentsChange,
  error,
  onError,
  disabled = false,
  layout = "standalone",
  className,
}: AttachmentUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [processing, setProcessing] = useState(false);
  const isMobileOrTablet = useMobileOrTablet();

  async function handleFiles(fileList: FileList | null) {
    if (!fileList?.length || disabled) return;

    setProcessing(true);
    onError?.("");

    let nextImages = [...images];
    let nextDocuments = [...documents];

    try {
      for (const file of Array.from(fileList)) {
        const result = await processUploadFile(file, nextImages);
        if (result.error) {
          onError?.(result.error);
          continue;
        }
        nextImages = result.images;
        if (result.documentText) {
          nextDocuments = [...nextDocuments, result.documentText];
        }
      }
      onImagesChange(nextImages);
      onDocumentsChange(nextDocuments);
    } catch (err) {
      onError?.(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (cameraInputRef.current) cameraInputRef.current.value = "";
    }
  }

  const showCamera = layout === "inline" || isMobileOrTablet;

  const iconButtons = (
    <>
      <InputActionIconButton
        icon={FileUp}
        label="Upload image or document"
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled || processing}
        size={layout === "inline" ? "sm" : "default"}
      />
      {showCamera && (
        <InputActionIconButton
          icon={Camera}
          label="Take photo"
          onClick={() => cameraInputRef.current?.click()}
          disabled={disabled || processing || images.length >= MAX_ATTACHMENTS}
          size={layout === "inline" ? "sm" : "default"}
        />
      )}
    </>
  );

  const hiddenInputs = (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_FILE_TYPES}
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </>
  );

  if (layout === "inline") {
    return (
      <div className={cn("flex items-center gap-1", className)}>
        {hiddenInputs}
        {iconButtons}
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex flex-wrap items-center gap-2">{iconButtons}</div>
      {hiddenInputs}
      <p className="text-xs text-sky-300/45">
        JPG, PNG, WEBP, PDF, or TXT · up to {MAX_ATTACHMENTS} images · max 5 MB per image
        {isMobileOrTablet ? " · Use camera on phone/tablet" : ""}
      </p>
      <AttachmentPreviews
        images={images}
        onImagesChange={onImagesChange}
        documents={documents}
        onDocumentsChange={onDocumentsChange}
      />
      {processing && <p className="text-xs text-slate-500">Processing upload...</p>}
      {error && <p className="text-xs text-red-300">{error}</p>}
    </div>
  );
}

export function AttachmentPreviews({
  images,
  onImagesChange,
  documents,
  onDocumentsChange,
}: Pick<AttachmentUploadProps, "images" | "onImagesChange" | "documents" | "onDocumentsChange">) {
  function removeImage(id: string) {
    onImagesChange(images.filter((img) => img.id !== id));
  }

  function removeDocument(name: string) {
    onDocumentsChange(documents.filter((doc) => doc.name !== name));
  }

  if (images.length === 0 && documents.length === 0) return null;

  return (
    <div className="space-y-3 rounded-xl border border-slate-200 bg-navy-950/40 p-3">
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="group relative overflow-hidden rounded-lg border border-slate-200"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.previewUrl} alt={img.name} className="h-24 w-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(img.id)}
                className="absolute right-1 top-1 rounded-full bg-navy-950/80 p-1 text-slate-700 hover:text-slate-900"
                aria-label={`Remove ${img.name}`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <p className="truncate px-2 py-1 text-[10px] text-slate-500">{img.name}</p>
            </div>
          ))}
        </div>
      )}

      {documents.map((doc) => (
        <div
          key={doc.name}
          className="flex items-start justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2"
        >
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
              <FileText className="h-3.5 w-3.5 shrink-0 text-orange-400" />
              {doc.name}
            </p>
            <p className="mt-1 line-clamp-2 text-xs text-slate-400">{doc.text}</p>
          </div>
          <button
            type="button"
            onClick={() => removeDocument(doc.name)}
            className="shrink-0 rounded-full p-1 text-slate-500 hover:text-slate-900"
            aria-label={`Remove ${doc.name}`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
