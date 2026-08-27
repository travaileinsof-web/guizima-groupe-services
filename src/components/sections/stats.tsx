"use client";

import { useRef } from "react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { AnimatedCounter } from "@/components/site/animated-counter";
import { Reveal } from "@/components/site/reveal";
import { useFetch } from "@/hooks/use-fetch";
import { SectionBackdrop } from "@/components/site/section-backdrop";

interface ApiStat {
  id: string;
  key: string;
  label: string;
  labelEn: string | null;
  value: number;
  suffix: string | null;
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const lang = useSiteStore((s) => s.lang);
  const c = content[lang].stats;
  const { data: items } = useFetch<ApiStat[]>("/api/stats");

  // Fallback to static content if DB not loaded
  const stats = (items && items.length > 0) ? items.map(s => ({
    value: s.value,
    suffix: s.suffix || "",
    label: lang === "fr" ? s.label : (s.labelEn || s.label),
  })) : c.items;

  return (
    <section ref={ref} className="relative overflow-hidden bg-emerald-deep py-32">
      <SectionBackdrop tone="blue" />

      <div className="absolute left-10 top-10 hidden lg:block animate-spin-cw gpu">
        <div className="hexagon h-16 w-16 border border-gold/30 bg-gold/5" />
      </div>
      <div className="absolute bottom-10 right-10 hidden lg:block animate-spin-ccw gpu">
        <div className="hexagon h-24 w-24 border border-gold/30 bg-gold/5" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <div className="mb-16 text-center">
            <span className="badge-premium mb-6 mx-auto" style={{ background: "rgba(227,41,63,0.15)", borderColor: "rgba(227,41,63,0.4)", color: "#ff5364" }}>
              {c.tag}
            </span>
            <h2 className="font-display text-4xl font-bold text-ivory md:text-5xl lg:text-6xl glow-text-gold">
              {c.title}
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-gold/20 bg-gold/20 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="group relative flex flex-col items-center justify-center bg-emerald-deep/80 p-10 text-center transition-all duration-500 hover:bg-emerald-deep">
                <div className="font-display text-5xl font-bold text-gradient-gold md:text-6xl lg:text-7xl">
                  <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-3 text-xs uppercase tracking-[0.2em] text-ivory/70">
                  {stat.label}
                </div>
                <div className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-500 group-hover:w-3/4" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
