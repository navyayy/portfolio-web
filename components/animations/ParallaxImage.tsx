"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import Image from "next/image";

interface ParallaxImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  speed?: number;
  className?: string;
}

export function ParallaxImage({
  src,
  alt,
  width,
  height,
  speed = 0.2,
  className,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-speed * 100, speed * 100]
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className || ""}`}>
      <motion.div style={shouldReduceMotion ? {} : { y }}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto object-cover"
        />
      </motion.div>
    </div>
  );
}
