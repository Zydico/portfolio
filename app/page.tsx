'use client';
import Hero from "@/components/Hero/Hero";
import Navigation from "@/components/Navigation/Navigation";
import { RefObject, useRef } from "react";

export default function Home() {
  const navBarRef = useRef<HTMLElement>(null);

  return (
    <div className="flex flex-col">
      <header>
        <Navigation navBarRef={navBarRef} />
      </header>
      <main>
        <Hero navBarRef={navBarRef} />
      </main>
    </div>
  );
}
