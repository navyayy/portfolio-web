"use client";

import { useSection } from "@/lib/useSection";
import { FormField, SelectField } from "@/components/admin/FormField";
import { SaveButton } from "@/components/admin/SaveButton";
import type { HeroSection } from "@/types/portfolio";

export default function HeroEditor() {
  const { data, setData, loading, saving, saved, error, save } = useSection<HeroSection>("hero");

  if (loading || !data) return <div className="text-[#8A8A8A]">Loading...</div>;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    save(data);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A1A] mb-6">Hero Section</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        <FormField label="Headline" value={data.headline} onChange={(v) => setData({ ...data, headline: v })} required />
        <FormField label="Subheadline" value={data.subheadline} onChange={(v) => setData({ ...data, subheadline: v })} />
        <FormField label="CTA Text" value={data.ctaText} onChange={(v) => setData({ ...data, ctaText: v })} />
        <FormField label="CTA Link" value={data.ctaLink} onChange={(v) => setData({ ...data, ctaLink: v })} />
        <SelectField
          label="Background Type"
          value={data.backgroundType}
          onChange={(v) => setData({ ...data, backgroundType: v as HeroSection["backgroundType"] })}
          options={[
            { label: "Gradient Mesh", value: "gradient-mesh" },
            { label: "Particles", value: "particles" },
            { label: "Video", value: "video" },
            { label: "Static", value: "static" },
          ]}
        />
        <SaveButton saving={saving} saved={saved} error={error} />
      </form>
    </div>
  );
}
