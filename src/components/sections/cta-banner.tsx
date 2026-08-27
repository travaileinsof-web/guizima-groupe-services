"use client";


import { ArrowUpRight, Phone } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { Reveal } from "@/components/site/reveal";
import { ctaBg } from "@/lib/images";
import { SectionBackdrop } from "@/components/site/section-backdrop";

export function CtaBanner() {
 const setSection = useSiteStore((s) => s.setSection);
 const lang = useSiteStore((s) => s.lang);

 return (
 <section className="relative overflow-hidden py-32">
 {/* Background image */}
 <img
 src={ctaBg}
 alt="Industrial construction"
 loading="lazy" decoding="async"
 className="absolute inset-0 w-full h-full object-cover"
 />
 {/* Gradient overlay */}
 <div className="absolute inset-0 bg-gradient-to-br from-obsidian/95 via-emerald-deep/85 to-obsidian/95" />
 <SectionBackdrop tone="red" className="opacity-70" />

 {/* Floating hexagons */}
 <div className="absolute left-10 top-10 hexagon h-16 w-16 border border-gold/30 animate-spin-cw gpu" />
 <div className="absolute bottom-10 right-10 hexagon h-24 w-24 border border-emerald-light/30 animate-spin-ccw gpu" />

 {/* Animated background blobs */}
 <div className="absolute left-1/4 top-1/2 h-96 w-96 rounded-full opacity-20 blur-2xl" style={{ background: "radial-gradient(circle, var(--gold), transparent 70%)" }} />

 <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
 <Reveal>
 <span className="badge-premium mb-6 mx-auto" style={{ background: "rgba(227,41,63,0.15)", borderColor: "rgba(227,41,63,0.4)", color: "#ff5364" }}>
 {lang === "fr" ? "Démarrons ensemble" : "Let's start together"}
 </span>
 </Reveal>
 <Reveal delay={0.1}>
 <h2 className="font-display text-4xl font-bold leading-tight text-ivory md:text-5xl lg:text-6xl">
 {lang === "fr" ? (
 <>
 Donnez à vos projets l'élan qu'ils méritent{" "}
 <span className="text-gradient-gold">avec Guizima</span>
 </>
 ) : (
 <>
 Give your projects the momentum they need{" "}
 <span className="text-gradient-gold">with Guizima</span>
 </>
 )}
 </h2>
 </Reveal>
 <Reveal delay={0.2}>
 <p className="mx-auto mt-6 max-w-2xl text-base text-ivory/80 md:text-lg">
 {lang === "fr"
 ? "Du besoin initial à la réalisation, notre équipe vous accompagne avec méthode, réactivité et engagement."
 : "From the first need to delivery, our team supports you with method, responsiveness and commitment."}
 </p>
 </Reveal>
 <Reveal delay={0.3}>
 <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
 <button
 onClick={() => setSection("contact")}
 data-cursor="hover"
 className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-copper px-7 py-3.5 text-sm font-medium text-obsidian transition-all hover:from-gold-bright hover:to-copper-light hover:shadow-[0_8px_30px_-8px_rgba(212,165,71,0.6)]"
 >
 {content[lang].common.requestQuote}
 <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
 </button>
 <a
 href="tel:+224624567272"
 data-cursor="hover"
 className="group inline-flex items-center gap-2 rounded-full border border-ivory/40 px-7 py-3.5 text-sm font-medium text-ivory transition-all hover:border-gold hover:bg-gold/10 hover:text-gold"
 >
 <Phone className="h-4 w-4" />
 +224 624 56 72 72
 </a>
 </div>
 </Reveal>
 </div>
 </section>
 );
}
