"use client";

interface SaveButtonProps {
  saving: boolean;
  saved: boolean;
  error?: string;
  onClick?: () => void;
}

export function SaveButton({ saving, saved, error, onClick }: SaveButtonProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="submit"
        disabled={saving}
        onClick={onClick}
        className="px-6 py-2.5 bg-[#C4703F] text-white font-medium rounded-lg hover:bg-[#b3632f] disabled:opacity-50 transition cursor-pointer"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
      {saved && (
        <span className="text-green-600 text-sm font-medium">Saved successfully!</span>
      )}
      {error && (
        <span className="text-red-600 text-sm font-medium">{error}</span>
      )}
    </div>
  );
}
