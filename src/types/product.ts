export type ProductCategory =
  | "all"
  | "shampoos"
  | "conditioners"
  | "scalp-care"
  | "serums"
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
};
