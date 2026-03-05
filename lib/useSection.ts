"use client";

import { useState, useEffect, useCallback } from "react";

export function useSection<T>(section: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/portfolio/${section}`)
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load data");
        setLoading(false);
      });
  }, [section]);

  const save = useCallback(
    async (updatedData: T | null) => {
      if (!updatedData) return;
      setSaving(true);
      setSaved(false);
      setError("");

      try {
        const res = await fetch(`/api/portfolio/${section}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        });

        if (!res.ok) throw new Error("Save failed");

        setData(updatedData);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } catch {
        setError("Failed to save. Please try again.");
      } finally {
        setSaving(false);
      }
    },
    [section]
  );

  return { data, setData, loading, saving, saved, error, save };
}
