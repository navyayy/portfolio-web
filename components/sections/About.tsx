"use client";

import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import type { AboutSection } from "@/types/portfolio";

interface AboutProps extends AboutSection {
  profileImage?: string;
}

export function About({
  shortBio,
  philosophy,
  backgroundText,
  backgroundSubtext,
  highlights,
  funFacts,
  profileImage,
}: AboutProps) {
  return (
    <Section id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left: Photo */}
        <ScrollReveal direction="left">
          <div className="relative rounded-2xl bg-surface-overlay border border-border overflow-hidden">
            {/* Background text — between card bg and photo */}
            <div className="absolute top-1 left-5 right-5 z-[1] select-none pointer-events-none" aria-hidden="true">
              <p className="font-accent text-[2.5rem] sm:text-[3.5rem] lg:text-[5.5rem] leading-none text-border-strong italic tracking-tight">
                {backgroundText || "storyteller"}
              </p>
              <p className="font-heading text-xs uppercase tracking-[0.35em] text-text-tertiary mt-1">
                {backgroundSubtext || "content · strategy · growth"}
              </p>
            </div>
            {/* Profile photo — sits on top of text */}
            <div className="aspect-square relative z-[2]">
              <Image
                src={profileImage || "/images/pfp.png"}
                alt="Navya Srivastav"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Right: Content */}
        <div>
          <ScrollReveal>
            <h2 className="font-heading text-heading-xl mb-2">
              About <span className="text-accent">Me</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-text-secondary text-body-lg leading-relaxed mb-8">
              {shortBio}
            </p>
          </ScrollReveal>

          {/* Philosophy */}
          <ScrollReveal delay={0.2}>
            <blockquote className="border-l-2 border-accent pl-6 mb-8">
              <p className="font-accent text-heading-md text-text-primary italic">
                &ldquo;{philosophy}&rdquo;
              </p>
            </blockquote>
          </ScrollReveal>

          {/* Highlights */}
          <div className="space-y-3 mb-8">
            {highlights.map((highlight, i) => (
              <ScrollReveal key={i} delay={0.3 + i * 0.1}>
                <div className="flex items-start gap-3">
                  <span className="w-1 h-1 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                  <p className="text-text-secondary text-body-md">
                    {highlight}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Fun Facts */}
          <ScrollReveal delay={0.6}>
            <div className="bg-surface-overlay rounded-xl p-6 border border-border">
              <h3 className="font-heading text-body-sm uppercase tracking-wider text-text-tertiary mb-4">
                Fun Facts
              </h3>
              <div className="space-y-2">
                {funFacts.map((fact, i) => (
                  <p key={i} className="text-text-secondary text-body-sm">
                    {fact}
                  </p>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </Section>
  );
}
