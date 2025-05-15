import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Cinzel } from 'next/font/google';
import 'leaflet/dist/leaflet.css';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import WhatsAppChat from '@/components/chat/whatsapp-chat';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const cinzel = Cinzel({ 
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'S.C.E.A.R. | Roman Historical Reenactment Society',
  description: 'Societas civilis exercitus auxiliorumque Romanorum - Dedicated to the authentic reenactment and education of Roman military history.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${cinzel.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppChat />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}