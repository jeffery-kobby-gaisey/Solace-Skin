import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-sage text-white shadow-soft hover:bg-sage-dark hover:shadow-glow hover:-translate-y-0.5",
        gold: "bg-gold text-white shadow-soft hover:bg-gold/90 hover:-translate-y-0.5",
        outline:
          "border border-sage/50 text-ink hover:border-sage hover:bg-sage/10",
        ghost: "text-ink hover:bg-ink/5",
        white:
          "bg-white text-ink shadow-soft hover:-translate-y-0.5 hover:shadow-glow",
      },
      size: {
        sm: "h-10 px-5 text-sm",
        md: "h-12 px-7 text-sm",
        lg: "h-14 px-9 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { href?: string };

export function Button({
  className,
  variant,
  size,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);
  if (href) {
    const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
    if (external) {
      return (
        <a className={classes} href={href} {...(props as any)} />
      );
    }
    return <Link className={classes} href={href} {...(props as any)} />;
  }
  return <button className={classes} {...props} />;
}

export { buttonVariants };
