"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { Section } from "@/components/layout/Section";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { Button } from "@/components/ui/Button";
import type { BookCallSection } from "@/types/portfolio";

export function BookCall({
  heading,
  subheading,
  calLink,
  calNamespace,
  buttonText,
}: BookCallSection) {
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
    <Section className="py-2">
      <ScrollReveal>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-surface-overlay border border-border rounded-2xl p-8 md:p-10">
          <div>
            <p className="font-heading text-heading-md text-text-primary mb-1">
              {heading}
            </p>
            <p className="text-text-secondary text-body-md">
              {subheading}
            </p>
          </div>
          <MagneticButton className="shrink-0">
            <Button
              size="lg"
              variant="primary"
              data-cal-namespace={calNamespace}
              data-cal-link={calLink}
              data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
            >
              {buttonText}
            </Button>
          </MagneticButton>
        </div>
      </ScrollReveal>
    </Section>
  );
}
