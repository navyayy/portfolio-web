"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface DashboardStats {
  experiences: number;
  caseStudies: number;
  blogPosts: number;
  achievements: number;
  skillCategories: number;
  reels: number;
}

const sectionCards = [
  { label: "Meta / Profile", href: "/admin/meta", description: "Name, title, contact info, social links" },
  { label: "Hero Section", href: "/admin/hero", description: "Headline, subheadline, CTA" },
  { label: "About", href: "/admin/about", description: "Bio, philosophy, highlights, fun facts" },
  { label: "Metrics", href: "/admin/metrics", description: "Impact numbers and descriptions" },
  { label: "Experience", href: "/admin/experience", description: "Work history and roles" },
  { label: "Case Studies", href: "/admin/case-studies", description: "Project showcases" },
  { label: "Skills", href: "/admin/skills", description: "Skill categories and featured skills" },
  { label: "Instagram Reels", href: "/admin/reels", description: "Social media content" },
  { label: "Blog Posts", href: "/admin/blogs", description: "Markdown blog articles" },
  { label: "Achievements", href: "/admin/achievements", description: "Awards and recognitions" },
  { label: "Education", href: "/admin/education", description: "Academic background" },
  { label: "Contact", href: "/admin/contact", description: "Contact section content" },
  { label: "Footer", href: "/admin/footer", description: "Footer tagline and social links" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const [portfolioRes, blogsRes] = await Promise.all([
          fetch("/api/portfolio"),
          fetch("/api/blogs"),
        ]);
        const portfolio = await portfolioRes.json();
        const blogs = await blogsRes.json();

        setStats({
          experiences: portfolio.experience?.length || 0,
          caseStudies: portfolio.caseStudies?.length || 0,
          blogPosts: blogs.length || 0,
          achievements: portfolio.achievements?.length || 0,
          skillCategories: portfolio.skills?.categories?.length || 0,
          reels: portfolio.instagramReels?.reels?.length || 0,
        });
      } catch {
        // Stats are optional
      }
    }
    loadStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A1A] mb-6">Dashboard</h1>

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[
            { label: "Experiences", count: stats.experiences },
            { label: "Case Studies", count: stats.caseStudies },
            { label: "Blog Posts", count: stats.blogPosts },
            { label: "Achievements", count: stats.achievements },
            { label: "Skill Groups", count: stats.skillCategories },
            { label: "Reels", count: stats.reels },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-[#E5DED3] rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-[#C4703F]">{stat.count}</p>
              <p className="text-xs text-[#8A8A8A] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">Manage Sections</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sectionCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="block bg-white border border-[#E5DED3] rounded-xl p-5 hover:border-[#C4703F] hover:shadow-md transition"
          >
            <h3 className="font-semibold text-[#1A1A1A]">{card.label}</h3>
            <p className="text-sm text-[#8A8A8A] mt-1">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
