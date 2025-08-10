import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { Navbar } from "@/components/Navbar"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

// TEMPORARY MAINTENANCE MODE - Set to false to restore navbar
const MAINTENANCE_MODE = false

export const metadata: Metadata = {
  title: "Flyte AI",
  description: "Book flights with crypto, instantly. Powered by AI.",
  other: {
    'virtual-protocol-site-verification': '5d7c75a65f739bcdb4cdaecb8effb580',
    'fc:frame': JSON.stringify({
      version: 'next',
      imageUrl: 'https://www.flyteai.io/FlyteAILogo.png',
      button: {
        title: 'Launch Flyte AI',
        action: {
          type: 'launch_frame',
          name: 'Flyte AI',
          url: 'https://www.flyteai.io',
          splashImageUrl: 'https://www.flyteai.io/FlyteAILogo.png',
          splashBackgroundColor: '#000000',
        },
      },
    }),
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              {!MAINTENANCE_MODE && <Navbar />}
              <main className="flex-1">
                {children}
              </main>
            </div>
          </AuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
