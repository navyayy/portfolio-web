"use client";

import { useSection } from "@/lib/useSection";
import { FormField } from "@/components/admin/FormField";
import { SaveButton } from "@/components/admin/SaveButton";
import type { FooterSection } from "@/types/portfolio";

export default function FooterEditor() {
  const { data, setData, loading, saving, saved, error, save } = useSection<FooterSection>("footer");

  if (loading || !data) return <div className="text-[#8A8A8A]">Loading...</div>;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!data) return;
    save(data);
  }

  function updateSocialLink(index: number, field: "platform" | "url", value: string) {
    if (!data) return;
    const updated = [...data.socialLinks];
    updated[index] = { ...updated[index], [field]: value };
    setData({ ...data, socialLinks: updated });
  }

  function addSocialLink() {
    if (!data) return;
    setData({ ...data, socialLinks: [...data.socialLinks, { platform: "", url: "" }] });
  }

  function removeSocialLink(index: number) {
    if (!data) return;
    setData({ ...data, socialLinks: data.socialLinks.filter((_, i) => i !== index) });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A1A] mb-6">Footer</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        <FormField label="Tagline" value={data.tagline} onChange={(v) => setData({ ...data, tagline: v })} />

        <div>
          <label className="block text-sm font-medium text-[#5C5C5C] mb-2">Social Links</label>
          <div className="space-y-3">
            {data.socialLinks.map((link, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  value={link.platform}
                  onChange={(e) => updateSocialLink(index, "platform", e.target.value)}
                  placeholder="Platform (e.g. linkedin)"
                  className="w-40 px-3 py-2 border border-[#E5DED3] rounded-lg bg-[#FAF7F2] text-[#1A1A1A] text-sm focus:outline-none focus:ring-2 focus:ring-[#C4703F] focus:border-transparent transition"
                />
                <input
                  value={link.url}
                  onChange={(e) => updateSocialLink(index, "url", e.target.value)}
                  placeholder="URL"
                  className="flex-1 px-3 py-2 border border-[#E5DED3] rounded-lg bg-[#FAF7F2] text-[#1A1A1A] text-sm focus:outline-none focus:ring-2 focus:ring-[#C4703F] focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => removeSocialLink(index)}
                  className="p-1.5 text-red-400 hover:text-red-600 cursor-pointer"
                >
                  &#10005;
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addSocialLink}
            className="mt-2 px-3 py-1.5 text-sm text-[#C4703F] border border-[#C4703F] rounded-lg hover:bg-[#C4703F] hover:text-white transition cursor-pointer"
          >
            + Add Social Link
          </button>
        </div>

        <SaveButton saving={saving} saved={saved} error={error} />
      </form>
    </div>
  );
}
