export interface Surah {
  number: number;
  name: string; // Arabic name
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string; // "Meccan" or "Medinan"
}

export interface Ayah {
  number: number; // global ayah number
  numberInSurah: number;
  text: string;
  juz: number;
  page: number;
  hizbQuarter: number;
}

export interface SurahDetail {
  surah: Surah;
  arabicAyahs: Ayah[];
  translationAyahs: Ayah[];
  banglaAyahs: Ayah[];
}

export interface SearchMatch {
  number: number;
  text: string;
  numberInSurah: number;
  surah: Surah;
  lang?: string; // "en" or "bn"
}
