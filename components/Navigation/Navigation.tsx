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
            <nav className="flex items-center justify-center md:justify-end md:pr-30 text-white h-12 md:h-14" aria-label="top-menu">
                <ul className="flex gap-6 text-xl pb-1">
                    <li id="test">Home</li>
                    <li>About</li>
                    <li>Projects</li>
                    <li>Contact</li>
                </ul>
            </nav>
        </section>
    )
}

export default Navigation