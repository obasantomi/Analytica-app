import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "./(auth)/Provider";
import ScrollToTop from "./(dashboard)/components/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Analytica",
  description:
    "Learn data analytics the practical way. Analytica uses real datasets, AI-generated tasks, and personalized feedback to help you build real skills.",
  icons: {
    icon: "/icon.svg",
  },

  openGraph: {
    title: "Analytica",
    description:
      "Learn data analytics the practical way. Analytica uses real datasets, AI-generated tasks, and personalized feedback to help you build real skills.",
    siteName: "Analytica",
    url: "https://analytica-neon.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://analytica-neon.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Analytica",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} bg-[#F2F4F6] antialiased`}
    >
      <body className="min-h-screen">
        <ScrollToTop />
        <AuthProvider>
          <body className="min-h-screen">{children}</body>
        </AuthProvider>
      </body>
    </html>
  );
}
