"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  [key: `data-${string}`]: string | undefined;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  const variants = {
    primary:
      "bg-text-primary text-surface hover:bg-text-secondary",
    secondary:
      "bg-transparent border border-border-strong text-text-primary hover:border-text-primary",
    ghost:
      "bg-transparent text-text-secondary hover:text-text-primary",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3 text-base",
  };

  const baseClasses = cn(
    "inline-flex items-center justify-center rounded-full font-heading font-medium transition-all min-h-[44px]",
    variants[variant],
    sizes[size],
    className
  );

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring" as const, stiffness: 400, damping: 17 },
  };

  if (href) {
    return (
      <motion.a href={href} className={baseClasses} {...motionProps} {...rest}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={baseClasses}
      {...motionProps}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
