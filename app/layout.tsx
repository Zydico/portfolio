import type { Metadata } from "next";
import "./globals.css";
import { Rajdhani, Orbitron, Inter, League_Spartan, Roboto_Mono } from "next/font/google";

export const metadata: Metadata = {
  title: "Matthew Hwang | Developer & Engineer",
  description: "Matthew Hwang's portfolio showcasing software, simulation, and engineering projects",
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

const spartan = League_Spartan({
  subsets: ['latin'],
  weight: ['700'],
  variable: "--font-spartan"
});

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['700'],
  variable: "--font-roboto"
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${rajdhani.variable} ${orbitron.variable} ${inter.variable} ${spartan.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="../images/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
