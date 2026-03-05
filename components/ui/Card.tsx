"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  variant?: "elevated" | "muted" | "outlined";
  hoverable?: boolean;
  className?: string;
}

export function Card({
  children,
  variant = "elevated",
  hoverable = true,
  className,
}: CardProps) {
  const variants = {
    elevated: "card-surface",
    muted: "card-muted",
    outlined: "bg-transparent border border-border hover:border-border-strong",
  };

  return (
    <motion.div
      whileHover={
        hoverable
          ? { y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.08)" }
          : undefined
      }
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn("rounded-2xl p-4 sm:p-6 transition-colors", variants[variant], className)}
    >
      {children}
    </motion.div>
  );
}
