import React from 'react';
import { Globe, Satellite, Sprout } from 'lucide-react';
import { Translations } from '../locales/translations';

interface NavbarProps {
  t: Translations;
  currentLang: string;
  onLanguageChange: (lang: string) => void;
  dataSource?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  t,
  currentLang,
  onLanguageChange,
  dataSource = "NASA POWER & SMAP Satellites"
}) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 shadow-md sticky top-0 z-50 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-400 flex items-center justify-center shadow-lg shadow-green-900/40">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-green-200 bg-clip-text text-transparent">
                NASA Crop Advisor
              </span>
              <span className="hidden sm:inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800">
                Space Apps 2026
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-4">
          {/* Satellite live status indicator */}
          <div className="hidden md:flex items-center space-x-2 text-xs bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700/60">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <Satellite className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-slate-300 truncate max-w-[200px]" title={dataSource}>
              {dataSource}
            </span>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center space-x-1.5 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
            <Globe className="w-4 h-4 text-slate-400" />
            <select
              value={currentLang}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="bg-transparent text-sm text-slate-200 focus:outline-none cursor-pointer pr-1"
            >
              <option value="en" className="bg-slate-800 text-white">English (EN)</option>
              <option value="hi" className="bg-slate-800 text-white">हिन्दी (HI)</option>
              <option value="sw" className="bg-slate-800 text-white">Kiswahili (SW)</option>
              <option value="es" className="bg-slate-800 text-white">Español (ES)</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
