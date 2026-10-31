"use client";

import React, { useState, useMemo } from "react";
import { Product, ProductCategory } from "@/types/product";
import { SAMPLE_PRODUCTS } from "@/lib/mock-data";
import { useLanguage } from "@/components/i18n/LanguageContext";
import {
  ShoppingBag,
  Star,
  Search,
  CheckCircle2,
  Sparkles,
  Info,
  X,
  ExternalLink,
  ChevronRight,
  Filter,
  SlidersHorizontal,
  ShieldCheck,
  Zap,
  ArrowUpDown,
  Tag,
  Clock,
  FlaskConical,
} from "lucide-react";

interface HairProductsCatalogProps {
  recommendedSlugs?: string[];
  norwoodCategory?: string;
  className?: string;
}

export function HairProductsCatalog({
  recommendedSlugs = [],
  norwoodCategory = "Norwood Type II",
  className = "",
}: HairProductsCatalogProps) {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyRecommended, setOnlyRecommended] = useState(false);
  const [sortBy, setSortBy] = useState<"recommended" | "rating" | "price-asc" | "price-desc">("recommended");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories: { id: ProductCategory; label: string; hiLabel: string; teLabel: string }[] = [
    { id: "all", label: "All Products", hiLabel: "सभी उत्पाद", teLabel: "అన్ని ఉత్పత్తులు" },
    { id: "serums", label: "Serums & Actives", hiLabel: "सीरम और एक्टिव्स", teLabel: "సీరమ్‌లు & యాక్టివ్‌లు" },
    { id: "scalp-care", label: "Scalp Oils & Tonics", hiLabel: "स्कैल्प ऑयल और टॉनिक", teLabel: "నూనెలు & టానిక్‌లు" },
    { id: "shampoos", label: "Shampoos & Cleansers", hiLabel: "एंटी-हेयरफॉल शैम्पू", teLabel: "షాంపూలు" },
    { id: "conditioners", label: "Masks & Conditioners", hiLabel: "कंडीशनर और मास्क", teLabel: "కండీషనర్లు & మాస్క్‌లు" },
    { id: "tools", label: "Scalp Tools & Rollers", hiLabel: "डर्मा रोलर और टूल्स", teLabel: "డెర్మా రోలర్లు & టూల్స్" },
    { id: "supplements", label: "Biotin & Nutrients", hiLabel: "बायोटिन और पोषण", teLabel: "బయోటిన్ & పోషకాలు" },
    { id: "evidence-treatments", label: "Clinical Treatments", hiLabel: "क्लिनिकल उपचार", teLabel: "క్లినికల్ చికిత్సలు" },
    { id: "styling", label: "Styling & Coverage", hiLabel: "स्टाइलिंग और कवरेज", teLabel: "స్టైలింగ్" },
  ];

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: SAMPLE_PRODUCTS.length };
    SAMPLE_PRODUCTS.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const isRecommended = (product: Product) => {
    if (recommendedSlugs.includes(product.slug)) return true;
    return product.suitedFor.some(
      (tag) => tag.includes("temple") || tag.includes("hairline") || tag.includes("mature")
    );
  };

  const filteredProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter((product) => {
      // Category filter
      if (activeCategory !== "all" && product.category !== activeCategory) {
        return false;
      }

      // Only recommended filter
      if (onlyRecommended && !isRecommended(product)) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesTagline = product.tagline.toLowerCase().includes(query);
        const matchesDescription = product.shortDescription.toLowerCase().includes(query);
        const matchesIngredients = product.verifiedIngredients.some(
          (ing) =>
            ing.name.toLowerCase().includes(query) ||
            ing.role.toLowerCase().includes(query)
        );
        const matchesSuited = product.suitedFor.some((tag) => tag.toLowerCase().includes(query));

        if (
          !matchesName &&
          !matchesBrand &&
          !matchesTagline &&
          !matchesDescription &&
          !matchesIngredients &&
          !matchesSuited
        ) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;

      // Default: recommended first, then rating
      const aRec = isRecommended(a) ? 1 : 0;
      const bRec = isRecommended(b) ? 1 : 0;
      if (bRec !== aRec) return bRec - aRec;
      return b.rating - a.rating;
    });
  }, [activeCategory, onlyRecommended, searchQuery, sortBy, recommendedSlugs]);

  const getLocalizedTitle = () => {
    if (language === "hi") return "प्रामाणिक हेयर केयर और स्कैल्प उत्पाद";
    if (language === "te") return "ధృవీకరించబడిన జుట్టు & నెత్తి ఉత్పత్తులు";
    return "Verified Hair & Scalp Care Products";
  };

  const getLocalizedSubtitle = () => {
    if (language === "hi") {
      return `हेयरलाइन रिसेशन, मंदिर कोनों और बालों के घनत्व के लिए 26+ क्लिनिकली परखे गए उत्पाद और उपकरण।`;
    }
    if (language === "te") {
      return `హెయిర్‌లైన్ మార్పులు, టెంపుల్ సన్నబడటం మరియు జుట్టు సాంద్రత కోసం 26+ ఉత్పత్తులు మరియు టూల్స్.`;
    }
    return `Discover 26+ clinically tested serums, oils, shampoos, derma rollers, and hair vitamins tailored for front hairline & temple density.`;
  };

  return (
    <div className={`p-6 sm:p-8 premium-card space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-red-500 font-semibold mb-1">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>CURATED HAIR CARE CATALOG</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white tracking-tight">
            {getLocalizedTitle()}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl">
            {getLocalizedSubtitle()}
          </p>
        </div>

        {/* Stats counter badge */}
        <div className="flex items-center gap-2 self-start md:self-auto font-mono text-xs">
          <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 font-semibold border border-red-500/20">
            {filteredProducts.length} of {SAMPLE_PRODUCTS.length} Available
          </span>
        </div>
      </div>

      {/* Search and Sort Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
        {/* Search input */}
        <div className="relative flex-grow">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              language === "hi"
                ? "उत्पाद, सामग्री (जैसे Redensyl, Rosemary, Biotin) या ब्रांड खोजें..."
                : language === "te"
                ? "ఉత్పత్తి, పదార్థం (Redensyl, Rosemary) లేదా బ్రాండ్ కోసం శోధించండి..."
                : "Search by product name, active (Redensyl, Rosemary, Biotin), or brand..."
            }
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Recommended Only Toggle */}
        <button
          onClick={() => setOnlyRecommended(!onlyRecommended)}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-all shrink-0 ${
            onlyRecommended
              ? "bg-red-500 text-white border-red-500 shadow-sm"
              : "bg-zinc-50 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>
            {language === "hi"
              ? "मेरे लिए अनुशंसित"
              : language === "te"
              ? "నాకు సిఫార్సు చేసినవి"
              : "AI Matched for You"}
          </span>
        </button>

        {/* Sort selector */}
        <div className="relative shrink-0">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-500/40 cursor-pointer appearance-none pr-8"
          >
            <option value="recommended">Sort: Best Match</option>
            <option value="rating">Sort: Top Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
          <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Category Pills Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = categoryCounts[cat.id] || 0;
          const label =
            language === "hi" ? cat.hiLabel : language === "te" ? cat.teLabel : cat.label;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                isActive
                  ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-sm"
                  : "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              <span>{label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive
                    ? "bg-zinc-800 dark:bg-zinc-200 text-zinc-200 dark:text-zinc-800"
                    : "bg-zinc-200/80 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 space-y-3">
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">
            No products matched your filter
          </p>
          <p className="text-xs text-zinc-500">
            Try clearing the search query or selecting a different category.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("all");
              setOnlyRecommended(false);
            }}
            className="px-4 py-2 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => {
            const recommended = isRecommended(product);

            return (
              <div
                key={product.id}
                className={`sheen-card rounded-2xl bg-white dark:bg-[#111319] border transition-all duration-300 overflow-hidden flex flex-col group hover:shadow-xl hover:-translate-y-1 ${
                  recommended
                    ? "border-red-500/30 hover:border-red-500/60 dark:border-red-500/25"
                    : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                }`}
              >
                {/* Product Image Container */}
                <div className="relative h-48 w-full bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Brand & Volume Pill */}
                  <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1 z-10">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-black/75 backdrop-blur-md text-white font-semibold">
                      {product.brand}
                    </span>
                    {product.volume && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/90 dark:bg-zinc-800/90 text-zinc-700 dark:text-zinc-300 backdrop-blur-md">
                        {product.volume}
                      </span>
                    )}
                  </div>

                  {/* Match Pill (Top Right) */}
                  {recommended && (
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider font-mono bg-red-600 text-white shadow-md flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>AI MATCH</span>
                      </span>
                    </div>
                  )}

                  {/* Category Pill (Bottom Left) */}
                  <div className="absolute bottom-2 left-2 z-10">
                    <span className="px-2 py-0.5 rounded text-[9px] uppercase font-mono tracking-wider bg-zinc-900/80 backdrop-blur-sm text-zinc-300 border border-white/10">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-4 space-y-3 flex flex-col flex-grow">
                  <div>
                    <h3 className="text-sm font-bold text-zinc-950 dark:text-white leading-snug line-clamp-2 group-hover:text-red-500 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-1">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Price & Rating */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-extrabold text-zinc-950 dark:text-white">
                        ₹{product.price}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-mono">INR</span>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-md">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                        {product.rating}
                      </span>
                      <span className="text-[10px] text-zinc-400">
                        ({product.reviewsCount})
                      </span>
                    </div>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                    {product.shortDescription}
                  </p>

                  {/* Active Verified Ingredients Chips */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {product.verifiedIngredients.slice(0, 3).map((ing, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[9px] font-mono bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50"
                      >
                        {ing.name}
                      </span>
                    ))}
                  </div>

                  {/* Personalized Match Benefit Box */}
                  {product.whyItSuitsYou && (
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/20 border border-emerald-500/20 text-[10px] text-emerald-800 dark:text-emerald-300 leading-relaxed line-clamp-2 mt-auto">
                      <strong className="font-semibold text-emerald-900 dark:text-emerald-200">
                        Why it fits:{" "}
                      </strong>
                      {product.whyItSuitsYou}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="w-full py-2 px-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/90 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                    >
                      <Info className="w-3 h-3 text-zinc-500" />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="w-full py-2 px-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-semibold shadow-sm hover:shadow transition-all flex items-center justify-center gap-1"
                    >
                      <span>Get Product</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#0E1117] border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header Section */}
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <div className="relative w-full sm:w-44 h-44 rounded-2xl bg-zinc-100 dark:bg-zinc-800 overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-700">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono bg-black/80 text-white">
                  {selectedProduct.brand}
                </span>
              </div>

              <div className="space-y-2 flex-grow">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-red-500/10 text-red-600 dark:text-red-400 font-semibold border border-red-500/20">
                    {selectedProduct.category}
                  </span>
                  {selectedProduct.volume && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      {selectedProduct.volume}
                    </span>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white leading-tight">
                  {selectedProduct.name}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {selectedProduct.tagline}
                </p>

                <div className="flex items-center gap-4 pt-1">
                  <div className="text-2xl font-black text-zinc-950 dark:text-white">
                    ₹{selectedProduct.price}{" "}
                    <span className="text-xs font-normal text-zinc-500">INR</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-amber-500/10 px-2.5 py-1 rounded-lg">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      {selectedProduct.rating} / 5.0
                    </span>
                    <span className="text-[10px] text-zinc-400">
                      ({selectedProduct.reviewsCount} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Full Clinical & Product Description */}
            <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                Overview & Formulation
              </h4>
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {selectedProduct.fullDescription}
              </p>
            </div>

            {/* Verified Active Ingredients with Clinical Role */}
            <div className="space-y-2.5 pt-2 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-red-500 font-semibold">
                <FlaskConical className="w-3.5 h-3.5" />
                <span>Verified Key Active Ingredients</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedProduct.verifiedIngredients.map((ing, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-900 dark:text-white">
                        {ing.name}
                      </span>
                      <span className="text-[10px] font-mono text-red-600 dark:text-red-400 bg-red-500/10 px-1.5 py-0.2 rounded">
                        {ing.role}
                      </span>
                    </div>
                    {ing.clinicalContext && (
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-normal">
                        {ing.clinicalContext}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* How to Use Instructions */}
            <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>Recommended Application & Usage Routine</span>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
                {selectedProduct.howToUse}
              </div>
            </div>

            {/* Tailored Hairline Suitability Note */}
            {selectedProduct.whyItSuitsYou && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Why This Matches Your Hairline Analysis</span>
                </span>
                <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed">
                  {selectedProduct.whyItSuitsYou}
                </p>
              </div>
            )}

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <span className="text-[11px] text-zinc-400 font-mono">
                {selectedProduct.type === "clinical-education"
                  ? "Pharmacy / Medical formulation"
                  : "Dermatologically tested cosmetic care"}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  Close
                </button>
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(
                    selectedProduct.name + " " + selectedProduct.brand
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>Check Price Online</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-[11px] text-zinc-500 text-center pt-2">
        {language === "hi"
          ? "* ये उत्पाद सुझाव आपकी फोटो और प्रश्नावली के आधार पर हैं। किसी भी त्वचा या एलर्जी की स्थिति में पैच टेस्ट अवश्य करें।"
          : language === "te"
          ? "* ఈ ఉత్పత్తుల సిఫార్సులు మీ విశ్లేషణపై ఆధారపడి ఉంటాయి. ఏదైనా అనుమానం ఉంటే చర్మవ్యాధి నిపుణుడిని సంప్రదించండి."
          : "* Curated recommendations tailored to hairline recession, temple thinning, and general follicle vitality. Always patch test before first use."}
      </p>
    </div>
  );
}
