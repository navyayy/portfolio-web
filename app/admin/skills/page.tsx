"use client";

import { useSection } from "@/lib/useSection";
import { FormField, SelectField } from "@/components/admin/FormField";
import { ArrayEditor } from "@/components/admin/ArrayEditor";
import { SaveButton } from "@/components/admin/SaveButton";
import type { SkillCategory, FeaturedSkill } from "@/types/portfolio";

interface SkillsData {
  sectionTitle: string;
  subtitle: string;
  categories: SkillCategory[];
  featured: FeaturedSkill[];
}

export default function SkillsEditor() {
  const { data, setData, loading, saving, saved, error, save } = useSection<SkillsData>("skills");

  if (loading || !data) return <div className="text-[#8A8A8A]">Loading...</div>;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!data) return;
    save(data);
  }

  // Category helpers
  function updateCategory(index: number, updates: Partial<SkillCategory>) {
    if (!data) return;
    const categories = [...data.categories];
    categories[index] = { ...categories[index], ...updates };
    setData({ ...data, categories });
  }

  function addCategory() {
    if (!data) return;
    setData({ ...data, categories: [...data.categories, { name: "", skills: [] }] });
  }

  function removeCategory(index: number) {
    if (!data) return;
    setData({ ...data, categories: data.categories.filter((_, i) => i !== index) });
  }

  // Featured skill helpers
  function updateFeatured(index: number, updates: Partial<FeaturedSkill>) {
    if (!data) return;
    const featured = [...data.featured];
    featured[index] = { ...featured[index], ...updates };
    setData({ ...data, featured });
  }

  function addFeatured() {
    if (!data) return;
    setData({ ...data, featured: [...data.featured, { name: "", icon: "", level: "intermediate" }] });
  }

  function removeFeatured(index: number) {
    if (!data) return;
    setData({ ...data, featured: data.featured.filter((_, i) => i !== index) });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A1A] mb-6">Skills</h1>
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
        {/* Section Heading */}
        <div className="space-y-4 bg-white border border-[#E5DED3] rounded-xl p-4">
          <FormField label="Section Title" value={data.sectionTitle} onChange={(v) => setData({ ...data, sectionTitle: v })} />
          <FormField label="Subtitle" value={data.subtitle} onChange={(v) => setData({ ...data, subtitle: v })} />
        </div>

        {/* Skill Categories */}
        <div>
          <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">Skill Categories</h2>
          <div className="space-y-4">
            {data.categories.map((cat, index) => (
              <div key={index} className="p-4 bg-white border border-[#E5DED3] rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <FormField
                    label="Category Name"
                    value={cat.name}
                    onChange={(v) => updateCategory(index, { name: v })}
                  />
                  <button
                    type="button"
                    onClick={() => removeCategory(index)}
                    className="ml-4 mt-5 text-red-400 hover:text-red-600 text-sm cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
                <ArrayEditor
                  label="Skills"
                  items={cat.skills}
                  onChange={(v) => updateCategory(index, { skills: v })}
                  placeholder="e.g. Content Creation"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addCategory}
              className="px-3 py-1.5 text-sm text-[#C4703F] border border-[#C4703F] rounded-lg hover:bg-[#C4703F] hover:text-white transition cursor-pointer"
            >
              + Add Category
            </button>
          </div>
        </div>

        {/* Featured Skills */}
        <div>
          <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">Featured Skills</h2>
          <div className="space-y-4">
            {data.featured.map((skill, index) => (
              <div key={index} className="p-4 bg-white border border-[#E5DED3] rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="flex-1 grid grid-cols-3 gap-3">
                    <FormField label="Name" value={skill.name} onChange={(v) => updateFeatured(index, { name: v })} />
                    <FormField label="Icon" value={skill.icon} onChange={(v) => updateFeatured(index, { icon: v })} />
                    <SelectField
                      label="Level"
                      value={skill.level}
                      onChange={(v) => updateFeatured(index, { level: v as FeaturedSkill["level"] })}
                      options={[
                        { label: "Beginner", value: "beginner" },
                        { label: "Intermediate", value: "intermediate" },
                        { label: "Advanced", value: "advanced" },
                        { label: "Expert", value: "expert" },
                      ]}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFeatured(index)}
                    className="mt-6 text-red-400 hover:text-red-600 cursor-pointer"
                  >
                    &#10005;
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addFeatured}
              className="px-3 py-1.5 text-sm text-[#C4703F] border border-[#C4703F] rounded-lg hover:bg-[#C4703F] hover:text-white transition cursor-pointer"
            >
              + Add Featured Skill
            </button>
          </div>
        </div>

        <SaveButton saving={saving} saved={saved} error={error} />
      </form>
    </div>
  );
}
