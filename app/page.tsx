

import Hero from "@/components/Hero/Hero";
import Navigation from "@/components/Navigation/Navigation";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col">
      <header className="h-16">
        <Navigation />
      </header>
      <main className="">
        <Hero />
      </main>
    </div>
  );
}
