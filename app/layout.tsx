import './globals.css'
import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import ToastProvider from '@/providers/ToastProvider'
import ModalProvider from '@/providers/ModalProvider'

const font = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Store Front Website',
  description: 'An online store where customers can purchase goods.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToastProvider />
        <ModalProvider />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
