"use client";
import { useRef } from "react";
import Navigation from "./PortfolioComponents/Navigation/Navigation";
import Hero from "./PortfolioComponents/Hero/Hero";
import About from "./PortfolioComponents/About/About";
import Contact from "./PortfolioComponents/Contact/Contact";
import Projects from "./PortfolioComponents/Projects/Projects";

export default function Home() {
  const navBarRef = useRef<HTMLElement | null>(null);
  const homeRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  return (
    <div>
      <div className="flex flex-col">
        <header className="font-menu">
          <Navigation navBarRef={navBarRef} homeRef={homeRef} aboutRef={aboutRef} projectsRef={projectsRef} contactRef={contactRef} />
        </header>
        <main>
          <Hero navBarRef={navBarRef} homeRef={homeRef} aboutRef={aboutRef} />
          <About aboutRef={aboutRef} />
          <Projects projectsRef={projectsRef} />
          <Contact contactRef={contactRef} />
        </main>
      </div>
    </div>
  );
}
