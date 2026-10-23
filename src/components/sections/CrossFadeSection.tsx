import { CrossFadeBackground } from "@/components/CrossFadeBackground";

export function CrossFadeSection() {
  return (
    <section className="relative w-full py-28 md:py-40">
      <CrossFadeBackground />
      <div className="absolute inset-0 w-full h-full bg-slate-900/70" />
    </section>
  );
}
