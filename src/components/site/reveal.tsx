"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

interface RevealProps {
 children: React.ReactNode;
 delay?: number;
 y?: number;
 className?: string;
 once?: boolean;
}

/**
 * Generic scroll reveal wrapper — fade up + translate
 */
export function Reveal({ children, delay = 0, y = 30, className = "", once = true }: RevealProps) {
 const ref = useRef<HTMLDivElement>(null);
 const inView = useInView(ref, { once, margin: "-80px" });

 return (
 <motion.div
 ref={ref}
 initial={{ opacity: 0, y }}
 animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
 transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
 className={className}
 >
 {children}
 </motion.div>
 );
}

/**
 * Reveal text word by word — for headings
 */
export function RevealWords({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const words = text.split(" ");

  return (
    /* key={text} force React à démonter/remonter le composant dès que le texte change */
    <span key={text} ref={ref} className={className}>
      {words.map((word, i) => (
        /* Clé unique basée sur le mot et l'index */
        <span key={`${word}-${i}`} className="reveal-mask">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={inView ? { y: "0%" } : { y: "100%" }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
