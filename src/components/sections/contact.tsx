"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Loader2, Linkedin, Facebook, Twitter, Instagram, Youtube, Link as LinkIcon } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { Reveal, RevealWords } from "@/components/site/reveal";
import { toast } from "sonner";
import { useFetch } from "@/hooks/use-fetch";

interface ContactInfo {
  id: string;
  address: string;
  phones: string[];
  emails: string[];
  socials: { platform: string; url: string }[];
  hours: string;
  hoursEn: string | null;
  mapUrl: string | null;
}

export function Contact() {
  const lang = useSiteStore((s) => s.lang);
  const c = content[lang].contact;
  const { data: info } = useFetch<ContactInfo>("/api/contact-info");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          ...form,
        }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      toast.success(c.form.success);
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
      }, 4000);
    } catch {
      toast.error(lang === "fr" ? "Erreur d'envoi" : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  const address = info?.address || c.info.address;
  const phones = info?.phones?.length ? info.phones : [c.info.phone];
  const emails = info?.emails?.length ? info.emails : [c.info.email];
  const hours = info ? (lang === "fr" ? info.hours : (info.hoursEn || info.hours)) : c.info.hours;
  const mapUrl = info?.mapUrl || "https://www.google.com/maps?q=Matoto+Centre+Conakry+Guinea&output=embed";

  const infoItems = [
    { icon: MapPin, label: lang === "fr" ? "Adresse" : "Address", value: address },
    { icon: Phone, label: lang === "fr" ? (phones.length > 1 ? "Téléphones" : "Téléphone") : (phones.length > 1 ? "Phones" : "Phone"), value: phones.join("\n") },
    { icon: Mail, label: emails.length > 1 ? "Emails" : "Email", value: emails.join("\n") },
    { icon: Clock, label: lang === "fr" ? "Horaires" : "Hours", value: hours },
  ];

  const socials = info?.socials?.filter((s) => s?.url) ?? [];

  const getSocialIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes("linkedin")) return <Linkedin className="h-4 w-4" />;
    if (p.includes("facebook")) return <Facebook className="h-4 w-4" />;
    if (p.includes("twitter") || p.includes("x")) return <Twitter className="h-4 w-4" />;
    if (p.includes("instagram")) return <Instagram className="h-4 w-4" />;
    if (p.includes("youtube")) return <Youtube className="h-4 w-4" />;
    return <LinkIcon className="h-4 w-4" />;
  };

  return (
    <section id="contact" className="relative bg-ivory py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern-dark opacity-40" />
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full opacity-15 blur-2xl animate-blob-2 gpu" style={{ background: "radial-gradient(circle, var(--emerald), transparent 70%)" }} />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="mb-16 text-center">
          <Reveal>
            <span className="badge-premium mb-6 mx-auto">{c.tag}</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl font-bold text-obsidian md:text-5xl lg:text-6xl">
              <RevealWords text={c.title} />
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-base text-graphite/70 md:text-lg">{c.subtitle}</p>
          </Reveal>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="flex h-full flex-col gap-4">
              {infoItems.map((item, i) => (
                <div
                  key={i}
                  className="group flex items-start gap-4 rounded-2xl border border-obsidian/10 bg-white p-5 shadow-sm transition-colors hover:border-gold/30 hover-lift-xs"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold/15 to-emerald/15 ring-1 ring-gold/20">
                    <item.icon className="h-5 w-5 text-copper" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-emerald">{item.label}</div>
                    <p className="mt-1 whitespace-pre-line text-sm font-medium text-obsidian">{item.value}</p>
                  </div>
                </div>
              ))}

              {/* Real Google Maps embed */}
              <div className="relative mt-2 h-72 overflow-hidden rounded-2xl border border-obsidian/10 shadow-sm">
                <iframe
                  src={mapUrl}
                  title="Guizima Group Services — Conakry"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              {/* Social links */}
              {socials.length > 0 && (
                <div className="flex items-center gap-3 rounded-2xl border border-obsidian/10 bg-white p-5 shadow-sm">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-emerald">
                    {lang === "fr" ? "Suivez-nous" : "Follow us"}
                  </span>
                  <div className="flex gap-2">
                    {socials.map((social, i) => (
                      <a
                        key={i}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={social.platform}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-graphite/10 text-graphite hover:bg-gold hover:text-obsidian transition-colors"
                      >
                        {getSocialIcon(social.platform)}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <form
              onSubmit={handleSubmit}
              className="relative overflow-hidden rounded-3xl border border-obsidian/10 bg-white p-8 shadow-xl md:p-10"
            >
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold/10 blur-2xl" />
              <div className="relative grid gap-5 sm:grid-cols-2">
                <Field
                  label={c.form.name}
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  required
                />
                <Field
                  label={c.form.email}
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  required
                />
                <Field
                  label={c.form.phone}
                  value={form.phone}
                  onChange={(v) => setForm({ ...form, phone: v })}
                />
                <Field
                  label={c.form.company}
                  value={form.company}
                  onChange={(v) => setForm({ ...form, company: v })}
                />
                <div className="sm:col-span-2">
                  <Field
                    label={c.form.subject}
                    value={form.subject}
                    onChange={(v) => setForm({ ...form, subject: v })}
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-emerald">
                    {c.form.message}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full resize-none rounded-xl border border-obsidian/15 bg-cream px-4 py-3 text-sm text-obsidian placeholder:text-graphite/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors"
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={submitting || submitted}
                    data-cursor="hover"
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold to-copper px-6 py-3.5 text-sm font-medium text-obsidian transition-all hover:from-gold-bright hover:to-copper-light disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {lang === "fr" ? "Envoi..." : "Sending..."}
                      </>
                    ) : submitted ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        {lang === "fr" ? "Message envoyé !" : "Message sent!"}
                      </>
                    ) : (
                      <>
                        {c.form.submit}
                        <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-emerald">
        {label}
        {required && <span className="text-copper"> *</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-obsidian/15 bg-cream px-4 py-3 text-sm text-obsidian placeholder:text-graphite/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors"
      />
    </div>
  );
}
