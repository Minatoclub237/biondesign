import { useRef } from "react";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Metrics from "./components/Metrics";
import Contact from "./components/Contact";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionDividerProps {
  label: string;
  direction?: "left" | "right";
  bgText?: string;
}

function SectionDivider({ label, direction = "left", bgText }: SectionDividerProps) {
  const isLeft = direction === "left";
  const containerRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const bgTextBackRef = useRef<HTMLDivElement>(null);

  // Laser dot — kept in Motion (scroll-spring hybrid)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const glideX = useTransform(scrollYProgress, [0.15, 0.85], isLeft ? ["0%", "100%"] : ["100%", "0%"]);
  const glideXSpring = useSpring(glideX, { stiffness: 60, damping: 18 });

  // ─── GSAP — extreme parallax on bgText layers ──────────────────────────────
  useGSAP(() => {
    if (!containerRef.current) return;

    const st = {
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2,
    };

    // Primary bg text: slow horizontal drift + vertical = very far depth plane
    if (bgTextRef.current) {
      gsap.fromTo(bgTextRef.current,
        { y: isLeft ? -280 : 280, x: isLeft ? -100 : 100, scale: 0.52, opacity: 0 },
        { y: isLeft ?  280 : -280, x: isLeft ?  100 : -100, scale: 1.48, opacity: 0.065,
          ease: "none", scrollTrigger: st },
      );
    }

    // Secondary ghost layer: moves in OPPOSITE direction = crossing planes effect
    if (bgTextBackRef.current) {
      gsap.fromTo(bgTextBackRef.current,
        { y: isLeft ? 200 : -200, x: isLeft ? 80 : -80, scale: 1.3, opacity: 0 },
        { y: isLeft ? -200 : 200, x: isLeft ? -80 : 80, scale: 0.7, opacity: 0.018,
          ease: "none", scrollTrigger: st },
      );
    }

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#EDEEF5] px-6 sm:px-12 md:px-16 lg:px-20 select-none py-20 overflow-hidden"
    >
      {/* Primary bg text — GSAP extreme parallax (primary depth plane) */}
      {bgText && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div
            ref={bgTextRef}
            className="text-[12vw] md:text-[9vw] font-display font-black text-black uppercase tracking-[0.3em] leading-none whitespace-nowrap will-change-transform"
            style={{ opacity: 0 }}
          >
            {bgText}
          </div>
        </div>
      )}

      {/* Secondary ghost layer — moves opposite direction (depth crossing) */}
      {bgText && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div
            ref={bgTextBackRef}
            className="text-[18vw] md:text-[14vw] font-display font-black text-black uppercase tracking-[0.5em] leading-none whitespace-nowrap will-change-transform"
            style={{ opacity: 0 }}
          >
            {bgText}
          </div>
        </div>
      )}

      {/* Divider line + laser dot */}
      <div className="max-w-7xl mx-auto relative flex items-center justify-between h-4 z-10">
        <motion.div
          className="absolute left-0 right-0 h-[2.5px] bg-[#1a1a1a] z-0"
          style={{ originX: isLeft ? 0 : 1 }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false }}
          transition={{ ease: [0.16, 1, 0.3, 1], duration: 1.4 }}
        />

        <motion.div
          className="absolute h-[7px] w-[7px] bg-[#9fff00] rounded-full z-10 shadow-[0_0_12px_#9fff00,0_0_24px_#9fff0060] border border-black/30"
          style={{ left: glideXSpring, top: "50%", y: "-50%", x: "-50%" }}
        />

        {/* Label left */}
        <motion.div
          className="relative z-10 bg-[#EDEEF5] pr-6 py-1 flex items-center gap-2.5"
          initial={{ opacity: 0, x: isLeft ? -120 : 120 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ ease: [0.16, 1, 0.3, 1], duration: 1.2, delay: 0.1 }}
        >
          <span className="w-2 h-2 bg-[#9fff00] border border-black/20 transform rotate-45 inline-block"></span>
          <span className="text-[10px] font-mono font-black tracking-widest text-[#1a1a1a] uppercase">{label}</span>
        </motion.div>

        {/* Label right */}
        <motion.div
          className="relative z-10 bg-[#EDEEF5] pl-6 py-1 hidden md:flex items-center gap-1.5 text-[9px] font-mono tracking-widest text-[#1a1a1a]/40 font-bold uppercase select-none"
          initial={{ opacity: 0, x: isLeft ? 120 : -120 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ ease: [0.16, 1, 0.3, 1], duration: 1.2, delay: 0.1 }}
        >
          <span>bi.on® studio</span>
          <span className="text-[#9fff00]">•</span>
          <span>est. 2026</span>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Page-level floating decorators ──────────────────────────────────────────
function BackgroundFloaters() {
  const { scrollYProgress } = useScroll();

  // Each floater on its own scroll depth — creates multi-plane parallax on full page
  const f1Y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -420]), { stiffness: 20, damping: 15 });
  const f2Y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 260]),  { stiffness: 20, damping: 15 });
  const f3Y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -310]), { stiffness: 20, damping: 15 });

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div style={{ y: f1Y }}
        className="absolute left-[-120px] top-[130vh] w-[400px] h-[400px] rounded-full border border-black/[0.03] flex items-center justify-center opacity-60 hidden xl:flex"
      >
        <div className="w-[200px] h-[200px] rounded-full border border-dashed border-black/[0.02] flex items-center justify-center animate-[spin_80s_linear_infinite]" />
        <span className="text-[10px] font-mono tracking-widest text-[#1a1a1a]/10 font-bold uppercase select-none absolute">bi.on® core</span>
      </motion.div>

      <motion.div style={{ y: f2Y }}
        className="absolute right-[6%] top-[250vh] text-black/[0.02] font-mono text-[16rem] font-light leading-none select-none hidden lg:block"
      >+</motion.div>

      <motion.div style={{ y: f3Y }}
        className="absolute right-[-150px] top-[380vh] w-[450px] h-[450px] bg-blue-300/[0.04] rounded-full blur-[120px] hidden xl:block pointer-events-none"
      />

      <motion.div style={{ y: f1Y }}
        className="absolute left-[5%] top-[550vh] font-serif italic text-black/[0.015] text-[18rem] font-normal leading-none select-none hidden xl:block"
      >b</motion.div>
    </div>
  );
}

export default function App() {
  return (
    <div
      className="min-h-screen bg-[#EDEEF5] selection:bg-[#9fff00] selection:text-black font-sans text-[#1a1a1a] relative overflow-x-hidden"
      id="app-root-container"
    >
      <BackgroundFloaters />

      <main id="main-content" className="relative z-10 w-full">
        <Hero />
        <SectionDivider label="Partie 2 // Réalisations de Portfolio" direction="left"  bgText="VITRINE"    />
        <Portfolio />
        <SectionDivider label="Partie 3 // Prestations et Engagements"             direction="right" bgText="AUDACE"     />
        <Services />
        <SectionDivider label="Partie 4 // Témoignages et Retours d'Expérience"    direction="left"  bgText="ALCHIMIE"  />
        <Metrics />
        <SectionDivider label="Partie 5 // Formulaire de Contact et Devis"         direction="right" bgText="CONVERSION" />
        <Contact />
      </main>

      <footer className="w-full bg-[#EDEEF5] border-t border-black/[0.05] py-12 text-center px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-[10px] font-mono text-zinc-400">
          <span className="lowercase tracking-widest select-none">© 2026 bi.on studio — conçu en france — tous droits réservés</span>
          <div className="flex items-center gap-4">
            <a href="/mentions-legales.html" className="lowercase hover:text-black cursor-pointer transition-colors select-none">mentions légales</a>
            <span className="text-zinc-300 select-none">•</span>
            <span className="lowercase hover:text-black cursor-pointer transition-colors select-none">technologies de pointe</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
