"use client";

import { useState } from "react";
import { Linkedin, Twitter, Mail, ArrowUpRight, Loader2 } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { Reveal, RevealWords } from "@/components/site/reveal";
import { useFetch } from "@/hooks/use-fetch";

interface ApiTeamMember {
  id: string;
  name: string;
  nameEn: string | null;
  role: string;
  roleEn: string | null;
  expertise: string;
  expertiseEn: string | null;
  bio: string | null;
  bioEn: string | null;
  photo: string | null;
  linkedin: string | null;
  twitter: string | null;
  email: string | null;
}

export function Team() {
  const lang = useSiteStore((s) => s.lang);
  const c = content[lang].team;
  const { data: items, loading } = useFetch<ApiTeamMember[]>("/api/team");
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="team" className="relative bg-ivory py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern-dark opacity-40" />
      <div className="absolute top-32 right-10 h-72 w-72 rounded-full opacity-10 blur-2xl animate-blob-2 gpu"
        style={{ background: "radial-gradient(circle, var(--gold), transparent 70%)" }}
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
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(items || []).map((m, i) => {
              const role = lang === "fr" ? m.role : (m.roleEn || m.role);
              const expertise = lang === "fr" ? m.expertise : (m.expertiseEn || m.expertise);
              const bio = lang === "fr" ? m.bio : (m.bioEn || m.bio);
              const name = lang === "fr" ? m.name : (m.nameEn || m.name);
              return (
                <Reveal key={m.id} delay={(i % 3) * 0.08}>
                  <article className="group relative overflow-hidden rounded-2xl border border-obsidian/10 bg-white shadow-sm card-lift">
                    <div className="relative h-80 overflow-hidden">
                      {m.photo ? (
                        <img
                          src={m.photo}
                          alt={m.name}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-graphite to-coal flex items-center justify-center">
                          <span className="font-display text-8xl font-bold text-ivory/20">
                            {m.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
                      <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-all duration-500 group-hover:opacity-100">
                        {m.linkedin && (
                          <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory/90 text-obsidian hover:bg-gold transition-colors">
                            <Linkedin className="h-4 w-4" />
                          </a>
                        )}
                        {m.twitter && (
                          <a href={m.twitter} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory/90 text-obsidian hover:bg-gold transition-colors">
                            <Twitter className="h-4 w-4" />
                          </a>
                        )}
                        {m.email && (
                          <a href={`mailto:${m.email}`} className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory/90 text-obsidian hover:bg-gold transition-colors">
                            <Mail className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-emerald font-medium">{role}</div>
                      <h3 className="mt-2 font-display text-xl font-bold text-obsidian">{name}</h3>
                      <p className="mt-2 text-xs text-graphite/70">{expertise}</p>
                      {bio && (
                        <p className={`mt-3 text-xs leading-relaxed text-graphite/70 ${expanded === m.id ? "" : "line-clamp-2"}`}>
                          {bio}
                        </p>
                      )}
                      {bio && bio.length > 100 && (
                        <button
                          onClick={() => setExpanded(expanded === m.id ? null : m.id)}
                          className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-copper hover:text-gold transition-colors"
                        >
                          {expanded === m.id
                            ? (lang === "fr" ? "Réduire" : "Show less")
                            : (lang === "fr" ? "Lire plus" : "Read more")}
                          <ArrowUpRight className={`h-3 w-3 transition-transform ${expanded === m.id ? "rotate-90" : ""}`} />
                        </button>
                      )}
                    </div>
                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-gold to-emerald transition-all duration-500 group-hover:w-full" />
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
