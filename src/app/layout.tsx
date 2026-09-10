import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MataCare Optik | Jelas Melihat, Hidup Lebih Baik - Layanan Optik Keliling',
  description: 'MataCare Optik menyediakan layanan pemeriksaan kesehatan mata keliling langsung datang ke tempat Anda dengan tenaga profesional, refraksi akurat, dan kacamata berkualitas.',
  keywords: ['MataCare Optik', 'Optik Aceh', 'Optik Aceh Tengah', 'Metacare', 'Optik Keliling', 'Pemeriksaan Mata Keliling', 'Layanan Kacamata', 'Photocromic', 'Bluechromic', 'Lensa Progresif', 'One Drive'],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'MataCare Optik - Layanan Optik Keliling Profesional',
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
