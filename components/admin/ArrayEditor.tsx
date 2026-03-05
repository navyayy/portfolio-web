"use client";

interface ArrayEditorProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}

export function ArrayEditor({ label, items, onChange, placeholder }: ArrayEditorProps) {
  function addItem() {
    onChange([...items, ""]);
  }

  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  function updateItem(index: number, value: string) {
    const updated = [...items];
    updated[index] = value;
    onChange(updated);
  }

  function moveItem(index: number, direction: -1 | 1) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= items.length) return;
    const updated = [...items];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    onChange(updated);
  }

  return (
    <div>
      <label className="block text-sm font-medium text-[#5C5C5C] mb-2">{label}</label>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-3 py-2 border border-[#E5DED3] rounded-lg bg-[#FAF7F2] text-[#1A1A1A] text-sm focus:outline-none focus:ring-2 focus:ring-[#C4703F] focus:border-transparent transition"
            />
            <button
              type="button"
              onClick={() => moveItem(index, -1)}
              disabled={index === 0}
              className="p-1.5 text-[#8A8A8A] hover:text-[#1A1A1A] disabled:opacity-30 cursor-pointer"
              title="Move up"
            >
              &#9650;
            </button>
            <button
              type="button"
              onClick={() => moveItem(index, 1)}
              disabled={index === items.length - 1}
              className="p-1.5 text-[#8A8A8A] hover:text-[#1A1A1A] disabled:opacity-30 cursor-pointer"
              title="Move down"
            >
              &#9660;
            </button>
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="p-1.5 text-red-400 hover:text-red-600 cursor-pointer"
              title="Remove"
            >
              &#10005;
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addItem}
        className="mt-2 px-3 py-1.5 text-sm text-[#C4703F] border border-[#C4703F] rounded-lg hover:bg-[#C4703F] hover:text-white transition cursor-pointer"
      >
        + Add Item
      </button>
    </div>
  );
}
