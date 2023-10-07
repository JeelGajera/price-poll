import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";


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
        <Script id='sr1' type='module' src='/assets/js/three.js' strategy='beforeInteractive' />
        <Script id='sr2' type='module' src='/assets/js/three.module.js' strategy='beforeInteractive' />
        <Script id='sr3' src='/assets/js/p5.min.js' strategy='beforeInteractive' />
        <Script id='sr4' src="/assets/js/vanta.topology.min.js" strategy='beforeInteractive' />
        <main className="max-w-10xl mx-auto">
          <Navbar />
          {children}
          <ToastContainer
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick={true}
            pauseOnHover={true}
            draggable={true}
            rtl={false}
            pauseOnFocusLoss={true}
            theme='dark'
          />
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