import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ThemeProvider from '@/components/ThemeProvider';
import ToastProvider from '@/components/ui/ToastProvider';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import WhatsAppFloatingButton from '@/components/ui/WhatsAppFloatingButton';

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FisioSalut - Centro de Fisioterapia Profesional",
  description: "Centro especializado en fisioterapia y rehabilitación. Ofrecemos tratamientos personalizados para mejorar tu calidad de vida. Reserva tu cita online.",
  keywords: "fisioterapia, rehabilitación, fisioterapeuta, masaje terapéutico, lesiones deportivas, dolor espalda",
  authors: [{ name: "FisioSalut" }],
  openGraph: {
    title: "FisioSalut - Centro de Fisioterapia Profesional",
    description: "Centro especializado en fisioterapia y rehabilitación",
    url: "https://fisiosalut.com",
    siteName: "FisioSalut",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FisioSalut - Centro de Fisioterapia Profesional",
    description: "Centro especializado en fisioterapia y rehabilitación",
    images: ["/og-image.jpg"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  return (
    <html lang="es" className={geist.className}>
      <head>
        <link rel="canonical" href="https://fisiosalut.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <ThemeProvider>
          <ToastProvider>
            <AnimatedBackground />
            <Header />
            <main className="relative z-10">{children}</main>
            <Footer />
            <WhatsAppFloatingButton phoneNumber="+34600000000" />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
