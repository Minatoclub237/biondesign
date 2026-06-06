import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import { 
  Send, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  ChevronDown, 
  Building2, 
  MapPin, 
  Mail, 
  Phone, 
  MessageSquare,
  ArrowRight
} from "lucide-react";

// Importing the generated local image asset
// @ts-ignore
import quoteFormLandscape from "../assets/images/quote_form_landscape.webp";

export default function Contact() {
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

  const [selectedNiche, setSelectedNiche] = useState<string>("coiffeurs-beaute");
  const [selectedCountry, setSelectedCountry] = useState<string>("france");
  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("+33 ");
  const [messageInput, setMessageInput] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Custom Dropdown Open states
  const [isNicheOpen, setIsNicheOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);

  const nicheDropdownRef = useRef<HTMLDivElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (nicheDropdownRef.current && !nicheDropdownRef.current.contains(event.target as Node)) {
        setIsNicheOpen(false);
      }
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const niches = [
    { id: "coiffeurs-beaute", label: "Coiffeurs/Beauté", desc: "Salons de coiffure, stylisme, barbiers & instituts de beauté" },
    { id: "garages-carrosserie", label: "Garages/Carrosserie", desc: "Mécanique générale, carrosserie & entretien automobile de précision" },
    { id: "restaurants", label: "Restaurants", desc: "Bistrots, brasseries, pizzerias & gastronomie traditionnelle" },
    { id: "artisans-batiment", label: "Artisans Bâtiment", desc: "Maçonnerie, peinture, menuiserie & rénovateurs généraux" },
    { id: "plombiers-electriciens", label: "Plombiers/Électriciens", desc: "Dépannages urgents, installations électriques & réseaux sanitaires" },
    { id: "photographes", label: "Photographes", desc: "Portraits professionnels, mariages, événements & packshots produits" },
    { id: "fitness-yoga", label: "Fitness/Yoga", desc: "Studios de yoga, coaching personnalisé & centres de remise en forme" },
    { id: "wedding-planners", label: "Wedding Planners", desc: "Organisation événementielle, mariages de prestige & réceptions d'exception" },
    { id: "paysagistes", label: "Paysagistes", desc: "Aménagement extérieur, élagage & création d'espaces verts" },
    { id: "immobilier-indep", label: "Immobilier Indép.", desc: "Mandataires d'exception, agents indépendants & conseillers de secteur" },
    { id: "boulangers-patissiers", label: "Boulangers/Pâtissiers", desc: "Boulangeries d'antan, gâteaux événementiels & pâtisseries fines" },
    { id: "opticiens", label: "Opticiens", desc: "Création de montures, contrôle de la vue & lunetterie de confiance" },
    { id: "veterinaires", label: "Vétérinaires", desc: "Cabinets de soins vétérinaires & accompagnements de compagnie" },
    { id: "dentistes", label: "Dentistes", desc: "Chirurgie dentaire d'excellence & hygiène bucco-dentaire" },
    { id: "decorateurs-interieur", label: "Décorateurs Intérieur", desc: "Harmonisation d'espaces, agencement de mobilier & architecture de vie" },
    { id: "traiteurs", label: "Traiteurs", desc: "Cocktails dînatoires, buffets gourmands & traiteur événementiel" },
    { id: "tatoueurs", label: "Tatoueurs", desc: "Création artistique sur peau dermique & dessins sur mesure" },
    { id: "coachs-naturopathes", label: "Coachs/Naturopathes", desc: "Hygiène de vie, soins au naturel & développement personnel" },
    { id: "fleuristes", label: "Fleuristes", desc: "Compositions de fleurs fraîches, bouquets de saison & décors" },
    { id: "bijoutiers", label: "Bijoutiers", desc: "Joaillerie artisanale, horlogerie d'art & réparation fine" },
    { id: "auto-ecoles", label: "Auto-Écoles", desc: "Formation à la conduite, code de la route & permis accéléré" },
    { id: "hotels-gites", label: "Hôtels/Gîtes", desc: "Hôtellerie locale, gîtes d'étape & chambres d'hôtes de charme" },
    { id: "kines-osteopathes", label: "Kinés/Ostéopathes", desc: "Soins de kinésithérapie, manipulation manuelle & rééducation" },
    { id: "pompes-funebres", label: "Pompes Funèbres", desc: "Marbrerie, prévoyance funéraire & accompagnement des familles" },
    { id: "epiceries-cavistes", label: "Épiceries/Cavistes", desc: "Sélection de spiritueux et vins fins, épicerie de terroirs" }
  ];

  const countries = [
    { id: "france", label: "France", desc: "Hébergement écoresponsable local" },
    { id: "belgique", label: "Belgique", desc: "Zéro latence Bruxelles & Flandres" },
    { id: "suisse", label: "Suisse", desc: "Hébergement ultra-sécurisé & stable" }
  ];

  // Real SVG flags — render identically across all OS/browsers (emoji flags fail on Windows)
  const flagFor = (id: string) => {
    const common = "inline-block w-5 h-3.5 rounded-[3px] shrink-0 shadow-[0_0_0_1px_rgba(255,255,255,0.12)] object-cover";
    if (id === "france")
      return (
        <svg viewBox="0 0 3 2" className={common} aria-hidden="true">
          <rect width="3" height="2" fill="#fff" />
          <rect width="1" height="2" fill="#0055A4" />
          <rect x="2" width="1" height="2" fill="#EF4135" />
        </svg>
      );
    if (id === "belgique")
      return (
        <svg viewBox="0 0 3 2" className={common} aria-hidden="true">
          <rect width="1" height="2" fill="#000" />
          <rect x="1" width="1" height="2" fill="#FAE042" />
          <rect x="2" width="1" height="2" fill="#ED2939" />
        </svg>
      );
    // suisse
    return (
      <svg viewBox="0 0 32 32" className={common} aria-hidden="true">
        <rect width="32" height="32" fill="#D52B1E" />
        <rect x="13" y="6" width="6" height="20" fill="#fff" />
        <rect x="6" y="13" width="20" height="6" fill="#fff" />
      </svg>
    );
  };

  const phonePlaceholders: Record<string, string> = {
    france: "Ex. +33 6 00 00 00 00",
    belgique: "Ex. +32 400 00 00 00",
    suisse: "Ex. +41 79 000 00 00"
  };

  const handleCountrySelection = (countryId: string) => {
    setSelectedCountry(countryId);
    
    const prefixes: Record<string, string> = {
      france: "+33 ",
      belgique: "+32 ",
      suisse: "+41 "
    };
    
    const oldPrefixes = ["+33 ", "+32 ", "+41 "];
    const newPrefix = prefixes[countryId] || "";
    
    const currentClean = phoneInput.trim();
    if (currentClean === "" || oldPrefixes.some(p => p.trim() === currentClean)) {
      setPhoneInput(newPrefix);
    } else {
      let swapped = false;
      for (const oldPrefix of oldPrefixes) {
        if (phoneInput.startsWith(oldPrefix)) {
          setPhoneInput(newPrefix + phoneInput.slice(oldPrefix.length));
          swapped = true;
          break;
        }
      }
      if (!swapped) {
        if (phoneInput.startsWith("0")) {
          setPhoneInput(newPrefix + phoneInput.slice(1));
        } else if (!phoneInput.startsWith("+")) {
          setPhoneInput(newPrefix + phoneInput);
        }
      }
    }
  };

  const currentNicheObj = niches.find(n => n.id === selectedNiche) || niches[0];
  const currentCountryObj = countries.find(c => c.id === selectedCountry) || countries[0];

  const prefixes: Record<string, string> = { france: "+33 ", belgique: "+32 ", suisse: "+41 " };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (
      emailInput.trim().length > 3 &&
      nameInput.trim().length > 1 &&
      cityInput.trim().length > 1 &&
      phoneInput.trim().length > 4
    ) {
      setIsSubmitting(true);
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: nameInput,
            email: emailInput,
            phone: phoneInput,
            city: cityInput,
            niche: selectedNiche,
            nicheLabel: currentNicheObj.label,
            country: selectedCountry,
            countryLabel: currentCountryObj.label,
            message: messageInput,
          }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Erreur réseau, veuillez réessayer.");
        }

        setContactSuccess(true);
        setTimeout(() => {
          setContactSuccess(false);
          setEmailInput("");
          setNameInput("");
          setCityInput("");
          setPhoneInput(prefixes[selectedCountry] || "+33 ");
          setMessageInput("");
        }, 6500);
      } catch (err: unknown) {
        setSubmitError(err instanceof Error ? err.message : "Une erreur est survenue.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="contact-section" 
      className="relative w-full bg-[#EDEEF5] text-[#1a1a1a] py-24 px-4 sm:px-12 md:px-16 lg:px-20 scroll-mt-12"
    >
      <div className="max-w-6xl w-full mx-auto">
        
        {/* Section Header */}
        <motion.div 
          className="flex flex-col items-center mb-16 text-center"
          style={{ x: titleXSpring }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ ease: [0.16, 1, 0.3, 1], duration: 1.4 }}
        >
          <span className="text-[10px] font-mono tracking-widest text-zinc-800 font-extrabold uppercase mb-3 select-none">
            / FORMULAIRE DE DEVIS RAPIDE & AUDIT GOOGLE — PARTIE 5
          </span>
          <h2 className="font-display text-4xl sm:text-5xl tracking-tight mb-4 select-none leading-tight font-extrabold lowercase">
            <span className="font-light text-zinc-800 block">lancez votre vitrine locale dans l’</span>
            <span className="font-black uppercase text-[#1a1a1a]">orbite de son quartier.</span>
          </h2>
          <p className="text-xs sm:text-sm font-sans font-semibold text-[#1a1a1a]/80 max-w-lg leading-relaxed lowercase">
            demandez une étude d’implantation et une maquette gratuite sous 12h. nous analysons vos concurrents de quartier et la disponibilité de votre marque.
          </p>
        </motion.div>

        {/* Outer Split Card Container (Inspired by the User's Screenshot) */}
        <div className="bg-[#121318] text-zinc-100 rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/[0.04]">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[660px]">
            
            {/* LEFT COLUMN: GORGEOUS LANDSCAPE IMAGE (Inspired by User Screenshot description) */}
            <div className="lg:col-span-5 relative hidden lg:block overflow-hidden bg-zinc-950">
              <img 
                src={quoteFormLandscape} 
                alt="Minimalist Sunset Desert Mountain"
                className="w-full h-full object-cover select-none pointer-events-none scale-105 hover:scale-100 transition-transform duration-1000 ease-out"
                referrerPolicy="no-referrer"
              />
              {/* Warm dark overlay for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#121318] via-[#121318]/25 to-[#121318]/50 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#121318]/10 via-amber-900/5 to-transparent mix-blend-color-burn" />

              {/* Aesthetic Floating Text */}
              <div className="absolute bottom-10 left-10 right-10 space-y-4">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9fff00] animate-pulse"></span>
                  <span className="text-[9px] font-mono font-bold tracking-widest text-white uppercase uppercase-latin">studio en ligne</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-2xl tracking-tight text-white lowercase">
                    rejoignez la charte de prestige.
                  </h3>
                  <p className="text-[10px] font-mono text-zinc-400 mt-2 lowercase leading-relaxed max-w-sm">
                    une présence locale optimisée sur google maps garante d'une autorité infaillible dans votre région à lyon, bruxelles ou aux abords du léman.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: SLATE DARK THEME QUOTE FORM WITH DROPDOWNS AND DETAILED INPUTS */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
              <div>
                
                {/* Upper Status Line */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800/60">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
                    DEVIS DE COMMERCE LOCAL & AUDIT IMMÉDIAT
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#9fff00]"></span>
                    <span className="text-[9px] text-[#9fff00] font-mono font-bold uppercase tracking-widest">
                      100% gratuit
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6" id="interactive-specification-form">
                  
                  {/* Step 1: Secteur d'activité - Custom Dropdown */}
                  <div className="space-y-2 relative" ref={nicheDropdownRef}>
                    <label className="text-[9px] font-mono font-extrabold text-zinc-400 uppercase tracking-widest block">
                      Étape 1 : Secteur d'activité local / Niche
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsNicheOpen(!isNicheOpen)}
                      className="w-full bg-[#1c1d22] border border-zinc-850 hover:bg-[#202227] hover:border-zinc-700 px-4 py-3.5 rounded-xl text-left transition-all flex items-center justify-between cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#9fff00]/30 group"
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-white group-hover:text-zinc-200">
                          {currentNicheObj.label}
                        </span>
                        <span className="text-[9px] text-zinc-500 lowercase mt-0.5">
                          {currentNicheObj.desc}
                        </span>
                      </div>
                      <ChevronDown size={14} className={`text-zinc-500 group-hover:text-white transition-transform ${isNicheOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isNicheOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute z-20 top-full left-0 right-0 mt-1.5 bg-[#1a1b20] border border-zinc-800 rounded-xl shadow-2xl overflow-hidden max-h-[220px] overflow-y-auto divide-y divide-zinc-800/50"
                        >
                          {niches.map((n) => (
                            <button
                              key={n.id}
                              type="button"
                              onClick={() => {
                                setSelectedNiche(n.id);
                                setIsNicheOpen(false);
                              }}
                              className={`w-full p-3.5 text-left transition-all hover:bg-zinc-800/80 flex items-center justify-between ${
                                selectedNiche === n.id ? "bg-zinc-800/50" : ""
                              }`}
                            >
                              <div className="flex flex-col">
                                <span className={`text-[11px] font-bold ${selectedNiche === n.id ? "text-[#9fff00]" : "text-zinc-200"}`}>
                                  {n.label}
                                </span>
                                <span className="text-[9px] text-zinc-500 lowercase mt-0.5">
                                  {n.desc}
                                </span>
                              </div>
                              {selectedNiche === n.id && (
                                <Check size={12} className="text-[#9fff00] shrink-0 ml-2" />
                              )}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Step 2: Pays d'implantation - Custom Dropdown */}
                  <div className="space-y-2 relative" ref={countryDropdownRef}>
                    <label className="text-[9px] font-mono font-extrabold text-zinc-400 uppercase tracking-widest block">
                      Étape 2 : Pays d’implantation
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsCountryOpen(!isCountryOpen)}
                      className="w-full bg-[#1c1d22] border border-zinc-850 hover:bg-[#202227] hover:border-zinc-700 px-4 py-3.5 rounded-xl text-left transition-all flex items-center justify-between cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#9fff00]/30 group"
                    >
                      <div className="flex items-center gap-2.5">
                        {flagFor(currentCountryObj.id)}
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-white group-hover:text-zinc-200">
                            {currentCountryObj.label}
                          </span>
                          <span className="text-[9px] text-zinc-500 lowercase mt-0.5">
                            {currentCountryObj.desc}
                          </span>
                        </div>
                      </div>
                      <ChevronDown size={14} className={`text-zinc-500 group-hover:text-white transition-transform ${isCountryOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isCountryOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute z-20 top-full left-0 right-0 mt-1.5 bg-[#1a1b20] border border-zinc-805 rounded-xl shadow-2xl overflow-hidden divide-y divide-zinc-800/50"
                        >
                          {countries.map((c) => (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => {
                                handleCountrySelection(c.id);
                                setIsCountryOpen(false);
                              }}
                              className={`w-full p-3.5 text-left transition-all hover:bg-zinc-800/80 flex items-center justify-between ${
                                selectedCountry === c.id ? "bg-zinc-800/50" : ""
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                {flagFor(c.id)}
                                <div className="flex flex-col">
                                  <span className={`text-[11px] font-bold ${selectedCountry === c.id ? "text-[#9fff00]" : "text-zinc-200"}`}>
                                    {c.label}
                                  </span>
                                  <span className="text-[9px] text-zinc-500 lowercase mt-0.5">
                                    {c.desc}
                                  </span>
                                </div>
                              </div>
                              {selectedCountry === c.id && (
                                <Check size={12} className="text-[#9fff00] shrink-0 ml-2" />
                              )}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Step 3: Text Inputs */}
                  <div className="space-y-4">
                    <label className="text-[9px] font-mono font-extrabold text-zinc-400 uppercase tracking-widest block border-b border-zinc-800/40 pb-1">
                      Étape 3 : Coordonnées de l’établissement
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Company Name */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name-input" className="text-[8px] font-mono font-bold text-zinc-400 uppercase flex items-center gap-1">
                          <Building2 size={10} className="text-zinc-500" /> Nom de l'enseigne
                        </label>
                        <input 
                          id="name-input"
                          type="text" 
                          required
                          value={nameInput}
                          onChange={(e) => setNameInput(e.target.value)}
                          placeholder="Ex. Salon Barberousse, Coiffeur..."
                          className="bg-[#1c1d22] border border-zinc-800 focus:border-[#9fff00]/70 focus:outline-none focus:ring-1 focus:ring-[#9fff00]/20 px-4 py-3 rounded-xl text-white text-xs placeholder-zinc-550 font-sans font-medium transition-colors"
                        />
                      </div>

                      {/* City */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="city-input" className="text-[8px] font-mono font-bold text-zinc-400 uppercase flex items-center gap-1">
                          <MapPin size={10} className="text-zinc-500" /> Ville d’implantation
                        </label>
                        <input 
                          id="city-input"
                          type="text" 
                          required
                          value={cityInput}
                          onChange={(e) => setCityInput(e.target.value)}
                          placeholder="Ex. Lyon, Genève, Bruxelles..."
                          className="bg-[#1c1d22] border border-zinc-800 focus:border-[#9fff00]/70 focus:outline-none focus:ring-1 focus:ring-[#9fff00]/20 px-4 py-3 rounded-xl text-white text-xs placeholder-zinc-550 font-sans font-medium transition-colors"
                        />
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email-input" className="text-[8px] font-mono font-bold text-zinc-400 uppercase flex items-center gap-1">
                          <Mail size={10} className="text-zinc-500" /> Votre e-mail de contact
                        </label>
                        <input 
                          id="email-input"
                          type="email" 
                          required
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          placeholder="Ex. contact@salon.com"
                          className="bg-[#1c1d22] border border-zinc-800 focus:border-[#9fff00]/70 focus:outline-none focus:ring-1 focus:ring-[#9fff00]/20 px-4 py-3 rounded-xl text-white text-xs placeholder-zinc-550 font-sans font-medium transition-colors"
                        />
                      </div>

                      {/* Phone Number */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="phone-input" className="text-[8px] font-mono font-bold text-zinc-400 uppercase flex items-center gap-1">
                          <Phone size={10} className="text-zinc-500" /> Numéro de téléphone
                        </label>
                        <input 
                          id="phone-input"
                          type="tel" 
                          required
                          value={phoneInput}
                          onChange={(e) => setPhoneInput(e.target.value)}
                          placeholder={phonePlaceholders[selectedCountry] || "Ex. +33 6 00 00 00 00"}
                          className="bg-[#1c1d22] border border-zinc-800 focus:border-[#9fff00]/70 focus:outline-none focus:ring-1 focus:ring-[#9fff00]/20 px-4 py-3 rounded-xl text-white text-xs placeholder-zinc-550 font-sans font-medium transition-colors"
                        />
                      </div>

                    </div>

                    {/* Question / Text area */}
                    <div className="flex flex-col gap-1.5 pt-1">
                      <label htmlFor="message-input" className="text-[8px] font-mono font-bold text-zinc-400 uppercase flex items-center gap-1">
                        <MessageSquare size={10} className="text-zinc-500" /> Spécificité recherchée (le cas échéant)
                      </label>
                      <textarea 
                        id="message-input"
                        rows={2}
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="Ex. Intégration d'un module de réservation Planity, boutique e-commerce..."
                        className="bg-[#1c1d22] border border-zinc-800 focus:border-[#9fff00]/70 focus:outline-none focus:ring-1 focus:ring-[#9fff00]/20 px-4 py-3 rounded-xl text-white text-xs placeholder-zinc-550 font-sans font-medium transition-colors resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto bg-[#9fff00] hover:bg-[#8ee600] disabled:opacity-60 disabled:cursor-not-allowed text-black px-8 py-4 rounded-full text-xs font-black tracking-tight transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer shadow-[0_4px_24px_rgba(159,255,0,0.25)] group"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-3.5 h-3.5 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                          <span className="uppercase">Envoi en cours…</span>
                        </>
                      ) : (
                        <>
                          <span className="uppercase">Calculer mon audit local gratuit</span>
                          <ArrowRight size={13} className="text-black group-hover:translate-x-1 transition-transform stroke-[2.5]" />
                        </>
                      )}
                    </button>

                    <span className="text-[9px] font-mono text-zinc-500 uppercase select-none font-bold">
                      Audit sous 12h / Devis sans engagement
                    </span>
                  </div>

                  {/* Error message */}
                  <AnimatePresence>
                    {submitError && (
                      <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="mt-4 text-xs text-red-400 font-mono bg-red-950/30 border border-red-900/40 rounded-xl px-4 py-3"
                      >
                        {submitError}
                      </motion.p>
                    )}
                  </AnimatePresence>

                </form>

                {/* Toast Success Message */}
                <AnimatePresence>
                  {contactSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      className="mt-6 p-5 bg-[#1c2e22] border border-[#2b5933] rounded-2xl flex items-start gap-3.5 mx-auto text-start"
                      id="form-success-toast"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#9fff00]/25 text-[#9fff00] flex items-center justify-center flex-shrink-0 font-extrabold mt-0.5 text-xs">
                        ✓
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#9fff00] lowercase">étude de visibilité locale initialisée !</span>
                        <p className="text-[10px] font-mono font-bold text-zinc-300 mt-1 leading-relaxed">
                          Merci {nameInput || 'pour votre raccordement'}. Nous analysons dès maintenant les concurrents actifs à {cityInput || 'dans votre région'} pour proposer le plan de visibilité maximale sur Google Maps. Le rapport de performance ainsi que la proposition de maquette ont été envoyés à {emailInput}. Nous pourrons vous joindre également par téléphone au {phoneInput}.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

              {/* Symmetrical specification specs footer */}
              <div className="grid grid-cols-3 gap-4 border-t border-zinc-800/50 pt-6 mt-8 text-center select-none">
                <div>
                  <span className="block text-lg font-display font-black text-white">24-48 HEURES</span>
                  <span className="text-[8px] font-mono uppercase tracking-wider text-zinc-500">temps de livraison</span>
                </div>
                <div>
                  <span className="block text-lg font-display font-black text-white">HTTPS</span>
                  <span className="text-[8px] font-mono uppercase tracking-wider text-zinc-500">sécurité ssl incluse</span>
                </div>
                <div>
                  <span className="block text-lg font-display font-black text-white">MAPS</span>
                  <span className="text-[8px] font-mono uppercase tracking-wider text-zinc-500">raccordement prioritaire</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
