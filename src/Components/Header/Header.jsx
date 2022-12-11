import React from 'react';
import { Link } from 'react-router-dom';
import BaseButton from '../BaseButton/BaseButton';

export default function Header() {

    const sections = ['transacciones', 'categorías'];

    return (
        <nav className='flex w-full h-20 px-10 items-center justify-between shadow-lg bg-white text-primary'>
            <h1 className='px-4 font-bold text-2xl tracking-wider'>Alkybank Wallet</h1>
            <ul className='flex gap-8'>
                {sections?.map(section => {
                    return (
                        <Link to={`/${section}`}>
                            <li className='font-semibold uppercase text-slate-900 hover:text-tertiary ease-out duration-300'>{section}</li>
                        </Link>
                    )
                })}
            </ul>
            <div className='flex gap-4'>
                {/* <BaseButton text={`Cargar saldo`} /> */}
                <button className='secondaryButton'>Enviar dinero</button>
                <BaseButton text={`Cargar saldo`} />
            </div>
        </nav>
    )
}
