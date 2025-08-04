'use client';
import Hero from "@/components/Hero/Hero";
import Navigation from "@/components/Navigation/Navigation";
import Image from "next/image";
import { useRef } from "react";

export default function Home() {
  const navBarRef = useRef(null);

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
