# FollicleAI — AI-Assisted Hairline Analysis & Hair Care Platform

> **"Understand your hair. Take control of your routine."**

FollicleAI is a production-oriented, modern web application designed like a combination of Apple Health, an AI health-tech startup, and a luxury hair-care brand. It empowers users to analyze visible front hairline contours, understand physiological maturation versus potential signs of recession, and receive tailored, evidence-informed care routines without pseudo-scientific diagnosis claims.

---

## 🌟 Key Features

### 1. Computer Vision Hairline Analysis & Interactive Canvas
- **Contour Segmentation**: Delineates the visible frontal hairline boundary with a coral-red line (`#E45454`) and highlights uncertain/receding temple zones with translucent shading.
- **Interactive Annotation Viewer**:
  - Original vs. AI Analysis toggle
  - Draggable split-screen Before/After slider
  - Zoom in, zoom out, and pan controls
  - Landmark notch inspections (temporal apex, mid-frontal apex, juvenile baseline)
  - Pre-calibrated sample photos for immediate testing without personal cameras.
- **Normalized Craniofacial Thirds**:
  - Calculates forehead-to-face height ratio (classical thirds rule ~0.30–0.35)
  - Temple recession notch depth estimates (image-relative)
  - Bitemporal cranial asymmetry index.

### 2. Multi-Step Assessment Workflow
- **Questionnaire**: Gathers hair texture, duration of changes, primary concern, family history, scalp sensations, and current routine.
- **Photo Upload**: Supports JPG, PNG, WebP with client-side file size and illumination validation, plus guideline checklists.
- **Scanning HUD**: Multi-stage progress indicator with animated laser scan line across 5 analytical phases.

### 3. Personalized Care Protocol Engine
- **Daily Habits**: Interactive daily routine checklist with state tracking (tension reduction, gentle massage, UV defense).
- **Weekly Scalp Regimen**: Clarifying BHA/salicylic exfoliation and standardized photo audits.
- **Evidence-Informed Treatments**: Clinical overview of topical Minoxidil (5%) and photobiomodulation, with essential medical caveats and precautions.
- **Dermatologist Triggers**: Transparent screening for red flags (patchy loss, burning/pain, rapid shedding) advising immediate physician evaluation.

### 4. Longitudinal Hair Journal & Photo Timeline
- Side-by-side split comparison slider between two photos from different dates.
- Dated entries with observation notes and stability tracking metrics.
- Ability to record new photo check-ins and purge records.

### 5. Curated Hair & Scalp Marketplace
- Formulations for scalp health: clarifying elixirs, fortifying caffeine cleansers, copper peptide density serums, and restorative barrier shields.
- Side-by-side **Product Comparison Modal** (comparing ingredients, mechanisms, cosmetic vs. medical roles).
- "Why this may suit you" personalization indicators.

### 6. Privacy & Data Sovereignty
- Private by default: Guest mode stores analyses and journal entries strictly in browser `localStorage`.
- No AI model training on user photographs.
- Clear medical disclaimers distinguishing image-based estimations from dermatological diagnoses.

---

## 🛠 Tech Stack

- **Framework**: Next.js 14+ (App Router, Server & Client Components)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS with custom design tokens:
  - Warm Ivory (`#F7F6F2`)
  - Deep Charcoal (`#171A19`)
  - Forest Green (`#315C49`)
  - Coral Red Overlay (`#E45454`)
  - Subtle Sage (`#EAF1ED`)
- **Icons**: Lucide Icons
- **Animation**: CSS animations, keyframe laser scan lines, responsive transitions
- **Validation**: Zod schema validation on `/api/analyze`

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js `v18.x` or higher
- npm `v9.x` or higher

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/your-username/follicle-ai.git
cd follicle-ai

# Install dependencies
npm install
```

### 3. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to experience FollicleAI.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🔌 AI & Computer Vision Integration Architecture

FollicleAI uses a clean **Adapter Pattern** defined in `src/lib/analysis-service.ts`:

```typescript
export interface IHairlineAnalysisService {
  analyzeImage(
    imageDataUrl: string,
    answers: Partial<QuestionnaireAnswers>
  ): Promise<HairlineAnalysisResult>;
}
```

### Connecting an External Python / PyTorch / OpenCV Model
1. Deploy your computer vision inference service (e.g. FastAPI serving a YOLOv8-pose or DeepLabv3+ hairline segmentation model).
2. Set the environment variable in `.env.local`:
   ```bash
   NEXT_PUBLIC_ANALYSIS_API_URL=https://your-cv-service.com/api
   ```
3. When `NEXT_PUBLIC_ANALYSIS_API_URL` is set, `HairlineAnalysisService` automatically forwards the image and questionnaire payload to your service.
4. If unavailable, it seamlessly falls back to the embedded client-side geometric engine.

---

## 🛡️ Medical Disclaimer
FollicleAI is designed strictly for cosmetic wellness, hair hygiene, and visual tracking. It does not provide medical diagnoses, treatment prescriptions, or definitive medical opinions on hair loss conditions such as alopecia areata or cicatricial alopecia. Always consult a board-certified dermatologist for medical evaluation.
