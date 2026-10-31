import { QuestionnaireAnswers, CarePlan, HairCareItem } from "@/types/analysis";

export function generatePersonalizedCarePlan(
  answers: Partial<QuestionnaireAnswers>,
  detectedPattern?: string,
  asymmetryPct?: number
): CarePlan {
  const dailyHabits: HairCareItem[] = [
    {
      title: "Gentle Microcirculation Scalp Massage",
      description: "Use clean fingertips (not nails) in circular motions along the hairline and crown for 3-5 minutes daily. Improves local blood flow to the follicular papillae.",
      frequency: "Daily (morning or evening)",
      category: "daily",
      priority: "recommended",
    },
    {
      title: "Eliminate Frontal Mechanical Tension",
      description: "Avoid backward slicking, tight hats, or pulled-back ponytails that cause traction on frontal follicles.",
      frequency: "Continuous",
      category: "daily",
      priority: "essential",
    },
    {
      title: "UV Protection for Exposed Scalp",
      description: "Sunburn damages both skin collagen and follicular stem cells along receding hairline margins. Use a loose hat or non-greasy scalp SPF during sun exposure.",
      frequency: "Daily when outdoors",
      category: "daily",
      priority: "recommended",
    },
  ];

  const weeklyRoutine: HairCareItem[] = [
    {
      title: "Gentle Sulfate-Free Scalp Cleansing",
      description: answers.scalpSymptoms?.includes("Flaking/scaling")
        ? "Wash 3-4 times weekly with a clarifying zinc or salicylic formulation to reduce sebum and yeast accumulation."
        : "Wash according to scalp oiliness (typically every 1-2 days) with a balanced, gentle pH 5.5 cleanser.",
      frequency: "2–4x weekly",
      category: "weekly",
      priority: "essential",
    },
    {
      title: "Standardized Photographic Progress Tracking",
      description: "Take high-resolution frontal and 45-degree angle photos under constant bathroom lighting to assess true longitudinal changes rather than daily perceptual fluctuations.",
      frequency: "Every 4 to 8 weeks",
      category: "weekly",
      priority: "essential",
    },
  ];

  if (answers.scalpSymptoms?.includes("Occasional itching") || answers.scalpSymptoms?.includes("Flaking/scaling")) {
    weeklyRoutine.push({
      title: "Clarifying Scalp Exfoliation (Salicylic Acid or Ketoconazole 1-2%)",
      description: "Addresses excess epidermal flaking and sebum buildup around follicular ostia.",
      frequency: "1–2x weekly",
      category: "weekly",
      priority: "recommended",
    });
  }

  const nutritionAndWellness: HairCareItem[] = [
    {
      title: "Balanced Dietary Protein & Micronutrients",
      description: "Hair is primarily keratin (protein). Aim for sufficient dietary amino acids, iron, zinc, and Vitamin D. Note: Nutritional supplements are indicated primarily if a documented deficiency exists.",
      frequency: "Daily nutrition",
      category: "nutrition",
      priority: "recommended",
    },
    {
      title: "Sleep & Circadian Rhythm Support",
      description: "Growth hormone and tissue repair peak during deep slow-wave sleep. Target 7-8 hours of consistent quality sleep to keep cortisol in a healthy diurnal rhythm.",
      frequency: "Nightly",
      category: "lifestyle",
      priority: "recommended",
    },
  ];

  // Medical referral evaluation: check red flags
  const redFlags: string[] = [];
  let urgency: "routine" | "soon" | "urgent" = "routine";
  let shouldConsult = false;

  if (answers.scalpSymptoms?.includes("Pain/tenderness")) {
    redFlags.push("Scalp pain or tenderness may indicate localized folliculitis or inflammatory dermatosis.");
    urgency = "soon";
    shouldConsult = true;
  }
  if (answers.scalpSymptoms?.includes("Redness/sensitivity")) {
    redFlags.push("Persistent scalp redness or burning warrants in-person evaluation by a board-certified dermatologist.");
    urgency = "soon";
    shouldConsult = true;
  }
  if (answers.primaryConcern?.includes("Excessive shedding") || answers.duration === "Recent (< 6 months)") {
    redFlags.push("Sudden rapid shedding or clumps often points to acute telogen effluvium or systemic triggers (iron, thyroid, stress). A basic blood panel can clarify underlying factors.");
    urgency = "soon";
    shouldConsult = true;
  }
  if (answers.familyHistory === "Both sides" || answers.familyHistory === "Maternal side" || answers.familyHistory === "Paternal side") {
    redFlags.push("Genetic predisposition to androgenetic alopecia noted. Early proactive evaluation with a trichologist or dermatologist allows for the widest range of preventative options.");
    if (urgency === "routine") shouldConsult = true;
  }

  if (redFlags.length === 0) {
    redFlags.push("Your current visible signs appear consistent with a stable hairline pattern. Routine monitoring every 3 to 6 months is suggested.");
    redFlags.push("Seek medical review if you notice sudden patchy loss, accelerated shedding (>150 hairs/day for over 2 months), or scalp irritation.");
  }

  const evidenceInformedTreatments = [
    {
      title: "Topical Minoxidil (2% or 5%)",
      description: "An evidence-backed, FDA-cleared topical medication that acts as a potassium-channel opener and microvascular vasodilator to stimulate hair follicle anagen phase and slow hair loss.",
      precautions: [
        "Must be used consistently and continuously; discontinuation leads to loss of treatment-dependent hair within 3-4 months.",
        "Initial temporary shedding (telogen release) may occur during the first 2-6 weeks as follicles reset.",
        "May cause local contact dermatitis or hypertrichosis on adjacent skin if dripped.",
        "Consult a physician or pharmacist prior to use, particularly if you have cardiovascular conditions.",
      ],
      isMedical: true,
    },
    {
      title: "Low-Level Light Therapy (LLLT / Photobiomodulation)",
      description: "FDA-cleared 650nm red light devices that stimulate mitochondrial cytochrome c oxidase to boost ATP production in follicle cells.",
      precautions: [
        "Requires consistent usage (3-4 times weekly for 15-25 minutes).",
        "Clinical trials show modest increases in hair caliber and density; works best in mild-to-moderate androgenetic cases as an adjunct.",
      ],
      isMedical: false,
    },
    {
      title: "Botanical Actives & Peptide Complexes (Copper Tripeptide, Saw Palmetto, Rosemary)",
      description: "Non-prescription cosmetic serums formulated with soothing peptides, botanical 5-alpha-reductase inhibitors, and antioxidants to support the scalp barrier.",
      precautions: [
        "Cosmetic adjuvants; not proven to reverse severe genetic hair miniaturization on their own.",
        "Patch test prior to application to avoid contact allergies.",
      ],
      isMedical: false,
    },
  ];

  const suggestedProductSlugs: string[] = [
    "minimalist-hair-growth-actives-18",
    "pilgrim-redensyl-anagain-hair-serum",
    "mamaearth-rosemary-methi-hair-oil",
  ];

  if (answers.primaryConcern?.includes("Temple") || answers.primaryConcern?.includes("recession")) {
    suggestedProductSlugs.push("bontress-pro-scalp-serum");
    suggestedProductSlugs.push("derma-roller-0-5mm");
    suggestedProductSlugs.push("wishcare-multi-peptide-hair-serum");
  }

  if (answers.scalpSymptoms?.includes("Flaking/scaling") || answers.scalpSymptoms?.includes("Occasional itching")) {
    suggestedProductSlugs.push("ketoconazole-anti-dandruff-shampoo");
    suggestedProductSlugs.push("scalp-barrier-restorative-lotion");
  } else {
    suggestedProductSlugs.push("dense-root-caffeine-shampoo");
    suggestedProductSlugs.push("amino-repair-weightless-conditioner");
  }

  if (answers.familyHistory?.includes("Maternal") || answers.familyHistory?.includes("Paternal") || answers.familyHistory?.includes("Both")) {
    suggestedProductSlugs.push("man-matters-minoxidil-5-solution");
    suggestedProductSlugs.push("biotin-collagen-hair-gummies");
    suggestedProductSlugs.push("nutrova-keratin-building-nutrients");
  }

  return {
    id: `plan_${Date.now()}`,
    summary: `Tailored for ${answers.primaryConcern || "hairline awareness"} with emphasis on gentle barrier support, tension reduction, and standardized visual tracking.`,
    dailyHabits,
    weeklyRoutine,
    nutritionAndWellness,
    evidenceInformedTreatments,
    dermatologistGuidance: {
      shouldConsult,
      urgency,
      reasons: redFlags,
    },
    suggestedProductSlugs,
  };
}
