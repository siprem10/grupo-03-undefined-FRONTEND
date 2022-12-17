import React from 'react';
import css from './Modal.module.css';

function Modal({ children, closeModal }) {
    const handleModalContainerClick = e => e.stopPropagation();

    return (
        <article onClick={closeModal} className={css.modal}>
            <div className={"p-6 w-[90%] xs:w-[400px] bg-white rounded-lg fadeInDown"} onClick={handleModalContainerClick}>
                <div className='flex justify-end'>
                    <button
                        className="absolute bg-red-500 w-8 text-white font-semibold p-1 rounded-full"
                        onClick={closeModal}>
                        X
                    </button>
                </div>
                {children}
            </div>
        </article>
    );
}

export default Modal;
