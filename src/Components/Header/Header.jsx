import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SessionDropdown from '../SessionDropdown/SessionDropdown';
import {BiHomeAlt} from "react-icons/bi";
import {TbHeartRateMonitor} from "react-icons/tb";

export default function Header() {

    const sections = [
        { name: "Inicio", to: "/", icon: <BiHomeAlt className="flex mr-2" /> },        
        { name: "Actividad", to: "/transactions", icon: <TbHeartRateMonitor className="flex mr-2" /> }
    ];

    const path = useLocation().pathname;

    return (
        <nav className='flex w-full h-20 px-10 items-center justify-between shadow-lg bg-white text-primary'>
            <h1 className='md:text-2xl px-4 font-bold text-xl tracking-wider'>Alkybank Wallet</h1>
            <ul className='flex gap-8'>
                {sections?.map((section, i) =>
                    <li key={i} className='flex-wrap md:text-xl inline-flex items-center justify-center text-base font-bold uppercase text-gray-500 hover:text-tertiary ease-out duration-300'>
                        {section.icon}
                        <Link to={section.to} className={path === section.to ? "text-emerald-900" : ""}>{section.name}</Link>
                    </li>
                )}
            </ul>
            <SessionDropdown />
        </nav>
    )
}
