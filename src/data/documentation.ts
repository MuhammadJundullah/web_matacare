export interface DocumentationItem {
  id: string;
  title: string;
  category: 'Kantor & Perusahaan' | 'Sekolah & Kampus' | 'Komunitas & Baksos' | 'Home Service';
  date: string;
  location: string;
  participants: number;
  image: string;
  description: string;
  badge: string;
}

export const DOCUMENTATION_ITEMS: DocumentationItem[] = [
  {
    id: 'doc-1',
    title: 'Pemeriksaan Refraksi Komputerisasi Karyawan PT Telkom Akses',
    category: 'Kantor & Perusahaan',
    date: '14 Agustus 2026',
    location: 'Gedung Telkom, Jakarta Selatan',
    participants: 145,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    description: 'Pemeriksaan ketajaman penglihatan digital & skrining mata lelah akibat paparan monitor (CVS) bagi seluruh divisi teknologi dan operasional.',
    badge: 'Kunjungan Korporat'
  },
  {
    id: 'doc-2',
    title: 'Pemeriksaan Mata Keliling Lansia & Warga Kelurahan Menteng',
    category: 'Komunitas & Baksos',
    date: '28 Juli 2026',
    location: 'Balai Warga RW 05, Menteng',
    participants: 210,
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    description: 'Pemeriksaan presbiopia, katarak dini, serta pembagian kacamata baca dan frame terjangkau untuk lansia dan kader posyandu.',
    badge: 'Bakti Sosial Komunitas'
  },
  {
    id: 'doc-3',
    title: 'Skrining Mata Pelajar & Edukasi Anti Radiasi SMA Negeri 8',
    category: 'Sekolah & Kampus',
    date: '05 Juli 2026',
    location: 'Aula SMAN 8, Jakarta',
    participants: 320,
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
    description: 'Deteksi dini miopia (mata minus) dan silinder pada siswa serta edukasi pentingnya lensa pelindung radiasi blueray.',
    badge: 'Program Sekolah Sehat'
  },
  {
    id: 'doc-4',
    title: 'Layanan Home Visit & Fitting Kacamata Keluarga Puri Indah',
    category: 'Home Service',
    date: '22 Juni 2026',
    location: 'Perumahan Puri Indah, Jakarta Barat',
    participants: 6,
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=80',
    description: 'Pemeriksaan mata 3 generasi (kakek, orang tua, dan anak) langsung di kenyamanan ruang tamu dengan koper perlengkapan optik lengkap.',
    badge: 'Door to Door VIP'
  },
  {
    id: 'doc-5',
    title: 'Optik Keliling di Kawasan Industri MM2100 Cikarang',
    category: 'Kantor & Perusahaan',
    date: '10 Juni 2026',
    location: 'Area Industri MM2100, Cikarang',
    participants: 180,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    description: 'Pemeriksaan berkala operator mesin & staff logistik dengan fokus perlindungan mata kerja dan lensa One Drive anti-silau.',
    badge: 'Health & Safety First'
  },
  {
    id: 'doc-6',
    title: 'Mobile Vision Screening Paguyuban Alumni & Pensiunan',
    category: 'Komunitas & Baksos',
    date: '18 Mei 2026',
    location: 'Taman Mini Indonesia Indah',
    participants: 95,
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    description: 'Pemeriksaan lensa progresif dan konsultasi transisi penglihatan untuk para pensiunan yang aktif berkegiatan sosial.',
    badge: 'Care for Seniors'
  }
];

export const IMPACT_STATS = [
  { label: 'Mata Diperiksa', value: '12.500+', desc: 'Masyarakat terbantu melihat lebih jelas' },
  { label: 'Lokasi & Instansi Dikunjungi', value: '250+', desc: 'Kantor, sekolah, & perumahan' },
  { label: 'Tingkat Kepuasan Pasien', value: '99.4%', desc: 'Pelayanan cepat, teliti, & ramah' },
  { label: 'Pilihan Frame & Lensa', value: '500+', desc: 'Koleksi original & tren terkini' },
];
