"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Section } from "@/components/layout/Section";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Badge } from "@/components/ui/Badge";
import type { ExperienceItem } from "@/types/portfolio";

interface ExperienceProps {
  sectionTitle: string;
  subtitle: string;
  items: ExperienceItem[];
}

function TimelineCard({
  item,
  index,
}: {
  item: ExperienceItem;
  index: number;
}) {
  const isLeft = index % 2 === 0;

  return (
    <div
      className={`relative flex flex-col lg:flex-row items-start lg:items-center gap-8 ${
        isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
      }`}
    >
      {/* Card */}
      <ScrollReveal
        direction={isLeft ? "left" : "right"}
        delay={0.1}
        className="lg:w-[calc(50%-2rem)]"
      >
        <div className="bg-surface-elevated border border-border rounded-xl p-6 hover:border-border-strong transition-colors">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-heading text-heading-md text-text-primary">
                {item.role}
              </h3>
              <p className="font-heading text-body-md text-accent">
                {item.company}
              </p>
            </div>
            <Badge variant="outlined" size="sm" className="capitalize">
              {item.type}
            </Badge>
          </div>

          {/* Period & Location */}
          <div className="flex items-center gap-4 text-text-tertiary text-body-sm font-mono mb-4">
            <span>{item.period}</span>
            <span>&middot;</span>
            <span>{item.location}</span>
          </div>

          {/* Highlights */}
          <ul className="space-y-2 mb-4">
            {item.highlights.map((highlight, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-text-secondary text-body-sm"
              >
                <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" />
                {highlight}
              </li>
            ))}
          </ul>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {item.skills.map((skill) => (
              <Badge key={skill} size="sm">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Timeline Node */}
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 z-10">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          className="w-3 h-3 rounded-full bg-accent border-4 border-surface"
        />
      </div>

      {/* Spacer for alternating layout */}
      <div className="hidden lg:block lg:w-[calc(50%-2rem)]" />
    </div>
  );
}

export function Experience({ sectionTitle, subtitle, items }: ExperienceProps) {
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section id="experience">
      <ScrollReveal>
        <h2 className="font-heading text-heading-xl mb-4 text-center">
          <span className="text-accent">{sectionTitle}</span>
        </h2>
        <p className="text-text-secondary text-body-lg text-center mb-10 lg:mb-16 max-w-2xl mx-auto">
          {subtitle}
        </p>
      </ScrollReveal>

      <div ref={timelineRef} className="relative">
        {/* Timeline Line */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2">
          <motion.div
            style={{ height: lineHeight }}
            className="w-full bg-accent origin-top"
          />
        </div>

        {/* Mobile Line */}
        <div className="lg:hidden absolute left-0 top-0 bottom-0 w-px bg-border ml-6" />

        {/* Timeline Items */}
        <div className="space-y-10 lg:space-y-16">
          {items.map((item, index) => (
            <TimelineCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
}
