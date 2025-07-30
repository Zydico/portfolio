'use client';
import React, { useEffect, useRef } from 'react';
import './Hero.css';

import stars from './star_data.json';

const Hero = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasContextRef = useRef<CanvasRenderingContext2D>(null);

    useEffect(() => {
        const canvas: HTMLCanvasElement | null = canvasRef.current;
        if (canvas) {
            canvas.width = window.innerWidth*2;
            canvas.height = window.innerHeight*2;
            const canvasContext: CanvasRenderingContext2D | null = canvas.getContext('2d');
            if (canvasContext) {
                canvasContext.scale(2,2);
                canvasContext.translate(canvas.width/4, canvas.height/4);
            }
            canvasContextRef.current = canvasContext;
            if (canvasContextRef.current && canvasContextRef.current) {
                // starCanvasContextRef.current.rotate(120 * Math.PI / 180);
                // starCanvasContextRef.current.arc(0, 0, 40, 0, 2 * Math.PI);
                // starCanvasContextRef.current.fillStyle = 'red';
                // starCanvasContextRef.current.fill();
            }
        }
        
    }, [])

    const draw = () => {
        if (canvasContextRef && canvasContextRef.current) {
            let ref = canvasContextRef.current;
            ref.save();
            ref.restore();
            
        }
    }

    return (
        <section className="relative">
            <canvas className="w-full h-full origin-center" ref={canvasRef}>

            </canvas>
            <img src="/images/foreground.svg" alt="" className="object-fill absolute bottom-0 w-full h-1/1.75" />
        </section>
    )
}

export default Hero