import type { Metadata } from "next";
import Image from "next/image";
import { getAllBlogPosts } from "@/lib/blog";
import { Section } from "@/components/layout/Section";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import portfolioData from "@/data/portfolio.json";

export const metadata: Metadata = {
  title: "Blog — Thoughts & Writing",
  description:
    "Articles on content marketing, SEO, technical writing, and the latest in fintech and SaaS — by Navya Srivastav.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Navya Srivastav",
    description:
      "Articles on content marketing, SEO, technical writing, and the latest in fintech and SaaS.",
    url: "/blog",
    type: "website",
  },
};

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
];

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      <Navigation links={navLinks} />
      <main>
        <Section className="pt-32">
          <h1 className="font-display text-heading-xl sm:text-display-lg md:text-display-xl mb-4 text-center">
            <span className="text-accent">Thoughts & Writing</span>
          </h1>
          <p className="text-text-secondary text-body-lg text-center mb-12 max-w-2xl mx-auto">
            Articles on content marketing, SEO, and tech
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <Card className="h-full flex flex-col">
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
                        <span className="text-text-tertiary/40 font-mono text-xs">Blog</span>
                      </div>
                    )}
                  </div>
                  <h2 className="font-heading text-heading-md text-text-primary mb-2 group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-text-secondary text-body-sm mb-4 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="text-text-tertiary text-caption font-mono">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </Section>
      </main>
      <Footer {...portfolioData.footer} />
    </>
  );
}
