export type QuestionnaireAnswers = {
  ageRange: string;
  hairType: string;
  duration: string;
  primaryConcern: string;
  familyHistory: string;
  scalpSymptoms: string[];
  currentRoutine: string;
  healthContext?: string;
  consentGiven: boolean;
};

export type BoundaryPoint = {
  x: number; // percentage 0-100 of image width
  y: number; // percentage 0-100 of image height
};

export type TempleAssessment = {
  status: "preserved" | "mild-recession" | "moderate-recession" | "uncertain";
  recessionDepthPct: number;
  depthEstimateLabel: string;
  notes: string;
};

export type ImageQuality = {
  score: number; // 0-100
  visibility: "excellent" | "adequate" | "suboptimal";
  lightingScore: number;
  alignmentScore: number;
  warnings: string[];
};

export type NormalizedMeasurements = {
  foreheadRatio: number; // Normal range is ~0.30 - 0.36
  templeAngleLeftDeg: number;
  templeAngleRightDeg: number;
  asymmetryPercentage: number;
  imageRelativeApexDepth: string;
};

export type HairCareItem = {
  title: string;
  description: string;
  frequency: string;
  category: "daily" | "weekly" | "nutrition" | "lifestyle" | "medical_guidance";
  priority: "essential" | "recommended" | "optional";
};

export type CarePlan = {
  id: string;
  summary: string;
  dailyHabits: HairCareItem[];
  weeklyRoutine: HairCareItem[];
  nutritionAndWellness: HairCareItem[];
  evidenceInformedTreatments: {
    title: string;
    description: string;
    precautions: string[];
    isMedical: boolean;
  }[];
  dermatologistGuidance: {
    shouldConsult: boolean;
    urgency: "routine" | "soon" | "urgent";
    reasons: string[];
  };
  suggestedProductSlugs: string[];
};

export type HairlineAnalysisResult = {
  id: string;
  createdAt: string;
  imageUrl: string;
  isDemo: boolean;
  imageQuality: ImageQuality;
  hairlineBoundary: BoundaryPoint[];
  originalEstimatedBoundary?: BoundaryPoint[]; // Hypothetical juvenile line for visual reference
  recessionZones: Array<{
    id: string;
    name: string;
    points: BoundaryPoint[];
    severity: "mild" | "moderate" | "monitoring";
    confidencePct: number;
  }>;
  leftTemple: TempleAssessment;
  rightTemple: TempleAssessment;
  visiblePattern: {
    category: string;
    norwoodEquivalent?: string;
    summary: string;
    clinicalContext: string;
  };
  measurements: NormalizedMeasurements;
  confidenceScore: number; // 0-100
  limitations: string[];
  carePlan: CarePlan;
  questionnaireAnswers?: Partial<QuestionnaireAnswers>;
};

export type JournalEntry = {
  id: string;
  date: string;
  imageUrl: string;
  title: string;
  notes: string;
  regime: string[];
  analysisId?: string;
  metrics: {
    hairlineStability: "stable" | "improved" | "slight-recession" | "unverified";
    foreheadRatio: number;
    asymmetryPercentage: number;
  };
};
