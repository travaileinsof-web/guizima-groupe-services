"use client";

import { motion } from "framer-motion";
import { Eye, Target, Gem, Leaf, Shield, Heart, Award, CheckCircle2 } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { Reveal, RevealWords } from "@/components/site/reveal";
import { aboutImage, images } from "@/lib/images";

const valueIcons = [Award, Leaf, Shield, Heart];

export function About() {
 const lang = useSiteStore((s) => s.lang);
 const c = content[lang].about;

 return (
 <section id="about" className="relative bg-ivory py-32 overflow-hidden">
 {/* Decorative bg pattern */}
 <div className="absolute inset-0 grid-pattern-dark opacity-50" />

 {/* Floating gold blob */}
 <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-10 blur-2xl" style={{ background: "radial-gradient(circle, var(--gold), transparent 70%)" }} />
 <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full opacity-10 blur-2xl" style={{ background: "radial-gradient(circle, var(--emerald), transparent 70%)" }} />

 <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
 {/* Header with image */}
 <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
 <div>
 <Reveal>
 <span className="badge-premium mb-6">{c.tag}</span>
 </Reveal>
 <Reveal delay={0.1}>
 <h2 className="font-display text-4xl font-bold leading-tight text-obsidian md:text-5xl lg:text-6xl">
 <RevealWords text={c.title} />
 </h2>
 </Reveal>
 {/* Image */}
 <Reveal delay={0.3}>
 <div className="mt-8 relative overflow-hidden rounded-3xl img-zoom h-72 shadow-2xl">
 <img
 src={aboutImage}
 alt="Guizima Group Services operations"
 loading="lazy" decoding="async"
 className="absolute inset-0 w-full h-full object-cover"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 to-transparent" />
 <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold">
 <Gem className="h-4 w-4 text-obsidian" />
 </div>
 <div className="text-ivory">
 <div className="text-[10px] uppercase tracking-wider opacity-80">Guizima Group Services</div>
 <div className="text-sm font-semibold">Conakry, Guinea</div>
 </div>
 </div>
 </div>
 </Reveal>
 </div>
 <div>
 <Reveal delay={0.2}>
 <p className="text-lg font-medium text-emerald-deep">{c.lead}</p>
 </Reveal>
 <div className="mt-6 space-y-4">
 {c.paragraphs.map((p, i) => (
 <Reveal key={i} delay={0.3 + i * 0.1}>
 <p className="text-base leading-relaxed text-graphite/80">{p}</p>
 </Reveal>
 ))}
 </div>
 {/* Quick highlights */}
 <Reveal delay={0.5}>
 <div className="mt-8 grid grid-cols-2 gap-3">
 {[
 "Commerce & approvisionnement",
 "Transport & logistique",
 "Construction & immobilier",
 "Agriculture & élevage",
 ].map((item, i) => (
 <div key={i} className="flex items-center gap-2 text-sm text-graphite">
 <CheckCircle2 className="h-4 w-4 text-emerald flex-shrink-0" />
 {item}
 </div>
 ))}
 </div>
 </Reveal>
 </div>
 </div>

 {/* Mission / Vision */}
 <div className="mt-24 grid gap-6 md:grid-cols-2 lg:gap-8">
 <Reveal>
 <div className="group relative overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-br from-cream to-white p-10 card-lift">
 <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
 <div className="relative">
 <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-copper shadow-lg">
 <Target className="h-6 w-6 text-obsidian" />
 </div>
 <h3 className="font-display text-2xl font-bold text-obsidian">{c.mission.title}</h3>
 <p className="mt-4 leading-relaxed text-graphite/80">{c.mission.text}</p>
 </div>
 </div>
 </Reveal>
 <Reveal delay={0.1}>
 <div className="group relative overflow-hidden rounded-3xl border border-emerald/20 bg-gradient-to-br from-emerald-deep to-emerald p-10 card-lift">
 <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-emerald-light/20 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
 <div className="relative">
 <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-light/30">
 <Eye className="h-6 w-6 text-ivory" />
 </div>
 <h3 className="font-display text-2xl font-bold text-ivory">{c.vision.title}</h3>
 <p className="mt-4 leading-relaxed text-ivory/90">{c.vision.text}</p>
 </div>
 </div>
 </Reveal>
 </div>

 {/* Values */}
 <div className="mt-24">
 <Reveal>
 <div className="mb-12 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
 <h3 className="font-display text-3xl font-bold text-obsidian md:text-4xl">
 {lang === "fr" ? "Nos Valeurs" : "Our Values"}
 </h3>
 <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent md:mb-3" />
 <span className="font-mono text-xs uppercase tracking-[0.3em] text-emerald">
 [ 04 pillars ]
 </span>
 </div>
 </Reveal>
 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
 {c.values.map((v, i) => {
 const Icon = valueIcons[i];
 return (
 <Reveal key={i} delay={i * 0.1}>
 <motion.div
 className="group relative h-full overflow-hidden rounded-2xl border border-gold/15 bg-white p-6 shadow-sm transition-all duration-500 hover:border-gold/40 hover:shadow-xl"
 >
 <div className="mb-6 flex items-center justify-between">
 <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold/15 to-emerald/15 ring-1 ring-gold/20">
 <Icon className="h-5 w-5 text-copper" />
 </div>
 <span className="font-mono text-xs text-emerald">
 0{i + 1}
 </span>
 </div>
 <h4 className="font-display text-lg font-bold text-obsidian">{v.title}</h4>
 <p className="mt-2 text-sm leading-relaxed text-graphite/70">{v.desc}</p>
 {/* Hover line */}
 <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-gold to-emerald transition-all duration-500 group-hover:w-full" />
 </motion.div>
 </Reveal>
 );
 })}
 </div>
 </div>
 </div>
 </section>
 );
}
