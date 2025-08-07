import React, { RefObject } from 'react';
import './Navigation.css';

const Navigation = (props: { navBarRef: RefObject<HTMLElement | null> }) => {
    return (
        <nav ref={props.navBarRef} className="font-(family-name:--font-menu) fixed left-0 top-0 w-full flex items-center justify-center md:justify-end md:pr-30 text-white h-(--nav-height) font-[600]" aria-label="top-menu">
            <ul className="flex gap-7 text-xl">
                <li>Home</li>
                <li>About</li>
                <li>Projects</li>
                <li>Contact</li>
            </ul>
        </nav>
    )
}

export default Navigation