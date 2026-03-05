"use client";

import { useState } from "react";
import { useSection } from "@/lib/useSection";
import { FormField, SelectField } from "@/components/admin/FormField";
import { ArrayEditor } from "@/components/admin/ArrayEditor";
import { SaveButton } from "@/components/admin/SaveButton";
import type { CaseStudy } from "@/types/portfolio";

interface CaseStudiesData {
  sectionTitle: string;
  subtitle: string;
  items: CaseStudy[];
}

export default function CaseStudiesEditor() {
  const { data, setData, loading, saving, saved, error, save } = useSection<CaseStudiesData>("caseStudies");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  if (loading || !data) return <div className="text-[#8A8A8A]">Loading...</div>;

  function handleSave() {
    if (!data) return;
    save(data);
    setEditingIndex(null);
  }

  function updateItem(index: number, updates: Partial<CaseStudy>) {
    if (!data) return;
    const items = [...data.items];
    items[index] = { ...items[index], ...updates };
    setData({ ...data, items });
  }

  function addItem() {
    if (!data) return;
    const newItem: CaseStudy = {
      id: `case-${Date.now()}`,
      title: "",
      company: "",
      category: "content",
      featured: false,
      thumbnail: "",
      brief: "",
      metrics: [],
      tools: [],
      link: "",
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
      <h1 className="text-2xl font-bold text-[#1A1A1A] mb-6">Case Studies</h1>

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
                <h3 className="font-semibold text-[#1A1A1A]">{item.title || "New Case Study"}</h3>
                <p className="text-sm text-[#8A8A8A]">{item.company} &middot; {item.category}</p>
              </div>
              <div className="flex items-center gap-3">
                {item.featured && (
                  <span className="text-xs bg-[#C4703F] text-white px-2 py-0.5 rounded-full">Featured</span>
                )}
                <span className="text-[#8A8A8A]">{editingIndex === index ? "▲" : "▼"}</span>
              </div>
            </div>

            {editingIndex === index && (
              <div className="p-4 border-t border-[#E5DED3] space-y-4">
                <FormField label="Title" value={item.title} onChange={(v) => updateItem(index, { title: v })} required />
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Company" value={item.company} onChange={(v) => updateItem(index, { company: v })} />
                  <SelectField
                    label="Category"
                    value={item.category}
                    onChange={(v) => updateItem(index, { category: v as CaseStudy["category"] })}
                    options={[
                      { label: "Content", value: "content" },
                      { label: "Social", value: "social" },
                      { label: "SEO", value: "seo" },
                      { label: "Campaign", value: "campaign" },
                      { label: "Technical", value: "technical" },
                    ]}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`featured-${index}`}
                    checked={item.featured}
                    onChange={(e) => updateItem(index, { featured: e.target.checked })}
                    className="accent-[#C4703F]"
                  />
                  <label htmlFor={`featured-${index}`} className="text-sm text-[#5C5C5C]">Featured</label>
                </div>
                <FormField label="Brief" value={item.brief} onChange={(v) => updateItem(index, { brief: v })} type="textarea" />
                <FormField label="Thumbnail Path" value={item.thumbnail} onChange={(v) => updateItem(index, { thumbnail: v })} />
                <FormField label="Link" value={item.link} onChange={(v) => updateItem(index, { link: v })} />
                <ArrayEditor label="Metrics" items={item.metrics} onChange={(v) => updateItem(index, { metrics: v })} placeholder="e.g. 15% increase in user footfall" />
                <ArrayEditor label="Tools" items={item.tools} onChange={(v) => updateItem(index, { tools: v })} placeholder="e.g. HubSpot" />

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
          + Add Case Study
        </button>

        <SaveButton saving={saving} saved={saved} error={error} onClick={handleSave} />
      </div>
    </div>
  );
}
