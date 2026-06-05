import { useRef } from "react";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Metrics from "./components/Metrics";
import Contact from "./components/Contact";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

interface SectionDividerProps {
  label: string;
  direction?: "left" | "right";
  bgText?: string;
}

function SectionDivider({ label, direction = "left", bgText }: SectionDividerProps) {
  const isLeft = direction === "left";
  const containerRef = useRef<HTMLDivElement>(null);

  // Hook into the scroll of the divider container relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax background big faint text
  // As we scroll through, the background text drifts in layout space
  const textY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const textX = useTransform(scrollYProgress, [0, 1], isLeft ? [-50, 50] : [50, -50]);
  const textScale = useTransform(scrollYProgress, [0, 1], [0.93, 1.07]);
  
  const textYSpring = useSpring(textY, { stiffness: 40, damping: 22 });
  const textXSpring = useSpring(textX, { stiffness: 40, damping: 22 });
  const textScaleSpring = useSpring(textScale, { stiffness: 40, damping: 22 });

  // Glowing laser dot sliding along the horizontal separator line
  const glideX = useTransform(scrollYProgress, [0.15, 0.85], isLeft ? ["0%", "100%"] : ["100%", "0%"]);
  const glideXSpring = useSpring(glideX, { stiffness: 60, damping: 18 });

  return (
    <div 
      ref={containerRef}
      className="relative w-full bg-[#EDEEF5] px-6 sm:px-12 md:px-16 lg:px-20 select-none py-16 overflow-visible"
    >
      {/* Huge subtle parallax background word behind the divider */}
      {bgText && (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
          <motion.div
            style={{ 
              y: textYSpring, 
              x: textXSpring, 
              scale: textScaleSpring,
            }}
            className="text-[10vw] md:text-[8vw] font-display font-black text-black/[0.035] uppercase tracking-[0.25em] leading-none whitespace-nowrap"
          >
            {bgText}
          </motion.div>
        </div>
      )}

      <div className="max-w-7xl mx-auto relative flex items-center justify-between h-4 z-10">
        {/* The dominant superseding absolute solid line with dynamic scale animation */}
        <motion.div 
          className="absolute left-0 right-0 h-[2.5px] bg-[#1a1a1a] z-0"
          style={{ originX: isLeft ? 0 : 1 }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false }}
          transition={{ ease: [0.16, 1, 0.3, 1], duration: 1.4 }}
        />

        {/* Dynamic laser dot sliding on the divider line as the user scrolls past */}
        <motion.div
          className="absolute h-[7px] w-[7px] bg-[#9fff00] rounded-full z-10 shadow-[0_0_8px_#9fff00] border border-black/30"
          style={{ 
            left: glideXSpring,
            top: "50%",
            y: "-50%",
            x: "-50%",
          }}
        />
        
        {/* Left side text cutout (padded by background color) */}
        <motion.div 
          className="relative z-10 bg-[#EDEEF5] pr-6 py-1 flex items-center gap-2.5"
          initial={{ opacity: 0, x: isLeft ? -120 : 120 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ ease: [0.16, 1, 0.3, 1], duration: 1.2, delay: 0.1 }}
        >
          <span className="w-2 h-2 bg-[#9fff00] border border-black/20 transform rotate-45 inline-block"></span>
          <span className="text-[10px] font-mono font-black tracking-widest text-[#1a1a1a] uppercase">
            {label}
          </span>
        </motion.div>

        {/* Right side label cutout (padded by background color) */}
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

export default function App() {
  // Page-level scroll tracking for global premium parallax floats
  const { scrollYProgress } = useScroll();
  const floater1Y = useTransform(scrollYProgress, [0, 1], [0, -350]);
  const floater2Y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const floater3Y = useTransform(scrollYProgress, [0, 1], [0, -250]);

  const floater1YSpring = useSpring(floater1Y, { stiffness: 25, damping: 18 });
  const floater2YSpring = useSpring(floater2Y, { stiffness: 25, damping: 18 });
  const floater3YSpring = useSpring(floater3Y, { stiffness: 25, damping: 18 });

  return (
    <div 
      className="min-h-screen bg-[#EDEEF5] selection:bg-[#9fff00] selection:text-black font-sans text-[#1a1a1a] relative overflow-x-hidden"
      id="app-root-container"
    >
      {/* Decorative Interactive Parallax Background Layer - Elegantly subtle to guarantee content legibility */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* 1st Floater: Rotating wireframe orbit rings, high-end Swiss styling */}
        <motion.div 
          style={{ y: floater1YSpring }}
          className="absolute left-[-120px] top-[130vh] w-[400px] h-[400px] rounded-full border border-black/[0.03] flex items-center justify-center opacity-60 hidden xl:flex"
        >
          <div className="w-[200px] h-[200px] rounded-full border border-dashed border-black/[0.02] flex items-center justify-center animate-[spin_80s_linear_infinite]" />
          <span className="text-[10px] font-mono tracking-widest text-[#1a1a1a]/10 font-bold uppercase select-none absolute">bi.on® core</span>
        </motion.div>

        {/* 2nd Floater: Huge delicate geometric '+' crosshair detailing */}
        <motion.div 
          style={{ y: floater2YSpring }}
          className="absolute right-[6%] top-[250vh] text-black/[0.02] font-mono text-[16rem] font-light leading-none select-none hidden lg:block"
        >
          +
        </motion.div>

        {/* 3rd Floater: Soft light blue aesthetic glow floating in page layout space */}
        <motion.div 
          style={{ y: floater3YSpring }}
          className="absolute right-[-150px] top-[380vh] w-[450px] h-[450px] bg-blue-300/[0.04] rounded-full blur-[120px] hidden xl:block pointer-events-none"
        />

        {/* 4th Floater: Faint elegant background serif letter */}
        <motion.div 
          style={{ y: floater1YSpring }}
          className="absolute left-[5%] top-[550vh] font-serif italic text-black/[0.015] text-[18rem] font-normal leading-none select-none hidden xl:block"
        >
          b
        </motion.div>
      </div>

      <main id="main-content" className="relative z-10 w-full">
        {/* Partie 1: L'En-tête & Introduction (Le Héros interactif) */}
        <Hero />

        <SectionDivider label="Partie 2 // Réalisations de Portfolio" direction="left" bgText="VITRINE" />

        {/* Partie 2: Le Portfolio Interactif & Simulateur */}
        <Portfolio />

        <SectionDivider label="Partie 3 // Prestations et Engagements" direction="right" bgText="AUDACE" />

        {/* Partie 3: Des Prestations de Haute Lignée et Tarifs */}
        <Services />

        <SectionDivider label="Partie 4 // Témoignages et Retours d'Expérience" direction="left" bgText="ALCHIMIE" />

        {/* Partie 4: Le Témoignages & retours clients */}
        <Metrics />

        <SectionDivider label="Partie 5 // Formulaire de Contact et Devis" direction="right" bgText="CONVERSION" />

        {/* Partie 5: Le Formulaire de Devis & Contact */}
        <Contact />
      </main>

      {/* Elegant minimalist footer section */}
      <footer className="w-full bg-[#EDEEF5] border-t border-black/[0.05] py-12 text-center px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-[10px] font-mono text-zinc-400">
          <span className="lowercase tracking-widest select-none">© 2026 bi.on studio — conçu en france — tous droits réservés</span>
          <div className="flex items-center gap-4">
            <span className="lowercase hover:text-black cursor-pointer transition-colors select-none">mentions légales</span>
            <span className="text-zinc-300 select-none">•</span>
            <span className="lowercase hover:text-black cursor-pointer transition-colors select-none">technologies de pointe</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
