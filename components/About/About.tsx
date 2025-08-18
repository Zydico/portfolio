'use client';
import React, { RefObject, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const About = (props: { aboutRef: RefObject<HTMLElement | null> }) => {
    const skillsCanvasRef = useRef<HTMLCanvasElement>(null);
    const skillsCanvasContextRef = useRef<CanvasRenderingContext2D>(null);
    const animationFrameId = useRef<number>(0);
    const skills = [
        {
            size: 100,
            url: './images/Profile.png',
        },
        {
            category: 'Frontend',
            size: 40,
            distance: 30,
            angle: 0, 
            color: 'rgb(168, 168, 253)',
            childrenColor: 'rgba(117, 117, 212, 1)',
            layers: [80, 130],
            skills: [
                {skill: 'React', url: './images/React.png', size: 20, layer: 1, angle: 0},
                {skill: 'Next.js', url: './images/Next.png', size: 15, layer: 1, angle: 0.5},
                {skill: 'Angular', url: './images/Angular.png', size: 20, layer: 1, angle: Math.PI},
                {skill: 'HTML', url: './images/HTML.png', size: 15, layer: 2, angle: Math.PI/2},
                {skill: 'CSS', url: './images/CSS.png', size: 15, layer: 2, angle: Math.PI/2-0.3},
                {skill: 'Javascript', url: './images/Javascript.png', size: 15, layer: 2, angle: Math.PI/2+0.3},
                {skill: 'Typescript', url: './images/Typescript.png', size: 15, layer: 1, angle: Math.PI/2},
                {skill: 'Tailwind', url: './images/Tailwind.png', size: 15, layer: 1, angle: -0.5},
            ],
        },
        // {
        //     category: 'Backend', 
        //     skills: [
        //         {skill: 'Node.js', url: ''},
        //         {skill: 'Express', url: ''},
        //         {skill: 'PostgreSQL', url: ''},
        //         {skill: 'SQL', url: ''},
        //         {skill: 'Python', url: ''},
        //         {skill: 'MongoDB', url: ''},
        //     ],
        // },
    ]

    useEffect(() => {
        const animate = () => {
            drawSkills();
            animationFrameId.current = requestAnimationFrame(animate);
        }
        const handleMouseMove = (event: MouseEvent) => {
            // if (props.navBarRef && props.navBarRef.current) {
            //     mousePosition.x = event.clientX;
            //     mousePosition.y = event.clientY - props.navBarRef.current.offsetHeight;
            //     drawLines();
            // }
        }
        const setCanvas = () => {
            const skillsCanvas: HTMLCanvasElement | null = skillsCanvasRef.current;
            if (skillsCanvas) {
                const width = skillsCanvas.getBoundingClientRect().width;
                const height = skillsCanvas.getBoundingClientRect().height;
                const ratio = window.devicePixelRatio;
                skillsCanvas.width = width*ratio;
                skillsCanvas.height = height*ratio;
                const skillsCanvasContext: CanvasRenderingContext2D | null = skillsCanvas.getContext('2d');
                skillsCanvasContext?.translate(width/2, height/2);
                skillsCanvasContextRef.current = skillsCanvas.getContext('2d');
                if (skillsCanvasContextRef.current) {
                    skillsCanvasContextRef.current.scale(ratio, ratio);
                    skillsCanvasContextRef.current.imageSmoothingEnabled = true;
                    skillsCanvasContextRef.current.imageSmoothingQuality = 'high';
                }

                drawSkills();
            }
            animate();
        }
        setCanvas();
        // Cleanup
        return () => {
            cancelAnimationFrame(animationFrameId.current);
            window.removeEventListener('mousemove', handleMouseMove);
        }
    }, [])

    const drawSkills = () => {
        if (skillsCanvasContextRef?.current && skillsCanvasRef?.current) {
            const ref = skillsCanvasContextRef.current;
            ref.save(); 
            const width = skillsCanvasRef.current.width;
            const height = skillsCanvasRef.current.height;
            ref.clearRect(-skillsCanvasRef.current.width, -skillsCanvasRef.current.height, skillsCanvasRef.current.width*2, skillsCanvasRef.current.height*2);
            ref.shadowBlur = 10; // adds glow to each line
            ref.shadowColor = 'rgba(255, 255, 255, 0.78)';
            for (let skill of skills) {
                let x = 0;
                let y = 0;
                if (skill.category) {
                    const distance = skill.distance/100 * width;
                    let rotation = 0.5/distance;
                    ref.strokeStyle = '#ffffffff';
                    ref.beginPath();
                    ref.lineWidth = 1.25;
                    ref.arc(0, 0, distance, 0, Math.PI*2);
                    ref.closePath();
                    ref.stroke();
                    ref.fillStyle = skill.color;
                    x = distance*Math.cos(skill.angle);
                    y = distance*Math.sin(skill.angle);
                    ref.beginPath();
                    ref.arc(x, y, skill.size, 0, Math.PI*2);
                    ref.closePath();
                    ref.fill();
                    ref.textAlign = 'center';
                    ref.textBaseline = 'middle';
                    ref.fillStyle = '#ffffff';
                    ref.font = 'bold 1rem Inter';
                    ref.fillText(skill.category, x, y);
                    skill.angle += rotation;
                    for (let layer of skill.layers) {
                        ref.strokeStyle = '#ffffffff';
                        ref.beginPath();
                        ref.lineWidth = 0.75;
                        ref.arc(x, y, layer, 0, Math.PI*2);
                        ref.closePath();
                        ref.stroke();
                    }
                    for (let child of skill.skills) {
                        ref.fillStyle = skill.childrenColor;
                        const layer = child.layer;
                        const childDistance = skill.layers[layer-1];
                        const childX = childDistance*Math.cos(child.angle);
                        const childY = childDistance*Math.sin(child.angle);
                        child.angle += 0.5/childDistance;
                        // ref.beginPath();
                        // ref.arc(x + childX, y + childY, child.size, 0, Math.PI*2);
                        // ref.closePath();
                        // ref.fill();
                        const image = new Image();
                        image.src = child.url;
                        ref.drawImage(image, x+childX-child.size*0.75, y+childY-child.size*0.75, child.size*1.5, child.size*1.5);
                    }
                }
                if (skill.url) {
                    const image = new Image();
                    image.src = skill.url;
                    ref.drawImage(image, x-skill.size/2, y-skill.size/2, skill.size, skill.size);
                }

            }

            ref.restore();
        }
    }
        
    return (
        <section ref={props.aboutRef} id="aboutPage" className="page pt-5 pl-12 pr-12 pb-8 text-white w-full bg-[var(--color-ground)] font-(family-name:--font-body)">
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
                <section className="md:w-40/100 w-full md:mt-0 mt-5 w-full aspect-square relative">
                    <canvas id="skillsCanvas" className="w-full h-full origin-center" ref={skillsCanvasRef}></canvas>
                    {/* <img src="./images/Profile.png" alt="Profile picture" className="w-2/10 h-2/10 absolute origin-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" /> */}
                </section>
            </div>
        </section>
    )
}

export default About