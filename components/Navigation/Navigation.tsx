'use client'
import React, { useState } from 'react'
import './Navigation.css';

const Navigation = () => {
    const [activeMenu, setActiveMenu] = useState(false);
    const hamburgerClick = () => {
        setActiveMenu(!activeMenu);
    }

    return (
        <section>
            <nav className="flex items-center text-white bg-dark-background h-12" aria-label="top-menu">
                <button className={`menu-button h-6 w-8 left-3 md:invisible absolute cursor-pointer z-3
                                flex flex-col justify-between ${activeMenu && "active"}`} onClick={hamburgerClick} >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>
            <nav className={`mobile-menu flex z-2 h-screen w-screen absolute top-0 left-0
                            md:invisible ${activeMenu && "active"}`} aria-label="mobile-menu">   
                <div className="text-white bg-darkish-background h-full w-60 shadow-lg shadow-white">

                </div>
                {
                    activeMenu && <div className="h-full grow opacity 0" ></div> 
                }          
            </nav>
        </section>
    )
}

export default Navigation