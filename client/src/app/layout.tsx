import type { Metadata } from "next";
import { Amiri, Scheherazade_New, Inter } from "next/font/google";
import { SettingsProvider } from "@/components/SettingsProvider";
import Header from "@/components/Header";
import SettingsPanel from "@/components/SettingsPanel";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  weight: ["400", "700"],
  subsets: ["arabic", "latin"],
  display: "swap",
});

const scheherazade = Scheherazade_New({
  variable: "--font-scheherazade",
  weight: ["400", "700"],
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Quran | The Supreme Rule of Your Life",
    template: "%s | Quran",
  },
  description:
    "Read the Holy Quran online with Arabic Uthmani text and Sahih International English translation. Beautiful, fast, and responsive.",
  keywords: [
    "Quran",
    "القرآن",
    "Holy Quran",
    "Arabic",
    "English Translation",
    "Sahih International",
    "Islam",
  ],
  openGraph: {
    title: "Quran | The Supreme Rule of Your Life",
    description:
      "Read the Holy Quran with Arabic text and English translation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${amiri.variable} ${scheherazade.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
        <SettingsProvider>
          <Header />
          <div className="flex-1 flex flex-col">{children}</div>
          <SettingsPanel />

          {/* Footer */}
          <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
              <p className="text-center text-xs text-zinc-400 dark:text-zinc-500">
                The Noble Quran — Arabic text (Uthmani script) with Sahih
                International English translation.
                <br />
                Data sourced from{" "}
                <a
                  href="https://alquran.cloud"
                  className="underline hover:text-emerald-500 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  AlQuran Cloud
                </a>
                <br />
                <span className="text-center text-sm text-zinc-900 dark:text-zinc-200">
                  Designed and Developed by{" "}
                  <a
                    href="https://ajad.pro.bd"
                    className="underline hover:text-emerald-500 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Yasin Arafat Ajad
                  </a>
                </span>
              </p>
            </div>
          </footer>
        </SettingsProvider>
      </body>
    </html>
  );
}
