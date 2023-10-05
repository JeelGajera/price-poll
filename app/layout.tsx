import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Price Poll - Your Ultimate Price Tracking Companion',
  description: 'Welcome to Price Poll - Your Ultimate Price Tracking Companion! Discover the best deals, monitor price changes, and save money on your favorite products with our powerful web scraping and tracking technology. Get real-time price alerts and make informed buying decisions. Start tracking prices today with PricePol!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Script id='sr1' src='/assets/js/p5.min.js' strategy='beforeInteractive' />
        <Script id='sr2' src="/assets/js/vanta.topology.min.js" strategy='beforeInteractive' />
        <main className="max-w-10xl mx-auto">
          <Navbar />
          {children}
        </main>
        <Script
          id="animated"
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `VANTA.TOPOLOGY({
                          el: "#animated_section",
                          mouseControls: true,
                          touchControls: true,
                          gyroControls: false,
                          minHeight: 400.00,
                          minWidth: 400.00,
                          scale: 1.00,
                          scaleMobile: 1.00,
                          color: 0x38e3d6,
                          backgroundColor: 0x000000
                        });`}} />
      </body>
    </html>
  );
}