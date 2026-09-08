'use client';

import React, { useState } from 'react';
import { LENS_PRODUCTS, LensProduct } from '@/data/catalog';
import { LensDetailModal } from './LensDetailModal';
import { 
  Search, 
  Sparkles, 
  Check, 
  PhoneCall, 
  Info, 
  Sun, 
  Laptop, 
  Eye, 
  Car,
  Glasses,
  ShieldCheck
} from 'lucide-react';

export const LensSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<LensProduct | null>(null);

  const categories = ['Semua', 'Standar & Proteksi', 'Progresif', 'One Drive'];

  const filteredProducts = LENS_PRODUCTS.filter((product) => {
    const matchesCategory = activeCategory === 'Semua' || product.series === activeCategory;
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.bestFor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getWaLink = (product: LensProduct) => {
    const text = `Halo MataCare Optik, saya tertarik dan ingin konsultasi mengenai Lensa *${product.name}* (${product.series}). Mohon info jadwal periksa keliling ke tempat saya. Terima kasih!`;
    return `https://wa.me/6282272108340?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="pilihan-lensa" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-matablue-50 border border-matablue-200 text-matablue-700 text-xs font-bold mb-3">
              <Glasses className="w-3.5 h-3.5 text-matablue-500" />
              <span>Pilihan Lensa Kacamata Berkualitas</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-matanavy-900 tracking-tight">
              Ragam Pilihan <span className="text-matablue-500">Lensa Kacamata</span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Temukan lensa yang paling sesuai dengan kebutuhan mata dan aktivitas Anda. Seluruh lensa berstandar optik medis dan siap dicocokkan langsung saat kunjungan optik keliling ke lokasi Anda.
            </p>
          </div>

          {/* Guarantee Badge */}
          <div className="self-start md:self-auto inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>100% Lensa Bergaransi Resmi Medis</span>
          </div>
        </div>

        {/* Filter & Search Controls */}
        <div className="bg-slate-50/80 p-3 sm:p-4 rounded-2xl border border-slate-200/80 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Categories Pill Nav */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-matanavy-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:text-matanavy-900 hover:bg-slate-100 border border-slate-200/60'
                }`}
              >
                {cat === 'Semua' ? 'Semua Pilihan' : cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari jenis lensa / kebutuhan..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-matablue-500 text-slate-800 placeholder-slate-400"
            />
          </div>

        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-300 p-8">
            <Eye className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">Tidak ada jenis lensa yang sesuai</h3>
            <p className="text-xs text-slate-500 mt-1">Coba kata kunci lain atau ubah filter kategori lensa.</p>
            <button
              onClick={() => { setActiveCategory('Semua'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 rounded-xl bg-matablue-500 text-white text-xs font-semibold"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden group"
                >
                  {/* Card Top Header */}
                  <div className="p-6 pb-4">
                    {/* Top Row: Category and Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-matablue-600 bg-matablue-50 px-2.5 py-1 rounded-lg border border-matablue-100">
                        {product.series}
                      </span>

                      {product.popularBadge && (
                        <span className="text-[10px] font-bold text-amber-900 bg-matagold-100 border border-matagold-300 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-matagold-600" />
                          {product.popularBadge}
                        </span>
                      )}
                    </div>

                    {/* Product Title */}
                    <h3 className="text-xl sm:text-2xl font-black text-matanavy-900 group-hover:text-matablue-600 transition-colors mb-2">
                      {product.name}
                    </h3>

                    {/* Best For Callout Box */}
                    <div className="bg-gradient-to-br from-matablue-50/60 to-blue-50/30 p-3.5 rounded-2xl border border-matablue-100/70 mb-4">
                      <span className="text-[11px] font-bold text-matablue-900 uppercase tracking-wider block">
                        Cocok Untuk:
                      </span>
                      <p className="text-xs text-slate-700 mt-1 font-medium leading-relaxed">
                        {product.bestFor}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {product.description}
                    </p>

                    {/* Feature Chips */}
                    <div className="space-y-1.5 pt-1">
                      {product.highlights.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-matablue-500 shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Feature Tag Icons */}
                    <div className="flex items-center gap-2 pt-4 mt-4 border-t border-slate-100 text-slate-400 text-xs">
                      {product.uvProtection && (
                        <span className="p-1 rounded-md bg-slate-100 text-slate-600" title="Proteksi UV">
                          <Sun className="w-3.5 h-3.5" />
                        </span>
                      )}
                      {product.blueLightFilter && (
                        <span className="p-1 rounded-md bg-blue-100 text-blue-600" title="Filter Radiasi Layar (Blueray)">
                          <Laptop className="w-3.5 h-3.5" />
                        </span>
                      )}
                      {product.progressiveVision && (
                        <span className="p-1 rounded-md bg-indigo-100 text-indigo-600" title="Multi-Jarak Progresif">
                          <Eye className="w-3.5 h-3.5" />
                        </span>
                      )}
                      {product.drivingOptimized && (
                        <span className="p-1 rounded-md bg-teal-100 text-teal-600" title="Khusus Berkendara One Drive">
                          <Car className="w-3.5 h-3.5" />
                        </span>
                      )}
                      <span className="text-[11px] text-slate-500 ml-auto italic">
                        {product.series}
                      </span>
                    </div>

                  </div>

                  {/* Card Bottom Actions */}
                  <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition flex items-center justify-center gap-1.5"
                    >
                      <Info className="w-3.5 h-3.5 text-matablue-500" />
                      <span>Rincian</span>
                    </button>

                    <a
                      href={getWaLink(product)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-[1.5] py-2.5 px-3 rounded-xl bg-matablue-500 hover:bg-matablue-600 text-white text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Konsultasi Lensa</span>
                    </a>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Lens Detail Modal */}
      <LensDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
};
