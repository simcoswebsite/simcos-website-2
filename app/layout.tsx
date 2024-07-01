import './globals.css'
import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import ToastProvider from '@/providers/ToastProvider'
import ModalProvider from '@/providers/ModalProvider'

const font = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Simcos',
  description: 'A local restaurant dedicated to quality serice',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${font.className} bg-custom-gradient min-h-screen`}>
        <ToastProvider />
        <ModalProvider />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  )
}
