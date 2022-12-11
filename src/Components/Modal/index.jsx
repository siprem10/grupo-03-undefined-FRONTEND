import React from 'react';
import css from './Modal.module.css';

function Modal({ children, closeModal, className }) {
    const handleModalContainerClick = e => e.stopPropagation();

    return (
        <article onClick={closeModal} className={css.modal}>
            <div
                className={`${css.container} ${className}`}
                onClick={handleModalContainerClick}
            >
                {children}
            </div>
        </article>
    );
}

export default Modal;
