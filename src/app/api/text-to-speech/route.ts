import { NextResponse } from "next/server";
import { z } from "zod";
import { isServerTtsConfigured, streamSpeechAudioChunks } from "@/lib/speech-synthesis-server";

const schema = z.object({
  text: z.string().trim().min(1, "Text is required.").max(15000, "Text is too long to read aloud."),
});

export async function POST(request: Request) {
  try {
    if (!isServerTtsConfigured()) {
      return NextResponse.json(
        { error: "Server text-to-speech is not configured." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid request." },
        { status: 400 }
      );
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of streamSpeechAudioChunks(parsed.data.text)) {
            controller.enqueue(encoder.encode(`${JSON.stringify(chunk)}\n`));
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "application/x-ndjson; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("text-to-speech route error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Could not generate speech audio. Please try again.",
      },
      { status: 500 }
    );
  }
}
