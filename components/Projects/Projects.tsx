import React, { RefObject } from 'react';
import { motion } from 'framer-motion';
import Project from './Project';
import './Projects.css';

const Projects = (props: { projectsRef: RefObject<HTMLElement | null> }) => {
        
    return (
        <section ref={props.projectsRef} id="projectsPage" className="page relative pt-5 pl-12 pr-12 text-white w-full bg-[var(--color-light-background)] font-(family-name:--font-body)">
            <img id="transition" src="./images/Transition.svg" alt="" className="pointer-events-none select-none object-fill absolute top-0 left-0 w-full min-h-20 max-h-20" />
            <motion.h1 id="projectsHeader" className="font-(family-name:--font-header) font-bold text-3xl md:text-5xl/16 mt-25 mb-4 font-(family-name:--font-header)"
                variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} initial="hidden" whileInView="visible" viewport={{ once: true }}
                transition={{ duration: 0.5 }}>
                Projects
            </motion.h1>
            <div className="flex flex-wrap w-full mt-8 relative">
                <Project title="Maplestory Helper" description="A collection of resources and tools I developed to aid players in the video game called Maplestory."
                         url="https://zydico.github.io/Website/#/maplestory-helper/useful-resources" />
            </div>
        </section>
    )
}

export default Projects