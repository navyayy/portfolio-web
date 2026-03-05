"use client";

import { motion, AnimatePresence } from "motion/react";

interface SplashScreenProps {
  isVisible: boolean;
  onExitComplete?: () => void;
}

export function SplashScreen({ isVisible, onExitComplete }: SplashScreenProps) {
  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-[9999] bg-surface flex flex-col items-center justify-center"
        >
          {/* Logo */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-display text-display-xl text-text-primary mb-2 select-none"
          >
            NS<span className="text-accent">.</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="font-heading text-body-md text-text-tertiary mb-8 tracking-wide"
          >
            Content Marketing Executive
          </motion.p>

          {/* Loading bar */}
          <div className="w-32 h-px bg-border overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-accent origin-left"
              animate={{ scaleX: [0, 1, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
