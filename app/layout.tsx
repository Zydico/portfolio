import type { Metadata } from "next";
import "./globals.css";
import { Rajdhani, Orbitron, Exo_2, Audiowide } from "next/font/google";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${rajdhani.variable} ${orbitron.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
