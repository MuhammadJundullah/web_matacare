'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Send, 
  PhoneCall, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  Building,
  CheckCircle2
} from 'lucide-react';

export const BookingForm: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState('Kantor / Perusahaan');
  const [location, setLocation] = useState('');
  const [headcount, setHeadcount] = useState('10 - 30 Orang');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const waMessage = 
      `*FORM BOOKING PEMERIKSAAN MATA KELILING - MATACARE OPTIK*\n\n` +
      `👤 *Nama*: ${name || '-'}\n` +
      `📱 *No. WhatsApp*: ${phone || '-'}\n` +
      `🏢 *Kategori Layanan*: ${serviceType}\n` +
      `📍 *Lokasi / Alamat*: ${location || '-'}\n` +
      `👥 *Estimasi Peserta*: ${headcount}\n` +
      `📝 *Catatan*: ${notes || 'Tidak ada catatan khusus'}\n\n` +
      `Mohon info ketersediaan jadwal tim MataCare Optik Keliling. Terima kasih!`;

    const waUrl = `https://wa.me/6282272108340?text=${encodeURIComponent(waMessage)}`;
    window.open(waUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="booking" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-matablue-50/60 via-slate-50 to-amber-50/40 rounded-3xl border border-slate-200/80 p-8 sm:p-12 lg:p-14 shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-matablue-100 text-matablue-800 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-matablue-600" />
                <span>Reservasi & Layanan Keliling</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-matanavy-900 tracking-tight leading-tight">
                Jadwalkan Kunjungan <br />
                <span className="text-matablue-500">MataCare Optik</span> ke Tempat Anda
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Isi formulir sederhana ini untuk mengundang tim optik keliling MataCare ke instansi, sekolah, komunitas, maupun rumah Anda. Kami akan segera menghubungi balik untuk konfirmasi jadwal.
              </p>

              {/* Trust badges */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span>Pemeriksaan refraksi komputerisasi presisi tinggi</span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Building className="w-4 h-4" />
                  </div>
                  <span>Membawa ratusan frame kacamata tren masa kini</span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span>Waktu fleksibel mengikuti agenda kegiatan Anda</span>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] text-slate-500 block">Atau Hubungi Langsung WhatsApp:</span>
                  <span className="text-base font-black text-matanavy-900">0822 7210 8340</span>
                </div>
                <a
                  href="https://wa.me/6282272108340?text=Halo%20MataCare%20Optik%2C%20saya%20ingin%20tanya%20langsung%20via%20WhatsApp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Chat Sekarang</span>
                </a>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-matanavy-900">Formulir Terkirim!</h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                    WhatsApp Anda telah terbuka dengan data pemesanan. Admin MataCare Optik akan segera merespons konfirmasi jadwal.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                  >
                    Kirim Form Baru
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-lg font-bold text-matanavy-900 mb-1 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-matablue-500" />
                    Form Permohonan Kunjungan Optik Keliling
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    Data akan otomatis diteruskan ke WhatsApp resmi MataCare Optik.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Nama Lengkap / PIC
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Contoh: Bpk. Hendra / Ibu Diana"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-matablue-500"
                      />
                    </div>

                    {/* WhatsApp */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Nomor WhatsApp Aktif
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Contoh: 0812 3456 7890"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-matablue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Service Type */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Jenis Kunjungan
                      </label>
                      <select
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-matablue-500 bg-white"
                      >
                        <option value="Kantor / Perusahaan">Kantor / Perusahaan Korporat</option>
                        <option value="Sekolah / Kampus">Sekolah / Yayasan Pendidikan</option>
                        <option value="Komunitas / RT RW / Baksos">Komunitas / Paguyuban / Baksos</option>
                        <option value="Home Visit Keluarga">Home Visit (Rumah Pribadi)</option>
                        <option value="Konsultasi Kacamata & Lensa">Konsultasi Pemesanan Lensa</option>
                      </select>
                    </div>

                    {/* Estimasi Peserta */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Estimasi Peserta Periksa
                      </label>
                      <select
                        value={headcount}
                        onChange={(e) => setHeadcount(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-matablue-500 bg-white"
                      >
                        <option value="1 - 5 Orang (Keluarga / Personal)">1 - 5 Orang (Keluarga / Personal)</option>
                        <option value="6 - 20 Orang">6 - 20 Orang</option>
                        <option value="21 - 50 Orang">21 - 50 Orang</option>
                        <option value="50 - 150 Orang">50 - 150 Orang (Divisi / Sekolah)</option>
                        <option value="150+ Orang (Event Besar)">150+ Orang (Event Besar / Korporat)</option>
                      </select>
                    </div>
                  </div>

                  {/* Lokasi */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Lokasi / Alamat Kunjungan
                    </label>
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Contoh: Gedung Artha Graha Lt 5, SCBD Jakarta / Perumahan BSD Sektor 1"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-matablue-500"
                    />
                  </div>

                  {/* Catatan */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Catatan Tambahan / Preferensi Waktu (Opsional)
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Contoh: Rencana hari Kamis jam 10 pagi, mohon bawa frame kacamata anak dan dewasa..."
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-matablue-500 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-matablue-500 hover:bg-matablue-600 text-white font-bold text-sm shadow-md shadow-matablue-500/25 hover:shadow-lg transition flex items-center justify-center gap-2 transform active:scale-[0.99]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim & Jadwalkan via WhatsApp</span>
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Pemeriksaan Mata Bebas Antre & Bebas Macet</span>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
