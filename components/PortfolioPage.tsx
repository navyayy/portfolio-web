"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import type { PortfolioData } from "@/types/portfolio";
import type { BlogPostMeta } from "@/types/blog";
import { SplashScreen } from "@/components/SplashScreen";
import { Navigation } from "@/components/layout/Navigation";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Metrics } from "@/components/sections/Metrics";
import { Experience } from "@/components/sections/Experience";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Skills } from "@/components/sections/Skills";
import { InstagramReels } from "@/components/sections/InstagramReels";
import { Blog } from "@/components/sections/Blog";
import { BookCall } from "@/components/sections/BookCall";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

const MIN_SPLASH_DURATION = 1200;

export function PortfolioPage() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPostMeta[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startTime = Date.now();

    Promise.all([
      fetch("/api/portfolio").then((res) => {
        if (!res.ok) throw new Error("Failed to load portfolio data");
        return res.json();
      }),
      fetch("/api/blogs").then((res) => {
        if (!res.ok) throw new Error("Failed to load blog posts");
        return res.json();
      }),
    ])
      .then(([portfolio, blogs]) => {
        setData(portfolio as PortfolioData);
        setBlogPosts(blogs as BlogPostMeta[]);

        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, MIN_SPLASH_DURATION - elapsed);
        setTimeout(() => setIsLoading(false), remaining);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center px-6">
          <h1 className="font-display text-heading-xl text-text-primary mb-4">
            Something went wrong
          </h1>
          <p className="text-text-secondary text-body-md mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-accent font-heading text-body-md hover:underline cursor-pointer"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SplashScreen
        isVisible={isLoading}
        onExitComplete={() => {
          // Brief pause on bare creme bg before content appears
          setTimeout(() => setContentReady(true), 5);
        }}
      />

      {data && blogPosts && contentReady && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ProfilePage",
                mainEntity: {
                  "@type": "Person",
                  name: data.meta.name,
                  jobTitle: data.meta.title,
                  url:
                    data.meta.portfolio || "https://navyayy.vercel.app",
                  image: `${data.meta.portfolio || "https://navyayy.vercel.app"}${data.meta.profileImage || "/images/pfp.png"}`,
                  description: data.meta.tagline,
                  knowsAbout: data.skills.categories
                    .flatMap((cat) => cat.skills)
                    .slice(0, 6),
                },
              }),
            }}
          />
          <Navigation
            links={data.navLinks}
            showProgress
            resumeUrl={data.meta.resumeUrl}
          />
          <main>
            <Hero
              {...data.hero}
              name={data.meta.name}
              roles={data.meta.roles}
            />
            <About {...data.about} profileImage={data.meta.profileImage} />
            <BookCall {...data.bookCall} />
            <Metrics
              sectionTitle={data.metrics.sectionTitle}
              items={data.metrics.items}
            />
            <Experience
              sectionTitle={data.experience.sectionTitle}
              subtitle={data.experience.subtitle}
              items={data.experience.items}
            />
            <CaseStudies
              sectionTitle={data.caseStudies.sectionTitle}
              subtitle={data.caseStudies.subtitle}
              items={data.caseStudies.items}
            />
            <Skills
              sectionTitle={data.skills.sectionTitle}
              subtitle={data.skills.subtitle}
              categories={data.skills.categories}
              featured={data.skills.featured}
            />
            <InstagramReels {...data.instagramReels} />
            <Blog
              sectionTitle={data.blog.sectionTitle}
              subtitle={data.blog.subtitle}
              posts={blogPosts}
            />
            <Contact {...data.contact} />
          </main>
          <Footer {...data.footer} />
        </motion.div>
      )}
    </>
  );
}
