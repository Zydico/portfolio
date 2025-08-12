'use client';
import Hero from "@/components/Hero/Hero";
import Navigation from "@/components/Navigation/Navigation";
import About from "@/components/About/About";
import Projects from "@/components/Projects/Projects";
import { useRef } from "react";

export default function Home() {
  const navBarRef = useRef<HTMLElement | null>(null);
  const homeRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);

  return (
    <div className="flex flex-col">
      <header className="font-menu">
        <Navigation navBarRef={navBarRef} homeRef={homeRef} aboutRef={aboutRef} projectsRef={projectsRef} />
      </header>
      <main>
        <Hero navBarRef={navBarRef} homeRef={homeRef} aboutRef={aboutRef} />
        <About aboutRef={aboutRef} />
        <Projects projectsRef={projectsRef} />
      </main>
    </div>
  );
}
