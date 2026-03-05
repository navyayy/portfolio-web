"use client";

import { useState } from "react";
import { useSection } from "@/lib/useSection";
import { FormField, SelectField } from "@/components/admin/FormField";
import { ArrayEditor } from "@/components/admin/ArrayEditor";
import { SaveButton } from "@/components/admin/SaveButton";
import type { ExperienceItem } from "@/types/portfolio";

interface ExperienceData {
  sectionTitle: string;
  subtitle: string;
  items: ExperienceItem[];
}

export default function ExperienceEditor() {
  const { data, setData, loading, saving, saved, error, save } = useSection<ExperienceData>("experience");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  if (loading || !data) return <div className="text-[#8A8A8A]">Loading...</div>;

  function handleSave() {
    if (!data) return;
    save(data);
    setEditingIndex(null);
  }

  function updateItem(index: number, updates: Partial<ExperienceItem>) {
    if (!data) return;
    const items = [...data.items];
    items[index] = { ...items[index], ...updates };
    setData({ ...data, items });
  }

  function addItem() {
    if (!data) return;
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      company: "",
      role: "",
      location: "",
      period: "",
      type: "full-time",
      description: "",
      highlights: [],
      skills: [],
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
      <h1 className="text-2xl font-bold text-[#1A1A1A] mb-6">Experience</h1>

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
                <h3 className="font-semibold text-[#1A1A1A]">{item.role || "New Position"}</h3>
                <p className="text-sm text-[#8A8A8A]">{item.company} &middot; {item.period}</p>
              </div>
              <span className="text-[#8A8A8A]">{editingIndex === index ? "▲" : "▼"}</span>
            </div>

            {editingIndex === index && (
              <div className="p-4 border-t border-[#E5DED3] space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Company" value={item.company} onChange={(v) => updateItem(index, { company: v })} required />
                  <FormField label="Role" value={item.role} onChange={(v) => updateItem(index, { role: v })} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Location" value={item.location} onChange={(v) => updateItem(index, { location: v })} />
                  <FormField label="Period" value={item.period} onChange={(v) => updateItem(index, { period: v })} placeholder="e.g. Mar 2025 – Present" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <SelectField
                    label="Type"
                    value={item.type}
                    onChange={(v) => updateItem(index, { type: v as ExperienceItem["type"] })}
                    options={[
                      { label: "Full-time", value: "full-time" },
                      { label: "Part-time", value: "part-time" },
                      { label: "Internship", value: "internship" },
                      { label: "Contract", value: "contract" },
                    ]}
                  />
                  <FormField label="Logo Path" value={item.logo || ""} onChange={(v) => updateItem(index, { logo: v })} />
                </div>
                <FormField label="Description" value={item.description} onChange={(v) => updateItem(index, { description: v })} type="textarea" />
                <ArrayEditor label="Highlights" items={item.highlights} onChange={(v) => updateItem(index, { highlights: v })} placeholder="Key achievement or responsibility" />
                <ArrayEditor label="Skills" items={item.skills} onChange={(v) => updateItem(index, { skills: v })} placeholder="e.g. HubSpot" />
                <ArrayEditor label="Achievements" items={item.achievements || []} onChange={(v) => updateItem(index, { achievements: v })} placeholder="Notable achievement" />

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
          + Add Experience
        </button>

        <SaveButton saving={saving} saved={saved} error={error} onClick={handleSave} />
      </div>
    </div>
  );
}
