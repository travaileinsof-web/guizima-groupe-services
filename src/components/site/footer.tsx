"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Send, Phone, Mail, MapPin, ArrowUp, Linkedin, Facebook, Twitter, Instagram, Youtube, Link as LinkIcon, Loader2 } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content, type Section } from "@/lib/content";
import { toast } from "sonner";
import { Logo } from "@/components/site/logo";
import { useFetch } from "@/hooks/use-fetch";

interface ContactInfo {
  address: string;
  phones: string[];
  emails: string[];
  socials: { platform: string; url: string }[];
}

const getSocialIcon = (platform: string) => {
  const p = platform.toLowerCase();
  if (p.includes("linkedin")) return <Linkedin className="h-4 w-4" />;
  if (p.includes("facebook")) return <Facebook className="h-4 w-4" />;
  if (p.includes("twitter") || p.includes("x")) return <Twitter className="h-4 w-4" />;
  if (p.includes("instagram")) return <Instagram className="h-4 w-4" />;
  if (p.includes("youtube")) return <Youtube className="h-4 w-4" />;
  return <LinkIcon className="h-4 w-4" />;
};

export function Footer() {
  const lang = useSiteStore((s) => s.lang);
  const setSection = useSiteStore((s) => s.setSection);
  const c = content[lang].footer;
  const { data: info } = useFetch<ContactInfo>("/api/contact-info");
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") || "").trim();
    if (!email) return;

    setSubscribing(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, lang }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "failed");
      }
      toast.success(lang === "fr" ? "Inscription confirmée !" : "Subscription confirmed!");
      form.reset();
    } catch {
      toast.error(lang === "fr" ? "Erreur, réessayez." : "Error, please try again.");
    } finally {
      setSubscribing(false);
    }
  };

  const go = (s: Section) => {
    setSection(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const visibleSections = useSiteStore((s) => s.visibleSections);

  const isVisible = (id?: Section) => {
    if (!id) return true;
    if (["home", "about", "services", "contact"].includes(id)) return true;
    return visibleSections[id] !== false;
  };

  const columns: { title: string; links: { label: string; section?: Section }[] }[] = [
    {
      title: c.columns.company,
      links: [
        { label: content[lang].nav.about, section: "about" as Section },
        { label: content[lang].nav.team, section: "team" as Section },
        { label: content[lang].nav.careers, section: "careers" as Section },
        { label: content[lang].nav.contact, section: "contact" as Section },
      ].filter(l => isVisible(l.section)),
    },
    {
      title: c.columns.services,
      links: [
        { label: content[lang].nav.services, section: "services" as Section },
        { label: content[lang].nav.projects, section: "projects" as Section },
        { label: content[lang].nav.blog, section: "blog" as Section },
        { label: content[lang].nav.events, section: "events" as Section },
      ].filter(l => isVisible(l.section)),
    },
    {
      title: c.columns.shop,
      links: [
        { label: content[lang].nav.products, section: "products" as Section },
        { label: content[lang].nav.donations, section: "donations" as Section },
      ].filter(l => isVisible(l.section)),
    },
    {
      title: c.columns.resources,
      links: [
        { label: content[lang].nav.faq, section: "faq" as Section },
        { label: c.legal[0] },
        { label: c.legal[1] },
        { label: c.legal[2] },
      ].filter(l => isVisible(l.section)),
    },
  ];

  return (
    <footer id="footer" className="relative bg-obsidian pt-20">
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Top section */}
        <div className="grid gap-12 pb-16 lg:grid-cols-[1.5fr_2fr_1fr]">
          {/* Brand */}
          <div>
            <button onClick={() => go("home")} className="group flex items-center transition-transform hover:scale-105" aria-label="Guizima Group Services — Accueil">
              <Logo size={40} />
            </button>
            <p className="mt-2 font-display text-sm font-medium text-gold">{c.tagline}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">{c.description}</p>

            {/* Contact info */}
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex flex-col gap-2">
                {(info?.phones?.length ? info.phones : ["+224 624 56 72 72"]).map((phone, i) => (
                  <a key={i} href={`tel:${phone.replace(/\s+/g, '').replace(/\+/g, '')}`} className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors" data-cursor="hover">
                    <Phone className="h-3.5 w-3.5" />
                    {phone}
                  </a>
                ))}
              </div>
              
              <div className="flex flex-col gap-2">
                {(info?.emails?.length ? info.emails : ["contact@guizimagroup.com"]).map((email, i) => (
                  <a key={i} href={`mailto:${email}`} className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors" data-cursor="hover">
                    <Mail className="h-3.5 w-3.5" />
                    {email}
                  </a>
                ))}
              </div>

              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                <span>{info?.address || "Matoto Centre, Conakry — Guinea"}</span>
              </div>

              {info?.socials && info.socials.length > 0 && (
                <div className="flex gap-3 pt-3">
                  {info.socials.map((social, i) => (
                    <a 
                      key={i} 
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-graphite/20 text-muted-foreground hover:bg-gold/20 hover:text-gold transition-colors"
                      data-cursor="hover"
                      title={social.platform}
                    >
                      {getSocialIcon(social.platform)}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col, i) => (
              <div key={i}>
                <h4 className="mb-4 text-[10px] uppercase tracking-[0.2em] text-gold">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <button
                        onClick={() => link.section && go(link.section)}
                        data-cursor="hover"
                        className="text-sm text-muted-foreground transition-colors hover:text-ivory gold-underline"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-2 font-display text-lg font-bold text-ivory">{c.newsletter.title}</h4>
            <p className="mb-4 text-sm text-muted-foreground">{c.newsletter.text}</p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="flex items-center gap-2 rounded-full border border-border bg-coal p-1.5 pl-4 focus-within:border-gold/40 transition-colors">
                <input
                  type="email"
                  name="email"
                  required
                  disabled={subscribing}
                  placeholder={c.newsletter.placeholder}
                  className="flex-1 bg-transparent text-sm text-ivory placeholder:text-muted-foreground/50 focus:outline-none disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={subscribing}
                  data-cursor="hover"
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-gold to-copper text-obsidian transition-all hover:from-gold-bright hover:to-copper-light disabled:opacity-60"
                  aria-label={c.newsletter.cta}
                >
                  {subscribing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                </button>
              </div>
            </form>

            {/* Back to top */}
            <button
              onClick={scrollTop}
              data-cursor="hover"
              className="mt-6 group flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-gold transition-colors"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border group-hover:border-gold/40 transition-colors">
                <ArrowUp className="h-3 w-3" />
              </span>
              {lang === "fr" ? "Haut de page" : "Back to top"}
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} GUIZIMA GROUP SERVICES. {c.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {c.legal.map((l, i) => (
              <button
                key={i}
                data-cursor="hover"
                className="text-xs text-muted-foreground hover:text-gold transition-colors"
              >
                {l}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>RCCM : GN.TCC.2026.B.10124</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Designed by</span>
            <span className="font-display font-bold text-gold">EINSOF DIGIT</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
