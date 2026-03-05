"use client";

import { useSection } from "@/lib/useSection";
import { FormField } from "@/components/admin/FormField";
import { SaveButton } from "@/components/admin/SaveButton";
import type { Education } from "@/types/portfolio";

export default function EducationEditor() {
  const { data, setData, loading, saving, saved, error, save } = useSection<Education>("education");

  if (loading || !data) return <div className="text-[#8A8A8A]">Loading...</div>;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    save(data);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A1A] mb-6">Education</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        <FormField label="Degree" value={data.degree} onChange={(v) => setData({ ...data, degree: v })} required />
        <FormField label="Major" value={data.major} onChange={(v) => setData({ ...data, major: v })} required />
        <FormField label="Institution" value={data.institution} onChange={(v) => setData({ ...data, institution: v })} required />
        <FormField label="Location" value={data.location} onChange={(v) => setData({ ...data, location: v })} />
        <FormField label="Period" value={data.period} onChange={(v) => setData({ ...data, period: v })} placeholder="e.g. 2020 – 2024" />
        <FormField label="Logo Path" value={data.logo || ""} onChange={(v) => setData({ ...data, logo: v })} />
        <SaveButton saving={saving} saved={saved} error={error} />
      </form>
    </div>
  );
}
