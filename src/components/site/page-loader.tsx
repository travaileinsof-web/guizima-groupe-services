"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteStore } from "@/lib/store";
import { Logo } from "@/components/site/logo";

/**
 * Premium page loader — animated Guizima logo + progress bar
 */
export function PageLoader() {
 const isLoaded = useSiteStore((s) => s.isLoaded);
 const setLoaded = useSiteStore((s) => s.setLoaded);
 const [progress, setProgress] = useState(0);

 useEffect(() => {
 const interval = setInterval(() => {
 setProgress((p) => {
 if (p >= 100) {
 clearInterval(interval);
 setTimeout(() => setLoaded(true), 400);
 return 100;
 }
 return Math.min(100, p + Math.random() * 18);
 });
 }, 120);
 return () => clearInterval(interval);
 }, [setLoaded]);

 return (
 <AnimatePresence>
 {!isLoaded && (
 <motion.div
 className="fixed inset-0 z-[10000] flex items-center justify-center bg-obsidian"
 exit={{ y: "-100%" }}
 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
 >
 {/* Background grid pattern */}
 <div className="absolute inset-0 grid-pattern opacity-30" />

 {/* Center content */}
 <div className="relative flex flex-col items-center gap-8">
 {/* Logo */}
 <motion.div
 initial={{ opacity: 0, scale: 0.8 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
 className="relative"
 >
 <div className="relative h-20 w-20">
 {/* Rotating gradient border */}
 <div className="absolute inset-0 hexagon animate-rotate-border" style={{ background: "conic-gradient(from 0deg, transparent, var(--gold), transparent 30%)" }} />
 <div className="absolute inset-[3px] hexagon bg-obsidian flex items-center justify-center">
 <Logo size={56} variant="mark" />
 </div>
 </div>
 </motion.div>

 {/* Brand name */}
 <motion.div
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, delay: 0.2 }}
 className="text-center"
 >
 <h1 className="font-display text-2xl font-bold tracking-[0.3em] text-ivory">GUIZIMA</h1>
 <p className="mt-2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
 GROUP SERVICES
 </p>
 </motion.div>

 {/* Progress bar */}
 <div className="relative h-px w-64 overflow-hidden bg-border">
 <motion.div
 className="absolute left-0 top-0 h-full bg-gradient-to-r from-gold to-copper"
 style={{ width: `${progress}%` }}
 transition={{ duration: 0.3 }}
 />
 </div>
 <div className="font-mono text-xs text-muted-foreground">
 {Math.round(progress)}%
 </div>
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 );
}
