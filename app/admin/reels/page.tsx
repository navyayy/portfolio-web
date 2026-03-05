"use client";

import { useSection } from "@/lib/useSection";
import { FormField } from "@/components/admin/FormField";
import { ArrayEditor } from "@/components/admin/ArrayEditor";
import { SaveButton } from "@/components/admin/SaveButton";
import type { InstagramReelsSection } from "@/types/portfolio";

export default function ReelsEditor() {
  const { data, setData, loading, saving, saved, error, save } = useSection<InstagramReelsSection>("instagramReels");

  if (loading || !data) return <div className="text-[#8A8A8A]">Loading...</div>;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!data) return;
    save(data);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A1A] mb-6">Instagram Reels</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <div className="space-y-4 bg-white border border-[#E5DED3] rounded-xl p-4">
          <FormField label="Section Title" value={data.sectionTitle} onChange={(v) => setData({ ...data, sectionTitle: v })} />
          <FormField label="Subtitle" value={data.subtitle} onChange={(v) => setData({ ...data, subtitle: v })} />
        </div>

        <div className="space-y-4 bg-white border border-[#E5DED3] rounded-xl p-4">
          <FormField label="Instagram Handle" value={data.instagramHandle} onChange={(v) => setData({ ...data, instagramHandle: v })} placeholder="@welupbysavein" />
          <FormField label="Instagram URL" value={data.instagramUrl} onChange={(v) => setData({ ...data, instagramUrl: v })} type="url" />
        </div>

        <div className="bg-white border border-[#E5DED3] rounded-xl p-4">
          <ArrayEditor
            label="Reel URLs"
            items={data.reelUrls}
            onChange={(v) => setData({ ...data, reelUrls: v })}
            placeholder="https://www.instagram.com/reel/..."
          />
        </div>

        <div className="bg-white border border-[#E5DED3] rounded-xl p-4">
          <ArrayEditor
            label="Post URLs"
            items={data.postUrls}
            onChange={(v) => setData({ ...data, postUrls: v })}
            placeholder="https://www.instagram.com/welupbysavein/p/..."
          />
        </div>

        <SaveButton saving={saving} saved={saved} error={error} />
      </form>
    </div>
  );
}
