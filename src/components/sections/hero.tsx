"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo, useSyncExternalStore } from "react";
import { ArrowRight, ArrowDown, Play } from "lucide-react";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { AnimatedCounter } from "@/components/site/animated-counter";
import { RevealWords } from "@/components/site/reveal";
import { MagneticButton } from "@/components/site/magnetic-button";
import { heroImages } from "@/lib/images";
import { GuizimaOrbit } from "@/components/site/guizima-orbit";

/** Deterministic seeded random — same values on server & client */
function seededRandom(seed: number) {
 const x = Math.sin(seed * 9999) * 10000;
 return x - Math.floor(x);
}

// SSR-safe mounted detection (no setState in effect)
const emptySubscribe = () => () => {};
const getMounted = () => true;
const getServer = () => false;

/**
 * Hero — full-screen premium intro
 * Optimized: particles & blobs use CSS keyframes (GPU thread), only parallax uses Framer Motion
 */
export function Hero() {
 const ref = useRef<HTMLDivElement>(null);
 const { scrollYProgress } = useScroll({
 target: ref,
 offset: ["start start", "end start"],
 });
 // Single scroll-linked transform (cheap, GPU-accelerated)
 const contentY = useTransform(scrollYProgress, [0, 1], [0, 150]);
 const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

 const setSection = useSiteStore((s) => s.setSection);
 const lang = useSiteStore((s) => s.lang);
 const c = content[lang].hero;

 const mounted = useSyncExternalStore(emptySubscribe, getMounted, getServer);

 // Reduced particle count (was 28, now 14) for performance
 const particles = useMemo(
 () =>
 Array.from({ length: 14 }, (_, i) => ({
 x: seededRandom(i + 1) * 100,
 y: seededRandom(i + 100) * 100,
 size: seededRandom(i + 200) * 3 + 1,
 duration: seededRandom(i + 300) * 8 + 6,
 delay: seededRandom(i + 400) * 5,
 })),
 []
 );

 return (
 <section
 ref={ref}
 className="relative min-h-screen w-full overflow-hidden bg-obsidian"
 >
 {/* Background image with CSS Ken Burns (GPU) */}
 <div className="absolute inset-0 overflow-hidden">
 <img
 src={heroImages.primary}
	alt="Guizima Group Services industrial operation"
 className="absolute inset-0 w-full h-full object-cover animate-ken-burns gpu"
 />
 </div>

 {/* Gradient overlays (static, no animation) */}
 <div className="absolute inset-0 bg-gradient-to-b from-obsidian/70 via-obsidian/60 to-obsidian" />
 <div className="absolute inset-0 bg-gradient-to-r from-obsidian/80 via-transparent to-obsidian/40" />
 <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212, 165, 71, 0.18), transparent 70%)" }} />

 {/* CSS-animated gradient blobs (replaced Framer Motion) */}
 <div
 className="absolute -left-32 top-1/4 h-96 w-96 rounded-full opacity-25 blur-3xl animate-blob-1 gpu"
 style={{ background: "radial-gradient(circle, var(--gold), transparent 70%)" }}
 />
 <div
 className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full opacity-20 blur-3xl animate-blob-2 gpu"
 style={{ background: "radial-gradient(circle, var(--emerald), transparent 70%)" }}
 />

 {/* Particle field — pure CSS animation, only on client */}
 <div className="absolute inset-0 overflow-hidden">
 {mounted && particles.map((p, i) => (
 <div
 key={i}
 className="absolute rounded-full bg-gold animate-particle gpu"
 style={{
 left: `${p.x}%`,
 top: `${p.y}%`,
 width: p.size,
 height: p.size,
 "--p-duration": `${p.duration}s`,
 "--p-delay": `${p.delay}s`,
 } as React.CSSProperties}
 />
 ))}
 </div>

 {/* Vertical side rails */}
 <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 lg:block">
 <div className="flex flex-col items-center gap-4">
 <div className="h-20 w-px bg-gradient-to-b from-transparent to-gold/40" />
 <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-ivory/70 [writing-mode:vertical-rl]">
 Est. 2024 — Guinea
 </span>
 <div className="h-20 w-px bg-gradient-to-t from-transparent to-gold/40" />
 </div>
 </div>
 <GuizimaOrbit />
 <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 lg:block">
 <div className="flex flex-col items-center gap-4">
 <div className="h-20 w-px bg-gradient-to-b from-transparent to-emerald/40" />
 <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-ivory/70 [writing-mode:vertical-rl]">
 PRD-35BF1B52BE0E
 </span>
 <div className="h-20 w-px bg-gradient-to-t from-transparent to-emerald/40" />
 </div>
 </div>

 {/* Main content — single parallax transform */}
 <motion.div
 style={{ y: contentY, opacity: contentOpacity }}
 className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] flex-col items-center justify-center px-6 py-32 text-center lg:px-10"
 >
 {/* Badge */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, delay: 0.4 }}
 className="badge-premium mb-8"
 >
 <span className="relative flex h-2 w-2">
 <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
 <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
 </span>
 {c.badge}
 </motion.div>

 {/* Headline */}
 <h1 className="font-display text-[clamp(2.5rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight text-ivory">
 <span className="block overflow-hidden">
 <RevealWords text={c.title1} delay={0.6} />
 </span>
 <span className="block overflow-hidden">
 <motion.span
 className="block text-gradient-gold"
 initial={{ y: "100%" }}
 animate={{ y: "0%" }}
 transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
 >
 {c.title2}
 </motion.span>
 </span>
 <span className="block overflow-hidden">
 <RevealWords text={c.title3} delay={1.2} />
 </span>
 </h1>

 {/* Subtitle */}
 <motion.p
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, delay: 1.6 }}
 className="mt-8 max-w-2xl text-base text-ivory/80 md:text-lg"
 >
 {c.subtitle}
 </motion.p>

 {/* CTAs */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, delay: 1.8 }}
 className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
 >
 <MagneticButton variant="primary" onClick={() => setSection("services")}>
 {c.primaryCta}
 <ArrowRight className="h-4 w-4" />
 </MagneticButton>
 <MagneticButton variant="outline" onClick={() => setSection("projects")}>
 <Play className="h-3.5 w-3.5" />
 {c.secondaryCta}
 </MagneticButton>
 </motion.div>

 {/* Stats */}
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, delay: 2.2 }}
 className="mt-20 grid w-full max-w-4xl grid-cols-2 gap-8 border-t border-gold/20 pt-12 md:grid-cols-4"
 >
 {c.stats.map((stat, i) => (
 <div key={i} className="text-center">
 <div className="font-display text-4xl font-bold text-ivory md:text-5xl stat-glow">
 <AnimatedCounter to={stat.value} suffix={stat.suffix} />
 </div>
 <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-ivory/60">
 {stat.label}
 </div>
 </div>
 ))}
 </motion.div>
 </motion.div>

 {/* Scroll indicator — CSS animation */}
 <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
 <div className="flex flex-col items-center gap-2 text-ivory/60 animate-float">
 <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
 <ArrowDown className="h-3 w-3" />
 </div>
 </div>
 </section>
 );
}
