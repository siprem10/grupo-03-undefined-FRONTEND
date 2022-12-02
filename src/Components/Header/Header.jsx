import React from 'react';
import { Link } from 'react-router-dom';
import BaseButton from '../BaseButton/BaseButton';

export default function Header() {

    const sections = ['gastos', 'balance', 'movimientos'];

    return (
        <nav className='flex w-full h-20 px-10 items-center justify-between shadow-lg'>
            <div className='flex px-4'>
                <h1 className='font-bold text-xl tracking-wider'>Alkybank Wallet</h1>
            </div>
            <div>
                <ul className='flex gap-8'>
                    {sections?.map(section => {
                        return (
                            <Link to={`/${section}`}>
                                <li className='uppercase text-slate-900'>{section}</li>
                            </Link>
                        )
                    })}
                </ul>
            </div>
            <div className='flex gap-4'>
                <BaseButton text={`Cargar saldo`} color={`default`} />
                <BaseButton text={`Enviar dinero`} color={`default`} />
            </div>
        </nav>
    )
}
