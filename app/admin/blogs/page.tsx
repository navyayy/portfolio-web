"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  coverImage: string;
  author: { name: string; picture: string };
}

export default function BlogListPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  async function handleDelete(slug: string) {
    if (!confirm(`Delete "${slug}"? This will permanently remove the markdown file.`)) return;

    setDeleting(slug);
    const res = await fetch(`/api/blogs/${slug}`, { method: "DELETE" });
    if (res.ok) {
      setPosts(posts.filter((p) => p.slug !== slug));
    }
    setDeleting(null);
  }

  if (loading) return <div className="text-[#8A8A8A]">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1A1A1A]">Blog Posts</h1>
        <Link
          href="/admin/blogs/new"
          className="px-4 py-2 bg-[#C4703F] text-white text-sm font-medium rounded-lg hover:bg-[#b3632f] transition"
        >
          + New Post
        </Link>
      </div>

      <div className="space-y-3 max-w-3xl">
        {posts.length === 0 && (
          <p className="text-[#8A8A8A] text-center py-8">No blog posts yet. Create your first one!</p>
        )}

        {posts.map((post) => (
          <div key={post.slug} className="bg-white border border-[#E5DED3] rounded-xl p-4 flex items-center justify-between">
            <div className="flex-1 min-w-0 mr-4">
              <h3 className="font-semibold text-[#1A1A1A] truncate">{post.title}</h3>
              <p className="text-sm text-[#8A8A8A] truncate mt-0.5">{post.excerpt}</p>
              <p className="text-xs text-[#8A8A8A] mt-1">
                {post.date ? new Date(post.date).toLocaleDateString() : "No date"} &middot; {post.slug}.md
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => router.push(`/admin/blogs/${post.slug}`)}
                className="px-3 py-1.5 text-sm text-[#C4703F] border border-[#C4703F] rounded-lg hover:bg-[#C4703F] hover:text-white transition cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.slug)}
                disabled={deleting === post.slug}
                className="px-3 py-1.5 text-sm text-red-500 border border-red-300 rounded-lg hover:bg-red-50 transition cursor-pointer disabled:opacity-50"
              >
                {deleting === post.slug ? "..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
