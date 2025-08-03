'use client';
import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';

import starsData from './star_data.json';
import lineData from './line_data.json';

const Hero = () => {
    const starCanvasRef = useRef<HTMLCanvasElement>(null);
    const starCanvasContextRef = useRef<CanvasRenderingContext2D>(null);
    const lineCanvasRef = useRef<HTMLCanvasElement>(null);
    const lineCanvasContextRef = useRef<CanvasRenderingContext2D>(null);
    const stars = new Map<string, Star>(Object.entries(starsData));
    const lines = new Map(Object.entries(lineData));
    let scale = 1.8;

    interface Star {
        x: number,
        y: number,
        b: number,
        color: string
    }

    interface Line {
        x1: number,
        y1: number,
        x2: number,
        y2: number
    }

    useEffect(() => {
        const starCanvas: HTMLCanvasElement | null = starCanvasRef.current;
        const lineCanvas: HTMLCanvasElement | null = lineCanvasRef.current;
        if (starCanvas && lineCanvas) {
            let width: number = starCanvas.getBoundingClientRect().width;
            let height: number = starCanvas.getBoundingClientRect().height;
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
    }, [])

    const drawStars = () => {
        if (starCanvasContextRef && starCanvasContextRef.current) {
            let distance = Math.max(window.innerWidth, window.innerHeight) / 1.75;
            let ref = starCanvasContextRef.current;
            ref.shadowBlur = 15; // adds glow to each star
            let circle_rad = 2*Math.PI;
            for (let [key, value] of stars) {
                ref.beginPath();
                console.log(scale);
                let brightness = Math.max(value.b, 0.4) * scale;
                ref.arc(value.x * distance, -(value.y * distance), brightness, 0, circle_rad);
                ref.fillStyle = value.color;
                ref.shadowColor = value.color;      
                ref.fill();
            }
        }
    }

    const drawLines = () => {
        for (let [key, value] of lines) {
            if (lineCanvasContextRef && lineCanvasContextRef.current) {
                let distance = Math.max(window.innerWidth, window.innerHeight) / 1.75;
                let ref = lineCanvasContextRef.current;
                ref.shadowBlur = 15; // adds glow to each line
                for (let line of value) {
                    ref.beginPath();
                    for (let i = 0; i < line.length; i++) {
                        let id = line[i];
                        if (line[i].endsWith('*')) {
                            id = line[i].slice(0, -1);
                        }
                        let last_x = 0;
                        let last_y = 0;
                        let star = stars.get(id);
                        if (i == 0) {
                            if (star) {
                                ref.moveTo(star.x * distance, star.y * distance);
                                last_x = star.x * distance;
                                last_y = star.y * distance;
                            }
                        } else {
                            if (star) {
                                ref.lineTo(star.x * distance, star.y * distance);
                                last_x = star.x * distance;
                                last_y = star.y * distance;
                            }
                        }
                        ref.strokeStyle = 'white';
                        ref.shadowColor = 'rgba(255, 255, 255, 0.5)';    
                        ref.lineWidth = 1 * scale;
                        ref.stroke();
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

// let temp = new Map();

// for (let [key, value] of names_map) {
//     for (let i = 0; i < value.n.length; i++) {
//         let split = value.n[i].split(' ');
//         if (split[0] == 'HIP') {
//             let id = split[1];
//             for (let [key2, value2] of radec_map) {
//                 if (key == key2) {
//                     let r = value2.r;
//                     let d = value2.d;
//                     let polaris_r = 0.6624320497812674;
//                     let polaris_d = 1.5579526054242891;
//                     let delta_r = r - polaris_r;
//                     if (delta_r > Math.PI) {
//                         delta_r -= 2 * Math.PI;
//                     }
//                     if (delta_r < -Math.PI) {
//                         delta_r += 2 * Math.PI;
//                     }
//                     let x = Math.cos(d) * Math.sin(delta_r);
//                     let y = Math.sin(d) * Math.cos(polaris_d) - Math.cos(d)* Math.sin(polaris_d) * Math.cos(delta_r);
                    
//                     let brightness = Math.log(1+value2.N / (4 * Math.PI * Math.pow(value2.p, 2)) * 750);
//                     if (id == '11767') {
//                         brightness *= 2;
//                     }
//                     let fillStyle = '';
//                     if (value2.K) {
//                         fillStyle = `rgb(${value2.K.r*255} ${value2.K.g*255} ${value2.K.b*255})`;              
//                     } else {
//                         fillStyle = 'rgb(255, 255, 255)';  
//                     }
                    
//                     let obj = {
//                         x: x,
//                         y: y,
//                         b: brightness,
//                         color: fillStyle
//                     };
//                     if (!stars.has(id)) {
//                         stars.set(id, obj);
//                     }


//                 }
//             }
//         }
//     }
// }



    //                             const a = document.createElement('a');
    // a.href = URL.createObjectURL(new Blob([JSON.stringify(Object.fromEntries(stars), null, 2)], {
    //     type: "application/json"
    // }));
    // a.setAttribute("download", "data.txt");
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);