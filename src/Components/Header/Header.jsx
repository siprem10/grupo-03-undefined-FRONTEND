import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import SessionDropdown from '../SessionDropdown/SessionDropdown';
import { BiHomeAlt } from 'react-icons/bi';
import { TbHeartRateMonitor } from 'react-icons/tb';

export default function Header() {
  const isLowRes = useMediaQuery({ maxWidth: 900 });
  const isVeryLowRes = useMediaQuery({ maxWidth: 400 });
  const path = useLocation().pathname;

  const sections = [
    { name: 'Inicio', to: '/', icon: BiHomeAlt },
    { name: 'Actividad', to: '/transactions', icon: TbHeartRateMonitor }
  ];

  return (
    <nav
      className={`p-4 flex flex-wrap w-full h-auto px-10 items-center shadow-lg bg-white text-primary ${
        isVeryLowRes ? 'justify-center' : 'justify-between'
      }`}>
      <h1 className="flex justify-center py-2 px-4 rounded-full border-2 bg-main border-emerald-900 md:text-2xl font-bold text-md tracking-wider ease-out duration-300">
        {isLowRes ? 'AW' : 'AlkyBank Wallet'}
      </h1>
      <ul className="flex flex-wrap self-center">
        {sections?.map((section, i) => (
          <li
            key={i}
            className="p-3.5 flex md:text-xl items-center justify-center text-base font-bold uppercase text-gray-500 hover:text-tertiary ease-out duration-300">
            {!isLowRes && <section.icon className="flex mr-2 md:w-6 w-5 h-auto"></section.icon>}
            <Link
              to={section.to}
              className={path === section.to ? 'text-emerald-900 hover:text-tertiary' : ''}>
              {section.name}
            </Link>
          </li>
        ))}
      </ul>

      <SessionDropdown />
    </nav>
  );
}
