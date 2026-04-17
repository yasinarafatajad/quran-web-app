import { Surah, Ayah, SurahDetail, SearchMatch } from "@/types/quran";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.alquran.cloud/v1";

/**
 * Fetch all 114 surahs metadata
 */
export async function getAllSurahs(): Promise<Surah[]> {
  const res = await fetch(`${BASE_URL}/surah`, { next: { revalidate: 86400 } });
  if (!res.ok) throw new Error("Failed to fetch surahs");
  const data = await res.json();
  return data.data as Surah[];
}

/**
 * Fetch a single surah with Arabic (Uthmani) text, English and Bangla translations
 */
export async function getSurahWithTranslation(
  surahNumber: number,
): Promise<SurahDetail> {
  const [arabicRes, translationRes, banglaRes] = await Promise.all([
    fetch(`${BASE_URL}/surah/${surahNumber}/quran-uthmani`, {
      next: { revalidate: 86400 },
    }),
    fetch(`${BASE_URL}/surah/${surahNumber}/en.sahih`, {
      next: { revalidate: 86400 },
    }),
    fetch(`${BASE_URL}/surah/${surahNumber}/bn.bengali`, {
      next: { revalidate: 86400 },
    }),
  ]);

  if (!arabicRes.ok || !translationRes.ok || !banglaRes.ok) {
    throw new Error(`Failed to fetch surah ${surahNumber}`);
  }

  const arabicData = await arabicRes.json();
  const translationData = await translationRes.json();
  const banglaData = await banglaRes.json();

  const surahMeta: Surah = {
    number: arabicData.data.number,
    name: arabicData.data.name,
    englishName: arabicData.data.englishName,
    englishNameTranslation: arabicData.data.englishNameTranslation,
    numberOfAyahs: arabicData.data.numberOfAyahs,
    revelationType: arabicData.data.revelationType,
  };

  return {
    surah: surahMeta,
    arabicAyahs: arabicData.data.ayahs as Ayah[],
    translationAyahs: translationData.data.ayahs as Ayah[],
    banglaAyahs: banglaData.data.ayahs as Ayah[],
  };
}

/**
 * Search ayahs by keyword in both English and Bangla translations
 */
export async function searchAyahs(query: string): Promise<SearchMatch[]> {
  if (!query.trim()) return [];

  const encoded = encodeURIComponent(query);

  const [enRes, bnRes] = await Promise.all([
    fetch(`${BASE_URL}/search/${encoded}/all/en.sahih`, {
      cache: "no-store",
    }).catch(() => null),
    fetch(`${BASE_URL}/search/${encoded}/all/bn.bengali`, {
      cache: "no-store",
    }).catch(() => null),
  ]);

  const parseMatches = async (
    res: Response | null,
    lang: string,
  ): Promise<SearchMatch[]> => {
    if (!res || !res.ok) return [];
    const data = await res.json();
    if (data.code !== 200 || !data.data?.matches) return [];
    return data.data.matches.map(
      (m: {
        number: number;
        text: string;
        numberInSurah: number;
        surah: Surah;
      }) => ({
        number: m.number,
        text: m.text,
        numberInSurah: m.numberInSurah,
        surah: m.surah,
        lang,
      }),
    );
  };

  const [enMatches, bnMatches] = await Promise.all([
    parseMatches(enRes, "en"),
    parseMatches(bnRes, "bn"),
  ]);

  // Merge and deduplicate by global ayah number (prefer Bangla if both match)
  const seen = new Map<number, SearchMatch>();
  for (const m of bnMatches) seen.set(m.number, m);
  for (const m of enMatches) {
    if (!seen.has(m.number)) seen.set(m.number, m);
  }

  return Array.from(seen.values());
}
