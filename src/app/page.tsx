'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { CatalogSection } from '@/components/CatalogSection';
import { MobileServiceSection } from '@/components/MobileServiceSection';
import { DocumentationGallery } from '@/components/DocumentationGallery';
import { BookingForm } from '@/components/BookingForm';
import { Footer } from '@/components/Footer';
import { FlyerModal } from '@/components/FlyerModal';
import { LensAdvisor } from '@/components/LensAdvisor';
import { PhoneCall, Sparkles } from 'lucide-react';

export default function Home() {
  const [flyerModalOpen, setFlyerModalOpen] = useState<boolean>(false);
  const [advisorModalOpen, setAdvisorModalOpen] = useState<boolean>(false);

  return (
    <main className="min-h-screen flex flex-col relative">
      {/* Navigation */}
      <Navbar 
        onOpenFlyer={() => setFlyerModalOpen(true)}
        onOpenAdvisor={() => setAdvisorModalOpen(true)}
      />

      {/* Hero Header */}
      <Hero 
        onOpenFlyer={() => setFlyerModalOpen(true)}
        onOpenAdvisor={() => setAdvisorModalOpen(true)}
      />

      {/* Keunggulan Kami (5 Icons from flyer) */}
      <Features />

      {/* Catalog & Prices with 10% Discount */}
      <CatalogSection 
        onOpenFlyer={() => setFlyerModalOpen(true)}
      />

      {/* Mobile Clinic Showcase ("Datang ke Tempat Anda") */}
      <MobileServiceSection />

      {/* Photo Documentation Gallery */}
      {/*<DocumentationGallery />*/}

      {/* Booking Form & WhatsApp Order */}
      <BookingForm />

      {/* Footer */}
      <Footer 
        onOpenFlyer={() => setFlyerModalOpen(true)}
      />

      {/* Modals */}
      <FlyerModal 
        isOpen={flyerModalOpen}
        onClose={() => setFlyerModalOpen(false)}
      />

      <LensAdvisor 
        isOpen={advisorModalOpen}
        onClose={() => setAdvisorModalOpen(false)}
      />

      {/* Floating Action Button: WhatsApp */}
      <aside aria-label="Aksi Cepat" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        <button
          type="button"
          onClick={() => setAdvisorModalOpen(true)}
          className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white text-matanavy-900 border border-matagold-300 shadow-md hover:shadow-lg text-xs font-bold transition hover:bg-matagold-50"
        >
          <Sparkles className="w-3.5 h-3.5 text-matagold-600" />
          <span>Bingung Pilih Lensa?</span>
        </button>

        <a
          href="https://wa.me/6282272108340?text=Halo%20MataCare%20Optik%2C%20saya%20ingin%20konsultasi%20kacamata%20dan%20layanan%20optik%20keliling"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-500/30 hover:scale-105 transition transform active:scale-95"
          aria-label="Konsultasi via WhatsApp"
        >
          <PhoneCall className="w-4 h-4 fill-white" />
          <span className="hidden xs:inline">WhatsApp MataCare</span>
        </a>
      </aside>
    </main>
  );
}
