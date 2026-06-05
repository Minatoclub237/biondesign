import { useState, useRef } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SlideTabs } from "./ui/slide-tabs";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Laser dot on hero footer — kept in Motion (glideX needs spring)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  // ─── GSAP ScrollTrigger parallax (scrub = frame-perfect, GPU only) ───────────
  useGSAP(() => {
    if (!heroRef.current) return;

    const st = {
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 1.4,
    };

    // Glow — sinks deep, grows, fades → sense of infinite depth
    gsap.to("[data-hero='glow']", {
      y: 340, scale: 1.8, opacity: 0,
      ease: "none", scrollTrigger: st,
    });

    // Video head — sinks slower than scroll = background depth layer
    gsap.to("[data-hero='video-wrap']", {
      y: 260,
      ease: "none", scrollTrigger: st,
    });

    // Video fades as hero exits (starts mid-scroll)
    gsap.to("[data-hero='video-wrap'] video", {
      opacity: 0.1,
      ease: "none",
      scrollTrigger: { ...st, start: "45% top" },
    });

    // Left text — rises faster than scroll = foreground layer
    gsap.to("[data-hero='left-wrap']", {
      y: -160,
      ease: "none", scrollTrigger: st,
    });

    // Right text — intermediate rate = mid-ground layer
    gsap.to("[data-hero='right-wrap']", {
      y: -100,
      ease: "none", scrollTrigger: st,
    });

    // Footer metrics strip — rises with the content
    gsap.to("[data-hero='footer']", {
      y: -60, opacity: 0,
      ease: "none",
      scrollTrigger: { ...st, start: "60% top" },
    });

  }, { scope: heroRef });

  return (
    <section
      ref={heroRef}
      id="hero-section"
      className="relative min-h-[110vh] sm:min-h-screen w-full bg-[#EDEEF5] flex flex-col justify-between overflow-hidden"
    >
      {/* ── Header ────────────────────────────────────────────────────────────── */}
      <header className="relative z-50 w-full px-6 sm:px-12 py-5 border-b border-black/[0.05] bg-[#EDEEF5]/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#hero-section" className="text-2xl sm:text-3xl font-serif font-bold italic tracking-tight text-zinc-950 flex items-center gap-2 hover:opacity-80 transition-all lowercase">
            <span className="w-3.5 h-3.5 bg-brand-blue rounded-none shrink-0 self-center"></span>
            <span className="leading-none pb-1">bi.on</span>
          </a>
          <nav className="hidden lg:flex items-center">
            <SlideTabs />
          </nav>
          <div className="flex items-center gap-4">
            <a href="#contact-section" className="px-6 py-3 text-[11px] font-bold bg-black text-white rounded-none hover:bg-brand-blue transition-all uppercase tracking-wider">
              Nous Contacter
            </a>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-zinc-900 bg-zinc-50 hover:bg-zinc-100 transition-all rounded-none" aria-label="Toggle Menu">
              {mobileMenuOpen ? <X size={16} className="stroke-[2.5]" /> : <Menu size={16} className="stroke-[2.5]" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 bg-[#EDEEF5] border-b border-black/[0.1] py-6 px-6 shadow-xl z-50 flex flex-col gap-4 text-start lg:hidden"
            >
              <div className="flex flex-col gap-3">
                <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase font-black mb-1">/ NAVIGATION</span>
                {[["#portfolio-section","Portfolio"],["#services-section","Prestations"],["#pricing-section","Tarifs"],["#metrics-section","Garanties"],["#contact-section","Contact"]].map(([href, label]) => (
                  <a key={href} href={href} onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold uppercase tracking-widest text-zinc-900 border-b border-black/[0.05] pb-2 hover:pl-2 transition-all">{label}</a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Desktop centerpiece — glow + video ────────────────────────────────── */}
      <div className="hidden lg:flex absolute inset-0 z-10 pointer-events-none items-center justify-center overflow-hidden">

        {/* Glow blob — GSAP moves this (data-hero='glow') */}
        <div
          data-hero="glow"
          className="absolute w-[50%] sm:w-[45%] aspect-square rounded-full bg-brand-blue/5 blur-[100px] pointer-events-none"
        />

        {/* Video head wrapper — GSAP moves this (data-hero='video-wrap') */}
        <div
          data-hero="video-wrap"
          className="relative w-[850px] xl:w-[950px] aspect-square flex items-center justify-center"
        >
          <video
            autoPlay loop muted playsInline
            className="w-full h-full object-contain pointer-events-none mix-blend-multiply"
            id="hero-head-video-center"
            src="/videos/hero.mp4"
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-zinc-950/[0.03] rounded-full blur-2xl" />
        </div>
      </div>

      {/* ── Content grid ─────────────────────────────────────────────────────── */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-6 sm:px-12 py-12 md:py-16 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* LEFT — wrapper for GSAP y-parallax, Motion handles entrance */}
          <div data-hero="left-wrap" className="lg:col-span-5">
            <motion.div
              className="flex flex-col justify-between gap-12 text-left"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 1.4, delay: 0.1 }}
            >
              <div className="space-y-6">
                <h1 className="font-condensed font-black text-4xl sm:text-5xl lg:text-5xl xl:text-6xl text-zinc-950 uppercase tracking-tighter leading-[0.95]">
                  DES SITES WEB<br />QUI AMÈNENT<br />DES CLIENTS
                </h1>
                <p className="text-zinc-800 font-serif italic text-lg sm:text-xl md:text-2xl leading-relaxed font-normal max-w-md pt-2 antialiased">
                  Nous créons votre site internet sur-mesure pour vous faire connaître dans votre région, rassurer vos futurs clients et simplifier vos prises de rendez-vous.
                </p>
                <div className="pt-2">
                  <a href="#contact-section" className="group inline-flex items-center gap-4 bg-zinc-950 hover:bg-zinc-900 text-white rounded-full pl-6 pr-2 py-2 text-xs sm:text-sm font-semibold tracking-wide transition-all active:scale-95 duration-200">
                    <span>Prendre rendez-vous</span>
                    <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-zinc-950 transition-transform duration-300 group-hover:translate-x-0.5">
                      <ArrowRight size={14} className="stroke-[2.5]" />
                    </span>
                  </a>
                </div>
              </div>
              <div className="space-y-4 max-w-sm border-t border-black/[0.1] pt-6">
                <p className="text-zinc-600 font-serif italic text-sm sm:text-base leading-relaxed antialiased">
                  Que vous soyez coiffeur, restaurateur, électricien ou artisan, nous construisons un site simple, rapide et élégant pour mettre en avant votre passion.
                </p>
              </div>
            </motion.div>
          </div>

          {/* MIDDLE — mobile video */}
          <div className="lg:col-span-3 flex items-center justify-center py-4 lg:py-0 pointer-events-none">
            <div className="lg:hidden relative w-full max-w-[420px] sm:max-w-[500px] aspect-square flex items-center justify-center mt-2 pb-6">
              <video autoPlay loop muted playsInline className="w-full h-full object-contain pointer-events-none mix-blend-multiply" id="hero-head-video-mobile" src="/videos/hero.mp4" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-6 bg-zinc-950/[0.03] rounded-full blur-xl" />
            </div>
          </div>

          {/* RIGHT — wrapper for GSAP y-parallax, Motion handles entrance */}
          <div data-hero="right-wrap" className="lg:col-span-4">
            <motion.div
              className="flex flex-col gap-12 lg:items-end lg:text-right text-left items-start justify-between"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 1.4, delay: 0.2 }}
            >
              <div className="max-w-xs space-y-2 lg:text-right">
                <h3 className="font-condensed font-black text-3xl sm:text-4xl text-zinc-950 uppercase tracking-tight">VISIBLE SUR GOOGLE</h3>
                <p className="text-zinc-600 font-serif italic text-xs sm:text-sm leading-relaxed antialiased">
                  Trouvez de nouveaux clients directement sur Google. Votre site apparaît lors des recherches locales dans votre ville ou quartier.
                </p>
              </div>
              <div className="max-w-xs space-y-2 lg:text-right pt-6 lg:border-t lg:border-black/[0.1] w-full">
                <h3 className="font-condensed font-black text-3xl sm:text-4xl text-zinc-950 uppercase tracking-tight">RAPIDE SUR MOBILE</h3>
                <p className="text-zinc-600 font-serif italic text-xs sm:text-sm leading-relaxed antialiased">
                  Un site ultra-rapide qui s'ouvre rapidement sur téléphone pour permettre à vos clients de vous appeler ou de réserver en un clic.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* ── Footer métriques ─────────────────────────────────────────────────── */}
      <footer data-hero="footer" className="relative z-30 w-full border-t border-black/[0.05] bg-[#EDEEF5]/40 py-6 px-6 sm:px-12 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse"></span>
            <span className="text-[10px] uppercase tracking-widest font-mono text-zinc-400 font-extrabold">Performances & Impacts Locaux :</span>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:flex sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3 text-zinc-900 w-full sm:w-auto">
            {([["+ 420%","Trafic SEO"],["x3.2","Taux de Visites"],["100/100","Vitesse Mobile"],["+2.5M€","C.A. Local Généré"]] as [string,string][]).map(([val, label], i) => (
              <div key={label} className="flex items-center gap-4">
                {i > 0 && <div className="w-px h-4 bg-zinc-300 hidden sm:block" />}
                <div className="flex items-baseline gap-2">
                  <span className="font-condensed font-black text-xl sm:text-2xl tracking-tight text-zinc-950">{val}</span>
                  <span className="text-[9px] font-mono tracking-wider text-zinc-500 uppercase whitespace-nowrap">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </section>
  );
}
