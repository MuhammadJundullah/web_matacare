import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Admin Panel | MataCare Optik',
  description: 'Halaman manajemen konten MataCare Optik',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-slate-100 text-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}
