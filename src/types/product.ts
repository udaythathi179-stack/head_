export type ProductCategory =
  | "all"
  | "serums"
  | "scalp-care"
  | "shampoos"
  | "conditioners"
  | "tools"
  | "supplements"
  | "styling"
  | "evidence-treatments";

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  tagline: string;
  category: ProductCategory;
  price: number;
  currency: string;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  badges: string[]; // e.g. "Dermatologist Tested", "Clean Scalp", "Evidence-Informed"
  shortDescription: string;
  fullDescription: string;
  howToUse: string;
  volume?: string; // e.g. "30 ml", "200 ml", "60 Gummies", "0.5mm Titanium"
  verifiedIngredients: {
    name: string;
    role: string;
    clinicalContext?: string;
  }[];
  suitedFor: string[]; // e.g. "temple-recession", "diffuse-thinning", "flaking", "preventive"
  whyItSuitsYou: string;
  type: "cosmetic" | "clinical-education" | "scalp-health";
  evidenceNotes?: string;
  affiliateDisclosure?: string;
  buyUrl?: string;
};
