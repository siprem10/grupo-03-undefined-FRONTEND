import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SessionDropdown from '../SessionDropdown/SessionDropdown';

export default function Header() {

    const sections = [
        { name: "Inicio", to: "/" },        
        { name: "Actividad", to: "/transactions" }
    ];

    const path = useLocation().pathname;

    return (
        <nav className='flex w-full h-20 px-10 items-center justify-between shadow-lg bg-white text-primary'>
            <h1 className='px-4 font-bold text-2xl tracking-wider'>Alkybank Wallet</h1>
            <ul className='flex gap-8'>
                {sections?.map((section, i) =>
                    <li key={i} className='text-2xl font-bold uppercase text-gray-500 hover:text-tertiary ease-out duration-300'>
                        <Link to={section.to} className={path === section.to ? "text-emerald-900" : ""}>{section.name}</Link>
                    </li>
                )}
            </ul>
            <SessionDropdown></SessionDropdown>
        </nav>
    )
}
