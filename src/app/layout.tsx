import type { Metadata } from 'next';
import './globals.css';

const siteUrl = 'https://matacare.vercel.app'; // Ganti jika nanti pakai domain custom .com / .id

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'MataCare Optik | Layanan Pemeriksaan Mata & Kacamata Keliling',
    template: '%s | MataCare Optik',
  },
  description:
    'MataCare Optik menyediakan layanan pemeriksaan kesehatan mata keliling langsung datang ke tempat Anda di Takengon, Aceh Tengah. Refraksi akurat & kacamata berkualitas.',
  keywords: [
    'MataCare Optik',
    'Optik Aceh',
    'Optik Aceh Tengah',
    'Optik Takengon',
    'MataCare Takengon',
    'Optik Paya Tumpi',
    'Optik Keliling',
    'Pemeriksaan Mata Keliling Takengon',
    'Lensa Photocromic Bluechromic Takengon',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'MataCare Optik - Layanan Optik Keliling Profesional',
    description:
      'Pemeriksaan mata profesional langsung ke lokasi Anda di Takengon & Aceh Tengah.',
    url: siteUrl,
    siteName: 'MataCare Optik',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/og-image.jpeg', 
        width: 1200,
        height: 630,
        alt: 'MataCare Optik Takengon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MataCare Optik',
    description: 'Layanan Optik & Pemeriksaan Mata Keliling Takengon',
    images: ['/og-image.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schema Graph gabungan: WebSite + Optician / LocalBusiness
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'MataCare Optik',
        alternateName: ['MataCare', 'MataCare Optik Takengon'],
        inLanguage: 'id-ID',
      },
      {
        '@type': 'Optician', // Tipe spesifik untuk Optik / Toko Kacamata
        '@id': `${siteUrl}/#organization`,
        name: 'MataCare Optik',
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        image: `${siteUrl}/og-image.jpg`,
        description:
          'Layanan pemeriksaan refraksi mata keliling dan penyediaan kacamata berkualitas di Aceh Tengah.',
        telephone: '+628xxxxxxxxxx', // Nomor WhatsApp / kontak bisnis
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Paya Tumpi', // Sesuaikan
          addressLocality: 'Takengon',
          addressRegion: 'Aceh Tengah',
          addressCountry: 'ID',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 4.6288, // Ganti koordinat lokasi akurat
          longitude: 96.8452,
        },
        areaServed: [
          {
            '@type': 'AdministrativeArea',
            name: 'Takengon',
          },
          {
            '@type': 'AdministrativeArea',
            name: 'Aceh Tengah',
          },
        ],
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
            ],
            opens: '08:00',
            closes: '18:00',
          },
        ],
      },
    ],
  };

  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-slate-50/50 text-matanavy-900 antialiased selection:bg-matablue-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}