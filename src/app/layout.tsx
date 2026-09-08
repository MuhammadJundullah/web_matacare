import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MataCare Optik | Jelas Melihat, Hidup Lebih Baik - Optik Keliling & Katalog Lensa',
  description: 'MataCare Optik menyediakan katalog harga lensa terlengkap (Anti Radiasi, Photocromic, Bluechromic, Progresif, One Drive) dan layanan pemeriksaan kesehatan mata keliling langsung datang ke tempat Anda.',
  keywords: ['MataCare Optik', 'Metacare', 'Katalog Kacamata', 'Harga Lensa', 'Pemeriksaan Mata Keliling', 'Photocromic', 'Bluechromic', 'Lensa Progresif', 'One Drive'],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'MataCare Optik - Layanan Optik Keliling & Katalog Kacamata',
    description: 'Jelas melihat, hidup lebih baik. Datang langsung ke tempat Anda untuk pemeriksaan mata & kacamata berkualitas.',
    type: 'website',
    locale: 'id_ID',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50/50 text-matanavy-900 antialiased selection:bg-matablue-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
