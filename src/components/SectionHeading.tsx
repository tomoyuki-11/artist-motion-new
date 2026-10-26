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
  className,
}: SectionHeadingProps) {
  return (
    <>
      <div
        className={cn("relative overflow-hidden py-8 md:py-20", className)}
        style={{ width: "100vw", marginLeft: "calc(50% - 50vw)" }}
      >
        {/* 背景画像 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/section-bg.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover grayscale"
        />
        {/* 暗めオーバーレイ */}
        <div className="absolute inset-0 bg-black/85" />
        {/* 見出しコンテンツ */}
        <div className="relative z-10 container max-w-5xl text-center">
          <div className="accent-line mb-6 mx-auto bg-white/80" />
          <div className="relative">
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[4rem] font-black leading-none tracking-tight sm:text-[6rem] md:text-[7.5rem] lg:text-[9rem] text-white/10"
            >
              {eyebrow}
            </span>
            <h2 className="relative mb-2 text-2xl font-bold tracking-tight md:text-4xl lg:text-5xl text-white">
              {eyebrow}
            </h2>
          </div>
          <p className="text-xs font-medium tracking-widest text-white/60 md:text-sm">
            {label}
          </p>
        </div>
      </div>
      {description && (
        <p className="mt-6 mx-auto max-w-xl text-center text-base md:text-lg text-slate-600 leading-relaxed">
          {description}
        </p>
      )}
    </>
  );
}
