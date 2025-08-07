'use client';
import Hero from "@/components/Hero/Hero";
import Navigation from "@/components/Navigation/Navigation";
import { useRef } from "react";
import { Rajdhani } from "next/font/google";

const barlowCondensed = Rajdhani({
  subsets: ['latin'],
  weight: ['400'],
});

export default function Home() {
  const navBarRef = useRef<HTMLElement | null>(null);

  return (
    <div className="flex flex-col">
      <header className={`${barlowCondensed.className}`}>
        <Navigation navBarRef={navBarRef} />
      </header>
      <main>
        <Hero navBarRef={navBarRef} />
      </main>
    </div>
  );
}
