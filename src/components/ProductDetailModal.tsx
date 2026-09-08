'use client';

import React from 'react';
import { LensProduct, formatRupiah } from '@/data/catalog';
import { 
  X, 
  Check, 
  ShieldCheck, 
  Sun, 
  Laptop, 
  Eye, 
  Car, 
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface ProductDetailModalProps {
  product: LensProduct | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  const getWaLink = () => {
    const text = `Halo MataCare Optik, saya ingin memesan/konsultasi mengenai *${product.name}* (Promo Diskon 10%: ${formatRupiah(product.discountedPrice)}). Mohon info ketersediaan dan cara pemeriksaannya. Terima kasih!`;
    return `https://wa.me/6282272108340?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-matanavy-900 to-matablue-950 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-matablue-500 text-white">
              {product.series}
            </span>
            {product.popularBadge && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-matagold-400 text-matanavy-900 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {product.popularBadge}
              </span>
            )}
          </div>

          <h3 className="text-2xl sm:text-3xl font-black">{product.name}</h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">{product.bestFor}</p>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Price Box */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-matablue-50/70 border border-matablue-200/70">
            <div>
              <span className="text-xs text-slate-500 block">Harga Katalog Resmi</span>
              <span className="text-sm line-through text-slate-400 font-medium">
                {formatRupiah(product.originalPrice)}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-matanavy-900">
                  {formatRupiah(product.discountedPrice)}
                </span>
                <span className="text-xs font-bold text-matared-500 bg-red-100 px-2 py-0.5 rounded-full">
                  Hemat {formatRupiah(product.originalPrice - product.discountedPrice)} (-10%)
                </span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-matared-500 text-white flex flex-col items-center justify-center font-black shadow-md">
              <span className="text-xs leading-none">OFF</span>
              <span className="text-sm leading-tight">10%</span>
            </div>
          </div>

          {/* Official Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Deskripsi Lensa</h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/70">
              {product.description}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Keunggulan & Fitur Utama</h4>
            <div className="space-y-2.5">
              {product.highlights.map((h, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Capabilities Badges */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Teknologi Pelindung</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${product.uvProtection ? 'bg-sky-50 border-sky-200 text-sky-800' : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'}`}>
                <ShieldCheck className="w-4 h-4" />
                <span>Proteksi UV 400</span>
              </div>

              <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${product.blueLightFilter ? 'bg-blue-50 border-blue-200 text-blue-800' : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'}`}>
                <Laptop className="w-4 h-4" />
                <span>Anti Sinar Biru</span>
              </div>

              <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${product.photochromicTransition ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'}`}>
                <Sun className="w-4 h-4" />
                <span>Transisi Gelap (UV)</span>
              </div>

              <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${product.progressiveVision ? 'bg-indigo-50 border-indigo-200 text-indigo-800' : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'}`}>
                <Eye className="w-4 h-4" />
                <span>Multi-Jarak Progresif</span>
              </div>

              <div className={`col-span-2 p-2.5 rounded-xl border flex items-center gap-2 ${product.drivingOptimized ? 'bg-teal-50 border-teal-200 text-teal-800' : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'}`}>
                <Car className="w-4 h-4" />
                <span>Optimasi Pengemudi Anti-Silau (One Drive)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition"
          >
            Tutup
          </button>

          <a
            href={getWaLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-matablue-500 hover:bg-matablue-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-matablue-500/20 transition"
          >
            <span>Pesan Lensa via WhatsApp</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
