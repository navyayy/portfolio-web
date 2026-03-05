"use client";

import { motion, useReducedMotion } from "motion/react";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "span" | "p";
}

export function TextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.03,
  as: Tag = "h1",
}: TextRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  const characters = text.split("");

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
        style={{ display: "inline-block" }}
      >
        {characters.map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            variants={{
              hidden: { y: 100, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ display: "inline-block" }}
            aria-hidden="true"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
