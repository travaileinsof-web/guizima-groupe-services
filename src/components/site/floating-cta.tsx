"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteStore } from "@/lib/store";
import { content } from "@/lib/content";
import { MessageSquarePlus } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingCta() {
  const [isVisible, setIsVisible] = useState(false);
  const lang = useSiteStore((s) => s.lang);
  const setSection = useSiteStore((s) => s.setSection);
  const section = useSiteStore((s) => s.section);
  const c = content[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      // Show after 10px of scroll
      const scrolled = window.scrollY > 10;

      // Hide if on contact page
      const isContactPage = section === "contact";

      // Hide if footer is reached
      const footerElement = document.getElementById("footer");
      let atBottom = false;

      if (footerElement) {
        const footerRect = footerElement.getBoundingClientRect();
        // If the top of the footer is visible in the viewport
        atBottom = footerRect.top <= window.innerHeight;
      } else {
        // Fallback calculation
        const scrollPosition = window.scrollY + window.innerHeight;
        const bottomPosition = document.documentElement.scrollHeight - 150;
        atBottom = scrollPosition >= bottomPosition;
      }

      setIsVisible(scrolled && !atBottom && !isContactPage);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [section]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          onClick={() => {
            setSection("contact");
          }}
          className={cn(
            "hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-[90]",
            "flex-col items-center justify-center",
            "bg-gradient-to-t from-gold to-copper text-obsidian",
            "p-2 py-4 rounded-l-lg cursor-pointer group",
            "shadow-[0_0_20px_rgba(212,165,71,0.3)] hover:shadow-[0_0_30px_rgba(212,165,71,0.6)] transition-all",
            "hover:pr-3"
          )}
          aria-label="Demander un devis"
        >
          <MessageSquarePlus className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          <span 
            className="font-bold text-[11px] tracking-widest uppercase mt-3"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            {c.cta}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
