import React, { RefObject, useEffect, useState } from 'react';
import './Navigation.css';

const Navigation = (props: { navBarRef: RefObject<HTMLElement | null>, homeRef: RefObject<HTMLElement | null>, aboutRef: RefObject<HTMLElement | null> }) => {
    const [currentPage, setCurrentPage] = useState('Home');

    const navTo = (destination: string) => {
        if (props.homeRef.current && props.aboutRef.current) {
            switch(destination) {
                case 'Home':
                    props.homeRef.current.scrollIntoView();
                    break;
                case 'About':
                    props.aboutRef.current.scrollIntoView();
                    break;
                case 'Projects':
                    // props.homeRef.current.scrollIntoView();
                    break;
                case 'Contact':
                    // props.homeRef.current.scrollIntoView();
                    break;
            }
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            if (props.homeRef.current && props.aboutRef.current) {
                if (window.scrollY < props.aboutRef.current.offsetTop/2) {
                    setCurrentPage('Home');
                } else if (window.scrollY >= props.aboutRef.current.offsetTop/2) {
                    setCurrentPage('About');
                }
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    return (
        <nav ref={props.navBarRef} className="font-(family-name:--font-menu) fixed left-0 top-0 w-full flex items-center justify-center md:justify-end md:pr-30 text-white h-(--nav-height) font-[600]" aria-label="top-menu">
            <ul className="flex gap-7 text-xl">
                <li className={currentPage == 'Home' ? 'activeMenuItem' : ''}><button onClick={() => navTo('Home')}>Home</button></li>
                <li className={currentPage == 'About' ? 'activeMenuItem' : ''}><button onClick={() => navTo('About')}>About</button></li>
                <li className={currentPage == 'Projects' ? 'activeMenuItem' : ''}><button onClick={() => navTo('Projects')}>Projects</button></li>
                <li className={currentPage == 'Contact' ? 'activeMenuItem' : ''}><button onClick={() => navTo('Contact')}>Contact</button></li>
            </ul>
        </nav>
    )
}

export default Navigation