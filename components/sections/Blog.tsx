"use client";

import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Card } from "@/components/ui/Card";

interface BlogPostItem {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
}

interface BlogProps {
  sectionTitle: string;
  subtitle: string;
  posts: BlogPostItem[];
}

export function Blog({ sectionTitle, subtitle, posts }: BlogProps) {
  return (
    <Section id="blog">
      <ScrollReveal>
        <h2 className="font-heading text-heading-xl mb-4 text-center">
          <span className="text-accent">{sectionTitle}</span>
        </h2>
        <p className="text-text-secondary text-body-lg text-center mb-12 max-w-2xl mx-auto">
          {subtitle}
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.slice(0, 6).map((post, i) => (
          <ScrollReveal key={post.slug} delay={i * 0.05}>
            <a href={`/blog/${post.slug}`} className="block h-full group">
              <Card className="h-full flex flex-col">
                {/* Thumbnail */}
                <div className="aspect-video rounded-lg bg-surface-overlay mb-4 overflow-hidden relative">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-text-tertiary/40 font-mono text-xs">
                        Blog
                      </span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-heading text-heading-md text-text-primary mb-2 group-hover:text-accent transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-text-secondary text-body-sm mb-4 flex-1 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Date */}
                <div className="text-text-tertiary text-caption font-mono">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </Card>
            </a>
          </ScrollReveal>
        ))}
      </div>

      {posts.length > 6 && (
        <div className="text-center mt-10">
          <a
            href="/blog"
            className="text-accent font-heading text-body-md hover:underline"
          >
            View all {posts.length} posts &rarr;
          </a>
        </div>
      )}
    </Section>
  );
}
