import Footer from '@/components/footer'
import './globals.css'
import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import Navbar from '@/components/navbar'
import ModalProvider from '@/providers/modal-provider'
import ToastProvider from '@/providers/toast-provider'
import { ThemeProvider } from '@/providers/theme-providers'

const font = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Store',
  description: 'Your store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en" className='max-w-full '>
            
      <body className={`font.className` + "max-w-full  box-border p-8"}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
       <ModalProvider />
       <ToastProvider />
        <Navbar />
        {children}
      <Footer />  
      </ThemeProvider>
      </body>
    </html>
  )
}
