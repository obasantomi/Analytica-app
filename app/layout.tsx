import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "./(auth)/Provider";

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
        url: "/icon.svg",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <AuthProvider>
        <body className="min-h-screen bg-white">{children}</body>
      </AuthProvider>
    </html>
  );
}
