'use client';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import './Hero.css';

import starsData from './star_data.json';
import lineData from './line_data.json';

interface MousePosition {
    x: number,
    y: number
}
interface Star {
    x: number,
    y: number,
    b: number,
    color: string
}

const Hero = (props: { navBarRef: RefObject<HTMLElement | null> }) => {
    const animationFrameId = useRef<number>(0);
    const shootingStarId = useRef<NodeJS.Timeout | null>(null);
    const shootingStarRef = useRef<HTMLDivElement>(null);
    const starCanvasRef = useRef<HTMLCanvasElement>(null);
    const starCanvasContextRef = useRef<CanvasRenderingContext2D>(null);
    const lineCanvasRef = useRef<HTMLCanvasElement>(null);
    const lineCanvasContextRef = useRef<CanvasRenderingContext2D>(null);
    const stars = new Map<string, Star>(Object.entries(starsData));
    const lines = new Map<string, string[][]>(Object.entries(lineData));
    const starsInALine: string[] = [];
    const mousePosition: MousePosition = { x: 0, y: 0 }
    let scale: number = 1.8; // width scaling

    useEffect(() => {
        const animate = () => {
            drawLines();
            animationFrameId.current = requestAnimationFrame(animate);
        }
        const handleMouseMove = (event: MouseEvent) => {
            if (props.navBarRef && props.navBarRef.current) {
                mousePosition.x = event.clientX;
                mousePosition.y = event.clientY - props.navBarRef.current.offsetHeight;
                drawLines();
            }
        };

        for (let [key, value] of lines) {
            for (let line of value) {
                for (let i = 0; i < line.length-1; i++) {
                    const star = line[i];
                    if (!starsInALine.includes(star)) {
                        starsInALine.push(star);
                    }
                }
            }       
        }   
        const setCanvas = () => {
            const starCanvas: HTMLCanvasElement | null = starCanvasRef.current;
            const lineCanvas: HTMLCanvasElement | null = lineCanvasRef.current;
            if (starCanvas && lineCanvas) {
                const width = starCanvas.getBoundingClientRect().width;
                const height = starCanvas.getBoundingClientRect().height;
                scale = Math.max(width, height)/1980;
                starCanvas.width = width*2.5;
                starCanvas.height = height*2.5;
                starCanvas.style.width = width*2.5 + 'px';
                starCanvas.style.height = height*2.5 + 'px';
                lineCanvas.width = width*2.5;
                lineCanvas.height = height*2.5;
                lineCanvas.style.width = width*2.5 + 'px';
                lineCanvas.style.height = height*2.5 + 'px';
                const starCanvasContext: CanvasRenderingContext2D | null = starCanvas.getContext('2d');
                const lineCanvasContext: CanvasRenderingContext2D | null = lineCanvas.getContext('2d');
                if (starCanvasContext && lineCanvasContext) {
                    starCanvasContext.scale(1.25,1.25);
                    lineCanvasContext.scale(1.25,1.25);
                    starCanvasContext.translate(starCanvas.width/2.5, starCanvas.height/2.5);
                    lineCanvasContext.translate(lineCanvas.width/2.5, lineCanvas.height/2.5);
                }
                starCanvasContextRef.current = starCanvasContext;
                lineCanvasContextRef.current = lineCanvasContext;
                drawStars();
                drawLines();
            }
            animate();
        }
        setCanvas();
        function shootingStar() {
            if (shootingStarRef.current) {
                shootingStarRef.current.classList.add('star');
                shootingStarRef.current.style.left = Math.random() * 45 + 50 + '%';
                shootingStarRef.current.style.top = Math.random() * 40 + '%';
                shootingStarId.current = setTimeout(() => {
                    shootingStarRef.current?.classList.remove('star');
                    setTimeout(shootingStar, (Math.random() * 3000 + 3000));
                }, 2000);
            }
        }
        shootingStar();

        window.addEventListener('mousemove', handleMouseMove);
        const resize = () => {
            location.reload();
        }
        setTimeout(() => {
            window.addEventListener('resize', resize);
        }, 100);
        // Cleanup
        return () => {
            cancelAnimationFrame(animationFrameId.current);
            clearTimeout(shootingStarId.current as NodeJS.Timeout);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
        }
    }, [])

    const drawStars = () => {
        if (starCanvasContextRef && starCanvasContextRef.current && starCanvasRef && starCanvasRef.current) {
            const distance = Math.max(window.innerWidth, window.innerHeight) / 2;
            const ref = starCanvasContextRef.current;
            ref.clearRect(-starCanvasRef.current.width/2, -starCanvasRef.current.height/2, starCanvasRef.current.width, starCanvasRef.current.height);
            ref.shadowBlur = 15; // adds glow to each star
            let circle_rad: number = 2*Math.PI;
            for (let [key, value] of stars) {
                ref.beginPath();
                if (value.b > 2.5) {
                    value.b *= 0.5;
                }
                let brightness = Math.max(value.b, 0.4) * scale;
                if (starsInALine.includes(key)) {
                    brightness += 0.5;
                }
                ref.arc(value.x * distance, value.y * distance, brightness, 0, circle_rad);
                ref.fillStyle = value.color;
                ref.shadowColor = value.color;      
                ref.fill();
            }
        }
    }

    const getRotatedCoordinates = (x: number, y: number, angle: number): { x: number, y: number } => {
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);
        const rotatedX = x * cos - y * sin;
        const rotatedY = x * sin + y * cos;
        return { x: rotatedX, y: rotatedY };
    }

    const addOpacityToRgb = (rgb: string, opacity: number): string => {
        const split = rgb.substring(3, rgb.length-1).replace(/ /g, ',');
        
        return `rgba${split},${opacity})`;
    }

    const drawLines = () => {
        if (lineCanvasContextRef?.current && lineCanvasRef?.current && starCanvasRef?.current) {
            const ref = lineCanvasContextRef.current;
            ref.save();
            const distance = Math.max(window.innerWidth, window.innerHeight) / 2;
            ref.shadowBlur = 15; // adds glow to each line
            ref.shadowColor = 'rgba(255, 255, 255, 0.5)';    
            ref.lineWidth = 1 * scale;
            ref.clearRect(-lineCanvasRef.current.width/2, -lineCanvasRef.current.height/2, lineCanvasRef.current.width, lineCanvasRef.current.height);
            
            const style = window.getComputedStyle(starCanvasRef.current);
            const transform = style.transform;
            const values = transform.match(/matrix\(([^)]+)\)/);
            if (!values) {
                return 0;
            }
            const parts = values[1].split(',').map(parseFloat);
            const [a, b] = parts;
            const angle = Math.atan2(b, a);     
            const adjustedMouseX = (mousePosition.x - (lineCanvasRef.current.offsetLeft + lineCanvasRef.current.width / 2))/1.25;
            const adjustedMouseY = (mousePosition.y - (lineCanvasRef.current.offsetTop + lineCanvasRef.current.height / 2))/1.25;       
            for (let [key, value] of lines) {
                for (let line of value) {
                    for (let i = 0; i < line.length-1; i++) {
                        ref.beginPath();
                        const star1 = stars.get(line[i]);
                        const star2 = stars.get(line[i+1]);
                        if (star1 && star2) {
                            const star1Coordinates = getRotatedCoordinates(star1.x*distance, star1.y*distance, angle);
                            const star2Coordinates = getRotatedCoordinates(star2.x*distance, star2.y*distance, angle);
                            ref.moveTo(star1Coordinates.x, star1Coordinates.y);
                            ref.lineTo(star2Coordinates.x, star2Coordinates.y);
                            const centerX = (star1Coordinates.x + star2Coordinates.x)/2;
                            const centerY = (star1Coordinates.y + star2Coordinates.y)/2;
                            const deltaX = centerX - adjustedMouseX;
                            const deltaY = centerY - adjustedMouseY;
                            const deltaH = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));  
                            const opacity = Math.max(1 - deltaH/250, 0);
                            const grad = ref.createLinearGradient(star1Coordinates.x, star1Coordinates.y, star2Coordinates.x, star2Coordinates.y);
                            grad.addColorStop(0, addOpacityToRgb(star1.color, opacity));
                            grad.addColorStop(1, addOpacityToRgb(star2.color, opacity));
                            ref.strokeStyle = grad;
                            ref.stroke();
                        }
                    }
                }       
            }   
            ref.restore();
        }
    }
    return (
        <section className="relative overflow-hidden h-full ">
            <canvas className="absolute -top-3/4 -left-3/4 w-full h-full origin-center" ref={lineCanvasRef}></canvas>
            <canvas id="starCanvas" className="absolute -top-3/4 -left-3/4 w-full h-full origin-center" ref={starCanvasRef}></canvas>
            <div className="absolute" ref={shootingStarRef}></div>
            <img src="./images/foreground.svg" alt="" className="pointer-events-none select-none object-fill absolute bottom-0 w-full min-h-30" />
            <h1 className="font-(family-name:--font-header) text-3xl/13 md:text-5xl/16 text-white mt-4 md:mt-6 ml-7 md:ml-10">&lt; Matthew Hwang /&gt;</h1>
            <h2 className="font-(family-name:--font-header) text-xl md:text-3xl text-white mt-1 ml-7 md:ml-10">Full-stack Developer</h2>
            <h2 className="font-(family-name:--font-header) text-xl md:text-3xl text-white mt-1 ml-7 md:ml-10">Mechanical Engineer</h2>
        </section>
    )
}

export default Hero