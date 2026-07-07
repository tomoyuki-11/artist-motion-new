import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import { COLUMNS } from "@/data/columns";

export function ColumnClient() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />

      <section className="py-16 md:py-24">
        <div className="container max-w-5xl">
          <div className="mb-8">
            <div className="accent-line bg-slate-400 mb-4 w-16" />
            <h1 className="text-2xl md:text-4xl font-bold text-slate-800 tracking-tight">
              子育てコラム
            </h1>
            <p className="mt-3 text-slate-600 leading-relaxed">
              子育てに役立つ情報や日々の気づきをお届けします。
            </p>
          </div>

          <ul className="list-none m-0 p-0 space-y-0 border-t border-slate-200">
            {COLUMNS.map((col) => (
              <li key={col.slug} className="border-b border-slate-200 py-4 md:py-5">
                <Link
                  href={`/column/${col.slug}`}
                  className="block hover:bg-slate-100/60 transition-colors -mx-2 px-2 py-1"
                >
                  <h2 className="text-lg font-bold text-slate-800 mb-1">
                    {col.title}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                    {col.excerpt}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Link
              href="/"
              className="inline-flex items-center text-slate-600 hover:text-slate-800 font-medium text-sm"
            >
              ← トップページへ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
