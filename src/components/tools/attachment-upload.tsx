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
import { cn } from "@/lib/utils";

type AttachmentUploadProps = {
  images: UploadedImage[];
  onImagesChange: (images: UploadedImage[]) => void;
  documents: DocumentExtract[];
  onDocumentsChange: (documents: DocumentExtract[]) => void;
  error?: string;
  onError?: (message: string) => void;
  disabled?: boolean;
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

  function removeImage(id: string) {
    onImagesChange(images.filter((img) => img.id !== id));
  }

  function removeDocument(name: string) {
    onDocumentsChange(documents.filter((doc) => doc.name !== name));
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={disabled || processing}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "inline-flex items-center gap-2 rounded-xl border border-sky-400/25 bg-sky-400/5 px-4 py-2.5 text-sm font-medium text-sky-200 transition-colors hover:border-sky-400/50 hover:bg-sky-400/10",
            (disabled || processing) && "cursor-not-allowed opacity-60"
          )}
        >
          <FileUp className="h-4 w-4" />
          Upload image / document
        </button>

        {isMobileOrTablet && (
          <button
            type="button"
            disabled={disabled || processing || images.length >= MAX_ATTACHMENTS}
            onClick={() => cameraInputRef.current?.click()}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-2.5 text-sm font-medium text-orange-200 transition-colors hover:border-orange-500/50 hover:bg-orange-500/15",
              (disabled || processing || images.length >= MAX_ATTACHMENTS) &&
                "cursor-not-allowed opacity-60"
            )}
          >
            <Camera className="h-4 w-4" />
            Take photo
          </button>
        )}
      </div>

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

      <p className="text-xs text-sky-300/45">
        JPG, PNG, WEBP, PDF, or TXT · up to {MAX_ATTACHMENTS} images · max 5 MB per image
        {isMobileOrTablet ? " · Use camera on phone/tablet" : ""}
      </p>

      {(images.length > 0 || documents.length > 0) && (
        <div className="space-y-3 rounded-xl border border-sky-400/15 bg-navy-950/40 p-3">
          {images.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {images.map((img) => (
                <div key={img.id} className="group relative overflow-hidden rounded-lg border border-sky-400/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.previewUrl}
                    alt={img.name}
                    className="h-24 w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(img.id)}
                    className="absolute right-1 top-1 rounded-full bg-navy-950/80 p-1 text-sky-200 hover:text-white"
                    aria-label={`Remove ${img.name}`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                  <p className="truncate px-2 py-1 text-[10px] text-sky-300/60">{img.name}</p>
                </div>
              ))}
            </div>
          )}

          {documents.map((doc) => (
            <div
              key={doc.name}
              className="flex items-start justify-between gap-3 rounded-lg border border-sky-400/15 px-3 py-2"
            >
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-sm font-medium text-sky-200">
                  <FileText className="h-3.5 w-3.5 shrink-0 text-orange-400" />
                  {doc.name}
                </p>
                <p className="mt-1 line-clamp-2 text-xs text-sky-300/50">{doc.text}</p>
              </div>
              <button
                type="button"
                onClick={() => removeDocument(doc.name)}
                className="shrink-0 rounded-full p-1 text-sky-300/60 hover:text-white"
                aria-label={`Remove ${doc.name}`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {processing && (
        <p className="text-xs text-sky-300/60">Processing upload...</p>
      )}

      {error && (
        <p className="text-xs text-red-300">{error}</p>
      )}
    </div>
  );
}
