import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FisioSalut - Centro de Fisioterapia",
  description: "Centro especializado en fisioterapia y rehabilitación. Ofrecemos tratamientos personalizados para mejorar tu calidad de vida.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={geist.className}>
      <body className="min-h-screen bg-gray-50">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
