export const MAX_ATTACHMENTS = 4;
export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
export const MAX_DOCUMENT_SIZE_BYTES = 10 * 1024 * 1024;

export const ACCEPTED_FILE_TYPES =
  "image/jpeg,image/png,image/webp,image/gif,image/heic,image/heif,.pdf,.txt,.text,.md";

export type UploadedImage = {
  id: string;
  name: string;
  dataUrl: string;
  previewUrl: string;
};

export type DocumentExtract = {
  name: string;
  text: string;
};

export function createAttachmentId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function isImageFile(file: File) {
  return file.type.startsWith("image/") || /\.(jpe?g|png|webp|gif|heic|heif)$/i.test(file.name);
}

export function isTextDocument(file: File) {
  return (
    file.type.startsWith("text/") ||
    /\.(txt|text|md)$/i.test(file.name)
  );
}

export function isPdfDocument(file: File) {
  return file.type === "application/pdf" || /\.pdf$/i.test(file.name);
}

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error(`Could not read ${file.name}.`));
    reader.readAsDataURL(file);
  });
}

export async function compressImageForUpload(dataUrl: string): Promise<string> {
  if (typeof window === "undefined") return dataUrl;

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const maxWidth = 1600;
      const scale = img.width > maxWidth ? maxWidth / img.width : 1;
      const width = Math.round(img.width * scale);
      const height = Math.round(img.height * scale);

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(dataUrl);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error(`Could not read ${file.name}.`));
    reader.readAsText(file);
  });
}

async function extractPdfText(file: File): Promise<string> {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

  const buffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: buffer }).promise;
  const parts: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ")
      .trim();
    if (pageText) parts.push(pageText);
  }

  return parts.join("\n\n").trim();
}

export async function processUploadFile(
  file: File,
  currentImages: UploadedImage[]
): Promise<{ images: UploadedImage[]; documentText?: DocumentExtract; error?: string }> {
  if (isImageFile(file)) {
    if (currentImages.length >= MAX_ATTACHMENTS) {
      return { images: currentImages, error: `Maximum ${MAX_ATTACHMENTS} images allowed.` };
    }
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      return { images: currentImages, error: `${file.name} exceeds 5 MB limit.` };
    }

    const rawDataUrl = await readFileAsDataUrl(file);
    const dataUrl = await compressImageForUpload(rawDataUrl);
    const image: UploadedImage = {
      id: createAttachmentId(),
      name: file.name,
      dataUrl,
      previewUrl: dataUrl,
    };
    return { images: [...currentImages, image] };
  }

  if (file.size > MAX_DOCUMENT_SIZE_BYTES) {
    return { images: currentImages, error: `${file.name} exceeds 10 MB limit.` };
  }

  if (isTextDocument(file)) {
    const text = (await readFileAsText(file)).trim();
    if (!text) {
      return { images: currentImages, error: `${file.name} is empty.` };
    }
    return {
      images: currentImages,
      documentText: { name: file.name, text },
    };
  }

  if (isPdfDocument(file)) {
    try {
      const text = await extractPdfText(file);
      if (!text) {
        return {
          images: currentImages,
          error: `${file.name} has no readable text. Try uploading a photo instead.`,
        };
      }
      return {
        images: currentImages,
        documentText: { name: file.name, text },
      };
    } catch {
      return {
        images: currentImages,
        error: `Could not read ${file.name}. Try a photo or plain text file.`,
      };
    }
  }

  return {
    images: currentImages,
    error: `${file.name} is not supported. Use images, PDF, or text files.`,
  };
}

export function buildDocumentContext(extracts: DocumentExtract[]) {
  if (extracts.length === 0) return "";
  return extracts
    .map(
      (doc) =>
        `\n\n--- Content from uploaded document "${doc.name}" ---\n${doc.text.slice(0, 8000)}`
    )
    .join("");
}
