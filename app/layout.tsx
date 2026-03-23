// app/layout.tsx
import type { Metadata } from 'next';
import { Toaster } from 'sonner'; // Menggunakan Sonner dari package.json
import './globals.scss';

export const metadata: Metadata = {
  title: 'Eid Mubarak Greeting',
  description: 'Selamat Hari Raya Eid Mubarak - Mohon Maaf Lahir & Batin',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark">
      <body className="bg-black text-white antialiased font-sans">
        {children}
        <Toaster theme="dark" position="bottom-center" />
      </body>
    </html>
  );
}