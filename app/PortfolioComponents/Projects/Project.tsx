import { motion } from 'motion/react';
import React from 'react';

const Project = (props: { title: string, description: string, url?: string, skills: string[] }) => {

    const navTo = (destination?: string) => {
        if (destination) {
            window.open(destination, '_blank');
        }
    }

    const getColor = (skill: string): string => {
        if (['Angular', 'HTML', 'CSS', 'Typescript', 'Tailwind', 'React', 'Next.js'].includes(skill)) {
            return 'skill-frontend';
        } else {
            throw new Error('Invalid skill listed');
        }
    }
        
    return (
        <motion.div className="project w-100 h-100 aspect-square bg-[var(--color-light-gray)] relative overflow-hidden rounded-xl cursor-pointer"
                    variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    transition={{ duration: 0.5 }} onClick={() => navTo(props.url)}>
            <div className="footer bg-white w-full h-30 absolute bottom-0 pl-5 pt-2 pr-5 pb-2 text-[var(--color-gray-font)]">
                <div className="project-title text-lg font-bold text-center mb-1">
                    {props.title}
                </div>
                <div className="project-description md:text-sm/5 text-xs/5">
                    {props.description}
                </div>
                <ul className="flex flex-wrap gap-2 absolute bottom-0 left-0 w-full pl-4 pr-4 pb-2 md:text-sm text-xs">
                    {props.skills.map((item, index) => (
                        <li key={index} className={`${getColor(item)} rounded-lg px-2 py-0.25 flex`}>{item}</li>
                    ))}
                </ul>
            </div>
            <img alt="Project Image" className="w-full block object-cover h-70" src="./images/MaplestoryHelper.jpg" />
        </motion.div>
    )
}

export default Project