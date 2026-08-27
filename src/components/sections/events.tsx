"use client";

import { Calendar, MapPin, ArrowUpRight, Loader2 } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { Reveal, RevealWords } from "@/components/site/reveal";
import { useFetch } from "@/hooks/use-fetch";
import { EventModal, ApiEvent } from "@/components/site/event-modal";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionBackdrop } from "@/components/site/section-backdrop";
import { eventImages } from "@/lib/images";

// ApiEvent is now imported from event-modal.tsx

const typeColors: Record<string, string> = {
  "Sommet": "bg-gold/20 text-gold border-gold/40",
  "Summit": "bg-gold/20 text-gold border-gold/40",
  "Formation": "bg-emerald-500/20 text-emerald-light border-emerald/40",
  "Training": "bg-emerald-500/20 text-emerald-light border-emerald/40",
  "Conférence": "bg-copper/20 text-copper-light border-copper/40",
  "Conference": "bg-copper/20 text-copper-light border-copper/40",
  "Workshop": "bg-cyan-500/20 text-cyan-300 border-cyan/40",
};

export function Events() {
  const lang = useSiteStore((s) => s.lang);
  const c = content[lang].events;
  const { data: items, loading } = useFetch<ApiEvent[]>("/api/events");
  const [selectedEvent, setSelectedEvent] = useState<ApiEvent | null>(null);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  return (
    <section id="events" className="relative bg-cream py-32 overflow-hidden">
      <SectionBackdrop image={eventImages[2]} tone="red" />
      <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full opacity-15 blur-2xl animate-blob-2 gpu"
        style={{ background: "radial-gradient(circle, var(--emerald), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="mb-16 flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <Reveal><span className="badge-premium mb-6">{c.tag}</span></Reveal>
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

        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-copper" />
          </div>
        )}

        {!loading && (
          <div className="relative">
            <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent md:-translate-x-1/2" />
            <div className="space-y-8">
              {(items || []).map((event, i) => {
                const name = lang === "fr" ? event.name : (event.nameEn || event.name);
                const desc = lang === "fr" ? event.description : (event.descriptionEn || event.description);
                return (
                  <Reveal key={event.id} delay={i * 0.1}>
                    <div className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                      <div className="absolute left-[8px] md:left-1/2 top-6 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center md:-translate-x-1/2">
                        <span className="absolute h-4 w-4 rounded-full bg-gold/30 animate-ping" />
                        <span className="relative h-2.5 w-2.5 rounded-full bg-gradient-to-br from-gold to-copper" />
                      </div>
                      <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                        <div 
                          onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                          className="group overflow-hidden rounded-2xl border border-obsidian/10 bg-white shadow-sm card-lift cursor-pointer"
                        >
                          {event.image && (
                            <div className="relative h-32 overflow-hidden">
                              <img
                                src={event.image}
                                alt={name}
                                loading="lazy"
                                decoding="async"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent" />
                            </div>
                          )}
                          <div className="p-5">
                            <div className="mb-2 flex items-center gap-2">
                              <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${typeColors[event.type] ?? "bg-gold/20 text-gold border-gold/40"}`}>
                                {event.type}
                              </span>
                            </div>
                            <h3 className="font-display text-lg font-bold text-obsidian transition-colors group-hover:text-copper">
                              {name}
                            </h3>
                            {desc && (
                              <p className="mt-2 text-sm text-graphite/70 line-clamp-2">{desc}</p>
                            )}
                            <div className="mt-3 space-y-1.5 text-sm text-graphite/70">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-3.5 w-3.5 text-emerald" />
                                {event.date}
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-3.5 w-3.5 text-emerald" />
                                {event.location}
                              </div>
                            </div>
                            {event.registerUrl ? (
                              <div className="mt-3 flex items-center gap-2 text-sm text-copper">
                                <a
                                  href={event.registerUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="link-underline cursor-pointer flex items-center gap-1"
                                >
                                  {lang === "fr" ? "S'inscrire" : "Register"}
                                  <ArrowUpRight className="h-3.5 w-3.5" />
                                </a>
                              </div>
                            ) : (
                              <div className="mt-3 flex items-center gap-2 text-sm text-copper">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedEvent(event);
                                  }}
                                  className="link-underline cursor-pointer inline-flex items-center gap-1"
                                >
                                  {lang === "fr" ? "En savoir plus" : "Learn more"}
                                  <ArrowUpRight className="h-3.5 w-3.3" />
                                </button>
                              </div>
                            )}

                            <AnimatePresence>
                              {expandedEvent === event.id && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="mt-4 pt-4 border-t border-obsidian/10 text-sm leading-relaxed text-graphite/80 whitespace-pre-wrap">
                                    {desc}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block md:w-1/2" />
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <EventModal 
        event={selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
      />
    </section>
  );
}
