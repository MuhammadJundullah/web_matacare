import React from 'react';
import { 
  Car, 
  MapPin, 
  CalendarClock, 
  ClipboardCheck, 
  Glasses, 
  CheckCircle, 
  Building2, 
  GraduationCap, 
  Users, 
  Home,
  PhoneCall
} from 'lucide-react';

export const MobileServiceSection: React.FC = () => {
  const targetSegments = [
    {
      title: 'Kantor & Perusahaan',
      desc: 'Pemeriksaan mata berkala untuk karyawan demi menjaga produktivitas kerja dan kenyamanan di depan layar.',
      icon: Building2,
    },
    {
      title: 'Sekolah & Kampus',
      desc: 'Skrining ketajaman penglihatan dini bagi para pelajar agar konsentrasi belajar tidak terganggu mata minus/silinder.',
      icon: GraduationCap,
    },
    {
      title: 'Komunitas & Baksos',
      desc: 'Kegiatan sosial, posyandu lansia, yayasan, atau paguyuban warga untuk periksa mata bersama.',
      icon: Users,
    },
    {
      title: 'Home Service Keluarga',
      desc: 'Kunjungan privat langsung ke rumah Anda. Sangat cocok bagi lansia atau keluarga yang ingin hemat waktu.',
      icon: Home,
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Hubungi & Jadwalkan',
      desc: 'Diskusikan tanggal, waktu, dan perkiraan peserta pemeriksaan bersama admin kami.',
      icon: CalendarClock,
    },
    {
      step: '02',
      title: 'Tim Datang ke Lokasi',
      desc: 'Armada MataCare tiba lengkap membawa alat tes refraksi komputerisasi & koper contoh bingkai.',
      icon: Car,
    },
    {
      step: '03',
      title: 'Periksa & Pilih Frame',
      desc: 'Pemeriksaan akurat oleh tenaga terlatih, lalu Anda bebas mencoba ratusan frame kacamata.',
      icon: ClipboardCheck,
    },
    {
      step: '04',
      title: 'Kacamata Presisi Siap',
      desc: 'Lensa dipasang sesuai resep medis dan dikirimkan atau diserahkan dengan garansi resmi.',
      icon: Glasses,
    },
  ];

  return (
    <section id="optik-keliling" className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-matablue-50/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Banner Card */}
        <div className="bg-gradient-to-br from-matanavy-900 via-matanavy-800 to-matablue-950 rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden">
          {/* Subtle decorative circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-matablue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-matagold-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-matablue-300 text-xs font-semibold">
                <Car className="w-4 h-4 text-matagold-400" />
                <span>MataCare Optik Keliling</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Pemeriksaan Mata Bebas Antre, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-matablue-400 via-sky-300 to-matagold-300">
                  Kami Datang ke Tempat Anda!
                </span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Kini Anda tidak perlu repot bermacet-macetan ke optik. Tim optometri MataCare siap hadir langsung membawa fasilitas periksa mata modern, trial lens lengkap, serta ratusan pilihan bingkai kacamata original.
              </p>

              {/* Bullet Checklist */}
              <div className="space-y-3 pt-2">
                {[
                  'Gratis biaya kunjungan untuk instansi / rombongan tertentu',
                  'Pemeriksaan refraksi mata akurat dengan alat komputerisasi',
                  'Bawa lebih dari 200+ contoh frame kacamata terkini untuk dicoba langsung',
                  'Konsultasi santun dan rekomendasi lensa sesuai profesi & anggaran'
                ].map((point, index) => (
                  <div key={index} className="flex items-start gap-3 text-sm text-slate-200">
                    <CheckCircle className="w-5 h-5 text-matablue-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Call to action */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="https://wa.me/6282272108340?text=Halo%20MataCare%20Optik%2C%20saya%20tertarik%20mengundang%20layanan%20optik%20keliling%20ke%20lokasi%20kami"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-matablue-500 hover:bg-matablue-600 text-white font-bold text-sm shadow-lg shadow-matablue-500/30 transition transform hover:-translate-y-0.5"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Undang Tim Optik Keliling</span>
                </a>

                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <MapPin className="w-4 h-4 text-matagold-400" />
                  <span>Area Pelayanan Jabodetabek & Sekitarnya</span>
                </div>
              </div>
            </div>

            {/* Right Column: Segments Grid */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {targetSegments.map((segment, idx) => {
                const Icon = segment.icon;
                return (
                  <div 
                    key={idx}
                    className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:border-white/20 transition hover:bg-white/15 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-matablue-500/30 flex items-center justify-center text-matablue-300 mb-3 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-white mb-1.5">{segment.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{segment.desc}</p>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Workflow Steps */}
        <div className="mt-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-matanavy-900">4 Langkah Mudah Layanan Keliling</h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">Alur praktis tanpa perlu keluar rumah atau kantor</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="relative bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition">
                  <span className="text-4xl font-black text-matablue-100 absolute top-4 right-4 select-none">
                    {item.step}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-matablue-50 text-matablue-600 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-matanavy-900 mb-1.5">{item.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
