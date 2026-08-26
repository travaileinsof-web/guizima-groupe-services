"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { Reveal } from "@/components/site/reveal";
import { testimonialBg } from "@/lib/images";

export function Testimonials() {
 const lang = useSiteStore((s) => s.lang);
 const c = content[lang].testimonials;
 const [active, setActive] = useState(0);

 const next = () => setActive((a) => (a + 1) % c.items.length);
 const prev = () => setActive((a) => (a - 1 + c.items.length) % c.items.length);

 return (
 <section className="relative overflow-hidden bg-emerald-deep py-32">
 {/* Background image with overlay */}
 <img
 src={testimonialBg}
 alt="Guizima Group Services operations"
 loading="lazy" decoding="async"
 className="absolute inset-0 w-full h-full object-cover opacity-15"
 />
 <div className="absolute inset-0 bg-gradient-to-br from-emerald-deep via-emerald-deep/95 to-emerald/85" />

 {/* Floating blobs */}
 <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full opacity-20 blur-2xl" style={{ background: "radial-gradient(circle, var(--gold), transparent 70%)" }} />
 <div className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full opacity-15 blur-2xl" style={{ background: "radial-gradient(circle, var(--emerald-light), transparent 70%)" }} />

 <div className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
 {/* Header */}
 <Reveal>
 <div className="mb-16 text-center">
 <span
 className="badge-premium mb-6 mx-auto"
 style={{ background: "rgba(227,41,63,0.15)", borderColor: "rgba(227,41,63,0.4)", color: "#ff5364" }}
 >
 {c.tag}
 </span>
 <h2 className="font-display text-4xl font-bold text-ivory md:text-5xl lg:text-6xl">
 {c.title}
 </h2>
 </div>
 </Reveal>

 {/* Carousel */}
 <Reveal delay={0.2}>
 <div className="relative">
 <AnimatePresence mode="wait">
 <motion.div
 key={active}
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -30 }}
 transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
 className="relative overflow-hidden rounded-3xl border border-gold/30 bg-emerald-deep/90 p-10 md:p-16"
 >
 {/* Big quote icon */}
 <Quote className="absolute right-10 top-10 h-20 w-20 text-gold/15" />

 {/* Stars */}
 <div className="mb-8 flex gap-1">
 {[...Array(5)].map((_, i) => (
 <Star key={i} className="h-4 w-4 fill-gold text-gold" />
 ))}
 </div>

 {/* Quote */}
 <blockquote className="relative font-display text-2xl font-medium leading-relaxed text-ivory md:text-3xl lg:text-4xl">
 "{c.items[active].quote}"
 </blockquote>

 {/* Author */}
 <div className="mt-10 flex items-center gap-4">
 <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold to-copper">
 <span className="font-display text-xl font-bold text-obsidian">
 {c.items[active].author.charAt(0)}
 </span>
 </div>
 <div>
 <div className="font-semibold text-ivory">{c.items[active].author}</div>
 <div className="text-sm text-ivory/70">{c.items[active].company}</div>
 </div>
 </div>
 </motion.div>
 </AnimatePresence>

 {/* Controls */}
 <div className="mt-8 flex items-center justify-between">
 <div className="flex gap-2">
 {c.items.map((_, i) => (
 <button
 key={i}
 onClick={() => setActive(i)}
 data-cursor="hover"
 className={`h-1.5 rounded-full transition-all duration-500 ${
 i === active ? "w-12 bg-gold" : "w-6 bg-ivory/30 hover:bg-gold/40"
 }`}
 aria-label={`Slide ${i + 1}`}
 />
 ))}
 </div>
 <div className="flex gap-2">
 <button
 onClick={prev}
 data-cursor="hover"
 className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-all hover:border-gold hover:bg-gold hover:text-obsidian"
 aria-label="Previous"
 >
 <ChevronLeft className="h-4 w-4" />
 </button>
 <button
 onClick={next}
 data-cursor="hover"
 className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-all hover:border-gold hover:bg-gold hover:text-obsidian"
 aria-label="Next"
 >
 <ChevronRight className="h-4 w-4" />
 </button>
 </div>
 </div>
 </div>
 </Reveal>
 </div>
 </section>
 );
}
