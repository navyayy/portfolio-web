"use client";

import { Section } from "@/components/layout/Section";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Badge } from "@/components/ui/Badge";
import type { SkillCategory } from "@/types/portfolio";

interface SkillsProps {
  sectionTitle: string;
  subtitle: string;
  categories: SkillCategory[];
  featured: Array<{ name: string; icon: string; level: string }>;
}

export function Skills({ sectionTitle, subtitle, categories }: SkillsProps) {
  const allSkills = categories.flatMap((cat) => cat.skills);
  const midpoint = Math.ceil(allSkills.length / 2);
  const row1 = allSkills.slice(0, midpoint);
  const row2 = allSkills.slice(midpoint);

  return (
    <Section id="skills" containerWidth="full" className="overflow-hidden">
      <div className="max-w-7xl mx-auto mb-12">
        <ScrollReveal>
          <h2 className="font-heading text-heading-xl mb-4 text-center">
            <span className="text-accent">{sectionTitle}</span>
          </h2>
          <p className="text-text-secondary text-body-lg text-center max-w-2xl mx-auto">
            {subtitle}
          </p>
        </ScrollReveal>
      </div>

      {/* Marquee Container */}
      <div className="relative mb-16">
        {/* Fade Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-[8%] sm:w-[15%] bg-linear-to-r from-surface to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-[8%] sm:w-[15%] bg-linear-to-l from-surface to-transparent z-10 pointer-events-none" />

        {/* Row 1 */}
        <div className="flex gap-4 mb-4 hover:[animation-play-state:paused] animate-marquee">
          {[...row1, ...row1, ...row1].map((skill, i) => (
            <Badge key={`r1-${i}`} variant="outlined" size="md">
              {skill}
            </Badge>
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex gap-4 hover:[animation-play-state:paused] animate-marquee-reverse">
          {[...row2, ...row2, ...row2].map((skill, i) => (
            <Badge key={`r2-${i}`} variant="outlined" size="md">
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      {/* Category Cards — bento-style grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
        {categories.map((category, i) => (
          <ScrollReveal
            key={category.name}
            delay={i * 0.06}
            className={
              // First card (Content Management) and third (Marketing Tools) span 2 cols
              i === 0 || i === 2
                ? "col-span-2"
                : "col-span-1"
            }
          >
            <div className="h-full bg-surface-elevated border border-border rounded-2xl p-5 transition-all duration-300 hover:border-accent/30 hover:shadow-md group">
              <h3 className="font-heading text-body-sm text-accent mb-3 tracking-wide">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-2.5 py-1 rounded-full bg-surface-overlay text-text-secondary text-xs font-mono transition-colors group-hover:text-text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
