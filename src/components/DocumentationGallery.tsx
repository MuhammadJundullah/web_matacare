'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { DOCUMENTATION_ITEMS, IMPACT_STATS, DocumentationItem } from '@/data/documentation';
import { 
  Camera, 
  MapPin, 
  Calendar, 
  Users, 
  X, 
  ZoomIn, 
  Sparkles, 
  Heart,
  ChevronRight
} from 'lucide-react';

export const DocumentationGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [activeItem, setActiveItem] = useState<DocumentationItem | null>(null);

  const categories = ['Semua', 'Kantor & Perusahaan', 'Sekolah & Kampus', 'Komunitas & Baksos', 'Home Service'];

  const filteredDocs = DOCUMENTATION_ITEMS.filter((item) => {
    return activeCategory === 'Semua' || item.category === activeCategory;
  });

  return (
    <section id="dokumentasi" className="py-16 sm:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-matablue-100 border border-matablue-200 text-matablue-800 text-xs font-semibold">
            <Camera className="w-3.5 h-3.5 text-matablue-600" />
            <span>Galeri Lapangan & Kegiatan Nyata</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-matanavy-900 tracking-tight">
            Dokumentasi <span className="text-matablue-500">Pemeriksaan Mata Keliling</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Potret komitmen nyata <strong className="text-matanavy-900">MataCare Optik</strong> melayani pemeriksaan refraksi dan kesehatan mata langsung ke kantor, sekolah, komunitas warga, hingga kediaman keluarga.
          </p>
        </div>

        {/* Impact Statistics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {IMPACT_STATS.map((stat, idx) => (
            <div 
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-matablue-300 transition text-center group"
            >
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-matablue-600 to-matanavy-900 block group-hover:scale-105 transition-transform">
                {stat.value}
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-slate-800 mt-1">{stat.label}</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">{stat.desc}</p>
            </div>
          ))}
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition ${
                activeCategory === cat
                  ? 'bg-matablue-500 text-white shadow-md shadow-matablue-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              {cat === 'Semua' ? 'Semua Dokumentasi' : cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setActiveItem(doc)}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
            >
              {/* Photo Area */}
              <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
                <Image
                  src={doc.image}
                  alt={doc.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Badge Overlay */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-matanavy-900/80 backdrop-blur-md text-white border border-white/20">
                    <Sparkles className="w-3 h-3 text-matagold-400" />
                    {doc.badge}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-matanavy-900 shadow-md">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Text Area */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  {/* Meta: Location and Date */}
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500 mb-2">
                    <span className="flex items-center gap-1 font-medium text-matablue-700">
                      <MapPin className="w-3.5 h-3.5" />
                      {doc.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {doc.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-matanavy-900 group-hover:text-matablue-600 transition leading-snug">
                    {doc.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed mt-2 line-clamp-3">
                    {doc.description}
                  </p>
                </div>

                {/* Footer participants */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5 font-semibold text-matanavy-800">
                    <Users className="w-3.5 h-3.5 text-matablue-500" />
                    {doc.participants} Orang Diperiksa
                  </span>
                  <span className="text-matablue-600 font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition">
                    Lihat Foto <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom invitation card */}
        <div className="mt-14 p-6 sm:p-8 bg-gradient-to-r from-matablue-50 via-white to-matagold-50 rounded-3xl border border-matablue-200/80 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-matanavy-900 flex items-center justify-center sm:justify-start gap-2">
              <Heart className="w-5 h-5 text-matared-500 fill-matared-500" />
              Ingin Kantor atau Komunitas Anda Dikunjungi MataCare?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Kami siap mengatur jadwal pemeriksaan mata keliling secara fleksibel tanpa mengganggu jam operasional Anda.
            </p>
          </div>
          <a
            href="https://wa.me/6282272108340?text=Halo%20MataCare%20Optik%2C%20kami%20ingin%20mengajukan%20pemeriksaan%20mata%20keliling%20untuk%20instansi%2Fkomunitas%20kami"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-5 py-3 rounded-xl bg-matanavy-900 hover:bg-matanavy-800 text-white font-bold text-xs sm:text-sm shadow-md transition"
          >
            Ajukan Jadwal Kunjungan
          </a>
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in"
          onClick={() => setActiveItem(null)}
        >
          <div 
            className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 bg-matanavy-900 text-white flex items-center justify-between">
              <div>
                <span className="text-xs text-matagold-400 font-semibold">{activeItem.category}</span>
                <h3 className="text-base font-bold truncate max-w-md">{activeItem.title}</h3>
              </div>
              <button
                onClick={() => setActiveItem(null)}
                className="p-1.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo */}
            <div className="relative w-full aspect-[16/10] bg-slate-900">
              <Image
                src={activeItem.image}
                alt={activeItem.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Content Details */}
            <div className="p-6 space-y-3 bg-white">
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <span className="font-semibold text-matanavy-900 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-matablue-500" />
                  {activeItem.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  {activeItem.date}
                </span>
                <span className="flex items-center gap-1.5 font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  <Users className="w-3.5 h-3.5 text-emerald-600" />
                  {activeItem.participants} Peserta Diperiksa
                </span>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">
                {activeItem.description}
              </p>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveItem(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                >
                  Tutup Galeri
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
