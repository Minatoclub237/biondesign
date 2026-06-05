import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { Sparkles, Code, Layers, Check } from "lucide-react";

interface FeatureCardProps {
  key?: React.Key;
  title: string;
  subTitle: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  delay: number;
  specs: string[];
}

const FeatureCard = ({ title, subTitle, description, icon, gradient, delay, specs }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Rotate maximum 12 degrees for an elegant 3D tilt effect
    const rX = -(mouseY / (height / 2)) * 12;
    const rY = (mouseX / (width / 2)) * 12;
    
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      animate={{ rotateX, rotateY }}
      style={{ 
        transformStyle: "preserve-3d", 
        perspective: 1000,
      }}
      transition={{ 
        type: "spring", 
        stiffness: 150, 
        damping: 18,
        opacity: { duration: 0.8, delay },
        y: { duration: 0.8, delay }
      }}
      className="relative flex flex-col justify-start items-start w-full max-w-[280px] md:max-w-[300px] group mx-auto cursor-pointer"
    >
      {/* Glow Background (Crucial) */}
      <div 
        className="absolute inset-0 w-full h-full opacity-55 rounded-[40px] pointer-events-none blur-[40px] transition-all duration-500 group-hover:opacity-75 group-hover:scale-105"
        style={{ background: gradient }}
      />

      {/* Foreground Card with Gradient Border (Crucial) */}
      <div 
        className="relative self-stretch rounded-[40px] z-10 overflow-hidden flex flex-col justify-center transition-transform duration-300 group-hover:scale-[1.01]"
        style={{
          background: `linear-gradient(#121214, #121214) padding-box, ${gradient} border-box`,
          borderWidth: "8px",
          borderColor: "transparent"
        }}
      >
        <div className="p-7 sm:p-9 flex flex-col justify-center text-start">
          <span className="text-[9px] font-mono text-zinc-500 tracking-widest uppercase block mb-5 font-semibold">
            INCLUS D'OFFICE:
          </span>
          <ul className="space-y-4">
            {specs.map((spec, i) => (
              <li key={i} className="flex items-center gap-3 text-xs sm:text-sm text-zinc-100 font-sans font-medium leading-relaxed">
                <span 
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: gradient.includes("#7DD3FC") ? "#00c3ff" : gradient.includes("#E0AEFF") ? "#f72585" : "#ff9d3c" }}
                />
                <span>{spec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const titleX = useTransform(scrollYProgress, [0, 1], isMobile ? [-12, 12] : [-65, 65]);
  const titleXSpring = useSpring(titleX, { stiffness: 60, damping: 22 });

  const servicePillars = [
    {
      icon: <Sparkles size={32} strokeWidth={2.5} className="text-white/90" />,
      title: "Identité de Prestige Local",
      subTitle: "votre enseigne sur internet",
      description: "Nous transformons des commerces de proximité (coiffeurs, boulangers, restaurants) en adresses d'exception grâce à un contraste typographique absolu et des images sublimées. Finie l'image amateur.",
      specs: ["Design de grille suisse épuré", "Mise en avant des prestations phares", "Photos et vidéos d'ambiance intégrées", "Optimisation de l'image de marque"],
      gradient: "linear-gradient(137deg, #FF3D77 0%, #FFB1CE 45%, #FF9D3C 100%)",
      delay: 0.1
    },
    {
      icon: <Code size={32} strokeWidth={2.5} className="text-white/90" />,
      title: "Performance & Prise de Contact",
      subTitle: "zéro barrière de réservation",
      description: "Une intégration pure en React et Vite conçue pour charger en moins de 400ms. Les boutons d'appel, d'itinéraire et de prise de rendez-vous réagissent au doigt et à l'œil.",
      specs: ["Navigation mobile fluide", "Boutons call-to-action instantanés", "Systèmes de réservation tiers intégrés", "Légèreté de chargement absolue (100%)"],
      gradient: "linear-gradient(137deg, #FFFFFF 0%, #7DD3FC 45%, #06B6D4 100%)",
      delay: 0.2
    },
    {
      icon: <Layers size={32} strokeWidth={2.5} className="text-white/90" />,
      title: "Optimisation de Visibilité Google",
      subTitle: "référencement local suprême",
      description: "Un site internet structuré sémantiquement pour garantir une indexation prioritaire. Nous relions votre site d'artisan à Google Maps et votre fiche d'établissement pour capter chaque recherche.",
      specs: ["SEO sémantique local", "Score Lighthouse de performance optimal", "Lien Google Business Profile", "Conforme RGPD et normes d'accessibilité"],
      gradient: "linear-gradient(137deg, #4361EE 0%, #E0AEFF 45%, #F72585 100%)",
      delay: 0.3
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="services-section" 
      className="relative w-full bg-[#EDEEF5] text-[#1a1a1a] py-24 px-6 sm:px-12 md:px-16 lg:px-20 scroll-mt-12 overflow-hidden"
    >
      {/* Subtle decorative radial lights to add high-fidelity depth to the light background */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-blue-400/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-rose-400/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl w-full mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          className="flex flex-col items-start mb-16 max-w-2xl text-start"
          style={{ x: titleXSpring }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ ease: [0.16, 1, 0.3, 1], duration: 1.4 }}
        >
          <span className="text-[10px] font-mono tracking-widest text-[#FF3D77] font-extrabold uppercase mb-3 select-none">
            / PRESTATIONS ET ENGAGEMENTS LOCAUX — PARTIE 3
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-zinc-900 tracking-tight lowercase">
            un site de prestige pour votre commerce local.
          </h2>
          <p className="mt-4 text-xs sm:text-sm font-sans font-semibold text-zinc-650 tracking-wide leading-relaxed lowercase">
            nous comblons le fossé numérique des artisans de proximité en france, belgique et suisse. nous concevons des outils de conversion ultra-rapides et simples d’entretien.
          </p>
        </motion.div>

        {/* Grid utilizing CSS grid consistent with guidelines */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-3 lg:gap-3 w-full max-w-[936px] mx-auto"
          id="services-grid"
        >
          {servicePillars.map((pillar, idx) => (
            <FeatureCard
              key={idx}
              title={pillar.title}
              subTitle={pillar.subTitle}
              description={pillar.description}
              icon={pillar.icon}
              gradient={pillar.gradient}
              delay={pillar.delay}
              specs={pillar.specs}
            />
          ))}
        </div>

        {/* Section Tarifs — Elegantly adapted for seamless integration into light layout */}
        <div className="mt-24 border-t border-black/[0.08] pt-20" id="pricing-section">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-start">
            <div className="max-w-xl">
              <span className="text-[10px] font-mono tracking-widest text-[#008abf] font-extrabold uppercase mb-2 block">
                / SOLUTIONS ET TARIFS TRANSPARENTS — PARTIE 3
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-zinc-900 leading-tight lowercase">
                tarifs clairs, sans mauvaise surprise, ajustés à vos besoins.
              </h3>
              <p className="text-xs text-zinc-600 mt-2 font-semibold">
                Sélectionnez la formule idéale pour propulser l'activité de votre commerce local et maximiser votre rentabilité dès les premiers mois.
              </p>
            </div>
            <div className="text-right hidden md:block">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Devis personnalisé sous 12h</span>
              <a href="#contact-section" className="text-xs font-black text-[#008abf] hover:opacity-80 transition-opacity underline uppercase block mt-1">Lancer une simulation ↗</a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-start items-stretch max-w-5xl mx-auto" id="pricing-grid">
            {/* Case 1: Vitrine Audacieuse */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-black/[0.06] shadow-lg flex flex-col justify-between"
              id="pricing-card-bold"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest bg-black/[0.05] px-2.5 py-1 rounded">ESSENTIEL</span>
                  <span className="text-xs font-mono font-bold text-zinc-400">01</span>
                </div>
                <h4 className="font-display font-extrabold text-xl text-zinc-900 lowercase mb-1">
                  vitrine audacieuse
                </h4>
                <p className="text-xs text-zinc-650 mb-6 font-medium">
                  Le point d'entrée parfait pour être visible localement avec un design soigné et moderne.
                </p>
                <div className="mb-6 border-b border-black/[0.06] pb-6">
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-3xl font-condensed font-black text-zinc-950 tracking-tight">399 €</span>
                    <span className="text-xs text-zinc-500 font-mono">TTC</span>
                    <span className="text-lg font-condensed font-bold text-zinc-700"> + 21 € / mois</span>
                  </div>
                  <span className="block text-[10px] text-zinc-500 mt-1 font-mono uppercase">engagement 12 mois</span>
                  <div className="border-t border-dashed border-black/[0.06] mt-3 pt-3">
                    <span className="text-xs text-zinc-500 font-semibold font-mono">ou 633 € TTC unique</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {[
                    "Site élégant sur une seule page à haute conversion",
                    "Optimisation mobile ultra-fluide",
                    "Liaison à votre fiche d'établissement Google Maps",
                    "Formulaire de réservation ou contact intégré",
                    "Hébergement ultra-rapide (chargement < 400ms)",
                    "Nom de domaine & certificat SSL inclus 12 mois",
                  ].map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-800 font-medium">
                      <span className="w-4 h-4 rounded-full bg-[#9fff00]/25 text-[#4ea000] flex items-center justify-center mt-0.5 shrink-0">
                        <Check size={10} className="stroke-[3]" />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a 
                href="#contact-section"
                className="w-full text-center py-3.5 rounded-xl border border-black/20 text-xs text-zinc-900 font-mono font-bold uppercase tracking-wider hover:bg-black hover:text-white hover:border-black transition-all block"
              >
                Choisir l'essentiel
              </a>
            </motion.div>

            {/* Case 2: L'Enseigne de Prestige (Popular / Recommended) - Stunning Dark Card anchoring visual attention */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#161619] text-white p-8 rounded-3xl border-2 border-[#9fff00] shadow-xl relative flex flex-col justify-between"
              id="pricing-card-prestige"
            >
              <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-[#9fff00] text-black text-[8px] font-mono font-black tracking-widest uppercase px-3 py-1 rounded-full shadow-md">
                recommandé
              </div>
              
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[9px] font-mono text-zinc-950 bg-[#9fff00] px-2.5 py-1 rounded font-black uppercase tracking-widest">DIAMOND</span>
                  <span className="text-xs font-mono font-bold text-[#9fff00]">02</span>
                </div>
                <h4 className="font-display font-extrabold text-xl text-white lowercase mb-1">
                  l'enseigne de prestige
                </h4>
                <p className="text-xs text-zinc-400 mb-6 font-medium">
                  La formule reine idéale pour dominer votre quartier et attirer une clientèle continue.
                </p>
                <div className="mb-6 border-b border-white/[0.05] pb-6">
                  <span className="text-3xl font-condensed font-black text-white tracking-tight">1 290 €</span>
                  <span className="text-xs text-zinc-400 font-mono"> TTC unique</span>
                  <span className="block text-[10px] text-[#9fff00] mt-1 font-mono uppercase">sans engagement</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {[
                    "Design multi-pages suisse haut de gamme",
                    "Module de rendez-vous tiers (Planity, ZenChef, Calendly)",
                    "Audit approfondi des concurrents de quartier",
                    "SEO sémantique local poussé (mots-clés cibles)",
                    "Indexation prioritaire garantie sur Google Maps",
                    "Assistance technique & support prioritaire 7j/7",
                    "Modifications gratuites incluses pendant 3 mois",
                  ].map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-100 font-medium font-sans">
                      <span className="w-4 h-4 rounded-full bg-[#9fff00] flex items-center justify-center text-zinc-950 mt-0.5 shrink-0">
                        <Check size={10} className="stroke-[4]" />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a 
                href="#contact-section"
                className="w-full text-center py-3.5 rounded-xl bg-[#9fff00] text-black text-xs font-mono font-black uppercase tracking-wider hover:bg-[#8ee000] transition-colors block"
              >
                Gagner en prestige
              </a>
            </motion.div>
          </div>
        </div>

        {/* Symmetrical Mini Quote Banner - Beautifully integrated into light layout */}
        <div className="mt-20 bg-white/75 backdrop-blur-md border border-black/[0.06] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-start shadow-sm">
          <div className="flex gap-4 items-center">
            <div className="w-1.5 h-12 bg-black/10 rounded-full hidden sm:block"></div>
            <div>
              <span className="block text-[9px] font-mono text-zinc-500 uppercase">PHILOSOPHIE DIRECTRICE</span>
              <span className="block text-xs sm:text-sm font-semibold tracking-tight text-zinc-800 lowercase mt-1">
                "93% de vos clients locaux vous recherchent sur google avant de vous rendre visite." — étude d'impact local 2026
              </span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-zinc-800 bg-black/[0.04] border border-black/[0.08] px-3.5 py-1.5 rounded-lg select-none font-bold">
            CONFORMITÉ LOCALE GARANTIE
          </span>
        </div>

      </div>
    </section>
  );
}
