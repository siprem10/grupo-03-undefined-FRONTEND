import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import SessionDropdown from '../SessionDropdown/SessionDropdown';
import { BiHomeAlt } from 'react-icons/bi';
import { TbHeartRateMonitor } from 'react-icons/tb';
import { useSelector } from 'react-redux';

export default function Header() {
  const isLowRes = useMediaQuery({ maxWidth: 900 });
  const path = useLocation().pathname;

  const { status } = useSelector(state => state.auth);

  const sections = [
    { name: 'Inicio', to: '/home', icon: BiHomeAlt },
    { name: 'Actividad', to: '/transactions', icon: TbHeartRateMonitor }
  ];

  return (
    <nav
      className={`${status !== "success" && "py-4"} py-1 px-4 xs:py-4 xs:px-10 flex xs:flex-row w-full h-auto items-center shadow-lg bg-white text-primary justify-between`}>
      <Link to={"/"}>
        <h1 className="flex justify-center py-2 px-4 rounded-full border-2 bg-main border-emerald-900 md:text-2xl font-bold text-md anim">
          {isLowRes ? 'AW' : 'AlkyBank Wallet'}
        </h1>
      </Link>
      {status === "success" &&
        <ul className="flex">
          {sections?.map((section, i) => 
            <li key={i}>
              <Link
                to={section.to}
                className={`${path === section.to ? 'text-emerald-900' : 'text-gray-500'} flex flex-col xs:flex-row p-3.5 flex md:text-xl items-center justify-center text-base font-bold uppercase hover:text-tertiary anim`}>
                {<section.icon className="flex mx-2 w-6 xs:w-6 h-auto"></section.icon>}
                {<p className='hiddena xs:flexa'>{section.name}</p>}
              </Link>
            </li>
          )}
        </ul>
      }
      <SessionDropdown />
    </nav>
  );
}
