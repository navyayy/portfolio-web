"use client";

import { useEffect, useRef } from "react";
import { Section } from "@/components/layout/Section";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import type { InstagramReelsSection } from "@/types/portfolio";

function ReelCard({ url }: { url: string }) {
  return (
    <div className="flex-shrink-0 w-[75vw] sm:w-[280px] snap-center group">
      <div className="rounded-2xl border border-border bg-surface-elevated overflow-hidden h-[380px] sm:h-[400px] relative">
        <iframe
          src={`${url}embed/`}
          className="absolute inset-0 w-[calc(100%)] h-[calc(100%)] border-0"
          allowFullScreen
          loading="lazy"
          title="Instagram Reel"
          scrolling="no"
        />
      </div>
    </div>
  );
}

function RecentPostCard({ url }: { url: string }) {
  // Extract shortcode from URL like /welupbysavein/p/CODE/ or /p/CODE/
  const match = url.match(/\/p\/([^/]+)/);
  const embedUrl = match
    ? `https://www.instagram.com/p/${match[1]}/embed/`
    : `${url}embed/`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="rounded-2xl border border-border bg-surface-elevated overflow-hidden h-[550px] w-[350px] md:h-[495px] md:w-[300px] relative">
        <iframe
          src={embedUrl}
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          title="Instagram Post"
          scrolling="no"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
      </div>
    </a>
  );
}

export function InstagramReels({
  sectionTitle,
  subtitle,
  instagramHandle,
  instagramUrl,
  reelUrls,
  postUrls,
}: InstagramReelsSection) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll hint on mount
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Small nudge to hint scrollability
    el.scrollTo({ left: 40, behavior: "smooth" });
    const timer = setTimeout(() => {
      el.scrollTo({ left: 0, behavior: "smooth" });
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Section id="reels" containerWidth="full" className="overflow-hidden">
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

      {/* Reels Row — horizontal scroll */}
      <ScrollReveal>
        <div className="mb-4 px-6">
          <h3 className="font-heading text-heading-md text-text-primary mb-1">
            Video Reels
          </h3>
          <p className="text-text-tertiary text-body-sm">
            Scroll to explore &rarr;
          </p>
        </div>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory px-6 scrollbar-hide"
        >
          {reelUrls.map((url, i) => (
            <ReelCard key={i} url={url} />
          ))}
        </div>
      </ScrollReveal>

      {/* Recent Posts Row — horizontal scroll */}
      <ScrollReveal className="mt-16">
        <div className="flex items-center justify-between mb-4 px-6">
          <div>
            <h3 className="font-heading text-heading-md text-text-primary mb-1">
              Recent Posts
            </h3>
            <p className="text-text-tertiary text-body-sm">
              Scroll to explore &rarr;
            </p>
          </div>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent text-body-sm font-heading hover:underline hidden md:block"
          >
            {instagramHandle} &rarr;
          </a>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory px-6 scrollbar-hide">
          {postUrls.map((url, i) => (
            <div key={i} className="shrink-0 snap-center">
              <RecentPostCard url={url} />
            </div>
          ))}
        </div>
      </ScrollReveal>
    </Section>
  );
}
