"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { FormField } from "@/components/admin/FormField";
import { SaveButton } from "@/components/admin/SaveButton";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function NewBlogPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [authorName, setAuthorName] = useState("Navya Srivastav");
  const [authorPicture, setAuthorPicture] = useState("/assets/blog/authors/navyayy.png");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function handleCreate() {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setSaving(true);
    setSaved(false);
    setError("");

    try {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          excerpt,
          coverImage: coverImage || `/assets/blog/${slug}/cover.jpg`,
          date: new Date(date).toISOString(),
          author: { name: authorName, picture: authorPicture },
          ogImage: { url: coverImage || `/assets/blog/${slug}/cover.jpg` },
          content,
        }),
      });

      if (res.status === 409) {
        setError("A blog post with this title/slug already exists.");
        return;
      }

      if (!res.ok) throw new Error("Create failed");

      const data = await res.json();
      setSaved(true);
      setTimeout(() => router.push(`/admin/blogs/${data.slug}`), 1000);
    } catch {
      setError("Failed to create post. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => router.push("/admin/blogs")}
          className="text-sm text-[#8A8A8A] hover:text-[#C4703F] transition cursor-pointer"
        >
          &larr; Back to Blog Posts
        </button>
        <h1 className="text-2xl font-bold text-[#1A1A1A] mt-1">New Blog Post</h1>
      </div>

      <div className="space-y-6 max-w-4xl">
        <div className="bg-white border border-[#E5DED3] rounded-xl p-5 space-y-4">
          <h2 className="font-semibold text-[#1A1A1A]">Post Metadata</h2>
          <FormField label="Title" value={title} onChange={setTitle} required />
          <FormField label="Excerpt" value={excerpt} onChange={setExcerpt} type="textarea" />
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Date" value={date} onChange={setDate} type="date" />
            <FormField label="Cover Image" value={coverImage} onChange={setCoverImage} placeholder="Auto-generated from title if empty" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Author Name" value={authorName} onChange={setAuthorName} />
            <FormField label="Author Picture" value={authorPicture} onChange={setAuthorPicture} />
          </div>
        </div>

        <div className="bg-white border border-[#E5DED3] rounded-xl p-5">
          <h2 className="font-semibold text-[#1A1A1A] mb-3">Content</h2>
          <div data-color-mode="light">
            <MDEditor
              value={content}
              onChange={(v) => setContent(v || "")}
              height={500}
              preview="live"
            />
          </div>
        </div>

        <SaveButton saving={saving} saved={saved} error={error} onClick={handleCreate} />
      </div>
    </div>
  );
}
