"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "outlined";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "sm",
  className,
}: BadgeProps) {
  const variants = {
    default:
      "bg-surface-overlay border border-border text-text-secondary",
    accent:
      "bg-accent-muted border border-accent/20 text-accent",
    outlined:
      "bg-transparent border border-border text-text-secondary hover:border-border-strong hover:text-text-primary",
  };

  const sizes = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-1.5 text-sm",
  };

  return (
    <motion.span
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "inline-flex items-center rounded-full font-mono transition-colors whitespace-nowrap",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </motion.span>
  );
}
