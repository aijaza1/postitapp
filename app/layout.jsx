import './globals.css'
import { Nobile } from 'next/font/google'
import Nav from './Nav'
import AuthContext from "./auth/AuthContext"
import QueryWrapper from './QueryWrapper'
import { MetadataProvider } from './MetadataContext';

const nobile = Nobile({ subsets: ['latin'], weight: ['400'] })


export default function RootLayout({ children }) {
  const metadata = {
    title: 'PostPals',
    description: "Share What's on your mind",
  };



  return (
    <MetadataProvider metadata={metadata}>
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/icon.png" />
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
    </MetadataProvider>

  )
}
