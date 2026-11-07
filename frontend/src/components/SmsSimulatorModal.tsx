import React, { useState } from 'react';
import { X, MessageSquare, Phone, Copy, Check } from 'lucide-react';
import { Translations } from '../locales/translations';

interface SmsSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  smsText: string;
  whatsappText: string;
  t?: Translations;
}

export const SmsSimulatorModal: React.FC<SmsSimulatorModalProps> = ({
  isOpen,
  onClose,
  smsText,
  whatsappText,
  t
}) => {
  const [tab, setTab] = useState<'sms' | 'whatsapp'>('sms');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentContent = tab === 'sms' ? smsText : whatsappText;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Phone className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-bold text-sm">{t?.lowTechTitle || "Low-Tech Channel Simulation"}</h3>
              <p className="text-[11px] text-slate-400">{t?.cheapestDeviceFirst || "Design Principle: Cheapest Device First"}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="grid grid-cols-2 bg-slate-100 p-1 border-b border-slate-200 text-xs font-bold">
          <button
            onClick={() => setTab('sms')}
            className={`py-2 rounded-xl transition ${
              tab === 'sms'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {t?.basicSms || "Basic Phone SMS (160 Chars)"}
          </button>
          <button
            onClick={() => setTab('whatsapp')}
            className={`py-2 rounded-xl transition ${
              tab === 'whatsapp'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {t?.whatsAppCard || "WhatsApp Card"}
          </button>
        </div>

        {/* Phone Frame Simulator */}
        <div className="p-6 bg-slate-100 flex items-center justify-center">
          {tab === 'sms' ? (
            /* Nokia / Feature Phone Monospace View */
            <div className="w-full bg-[#8CA48F] border-4 border-slate-800 rounded-2xl p-4 shadow-inner text-slate-900 font-mono text-xs leading-relaxed">
              <div className="border-b border-slate-700/40 pb-1 mb-2 flex justify-between text-[10px] uppercase font-bold text-slate-800">
                <span>SIM 1: 4G/2G</span>
                <span>INBOX</span>
              </div>
              <div className="whitespace-pre-wrap font-bold">
                {smsText}
              </div>
              <div className="mt-4 pt-2 border-t border-slate-700/30 text-[10px] flex justify-between text-slate-800 font-sans">
                <span>Chars: {smsText.length}/160</span>
                <span>Cost: ~$0.01</span>
              </div>
            </div>
          ) : (
            /* WhatsApp Chat Bubble View */
            <div className="w-full bg-[#E5DDD5] border-4 border-slate-800 rounded-2xl p-4 shadow-md text-xs">
              <div className="bg-emerald-800 text-white p-2 -mx-4 -mt-4 mb-3 rounded-t-xl flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-[10px]">
                  NASA
                </div>
                <div>
                  <div className="font-bold text-xs">Crop Advisory Bot</div>
                  <div className="text-[9px] text-emerald-200">Official Extension Service</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 shadow-sm text-slate-800 whitespace-pre-wrap leading-relaxed border border-slate-200">
                {whatsappText}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Works over standard GSM / Telecom Webhook
          </span>

          <button
            onClick={handleCopy}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Text'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

