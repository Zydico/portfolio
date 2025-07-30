import { Roboto } from "next/font/google";

const robotoFont = Roboto({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-roboto",
});

import Hero from "@/components/Hero/Hero";
import Navigation from "@/components/Navigation/Navigation";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col">
      <header>
        <Navigation />
      </header>
      <main>
        <Hero />
      </main>
    </div>
  );
}
