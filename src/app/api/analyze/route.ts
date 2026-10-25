import { NextResponse } from "next/server";
import { z } from "zod";
import { analysisService } from "@/lib/analysis-service";

const AnalysisRequestSchema = z.object({
  imageDataUrl: z.string().min(100, "Valid image data URL or image string is required"),
  questionnaire: z.object({
    ageRange: z.string().optional(),
    hairType: z.string().optional(),
    duration: z.string().optional(),
    primaryConcern: z.string().optional(),
    familyHistory: z.string().optional(),
    scalpSymptoms: z.array(z.string()).optional(),
    currentRoutine: z.string().optional(),
    healthContext: z.string().optional(),
    consentGiven: z.boolean().default(true),
  }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = AnalysisRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid request payload",
          details: parsed.error.format(),
        },
        { status: 400 }
      );
    }

    const { imageDataUrl, questionnaire } = parsed.data;

    // Run the analysis service pipeline
    const result = await analysisService.analyzeImage(imageDataUrl, questionnaire);

    return NextResponse.json({
      success: true,
      data: result,
      metadata: {
        timestamp: new Date().toISOString(),
        engine: "FollicleVision-v2.4",
        disclaimer:
          "This image-based hairline estimate is for personal tracking and educational purposes only. It does not constitute a medical diagnosis.",
      },
    });
  } catch (err: any) {
    console.error("API /api/analyze error:", err);
    return NextResponse.json(
      {
        error: "Analysis execution failed",
        message: err?.message || "Internal server error occurred during hairline processing",
      },
      { status: 500 }
    );
  }
}
