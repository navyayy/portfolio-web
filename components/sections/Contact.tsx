"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { Section } from "@/components/layout/Section";
import { TextReveal } from "@/components/animations/TextReveal";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { Button } from "@/components/ui/Button";
import { CopyToClipboard } from "@/components/features/CopyToClipboard";
import type { ContactSection } from "@/types/portfolio";

interface ContactProps extends ContactSection {}

export function Contact({
  headline,
  subheadline,
  email,
  linkedin,
  calendlyLink,
}: ContactProps) {
  const calLink = calendlyLink || "navya/15min";
  const calNamespace = calLink.split("/").pop() || "15min";

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: calNamespace });
      cal("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#292929" },
          dark: { "cal-brand": "#fafafa" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, [calNamespace]);
  return (
    <Section id="contact">
      <div className="text-center max-w-3xl mx-auto">
        {/* Headline */}
        <TextReveal
          text={headline}
          as="h2"
          className="font-display text-display-lg md:text-display-xl mb-6"
        />

        {/* Subheadline */}
        <ScrollReveal delay={0.3}>
          <p className="text-text-secondary text-body-lg mb-8 md:mb-12">
            {subheadline}
          </p>
        </ScrollReveal>

        {/* Contact Methods */}
        <div className="space-y-4 mb-12">
          <ScrollReveal delay={0.4}>
            <div className="flex items-center justify-center gap-4">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-accent shrink-0"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <CopyToClipboard text={email} label="email" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 text-text-secondary hover:text-accent transition-colors"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-accent shrink-0"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="font-mono text-sm">LinkedIn Profile</span>
            </a>
          </ScrollReveal>
        </div>

        {/* CTA Button */}
        <ScrollReveal delay={0.6}>
          <MagneticButton className="inline-block">
            <Button
              size="lg"
              variant="primary"
              data-cal-namespace={calNamespace}
              data-cal-link={calLink}
              data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
            >
              Book a Call
            </Button>
          </MagneticButton>
        </ScrollReveal>
      </div>
    </Section>
  );
}
