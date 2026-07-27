import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  label: string;
  description?: string;
  accentClassName?: string;
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  label,
  description,
  accentClassName = "bg-slate-500",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <div className={cn("relative overflow-hidden text-center", className)}>
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[4rem] font-black leading-none tracking-tight sm:text-[6rem] md:text-[7.5rem] lg:text-[9rem]",
          isDark ? "text-white/[0.06]" : "text-slate-900/[0.04]"
        )}
      >
        {eyebrow}
      </span>

      <div className={cn("accent-line mb-6 mx-auto", accentClassName)} />
      <h2
        className={cn(
          "mb-2 text-2xl font-bold tracking-tight md:text-4xl lg:text-5xl",
          isDark ? "text-white" : "text-slate-800"
        )}
      >
        {eyebrow}
      </h2>
      <p className="mb-4 text-xs font-medium tracking-widest text-slate-400 md:text-sm">
        {label}
      </p>
      {description && (
        <p
          className={cn(
            "mx-auto max-w-xl text-lg md:text-xl",
            isDark ? "text-slate-300" : "text-slate-600"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
