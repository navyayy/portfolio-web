import type { FooterSection } from "@/types/portfolio";

interface FooterProps extends FooterSection {}

export function Footer({ tagline, socialLinks }: FooterProps) {
  const platformIcons: Record<string, string> = {
    linkedin: "LinkedIn",
    email: "Email",
    medium: "Medium",
    twitter: "Twitter",
    github: "GitHub",
  };

  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-text-tertiary text-sm font-body">
          {tagline} &copy; {new Date().getFullYear()}
        </p>

        <div className="flex items-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-tertiary hover:text-text-primary transition-colors text-sm font-heading"
              aria-label={`Visit ${platformIcons[link.platform] || link.platform}`}
            >
              {platformIcons[link.platform] || link.platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
