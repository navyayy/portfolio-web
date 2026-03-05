"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import type { MetricItem } from "@/types/portfolio";

interface MetricsProps {
  sectionTitle: string;
  items: MetricItem[];
}

export function Metrics({ sectionTitle, items }: MetricsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  if (shouldReduceMotion) {
    return (
      <section id="metrics" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-heading-xl mb-12 text-center">
            <span className="text-accent">{sectionTitle}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-surface-elevated p-5 md:p-8"
              >
                <div className="font-display text-heading-xl sm:text-display-lg text-text-primary mb-2">
                  <AnimatedCounter value={item.value} suffix={item.suffix} />
                </div>
                <h3 className="font-heading text-heading-md text-text-primary mb-2">
                  {item.label}
                </h3>
                <p className="text-text-secondary text-body-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="metrics" ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Title */}
        <div className="px-6 md:px-12 lg:px-20 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-heading-xl"
          >
            <span className="text-accent">{sectionTitle}</span>
          </motion.h2>
        </div>

        {/* Horizontal Scrolling Cards */}
        <motion.div
          style={{ x }}
          className="flex gap-8 pl-6 md:pl-12 lg:pl-20"
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[80vw] sm:w-[350px] md:w-[400px] rounded-xl border border-border bg-surface-elevated p-6 md:p-10"
            >
              <div className="font-display text-display-lg md:text-display-xl text-accent mb-3">
                <AnimatedCounter value={item.value} suffix={item.suffix} />
              </div>
              <h3 className="font-heading text-heading-lg text-text-primary mb-3">
                {item.label}
              </h3>
              <p className="text-text-secondary text-body-md leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
