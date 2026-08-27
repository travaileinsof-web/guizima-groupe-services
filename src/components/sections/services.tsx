"use client";


import { useState } from "react";
import {
 Compass,
 HardHat,
 Pickaxe,
 Leaf,
 Shield,
 Truck,
 GraduationCap,
 ClipboardCheck,
 ArrowUpRight,
} from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { Reveal, RevealWords } from "@/components/site/reveal";
import { serviceImages } from "@/lib/images";
import { ServiceModal, type ServiceItem } from "@/components/site/service-modal";
import { SectionBackdrop } from "@/components/site/section-backdrop";

const iconMap: Record<string, typeof Compass> = {
 compass: Compass,
 "hard-hat": HardHat,
 pickaxe: Pickaxe,
 leaf: Leaf,
 shield: Shield,
 truck: Truck,
 graduation: GraduationCap,
 clipboard: ClipboardCheck,
};

export function Services() {
 const setSection = useSiteStore((s) => s.setSection);
 const lang = useSiteStore((s) => s.lang);
 const c = content[lang].services;
 const serviceKeys = ["compass", "hard-hat", "pickaxe", "leaf", "shield", "truck", "graduation", "clipboard"];
 const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

 return (
 <>
 <ServiceModal 
   service={selectedService} 
   onClose={() => setSelectedService(null)} 
   onContact={() => {
     setSelectedService(null);
     setSection("contact");
   }} 
 />
 <section id="services" className="relative bg-coal py-32">
 <SectionBackdrop image={serviceImages.compass} tone="red" />
 <div className="absolute left-1/2 top-0 h-96 w-[800px] -translate-x-1/2 rounded-full bg-gold/5 blur-2xl" />

 <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
 {/* Header */}
 <div className="mb-20 flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
 <div className="max-w-3xl">
 <Reveal>
 <span className="badge-premium mb-6">{c.tag}</span>
 </Reveal>
 <Reveal delay={0.1}>
 <h2 className="font-display text-4xl font-bold leading-tight text-ivory md:text-5xl lg:text-6xl">
 <RevealWords text={c.title} />
 </h2>
 </Reveal>
 </div>
 <Reveal delay={0.2}>
 <p className="max-w-md text-base text-ivory/70">{c.subtitle}</p>
 </Reveal>
 </div>

 {/* Services grid — with images on hover */}
 <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
 {c.items.map((s, i) => {
 const Icon = iconMap[s.icon] ?? Compass;
 const img = serviceImages[serviceKeys[i]] ?? serviceImages.compass;
 return (
 <Reveal key={i} delay={(i % 4) * 0.08}>
 <button
 onClick={() => setSelectedService({
   title: s.title,
   desc: s.desc,
   icon: s.icon,
   image: img,
   IconComponent: Icon,
   features: s.features
 })}
 data-cursor="hover"
 className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-gold/15 bg-gradient-to-b from-graphite to-coal text-left transition-all duration-500 hover:border-gold/40"
 >
 {/* Image background that reveals on hover */}
 <div className="relative h-44 overflow-hidden">
 <img src={img} alt={s.title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
 <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/60 to-transparent" />
 {/* Number */}
 <div className="absolute left-4 top-4">
 <span className="font-mono text-xs text-gold">
 [ {String(i + 1).padStart(2, "0")} ]
 </span>
 </div>
 {/* Arrow */}
 <div className="absolute right-4 top-4 flex h-9 w-9 -translate-y-1 items-center justify-center rounded-full bg-gold text-obsidian opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
 <ArrowUpRight className="h-4 w-4" />
 </div>
 {/* Icon overlay */}
 <div className="absolute bottom-4 left-4">
 <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/30 bg-coal/80">
 <Icon className="h-5 w-5 text-gold" />
 </div>
 </div>
 </div>

 {/* Content */}
 <div className="flex flex-1 flex-col p-6">
 <h3 className="font-display text-lg font-bold text-ivory transition-colors group-hover:text-gold">
 {s.title}
 </h3>
 <p className="mt-2 text-sm leading-relaxed text-ivory/60 line-clamp-3">
 {s.desc}
 </p>
 </div>

 {/* Bottom indicator */}
 <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-gold to-emerald transition-all duration-500 group-hover:w-full" />
 </button>
 </Reveal>
 );
 })}
 </div>
 </div>
 </section>
 </>
 );
}
