'use client';

import React from 'react';
import Image from 'next/image';
import { X, Download, ExternalLink, Sparkles } from 'lucide-react';

interface FlyerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlyerModal: React.FC<FlyerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[92vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-matanavy-900 to-matanavy-800 text-white">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-matablue-500/20 text-matablue-300">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-base font-bold">Flyer Resmi Brosur Harga MataCare Optik</h3>
              <p className="text-xs text-slate-300">Katalog promo lensa & diskon 10%</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable image */}
        <div className="overflow-y-auto p-4 flex justify-center items-center bg-slate-100/70">
          <div className="relative w-full max-w-lg aspect-[1/1.5] shadow-lg rounded-xl overflow-hidden border border-slate-200 bg-white">
            <Image
              src="/images/flyer-matacare.jpg"
              alt="Brosur Resmi Katalog Harga MataCare Optik"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-5 py-3 border-t border-slate-100 bg-white flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <span>Kacamata untuk semua aktivitas Anda ♡</span>
          <div className="flex items-center gap-2">
            <a
              href="/images/flyer-matacare.jpg"
              download="Brosur-MataCare-Optik.jpg"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition"
            >
              <Download className="w-3.5 h-3.5" />
              Unduh Gambar
            </a>
            <a
              href="https://wa.me/6282272108340?text=Halo%20MataCare%20Optik%2C%20saya%20ingin%20tanya%20mengenai%20promo%20lensa%20di%20brosur"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-matablue-500 hover:bg-matablue-600 text-white font-medium shadow-sm transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Konsultasi via WA
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
