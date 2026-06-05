import React, { useState, useRef } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import { SlideTabs } from "./ui/slide-tabs";

export default function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Scroll tracking for parallax on Hero elements
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const videoY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 170]);
  const leftY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const rightY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  
  const videoYSpring = useSpring(videoY, { stiffness: 80, damping: 22 });
  const glowYSpring = useSpring(glowY, { stiffness: 80, damping: 22 });
  const leftYSpring = useSpring(leftY, { stiffness: 80, damping: 22 });
  const rightYSpring = useSpring(rightY, { stiffness: 80, damping: 22 });

  return (
    <section 
      ref={heroRef}
      id="hero-section" 
      className="relative min-h-[110vh] sm:min-h-screen w-full bg-[#EDEEF5] flex flex-col justify-between overflow-hidden"
    >
      {/* 1. Minimal Header (Inspired by "Brandly" Top Bar Layout) */}
      <header className="relative z-50 w-full px-6 sm:px-12 py-5 border-b border-black/[0.05] bg-[#EDEEF5]/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Name - Matching bold minimal styling with Cormorant Garamond serif font */}
          <a href="#hero-section" className="text-2xl sm:text-3xl font-serif font-bold italic tracking-tight text-zinc-950 flex items-center gap-2 hover:opacity-80 transition-all lowercase">
            <span className="w-3.5 h-3.5 bg-brand-blue rounded-none shrink-0 self-center"></span>
            <span className="leading-none pb-1">bi.on</span>
          </a>

          {/* Navigation - Airy & Lightweight SlideTabs */}
          <nav className="hidden lg:flex items-center">
            <SlideTabs />
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            <a 
              href="#contact-section" 
              className="px-6 py-3 text-[11px] font-bold bg-black text-white rounded-none hover:bg-brand-blue transition-all uppercase tracking-wider"
            >
              Nous Contacter
            </a>

            {/* Mobile Hamburger Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-900 bg-zinc-50 hover:bg-zinc-100 transition-all rounded-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={16} className="stroke-[2.5]" /> : <Menu size={16} className="stroke-[2.5]" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 bg-[#EDEEF5] border-b border-black/[0.1] py-6 px-6 shadow-xl z-50 flex flex-col gap-4 text-start lg:hidden"
            >
              <div className="flex flex-col gap-3">
                <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase font-black mb-1">/ NAVIGATION</span>
                <a 
                  href="#portfolio-section" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-bold uppercase tracking-widest text-zinc-900 border-b border-black/[0.05] pb-2 hover:pl-2 transition-all"
                >
                  Portfolio
                </a>
                <a 
                  href="#services-section" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-bold uppercase tracking-widest text-zinc-900 border-b border-black/[0.05] pb-2 hover:pl-2 transition-all"
                >
                  Prestations
                </a>
                <a 
                  href="#pricing-section" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-bold uppercase tracking-widest text-zinc-900 border-b border-black/[0.05] pb-2 hover:pl-2 transition-all"
                >
                  Tarifs
                </a>
                <a 
                  href="#metrics-section" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-bold uppercase tracking-widest text-zinc-900 border-b border-black/[0.05] pb-2 hover:pl-2 transition-all"
                >
                  Garanties
                </a>
                <a 
                  href="#contact-section" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-bold uppercase tracking-widest text-zinc-900 border-b border-black/[0.05] pb-2 hover:pl-2 transition-all"
                >
                  Contact
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. Overlaid Centerpiece Layer - Desktop Only (Absolutely Centered with creative parallax) */}
      <div className="hidden lg:flex absolute inset-0 z-10 pointer-events-none items-center justify-center overflow-hidden">
        {/* Soft background blue glow exactly where the head sits - with slow parallax */}
        <motion.div 
          style={{ y: glowYSpring }}
          className="absolute w-[50%] sm:w-[45%] aspect-square rounded-full bg-brand-blue/5 blur-[100px] pointer-events-none"
        />

        <motion.div
          style={{ y: videoYSpring }}
          className="relative w-[850px] xl:w-[950px] aspect-square flex items-center justify-center"
        >
          <video
            autoPlay loop muted playsInline
            className="w-full h-full object-contain pointer-events-none mix-blend-multiply"
            id="hero-head-video-center"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260603_132049_036591b8-6e92-4760-b94c-a7ea6eef315c.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-[8%] rounded-full bg-gradient-to-br from-blue-200 via-indigo-100 to-sky-200 opacity-35 mix-blend-multiply blur-3xl pointer-events-none" />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-zinc-950/[0.03] rounded-full blur-2xl" />
        </motion.div>
      </div>

      {/* 3. Hero content grid (Left Text, Middle gap, Right Text) */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-6 sm:px-12 py-12 md:py-16 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT SIDE CONTENT - Matches "BUILDING BRANDS THAT RESONATE" structure */}
          <motion.div 
            className="lg:col-span-5 flex flex-col justify-between gap-12 text-left"
            style={{ y: leftYSpring }}
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 1.4, delay: 0.1 }}
          >
            <div className="space-y-6">
              {/* Giant high-impact heading */}
              <h1 className="font-condensed font-black text-4xl sm:text-5xl lg:text-5xl xl:text-6xl text-zinc-950 uppercase tracking-tighter leading-[0.95]">
                DES SITES WEB<br />
                QUI AMÈNENT<br />
                DES CLIENTS
              </h1>

              {/* Subheading text - Editorial & Original Serif Font */}
              <p className="text-zinc-800 font-serif italic text-lg sm:text-xl md:text-2xl leading-relaxed font-normal max-w-md pt-2 antialiased">
                Nous créons votre site internet sur-mesure pour vous faire connaître dans votre région, rassurer vos futurs clients et simplifier vos prises de rendez-vous.
              </p>

              {/* Black pill button dynamic with white arrow circle (identical to 'Start today ->' in screenshot) */}
              <div className="pt-2">
                <a 
                  href="#contact-section" 
                  className="group inline-flex items-center gap-4 bg-zinc-950 hover:bg-zinc-900 text-white rounded-full pl-6 pr-2 py-2 text-xs sm:text-sm font-semibold tracking-wide transition-all active:scale-95 duration-200"
                >
                  <span>Prendre rendez-vous</span>
                  <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-zinc-950 transition-transform duration-300 group-hover:translate-x-0.5">
                    <ArrowRight size={14} className="stroke-[2.5]" />
                  </span>
                </a>
              </div>
            </div>

            {/* Bottom Left Paragraph (No unrequested social links metadata) */}
            <div className="space-y-4 max-w-sm border-t border-black/[0.1] pt-6">
              <p className="text-zinc-600 font-serif italic text-sm sm:text-base leading-relaxed antialiased">
                Que vous soyez coiffeur, restaurateur, électricien ou artisan, nous construisons un site simple, rapide et élégant pour mettre en avant votre passion.
              </p>
            </div>
          </motion.div>

          {/* MIDDLE GAP Container - On desktop it is a spacing gap, on mobile/tablet it contains the beautifully inline enlarged Head video */}
          <div className="lg:col-span-3 flex items-center justify-center py-4 lg:py-0 pointer-events-none">
            {/* Mobile/Tablet Only: Large Head Video inline to guarantee perfect readability of text blocks */}
            <div className="lg:hidden relative w-full max-w-[420px] sm:max-w-[500px] aspect-square flex items-center justify-center mt-2 pb-6">
              <video
                autoPlay loop muted playsInline
                className="w-full h-full object-contain pointer-events-none mix-blend-multiply"
                id="hero-head-video-mobile"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              >
                <source src="/videos/hero.mp4" type="video/mp4" />
                <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260603_132049_036591b8-6e92-4760-b94c-a7ea6eef315c.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-[10%] rounded-full bg-gradient-to-br from-blue-200 via-indigo-100 to-sky-200 opacity-30 mix-blend-multiply blur-3xl pointer-events-none" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-6 bg-zinc-950/[0.03] rounded-full blur-xl" />
            </div>
          </div>

          {/* RIGHT SIDE CONTENT - Matches the '"50+ BRANDS LAUNCHED" & "5+ YEARS" stats cards layout */}
          <motion.div 
            className="lg:col-span-4 flex flex-col gap-12 lg:items-end lg:text-right text-left items-start justify-between"
            style={{ y: rightYSpring }}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 1.4, delay: 0.2 }}
          >
            {/* Upper Stat Box */}
            <div className="max-w-xs space-y-2 lg:text-right">
              <h3 className="font-condensed font-black text-3xl sm:text-4xl text-zinc-950 uppercase tracking-tight">
                VISIBLE SUR GOOGLE
              </h3>
              <p className="text-zinc-600 font-serif italic text-xs sm:text-sm leading-relaxed antialiased">
                Trouvez de nouveaux clients directement sur Google. Votre site apparaît lors des recherches locales dans votre ville ou quartier.
              </p>
            </div>

            {/* Lower Stat Box */}
            <div className="max-w-xs space-y-2 lg:text-right pt-6 lg:border-t lg:border-black/[0.1] w-full">
              <h3 className="font-condensed font-black text-3xl sm:text-4xl text-zinc-950 uppercase tracking-tight">
                RAPIDE SUR MOBILE
              </h3>
              <p className="text-zinc-600 font-serif italic text-xs sm:text-sm leading-relaxed antialiased">
                Un site ultra-rapide qui s'ouvre rapidement sur téléphone pour permettre à vos clients de vous appeler ou de réserver en un clic.
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* 4. Horizontal Reference Badges Strip - Replaced with highly flattering premium figures */}
      <footer className="relative z-30 w-full border-t border-black/[0.05] bg-[#EDEEF5]/40 py-6 px-6 sm:px-12 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse"></span>
            <span className="text-[10px] uppercase tracking-widest font-mono text-zinc-400 font-extrabold">Performances & Impacts Locaux :</span>
          </div>
          
          {/* Beautiful Grid of premium flattering metrics */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:flex sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3 text-zinc-900 w-full sm:w-auto">
            <div className="flex items-baseline gap-2">
              <span className="font-condensed font-black text-xl sm:text-2xl tracking-tight text-zinc-950">+420%</span>
              <span className="text-[9px] font-mono tracking-wider text-zinc-500 uppercase whitespace-nowrap">Trafic SEO</span>
            </div>
            <div className="w-px h-4 bg-zinc-300 hidden sm:block"></div>
            <div className="flex items-baseline gap-2">
              <span className="font-condensed font-black text-xl sm:text-2xl tracking-tight text-zinc-950">x3.2</span>
              <span className="text-[9px] font-mono tracking-wider text-zinc-500 uppercase whitespace-nowrap">Taux de Visites</span>
            </div>
            <div className="w-px h-4 bg-zinc-300 hidden sm:block"></div>
            <div className="flex items-baseline gap-2">
              <span className="font-condensed font-black text-xl sm:text-2xl tracking-tight text-zinc-950">100/100</span>
              <span className="text-[9px] font-mono tracking-wider text-zinc-500 uppercase whitespace-nowrap">Vitesse Mobile</span>
            </div>
            <div className="w-px h-4 bg-zinc-300 hidden sm:block"></div>
            <div className="flex items-baseline gap-2">
              <span className="font-condensed font-black text-xl sm:text-2xl tracking-tight text-zinc-950">+2.5M€</span>
              <span className="text-[9px] font-mono tracking-wider text-zinc-500 uppercase whitespace-nowrap">C.A. Local Généré</span>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
