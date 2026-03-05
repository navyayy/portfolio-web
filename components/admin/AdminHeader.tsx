"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export function AdminHeader() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <header className="h-14 bg-white border-b border-[#E5DED3] flex items-center justify-between px-6 flex-shrink-0">
      <Link href="/" target="_blank" className="text-sm text-[#8A8A8A] hover:text-[#C4703F] transition">
        View Portfolio &rarr;
      </Link>
      <button
        onClick={handleLogout}
        className="px-4 py-1.5 text-sm text-[#5C5C5C] border border-[#E5DED3] rounded-lg hover:bg-[#F3EDE4] transition cursor-pointer"
      >
        Logout
      </button>
    </header>
  );
}
