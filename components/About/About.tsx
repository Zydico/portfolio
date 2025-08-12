import React, { RefObject } from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = (props: { aboutRef: RefObject<HTMLElement | null> }) => {
        
    return (
        <section ref={props.aboutRef} id="aboutPage" className="page pt-5 pl-12 pr-12 text-white w-full bg-[var(--color-ground)] font-(family-name:--font-body)">
            <motion.h1 id="aboutHeader" className="font-(family-name:--font-header) font-bold text-3xl md:text-5xl/16 mb-4 font-(family-name:--font-header)"
                variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} initial="hidden" whileInView="visible" viewport={{ once: true }}
                transition={{ duration: 0.5 }}>
                About Me
            </motion.h1>
            <div className="flex flex-wrap items-start justify-between text-xl">
                <section className="flex flex-col gap-4 md:w-40/100 w-full">
                    <motion.p
                        variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        transition={{ duration: 0.5 }}>
                        Hi, I'm Matthew! I'm a <span className="text-(--color-light-red)">Frontend Developer</span> with 2 years of experience building modern, responsive web applications. I specialize in creating
                        clean, intuitive user interfaces using <span className="text-(--color-light-blue)">React</span>, <span className="text-(--color-light-blue)">Angular</span>, 
                        <span className="text-(--color-light-blue)"> Javascript</span>, <span className="text-(--color-light-blue)">Typescript</span>, and modern <span className="text-(--color-light-blue)">CSS</span>. 
                    </motion.p>
                    <motion.p
                        variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        transition={{ duration: 0.5 }}>
                        Thanks to my background in <span className="text-(--color-light-orange)">Computer Science</span> and <span className="text-(--color-light-orange)">Mechanical Engineering</span>, I approach projects with strong analytical skills and a keen eye for
                        detail, helping me create software that is both reliable and innovative. I developed my skills with the intention of joining the Aerospace
                        industry, and I hope my passion shows through my portfolio and projects!
                    </motion.p>
                    <motion.p
                        variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        transition={{ duration: 0.5 }}>
                        I'm currently expanding my skill set and projects to include backend technologies like <span className="text-(--color-light-green)">Node.js</span>, 
                        <span className="text-(--color-light-green)"> Express</span>, and <span className="text-(--color-light-green)">PostgreSQL</span> in order to obtain
                        a position as a Full Stack Developer. I love learning new tools and technologies, and this portfolio website is the perfect little playground
                        to experiment and showcase my skills.
                    </motion.p>
                </section>
                <section className="md:w-40/100 w-full md:mt-0 mt-5 w-full border-1 aspect-square">
                </section>
            </div>
        </section>
    )
}

export default About