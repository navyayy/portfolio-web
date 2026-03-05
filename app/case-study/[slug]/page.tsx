import type { Metadata } from "next";
import Image from "next/image";
import portfolioData from "@/data/portfolio.json";
import { Section } from "@/components/layout/Section";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#case-studies" },
];

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cs = portfolioData.caseStudies.items.find((c) => c.id === slug);
  if (!cs) return {};

  const description = cs.brief.slice(0, 160);
  return {
    title: `${cs.title} — ${cs.company}`,
    description,
    alternates: { canonical: `/case-study/${slug}` },
    openGraph: {
      title: `${cs.title} — ${cs.company}`,
      description,
      url: `/case-study/${slug}`,
      type: "article",
      ...(cs.thumbnail && {
        images: [{ url: cs.thumbnail, alt: cs.title }],
      }),
    },
  };
}

export function generateStaticParams() {
  return portfolioData.caseStudies.items.map((cs) => ({ slug: cs.id }));
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = portfolioData.caseStudies.items.find((cs) => cs.id === slug);

  if (!caseStudy) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-heading-xl text-text-primary mb-4">
            Case Study Not Found
          </h1>
          <a href="/" className="text-accent font-heading hover:underline">
            &larr; Back to Portfolio
          </a>
        </div>
      </main>
    );
  }

  return (
    <>
      <Navigation links={navLinks} />
      <main>
        {/* Hero */}
        <Section className="pt-32 pb-8">
          <div className="max-w-3xl">
            <Badge variant="accent" size="md" className="mb-6">
              {caseStudy.category}
            </Badge>
            <h1 className="font-display text-heading-xl sm:text-display-lg md:text-display-xl text-text-primary mb-4">
              {caseStudy.title}
            </h1>
            <p className="text-accent text-body-lg mb-2">
              {caseStudy.company}
            </p>
          </div>
        </Section>

        {/* Hero Image */}
        {caseStudy.thumbnail && (
          <Section className="pt-0 pb-8">
            <div className="aspect-video rounded-xl overflow-hidden relative border border-border">
              <Image
                src={caseStudy.thumbnail}
                alt={caseStudy.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </Section>
        )}

        {/* Brief / Story */}
        <Section className="py-12">
          <div className="max-w-3xl">
            <h2 className="font-heading text-heading-lg mb-6">The Story</h2>
            <div className="space-y-4">
              {caseStudy.brief.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-text-secondary text-body-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Section>

        {/* Metrics */}
        <Section className="py-12 bg-surface-overlay">
          <h2 className="font-heading text-heading-lg mb-8">Key Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudy.metrics.map((metric, i) => (
              <div
                key={i}
                className="bg-surface-elevated border border-border rounded-xl p-6 text-center"
              >
                <p className="text-text-primary font-heading text-heading-md">
                  {metric}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Tools */}
        <Section className="py-12">
          <h2 className="font-heading text-heading-lg mb-8">Tools Used</h2>
          <div className="flex flex-wrap gap-3">
            {caseStudy.tools.map((tool) => (
              <Badge key={tool} variant="outlined" size="md">
                {tool}
              </Badge>
            ))}
          </div>
        </Section>

        {/* Back Link */}
        <Section className="py-12 text-center">
          <a
            href="/#case-studies"
            className="text-accent font-heading text-body-lg hover:underline py-2"
          >
            &larr; View All Case Studies
          </a>
        </Section>
      </main>
      <Footer {...portfolioData.footer} />
    </>
  );
}
