'use client';
import Hero from "@/components/Hero/Hero";
import Navigation from "@/components/Navigation/Navigation";
import { useRef } from "react";

export default function Home() {
  const navBarRef = useRef<HTMLElement | null>(null);

  return (
    <div className="flex flex-col">
      <header className="font-menu">
        <Navigation navBarRef={navBarRef} />
      </header>
      <main>
        <Hero navBarRef={navBarRef} />
      </main>
    </div>
  );
}
