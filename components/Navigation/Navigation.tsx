'use client';
import React, { useState } from 'react';
import './Navigation.css';

const Navigation = () => {
    const [activeMenu, setActiveMenu] = useState<boolean>(false);
    const hamburgerClick = () => {
        setActiveMenu(!activeMenu);
    }

    return (
        <nav className="fixed left-0 top-0 w-full flex items-center justify-center md:justify-end md:pr-30 text-white h-(--nav-height) font-[600]" aria-label="top-menu">
            <ul className="flex gap-6 text-xl pb-1">
                <li>Home</li>
                <li>About</li>
                <li>Projects</li>
                <li>Contact</li>
            </ul>
        </nav>
    )
}

export default Navigation