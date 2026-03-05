"use client";

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "textarea" | "url" | "email" | "tel" | "date" | "number";
  placeholder?: string;
  required?: boolean;
}

export function FormField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: FormFieldProps) {
  const id = label.toLowerCase().replace(/\s+/g, "-");

  const inputClasses =
    "w-full px-3 py-2 border border-[#E5DED3] rounded-lg bg-[#FAF7F2] text-[#1A1A1A] text-sm focus:outline-none focus:ring-2 focus:ring-[#C4703F] focus:border-transparent transition";

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#5C5C5C] mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={4}
          className={inputClasses + " resize-y"}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={inputClasses}
        />
      )}
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}

export function SelectField({ label, value, onChange, options }: SelectFieldProps) {
  const id = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#5C5C5C] mb-1">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-[#E5DED3] rounded-lg bg-[#FAF7F2] text-[#1A1A1A] text-sm focus:outline-none focus:ring-2 focus:ring-[#C4703F] focus:border-transparent transition"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
