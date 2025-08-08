import React, { RefObject } from 'react';

const About = (props: { aboutRef: RefObject<HTMLElement | null> }) => {
    return (
        <section ref={props.aboutRef}  id="aboutPage" className="text-white w-full h-full bg-[var(--color-ground)]">
            <section>
                <h1 className="font-bold text-3xl/13 md:text-5xl/16 ml-12 mt-5">About Me</h1>
            </section>
        </section>
    )
}

export default About