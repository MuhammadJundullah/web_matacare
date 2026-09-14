'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { 
  PhoneCall, 
  Menu, 
  X, 
  Calendar, 
  ShieldCheck, 
  Sparkles,
  Clock,
  Glasses
} from 'lucide-react';

interface NavbarProps {
  onOpenAdvisor: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdvisor }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Pilihan Lensa', href: '#pilihan-lensa', icon: Glasses },
    { name: 'Keunggulan', href: '#keunggulan', icon: ShieldCheck },
    { name: 'Optik Keliling', href: '#optik-keliling', icon: Calendar },
    { name: 'Jadwalkan Kunjungan', href: '#booking', icon: Clock },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-matanavy-900 via-matanavy-800 to-matablue-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-matablue-500 text-white sm:">
              Instagram : @MataCare_Optik
            </span>
            <span className="hidden sm:inline text-slate-200">
              Mata Sehat, Investasi Masa Depan ♡ Layanan pemeriksaan langsung di lokasi Anda!
            </span>
            <span className="sm:hidden text-slate-200">
              Pemeriksaan Mata di Lokasi Anda!
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <span className="hidden md:inline text-[11px] text-matablue-300">
              📍 MataCare Optik — Datang ke Tempat Anda
            </span>
            <a
              href="https://wa.me/6282272108340?text=Halo%20MataCare%20Optik%2C%20saya%20ingin%20tanya%20jadwal%20layanan%20optik%20keliling"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-medium hover:text-white transition text-[11px] text-matagold-400"
            >
              <PhoneCall className="w-3 h-3" />
              <span>0822 7210 8340</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center">
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-matablue-600 hover:bg-matablue-50 rounded-xl transition flex items-center gap-1.5"
              >
                <span>{link.name}</span>
              </Link>
            ))}

            <button
              onClick={onOpenAdvisor}
              className="px-3.5 py-2 text-sm font-semibold text-matanavy-900 bg-matagold-100 hover:bg-matagold-200 border border-matagold-300 rounded-xl transition flex items-center gap-1.5 text-amber-900"
            >
              <Sparkles className="w-4 h-4 text-matagold-600" />
              <span>Pilih Lensa Cocok</span>
            </button>
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href="#booking"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-matablue-500 to-matablue-600 hover:from-matablue-600 hover:to-matablue-700 text-white font-semibold text-sm shadow-md shadow-matablue-500/20 hover:shadow-lg transition transform hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Booking Kunjungan</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-700 hover:text-matablue-600 hover:bg-slate-100 rounded-xl"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-matablue-50 hover:text-matablue-600 rounded-xl transition"
                >
                  <Icon className="w-4 h-4 text-matablue-500" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdvisor();
              }}
              className="flex items-center gap-3 w-full text-left px-3 py-2.5 text-sm font-semibold text-amber-900 bg-matagold-50 hover:bg-matagold-100 rounded-xl transition border border-matagold-200"
            >
              <Sparkles className="w-4 h-4 text-matagold-600" />
              <span>Rekomendasi Lensa Pintar</span>
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="#booking"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 text-center rounded-xl bg-matablue-50 text-matablue-700 font-semibold text-sm flex items-center justify-center gap-2 border border-matablue-200"
            >
              <Calendar className="w-4 h-4 text-matablue-600" />
              Booking Kunjungan Sekarang
            </a>
            <a
              href="https://wa.me/6282272108340?text=Halo%20MataCare%20Optik%2C%20saya%20ingin%20jadwalkan%20pemeriksaan%20mata%20keliling"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 text-center rounded-xl bg-matablue-500 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              Hubungi WhatsApp: 0822 7210 8340
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
