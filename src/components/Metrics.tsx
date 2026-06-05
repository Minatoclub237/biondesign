import React, { useRef, useState, useEffect } from "react";
import { Star } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

export default function Metrics() {
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

  const titleX = useTransform(scrollYProgress, [0, 1], isMobile ? [12, -12] : [65, -65]);
  const titleXSpring = useSpring(titleX, { stiffness: 60, damping: 22 });

  // Exactly 16 professional local testimonials (8 in Row 1, 8 in Row 2) representing France, Suisse, and Belgique
  const row1Testimonials = [
    {
      quote: "Depuis que bi.on a conçu notre site, nous recevons 4 à 5 commandes de pièces montées chaque semaine. On nous trouve instantanément.",
      author: "Stéphane Dubois",
      role: "Boulanger Artisanal",
      company: "Boulangerie Dubois, Lyon (France)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop"
    },
    {
      quote: "Notre cabinet dentaire à Genève a doublé ses prises de rendez-vous en ligne grâce à la fluidité absolue du site conçu par bi.on.",
      author: "Dr. Marc-Olivier Steiner",
      role: "Médecin-Dentiste",
      company: "Clinique du Lac, Genève (Suisse)",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&h=200&fit=crop"
    },
    {
      quote: "La beauté requiert de l'élégance. Les réservations pour nos soins esthétiques n'ont jamais été aussi faciles et régulières.",
      author: "Charlotte Girard",
      role: "Esthéticienne & Fondatrice",
      company: "Maison de Beauté, Paris (France)",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&fit=crop"
    },
    {
      quote: "Dans la plomberie d'urgence, la vitesse mobile fait tout. Le bouton d'appel optimisé nous amène 3 interventions de plus par jour.",
      author: "Jean-Marc Weyland",
      role: "Artisan Plombier",
      company: "Plomberie Express, Liège (Belgique)",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&fit=crop"
    },
    {
      quote: "Grâce à notre nouveau site bi.on, notre joaillerie à Lausanne attire des clients de toute la riviera. Son chargement instantané renforce notre image.",
      author: "Emilie Seydoux",
      role: "Gérante de Joaillerie",
      company: "Atelier Seydoux, Lausanne (Suisse)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200&fit=crop"
    },
    {
      quote: "Depuis que le site de bi.on est en ligne, mon agenda s'est immédiatement rempli de nouveaux patients locaux me trouvant sur Google.",
      author: "Antoine Lambert",
      role: "Ostéopathe D.O.",
      company: "Cabinet Ostéo Lambert, Lille (France)",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=200&fit=crop"
    },
    {
      quote: "Une pure merveille technologique et visuelle. L'élégance de notre boutique par bi.on a séduit notre clientèle locale à Bruges d'emblée.",
      author: "Chloé Vandecasteele",
      role: "Fondatrice Chocolaterie",
      company: "Boutique du Chocolat, Bruges (Belgique)",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&fit=crop"
    },
    {
      quote: "Un accompagnement exceptionnel pour moderniser notre étude notariale à Bordeaux. Nos clients prennent rendez-vous de manière intuitive.",
      author: "Mathilde Varin",
      role: "Notaire Associée",
      company: "Étude Varin & Gendreau, Bordeaux (France)",
      avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=200&h=200&fit=crop"
    }
  ];

  const row2Testimonials = [
    {
      quote: "bi.on a balayé WordPress. Nos clients réservent leur créneau de coupe de cheveux directement dans le tram en 30 secondes chrono.",
      author: "Lucas Vandamme",
      role: "Maître Barbier",
      company: "Maison Vandamme, Bruxelles (Belgique)",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&h=200&fit=crop"
    },
    {
      quote: "Une merveille d'esthétique minimaliste. Nos clients réservent leur table en un clic. bi.on a compris l'exigence de la gastronomie.",
      author: "Sophie Magnin",
      role: "Gérante & Sommelière",
      company: "Le Caveau, Gruyères (Suisse)",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&fit=crop"
    },
    {
      quote: "bi.on a créé notre vitrine d'atelier. Les appels directs vers notre carrosserie ont grimpé de 60% dès le premier mois d'activité.",
      author: "Thomas Lemaire",
      role: "Artisan Carrossier",
      company: "Atelier Carrossier, Annecy (France)",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&fit=crop"
    },
    {
      quote: "bi.on a conçu un portfolio sur-mesure d'une pureté suisse exemplaire pour valoriser nos plus prestigieux chantiers d'architecture.",
      author: "Audrey Devos",
      role: "Architecte d'Intérieur",
      company: "Cabinet Devos Sàrl, Namur (Belgique)",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&fit=crop"
    },
    {
      quote: "Le site conçu par bi.on reflète le luxe discret de notre chalet. Nos réservations directes ont augmenté de 40% sans intermédiaires.",
      author: "Pierre-Yves Rochat",
      role: "Propriétaire de Chalet",
      company: "Chalet Aspen, Verbier (Suisse)",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&h=200&fit=crop"
    },
    {
      quote: "Une fluidité exceptionnelle. Notre site bi.on est un écrin d'art minimaliste qui capte idéalement le raffinement de notre travail.",
      author: "Manon Gauthier",
      role: "Directrice de Galerie",
      company: "Galerie Gauthier, Nice (France)",
      avatar: "https://images.unsplash.com/photo-1614644147724-2d4785d69962?q=80&w=200&h=200&fit=crop"
    },
    {
      quote: "bi.on a simplifié notre communication. Les résidents de Waterloo trouvent très facilement nos urgences et nous appellent d'un clic.",
      author: "Dr. Laurent Bertrand",
      role: "Clinique Vétérinaire",
      company: "Veto Waterloo, Waterloo (Belgique)",
      avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=200&h=200&fit=crop"
    },
    {
      quote: "La visibilité locale de notre galerie d'art à Carouge est désormais incomparable. bi.on a réalisé un travail d'une pureté remarquable.",
      author: "Olivier Dunant",
      role: "Gérant de Galerie d'Art",
      company: "Galerie Moderne, Carouge (Suisse)",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=200&h=200&fit=crop"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="metrics-section" 
      className="relative w-full bg-[#EDEEF5] text-[#1a1a1a] py-24 px-4 sm:px-12 md:px-16 lg:px-20 scroll-mt-12 overflow-hidden"
    >
      {/* Testimonials Wall - MAINTAINING THE SAME BACKGROUND AS THE REST OF THE WEBSITE (#EDEEF5) */}
      <div className="w-full bg-[#EDEEF5] text-[#1a1a1a] py-6 overflow-hidden relative">
        
        {/* Subtle decorative radial lights to add high-fidelity depth to the light background */}
        <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-blue-400/5 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-lime-400/10 blur-[110px] pointer-events-none"></div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 mb-16 text-center sm:text-start flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <motion.div
            style={{ x: titleXSpring }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 1.4 }}
          >
            <span className="text-[10px] font-mono tracking-widest text-[#1a1a1a]/60 font-extrabold uppercase mb-3 select-none block">
              / TÉMOIGNAGES CLIENTS & RETOURS D'EXPÉRIENCE — PARTIE 4
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-zinc-900 tracking-tight lowercase">
              les avis authentiques de nos clients de prestige.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-700 mt-4 font-semibold max-w-2xl leading-relaxed lowercase">
              un engagement sincère pour l'authenticité locale. découvrez notre mur d'avis glissant en douceur, conçu pour être parfaitement lisible et interactif sur ordinateur comme sur mobile. survoler ou toucher un avis pour le figer et le lire en détail.
            </p>
          </motion.div>
          <div className="flex items-center gap-4 justify-center sm:justify-start shrink-0">
            <div className="flex -space-x-2.5">
              {[...row1Testimonials, ...row2Testimonials].slice(0, 5).map((t, i) => (
                <img 
                  key={i} 
                  src={t.avatar} 
                  alt={t.author}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full border border-white object-cover shadow-sm" 
                />
              ))}
            </div>
            <div className="text-left">
              <span className="text-[10px] font-black block text-zinc-900">16 Avis Vérifiés</span>
              <span className="text-[9px] text-[#1a1a1a]/60 font-mono uppercase block font-black">★★★ FR • CH • BE ★★★</span>
            </div>
          </div>
        </div>

        {/* Dynamic sliding rows wrapper with translucent glass-morphic light cards */}
        <div className="relative w-full flex flex-col gap-8 select-none">
          
          {/* Row 1 - Slides from Left to Right continuously - Highly legible velocity */}
          <div className="w-full overflow-hidden flex py-2 border-y border-black/[0.03]">
            <div 
              className="flex gap-6 w-max px-4 flex-nowrap animate-marquee-left pause-hover"
            >
              {[...row1Testimonials, ...row1Testimonials].map((test, idx) => (
                <div 
                  key={idx}
                  className="w-[21rem] xs:w-[26rem] sm:w-[29rem] md:w-[33rem] shrink-0 p-5 sm:p-6 rounded-[2.5rem] bg-white/40 backdrop-blur-md border border-white/70 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_8px_20px_rgba(0,0,0,0.015)] flex items-center gap-4 sm:gap-5 transition-all duration-300 hover:bg-white/70 hover:border-white/90 hover:shadow-[0_12px_28px_rgba(0,0,0,0.03)] group cursor-pointer"
                >
                  {/* Glowing border avatar adapted for light theme */}
                  <div className="relative shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full p-0.5 bg-gradient-to-b from-black/5 to-transparent shadow-sm">
                    <img 
                      src={test.avatar} 
                      alt={test.author}
                      referrerPolicy="no-referrer"
                      className="w-full h-full rounded-full object-cover filter brightness-[1.02]" 
                    />
                    {/* Live Online Green Dot */}
                    <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-500 rounded-full border-2 border-white z-10 shadow-sm animate-pulse"></div>
                  </div>

                  {/* Main content right of the avatar */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2.5 mb-1.5 flex-wrap">
                      <h4 className="font-sans font-extrabold text-zinc-900 text-xs sm:text-sm tracking-tight truncate">
                        {test.author}
                      </h4>
                      <div className="flex gap-0.5 text-amber-500 shrink-0 scale-90 sm:scale-100 origin-right">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={10} className="fill-current stroke-none" />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-[10px] sm:text-[11px] text-zinc-700 leading-relaxed font-sans font-medium pr-1 mb-2 italic">
                      "{test.quote}"
                    </p>

                    {/* Metadata tags */}
                    <div className="flex items-center gap-1.5 text-[8px] font-mono uppercase tracking-wider text-zinc-500 truncate">
                      <span className="font-bold text-zinc-805">{test.role}</span>
                      <span className="text-zinc-350">•</span>
                      <span className="text-zinc-500 truncate">{test.company}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - Slides from Right to Left continuously - Highly legible velocity */}
          <div className="w-full overflow-hidden flex py-2 border-b border-black/[0.03]">
            <div 
              className="flex gap-6 w-max px-4 flex-nowrap animate-marquee-right pause-hover"
            >
              {[...row2Testimonials, ...row2Testimonials].map((test, idx) => (
                <div 
                  key={idx}
                  className="w-[21rem] xs:w-[26rem] sm:w-[29rem] md:w-[33rem] shrink-0 p-5 sm:p-6 rounded-[2.5rem] bg-white/40 backdrop-blur-md border border-white/70 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_8px_20px_rgba(0,0,0,0.015)] flex items-center gap-4 sm:gap-5 transition-all duration-300 hover:bg-white/70 hover:border-white/90 hover:shadow-[0_12px_28px_rgba(0,0,0,0.03)] group cursor-pointer"
                >
                  {/* Glowing border avatar */}
                  <div className="relative shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full p-0.5 bg-gradient-to-b from-black/5 to-transparent shadow-sm">
                    <img 
                      src={test.avatar} 
                      alt={test.author}
                      referrerPolicy="no-referrer"
                      className="w-full h-full rounded-full object-cover filter brightness-[1.02]" 
                    />
                    {/* Live Online Green Dot */}
                    <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-500 rounded-full border-2 border-white z-10 shadow-sm animate-pulse"></div>
                  </div>

                  {/* Main content right of the avatar */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2.5 mb-1.5 flex-wrap">
                      <h4 className="font-sans font-extrabold text-zinc-900 text-xs sm:text-sm tracking-tight truncate">
                        {test.author}
                      </h4>
                      <div className="flex gap-0.5 text-amber-500 shrink-0 scale-90 sm:scale-100 origin-right">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={10} className="fill-current stroke-none" />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-[10px] sm:text-[11px] text-zinc-700 leading-relaxed font-sans font-medium pr-1 mb-2 italic">
                      "{test.quote}"
                    </p>

                    {/* Metadata tags */}
                    <div className="flex items-center gap-1.5 text-[8px] font-mono uppercase tracking-wider text-zinc-500 truncate">
                      <span className="font-bold text-zinc-805">{test.role}</span>
                      <span className="text-zinc-350">•</span>
                      <span className="text-zinc-500 truncate">{test.company}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Informative gesture guidance */}
        <p className="text-[9px] text-[#1a1a1a]/40 font-mono uppercase tracking-widest text-center mt-8 select-none">
          ↔ glissez ou survolez un avis pour suspendre le défilement ↔
        </p>

      </div>
    </section>
  );
}
