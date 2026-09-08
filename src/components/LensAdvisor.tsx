'use client';

import React, { useState } from 'react';
import { LENS_PRODUCTS, LensProduct, formatRupiah } from '@/data/catalog';
import { 
  Sparkles, 
  X, 
  CheckCircle2, 
  RotateCcw, 
  ArrowRight, 
  PhoneCall, 
  Glasses, 
  Laptop, 
  Sun, 
  Car, 
  Eye 
} from 'lucide-react';

interface LensAdvisorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LensAdvisor: React.FC<LensAdvisorProps> = ({ isOpen, onClose }) => {
  const [ageGroup, setAgeGroup] = useState<'under40' | 'above40' | null>(null);
  const [activity, setActivity] = useState<'screen' | 'outdoor' | 'driving' | 'mixed' | null>(null);
  const [priority, setPriority] = useState<'budget' | 'bluelight' | 'photochromic' | 'driving' | null>(null);

  if (!isOpen) return null;

  // Recommendation engine logic
  const getRecommendation = (): LensProduct => {
    // If 40+ years old
    if (ageGroup === 'above40') {
      if (activity === 'outdoor' || priority === 'photochromic') {
        return LENS_PRODUCTS.find(p => p.id === 'progresif-photocromic') || LENS_PRODUCTS[5];
      }
      if (activity === 'screen' || activity === 'mixed') {
        return LENS_PRODUCTS.find(p => p.id === 'progresif-bluechromic') || LENS_PRODUCTS[6];
      }
      return LENS_PRODUCTS.find(p => p.id === 'progresif-crmc') || LENS_PRODUCTS[4];
    }

    // Under 40 or not specified
    if (activity === 'driving' || priority === 'driving') {
      if (priority === 'bluelight' || activity === 'mixed') {
        return LENS_PRODUCTS.find(p => p.id === 'one-drive-bluechromic') || LENS_PRODUCTS[9];
      }
      if (priority === 'photochromic') {
        return LENS_PRODUCTS.find(p => p.id === 'one-drive-photocromic') || LENS_PRODUCTS[8];
      }
      return LENS_PRODUCTS.find(p => p.id === 'one-drive-crmc') || LENS_PRODUCTS[7];
    }

    if (activity === 'mixed' || (activity === 'screen' && priority === 'photochromic')) {
      return LENS_PRODUCTS.find(p => p.id === 'bluechromic') || LENS_PRODUCTS[3];
    }

    if (activity === 'outdoor' || priority === 'photochromic') {
      return LENS_PRODUCTS.find(p => p.id === 'photocromic') || LENS_PRODUCTS[2];
    }

    if (activity === 'screen' || priority === 'bluelight') {
      return LENS_PRODUCTS.find(p => p.id === 'anti-radiasi') || LENS_PRODUCTS[1];
    }

    return LENS_PRODUCTS.find(p => p.id === 'lensa-biasa') || LENS_PRODUCTS[0];
  };

  const isCompleted = ageGroup !== null && activity !== null && priority !== null;
  const recommended = isCompleted ? getRecommendation() : null;

  const resetQuiz = () => {
    setAgeGroup(null);
    setActivity(null);
    setPriority(null);
  };

  const getWaLink = (product: LensProduct) => {
    const text = `Halo MataCare Optik, saya mencoba fitur Tanya Lensa di web dan mendapatkan rekomendasi *${product.name}* (${formatRupiah(product.discountedPrice)}). Saya ingin konsultasi lebih lanjut dengan optik keliling. Terima kasih!`;
    return `https://wa.me/6282272108340?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-matanavy-900 via-matanavy-800 to-matablue-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-matagold-400/20 text-matagold-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Rekomendasi Lensa Pintar</h3>
              <p className="text-xs text-slate-300">Temukan lensa yang paling pas dengan rutinitas & mata Anda</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Question 1: Usia */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              1. Berapa rentang usia Anda?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAgeGroup('under40')}
                className={`p-4 rounded-2xl border text-left transition ${
                  ageGroup === 'under40'
                    ? 'border-matablue-500 bg-matablue-50/80 text-matablue-950 font-bold ring-2 ring-matablue-400/20'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span className="block text-sm font-bold">Di Bawah 40 Tahun</span>
                <span className="text-xs text-slate-500 font-normal">Penglihatan single vision (minus / plus / silinder standar)</span>
              </button>

              <button
                type="button"
                onClick={() => setAgeGroup('above40')}
                className={`p-4 rounded-2xl border text-left transition ${
                  ageGroup === 'above40'
                    ? 'border-matablue-500 bg-matablue-50/80 text-matablue-950 font-bold ring-2 ring-matablue-400/20'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span className="block text-sm font-bold">40 Tahun ke Atas</span>
                <span className="text-xs text-slate-500 font-normal">Mulai buram membaca dekat & butuh fokus multi-jarak (Progresif)</span>
              </button>
            </div>
          </div>

          {/* Question 2: Aktivitas */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              2. Apa aktivitas utama harian Anda?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'screen', label: 'Depan Layar & Gadget', icon: Laptop, desc: 'Kantor, coding, belajar' },
                { id: 'outdoor', label: 'Luar Ruangan / Terik', icon: Sun, desc: 'Sering kena panas & UV' },
                { id: 'driving', label: 'Sering Menyetir', icon: Car, desc: 'Mobil / motor siang malam' },
                { id: 'mixed', label: 'Kombinasi Seimbang', icon: Eye, desc: 'Indoor & outdoor seimbang' },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = activity === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActivity(item.id as any)}
                    className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center ${
                      isSelected
                        ? 'border-matablue-500 bg-matablue-50/80 text-matablue-900 font-bold ring-2 ring-matablue-400/20'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-1.5 ${isSelected ? 'text-matablue-600' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold leading-tight">{item.label}</span>
                    <span className="text-[10px] text-slate-500 mt-0.5">{item.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 3: Prioritas */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              3. Fitur yang paling Anda inginkan?
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: 'bluelight', label: 'Anti Radiasi Blue Light', desc: 'Mata tidak lelah & perih melihat layar monitor' },
                { id: 'photochromic', label: 'Bisa Berubah Gelap', desc: 'Otomatis gelap saat kena matahari, praktis' },
                { id: 'driving', label: 'Anti Silau Kendaraan', desc: 'Tajam saat hujan & bebas silau lampu lawan arah' },
                { id: 'budget', label: 'Hemat & Standar', desc: 'Lensa jernih berkualitas dengan harga terjangkau' },
              ].map((item) => {
                const isSelected = priority === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPriority(item.id as any)}
                    className={`p-3 rounded-2xl border text-left transition ${
                      isSelected
                        ? 'border-matablue-500 bg-matablue-50/80 text-matablue-900 font-bold ring-2 ring-matablue-400/20'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="block text-xs font-bold">{item.label}</span>
                    <span className="text-[11px] text-slate-500">{item.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Result Card */}
          {recommended && (
            <div className="p-5 rounded-3xl bg-gradient-to-br from-matablue-50 via-white to-matagold-50 border-2 border-matablue-400 shadow-md animate-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-2 mb-2">
                <span className="p-1 rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Lensa Paling Direkomendasikan Untuk Anda:
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                <div>
                  <h4 className="text-xl font-black text-matanavy-900">{recommended.name}</h4>
                  <span className="inline-block text-xs font-semibold text-matablue-600 bg-matablue-50 px-2 py-0.5 rounded-md mt-1">
                    Kategori: {recommended.series}
                  </span>
                  <p className="text-xs text-slate-600 mt-2 max-w-md">
                    {recommended.description}
                  </p>
                </div>

                <div className="text-left sm:text-right bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs shrink-0">
                  <span className="text-[10px] text-slate-400 line-through block">
                    {formatRupiah(recommended.originalPrice)}
                  </span>
                  <span className="text-xl font-black text-matanavy-900 block">
                    {formatRupiah(recommended.discountedPrice)}
                  </span>
                  <span className="inline-block text-[10px] font-bold text-matared-500 bg-red-50 px-2 py-0.5 rounded-full">
                    Diskon Promo 10%
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={resetQuiz}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ulangi Pilihan</span>
                </button>

                <a
                  href={getWaLink(recommended)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-matablue-500 hover:bg-matablue-600 text-white font-bold text-xs shadow-sm transition"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Konsultasikan Lensa Ini ke WhatsApp</span>
                </a>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {isCompleted ? '✓ Hasil rekomendasi telah dihitung' : 'Silakan lengkapi 3 pertanyaan di atas'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
