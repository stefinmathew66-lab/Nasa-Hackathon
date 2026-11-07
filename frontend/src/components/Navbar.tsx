import React from 'react';
import { Globe, Satellite, MessageSquare, Download, Compass } from 'lucide-react';
import { Translations } from '../locales/translations';

interface NavbarProps {
  t: Translations;
  currentLang: string;
  onLanguageChange: (lang: string) => void;
  dataSource?: string;
  onOpenSms: () => void;
  onPrint: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  t,
  currentLang,
  onLanguageChange,
  dataSource = "SMAP & POWER Live",
  onOpenSms,
  onPrint
}) => {
  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-zinc-200 sticky top-0 z-40 no-print">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 max-w-[1600px] mx-auto">
        {/* Brand & Left Cluster */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-zinc-900 flex items-center justify-center text-white shadow-sm">
              <Satellite className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm sm:text-base tracking-tight text-zinc-900 leading-none">
                  {t.brandName}
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium bg-zinc-100 text-zinc-600 border border-zinc-200">
                  {t.adssVersion}
                </span>
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-medium text-emerald-800 truncate max-w-[240px]">
              {dataSource === "SMAP & POWER Live" ? t.liveSatApi : dataSource}
            </span>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Dropdown Pill */}
          <div className="flex items-center gap-1 bg-zinc-100 hover:bg-zinc-200/70 px-2.5 py-1 rounded-md border border-zinc-200 transition-colors">
            <Globe className="w-3.5 h-3.5 text-zinc-500" />
            <select
              value={currentLang}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="bg-transparent text-xs text-zinc-700 font-medium focus:outline-none cursor-pointer pr-1"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="sw">Kiswahili</option>
              <option value="es">Español</option>
            </select>
          </div>

          {/* SMS / WhatsApp Pill Button */}
          <button
            onClick={onOpenSms}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-zinc-200 text-xs font-medium text-zinc-700 bg-white hover:bg-zinc-50 transition-colors cursor-pointer shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.whatsappSms}</span>
          </button>

          {/* Primary Action Button: Export */}
          <button
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 transition-colors cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-zinc-300" />
            <span>{t.exportDossier}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
