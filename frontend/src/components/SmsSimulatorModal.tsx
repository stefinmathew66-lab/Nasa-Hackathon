import React, { useState, useEffect } from 'react';
import { 
  X, 
  MessageSquare, 
  Phone, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  Play, 
  Square, 
  Radio, 
  Smartphone,
  PhoneIncoming,
  Headphones
} from 'lucide-react';
import { Translations } from '../locales/translations';

interface SmsSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  smsText: string;
  whatsappText: string;
  voiceScript?: string;
  currentLang?: string;
  t?: Translations;
}

export const SmsSimulatorModal: React.FC<SmsSimulatorModalProps> = ({
  isOpen,
  onClose,
  smsText,
  whatsappText,
  voiceScript = "",
  currentLang = "en",
  t
}) => {
  const [tab, setTab] = useState<'sms' | 'whatsapp' | 'voice'>('sms');
  const [copied, setCopied] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  // Stop any active speech synthesis when closing or switching tabs
  const stopVoice = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingVoice(false);
  };

  useEffect(() => {
    return () => {
      stopVoice();
    };
  }, [isOpen, tab]);

  if (!isOpen) return null;

  const currentContent = tab === 'sms' ? smsText : (tab === 'whatsapp' ? whatsappText : voiceScript);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleVoice = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert("Browser speech synthesis is not supported on this device.");
      return;
    }

    if (isPlayingVoice) {
      stopVoice();
      return;
    }

    const textToSpeak = voiceScript || smsText;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    // Map language code to BCP 47 voice tag
    const langVoiceMap: Record<string, string> = {
      hi: 'hi-IN',
      sw: 'sw-KE',
      es: 'es-ES',
      en: 'en-US'
    };

    utterance.lang = langVoiceMap[currentLang] || 'en-US';
    utterance.rate = 0.95; // Slightly slower for clear agricultural comprehension

    utterance.onend = () => {
      setIsPlayingVoice(false);
    };

    utterance.onerror = () => {
      setIsPlayingVoice(false);
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsPlayingVoice(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-zinc-200 overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-4 bg-zinc-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Radio className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm leading-tight">
                {t?.lowTechTitle || "Multi-Channel Delivery Simulator"}
              </h3>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                {t?.cheapestDeviceFirst || "Reaching 100% of Farmers via SMS, WhatsApp & Spoken Voice"}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              stopVoice();
              onClose();
            }}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 3-Channel Route Selector Tab Switch */}
        <div className="grid grid-cols-3 bg-zinc-100 p-1.5 border-b border-zinc-200 text-xs font-medium">
          <button
            onClick={() => {
              stopVoice();
              setTab('sms');
            }}
            className={`py-2 px-1 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
              tab === 'sms'
                ? 'bg-white text-zinc-900 shadow-xs font-semibold'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="truncate">{t?.basicSms || "SMS (2G Phone)"}</span>
          </button>

          <button
            onClick={() => {
              stopVoice();
              setTab('whatsapp');
            }}
            className={`py-2 px-1 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
              tab === 'whatsapp'
                ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="truncate">{t?.whatsAppCard || "WhatsApp"}</span>
          </button>

          <button
            onClick={() => setTab('voice')}
            className={`py-2 px-1 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
              tab === 'voice'
                ? 'bg-zinc-900 text-white shadow-xs font-semibold'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <Headphones className="w-3.5 h-3.5 text-emerald-400" />
            <span className="truncate">{t?.voiceCall || "Voice Call (IVR)"}</span>
          </button>
        </div>

        {/* Simulator Frame Display */}
        <div className="p-5 bg-zinc-50 flex items-center justify-center min-h-[310px]">
          {tab === 'sms' && (
            /* Nokia / Feature Phone Monospace View */
            <div className="w-full bg-[#8CA48F] border-4 border-zinc-800 rounded-xl p-4 shadow-inner text-zinc-950 font-mono text-xs leading-relaxed">
              <div className="border-b border-zinc-800/30 pb-1 mb-2 flex justify-between text-[10px] uppercase font-bold text-zinc-900">
                <span>SIM 1: GSM 2G</span>
                <span>INBOX (1)</span>
              </div>
              <div className="whitespace-pre-wrap font-semibold tracking-tight">
                {smsText}
              </div>
              <div className="mt-4 pt-2 border-t border-zinc-800/20 text-[10px] flex justify-between text-zinc-800 font-sans">
                <span>{smsText.length} / 160 Chars (Single SMS)</span>
                <span>Carrier Fee: ~$0.0075</span>
              </div>
            </div>
          )}

          {tab === 'whatsapp' && (
            /* WhatsApp Chat Bubble View */
            <div className="w-full bg-[#E5DDD5] border-4 border-zinc-800 rounded-xl p-4 shadow-md text-xs">
              <div className="bg-emerald-800 text-white p-2.5 -mx-4 -mt-4 mb-3 rounded-t-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-[11px]">
                    NASA
                  </div>
                  <div>
                    <div className="font-semibold text-xs leading-none">NASA AgroSphere Extension</div>
                    <div className="text-[10px] text-emerald-200 mt-0.5">Verified Extension Partner</div>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-700/80 px-2 py-0.5 rounded text-emerald-100">Live</span>
              </div>

              <div className="bg-white rounded-lg p-3 shadow-xs text-zinc-900 whitespace-pre-wrap leading-relaxed border border-zinc-200/60 max-h-[220px] overflow-y-auto">
                {whatsappText}
              </div>
            </div>
          )}

          {tab === 'voice' && (
            /* Interactive Spoken Voice / IVR Phone Call Screen */
            <div className="w-full bg-zinc-900 border-4 border-zinc-800 rounded-xl p-5 shadow-xl text-white flex flex-col justify-between min-h-[260px]">
              <div>
                <div className="flex items-center justify-between text-xs text-zinc-400 pb-2 border-b border-zinc-800">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    {t?.incomingCall || "Toll-Free Farmer Hotline"}
                  </span>
                  <span>1800-AGRO-NASA</span>
                </div>

                <div className="text-center my-4">
                  <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center transition-all ${
                    isPlayingVoice 
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-105' 
                      : 'bg-zinc-800 text-zinc-300'
                  }`}>
                    {isPlayingVoice ? (
                      <Volume2 className="w-7 h-7 animate-pulse" />
                    ) : (
                      <PhoneIncoming className="w-7 h-7" />
                    )}
                  </div>
                  <div className="text-sm font-semibold text-zinc-100 mt-2">
                    {isPlayingVoice ? "Speaking to Farmer..." : "Press Play to Listen to Spoken Call"}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">
                    Audio Language: <strong className="text-emerald-400 uppercase">{currentLang}</strong> (Zero Literacy Barrier)
                  </div>
                </div>
              </div>

              {/* Spoken Text Script Preview */}
              <div className="bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 text-xs text-zinc-300 max-h-[85px] overflow-y-auto leading-relaxed">
                <span className="text-zinc-500 font-medium block text-[10px] uppercase mb-0.5">
                  {t?.spokenTextLabel || "Spoken Audio Script"}:
                </span>
                {voiceScript || smsText}
              </div>

              {/* Audio Control Action Button */}
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={handleToggleVoice}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer ${
                    isPlayingVoice
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-xs'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs'
                  }`}
                >
                  {isPlayingVoice ? (
                    <>
                      <Square className="w-3.5 h-3.5 fill-current" />
                      <span>{t?.stopVoiceAdvisory || "End Call"}</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{t?.playVoiceAdvisory || "Listen to Spoken Call"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Strip */}
        <div className="p-3.5 bg-white border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
          <span className="truncate max-w-[280px]">
            {tab === 'sms' && "Compatible with all 2G GSM cellular towers (USSD / Shortcode)"}
            {tab === 'whatsapp' && "Meta Cloud API & Twilio WhatsApp Business Gateway"}
            {tab === 'voice' && "Twilio Voice IVR & Interactive Audio hotline (No literacy required)"}
          </span>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 transition cursor-pointer shadow-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (t?.copied || "Copied!") : (t?.copyText || "Copy Text")}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
