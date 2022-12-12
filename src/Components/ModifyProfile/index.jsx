import React from 'react';
import Modal from '../Modal';
import { UserForm, editUserFields } from '../Forms/UserForms';

function ModifyPerfil({ closeModal, closeModalWithoutConfirmation }) {
    return (
        <Modal closeModal={closeModal}>
            <button
                className='bg-red-500 text-white font-semibold p-1 rounded-full mb-10'
                onClick={closeModal}
            >
                X
            </button>
            <UserForm
                closeModalWithoutConfirmation={closeModalWithoutConfirmation}
                closeModal={closeModal}
                modify={true}
                {...editUserFields}
            />
        </Modal>
    );
}

export default ModifyPerfil;
