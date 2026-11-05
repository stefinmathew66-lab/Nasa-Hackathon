import React from 'react';
import { Globe, Satellite, MessageSquare, Download, Sparkles, Sliders } from 'lucide-react';
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
  dataSource = "SMAP & POWER Active • Latency: 1.2h",
  onOpenSms,
  onPrint
}) => {
  return (
    <header className="bg-surface-container-lowest border-b border-outline-variant sticky top-0 w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between z-50 shadow-sm no-print">
      {/* Brand Cluster */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5 cursor-pointer">
          <div className="h-10 w-10 rounded-lg bg-primary-container flex items-center justify-center text-white shadow-sm relative overflow-hidden">
            <Satellite className="w-5 h-5 text-secondary-fixed" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/20"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-headline font-bold text-base sm:text-lg tracking-tight text-primary leading-tight">
                NASA AgroSphere Advisor
              </span>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-primary-fixed text-primary border border-primary-fixed-dim">
                EO-ADSS v4.2
              </span>
            </div>
            <p className="text-[11px] font-mono text-on-surface-variant flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-secondary animate-pulse inline-block"></span>
              <span className="truncate max-w-[280px]" title={dataSource}>{dataSource}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Actions & Profiles Cluster */}
      <div className="flex items-center gap-2.5">
        {/* Language Dropdown Pill */}
        <div className="flex items-center gap-1.5 bg-surface-container-low px-2.5 py-1.5 rounded-lg border border-outline-variant cursor-pointer hover:bg-surface-container-high transition-colors">
          <Globe className="w-4 h-4 text-primary" />
          <select
            value={currentLang}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="bg-transparent text-xs font-mono text-on-surface font-medium focus:outline-none cursor-pointer pr-1"
          >
            <option value="en">English (Global)</option>
            <option value="hi">हिन्दी (India)</option>
            <option value="sw">Kiswahili (East Africa)</option>
            <option value="es">Español (LatAm)</option>
          </select>
        </div>

        {/* SMS Telemetry Secondary Action */}
        <button
          onClick={onOpenSms}
          className="hidden md:inline-flex items-center gap-1.5 bg-surface-container-lowest text-primary font-mono text-xs font-semibold border border-outline-variant px-3 py-1.5 rounded-lg hover:bg-surface-container-low transition-colors duration-150 cursor-pointer active:scale-95"
        >
          <MessageSquare className="w-3.5 h-3.5 text-secondary" />
          <span>SMS / WhatsApp</span>
        </button>

        {/* Primary Action: Export Advisory Dossier */}
        <button
          onClick={onPrint}
          className="inline-flex items-center gap-1.5 bg-primary text-white font-mono text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-sm hover:bg-primary-container transition-colors duration-150 cursor-pointer active:scale-95"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Export Advisory Dossier</span>
          <span className="sm:hidden">Export</span>
        </button>
      </div>
    </header>
  );
};
