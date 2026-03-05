"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navGroups = [
  {
    label: "Content",
    items: [
      { label: "Dashboard", href: "/admin" },
      { label: "Meta / Profile", href: "/admin/meta" },
      { label: "Hero", href: "/admin/hero" },
      { label: "About", href: "/admin/about" },
    ],
  },
  {
    label: "Portfolio",
    items: [
      { label: "Metrics", href: "/admin/metrics" },
      { label: "Experience", href: "/admin/experience" },
      { label: "Case Studies", href: "/admin/case-studies" },
      { label: "Skills", href: "/admin/skills" },
      { label: "Achievements", href: "/admin/achievements" },
    ],
  },
  {
    label: "Media",
    items: [
      { label: "Instagram Reels", href: "/admin/reels" },
      { label: "Blog Posts", href: "/admin/blogs" },
    ],
  },
  {
    label: "Settings",
    items: [
      { label: "Book a Call", href: "/admin/book-call" },
      { label: "Education", href: "/admin/education" },
      { label: "Contact", href: "/admin/contact" },
      { label: "Footer", href: "/admin/footer" },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-[#E5DED3] min-h-screen p-4 flex-shrink-0">
      <Link href="/admin" className="block mb-6 px-3">
        <h2 className="text-lg font-bold text-[#1A1A1A]">Portfolio Admin</h2>
      </Link>

      <nav className="space-y-6">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="px-3 py-1.5 text-[11px] font-bold text-[#C4703F] uppercase tracking-widest mb-1 border-b border-[#E5DED3]">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block px-3 py-2 rounded-lg text-sm transition ${
                        isActive
                          ? "bg-[#C4703F] text-white font-medium"
                          : "text-[#5C5C5C] hover:bg-[#F3EDE4]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
