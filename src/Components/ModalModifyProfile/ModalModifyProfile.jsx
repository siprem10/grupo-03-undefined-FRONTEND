import React from 'react';
import EditProfile from '../Forms/UserForms/Profile/EditProfile';
import editProfileValidator from '../Forms/UserForms/Profile/editProfileValidator';
import Modal from '../Modal';

export default function ModalModifyProfile({ closeModal }) {
  return (
    <Modal closeModal={closeModal}>
      <button
        className="bg-red-500 w-8 absolute right-6 text-white font-semibold p-1 rounded-full mb-10"
        onClick={closeModal}>
        X
      </button>
      <EditProfile
        closeModal={closeModal}
        modify={true}
        {...editProfileValidator}
      />
    </Modal>
  );
}
