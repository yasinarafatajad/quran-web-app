export const dynamic = "force-dynamic";

import { getSurahWithTranslation } from "@/lib/api";
import AyahList from "./AyahList";
import Link from "next/link";
import { Metadata } from "next";

interface Props {
  params: Promise<{ number: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { number } = await params;
  const surahNum = parseInt(number, 10);
  const data = await getSurahWithTranslation(surahNum);
  return {
    title: `${data.surah.englishName} (${data.surah.name}) — The Noble Quran`,
    description: `Read Surah ${data.surah.englishName} (${data.surah.englishNameTranslation}) — ${data.surah.numberOfAyahs} Ayahs. Arabic Uthmani text with Sahih International English translation.`,
  };
}

export default async function SurahPage({ params }: Props) {
  const { number } = await params;
  const surahNum = parseInt(number, 10);
  const data = await getSurahWithTranslation(surahNum);

  const prevSurah = surahNum > 1 ? surahNum - 1 : null;
  const nextSurah = surahNum < 114 ? surahNum + 1 : null;

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          <svg
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          All Surahs
        </Link>
      </nav>

      {/* Surah header */}
      <div className="text-center mb-8 sm:mb-12 pb-8 border-b border-zinc-200 dark:border-zinc-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/30 mb-8">
          <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
            Surah {data.surah.number} • {data.surah.revelationType} •{" "}
            {data.surah.numberOfAyahs} Ayahs
          </span>
        </div>
        <h1
          className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-2"
          style={{ fontFamily: '"Amiri", serif' }}
          dir="rtl"
        >
          {data.surah.name}
        </h1>
        <h2 className="text-xl font-semibold text-zinc-700 dark:text-zinc-300">
          {data.surah.englishName}
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {data.surah.englishNameTranslation}
        </p>

        {/* Bismillah (skip for Surah At-Tawbah) */}
        {surahNum !== 9 && surahNum !== 1 && (
          <p
            className="mt-8 text-2xl sm:text-3xl text-zinc-700 dark:text-zinc-300"
            style={{ fontFamily: '"Amiri", serif' }}
            dir="rtl"
          >
            بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
          </p>
        )}
      </div>

      {/* Ayah list (client component for settings-aware rendering) */}
      <AyahList
        arabicAyahs={data.arabicAyahs.map((a) => ({
          numberInSurah: a.numberInSurah,
          text: a.text,
        }))}
        translationAyahs={data.translationAyahs.map((a) => ({
          numberInSurah: a.numberInSurah,
          text: a.text,
        }))}
        banglaAyahs={data.banglaAyahs.map((a) => ({
          numberInSurah: a.numberInSurah,
          text: a.text,
        }))}
      />

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10 pt-8 border-t border-zinc-200 dark:border-zinc-800">
        {prevSurah ? (
          <Link
            href={`/surah/${prevSurah}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-zinc-700 dark:text-zinc-300 hover:text-emerald-700 dark:hover:text-emerald-400 text-sm font-medium transition-all"
          >
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous Surah
          </Link>
        ) : (
          <div />
        )}
        {nextSurah ? (
          <Link
            href={`/surah/${nextSurah}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-zinc-700 dark:text-zinc-300 hover:text-emerald-700 dark:hover:text-emerald-400 text-sm font-medium transition-all"
          >
            Next Surah
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </main>
  );
}
