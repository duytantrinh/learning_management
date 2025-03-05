import type {Metadata} from "next"
import {Inter} from "next/font/google"
import "./globals.css"
import {ClerkProvider} from "@clerk/nextjs"
import ToasterProvider from "@/components/providers/ToasterProvider"

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
  title: "Learning Platforms",
  description: "Building a Learnign platform by NExtjs, Shadcn...",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className} suppressHydrationWarning>
          <ToasterProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
