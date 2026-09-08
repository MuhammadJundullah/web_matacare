export interface LensProduct {
  id: string;
  name: string;
  series: 'Standar & Proteksi' | 'Progresif' | 'One Drive';
  originalPrice: number;
  discountPercent: number;
  discountedPrice: number;
  description: string;
  highlights: string[];
  bestFor: string;
  popularBadge?: string;
  uvProtection: boolean;
  blueLightFilter: boolean;
  photochromicTransition: boolean;
  progressiveVision: boolean;
  drivingOptimized: boolean;
}

export const LENS_PRODUCTS: LensProduct[] = [
  {
    id: 'lensa-biasa',
    name: 'Lensa Biasa',
    series: 'Standar & Proteksi',
    originalPrice: 700000,
    discountPercent: 10,
    discountedPrice: 630000,
    description: 'Lensa standar dengan ketajaman visual yang jernih dan nyaman untuk kebutuhan harian.',
    highlights: [
      'Ketajaman visual presisi',
      'Ringan dan nyaman',
      'Lapisan anti gores standar'
    ],
    bestFor: 'Aktivitas umum sehari-hari & membaca santai',
    uvProtection: true,
    blueLightFilter: false,
    photochromicTransition: false,
    progressiveVision: false,
    drivingOptimized: false,
  },
  {
    id: 'anti-radiasi',
    name: 'Anti Radiasi (Blueray)',
    series: 'Standar & Proteksi',
    originalPrice: 800000,
    discountPercent: 10,
    discountedPrice: 720000,
    description: 'Melindungi mata dari paparan layar digital dan sinar biru berbahaya dari monitor komputer & smartphone.',
    highlights: [
      'Blokir sinar biru (Blue Light Block)',
      'Mengurangi mata lelah & perih',
      'Ideal untuk pekerja kantor & pelajar'
    ],
    bestFor: 'Pekerja depan laptop, mahasiswa, & pengguna gadget aktif',
    popularBadge: 'Paling Diminati Pelajar & Kantor',
    uvProtection: true,
    blueLightFilter: true,
    photochromicTransition: false,
    progressiveVision: false,
    drivingOptimized: false,
  },
  {
    id: 'photocromic',
    name: 'Photocromic',
    series: 'Standar & Proteksi',
    originalPrice: 1170000,
    discountPercent: 10,
    discountedPrice: 1053000,
    description: 'Lensa yang berubah warna otomatis menjadi gelap sesuai intensitas cahaya matahari di luar ruangan.',
    highlights: [
      'Otomatis menggelap di bawah sinar matahari',
      'Bening kembali saat di dalam ruangan',
      'Proteksi UV 400 menyeluruh'
    ],
    bestFor: 'Aktivitas seimbang antara dalam & luar ruangan',
    uvProtection: true,
    blueLightFilter: false,
    photochromicTransition: true,
    progressiveVision: false,
    drivingOptimized: false,
  },
  {
    id: 'bluechromic',
    name: 'Bluechromic (2-in-1)',
    series: 'Standar & Proteksi',
    originalPrice: 1530000,
    discountPercent: 10,
    discountedPrice: 1377000,
    description: 'Perpaduan perlindungan sinar biru (gadget) dan lensa yang berubah warna saat terpapar sinar matahari.',
    highlights: [
      'Kombinasi Blueray + Photocromic',
      'Proteksi ganda outdoor & indoor',
      'Sangat praktis tanpa perlu ganti kacamata hitam'
    ],
    bestFor: 'Kombinasi kerja depan monitor & mobilitas luar ruangan tinggi',
    popularBadge: 'Best Seller 2-in-1',
    uvProtection: true,
    blueLightFilter: true,
    photochromicTransition: true,
    progressiveVision: false,
    drivingOptimized: false,
  },
  {
    id: 'progresif-crmc',
    name: 'Progresif CRMC',
    series: 'Progresif',
    originalPrice: 1500000,
    discountPercent: 10,
    discountedPrice: 1350000,
    description: 'Penglihatan jelas di semua jarak (dekat, tengah, jauh) dengan lensa berkualitas tanpa garis pembatas.',
    highlights: [
      'Multi-titik fokus halus tanpa garis',
      'Transisi pandangan jauh ke dekat mulus',
      'Desain modern tanpa terlihat seperti kacamata baca tua'
    ],
    bestFor: 'Usia 40+ tahun dengan kebutuhan baca dan melihat jauh sekaligus',
    uvProtection: true,
    blueLightFilter: false,
    photochromicTransition: false,
    progressiveVision: true,
    drivingOptimized: false,
  },
  {
    id: 'progresif-photocromic',
    name: 'Progresif Photocromic',
    series: 'Progresif',
    originalPrice: 1900000,
    discountPercent: 10,
    discountedPrice: 1710000,
    description: 'Lensa progresif dengan fitur berubah warna sesuai cahaya matahari, untuk kenyamanan penglihatan maksimal.',
    highlights: [
      'Semua jarak fokus (jauh, sedang, dekat)',
      'Otomatis gelap di bawah terik matahari',
      'Mencegah silau & menjaga estetika gaya'
    ],
    bestFor: 'Profesional & lansia aktif yang sering berkegiatan luar ruangan',
    uvProtection: true,
    blueLightFilter: false,
    photochromicTransition: true,
    progressiveVision: true,
    drivingOptimized: false,
  },
  {
    id: 'progresif-bluechromic',
    name: 'Progresif Bluechromic',
    series: 'Progresif',
    originalPrice: 2500000,
    discountPercent: 10,
    discountedPrice: 2250000,
    description: 'Lensa progresif terlengkap dengan perlindungan sinar biru gadget dan berubah warna untuk kenyamanan sepanjang hari.',
    highlights: [
      'Triple proteksi: Progresif + Blueray + Photocromic',
      'Kenyamanan optik tingkat tertinggi',
      'Solusi komprehensif all-day vision'
    ],
    bestFor: 'Pengguna kacamata presbiopia yang menuntut kenyamanan premium tanpa kompromi',
    popularBadge: 'Flagship Ultimate Comfort',
    uvProtection: true,
    blueLightFilter: true,
    photochromicTransition: true,
    progressiveVision: true,
    drivingOptimized: false,
  },
  {
    id: 'one-drive-crmc',
    name: 'One Drive CRMC',
    series: 'One Drive',
    originalPrice: 1200000,
    discountPercent: 10,
    discountedPrice: 1080000,
    description: 'Lensa premium dengan kejernihan tinggi dan daya tahan lebih baik khusus meningkatkan visibilitas saat berkendara.',
    highlights: [
      'Filter anti silau lampu kendaraan lawan arah',
      'Kontras visual lebih tajam saat malam / hujan',
      'Lapisan oleophobic & hidrofobik tahan gores'
    ],
    bestFor: 'Pengemudi mobil, pengendara motor harian, & traveler',
    uvProtection: true,
    blueLightFilter: false,
    photochromicTransition: false,
    progressiveVision: false,
    drivingOptimized: true,
  },
  {
    id: 'one-drive-photocromic',
    name: 'One Drive Photocromic',
    series: 'One Drive',
    originalPrice: 1500000,
    discountPercent: 10,
    discountedPrice: 1350000,
    description: 'Berubah warna otomatis sesuai cahaya matahari dengan teknologi One Drive untuk kenyamanan ekstra di balik kemudi.',
    highlights: [
      'Teknologi adaptif khusus pengemudi',
      'Reduksi silau matahari saat menyetir siang hari',
      'Kejernihan ekstra tanpa distorsi jarak'
    ],
    bestFor: 'Sering berkendara jarak jauh siang & malam',
    popularBadge: 'Pilihan Favorit Driver',
    uvProtection: true,
    blueLightFilter: false,
    photochromicTransition: true,
    progressiveVision: false,
    drivingOptimized: true,
  },
  {
    id: 'one-drive-bluechromic',
    name: 'One Drive Bluechromic',
    series: 'One Drive',
    originalPrice: 1800000,
    discountPercent: 10,
    discountedPrice: 1620000,
    description: 'Perlindungan sinar biru dengan lensa berubah warna dan kejernihan maksimal, kenyamanan lengkap saat berkendara maupun di depan gadget.',
    highlights: [
      'Anti silau sorot lampu + Anti radiasi layar + Adaptif UV',
      'Lapisan coating premium multi-layer',
      'Visibilitas jernih cuaca terik hingga malam berkabut'
    ],
    bestFor: 'Pengemudi aktif yang juga intens menggunakan gadget digital',
    popularBadge: 'Paling Komplit untuk Pengemudi',
    uvProtection: true,
    blueLightFilter: true,
    photochromicTransition: true,
    progressiveVision: false,
    drivingOptimized: true,
  },
];

export const formatRupiah = (val: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(val);
};
