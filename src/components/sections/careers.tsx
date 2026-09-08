"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, MapPin, Briefcase, Send, Sparkles, Loader2, Search, ChevronDown } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { Reveal } from "@/components/site/reveal";
import { useFetch } from "@/hooks/use-fetch";
import { images } from "@/lib/images";

// ==========================================
// Types
// ==========================================
interface ApiJobOpening {
  id: string;
  title: string;
  titleEn: string | null;
  description: string;
  descriptionEn: string | null;
  location: string;
  type: string;
  dept: string;
  createdAt?: string;
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export function Careers() {
  const lang = useSiteStore((s) => s.lang);
  const c = content[lang].careers;
  const { data: jobs, loading } = useFetch<ApiJobOpening[]>("/api/careers");
  const setSection = useSiteStore((s) => s.setSection);

  // Filter management
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const [filterLoc, setFilterLoc] = useState("");
  const [filterType, setFilterType] = useState("");

  const [filterOptions, setFilterOptions] = useState({ departments: [], locations: [], types: [] });

  // Fetch admin filters
  useEffect(() => {
    fetch("/api/settings/careers-filters")
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data.departments)) {
          setFilterOptions(data);
        }
      })
      .catch(err => console.error("Error fetching filters:", err));
  }, []);

  // Process filters
  const filteredJobs = useMemo(() => {
    if (!jobs) return [];
    return jobs.filter((job) => {
      const matchSearch = (job.title + " " + job.dept + " " + job.location).toLowerCase().includes(searchTerm.toLowerCase());
      const matchDept = filterDept ? job.dept === filterDept : true;
      const matchLoc = filterLoc ? job.location === filterLoc : true;
      const matchType = filterType ? job.type === filterType : true;
      return matchSearch && matchDept && matchLoc && matchType;
    });
  }, [jobs, searchTerm, filterDept, filterLoc, filterType]);

  // Derived filter options (merge admin defined filters with existing jobs data to prevent legacy data loss)
  const safeDepts = Array.isArray(filterOptions?.departments) ? filterOptions.departments : [];
  const safeLocs = Array.isArray(filterOptions?.locations) ? filterOptions.locations : [];
  const safeTypes = Array.isArray(filterOptions?.types) ? filterOptions.types : [];

  const depts = useMemo(() => Array.from(new Set([...safeDepts, ...(jobs?.map(j => j.dept) || [])])), [jobs, safeDepts]);
  const locs = useMemo(() => Array.from(new Set([...safeLocs, ...(jobs?.map(j => j.location) || [])])), [jobs, safeLocs]);
  const types = useMemo(() => Array.from(new Set([...safeTypes, ...(jobs?.map(j => j.type) || [])])), [jobs, safeTypes]);

  const resetFilters = () => {
    setSearchTerm("");
    setFilterDept("");
    setFilterLoc("");
    setFilterType("");
  };

  return (
    <div className="bg-obsidian text-ivory">
      
      {/* 01 — HERO */}
      <section className="relative min-h-[85vh] flex items-center pt-24 overflow-hidden">
        <img
          src={images.team[1]}
          alt="Guizima Corporate"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/90 via-obsidian/30 to-obsidian" />
        
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10 w-full z-10">
          <div className="max-w-4xl">
            <Reveal><span className="badge-premium mb-6" style={{ background: "rgba(212,165,71,0.15)", borderColor: "rgba(212,165,71,0.3)", color: "#d4a547" }}>{c.tag}</span></Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight">
                {lang === "fr" ? (
                  <>Construisez votre <span className="text-gradient-gold">avenir</span> avec Guizima.</>
                ) : (
                  <>Build your <span className="text-gradient-gold">future</span> with Guizima.</>
                )}
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 text-lg md:text-xl text-ivory/80 max-w-2xl leading-relaxed">
                {c.hero.subtitle}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  onClick={() => document.getElementById("job-search")?.scrollIntoView({ behavior: "smooth" })}
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-copper px-7 py-3.5 text-sm font-medium text-obsidian transition-all hover:from-gold-bright hover:to-copper-light"
                >
                  {c.hero.ctaMain} <ArrowUpRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => document.getElementById("culture")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-2 rounded-full border border-ivory/20 px-7 py-3.5 text-sm font-medium transition-colors hover:bg-ivory/5 hover:border-ivory/40"
                >
                  {c.hero.ctaSecondary}
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 02 — POURQUOI REJOINDRE GUIZIMA */}
      <section className="py-24 bg-coal">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Reveal><span className="text-gold font-medium uppercase tracking-wider text-sm mb-4 block">{c.intro.tag}</span></Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">{c.intro.title}</h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-ivory/70 leading-relaxed text-lg">{c.intro.text}</p>
              </Reveal>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {c.benefits.map((b, i) => (
                <Reveal key={i} delay={0.1 + i * 0.1}>
                  <div className="p-6 rounded-2xl bg-obsidian border border-border/50 hover:border-gold/30 transition-colors">
                    <div className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                      <Sparkles className="h-5 w-5 text-gold" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{b.title}</h3>
                    <p className="text-sm text-ivory/60">{b.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 03 — NOS MÉTIERS */}
      <section className="py-24 bg-obsidian">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal><h2 className="font-display text-3xl md:text-4xl font-bold mb-16 text-center">{c.departments.title}</h2></Reveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {c.departments.items.map((dept, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-8 rounded-2xl bg-coal border border-border hover:border-emerald/30 transition-all group">
                  <h3 className="font-bold text-xl mb-6 group-hover:text-gold transition-colors">{dept.title}</h3>
                  <ul className="space-y-3">
                    {dept.roles.map((role, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-ivory/70">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold/50" />
                        {role}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — OPPORTUNITÉS (JOB SEARCH) */}
      <section id="job-search" className="py-24 bg-coal relative">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-12">
            <Reveal><h2 className="font-display text-3xl md:text-5xl font-bold mb-4">{c.search.title}</h2></Reveal>
            <Reveal delay={0.1}><p className="text-ivory/70 text-lg">{c.search.subtitle}</p></Reveal>
          </div>

          {/* Filters Bar */}
          <Reveal delay={0.2}>
            <div className="bg-obsidian border border-border/50 rounded-2xl p-4 flex flex-col md:flex-row gap-4 mb-12">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-ivory/40" />
                <input
                  type="text"
                  placeholder={c.search.placeholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 text-ivory pl-12 h-12 placeholder:text-ivory/40"
                />
              </div>
              
              <div className="h-px w-full md:h-12 md:w-px bg-border" />
              
              <div className="flex gap-4 flex-wrap md:flex-nowrap">
                <select aria-label="Département" value={filterDept} onChange={e => setFilterDept(e.target.value)} className="bg-transparent text-sm font-medium text-ivory/80 focus:ring-0 border-none outline-none cursor-pointer">
                  <option value="">{c.search.allDepts}</option>
                  {depts.map(d => <option key={d} value={d} className="bg-obsidian">{d}</option>)}
                </select>
                
                <select aria-label="Localisation" value={filterLoc} onChange={e => setFilterLoc(e.target.value)} className="bg-transparent text-sm font-medium text-ivory/80 focus:ring-0 border-none outline-none cursor-pointer">
                  <option value="">{c.search.allLocs}</option>
                  {locs.map(l => <option key={l} value={l} className="bg-obsidian">{l}</option>)}
                </select>
                
                <select aria-label="Type de contrat" value={filterType} onChange={e => setFilterType(e.target.value)} className="bg-transparent text-sm font-medium text-ivory/80 focus:ring-0 border-none outline-none cursor-pointer">
                  <option value="">{c.search.allTypes}</option>
                  {types.map(t => <option key={t} value={t} className="bg-obsidian">{t}</option>)}
                </select>
              </div>
            </div>
          </Reveal>

          {/* Jobs List */}
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-gold" />
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredJobs.length === 0 ? (
                <div className="py-20 px-6 text-center bg-obsidian/40 rounded-3xl border border-border/50 backdrop-blur-sm">
                  <Briefcase className="h-10 w-10 text-ivory/20 mx-auto mb-4" />
                  <h3 className="font-display text-2xl font-bold text-ivory mb-2">
                    {jobs?.length === 0 ? c.search.empty : c.search.noResults}
                  </h3>
                  <p className="text-ivory/60 max-w-md mx-auto mb-8">
                    Nous n'avons actuellement aucun poste ouvert pour cette sélection. N'hésitez pas à nous envoyer une candidature spontanée ou à modifier vos filtres.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button onClick={resetFilters} className="rounded-full border border-ivory/20 px-6 py-2.5 text-sm font-medium hover:bg-white/5 transition-colors">
                      {c.search.reset}
                    </button>
                    <button onClick={() => setSection("contact")} className="rounded-full bg-gradient-to-r from-gold to-copper px-6 py-2.5 text-sm font-medium text-obsidian hover:from-gold-bright hover:to-copper-light transition-colors">
                      Candidature spontanée
                    </button>
                  </div>
                </div>
              ) : (
                filteredJobs.map((job, i) => {
                  const title = lang === "fr" ? job.title : (job.titleEn || job.title);
                  return (
                    <Reveal key={job.id} delay={i * 0.05}>
                      <a
                        href={`/careers/${job.id}`} 
                        className="group flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-2xl border border-border bg-obsidian p-6 transition-all hover:border-gold/40 hover:-translate-y-1 hover:shadow-[0_8px_30px_-8px_rgba(212,165,71,0.2)]"
                      >
                        <div className="flex items-center gap-6">
                          <div className="hidden sm:flex h-14 w-14 items-center justify-center rounded-xl bg-coal border border-border">
                            <Briefcase className="h-6 w-6 text-gold" />
                          </div>
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-light mb-1 block">
                              {job.dept}
                            </span>
                            <h3 className="font-display text-xl font-bold text-ivory transition-colors group-hover:text-gold">
                              {title}
                            </h3>
                            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-ivory/60">
                              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {job.location}</span>
                              <span className="flex items-center gap-1.5 bg-white/5 px-2 py-0.5 rounded-md text-ivory/80">{job.type}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto">
                          <span className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-5 py-2.5 text-sm font-medium text-gold transition-colors group-hover:bg-gold group-hover:text-obsidian">
                            {c.search.viewJob} <ArrowUpRight className="h-4 w-4" />
                          </span>
                        </div>
                      </a>
                    </Reveal>
                  );
                })
              )}
            </div>
          )}
        </div>
      </section>

      {/* 05 — CULTURE */}
      <section id="culture" className="py-24 bg-obsidian overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="text-center mb-16">
            <Reveal><h2 className="font-display text-3xl md:text-5xl font-bold">{c.culture.title}</h2></Reveal>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.culture.items.map((val, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-8 rounded-2xl bg-coal border-l-4 border-gold h-full">
                  <h3 className="font-bold text-xl mb-4">{val.title}</h3>
                  <p className="text-ivory/70 text-sm leading-relaxed">{val.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — PROCESSUS */}
      <section className="py-24 bg-coal">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal><h2 className="font-display text-3xl md:text-4xl font-bold mb-16 text-center">{c.process.title}</h2></Reveal>
          
          <div className="relative">
            {/* Desktop Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-border -translate-y-1/2" />
            
            <div className="grid md:grid-cols-5 gap-8">
              {c.process.items.map((step, i) => (
                <Reveal key={i} delay={i * 0.1} className="relative z-10">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-obsidian border border-gold flex items-center justify-center font-display font-bold text-gold mb-6 relative">
                      {step.step}
                    </div>
                    <h3 className="font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-ivory/60">{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 07 — CANDIDATURE SPONTANÉE */}
      <section id="spontaneous" className="py-12 bg-obsidian">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-emerald/30 bg-gradient-to-r from-emerald-deep via-emerald to-emerald-deep p-10 md:p-14 text-center flex flex-col items-center">
              <Sparkles className="h-10 w-10 text-gold-bright mb-6" />
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">{c.spontaneous.title}</h2>
              <p className="text-ivory/80 max-w-2xl mb-10 text-lg">{c.spontaneous.text}</p>
              <button
                onClick={() => setSection("contact")}
                className="inline-flex items-center gap-2 rounded-full bg-ivory px-8 py-4 text-sm font-bold text-obsidian transition-transform hover:scale-105 shadow-xl"
              >
                {c.spontaneous.cta} <Send className="h-4 w-4" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 08 — FAQ */}
      <section className="py-24 bg-coal">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <Reveal><h2 className="font-display text-3xl font-bold mb-10 text-center">{c.faq.title}</h2></Reveal>
          
          <div className="space-y-4">
            {c.faq.items.map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <details className="group rounded-2xl bg-obsidian border border-border p-6 cursor-pointer">
                  <summary className="flex items-center justify-between font-bold text-lg list-none">
                    {item.q}
                    <ChevronDown className="h-5 w-5 text-gold transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 text-ivory/70 leading-relaxed">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 09 — FINAL CTA */}
      <section className="py-32 bg-obsidian text-center border-t border-border">
        <Reveal>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 max-w-3xl mx-auto">
            {c.ctaFinal.title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-xl text-ivory/60 mb-12">{c.ctaFinal.subtitle}</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => document.getElementById("job-search")?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-full bg-gold px-8 py-4 text-sm font-bold text-obsidian hover:bg-gold-bright transition-colors"
            >
              {c.ctaFinal.btn1}
            </button>
            <button
              onClick={() => setSection("contact")}
              className="rounded-full border border-ivory/20 px-8 py-4 text-sm font-bold hover:bg-ivory/5 transition-colors"
            >
              {c.ctaFinal.btn2}
            </button>
          </div>
        </Reveal>
      </section>

    </div>
  );
}
