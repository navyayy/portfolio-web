import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllBlogSlugs, getBlogPost } from "@/lib/blog";
import { Section } from "@/components/layout/Section";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import portfolioData from "@/data/portfolio.json";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
];

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      ...(post.coverImage && {
        images: [{ url: post.coverImage, alt: post.title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      ...(post.coverImage && { images: [post.coverImage] }),
    },
  };
}

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Person",
      name: "Navya Srivastav",
      url: "https://navyayy.vercel.app",
    },
    url: `https://navyayy.vercel.app/blog/${slug}`,
    ...(post.coverImage && { image: `https://navyayy.vercel.app${post.coverImage}` }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation links={navLinks} />
      <main>
        {/* Hero */}
        <Section className="pt-32 pb-8" containerWidth="narrow">
          <a
            href="/blog"
            className="text-text-tertiary text-body-sm font-heading hover:text-accent transition-colors inline-block mb-8 py-2"
          >
            &larr; All posts
          </a>

          <h1 className="font-display text-display-lg md:text-display-xl text-text-primary mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-text-tertiary text-body-sm font-mono mb-8">
            <span>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span>&middot;</span>
            <span>{post.author.name}</span>
          </div>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="aspect-video rounded-xl overflow-hidden relative mb-8 md:mb-12 border border-border">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </Section>

        {/* Content */}
        <Section className="pt-0 pb-16" containerWidth="narrow">
          <article className="prose prose-base sm:prose-lg max-w-none text-text-primary prose-headings:font-heading prose-headings:text-text-primary prose-p:text-text-secondary prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-text-primary prose-blockquote:border-accent prose-blockquote:text-text-secondary prose-code:text-accent prose-code:font-mono prose-img:rounded-xl prose-img:border prose-img:border-border">
            <div dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }} />
          </article>
        </Section>

        {/* Back */}
        <Section className="pt-0 pb-16 text-center" containerWidth="narrow">
          <a
            href="/blog"
            className="text-accent font-heading text-body-md hover:underline"
          >
            &larr; Back to all posts
          </a>
        </Section>
      </main>
      <Footer {...portfolioData.footer} />
    </>
  );
}

function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Headers
  html = html.replace(/^### (.*$)/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.*$)/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.*$)/gm, "<h1>$1</h1>");

  // Bold and italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "<em>$1</em>");
  html = html.replace(/(?<!_)_([^_]+)_(?!_)/g, "<em>$1</em>");

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Unordered lists
  html = html.replace(/^\* (.*$)/gm, "<li>$1</li>");
  html = html.replace(/^- (.*$)/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>");

  // Inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Blockquotes
  html = html.replace(/^> (.*$)/gm, "<blockquote><p>$1</p></blockquote>");

  // Paragraphs — wrap lines not already wrapped in tags
  html = html
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (
        trimmed.startsWith("<h") ||
        trimmed.startsWith("<ul") ||
        trimmed.startsWith("<ol") ||
        trimmed.startsWith("<blockquote") ||
        trimmed.startsWith("<img") ||
        trimmed.startsWith("<pre") ||
        trimmed.startsWith("<hr")
      ) {
        return trimmed;
      }
      return `<p>${trimmed.replace(/\n/g, "<br />")}</p>`;
    })
    .join("\n");

  return html;
}
