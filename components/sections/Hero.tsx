"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/components/ui/Button";

interface HeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  name: string;
  roles: string[];
}

function useWordCycle(words: string[], interval = 3000) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return words[index];
}

export function Hero({ headline, subheadline, ctaText, ctaLink, name, roles }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const currentRole = useWordCycle(roles, 3000);

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Name */}
        <TextReveal
          text={name}
          as="h1"
          className="font-display text-heading-xl sm:text-display-lg md:text-display-xl lg:text-display-2xl mb-6 text-text-primary"
        />

        {/* Headline */}
        <motion.p
          initial={shouldReduceMotion ? {} : { y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-body-lg md:text-heading-md text-text-secondary max-w-2xl mx-auto mb-6"
        >
          {headline}
        </motion.p>

        {/* Rotating Roles — elegant fade swap */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="h-8 mb-10 relative flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={currentRole}
              initial={shouldReduceMotion ? {} : { y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={shouldReduceMotion ? {} : { y: -8, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-heading text-body-md text-text-tertiary tracking-wide"
            >
              {currentRole}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <Button href={ctaLink} size="lg">
            {ctaText}
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-text-tertiary text-caption uppercase tracking-widest">
            Scroll
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-text-tertiary"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
