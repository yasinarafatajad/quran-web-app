import { Surah, Ayah, SurahDetail, SearchMatch } from "@/types/quran";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.alquran.cloud/v1";

/**
 * Fetch with retry and exponential backoff to handle API rate-limiting
 * during SSG builds (114 surahs × 3 requests each).
 */
async function fetchWithRetry(
  url: string,
  options?: RequestInit,
  retries = 5,
  baseDelay = 1000,
): Promise<Response> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, options);
      if (res.ok) return res;

      // If rate-limited (429) or server error (5xx), retry
      if ((res.status === 429 || res.status >= 500) && attempt < retries) {
        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }
      return res; // Return non-retryable error responses as-is
    } catch (err) {
      if (attempt < retries) {
        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }
      throw err;
    }
  }
  // Should never reach here, but just in case
  return fetch(url, options);
}

/**
 * Fetch all 114 surahs metadata
 */
export async function getAllSurahs(): Promise<Surah[]> {
  const res = await fetchWithRetry(`${BASE_URL}/surah`, {
    next: { revalidate: 86400 },
  });
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
    fetchWithRetry(`${BASE_URL}/surah/${surahNumber}/quran-uthmani`, {
      next: { revalidate: 86400 },
    }),
    fetchWithRetry(`${BASE_URL}/surah/${surahNumber}/en.sahih`, {
      next: { revalidate: 86400 },
    }),
    fetchWithRetry(`${BASE_URL}/surah/${surahNumber}/bn.bengali`, {
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
