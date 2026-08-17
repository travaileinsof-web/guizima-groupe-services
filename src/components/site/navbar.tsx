"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, ArrowUpRight, Plus } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content, type Section } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/site/logo";

const SECTIONS: { id: Section; label: keyof ReturnType<typeof getNavLabels> }[] = [
  { id: "home", label: "home" },
  { id: "about", label: "about" },
  { id: "services", label: "services" },
  { id: "products", label: "products" },
  { id: "projects", label: "projects" },
  { id: "team", label: "team" },
  { id: "blog", label: "blog" },
  { id: "events", label: "events" },
  { id: "careers", label: "careers" },
  { id: "donations", label: "donations" },
  { id: "faq", label: "faq" },
  { id: "contact", label: "contact" },
];

function getNavLabels(lang: "fr" | "en") {
  return content[lang].nav;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const lang = useSiteStore((s) => s.lang);
  const section = useSiteStore((s) => s.section);
  const isMenuOpen = useSiteStore((s) => s.isMenuOpen);
  const setLang = useSiteStore((s) => s.setLang);
  const setSection = useSiteStore((s) => s.setSection);
  const setMenuOpen = useSiteStore((s) => s.setMenuOpen);
  const visibleSections = useSiteStore((s) => s.visibleSections);
  const c = content[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Empêche le scroll du body quand le drawer mobile est ouvert, pour que le
  // header (position: fixed) et le drawer restent stables à l'écran.
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleLang = () => setLang(lang === "fr" ? "en" : "fr");

  const go = (s: Section) => {
    setSection(s);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isVisible = (id: Section) => {
    if (["home", "about", "services", "contact"].includes(id)) return true;
    return visibleSections[id] !== false;
  };

  const visibleNavSections = SECTIONS.filter(s => isVisible(s.id));
  const mainNav = visibleNavSections.slice(0, 7);
  const moreNav = visibleNavSections.slice(7);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-all duration-500",
          scrolled || isMenuOpen
            ? "glass-strong py-2.5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] sm:py-3"
            : "py-3.5 bg-gradient-to-b from-black/80 via-black/40 to-transparent sm:py-5"
        )}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-10">
          {/* Logo */}
          <button
            onClick={() => go("home")}
            className="group flex origin-left scale-[0.78] items-center transition-transform hover:scale-[0.82] sm:scale-100 sm:hover:scale-105"
            data-cursor="hover"
            aria-label="IREX Mining — Home"
          >
            <Logo size={50} />
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {mainNav.map((s) => (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                data-cursor="hover"
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors duration-300 drop-shadow-md",
                  section === s.id
                    ? "text-gold"
                    : "text-ivory/70 hover:text-ivory"
                )}
              >
                {c.nav[s.label]}
                {section === s.id && (
                  <div className="absolute -bottom-0.5 left-1/2 h-px w-6 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold to-transparent" />
                )}
              </button>
            ))}
            {/* More menu */}
            {moreNav.length > 0 && (
              <div className="group relative">
                <button
                  data-cursor="hover"
                  className="px-4 py-2 text-sm font-medium text-ivory/70 hover:text-ivory transition-colors drop-shadow-md"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
                <div className="invisible absolute right-0 top-full pt-2 opacity-0 translate-y-2 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0">
                  <div className="glass-strong rounded-2xl p-2 min-w-[200px]">
                    {moreNav.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => go(s.id)}
                        className={cn(
                          "block w-full rounded-lg px-4 py-2 text-left text-sm transition-colors",
                          section === s.id
                            ? "bg-gold/10 text-gold"
                            : "text-ivory/70 hover:bg-white/5 hover:text-ivory"
                        )}
                      >
                        {c.nav[s.label]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              data-cursor="hover"
              className="group flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1.5 text-xs font-medium text-ivory/80 hover:border-gold/40 hover:text-gold transition-colors drop-shadow-md bg-black/20 sm:gap-2 sm:px-3"
            >
              <Globe className="h-3.5 w-3.5" />
              <span className="uppercase tracking-wider">{lang}</span>
              <span className="hidden text-muted-foreground sm:inline">/</span>
              <span className="hidden text-muted-foreground uppercase tracking-wider sm:inline">
                {lang === "fr" ? "EN" : "FR"}
              </span>
            </button>

            {/* CTA */}
            <button
              onClick={() => go("contact")}
              data-cursor="hover"
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-copper px-5 py-2 text-sm font-medium text-obsidian transition-all hover:from-gold-bright hover:to-copper-light hover:shadow-[0_8px_20px_-8px_rgba(212,165,71,0.6)]"
            >
              {c.nav.cta}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMenuOpen(!isMenuOpen)}
              data-cursor="hover"
              className="lg:hidden p-1.5 text-ivory drop-shadow-md sm:p-2"
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] lg:hidden"
          >
            <div className="absolute inset-0 bg-obsidian/95" onClick={() => setMenuOpen(false)} />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-coal p-6 pt-24 sm:w-[80%] sm:p-8"
            >
              <div className="flex flex-col gap-1">
                {visibleNavSections.map((s, i) => (
                  <motion.button
                    key={s.id}
                    onClick={() => go(s.id)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.04 }}
                    className={cn(
                      "flex items-center justify-between border-b border-border/50 py-3.5 text-left font-display text-xl transition-colors sm:py-4 sm:text-2xl",
                      section === s.id ? "text-gold" : "text-ivory hover:text-gold"
                    )}
                  >
                    {c.nav[s.label]}
                    <ArrowUpRight className="h-4 w-4 opacity-50" />
                  </motion.button>
                ))}
              </div>
              <button
                onClick={() => go("contact")}
                className="mt-8 w-full rounded-full bg-gradient-to-r from-gold to-copper px-5 py-3 text-sm font-medium text-obsidian"
              >
                {c.nav.cta}
              </button>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}