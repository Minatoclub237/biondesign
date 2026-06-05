import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";

interface TabItem {
  label: string;
  href: string;
}

const TABS: TabItem[] = [
  { label: "Portfolio", href: "#portfolio-section" },
  { label: "Prestations", href: "#services-section" },
  { label: "Tarifs", href: "#pricing-section" },
  { label: "Garanties", href: "#metrics-section" },
];

export const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  
  const [selected, setSelected] = useState(-1);
  const tabsRef = useRef<(HTMLLIElement | null)[]>([]);

  // Update cursor position based on matching active scroll segment or mouse hover
  useEffect(() => {
    // Attempt to match the hash if present, or just leave it at default
    const handleHashChange = () => {
      const hash = window.location.hash;
      const index = TABS.findIndex((tab) => tab.href === hash);
      if (index !== -1) {
        setSelected(index);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (selected >= 0) {
      const selectedTab = tabsRef.current[selected];
      if (selectedTab) {
        const { width } = selectedTab.getBoundingClientRect();
        setPosition({
          left: selectedTab.offsetLeft,
          width,
          opacity: 1,
        });
      }
    } else {
      setPosition((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [selected]);

  return (
    <ul
      onMouseLeave={() => {
        if (selected >= 0) {
          const selectedTab = tabsRef.current[selected];
          if (selectedTab) {
            const { width } = selectedTab.getBoundingClientRect();
            setPosition({
              left: selectedTab.offsetLeft,
              width,
              opacity: 1,
            });
          }
        } else {
          setPosition((prev) => ({ ...prev, opacity: 0 }));
        }
      }}
      className="relative flex w-fit rounded-full border border-black/10 bg-white/75 backdrop-blur-md p-1.5 shadow-sm"
    >
      {TABS.map((tab, i) => (
        <Tab
          key={tab.label}
          href={tab.href}
          ref={(el) => {
            tabsRef.current[i] = el;
          }}
          setPosition={setPosition}
          onClick={() => setSelected(i)}
        >
          {tab.label}
        </Tab>
      ))}

      <Cursor position={position} />
    </ul>
  );
};

interface TabProps {
  children: React.ReactNode;
  href: string;
  setPosition: React.Dispatch<
    React.SetStateAction<{ left: number; width: number; opacity: number }>
  >;
  onClick: () => void;
}

const Tab = React.forwardRef<HTMLLIElement, TabProps>(
  ({ children, href, setPosition, onClick }, ref) => {
    return (
      <li
        ref={ref}
        onClick={(e) => {
          onClick();
          // Let the default anchor click trigger hash change / scroll
        }}
        onMouseEnter={() => {
          if (!ref || typeof ref === "function" || !ref.current) return;

          const { width } = ref.current.getBoundingClientRect();

          setPosition({
            left: ref.current.offsetLeft,
            width,
            opacity: 1,
          });
        }}
        className="relative z-10 block cursor-pointer transition-colors duration-200"
      >
        <a
          href={href}
          className="block px-4 py-1.5 text-[11px] font-bold tracking-widest uppercase text-[#1a1a1a] select-none"
        >
          {children}
        </a>
      </li>
    );
  }
);

Tab.displayName = "Tab";

interface CursorProps {
  position: { left: number; width: number; opacity: number };
}

const Cursor = ({ position }: CursorProps) => {
  return (
    <motion.li
      animate={{
        left: position.left,
        width: position.width,
        opacity: position.opacity,
      }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
      className="absolute z-0 h-7 rounded-full bg-black/[0.08]"
    />
  );
};
