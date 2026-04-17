"use client";

import { useSettings } from "./SettingsProvider";

interface AyahViewProps {
  ayahNumber: number;
  arabicText: string;
  translationText: string;
  banglaText: string;
}

export default function AyahView({
  ayahNumber,
  arabicText,
  translationText,
  banglaText,
}: AyahViewProps) {
  const { settings } = useSettings();

  return (
    <div className="group relative border-b border-zinc-100 dark:border-zinc-800/60 last:border-b-0 py-6 sm:py-8 transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20">
      <div className="flex gap-3 sm:gap-5">
        {/* Verse number */}
        <div className="flex-shrink-0 pt-1">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/30 flex items-center justify-center">
            <span className="text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-400">
              {ayahNumber}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Arabic text */}
          <p
            className="leading-[2.2] text-zinc-900 dark:text-zinc-100 text-right"
            style={{
              fontFamily: `"${settings.arabicFont}", serif`,
              fontSize: `${settings.arabicFontSize}px`,
            }}
            dir="rtl"
            lang="ar"
          >
            {arabicText}
          </p>

          {/* Bangla translation */}
          <p
            className="leading-relaxed text-zinc-700 dark:text-zinc-300  text-right"
            style={{
              fontSize: `${settings.translationFontSize}px`,
            }}
            lang="bn"
          >
            <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 mr-2 align-middle">
              বাংলা
            </span>
            {banglaText}
          </p>

          {/* English translation */}
          <p
            className="leading-relaxed text-zinc-500 dark:text-zinc-400 text-right"
            style={{
              fontSize: `${settings.translationFontSize}px`,
            }}
          >
            <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 mr-2 align-middle">
              English
            </span>
            {translationText}
          </p>
        </div>
      </div>
    </div>
  );
}
