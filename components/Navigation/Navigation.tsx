import React, { RefObject, useEffect, useState } from 'react';
import './Navigation.css';

const Navigation = (props: { navBarRef: RefObject<HTMLElement | null>, homeRef: RefObject<HTMLElement | null>, aboutRef: RefObject<HTMLElement | null>,
                             projectsRef: RefObject<HTMLElement | null> }) => {
    const [currentPage, setCurrentPage] = useState('Home');

    const navTo = (destination: string) => {
        if (props.navBarRef.current && props.homeRef.current && props.aboutRef.current && props.projectsRef.current) {
            switch(destination) {
                case 'Home':
                    window.scrollTo({top: props.homeRef.current.offsetTop - props.navBarRef.current.offsetHeight});
                    break;
                case 'About':
                    window.scrollTo({top: props.aboutRef.current.offsetTop - props.navBarRef.current.offsetHeight});
                    break;
                case 'Projects':
                    window.scrollTo({top: props.projectsRef.current.offsetTop + 40});
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
                } else if (window.scrollY >= props.aboutRef.current.offsetTop/2 && window.scrollY < props.aboutRef.current.offsetTop + props.aboutRef.current.offsetHeight/2) {
                    setCurrentPage('About');
                } else if (window.scrollY >= props.aboutRef.current.offsetTop + props.aboutRef.current.offsetHeight/2) {
                    setCurrentPage('Projects');
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