import Link from "next/link";
import { Surah } from "@/types/quran";

export default function SurahCard({ surah }: { surah: Surah }) {
  return (
    <Link
      href={`/surah/${surah.number}`}
      className="group relative block rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 p-5 transition-all duration-300 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-0.5"
    >
      {/* Surah number badge */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 flex items-center justify-center border border-emerald-200/50 dark:border-emerald-800/30">
          <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
            {surah.number}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                {surah.englishName}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                {surah.englishNameTranslation}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p
                className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 leading-tight"
                style={{ fontFamily: '"Amiri", serif' }}
                dir="rtl"
              >
                {surah.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-2.5">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
              {surah.revelationType}
            </span>
            <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
              {surah.numberOfAyahs} Ayahs
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
