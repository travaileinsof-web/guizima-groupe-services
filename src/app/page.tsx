"use client";

import { useEffect, useState } from "react";
import { useSiteStore } from "@/lib/store";

// Premium UX components
import { CustomCursor } from "@/components/site/custom-cursor";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Chatbot } from "@/components/site/chatbot";
import { ProductInquiryModal, type ApiProduct } from "@/components/site/product-inquiry-modal";

// Sections
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Products } from "@/components/sections/products";
import { Projects } from "@/components/sections/projects";
import { Stats } from "@/components/sections/stats";
import { Team } from "@/components/sections/team";
import { Testimonials } from "@/components/sections/testimonials";
import { Partners } from "@/components/sections/partners";
import { Blog } from "@/components/sections/blog";
import { Events } from "@/components/sections/events";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { Careers } from "@/components/sections/careers";
import { Donations } from "@/components/sections/donations";
import { CtaBanner } from "@/components/sections/cta-banner";

import { FloatingCta } from "@/components/site/floating-cta";

export default function Home() {
  const section = useSiteStore((s) => s.section);
  const visibleSections = useSiteStore((s) => s.visibleSections);
  const setVisibleSections = useSiteStore((s) => s.setVisibleSections);
  const [selectedProduct, setSelectedProduct] = useState<ApiProduct | null>(null);

  // Fetch visibility settings
  useEffect(() => {
    fetch(`/api/settings?t=${Date.now()}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data === "object" && !("error" in data)) {
          setVisibleSections(data as Record<string, boolean>);
        }
      })
      .catch(() => {});
  }, [setVisibleSections]);

  // Scroll to top on section change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [section]);

  const isVisible = (id: string) => {
    if (["home", "about", "services", "contact"].includes(id)) return true;
    return visibleSections[id] !== false;
  };

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <FloatingCta />

      <ProductInquiryModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />

      <main key={section} className="min-h-screen page-enter">
          {section === "home" && (
            <>
              {/* 1. Hero */}
              <Hero />
              
              {/* 2. Chiffres clés */}
              <Stats />
              
              {/* 3. Qui sommes-nous ? */}
              <About />
              
              {/* 4. Nos activités */}
              <Services />
              
              {/* 5. Nos solutions */}
              {isVisible("products") && <Products onSelectProduct={setSelectedProduct} />}
              
              {/* 6. Nos réalisations */}
              {isVisible("projects") && <Projects />}
              
              {/* 7. Actualités */}
              {isVisible("blog") && <Blog />}
              
              {/* 8. Engagement */}
              {isVisible("donations") && <Donations />}
              
              {/* 9. Partenaires */}
              {isVisible("partners") && <Partners />}
              
              {/* 10. CTA Final */}
              <CtaBanner />
              
              {/* 11. FAQ */}
              {isVisible("faq") && <FAQ />}
              
              {/* 12. Contact / Présence */}
              <Contact />
            </>
          )}
          {section === "about" && (
            <>
              <About />
              <Stats />
              {isVisible("team") && <Team />}
              {isVisible("partners") && <Partners />}
            </>
          )}
          {section === "services" && (
            <>
              <div className="pt-20" />
              <Services />
              {isVisible("products") && <Products onSelectProduct={setSelectedProduct} />}
              {isVisible("projects") && <Projects />}
              <CtaBanner />
            </>
          )}
          {section === "products" && isVisible("products") && (
            <>
              <div className="pt-20" />
              <Products onSelectProduct={setSelectedProduct} />
              <CtaBanner />
              {isVisible("faq") && <FAQ />}
            </>
          )}
          {section === "projects" && isVisible("projects") && (
            <>
              <div className="pt-20" />
              <Projects />
              <Stats />
              <Testimonials />
            </>
          )}
          {section === "team" && isVisible("team") && (
            <>
              <div className="pt-20" />
              <Team />
              {isVisible("partners") && <Partners />}
              {isVisible("careers") && <Careers />}
            </>
          )}
          {section === "blog" && isVisible("blog") && (
            <>
              <div className="pt-20" />
              <Blog />
              {isVisible("events") && <Events />}
            </>
          )}
          {section === "events" && isVisible("events") && (
            <>
              <div className="pt-20" />
              <Events />
              {isVisible("blog") && <Blog />}
            </>
          )}
          {section === "careers" && isVisible("careers") && (
            <>
              <div className="pt-20" />
              <Careers />
              <CtaBanner />
            </>
          )}
          {section === "donations" && isVisible("donations") && (
            <>
              <div className="pt-20" />
              <Donations />
              <Testimonials />
            </>
          )}
          {section === "faq" && isVisible("faq") && (
            <>
              <div className="pt-20" />
              <FAQ />
              <Contact />
            </>
          )}
          {section === "contact" && (
            <>
              <div className="pt-20" />
              <Contact />
              <CtaBanner />
            </>
          )}
      </main>

      <Footer />
      <Chatbot />
    </>
  );
}
