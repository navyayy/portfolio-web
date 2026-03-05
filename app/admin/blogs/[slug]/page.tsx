"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { FormField } from "@/components/admin/FormField";
import { SaveButton } from "@/components/admin/SaveButton";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface BlogPostFull {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  author: { name: string; picture: string };
  ogImage?: { url: string };
  content: string;
}

export default function BlogEditorPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [post, setPost] = useState<BlogPostFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/blogs/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Blog post not found");
        setLoading(false);
      });
  }, [slug]);

  async function handleSave() {
    if (!post) return;
    setSaving(true);
    setSaved(false);
    setError("");

    try {
      const res = await fetch(`/api/blogs/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });

      if (!res.ok) throw new Error("Save failed");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="text-[#8A8A8A]">Loading...</div>;
  if (!post) return <div className="text-red-500">{error || "Post not found"}</div>;

  // Format date for input[type=date]
  const dateValue = post.date ? new Date(post.date).toISOString().split("T")[0] : "";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <button
            onClick={() => router.push("/admin/blogs")}
            className="text-sm text-[#8A8A8A] hover:text-[#C4703F] transition cursor-pointer"
          >
            &larr; Back to Blog Posts
          </button>
          <h1 className="text-2xl font-bold text-[#1A1A1A] mt-1">Edit: {post.title}</h1>
        </div>
      </div>

      <div className="space-y-6 max-w-4xl">
        {/* Frontmatter fields */}
        <div className="bg-white border border-[#E5DED3] rounded-xl p-5 space-y-4">
          <h2 className="font-semibold text-[#1A1A1A]">Post Metadata</h2>
          <FormField label="Title" value={post.title} onChange={(v) => setPost({ ...post, title: v })} required />
          <FormField label="Excerpt" value={post.excerpt} onChange={(v) => setPost({ ...post, excerpt: v })} type="textarea" />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Date"
              value={dateValue}
              onChange={(v) => setPost({ ...post, date: new Date(v).toISOString() })}
              type="date"
            />
            <FormField label="Cover Image" value={post.coverImage} onChange={(v) => setPost({ ...post, coverImage: v })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Author Name"
              value={post.author.name}
              onChange={(v) => setPost({ ...post, author: { ...post.author, name: v } })}
            />
            <FormField
              label="Author Picture"
              value={post.author.picture}
              onChange={(v) => setPost({ ...post, author: { ...post.author, picture: v } })}
            />
          </div>
        </div>

        {/* Markdown Editor */}
        <div className="bg-white border border-[#E5DED3] rounded-xl p-5">
          <h2 className="font-semibold text-[#1A1A1A] mb-3">Content</h2>
          <div data-color-mode="light">
            <MDEditor
              value={post.content}
              onChange={(v) => setPost({ ...post, content: v || "" })}
              height={500}
              preview="live"
            />
          </div>
        </div>

        <SaveButton saving={saving} saved={saved} error={error} onClick={handleSave} />
      </div>
    </div>
  );
}
