"use client";

import { useState } from "react";
import { ArrowUpRight, Clock, Loader2 } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { Reveal, RevealWords } from "@/components/site/reveal";
import { useFetch } from "@/hooks/use-fetch";
import { BlogModal, type ApiBlogPost } from "@/components/site/blog-modal";
import { SectionBackdrop } from "@/components/site/section-backdrop";
import { images } from "@/lib/images";

export function Blog() {
  const lang = useSiteStore((s) => s.lang);
  const c = content[lang].blog;
  const { data: items, loading } = useFetch<ApiBlogPost[]>("/api/blog");
  const [selectedPost, setSelectedPost] = useState<ApiBlogPost | null>(null);

  return (
    <section id="blog" className="relative bg-coal py-32 overflow-hidden">
      <SectionBackdrop image={images.construction[1]} tone="blue" className="h-[32rem]" />
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute right-8 top-24 h-44 w-44 rotate-45 border border-gold/25 [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)]" />
      <div className="absolute right-16 top-32 h-28 w-28 -rotate-12 border border-emerald-light/30 [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)]" />
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full opacity-15 blur-2xl"
        style={{ background: "radial-gradient(circle, var(--copper), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="mb-16 flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <Reveal><span className="badge-premium mb-6">{c.tag}</span></Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl font-bold leading-tight text-ivory md:text-5xl lg:text-6xl">
                <RevealWords text={c.title} />
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-xs text-sm text-ivory/70">{c.subtitle}</p>
          </Reveal>
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-gold" />
          </div>
        )}

        {!loading && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {(items || []).map((post, i) => {
              const title = lang === "fr" ? post.title : (post.titleEn || post.title);
              const excerpt = lang === "fr" ? post.excerpt : (post.excerptEn || post.excerpt);
              const date = new Date(post.publishedAt).toLocaleDateString(
                lang === "fr" ? "fr-FR" : "en-US",
                { day: "numeric", month: "long", year: "numeric" }
              );
              return (
                <Reveal key={post.id} delay={(i % 4) * 0.08}>
                  <article
                    onClick={() => setSelectedPost(post)}
                    data-cursor="hover"
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gold/15 bg-gradient-to-b from-graphite to-coal transition-all duration-500 hover:border-gold/40 card-lift cursor-pointer"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {post.coverImage ? (
                        <img
                          src={post.coverImage}
                          alt={title}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-graphite to-coal flex items-center justify-center">
                          <span className="font-display text-7xl font-bold text-gold/10">0{i + 1}</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/30 to-transparent" />
                      <div className="absolute left-3 top-3 rounded-full bg-gold/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-obsidian">
                        {post.category}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-3 flex items-center gap-3 text-[10px] uppercase tracking-wider text-ivory/60">
                        <span>{date}</span>
                        {post.readTime && (
                          <>
                            <span className="h-1 w-1 rounded-full bg-ivory/40" />
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.readTime}
                            </span>
                          </>
                        )}
                      </div>
                      <h3 className="font-display text-lg font-bold leading-snug text-ivory transition-colors group-hover:text-gold">
                        {title}
                      </h3>
                      {excerpt && (
                        <p className="mt-2 text-xs text-ivory/60 line-clamp-2">{excerpt}</p>
                      )}
                      <div className="mt-auto pt-4 flex items-center gap-2 text-sm text-gold">
                        <span className="link-underline">
                          {lang === "fr" ? "Lire l'article" : "Read article"}
                        </span>
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>

      <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </section>
  );
}
