import type { Metadata } from "next";
import "./globals.css";
import { Rajdhani, Orbitron, Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Matthew Hwang | Developer & Engineer",
  description: "Portfolio showcasing software, simulation, and engineering projects",
};

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400'],
  variable: "--font-rajdhani"
});

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400'],
  variable: "--font-orbitron"
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400'],
  variable: "--font-inter"
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${rajdhani.variable} ${orbitron.variable} ${inter.variable} scroll-smooth`}>
      <body>
        {children}
      </body>
    </html>
  );
}
