import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import React from 'react';

const Project = (props: { title: string, description: string, url?: string, imageUrl: string, skills: string[], externalLink?: boolean }) => {
    const router = useRouter();

    const navTo = (destination?: string) => {
        if (destination) {
            if (props.externalLink) {
                window.open(destination, '_blank');
            } else {
                router.push(destination);
            }
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
        <motion.div className="project w-100 aspect-square bg-[var(--color-light-gray)] relative overflow-hidden rounded-xl cursor-pointer"
                    variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    transition={{ duration: 0.5 }} onClick={() => navTo(props.url)}>
            <div className="footer bg-white w-full absolute bottom-0 pl-5 pt-2 pr-5 pb-2 text-[var(--color-gray-font)]">
                <div className="project-title text-lg font-bold text-center mb-1">
                    {props.title}
                </div>
                <div className="project-description md:text-sm/5 text-xs/5">
                    {props.description}
                </div>
                <ul className="flex flex-wrap gap-2 mt-3 mb-2 left-0 w-full md:text-sm text-xs">
                    {props.skills.map((item, index) => (
                        <li key={index} className={`${getColor(item)} rounded-lg px-2 py-0.25 flex`}>{item}</li>
                    ))}
                </ul>
            </div>
            <img alt="Project Image" className="w-full block object-cover h-70" src={props.imageUrl} />
        </motion.div>
    )
}

export default Project