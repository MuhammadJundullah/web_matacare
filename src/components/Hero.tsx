'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Glasses, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Calendar,
  Car
} from 'lucide-react';

interface HeroProps {
  onOpenAdvisor: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAdvisor }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-matablue-50/60 via-white to-slate-50">
      {/* Decorative background glow circles */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-matablue-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-matagold-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Information */}
          <div className="lg:col-span-7 space-y-6">
            {/* Slogan Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-matablue-100/80 border border-matablue-200/60 text-matablue-800 text-xs sm:text-sm font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-matablue-500 animate-ping" />
              <span>Mata sehat investasi masa depan ♡</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black text-matanavy-900 tracking-tight leading-[1.15]">
              Layanan Optik & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-matablue-500 via-matablue-600 to-matanavy-800">
                Pemeriksaan Mata Profesional
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              <strong className="text-matanavy-900 font-semibold">MataCare Optik</strong> siap datang langsung ke tempat Anda 
              (kantor, sekolah, perumahan, maupun keluarga). Nikmati pemeriksaan mata profesional, refraksi akurat, dan dapatkan kacamata terbaik dengan pelayanan ramah & bergaransi.
            </p>

            {/* Key feature pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 bg-white/80 backdrop-blur-xs p-2.5 rounded-xl border border-slate-200/80 shadow-xs">
                <Car className="w-4 h-4 text-matablue-500 shrink-0" />
                <span>Datang ke Tempat Anda</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 bg-white/80 backdrop-blur-xs p-2.5 rounded-xl border border-slate-200/80 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Lensa Standar Medis</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 bg-white/80 backdrop-blur-xs p-2.5 rounded-xl border border-slate-200/80 shadow-xs col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-matagold-500 shrink-0" />
                <span>Frame Trendy & Lengkap</span>
              </div>
            </div>

            {/* Call to actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#booking"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-matablue-500 hover:bg-matablue-600 text-white font-bold text-base shadow-lg shadow-matablue-500/25 hover:shadow-xl hover:shadow-matablue-500/30 transition transform hover:-translate-y-0.5"
              >
                <Calendar className="w-5 h-5" />
                <span>Jadwalkan Kunjungan</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#pilihan-lensa"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-matanavy-900 font-bold text-base border-2 border-matanavy-800/20 hover:border-matanavy-800/40 shadow-sm transition"
              >
                <Glasses className="w-5 h-5 text-matablue-600" />
                <span>Pilihan Lensa</span>
              </a>

              <button
                onClick={onOpenAdvisor}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-sm border border-amber-200 transition"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Rekomendasi Lensa</span>
              </button>
            </div>

            {/* Phone highlight */}
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Hubungi Langsung:</span>
              <a 
                href="https://wa.me/6282272108340"
                className="text-matablue-600 font-bold hover:underline"
              >
                0822 7210 8340
              </a>
              <span className="text-slate-300">•</span>
              <span>Layanan Bebas Repot & Ramah</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            {/* Card Container */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Floating Top Badge: Layanan Profesional */}
              <div className="absolute -top-4 -left-4 z-20 bg-gradient-to-r from-matablue-600 to-matanavy-900 text-white px-4 py-2 rounded-2xl shadow-xl shadow-matablue-500/20 flex items-center gap-2 border border-white/20 transform -rotate-2">
                <Sparkles className="w-5 h-5 text-matagold-400" />
                <div className="text-left text-[11px] leading-tight font-medium">
                  <span className="block font-bold">Layanan Optik</span>
                  <span className="opacity-90">Bebas Antre & Nyaman</span>
                </div>
              </div>

              {/* Floating Bottom Badge: Datang ke Tempat Anda */}
              <div className="absolute -bottom-5 -right-3 z-20 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-slate-200/80 flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-matablue-100 flex items-center justify-center text-matablue-600 shrink-0">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-matanavy-900">MataCare Optik</h4>
                  <p className="text-[11px] text-slate-500">Pemeriksaan langsung di tempat Anda</p>
                </div>
              </div>

              {/* Central Visual Showcase Card */}
              <div className="relative rounded-3xl overflow-hidden bg-white p-3 shadow-2xl border border-slate-200/80">
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100">
                  <Image
                    src="https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80"
                    alt="Layanan Pemeriksaan Mata dan Kacamata MataCare Optik"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    className="object-cover"
                    priority
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-matanavy-950/85 via-matanavy-900/30 to-transparent flex flex-col justify-end p-5 text-white">
                    <span className="text-xs uppercase tracking-wider font-semibold text-matagold-400">
                      Layanan Optik Profesional
                    </span>
                    <h3 className="text-lg font-bold text-white leading-tight mt-1">
                      Pemeriksaan Refraksi & Fitting Kacamata
                    </h3>
                    <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                      Kami hadir membawa peralatan refraksi modern dan ratusan koleksi bingkai langsung ke lokasi Anda.
                    </p>
                  </div>
                </div>

                {/* Sub banner under photo */}
                <div className="mt-3 px-3 py-2 bg-slate-50 rounded-xl flex items-center justify-between text-xs text-slate-600">
                  <span className="font-semibold text-matanavy-900">Kualitas Terbaik Untuk Penglihatan Anda</span>
                  <a href="#booking" className="text-matablue-600 font-bold hover:underline">Jadwalkan ↗</a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
