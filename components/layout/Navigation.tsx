"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/types/portfolio";

interface NavigationProps {
  links: NavLink[];
  showProgress?: boolean;
  resumeUrl?: string;
}

export function Navigation({ links, showProgress = true, resumeUrl }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lastScrollY = useRef(0);

  const { scrollYProgress } = useScroll();
  const lenis = useLenis();

  // Hide/show navbar on scroll direction — use ref to avoid stale closure
  useMotionValueEvent(scrollYProgress, "change", () => {
    const currentScrollY = window.scrollY;
    setIsScrolled(currentScrollY > 50);
    setIsVisible(currentScrollY < lastScrollY.current || currentScrollY < 100);
    lastScrollY.current = currentScrollY;
  });

  // Smooth scroll to section using Lenis
  const scrollToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) return;
      e.preventDefault();
      const targetId = href.slice(1);
      const target = document.getElementById(targetId);
      if (target && lenis) {
        lenis.scrollTo(target, { offset: -80, duration: 1.2 });
      } else if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [lenis]
  );

  // Observe sections for active highlight — retries until DOM elements exist
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    function setupObservers() {
      observers.forEach((obs) => obs.disconnect());
      observers.length = 0;

      let allFound = true;

      links.forEach((link) => {
        if (!link.sectionId) return;
        const element = document.getElementById(link.sectionId);
        if (!element) {
          allFound = false;
          return;
        }

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(link.sectionId || "");
            }
          },
          { threshold: 0.2, rootMargin: "-80px 0px -40% 0px" }
        );

        observer.observe(element);
        observers.push(observer);
      });

      return allFound;
    }

    // Sections mount after splash — retry until they exist
    if (!setupObservers()) {
      const interval = setInterval(() => {
        if (setupObservers()) clearInterval(interval);
      }, 200);

      return () => {
        clearInterval(interval);
        observers.forEach((obs) => obs.disconnect());
      };
    }

    return () => observers.forEach((obs) => obs.disconnect());
  }, [links]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-surface/90 backdrop-blur-sm border-b border-border py-3"
            : "bg-transparent py-5"
        )}
      >
        {showProgress && (
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px] bg-accent origin-left"
            style={{ scaleX: scrollYProgress }}
          />
        )}

        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (lenis) {
                lenis.scrollTo(0, { duration: 1.2 });
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="font-display text-xl font-semibold text-text-primary transition-colors cursor-pointer"
          >
            NS<span className="text-accent">.</span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={cn(
                    "text-base font-heading transition-colors relative pb-1 cursor-pointer",
                    activeSection === link.sectionId
                      ? "text-text-primary"
                      : "text-text-tertiary hover:text-text-primary"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 right-0 h-px rounded-full transition-all duration-300",
                      activeSection === link.sectionId
                        ? "opacity-100 bg-accent"
                        : "opacity-0 bg-text-primary"
                    )}
                  />
                </a>
              </li>
            ))}
            {resumeUrl && (
              <li>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-heading text-text-tertiary hover:text-accent transition-colors inline-flex items-center gap-1.5"
                >
                  Resume
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </a>
              </li>
            )}
          </ul>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-3 cursor-pointer"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <motion.span
              animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-text-primary block"
            />
            <motion.span
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-text-primary block"
            />
            <motion.span
              animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-text-primary block"
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-surface/98 backdrop-blur-sm md:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={(e) => {
                    scrollToSection(e, link.href);
                    setMobileMenuOpen(false);
                  }}
                  className="text-2xl font-heading text-text-primary hover:text-accent transition-colors cursor-pointer"
                >
                  {link.label}
                </motion.a>
              ))}
              {resumeUrl && (
                <motion.a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: links.length * 0.1 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-heading text-accent hover:text-text-primary transition-colors inline-flex items-center gap-2"
                >
                  Resume
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </motion.a>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
