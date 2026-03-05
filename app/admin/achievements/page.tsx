"use client";

import { useState } from "react";
import { useSection } from "@/lib/useSection";
import { FormField } from "@/components/admin/FormField";
import { SaveButton } from "@/components/admin/SaveButton";
import type { Achievement } from "@/types/portfolio";

interface AchievementsData {
  sectionTitle: string;
  subtitle: string;
  items: Achievement[];
}

export default function AchievementsEditor() {
  const { data, setData, loading, saving, saved, error, save } = useSection<AchievementsData>("achievements");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  if (loading || !data) return <div className="text-[#8A8A8A]">Loading...</div>;

  function handleSave() {
    if (!data) return;
    save(data);
    setEditingIndex(null);
  }

  function updateItem(index: number, updates: Partial<Achievement>) {
    if (!data) return;
    const items = [...data.items];
    items[index] = { ...items[index], ...updates };
    setData({ ...data, items });
  }

  function addItem() {
    if (!data) return;
    const newItem: Achievement = {
      id: `achievement-${Date.now()}`,
      title: "",
      description: "",
      year: "",
      icon: "trophy",
      highlight: false,
    };
    setData({ ...data, items: [...data.items, newItem] });
    setEditingIndex(data.items.length);
  }

  function removeItem(index: number) {
    if (!data) return;
    setData({ ...data, items: data.items.filter((_, i) => i !== index) });
    setEditingIndex(null);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A1A] mb-6">Achievements</h1>

      <div className="space-y-4 max-w-3xl">
        <div className="space-y-4 bg-white border border-[#E5DED3] rounded-xl p-4">
          <FormField label="Section Title" value={data.sectionTitle} onChange={(v) => setData({ ...data, sectionTitle: v })} />
          <FormField label="Subtitle" value={data.subtitle} onChange={(v) => setData({ ...data, subtitle: v })} />
        </div>

        {data.items.map((item, index) => (
          <div key={item.id} className="bg-white border border-[#E5DED3] rounded-xl overflow-hidden">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#F3EDE4] transition"
              onClick={() => setEditingIndex(editingIndex === index ? null : index)}
            >
              <div>
                <h3 className="font-semibold text-[#1A1A1A]">{item.title || "New Achievement"}</h3>
                <p className="text-sm text-[#8A8A8A]">{item.year}</p>
              </div>
              <div className="flex items-center gap-3">
                {item.highlight && (
                  <span className="text-xs bg-[#C4703F] text-white px-2 py-0.5 rounded-full">Highlight</span>
                )}
                <span className="text-[#8A8A8A]">{editingIndex === index ? "▲" : "▼"}</span>
              </div>
            </div>

            {editingIndex === index && (
              <div className="p-4 border-t border-[#E5DED3] space-y-4">
                <FormField label="Title" value={item.title} onChange={(v) => updateItem(index, { title: v })} required />
                <FormField label="Description" value={item.description} onChange={(v) => updateItem(index, { description: v })} type="textarea" />
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Year" value={item.year} onChange={(v) => updateItem(index, { year: v })} />
                  <FormField label="Icon" value={item.icon} onChange={(v) => updateItem(index, { icon: v })} placeholder="e.g. trophy, google" />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`highlight-${index}`}
                    checked={item.highlight}
                    onChange={(e) => updateItem(index, { highlight: e.target.checked })}
                    className="accent-[#C4703F]"
                  />
                  <label htmlFor={`highlight-${index}`} className="text-sm text-[#5C5C5C]">Highlight</label>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="px-3 py-1.5 text-sm text-red-500 border border-red-300 rounded-lg hover:bg-red-50 transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          className="w-full py-3 text-sm text-[#C4703F] border-2 border-dashed border-[#C4703F] rounded-xl hover:bg-[#C4703F] hover:text-white transition cursor-pointer"
        >
          + Add Achievement
        </button>

        <SaveButton saving={saving} saved={saved} error={error} onClick={handleSave} />
      </div>
    </div>
  );
}
