import React, { RefObject } from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = (props: { contactRef: RefObject<HTMLElement | null> }) => {
        
    return (
        <section ref={props.contactRef} id="aboutPage" className="relative pt-5 pl-12 pr-12 pb-8 text-white w-full bg-[var(--color-ground)] font-(family-name:--font-body)">
            <div id="arrow-container">
                <div id="arrow"></div>
            </div>
            <motion.h1 id="contactHeader" className="font-(family-name:--font-header) font-bold text-center text-3xl md:text-5xl/16 mt-18 mb-4 font-(family-name:--font-header)"
                variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }} initial="hidden" whileInView="visible" viewport={{ once: true }}
                transition={{ duration: 0.5 }}>
                Contact Me
            </motion.h1>
            <div className="flex flex-col items-center">
                <div className="flex flex-col">
                    <motion.div className="flex items-center gap-4"
                        variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        transition={{ duration: 0.5 }}>
                        <a href="mailto:matthewhwang95@gmail.com"><img src="./images/email.svg" alt="Email Icon" className="w-8 h-8" /></a>
                        <a href="mailto:matthewhwang95@gmail.com">matthewhwang95@gmail.com</a>
                    </motion.div>
                    <motion.div className="flex items-center gap-4"
                        variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        transition={{ duration: 0.5 }}>
                        <a href="tel:+12063720329"><img src="./images/phone.svg" alt="Email Icon" className="w-8 h-8" /></a>
                        <a href="tel:+12063720329">(206) 372-0329</a>
                    </motion.div>
                    <div className="mt-8 flex flex-wrap items-start gap-5">
                        <motion.a className="flex items-center gap-4" href="https://github.com/Zydico" title="Link to Matthew's Github page"  target="_blank"
                            variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} initial="hidden" whileInView="visible" viewport={{ once: true }}
                            transition={{ duration: 0.5 }}>
                            <img src="./images/github.svg" alt="Github Icon" className="w-8 h-8" />
                        </motion.a>
                        <motion.a className="flex items-center gap-4" href="https://www.linkedin.com/in/matthewhwang95/" title="Link to Matthew's LinkedIn page" target="_blank"
                            variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} initial="hidden" whileInView="visible" viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}>
                           <img src="./images/linkedin.svg" alt="LinkedIn Icon" className="w-8 h-8" />
                        </motion.a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact