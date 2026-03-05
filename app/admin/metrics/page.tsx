"use client";

import { useSection } from "@/lib/useSection";
import { FormField } from "@/components/admin/FormField";
import { SaveButton } from "@/components/admin/SaveButton";

interface MetricsData {
  sectionTitle: string;
  items: { value: number; suffix: string; label: string; description: string }[];
}

export default function MetricsEditor() {
  const { data, setData, loading, saving, saved, error, save } = useSection<MetricsData>("metrics");

  if (loading || !data) return <div className="text-[#8A8A8A]">Loading...</div>;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!data) return;
    save(data);
  }

  function updateItem(index: number, field: string, value: string | number) {
    if (!data) return;
    const items = [...data.items];
    items[index] = { ...items[index], [field]: value };
    setData({ ...data, items });
  }

  function addItem() {
    if (!data) return;
    setData({
      ...data,
      items: [...data.items, { value: 0, suffix: "", label: "", description: "" }],
    });
  }

  function removeItem(index: number) {
    if (!data) return;
    setData({ ...data, items: data.items.filter((_, i) => i !== index) });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A1A] mb-6">Metrics</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <FormField
          label="Section Title"
          value={data.sectionTitle}
          onChange={(v) => setData({ ...data, sectionTitle: v })}
        />

        <div className="space-y-4">
          <label className="block text-sm font-medium text-[#5C5C5C]">Metric Items</label>
          {data.items.map((item, index) => (
            <div key={index} className="p-4 bg-white border border-[#E5DED3] rounded-xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-[#8A8A8A]">Metric #{index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="text-red-400 hover:text-red-600 text-sm cursor-pointer"
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  label="Value"
                  value={String(item.value)}
                  onChange={(v) => updateItem(index, "value", Number(v) || 0)}
                  type="number"
                />
                <FormField
                  label="Suffix"
                  value={item.suffix}
                  onChange={(v) => updateItem(index, "suffix", v)}
                  placeholder="e.g. %, +"
                />
              </div>
              <FormField
                label="Label"
                value={item.label}
                onChange={(v) => updateItem(index, "label", v)}
              />
              <FormField
                label="Description"
                value={item.description}
                onChange={(v) => updateItem(index, "description", v)}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addItem}
            className="px-3 py-1.5 text-sm text-[#C4703F] border border-[#C4703F] rounded-lg hover:bg-[#C4703F] hover:text-white transition cursor-pointer"
          >
            + Add Metric
          </button>
        </div>

        <SaveButton saving={saving} saved={saved} error={error} />
      </form>
    </div>
  );
}
