"use client";

import AyahView from "@/components/AyahView";

interface SimpleAyah {
  numberInSurah: number;
  text: string;
}

interface AyahListProps {
  arabicAyahs: SimpleAyah[];
  translationAyahs: SimpleAyah[];
  banglaAyahs: SimpleAyah[];
}

export default function AyahList({
  arabicAyahs,
  translationAyahs,
  banglaAyahs,
}: AyahListProps) {
  return (
    <div>
      {arabicAyahs.map((arabic, idx) => (
        <AyahView
          key={arabic.numberInSurah}
          ayahNumber={arabic.numberInSurah}
          arabicText={arabic.text}
          translationText={translationAyahs[idx]?.text ?? ""}
          banglaText={banglaAyahs[idx]?.text ?? ""}
        />
      ))}
    </div>
  );
}
