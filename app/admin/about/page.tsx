"use client";

import { useSection } from "@/lib/useSection";
import { FormField } from "@/components/admin/FormField";
import { ArrayEditor } from "@/components/admin/ArrayEditor";
import { SaveButton } from "@/components/admin/SaveButton";
import type { AboutSection } from "@/types/portfolio";

export default function AboutEditor() {
  const { data, setData, loading, saving, saved, error, save } = useSection<AboutSection>("about");

  if (loading || !data) return <div className="text-[#8A8A8A]">Loading...</div>;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    save(data);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A1A] mb-6">About Section</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        <FormField label="Short Bio" value={data.shortBio} onChange={(v) => setData({ ...data, shortBio: v })} type="textarea" required />
        <FormField label="Philosophy" value={data.philosophy} onChange={(v) => setData({ ...data, philosophy: v })} type="textarea" />
        <ArrayEditor label="Highlights" items={data.highlights} onChange={(v) => setData({ ...data, highlights: v })} placeholder="e.g. B.Tech in Computer Science" />
        <ArrayEditor label="Fun Facts" items={data.funFacts} onChange={(v) => setData({ ...data, funFacts: v })} placeholder="e.g. Built 'Saksham' app" />
        <SaveButton saving={saving} saved={saved} error={error} />
      </form>
    </div>
  );
}
