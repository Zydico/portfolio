"use client";
import './Navigation.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
    { href: '/MaplestoryHelper/Roster', label: 'Roster'}, 
    { href: '/MaplestoryHelper/Tasks', label: 'Tasks'}, 
    { href: '/MaplestoryHelper/Bossing', label: 'Bossing'}, 
    { href: '/MaplestoryHelper/MysticFrontier', label: 'Mystic Frontier'}, 
    { href: '/MaplestoryHelper/Schedule', label: 'Schedule'}, 
    { href: '/MaplestoryHelper/Resources', label: 'Resources'}, 
    { href: '/MaplestoryHelper/Contact', label: 'Contact Me'}
];

const Navigation = () => {
    const pathName = usePathname();
    return (
        <nav className='z-10 px-1 pt-1.5 text-[9pt] fixed left-0 top-0 w-26 flex text-white h-full' aria-label='navbar-menu'>
            <ul id='nav-list' className='flex flex-col gap-1.5 w-full'>
                {links.map((link) => (
                    <Link draggable={false} href={link.href} key={link.href}><li className={`rounded-md px-2 py-1 transition duration-150 select-none ${pathName == link.href ? "active" : null}`}>{link.label}</li></Link>
                ))}
            </ul>
        </nav>
    )
}

export default Navigation