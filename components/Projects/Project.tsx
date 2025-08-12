import { motion } from 'motion/react';
import React from 'react';

const Project = (props: { title: string, description: string, url?: string }) => {

    const navTo = (destination?: string) => {
        if (destination) {
            window.open(destination, '_blank');
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
                <div className="project-description text-sm/5">
                    {props.description}
                </div>
            </div>
            <img alt="Project Image" className="w-full block object-cover h-70" src="./images/MaplestoryHelper.jpg" />
        </motion.div>
    )
}

export default Project