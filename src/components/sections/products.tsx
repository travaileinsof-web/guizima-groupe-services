"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, ArrowUpRight, Loader2, Star } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { Reveal, RevealWords } from "@/components/site/reveal";
import { useFetch } from "@/hooks/use-fetch";
import { SectionBackdrop } from "@/components/site/section-backdrop";
import { productImages } from "@/lib/images";

interface ApiProduct {
  id: string;
  name: string;
  nameEn: string | null;
  description: string;
  descriptionEn: string | null;
  price: number;
  badge: string | null;
  image: string | null;
  type: string;
  featured: boolean;
  categoryId: string;
  category?: { id: string; name: string; nameEn: string | null };
}

interface ApiCategory {
  id: string;
  name: string;
  nameEn: string | null;
}

function formatPrice(price: number, lang: "fr" | "en") {
  return new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-US").format(price) + " GNF";
}

export function Products({ onSelectProduct }: { onSelectProduct?: (p: ApiProduct) => void }) {
  const lang = useSiteStore((s) => s.lang);
  const c = content[lang].products;
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const { data: categories, loading: catLoading } = useFetch<ApiCategory[]>("/api/categories");
  const productsUrl = "/api/products?all=true";
  const { data: allProducts, loading: prodLoading } = useFetch<ApiProduct[]>(productsUrl);

  const products = (allProducts || []).filter(
    (p) => !activeCategoryId || p.categoryId === activeCategoryId
  );

  const loading = catLoading || prodLoading;

  return (
    <section id="products" className="relative bg-cream py-32 overflow-hidden">
      <SectionBackdrop image={productImages[1]} tone="blue" />
      <div className="absolute top-20 right-10 h-72 w-72 rounded-full opacity-15 blur-2xl animate-blob-2 gpu"
        style={{ background: "radial-gradient(circle, var(--gold), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <Reveal>
              <span className="badge-premium mb-6">{c.tag}</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl font-bold leading-tight text-obsidian md:text-5xl lg:text-6xl">
                <RevealWords text={c.title} />
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-md text-base text-graphite/70">{c.subtitle}</p>
          </Reveal>
        </div>

        {/* Category filter chips */}
        <Reveal delay={0.3}>
          <div className="mb-12 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategoryId(null)}
              data-cursor="hover"
              className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
                activeCategoryId === null
                  ? "border-obsidian bg-obsidian text-ivory"
                  : "border-obsidian/20 text-graphite hover:border-gold hover:text-copper"
              }`}
            >
              {lang === "fr" ? "Tout" : "All"}
            </button>
            {(categories || []).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryId(cat.id)}
                data-cursor="hover"
                className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
                  activeCategoryId === cat.id
                    ? "border-emerald bg-emerald text-ivory"
                    : "border-obsidian/20 text-graphite hover:border-emerald hover:text-emerald"
                }`}
              >
                {lang === "fr" ? cat.name : (cat.nameEn || cat.name)}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-copper" />
          </div>
        )}

        {/* Product grid */}
        {!loading && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((item, i) => {
              const productName = lang === "fr" ? item.name : (item.nameEn || item.name);
              const productDesc = lang === "fr" ? item.description : (item.descriptionEn || item.description);
              const catName = item.category
                ? (lang === "fr" ? item.category.name : (item.category.nameEn || item.category.name))
                : "";
              return (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-2xl border border-obsidian/10 bg-white shadow-sm card-lift cursor-pointer"
                  onClick={() => onSelectProduct?.(item)}
                  data-cursor="hover"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={productName}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-graphite to-coal flex items-center justify-center">
                         <span className="font-display text-5xl font-bold text-gold/20">GUZ</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    {/* Badge */}
                    {item.badge && (
                      <div className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-gold to-copper px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-obsidian shadow-lg">
                        {item.badge}
                      </div>
                    )}
                    {/* Featured star */}
                    {item.featured && (
                      <div
                        className={`absolute ${item.badge ? "left-3 top-11" : "left-3 top-3"} flex items-center gap-1 rounded-full bg-obsidian/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold backdrop-blur-md`}
                        title={lang === "fr" ? "Coup de cœur" : "Featured"}
                      >
                        <Star className="h-2.5 w-2.5 fill-current" />
                        {lang === "fr" ? "Coup de cœur" : "Featured"}
                      </div>
                    )}
                    {/* Click indicator */}
                    <div className="absolute bottom-3 right-3 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-gradient-to-br from-gold to-copper text-obsidian opacity-0 shadow-xl transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {catName && (
                      <div className="text-[10px] uppercase tracking-wider text-emerald font-medium">
                        {catName}
                      </div>
                    )}
                    <h3 className="mt-2 font-display text-base font-bold text-obsidian group-hover:text-copper transition-colors">
                      {productName}
                    </h3>
                    {productDesc && (
                      <p className="mt-1 text-xs text-graphite/60 line-clamp-2">{productDesc}</p>
                    )}
                    <div className="mt-4 flex items-center justify-between border-t border-obsidian/5 pt-4">
                      <span className="text-[10px] uppercase tracking-wider text-graphite/40">
                        {item.type}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty state */}
        {!loading && products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-graphite/60">
              {lang === "fr" ? "Aucun produit dans cette catégorie." : "No products in this category."}
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        <Reveal delay={0.4}>
          <div className="mt-16 flex flex-col items-center justify-between gap-6 rounded-3xl border border-emerald/20 bg-gradient-to-r from-emerald-deep via-emerald to-emerald-deep p-10 md:flex-row">
            <div>
              <h3 className="font-display text-2xl font-bold text-ivory">
                {lang === "fr" ? "Besoin d'une solution sur-mesure ?" : "Need a custom solution?"}
              </h3>
              <p className="mt-2 text-sm text-ivory/80">
                {lang === "fr"
                  ? "Notre équipe conçoit des produits adaptés à vos contraintes opérationnelles."
                  : "Our team designs products tailored to your operational constraints."}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
