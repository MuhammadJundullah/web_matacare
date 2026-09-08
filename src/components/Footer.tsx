import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { 
  PhoneCall, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Car, 
  Heart, 
  ArrowUp
} from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-matanavy-950 text-white border-t border-slate-800 pt-16 pb-12 relative overflow-hidden">
      {/* Glow background accent */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-matablue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand & Slogan */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="lg" inverted={true} />
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm pt-2">
              Layanan optik keliling profesional yang datang langsung ke lokasi Anda. Menghadirkan solusi kacamata terbaik, lensa berkualitas, dan pemeriksaan refraksi modern.
            </p>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1 max-w-sm">
              <span className="text-[11px] font-bold text-matagold-400 block">
                Motto & Komitmen Kami:
              </span>
              <p className="text-xs text-slate-200 italic font-serif">
                &ldquo;Mata sehat investasi masa depan — Kacamata untuk semua aktivitas Anda ♡&rdquo;
              </p>
            </div>
          </div>

          {/* Col 2: Hubungi & Lokasi Keliling */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-matablue-400">
              Layanan Optik Keliling
            </h4>

            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <Car className="w-4 h-4 text-matablue-400 shrink-0 mt-0.5" />
                <span><strong>Datang ke Tempat Anda:</strong> Kantor, Perusahaan, Sekolah, Komunitas & Rumah Pribadi.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-matagold-400 shrink-0 mt-0.5" />
                <span>Jabodetabek & Area Sekitar (Kunjungan Khusus Luar Kota Tersedia).</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-matablue-400 shrink-0" />
                <span>Senin – Minggu: 08.00 – 20.00 WIB</span>
              </li>
              <li className="pt-2">
                <a
                  href="https://wa.me/6282272108340"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-matablue-500/20 hover:bg-matablue-500/30 text-matablue-300 border border-matablue-500/30 transition font-bold"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>0822 7210 8340</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Ragam Lensa Unggulan */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-matablue-400">
              Pilihan Jenis Lensa
            </h4>

            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="#pilihan-lensa" className="hover:text-matablue-300 transition flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-matablue-400 shrink-0" />
                  <span>Lensa Standar & Anti Radiasi (Blueray)</span>
                </Link>
              </li>
              <li>
                <Link href="#pilihan-lensa" className="hover:text-matablue-300 transition flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-matablue-400 shrink-0" />
                  <span>Lensa Photocromic (Transisi Gelap UV)</span>
                </Link>
              </li>
              <li>
                <Link href="#pilihan-lensa" className="hover:text-matablue-300 transition flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-matablue-400 shrink-0" />
                  <span>Bluechromic 2-in-1 (Gadget & Outdoor)</span>
                </Link>
              </li>
              <li>
                <Link href="#pilihan-lensa" className="hover:text-matablue-300 transition flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-matablue-400 shrink-0" />
                  <span>Progresif Multi-Jarak (Jauh & Dekat)</span>
                </Link>
              </li>
              <li>
                <Link href="#pilihan-lensa" className="hover:text-matablue-300 transition flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-matablue-400 shrink-0" />
                  <span>Seri One Drive Khusus Berkendara</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Keamanan & Garansi */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-matablue-400">
              Jaminan Layanan
            </h4>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Lensa Bergaransi</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Alat Refraksi Akurat</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Frame Original & Trendy</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-matared-500" />
                <span>Pelayanan Ramah & Santun</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} MataCare Optik. Seluruh hak cipta dilindungi undang-undang.</p>
          
          <div className="flex items-center gap-4">
            <span className="text-slate-400 flex items-center gap-1">
              Dibuat dengan <Heart className="w-3.5 h-3.5 text-matared-500 fill-matared-500" /> untuk penglihatan yang lebih baik
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition flex items-center gap-1"
              aria-label="Kembali ke atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
