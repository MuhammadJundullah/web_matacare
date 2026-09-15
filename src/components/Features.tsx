import React from 'react';
import { 
  ShieldCheck, 
  Layers, 
  UserCheck, 
  Glasses, 
  HeartHandshake,
  Sparkles
} from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Lensa Berkualitas',
      subtitle: 'Standar Optik Medis',
      desc: 'Material lensa bermutu tinggi dengan lapisan anti gores, anti silau, dan kejernihan optik maksimal untuk kesehatan penglihatan Anda.',
      color: 'from-blue-500 to-matablue-600',
      bgLight: 'bg-blue-50/80',
      border: 'border-blue-100'
    },
    {
      icon: Layers,
      title: 'Pilihan Lensa Lengkap',
      subtitle: 'Solusi Segala Kebutuhan',
      desc: 'Mulai dari Lensa Biasa, Anti Radiasi Gadget, Photocromic, Bluechromic, Progresif Multi-jarak, hingga One Drive khusus berkendara.',
      color: 'from-matablue-500 to-cyan-600',
      bgLight: 'bg-cyan-50/80',
      border: 'border-cyan-100'
    },
    {
      icon: UserCheck,
      title: 'Pemeriksaan Mata Profesional',
      subtitle: 'Akurat & Komputerisasi',
      desc: 'Pemeriksaan tajam penglihatan teliti menggunakan peralatan portabel canggih dan refraksi akurat langsung di lokasi Anda.',
      color: 'from-matanavy-800 to-matanavy-900',
      bgLight: 'bg-slate-50',
      border: 'border-slate-200'
    },
    {
      icon: Glasses,
      title: 'Frame Original & Trendy',
      subtitle: 'Model Terkini & Nyaman',
      desc: 'Ratusan koleksi bingkai kacamata fashionable, ringan, dan ergonomis untuk berbagai bentuk wajah serta aktivitas sehari-hari.',
      color: 'from-matagold-500 to-amber-600',
      bgLight: 'bg-amber-50/80',
      border: 'border-amber-100'
    },
    {
      icon: HeartHandshake,
      title: 'Pelayanan Ramah',
      subtitle: 'Konsultasi Santun & Solutif',
      desc: 'Pendampingan konsultasi mata yang hangat, edukatif, tanpa tekanan, dengan fokus mengutamakan kenyamanan mata Anda.',
      color: 'from-rose-500 to-matared-500',
      bgLight: 'bg-rose-50/80',
      border: 'border-rose-100'
    }
  ];

  return (
    <section id="keunggulan" className="py-16 sm:py-20 bg-white border-y border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-matablue-50 border border-matablue-200/60 text-matablue-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-matablue-500" />
            <span>MataCare Optik Signature Values</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-matanavy-900 tracking-tight">
            Kenapa Pilih <span className="text-matablue-500">MataCare Optik</span> ♡
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Dedikasi kami untuk memberikan pengalaman penglihatan yang jernih, nyaman, dan mudah dijangkau langsung di tempat Anda.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border ${item.border} ${item.bgLight} flex flex-col justify-between group`}
              >
                <div>
                  {/* Icon Circle */}
                  <div className={`w-13 h-13 rounded-xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-11" />
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg font-bold text-matanavy-900 leading-snug mb-1">
                    {item.title}
                  </h3>
                  <span className="inline-block text-xs font-semibold text-matablue-600 mb-2.5">
                    {item.subtitle}
                  </span>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/50 flex items-center text-[11px] font-semibold text-matanavy-800">
                  <span className="group-hover:text-matablue-600 transition">Jelas Melihat ♡</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
