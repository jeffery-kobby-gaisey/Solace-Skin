import { icons, type LucideProps } from "lucide-react";

/** Renders a lucide-react icon by its string name (used with our data files). */
export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const LucideIcon = icons[name as keyof typeof icons] ?? icons.Sparkles;
  return <LucideIcon {...props} />;
}
