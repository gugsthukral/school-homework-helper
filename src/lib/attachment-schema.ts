import { z } from "zod";

export const imageDataUrlSchema = z
  .string()
  .regex(/^data:image\/[\w+.-]+;base64,/, "Invalid image format.")
  .max(15_000_000, "Image is too large.");

export const imagesFieldSchema = z.array(imageDataUrlSchema).max(4).optional();

export function hasTextOrImages(text: string, images?: string[]) {
  return text.trim().length > 0 || (images?.length ?? 0) > 0;
}
