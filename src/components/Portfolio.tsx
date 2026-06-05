import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import {
  Monitor,
  Smartphone,
  Eye,
  Sparkles,
  Phone,
  Calendar,
  Heart,
  ArrowLeft,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Shield,
  Zap,
  Network,
} from "lucide-react";

// Portfolio project definition
interface Project {
  id: string;
  category: "coiffure" | "restaurant" | "artisanat" | "garage" | "boulanger" | "artiste";
  categoryLabel: string;
  thinTitle: string;
  boldTitle: string;
  description: string;
  detailedDescription: string;
  year: string;
  role: string;
  technologies: string[];
  accentColor: string;
  gradientFrom: string;
  gradientVia: string;
  gradientTo: string;
  accentSecondary: string;
  client: string;
  features: string[];
  videoUrl: string;
  posterUrl: string;
  metricBadge: string;
  mockupContent: {
    heroTitle: string;
    heroSubtitle: string;
    features: string[];
    accentGradient: string;
    structureText: string;
  };
}

export default function Portfolio() {
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

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [simulatorDevice, setSimulatorDevice] = useState<"desktop" | "mobile">("desktop");
  const [simulatedActionMessage, setSimulatedActionMessage] = useState<string | null>(null);
  
  // Track playing states of videoplayers individually
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [mutedVideos, setMutedVideos] = useState<boolean>(true);

  // Scroll ref for horizontal slider
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Video elements references
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  // GSAP — section entrance + staggered cards (after all state declarations)
  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.from("[data-portfolio='header']", {
      y: 60, opacity: 0, duration: 1.1,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
    });

    ScrollTrigger.batch("[data-portfolio='card']", {
      onEnter: (elements) => {
        gsap.fromTo(elements,
          { y: 90, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, duration: 0.85, stagger: 0.12, ease: "power3.out", overwrite: true },
        );
      },
      onEnterBack: (elements) => {
        gsap.fromTo(elements,
          { y: -40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power2.out", overwrite: true },
        );
      },
      start: "top 88%",
    });

  }, { scope: sectionRef, dependencies: [selectedCategory] });

  const projects: Project[] = [
    {
      id: "salon-coiffure",
      category: "coiffure",
      categoryLabel: "Coiffure & Beauté / Salon de Coiffure",
      thinTitle: "",
      boldTitle: "salon de coiffure",
      description: "vitrine de prestige élégante mettant en lumière vos forfaits, coupes signatures et prise de rendez-vous en ligne.",
      detailedDescription: "Pour ce salon de beauté de quartier réputé, nous avons conçu une interface asymétrique et épurée où chaque service de coiffure, soin ou rasage traditionnel est présenté avec des tarifs clairs pour maximiser la fidélisation des résidents.",
      year: "2026",
      role: "Identité Locale & Web",
      technologies: ["React", "Planity direct", "SEO Élite", "350ms"],
      accentColor: "#7030a0",
      gradientFrom: "from-[#e2f0d9]/95",
      gradientVia: "via-[#edf7e8]/60",
      gradientTo: "to-emerald-50/70",
      accentSecondary: "bg-purple-950/10 text-purple-800",
      client: "Maison l'Atelier Coiffure",
      videoUrl: "/videos/salon-coiffure.mp4",
      posterUrl: "/images/poster-salon.jpg",
      metricBadge: "o 30 cases",
      features: [
        "Grille tarifaire claire avec prise de rendez-vous fluide",
        "Galerie photo interactive des soins et coupes phares",
        "Structure moderne de rassurance de satisfaction client",
        "SEO optimisé sur la requête métier locale dédiée"
      ],
      mockupContent: {
        heroTitle: "L'Atelier Coiffure & Beauté",
        heroSubtitle: "Artisan Coiffeur & Visagiste au cœur de votre quartier.",
        features: ["Coupe Création", "Soin Capillaire Hydratant", "Forfait Mariage VIP"],
        accentGradient: "from-zinc-800 to-zinc-950",
        structureText: "COMPOSANTS LOCAUX : PricingGrid, CallInstant, MapLocal"
      }
    },
    {
      id: "sushi-restaurant",
      category: "restaurant",
      categoryLabel: "Restaurant & Gastronomie / Sushi Restaurant",
      thinTitle: "",
      boldTitle: "sushi restaurant",
      description: "ardoise numérique gastronomique, menu adapté sur smartphone et formulaire de réservation tactile immédiate.",
      detailedDescription: "Pour cet authentique sushi restaurant de quartier, nous avons créé une ardoise numérique interactive qui présente fraîches créations et pièces signatures sans latence, avec appel à l'action d'appel direct.",
      year: "2026",
      role: "SEO Gourmet & Développement",
      technologies: ["Vite", "SEO Maps", "Call-To-Click", "Menus 4K"],
      accentColor: "#1f4e79",
      gradientFrom: "from-[#deebf7]/95",
      gradientVia: "via-[#edf4fa]/60",
      gradientTo: "to-blue-50/70",
      accentSecondary: "bg-blue-950/10 text-blue-800",
      client: "Oishi Sushi & Ramen",
      videoUrl: "/videos/sushi-restaurant.mp4",
      posterUrl: "/images/poster-sushi.jpg",
      metricBadge: "o 30 cases",
      features: [
        "Affichage interactif et limpide de la carte sushi & ramen",
        "Bouton d'appel ou réservation en un clic",
        "Données structurées pour une indexation prioritaire Google Maps",
        "Optimisation des temps de chargement pour les mobilités piétonnes"
      ],
      mockupContent: {
        heroTitle: "Oishi Sushi Bar",
        heroSubtitle: "Saveurs d'Asie de saison, sushis frais et créations culinaires.",
        features: ["Assortiment Premium", "Ramen Traditionnel", "Réservation Express"],
        accentGradient: "from-neutral-800 to-stone-900",
        structureText: "COMPOSANTS LOCAUX : InteractiveMenu, DirectBooking, ReviewRoll"
      }
    },
    {
      id: "garage-automobile",
      category: "garage",
      categoryLabel: "Garage & Carrosserie / Garage Automobile",
      thinTitle: "",
      boldTitle: "garage automobile",
      description: "prise de rendez-vous d'intervention, vitrine sérieuse des horaires et guidage GPS en un clic.",
      detailedDescription: "Un site vitrine de grande confiance conçu pour un garage de mécanique générale et carrosserie de quartier. Horaires clairs, garanties préservées et rassurance complète pour les automobilistes de passage.",
      year: "2026",
      role: "SEO Maps & Interface",
      technologies: ["Vite", "Google Maps", "Call-Direct", "Waze Link"],
      accentColor: "#305496",
      gradientFrom: "from-[#eae6f8]/95",
      gradientVia: "via-[#f4f2fb]/60",
      gradientTo: "to-zinc-100/50",
      accentSecondary: "bg-blue-950/10 text-blue-800",
      client: "Carrosserie & Mécanique de l'Est",
      videoUrl: "/videos/garage-automobile.mp4",
      posterUrl: "/images/poster-garage.jpg",
      metricBadge: "o 30 cases",
      features: [
        "Guidage GPS instantané raccordé à Google Maps et Waze",
        "Formulaire simple d'assistance ou d'estimation d'entretien",
        "Mise en avant transparente des tarifs vidange et révision",
        "Garantie constructeur préservée affichée distinctement"
      ],
      mockupContent: {
        heroTitle: "Garage de l'Est",
        heroSubtitle: "Réparation mécanique, carrosserie et diagnostics certifiés toutes constructeurs.",
        features: ["Diagnostic Auto", "Maintenance Courante", "Carrosserie de Pointe"],
        accentGradient: "from-slate-900 to-[#1e293b]",
        structureText: "COMPOSANTS LOCAUX : ServiceBooker, GpsLink, ReviewFeed"
      }
    },
    {
      id: "artisan-electricien",
      category: "artisanat",
      categoryLabel: "Artisans & Électricité / Électricien",
      thinTitle: "",
      boldTitle: "edificio",
      description: "dépannage d'urgence, devis express sous 1h, mise en sécurité de tableau électrique et transparence tarifaire.",
      detailedDescription: "Pour cet artisan électricien local, nous avons construit une solution de contact ultra-rapide axée sur le dépannage de quartier. Bouton d'urgence rétro-éclairé, rassurance de décennale et grille de tarifs forfaitaires clairs pour rassurer instantanément.",
      year: "2026",
      role: "SEO Urgences & Conversion",
      technologies: ["React", "Call 1-Clic", "Google Maps", "PWA Ready"],
      accentColor: "#d69e2e",
      gradientFrom: "from-[#fffbf0]/95",
      gradientVia: "via-[#fffcef]/60",
      gradientTo: "to-yellow-50/70",
      accentSecondary: "bg-amber-950/10 text-amber-800",
      client: "Électricité Générale du Centre",
      videoUrl: "/videos/artisan-batiment.mp4",
      posterUrl: "/images/poster-batiment.jpg",
      metricBadge: "o 30 cases",
      features: [
        "Bouton d'urgence 'Appel Direct' rétro-éclairé",
        "Formulaire de demande de devis simple et rassurance décennale",
        "Horaires d'ouverture de dépannage 24h/7j mis en avant",
        "SEO optimisé sur la requête d'edificio"
      ],
      mockupContent: {
        heroTitle: "Bâtiment du Centre",
        heroSubtitle: "électricité générale, rénovation de bâtiment & mise aux normes de confiance.",
        features: ["Dépannage 24/7", "Mise en Conformité", "Devis Express Gratuit"],
        accentGradient: "from-amber-600 to-yellow-950",
        structureText: "COMPOSANTS LOCAUX : UrgencyButton, PricingSheet, MapsMarker"
      }
    }
  ];

  // Scroll calculation to slide 1 card at a time accurately
  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft } = scrollContainerRef.current;
      // Scroll amount approximately corresponds to the width of one card plus gap (approx 320px)
      const scrollAmount = 320;
      scrollContainerRef.current.scrollTo({
        left: scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount),
        behavior: "smooth"
      });
    }
  };

  const handleSimulatedClick = (message: string) => {
    setSimulatedActionMessage(message);
    setTimeout(() => {
      setSimulatedActionMessage(null);
    }, 4000);
  };

  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  // Play/Pause individual card video (no-op if src is empty)
  const togglePlayVideo = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRefs.current[id];
    if (!video || !video.src || video.src === window.location.href) return;
    if (playingVideoId === id) {
      video.pause();
      setPlayingVideoId(null);
    } else {
      if (playingVideoId && videoRefs.current[playingVideoId]) {
        videoRefs.current[playingVideoId]?.pause();
      }
      video.play().then(() => {
        setPlayingVideoId(id);
      }).catch(() => {
        video.muted = true;
        video.play().then(() => setPlayingVideoId(id)).catch(() => {});
      });
    }
  };

  // Custom Double-badge renderer copying user screenshot
  const renderDoubleBadges = (id: string, accentColor: string) => {
    switch (id) {
      case "salon-coiffure":
        return (
          <div className="flex items-center gap-2">
            {/* Badge 1: Square with theme hexagon/shield icon */}
            <div className="w-10 h-10 rounded-xl bg-white border border-black/[0.04] shadow-sm flex items-center justify-center">
              <div className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center">
                <Shield size={14} className="text-purple-600" />
              </div>
            </div>
            {/* Badge 2: Square with dynamic performance bars logo */}
            <div className="w-10 h-10 rounded-xl bg-white border border-black/[0.04] shadow-sm flex flex-col items-center justify-center gap-0.5">
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-0.75 bg-[#1a1a1a]/30 rounded-full h-1"></span>
                <span className="w-0.75 bg-[#1a1a1a] rounded-full h-3"></span>
                <span className="w-0.75 bg-[#1a1a1a]/60 rounded-full h-2"></span>
              </div>
            </div>
          </div>
        );
      case "sushi-restaurant":
        return (
          <div className="flex items-center gap-2">
            {/* Badge 1: Circle with gauge theme icon */}
            <div className="w-10 h-10 rounded-xl bg-white border border-black/[0.04] shadow-sm flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-900 flex items-center justify-center">
                  <span className="w-1 h-1 rounded-full bg-white"></span>
                </span>
              </div>
            </div>
            {/* Badge 2: Square with zigzag chart */}
            <div className="w-10 h-10 rounded-xl bg-white border border-black/[0.04] shadow-sm flex items-center justify-center">
              <div className="w-6 h-6 rounded-md bg-amber-50 border border-amber-200/50 flex flex-col justify-center items-center gap-[1px]">
                <Zap size={13} className="text-amber-500 fill-amber-300" />
              </div>
            </div>
          </div>
        );
      case "garage-automobile":
        return (
          <div className="flex items-center gap-2">
            {/* Badge 1: Nodes network layout */}
            <div className="w-10 h-10 rounded-xl bg-white border border-black/[0.04] shadow-sm flex items-center justify-center">
              <Network size={14} className="text-indigo-500 animate-pulse" />
            </div>
            {/* Badge 2: Blue custom tag */}
            <div className="w-10 h-10 rounded-xl bg-white border border-black/[0.04] shadow-sm flex items-center justify-center">
              <div className="w-6 h-5 rounded bg-blue-600 flex items-center justify-center text-white font-mono text-[7px] font-extrabold uppercase">
                gps
              </div>
            </div>
          </div>
        );
      case "artisan-electricien":
        return (
          <div className="flex items-center gap-2">
            {/* Badge 1: Zap yellow icon for electricity */}
            <div className="w-10 h-10 rounded-xl bg-white border border-black/[0.04] shadow-sm flex items-center justify-center">
              <Zap size={14} className="text-amber-500 fill-amber-300 pointer-events-none" />
            </div>
            {/* Badge 2: Amber custom tag '24/7' */}
            <div className="w-10 h-10 rounded-xl bg-white border border-black/[0.04] shadow-sm flex items-center justify-center">
              <div className="w-6 h-5 rounded bg-amber-500 flex items-center justify-center text-white font-mono text-[7px] font-extrabold uppercase">
                24h
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-white/90 border border-black/[0.03] shadow-sm flex items-center justify-center">
              <Sparkles size={16} style={{ color: accentColor }} />
            </div>
          </div>
        );
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="portfolio-section" 
      className="relative w-full bg-[#EDEEF5] text-[#1a1a1a] py-24 px-4 sm:px-12 md:px-16 lg:px-20 scroll-mt-12 overflow-hidden"
    >
      {/* Soft decorative visual mesh to emulate user's capture background */}
      <div className="absolute top-1/4 left-1/4 w-[40rem] h-[35rem] rounded-full bg-emerald-200/15 blur-[140px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] rounded-full bg-sky-200/20 blur-[130px] pointer-events-none -z-10"></div>
      <div className="absolute top-1/2 left-2/3 w-[30rem] h-[30rem] rounded-full bg-indigo-200/20 blur-[150px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl w-full mx-auto">
        
        {/* Title and Controls Nav Row */}
        <div data-portfolio="header" className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/[0.05] pb-6 mb-12 gap-6">
          <motion.div
            className="flex flex-col items-start text-start"
            style={{ x: titleXSpring }}
          >
            <span className="text-[10px] font-mono tracking-widest text-[#1a1a1a]/60 font-extrabold uppercase mb-2">/ NOTRE VITRINE LOCALE — PARTIE 2</span>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-zinc-900 tracking-tight lowercase">
              réalisations & démonstrations immersives
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-600 font-semibold tracking-wide lowercase max-w-xl">
              découvrez les vitrines d'artisans, barbiers et tables gourmandes conçues d’après notre charte de prestige. glissez à l'aide des boutons latéraux pour faire défiler nos projets.
            </p>
          </motion.div>

          {/* Slider Left/Right Buttons */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            {/* Filter select */}
            <div className="hidden sm:flex gap-1.5 mr-4" id="grid-filters">
              {["all", "coiffure", "restaurant", "garage", "artisanat"].map((cat) => {
                const labelMap: { [key: string]: string } = {
                  all: "tous",
                  coiffure: "beauté",
                  restaurant: "gastronomie",
                  garage: "mécanique",
                  artisanat: "électricien"
                };
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-tight transition-all duration-300 uppercase cursor-pointer ${
                      selectedCategory === cat 
                        ? "bg-[#1a1a1a] text-white shadow-sm" 
                        : "bg-white/60 text-zinc-600 border border-black/[0.03] hover:bg-white"
                    }`}
                  >
                    {labelMap[cat] || cat}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handleScroll("left")}
              className="p-3 bg-white/70 hover:bg-white text-zinc-800 border border-black/[0.04] rounded-full transition-all active:scale-95 shadow-sm hover:shadow cursor-pointer"
              aria-label="Projet Précédent"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="p-3 bg-white/70 hover:bg-white text-zinc-800 border border-black/[0.04] rounded-full transition-all active:scale-95 shadow-sm hover:shadow cursor-pointer"
              aria-label="Projet Suivant"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Horizontal Slider Container conforming to capture aesthetic */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-10 px-2 -mx-2 select-none snap-x snap-mandatory"
          id="realizations-slider"
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              data-portfolio="card"
              className={`snap-start shrink-0 w-[265px] xs:w-[290px] md:w-[300px] lg:w-[268px] xl:w-[292px] p-5 rounded-[2rem] bg-gradient-to-br ${project.gradientFrom} ${project.gradientVia} ${project.gradientTo} border border-white/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.85),0_15px_35px_rgba(30,41,59,0.025)] flex flex-col justify-between hover:shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_20px_45px_rgba(15,23,42,0.05)] transition-all duration-500`}
              id={`portfolio-card-${project.id}`}
            >
              
              {/* Header inside the Card - Two rounded badges left, bookmark heart on right */}
              <div className="flex items-center justify-between mb-5">
                {renderDoubleBadges(project.id, project.accentColor)}

                {/* bookmark heart / save circle tag right */}
                <button 
                  className="w-10 h-10 rounded-full bg-white/90 border border-black/[0.03] shadow-sm flex items-center justify-center text-zinc-400 hover:text-rose-500 hover:scale-105 transition-all cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSimulatedClick(`Vous avez ajouté "${project.client}" à vos favoris de design !`);
                  }}
                >
                  <Heart size={14} className="fill-current stroke-current" />
                </button>
              </div>

              {/* Video container supporting live user videos loaded later + elegant failover */}
              <div 
                className="relative h-44 sm:h-48 w-full rounded-2xl overflow-hidden bg-black/[0.02] border border-black/[0.04] mb-5 flex items-center justify-center group/video cursor-pointer"
                onClick={(e) => togglePlayVideo(project.id, e)}
                title="Cliquer pour lire le clip de démonstration"
              >
                {/* Real video tag that can play local or uploaded .mp4 files later */}
                <video
                  ref={(el) => {
                    videoRefs.current[project.id] = el;
                  }}
                  src={project.videoUrl}
                  poster={project.posterUrl}
                  loop
                  muted={mutedVideos}
                  playsInline
                  className={`w-full h-full object-cover transition-all duration-700 ${(project.id === "sushi-restaurant" || project.id === "salon-coiffure" || project.id === "garage-automobile" || project.id === "artisan-electricien") ? "scale-[1.25] translate-y-[3%] translate-x-[3%] origin-center" : "group-hover/video:scale-103"}`}
                  onError={(e) => {
                    // Src vide ou invalide : on garde l'élément pour afficher le poster
                    e.currentTarget.removeAttribute("src");
                  }}
                />

                {/* Dark overlay showing play/status icons */}
                <div className="absolute inset-0 bg-neutral-900/10 group-hover/video:bg-neutral-900/25 transition-all duration-300 flex flex-col justify-between p-3">
                  
                  {/* Top tags over the video */}
                  <div className="flex justify-between items-center w-full">
                    <div className="bg-white/90 backdrop-blur-sm shadow px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                      <span className="text-[7px] font-mono font-bold uppercase text-zinc-800">Clip Démo .mp4</span>
                    </div>
                    
                    {/* Audio toggle */}
                    <button
                      className="p-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-black/5 hover:bg-white text-zinc-700 hover:text-black shadow-sm transition-all cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMutedVideos(!mutedVideos);
                      }}
                    >
                      {mutedVideos ? <VolumeX size={10} /> : <Volume2 size={10} />}
                    </button>
                  </div>

                  {/* Play & Pause triggers Centered */}
                  <div className="mx-auto flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/95 text-[#1a1a1a] shadow-lg scale-90 group-hover/video:scale-default transition-all duration-300 pointer-events-none">
                    {playingVideoId === project.id ? (
                      <Pause size={14} className="fill-current" />
                    ) : (
                      <Play size={14} className="fill-current translate-x-0.5" />
                    )}
                  </div>

                  {/* Instructions on bottom overlay */}
                  <div className="text-[7.5px] font-mono uppercase text-white tracking-wider text-center drop-shadow bg-black/30 backdrop-blur-xs py-0.5 px-1 rounded">
                    {playingVideoId === project.id ? "en cours de lecture • clic pour figer" : "cliquer pour animer le projet"}
                  </div>
                </div>
              </div>

              {/* Title Content - Bold black human headings */}
              <div className="text-start flex-grow mb-4">
                <span className="text-[8px] font-mono tracking-widest text-[#1a1a1a]/50 font-bold uppercase mb-1 block">
                  {project.categoryLabel}
                </span>
                <h3 className="font-display font-extrabold text-lg sm:text-xl text-zinc-950 tracking-tight leading-tight mb-2 lowercase">
                  {project.thinTitle} {project.boldTitle}.
                </h3>
                <p className="text-[10px] sm:text-[11px] font-sans text-zinc-600 leading-normal font-semibold lowercase line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Bottom footer bar - Technology tags on left, dynamic custom pill metadata right */}
              <div className="flex items-center justify-between pt-4 border-t border-black/[0.04]">
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span 
                      key={tech} 
                      className={`text-[8px] font-mono uppercase font-bold tracking-tight px-1.5 py-0.5 rounded ${project.accentSecondary}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Aesthetic metric pill right side conforming to capture */}
                <button
                  onClick={() => setActiveProject(project)}
                  className="px-2.5 py-1 rounded-full bg-neutral-900 hover:bg-black text-white text-[9px] font-mono tracking-tight flex items-center gap-1.5 transition-all shadow-sm hover:scale-102 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  <span>{project.metricBadge}</span>
                </button>
              </div>

              {/* Sandbox click action */}
              <button
                onClick={() => setActiveProject(project)}
                className="w-full mt-3 text-center py-2 bg-white/40 group-hover:bg-white/70 rounded-full border border-black/5 hover:border-black/[0.12] text-[9.5px] font-extrabold tracking-wide uppercase flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <Eye size={11} className="text-zinc-600" />
                <span>simuler l'interface ↗</span>
              </button>

            </div>
          ))}
        </div>

        {/* Swipe instruction helper on mobile */}
        <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest text-center mt-4 sm:hidden">
          ↔ balayez avec le doigt pour voir plus de réalisations ↔
        </p>

      </div>

      {/* Interactive HUD Project Simulator Drawer Overlay */}
      <AnimatePresence>
        {activeProject && (
          <div 
            className="fixed inset-0 bg-neutral-950/60 backdrop-blur-md z-50 flex items-center justify-end"
            id="active-simulator-overlay"
          >
            {/* Backdrop cover */}
            <div 
              className="absolute inset-0 cursor-crosshair" 
              onClick={() => setActiveProject(null)}
            ></div>

            {/* Sliding cabinet drawer */}
            <motion.div
              initial={{ x: "100%", opacity: 0.95 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.95 }}
              transition={{ type: "spring", damping: 30, stiffness: 220 }}
              className="relative w-full max-w-3xl h-screen bg-[#EDEEF5] text-zinc-900 shadow-2xl flex flex-col justify-between overflow-y-auto"
              id="active-simulator-panel"
            >
              
              {/* Header */}
              <div className="sticky top-0 bg-[#EDEEF5]/90 backdrop-blur-md border-b border-zinc-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-30">
                <div className="flex flex-col text-start">
                  <span className="text-[9px] font-mono tracking-widest text-[#1a1a1a] uppercase block">Simulateur Interactif de Vitrine</span>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="font-display font-light text-zinc-500 text-sm lowercase">{activeProject.thinTitle}</span>
                    <span className="font-display font-extrabold text-[#1a1a1a] text-sm lowercase">{activeProject.boldTitle}</span>
                  </div>
                </div>

                {/* Mobile/Desktop responsive viewport toggler */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button 
                    onClick={() => setSimulatorDevice("desktop")}
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      simulatorDevice === "desktop" 
                        ? "bg-[#1a1a1a] text-white border-black shadow-md" 
                        : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50"
                    }`}
                    title="Vue Ordinateur (Desktop)"
                  >
                    <Monitor size={14} />
                  </button>
                  <button 
                    onClick={() => setSimulatorDevice("mobile")}
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      simulatorDevice === "mobile" 
                        ? "bg-[#1a1a1a] text-white border-black shadow-md" 
                        : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50"
                    }`}
                    title="Vue Téléphone (Mobile)"
                  >
                    <Smartphone size={14} />
                  </button>

                  <span className="w-px h-6 bg-zinc-200 mx-1"></span>

                  <button 
                    onClick={() => setActiveProject(null)}
                    className="px-4 py-2 rounded-xl bg-white hover:bg-neutral-100 border border-zinc-200 text-xs font-semibold tracking-tight text-zinc-800 cursor-pointer"
                  >
                    Fermer
                  </button>
                </div>
              </div>

              {/* Main inner details */}
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-start">
                
                {/* Meta specifications */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-start">
                  <div className="bg-white p-4 rounded-xl border border-black/[0.03]">
                    <span className="block text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Établissement</span>
                    <span className="text-xs font-bold text-zinc-800 block mt-1">{activeProject.client}</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-black/[0.03]">
                    <span className="block text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Catégorie Créative</span>
                    <span className="text-xs font-bold text-zinc-800 block mt-1 uppercase">{activeProject.categoryLabel}</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-black/[0.03]">
                    <span className="block text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Lancement en Production</span>
                    <span className="text-xs font-bold text-zinc-800 block mt-1 font-mono">{activeProject.year}</span>
                  </div>
                </div>

                {/* Simulated notifications */}
                {simulatedActionMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 shadow-sm text-start"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0 block"></span>
                    <strong>Simulation d'interaction :</strong> {simulatedActionMessage}
                  </motion.div>
                )}

                {/* Responsive Simulated Sandbox */}
                <div className="flex flex-col items-start w-full mb-8">
                  <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider mb-2.5 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                    Rendu réactif simulé ({simulatorDevice === "desktop" ? "Vue Ordinateur" : "Vue Téléphone"})
                  </span>

                  <div className="w-full flex justify-center">
                    <div 
                      className={`bg-white rounded-2xl border border-zinc-350 shadow-md overflow-hidden transition-all duration-500 ${
                        simulatorDevice === "desktop" ? "w-full" : "w-[305px]"
                      }`}
                    >
                      {/* Interactive window bar */}
                      <div className="bg-zinc-100 px-4 py-2 flex items-center justify-between border-b border-zinc-200">
                        <div className="flex gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-red-400"></span>
                          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                          <span className="w-2 h-2 rounded-full bg-green-400"></span>
                        </div>
                        <div className="bg-white text-[8px] font-mono py-0.5 px-3 rounded border border-zinc-200/60 truncate w-3/5 text-zinc-500 text-center select-none">
                          https://{activeProject.id}.fr
                        </div>
                        <span className="text-[6px] font-mono text-zinc-400">SÉCURISÉ SSL</span>
                      </div>

                      {/* Mock Frame Content page with simulated local video inside the device iframe template! */}
                      <div className="h-[460px] overflow-y-auto bg-zinc-50 text-[#1a1a1a] flex flex-col justify-between">
                        
                        {/* Upper Header segment with Background Video simulation */}
                        <div 
                          className={`relative p-6 bg-gradient-to-br ${activeProject.gradientFrom} ${activeProject.gradientTo} text-center flex flex-col justify-between min-h-[22rem] overflow-hidden`}
                        >
                          {/* Live simulated background video running under the layout */}
                          <video 
                            autoPlay 
                            loop 
                            muted 
                            playsInline 
                            src={activeProject.videoUrl}
                            className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-100 scale-[1.28] translate-y-[4%] translate-x-[3%] origin-center"
                            id="simulator-bg-video-element"
                            onError={(e) => {
                              // Fallback if video fails to load
                              e.currentTarget.style.display = "none";
                            }}
                          />

                          {/* Soft semi-transparent overlay to ensure extreme readability without any blur */}
                          <div className="absolute inset-0 bg-white/10 pointer-events-none"></div>

                          {/* Logo row on Top of Video */}
                          <div className="relative z-10 flex justify-between items-center text-[10px] text-zinc-950 border-b border-black/[0.1] pb-4 px-1">
                            <span className="font-display font-black tracking-widest text-[#1a1a1a] uppercase text-xs drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                              {activeProject.id === "sushi-restaurant" ? "sushi restaurant" : activeProject.id === "salon-coiffure" ? "salon de coiffure" : activeProject.id === "garage-automobile" ? "garage automobile" : `${activeProject.thinTitle} ${activeProject.boldTitle}`.trim()}
                            </span>
                            <div className="flex items-center gap-1.5 font-bold text-[10px] text-[#1a1a1a] drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                              <span>Menu</span>
                              <span className="text-xs">☰</span>
                            </div>
                          </div>

                          {/* Main Centerpiece Content - Fully transparent background block, dark visible text directly over the video */}
                          <div className="relative z-10 my-auto py-6 px-2 flex flex-col items-center justify-center text-center">
                            <span className="text-[9px] font-mono tracking-widest text-zinc-950 font-extrabold uppercase mb-2 px-2.5 py-0.5 bg-white/20 backdrop-blur-xs rounded-full border border-black/10 select-none shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                              {activeProject.categoryLabel}
                            </span>
                            <h4 className="font-display font-black text-zinc-950 text-3xl sm:text-4xl tracking-tight leading-none lowercase mb-3.5 drop-shadow-[0_1.5px_1.5px_rgba(255,255,255,0.9)]">
                              {activeProject.mockupContent.heroTitle.toLowerCase()}
                            </h4>
                            <p className="text-[11px] sm:text-xs text-zinc-950 max-w-sm mx-auto font-extrabold lowercase leading-relaxed mb-6 drop-shadow-[0_1px_1px_rgba(255,255,255,0.95)]">
                              {activeProject.mockupContent.heroSubtitle.toLowerCase()}
                            </p>

                            {/* Precise CTA Buttons */}
                            <div className="flex flex-wrap justify-center gap-3">
                              <button 
                                onClick={() => handleSimulatedClick("Le visiteur local a cliqué sur 'Appeler Directement'. Le numéro de téléphone a été immédiatement composé pour une mise en relation tactile.")}
                                className="px-5 py-2.5 bg-zinc-950 hover:bg-zinc-900 text-white text-[10px] font-extrabold rounded-full shadow-md flex items-center gap-2 border border-zinc-950 transition-all cursor-pointer"
                              >
                                <Phone size={11} className="shrink-0 text-white" />
                                <span>Appeler l'Artisan</span>
                              </button>
                              <button 
                                onClick={() => handleSimulatedClick("L'interface ouvre instantanément le calendrier des rendez-vous. Zéro temps de chargement, de quoi optimiser à 100% l'acquisition de clients.")}
                                className="px-5 py-2.5 bg-white hover:bg-zinc-50 text-zinc-950 text-[10px] font-extrabold rounded-full shadow-md flex items-center gap-2 border border-zinc-200/80 transition-all cursor-pointer"
                              >
                                <Calendar size={11} className="shrink-0 text-zinc-850" />
                                <span>Prendre Rendez-vous</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Interactive Prestations & Engagements Bottom Panel mimicking capture exactly */}
                        <div className="relative z-10 p-5 sm:p-6 bg-white border-t border-zinc-150 text-start">
                          <span className="block text-[8px] font-mono uppercase text-zinc-400 tracking-widest font-extrabold mb-4">
                            ENGAGEMENTS CLIENT & PRESTATIONS
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {activeProject.mockupContent.features.map(feat => (
                              <div 
                                key={feat} 
                                className="p-3 bg-zinc-50 border border-zinc-150 rounded-xl flex items-center gap-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.01)] hover:bg-white transition-all"
                              >
                                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 inline-block animate-pulse"></span>
                                <span className="text-[9px] font-extrabold text-zinc-900 tracking-tight">
                                  {feat.toUpperCase()}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Sub features detailed */}
                <div className="text-start">
                  <h4 className="font-display font-bold text-lg text-zinc-900 mb-2 lowercase font-sans">conception & sémantique locale</h4>
                  <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
                    {activeProject.detailedDescription}
                  </p>

                  <h5 className="font-display font-bold text-xs text-zinc-500 uppercase tracking-wider mb-3">CONFORME AUX EXIGENCES GOOGLE</h5>
                  <ul className="space-y-2 mb-8">
                    {activeProject.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-650 font-semibold lowercase">
                        <span className="text-emerald-500 font-extrabold shrink-0">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Call to Action inside simulator drawer */}
                <div className="mt-auto bg-[#1a1a1a] text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-start">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-zinc-450 uppercase uppercase">votre projet similaire ?</span>
                    <span className="text-sm font-semibold tracking-tight text-zinc-100 mt-1">Établissons une charte exclusive conforme à votre identité de quartier.</span>
                  </div>
                  <button
                    onClick={() => {
                      setActiveProject(null);
                      const rfgetTimer = document.getElementById("contact-section");
                      if (rfgetTimer) {
                        rfgetTimer.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="px-4 py-2.5 bg-[#9fff00] text-black hover:bg-[#8ee000] rounded-xl text-xs font-black uppercase transition-all shrink-0 cursor-pointer"
                  >
                    Lancer mon devis gratuit
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
