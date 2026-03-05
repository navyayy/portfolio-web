"use client";

import { useSection } from "@/lib/useSection";
import { FormField } from "@/components/admin/FormField";
import { SaveButton } from "@/components/admin/SaveButton";
import type { BookCallSection } from "@/types/portfolio";

export default function BookCallEditor() {
  const { data, setData, loading, saving, saved, error, save } = useSection<BookCallSection>("bookCall");

  if (loading || !data) return <div className="text-[#8A8A8A]">Loading...</div>;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!data) return;
    save(data);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A1A] mb-6">Book a Call</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <FormField label="Heading" value={data.heading} onChange={(v) => setData({ ...data, heading: v })} />
        <FormField label="Subheading" value={data.subheading} onChange={(v) => setData({ ...data, subheading: v })} />
        <FormField label="Cal.com Link" value={data.calLink} onChange={(v) => setData({ ...data, calLink: v })} placeholder="navya/15min" />
        <FormField label="Cal.com Namespace" value={data.calNamespace} onChange={(v) => setData({ ...data, calNamespace: v })} placeholder="15min" />
        <FormField label="Button Text" value={data.buttonText} onChange={(v) => setData({ ...data, buttonText: v })} />

        <SaveButton saving={saving} saved={saved} error={error} />
      </form>
    </div>
  );
}
