'use client';
import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';

import starsData from './star_data.json';

const Hero = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasContextRef = useRef<CanvasRenderingContext2D>(null);
    const [stars, setStars] = useState<Map<string, Star>>(new Map<>());

    interface Star {
        r: number,
        d: number,
        N: number,
        K: {
            r: number,
            g: number,
            b: number,
        },
        h: string,
        p: number,
    }

    useEffect(() => {
        for (let i = 0; i < starsData.length; i++) {
            stars.set(starsData[i].h, {
                r: starsData[i].r,
                d: starsData[i].d,
                N: starsData[i].N,
                K: starsData[i].K,
                h: starsData[i].h,
                p: starsData[i].p,
            });
        }
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
                draw();
            }
        }
        
    }, [])

    const draw = () => {
        if (canvasContextRef && canvasContextRef.current) {
            let ref = canvasContextRef.current;
            let circle_rad = 2*Math.PI;
            let polaris_r = 0.6624320497812674;
            let polaris_d = 1.5579526054242891;
            ref.shadowBlur = 15;

            for (let [key, value] of stars) {
                let r = value.r;
                let d = value.d;
                let delta_r = r - polaris_r;
                if (delta_r > Math.PI) {
                    delta_r -= 2 * Math.PI;
                }
                if (delta_r < -Math.PI) {
                    delta_r += 2 * Math.PI;
                }
                let x = Math.cos(d) * Math.sin(delta_r);
                let y = Math.sin(d) * Math.cos(polaris_d) - Math.cos(d)* Math.sin(polaris_d) * Math.cos(delta_r);
                ref.beginPath();
                let distance = Math.max(window.innerWidth, window.innerHeight) / 1.5;
                let canvas_x = x * distance;
                let canvas_y = y * distance;
                let brightness = Math.log(1+value.N / (4 * Math.PI * Math.pow(value.p, 2)) * 750);
                if (value.h == '11767') {
                    brightness *= 2;
                }
                ref.arc(canvas_x, -canvas_y, brightness, 0, circle_rad);
                if (value.K) {
                    ref.fillStyle = `rgb(${value.K.r*255} ${value.K.g*255} ${value.K.b*255})`;    
                    ref.shadowColor = ref.fillStyle;                  
                }
                ref.fill();  
            }
        }
    }

    return (
        <section className="relative">
            <canvas className="w-full h-full origin-center" ref={canvasRef}>

            </canvas>
            <img src="/images/foreground.svg" alt="" className="object-fill absolute bottom-0 w-full h-1/1.5" />
        </section>
    )
}

export default Hero

// Saving to JSON file
    // const a = document.createElement('a');
    // a.href = URL.createObjectURL(new Blob([JSON.stringify(array, null, 2)], {
    //     type: "application/json"
    // }));
    // a.setAttribute("download", "data.txt");
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);