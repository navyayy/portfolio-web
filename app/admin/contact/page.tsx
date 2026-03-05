"use client";

import { useSection } from "@/lib/useSection";
import { FormField } from "@/components/admin/FormField";
import { SaveButton } from "@/components/admin/SaveButton";
import type { ContactSection } from "@/types/portfolio";

export default function ContactEditor() {
  const { data, setData, loading, saving, saved, error, save } = useSection<ContactSection>("contact");

  if (loading || !data) return <div className="text-[#8A8A8A]">Loading...</div>;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    save(data);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A1A] mb-6">Contact Section</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        <FormField label="Headline" value={data.headline} onChange={(v) => setData({ ...data, headline: v })} required />
        <FormField label="Subheadline" value={data.subheadline} onChange={(v) => setData({ ...data, subheadline: v })} type="textarea" />
        <FormField label="Email" value={data.email} onChange={(v) => setData({ ...data, email: v })} type="email" />
        <FormField label="Phone" value={data.phone} onChange={(v) => setData({ ...data, phone: v })} type="tel" />
        <FormField label="LinkedIn" value={data.linkedin} onChange={(v) => setData({ ...data, linkedin: v })} type="url" />
        <FormField label="Calendly Link" value={data.calendlyLink || ""} onChange={(v) => setData({ ...data, calendlyLink: v })} type="url" />
        <FormField label="Availability" value={data.availability} onChange={(v) => setData({ ...data, availability: v })} placeholder="e.g. Open to opportunities" />
        <SaveButton saving={saving} saved={saved} error={error} />
      </form>
    </div>
  );
}
