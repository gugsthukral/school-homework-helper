import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuthenticatedUser, getUserDisplayName } from "@/lib/auth";
import {
  GUEST_LIMIT_MESSAGE,
  GUEST_USAGE_LIMIT,
  getGuestUsesRemaining,
  guestUsageCookieOptions,
} from "@/lib/guest-usage-limit";
import { getGuestUsageCount } from "@/lib/guest-usage-limit.server";
import { generateAIResponse, generateAIResponseWithVision } from "@/lib/openai";
import { logAIRequest } from "@/lib/supabase";

const DEFAULT_SYSTEM =
  "You are a helpful, patient school teacher for Indian students. Use clear markdown formatting.";

export const VISION_SYSTEM =
  "You are a helpful school teacher for Indian students. You CAN read text from photos the student uploads, including handwriting. Always analyze attached images when provided. Never tell the student you cannot read images — extract the text and help them. Use clear markdown formatting.";

type CreateAIToolRouteOptions<T extends z.ZodType> = {
  toolName: string;
  schema: T;
  buildPrompt: (data: z.infer<T>) => string;
  getImages?: (data: z.infer<T>) => string[] | undefined;
  systemPrompt?: string;
  buildSystemPrompt?: (data: z.infer<T>) => string;
  visionSystemPrompt?: string;
  maxTokens?: number;
  jsonObject?: boolean;
  transformResponse?: (
    response: string,
    data: z.infer<T>
  ) => Record<string, unknown> | Promise<Record<string, unknown>>;
};

export function createAIToolRoute<T extends z.ZodType>({
  toolName,
  schema,
  buildPrompt,
  getImages,
  systemPrompt = DEFAULT_SYSTEM,
  buildSystemPrompt,
  visionSystemPrompt = VISION_SYSTEM,
  maxTokens,
  jsonObject,
  transformResponse,
}: CreateAIToolRouteOptions<T>) {
  return async function POST(request: Request) {
    try {
      const user = await getAuthenticatedUser();

      if (!user) {
        const usageCount = await getGuestUsageCount();
        if (usageCount >= GUEST_USAGE_LIMIT) {
          return NextResponse.json(
            { error: GUEST_LIMIT_MESSAGE, signInRequired: true },
            { status: 403 }
          );
        }
      }

      const body = await request.json();
      const parsed = schema.safeParse(body);

      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.issues[0]?.message ?? "Invalid request." },
          { status: 400 }
        );
      }

      const prompt = buildPrompt(parsed.data);
      const resolvedSystemPrompt = buildSystemPrompt?.(parsed.data) ?? systemPrompt;
      const images = getImages?.(parsed.data)?.filter(Boolean);
      const hasImages = Boolean(images && images.length > 0);
      const response = hasImages
        ? await generateAIResponseWithVision(visionSystemPrompt, prompt, images!)
        : await generateAIResponse(resolvedSystemPrompt, prompt, maxTokens, {
            jsonObject,
          });

      await logAIRequest({
        toolName,
        prompt: JSON.stringify({
          ...(parsed.data as Record<string, unknown>),
          images: images?.length ? `[${images.length} image(s)]` : undefined,
        }),
        response,
        userId: user?.id ?? null,
        userEmail: user?.email ?? null,
        userName: user ? getUserDisplayName(user) : null,
      });

      const jsonResponse = NextResponse.json({
        response,
        guestUsesRemaining: user ? undefined : getGuestUsesRemaining((await getGuestUsageCount()) + 1),
        ...(transformResponse ? await transformResponse(response, parsed.data) : {}),
      });

      if (!user) {
        const newCount = (await getGuestUsageCount()) + 1;
        jsonResponse.cookies.set(guestUsageCookieOptions(newCount));
      }

      return jsonResponse;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong. Please try again.";

      return NextResponse.json({ error: message }, { status: 500 });
    }
  };
}
