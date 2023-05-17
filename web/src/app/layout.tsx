import {
  Bai_Jamjuree as BaiJamJuree,
  Roboto_Flex as Roboto,
} from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baijam = BaiJamJuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-baijam',
})

export const metadata = {
  title: 'NLW Spacetime',
  description:
    'Uma cápsula do tempo construida com NextJs, Tailwindcss e Typescript',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body
        className={`${roboto.variable} ${baijam.variable} bg-gray-900 font-body text-gray-100`}
      >
        {children}
      </body>
    </html>
  )
}
