import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

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
        <main className="max-w-10xl mx-auto">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  )
}
