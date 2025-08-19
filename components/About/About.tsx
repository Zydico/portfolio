'use client';
import React, { RefObject, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const About = (props: { aboutRef: RefObject<HTMLElement | null> }) => {
    const skillsCanvasRef = useRef<HTMLCanvasElement>(null);
    const skillsCanvasContextRef = useRef<CanvasRenderingContext2D>(null);
    const skillsLabelRef = useRef<HTMLDivElement>(null);
    const animationFrameId = useRef<number>(0);
    const ringRotation = 0.002; // constant set instead of calculating to prevent overlap/collision
    let mousePosition = {x: 0, y: 0};
    const skills = [
        {
            size: 100,
            url: './images/Profile.png',
        },
        {
            category: 'Frontend',
            size: 30,
            distance: 150,
            angle: 0, 
            color: 'rgb(168, 168, 253)',
            childrenColor: 'rgba(117, 117, 212, 1)',
            layers: [60, 90],
            skills: [
                {skill: 'React', url: './images/React.png', size: 20, layer: 1, angle: 0},
                {skill: 'Next.js', url: './images/Next.png', size: 15, layer: 1, angle: 0.5},
                {skill: 'Angular', url: './images/Angular.png', size: 20, layer: 1, angle: Math.PI},
                {skill: 'HTML', url: './images/HTML.png', size: 13, layer: 2, angle: Math.PI/2},
                {skill: 'CSS', url: './images/CSS.png', size: 13, layer: 2, angle: Math.PI/2-0.3},
                {skill: 'Javascript', url: './images/Javascript.png', size: 13, layer: 2, angle: Math.PI/2+0.3},
                {skill: 'Typescript', url: './images/Typescript.png', size: 15, layer: 1, angle: Math.PI/2},
                {skill: 'Tailwind', url: './images/Tailwind.png', size: 15, layer: 1, angle: -0.5},
            ],
        },
        {
            category: 'Backend', 
            size: 25,
            distance: 150,
            angle: Math.PI,
            color: 'rgb(130, 199, 130)',
            childrenColor: 'rgba(87, 153, 87, 1)',
            layers: [50, 80],
            skills: [
                {skill: 'Node.js', url: './images/NodeJs.svg', size: 13, layer: 1, angle: 0},
                {skill: 'Express', url: './images/Expressjs.png', size: 13, layer: 1, angle: 2*Math.PI/4},
                {skill: 'Python', url: './images/Python.png', size: 13, layer: 1, angle: 2*2*Math.PI/4},
                {skill: 'Java', url: './images/Java.png', size: 15, layer: 1, angle: 3*2*Math.PI/4},
                {skill: 'PostgreSQL', url: './images/PostgreSQL.svg', size: 13, layer: 2, angle: 0},
                {skill: 'MongoDB', url: './images/MongoDB.png', size: 13, layer: 2, angle: Math.PI},
            ],
        },
    ]
    const loadedImages = new Map();

    useEffect(() => {
        const animate = () => {
            drawSkills();
            animationFrameId.current = requestAnimationFrame(animate);
        }
        const handleMouseMove = (event: MouseEvent) => {
            if (skillsCanvasRef && skillsCanvasRef.current && skillsCanvasContextRef && skillsCanvasContextRef.current) {
                mousePosition.x = event.clientX - skillsCanvasRef.current.getBoundingClientRect().left - skillsCanvasRef.current.width/2;
                mousePosition.y = event.clientY - skillsCanvasRef.current.getBoundingClientRect().top - skillsCanvasRef.current.height/2;
            }
        }
        window.addEventListener('mousemove', handleMouseMove);
        const setCanvas = () => {
            const skillsCanvas: HTMLCanvasElement | null = skillsCanvasRef.current;
            if (skillsCanvas) {
                // preloading images
                for (let skill of skills) {
                    if (skill.url) {
                        const image = new Image();
                        image.src = skill.url;
                        loadedImages.set('Profile', image);
                    } else {
                        if (skill.skills) {
                            for (let child of skill.skills) {
                                const image = new Image();
                                image.src = child.url;
                                loadedImages.set(child.skill, image);
                            }
                        }
                    }
                }

                const width = skillsCanvas.getBoundingClientRect().width;
                const height = skillsCanvas.getBoundingClientRect().height;
                const dpr = window.devicePixelRatio || 1;
                skillsCanvas.width = width * dpr;
                skillsCanvas.height = height * dpr;
                const skillsCanvasContext: CanvasRenderingContext2D | null = skillsCanvas.getContext('2d');
                skillsCanvasContext?.translate(skillsCanvas.width/2, skillsCanvas.height/2);
                skillsCanvasContextRef.current = skillsCanvas.getContext('2d');
                if (skillsCanvasContextRef.current) {
                    skillsCanvasContextRef.current.scale(dpr, dpr);
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
            const scale = width/500;
            ref.clearRect(-skillsCanvasRef.current.width, -skillsCanvasRef.current.height, skillsCanvasRef.current.width*2, skillsCanvasRef.current.height*2);
            ref.shadowBlur = 10; // adds glow to each line
            ref.shadowColor = 'rgba(255, 255, 255, 0.89)';
            if (skillsLabelRef.current) {
                skillsLabelRef.current.style.visibility = 'hidden';
            }
            for (let skill of skills) {
                let x = 0;
                let y = 0;
                if (skill.category) {
                    const distance = skill.distance * scale;
                    if (skill.category == 'Frontend') {
                        ref.strokeStyle = '#ffffffff';
                        ref.beginPath();
                        ref.lineWidth = 1;
                        ref.arc(0, 0, distance, 0, Math.PI*2);
                        ref.closePath();
                        ref.stroke();
                    }
                    ref.fillStyle = skill.color;
                    x = distance*Math.cos(skill.angle);
                    y = distance*Math.sin(skill.angle);
                    ref.beginPath();
                    ref.arc(x, y, skill.size*scale, 0, Math.PI*2);
                    ref.closePath();
                    ref.fill();
                    ref.textAlign = 'center';
                    ref.textBaseline = 'middle';
                    ref.fillStyle = '#ffffff';
                    const fontSize = scale * 0.75 * skill.size/30;
                    ref.font = 'bold ' + fontSize + 'rem Inter';
                    ref.fillText(skill.category, x, y);
                    skill.angle += ringRotation;
                    for (let layer of skill.layers) {
                        ref.strokeStyle = '#ffffffff';
                        ref.beginPath();
                        ref.lineWidth = 0.25;
                        ref.arc(x, y, layer*scale, 0, Math.PI*2);
                        ref.closePath();
                        ref.stroke();
                    }
                    for (let child of skill.skills) {
                        ref.fillStyle = skill.childrenColor;
                        const layer = child.layer;
                        const childDistance = skill.layers[layer-1] * scale;
                        const childX = childDistance*Math.cos(child.angle);
                        const childY = childDistance*Math.sin(child.angle);
                        let rotationSpeed = 0.2/childDistance;
                        child.angle += rotationSpeed;
                        const childScale = scale*1.5;
                        let imageX = x+childX-child.size*childScale/2;
                        let imageY = y+childY-child.size*childScale/2;
                        let imageSize = child.size*childScale;
                        if (mousePosition.x >= imageX && mousePosition.x <= imageX + imageSize &&
                            mousePosition.y >= imageY && mousePosition.y <= imageY + imageSize && skillsLabelRef.current) {
                            imageSize += 6;
                            imageX -= 3;
                            imageY -= 3;
                            skillsLabelRef.current.style.left = skillsCanvasRef.current.width/2 + mousePosition.x - skillsLabelRef.current.offsetWidth/2 + 'px';                         
                            skillsLabelRef.current.style.top = skillsCanvasRef.current.height/2 + mousePosition.y - skillsLabelRef.current.offsetHeight - 20 + 'px'; 
                            skillsLabelRef.current.innerText = child.skill;    
                            skillsLabelRef.current.style.visibility = 'visible';
                        }
                        ref.drawImage(loadedImages.get(child.skill), imageX, imageY, imageSize, imageSize);
                    }
                }
                if (skill.url) { // profile pic
                    const size = skill.size * scale;
                    ref.drawImage(loadedImages.get('Profile'), x-size/2, y-size/2, size, size);
                }

            }

            ref.restore();
        }
    }
        
    return (
        <section ref={props.aboutRef} id="aboutPage" className="page pt-5 pb-8 text-white w-full bg-[var(--color-ground)] font-(family-name:--font-body)">
            <div className="flex flex-wrap items-start justify-between text-xl">
                <section className="flex flex-col gap-4 md:w-40/100 w-full pl-12 pr-12">
                    <motion.h1 id="aboutHeader" className="font-(family-name:--font-header) font-bold text-3xl md:text-5xl/16 mb-4 font-(family-name:--font-header)"
                        variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        transition={{ duration: 0.5 }}>
                        About Me
                    </motion.h1>
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
                <section className="md:w-40/100 w-full md:mt-0 md:mr-12 mt-5 w-full aspect-square relative">
                    <canvas id="skillsCanvas" className="w-full h-full origin-center" ref={skillsCanvasRef}></canvas>
                    <div className="bg-black text-white absolute p-1 border-1" ref={skillsLabelRef}></div>
                </section>
            </div>
        </section>
    )
}

export default About