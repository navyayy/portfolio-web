"use client";

import { useSection } from "@/lib/useSection";
import { FormField } from "@/components/admin/FormField";
import { ArrayEditor } from "@/components/admin/ArrayEditor";
import { SaveButton } from "@/components/admin/SaveButton";
import type { PortfolioMeta } from "@/types/portfolio";

export default function MetaEditor() {
  const { data, setData, loading, saving, saved, error, save } = useSection<PortfolioMeta>("meta");

  if (loading || !data) return <div className="text-[#8A8A8A]">Loading...</div>;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    save(data);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A1A] mb-6">Meta / Profile</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        <FormField label="Name" value={data.name} onChange={(v) => setData({ ...data, name: v })} required />
        <FormField label="Title" value={data.title} onChange={(v) => setData({ ...data, title: v })} required />
        <FormField label="Tagline" value={data.tagline} onChange={(v) => setData({ ...data, tagline: v })} type="textarea" />
        <ArrayEditor label="Roles" items={data.roles} onChange={(v) => setData({ ...data, roles: v })} placeholder="e.g. Content Strategist" />
        <FormField label="Location" value={data.location} onChange={(v) => setData({ ...data, location: v })} />
        <FormField label="Email" value={data.email} onChange={(v) => setData({ ...data, email: v })} type="email" />
        <FormField label="Phone" value={data.phone} onChange={(v) => setData({ ...data, phone: v })} type="tel" />
        <FormField label="LinkedIn" value={data.linkedin} onChange={(v) => setData({ ...data, linkedin: v })} type="url" />
        <FormField label="Blog URL" value={data.blog || ""} onChange={(v) => setData({ ...data, blog: v })} type="url" />
        <FormField label="Portfolio URL" value={data.portfolio || ""} onChange={(v) => setData({ ...data, portfolio: v })} type="url" />
        <FormField label="Resume URL" value={data.resumeUrl || ""} onChange={(v) => setData({ ...data, resumeUrl: v })} />
        <FormField label="Profile Image Path" value={data.profileImage || ""} onChange={(v) => setData({ ...data, profileImage: v })} />
        <SaveButton saving={saving} saved={saved} error={error} />
      </form>
    </div>
  );
}
