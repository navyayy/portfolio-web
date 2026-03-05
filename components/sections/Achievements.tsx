"use client";

import { Section } from "@/components/layout/Section";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Card } from "@/components/ui/Card";
import type { Achievement } from "@/types/portfolio";

interface AchievementsProps {
  sectionTitle: string;
  subtitle: string;
  items: Achievement[];
}

const iconMap: Record<string, string> = {
  trophy: "trophy",
  google: "search",
  star: "star",
  award: "award",
};

function AchievementIcon({ icon }: { icon: string }) {
  const mapped = iconMap[icon] || icon;
  return (
    <div className="w-10 h-10 rounded-lg bg-surface-overlay border border-border flex items-center justify-center shrink-0">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-accent"
      >
        {mapped === "trophy" && (
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        )}
        {mapped === "search" && (
          <path d="M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16ZM21 21l-4.35-4.35" />
        )}
        {mapped === "star" && (
          <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
        )}
        {mapped === "award" && (
          <path d="M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM8.21 13.89 7 23l5-3 5 3-1.21-9.12" />
        )}
      </svg>
    </div>
  );
}

export function Achievements({ sectionTitle, subtitle, items }: AchievementsProps) {
  return (
    <Section id="achievements">
      <ScrollReveal>
        <h2 className="font-heading text-heading-xl mb-4 text-center">
          <span className="text-accent">{sectionTitle}</span>
        </h2>
        <p className="text-text-secondary text-body-lg text-center mb-12 max-w-2xl mx-auto">
          {subtitle}
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {items.map((item, i) => (
          <ScrollReveal key={item.id} delay={i * 0.1}>
            <Card
              variant={item.highlight ? "elevated" : "outlined"}
              className={item.highlight ? "border-accent/20" : ""}
            >
              <div className="flex items-start gap-4">
                <AchievementIcon icon={item.icon} />
                <div>
                  <h3 className="font-heading text-heading-md text-text-primary mb-1">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-body-sm mb-2">
                    {item.description}
                  </p>
                  <span className="text-text-tertiary text-caption font-mono">
                    {item.year}
                  </span>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
