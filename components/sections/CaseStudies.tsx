"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Section } from "@/components/layout/Section";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Badge } from "@/components/ui/Badge";
import type { CaseStudy } from "@/types/portfolio";

interface CaseStudiesProps {
  sectionTitle: string;
  subtitle: string;
  items: CaseStudy[];
}

// Reference-inspired bento: 3 cols on desktop
// Card 0: tall left (spans 2 rows, 1 col)
// Card 1: top-right (1 row, 2 cols)
// Card 2: bottom-right (1 row, 2 cols)
// Card 3: full-width bottom (1 row, 3 cols)
const gridClasses = [
  "md:col-span-1 md:row-span-2", // tall left
  "md:col-span-2 md:row-span-1", // top right
  "md:col-span-2 md:row-span-1", // bottom right
  "md:col-span-3 md:row-span-1", // full width
];

const rowHeights = [
  "h-[280px] md:h-full",    // tall — fills 2 rows
  "h-[280px]",              // normal
  "h-[280px]",              // normal
  "h-[220px]",              // banner
];

export function CaseStudies({ sectionTitle, subtitle, items }: CaseStudiesProps) {
  return (
    <Section id="case-studies">
      <ScrollReveal>
        <h2 className="font-heading text-heading-xl mb-4 text-center">
          <span className="text-accent">{sectionTitle}</span>
        </h2>
        <p className="text-text-secondary text-body-lg text-center mb-12 max-w-2xl mx-auto">
          {subtitle}
        </p>
      </ScrollReveal>

      {/* Bento Grid — 3 cols, 2 rows + full-width bottom */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:grid-rows-[280px_280px]">
        {items.map((item, i) => (
          <motion.a
            key={item.id}
            href={item.link}
            whileHover={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className={`group block rounded-2xl overflow-hidden relative ${
              gridClasses[i] || "md:col-span-1"
            } ${rowHeights[i] || "h-[280px]"}`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              {item.thumbnail && (
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10" />
            </div>

            {/* Content overlay */}
            <div className="relative h-full flex flex-col justify-end p-6">
              <Badge
                variant="accent"
                size="sm"
                className="self-start mb-3 bg-white/15 border-white/20 text-white backdrop-blur-sm"
              >
                {item.category}
              </Badge>
              <h3 className="font-heading text-heading-md text-white mb-1 group-hover:text-white/90 transition-colors">
                {item.title}
              </h3>
              <p className="text-white/70 text-body-sm font-heading">
                {item.company}
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
