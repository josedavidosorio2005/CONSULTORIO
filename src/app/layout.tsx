import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import WhatsAppFloatingButton from '@/components/ui/WhatsAppFloatingButton';

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
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <AnimatedBackground />
        <Header />
        <main className="relative z-10">{children}</main>
        <Footer />
        <WhatsAppFloatingButton phoneNumber="+34600000000" />
      </body>
    </html>
  );
}
