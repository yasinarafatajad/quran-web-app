# القرآن الكريم — Quran Web Application

A production-grade Quran web application built with **Next.js 16**, **Tailwind CSS 4**, and **TypeScript**. Features Arabic Uthmani text with both **Bangla** and **English** translations.

> **"এটি সেই কিতাব, যাতে কোনো সন্দেহ নেই, মুত্তাকীদের জন্য হিদায়াত"**
>
> _"This is the Book about which there is no doubt, a guidance for the righteous"_ — Al-Baqarah 2:2

---

## Features

| Feature                    | Description                                                             |
| -------------------------- | ----------------------------------------------------------------------- |
| **Surah List**             | All 114 surahs with Arabic & English names, revelation type, ayah count |
| **Ayat Page**              | Arabic Uthmani text + Bangla & English translations per verse           |
| **Bilingual Search**       | Search ayahs in both English and Bangla translations                    |
| **Settings Panel**         | Arabic font selection (Amiri / Scheherazade New), font size adjustments |
| **Persistent Settings**    | All preferences saved to `localStorage`                                 |
| **Responsive**             | Fully responsive across mobile, tablet, and desktop                     |
| **SSG**                    | Static Site Generation for all 114 surah pages — blazing fast           |
| **Dark Mode**              | Automatic dark mode via `prefers-color-scheme`                          |
| **SEO**                    | Dynamic meta tags, Open Graph, and proper heading structure             |

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Server Components, SSG)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Fonts:** Google Fonts — Inter (UI), Amiri & Scheherazade New (Arabic)
- **Data Source:** [AlQuran Cloud API](https://alquran.cloud/api)
- **Translations:** Sahih International (English), Muhiuddin Khan (বাংলা)

## Project Structure

```
client/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (fonts, SEO, header, footer)
│   │   ├── page.tsx            # Home — Surah list with hero section
│   │   ├── globals.css         # Global styles & design tokens
│   │   ├── search/
│   │   │   └── page.tsx        # Bilingual search page
│   │   └── surah/
│   │       └── [number]/
│   │           ├── page.tsx    # Surah detail (SSG)
│   │           └── AyahList.tsx
│   ├── components/
│   │   ├── Header.tsx          # Navigation header with search
│   │   ├── SettingsPanel.tsx   # Slide-out settings sidebar
│   │   ├── SettingsProvider.tsx # Settings context + localStorage
│   │   ├── SurahCard.tsx       # Surah card for list page
│   │   └── AyahView.tsx        # Single ayah display
│   ├── lib/
│   │   └── api.ts              # AlQuran Cloud API functions
│   └── types/
│       └── quran.ts            # TypeScript interfaces
├── .env                        # Environment variables
├── .env.example                # Environment template
└── package.json
```

## Getting Started

### Prerequisites

- **Node.js** 18+ and **npm**

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd quran/client

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

## Environment Variables

| Variable                   | Default                        | Description                |
| -------------------------- | ------------------------------ | -------------------------- |
| `NEXT_PUBLIC_API_BASE_URL` | `https://api.alquran.cloud/v1` | AlQuran Cloud API base URL |

## API Endpoints Used

| Endpoint                             | Purpose                                   |
| ------------------------------------ | ----------------------------------------- |
| `GET /surah`                         | Fetch all 114 surahs metadata             |
| `GET /surah/{num}/quran-uthmani`     | Arabic Uthmani text                       |
| `GET /surah/{num}/en.sahih`          | English translation (Sahih International) |
| `GET /surah/{num}/bn.bengali`        | Bangla translation (Muhiuddin Khan)       |
| `GET /search/{query}/all/en.sahih`   | Search in English                         |
| `GET /search/{query}/all/bn.bengali` | Search in Bangla                          |

## Design Highlights

- **Emerald/Teal** color palette with gold accents for Islamic aesthetic
- **Gradient hero** with bilingual inspirational quote
- **Smooth transitions** and hover effects throughout
- **Custom scrollbar**, polished range sliders
- **Language badges** (বাংলা / English) on translations and search results

---

**Designed & Developed by [Yasin Arafat Ajad](https://ajad.pro.bd)**
