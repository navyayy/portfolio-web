"use client";

import { useRef, useState, useCallback } from "react";

export function useMagnetic(strength = 0.3) {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const x = (clientX - (left + width / 2)) * strength;
      const y = (clientY - (top + height / 2)) * strength;
      setPosition({ x, y });
    },
    [strength]
  );

  const reset = useCallback(() => setPosition({ x: 0, y: 0 }), []);

  return { ref, position, handleMouseMove, reset };
}
