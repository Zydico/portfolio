'use client';
import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';

import starsData from './star_data.json';
import lineData from './line_data.json';

const Hero = (props) => {
    const [size, setSize] = useState([0, 0]);
    const starCanvasRef = useRef<HTMLCanvasElement>(null);
    const starCanvasContextRef = useRef<CanvasRenderingContext2D>(null);
    const lineCanvasRef = useRef<HTMLCanvasElement>(null);
    const lineCanvasContextRef = useRef<CanvasRenderingContext2D>(null);
    const stars = new Map<string, Star>(Object.entries(starsData));
    const lines = new Map<string, string[][]>(Object.entries(lineData));
    const mousePosition: MousePosition = { x: 0, y: 0 }
    let scale: number = 1.8; // width scaling

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

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            mousePosition.x = event.clientX;
            mousePosition.y = event.clientY - props.navBarRef.current.offsetHeight;
            drawLines();
        };
        window.addEventListener('mousemove', handleMouseMove);
        const resize = () => {
            location.reload();
        }
        window.addEventListener('resize', resize);
        const setCanvas = () => {
            const starCanvas: HTMLCanvasElement | null = starCanvasRef.current;
            const lineCanvas: HTMLCanvasElement | null = lineCanvasRef.current;
            if (starCanvas && lineCanvas) {
                let width = starCanvas.getBoundingClientRect().width;
                let height = starCanvas.getBoundingClientRect().height;
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
        }
        setCanvas();
        // Cleanup
        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
        }
    }, [])

    const drawStars = () => {
        if (starCanvasContextRef && starCanvasContextRef.current && starCanvasRef && starCanvasRef.current) {
            let distance = Math.max(window.innerWidth, window.innerHeight) / 1.75;
            let ref = starCanvasContextRef.current;
            ref.clearRect(-starCanvasRef.current.width/2, -starCanvasRef.current.height/2, starCanvasRef.current.width, starCanvasRef.current.height);
            ref.shadowBlur = 15; // adds glow to each star
            let circle_rad: number = 2*Math.PI;
            for (let [key, value] of stars) {
                ref.beginPath();
                let brightness = Math.max(value.b, 0.4) * scale;
                ref.arc(value.x * distance, -(value.y * distance), brightness, 0, circle_rad);
                ref.fillStyle = value.color;
                ref.shadowColor = value.color;      
                ref.fill();
            }
        }
    }

    const drawLines = () => {
        if (lineCanvasContextRef && lineCanvasContextRef.current && lineCanvasRef && lineCanvasRef.current) {
            let ref = lineCanvasContextRef.current;
            let distance = Math.max(window.innerWidth, window.innerHeight) / 1.75;
            ref.shadowBlur = 15; // adds glow to each line
            ref.shadowColor = 'rgba(255, 255, 255, 0.5)';    
            ref.lineWidth = 1 * scale;
            ref.clearRect(-lineCanvasRef.current.width/2, -lineCanvasRef.current.height/2, lineCanvasRef.current.width, lineCanvasRef.current.height);
            for (let [key, value] of lines) {
                for (let line of value) {
                    for (let i = 0; i < line.length-1; i++) {
                        ref.beginPath();
                        let id = line[i];
                        let id2 = line[i+1];
                        if (line[i].endsWith('*')) {
                            id = line[i].slice(0, -1);
                        }
                        if (line[i+1].endsWith('*')) {
                            id2 = line[i+1].slice(0, -1);
                        }
                        let star1 = stars.get(id);
                        let star2 = stars.get(id2);
                        if (star1 && star2) {
                            ref.moveTo(star1.x * distance, star1.y * distance);
                            ref.lineTo(star2.x * distance, star2.y * distance);
                            let center = { x: (star1.x + star2.x)*distance/2, y: (star1.y + star2.y)*distance/2 };
                            let deltaX = (mousePosition.x - (lineCanvasRef.current.offsetLeft + lineCanvasRef.current.width / 2))/1.25 - center.x;
                            let deltaY = (mousePosition.y - (lineCanvasRef.current.offsetTop + lineCanvasRef.current.height / 2))/1.25 - center.y;
                            let deltaH = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));  
                            let opacity = Math.max(1 - deltaH/200, 0);
                            ref.strokeStyle = `rgba(255, 255, 255, ${opacity})`; 
                            ref.stroke();
                        }
                    }
                }       
            }   
        }
    }
    return (
        <section className="relative overflow-hidden h-full ">
            <canvas className="absolute -top-3/4 -left-3/4 w-full h-full origin-center" ref={lineCanvasRef}></canvas>
            <canvas className="absolute -top-3/4 -left-3/4 w-full h-full origin-center" ref={starCanvasRef}></canvas>
            <img src="/images/foreground.svg" alt="" className="object-fill absolute bottom-0 w-full h-1/1.5" />
        </section>
    )
}

export default Hero