import { getAllSurahs } from "@/lib/api";
import SurahCard from "@/components/SurahCard";

export default async function HomePage() {
  const surahs = await getAllSurahs();

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Hero section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 dark:from-emerald-900 dark:via-emerald-950 dark:to-teal-950 px-6 sm:px-12 py-14 sm:py-20 mb-10 sm:mb-14 text-center">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-6 left-10 w-72 h-72 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-6 right-10 w-64 h-64 rounded-full bg-teal-300 blur-3xl" />
        </div>

        {/* Geometric pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10">
          {/* Arabic calligraphy title */}
          <h1
            className="text-5xl sm:text-7xl font-bold text-white mb-4 drop-shadow-lg"
            style={{ fontFamily: '"Amiri", serif' }}
            dir="rtl"
          >
            القرآن الكريم
          </h1>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-white/30" />
            <div className="w-2 h-2 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50" />
            <div className="w-12 h-px bg-white/30" />
          </div>

          {/* Bangla inspirational quote */}
          <p
            className="text-lg sm:text-xl text-emerald-100 mb-2 font-medium"
            lang="bn"
          >
            &ldquo;এটি সেই কিতাব, যাতে কোনো সন্দেহ নেই, মুত্তাকীদের জন্য
            হিদায়াত&rdquo;
          </p>

          {/* English inspirational quote */}
          <p className="text-sm sm:text-base text-emerald-200/80 mb-6 italic">
            &ldquo;This is the Book about which there is no doubt, a guidance
            for the righteous&rdquo;
          </p>

          <p className="text-xs text-emerald-300/60">
            — সূরা আল-বাকারা ২:২ &nbsp;|&nbsp; Surah Al-Baqarah 2:2
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 mt-8 pt-6 border-t border-white/10">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white">114</p>
              <p className="text-xs text-emerald-200/60">সূরা / Surahs</p>
            </div>
            <div className="w-px h-10 bg-white/15" />
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white">6,236</p>
              <p className="text-xs text-emerald-200/60">আয়াত / Ayahs</p>
            </div>
            <div className="w-px h-10 bg-white/15" />
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white">30</p>
              <p className="text-xs text-emerald-200/60">পারা / Juz</p>
            </div>
          </div>
        </div>
      </div>

      {/* Surah grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {surahs.map((surah) => (
          <SurahCard key={surah.number} surah={surah} />
        ))}
      </div>
    </main>
  );
}
