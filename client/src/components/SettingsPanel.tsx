"use client";

import { useSettings } from "./SettingsProvider";

const FONT_OPTIONS = [
  { value: "Amiri" as const, label: "Amiri", sample: "بِسْمِ ٱللَّهِ" },
  {
    value: "Scheherazade New" as const,
    label: "Scheherazade New",
    sample: "بِسْمِ ٱللَّهِ",
  },
];

export default function SettingsPanel() {
  const { settings, updateSettings, isSettingsOpen, closeSettings } =
    useSettings();

  return (
    <>
      {/* Overlay */}
      {isSettingsOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={closeSettings}
        />
      )}

      {/* Panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-zinc-900 shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          isSettingsOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-200 dark:border-zinc-700">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Settings
            </h2>
            <button
              onClick={closeSettings}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Close settings"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
            {/* Arabic Font Selection */}
            <div>
              <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-3">
                Arabic Font
              </label>
              <div className="space-y-2">
                {FONT_OPTIONS.map((font) => (
                  <button
                    key={font.value}
                    onClick={() => updateSettings({ arabicFont: font.value })}
                    className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                      settings.arabicFont === font.value
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30"
                        : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
                    }`}
                  >
                    <span className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {font.label}
                    </span>
                    <span
                      className="block text-xl mt-1 text-zinc-700 dark:text-zinc-300"
                      style={{ fontFamily: `"${font.value}", serif` }}
                      dir="rtl"
                    >
                      {font.sample}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Arabic Font Size */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  Arabic Font Size
                </label>
                <span className="text-sm font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                  {settings.arabicFontSize}px
                </span>
              </div>
              <input
                type="range"
                min="18"
                max="48"
                step="2"
                value={settings.arabicFontSize}
                onChange={(e) =>
                  updateSettings({ arabicFontSize: Number(e.target.value) })
                }
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-xs text-zinc-400 mt-1">
                <span>Small</span>
                <span>Large</span>
              </div>
            </div>

            {/* Translation Font Size */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  Translation Font Size
                </label>
                <span className="text-sm font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                  {settings.translationFontSize}px
                </span>
              </div>
              <input
                type="range"
                min="12"
                max="28"
                step="1"
                value={settings.translationFontSize}
                onChange={(e) =>
                  updateSettings({
                    translationFontSize: Number(e.target.value),
                  })
                }
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-xs text-zinc-400 mt-1">
                <span>Small</span>
                <span>Large</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-700">
            <p className="text-xs text-zinc-400 dark:text-zinc-500 text-center">
              Settings are saved automatically
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
