import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  containerWidth?: "default" | "narrow" | "wide" | "full";
}

const containerClasses = {
  default: "max-w-7xl mx-auto",
  narrow: "max-w-4xl mx-auto",
  wide: "max-w-[1600px] mx-auto",
  full: "w-full",
};

export function Section({
  id,
  children,
  className,
  containerWidth = "default",
}: SectionProps) {
  return (
    <section id={id} className={cn("section-padding", className)}>
      <div className={containerClasses[containerWidth]}>{children}</div>
    </section>
  );
}
