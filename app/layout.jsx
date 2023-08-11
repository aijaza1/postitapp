import './globals.css'
import { Nobile } from 'next/font/google'
import Nav from './Nav'
import AuthContext from "./auth/AuthContext"
import QueryWrapper from './QueryWrapper'


const nobile = Nobile({ subsets: ['latin'], weight: ['400'] })


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Postifly</title>

        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </head>
      <body className={`mx-4 md:mx-48 xl:mx-96 ${nobile.variable} bg-[#e9e2fb]`}>
        <QueryWrapper>
          <AuthContext>
            <Nav />
            {children}
          </AuthContext>
        </QueryWrapper>
      </body>
    </html>
  )
}
