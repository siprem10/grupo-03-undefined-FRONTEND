import React from 'react';
import EditProfilePwd from '../Forms/UserForms/Pwd/EditProfilePwd';
import editProfilePwdValidator from '../Forms/UserForms/Pwd/editProfilePwdValidator';
import Modal from '../Modal';

export default function ModalModifyProfilePwd({ closeModal }) {
  return (
    <Modal closeModal={closeModal}>
      <button
        className="bg-red-500 w-8 absolute right-6 text-white font-semibold p-1 rounded-full mb-10"
        onClick={closeModal}>
        X
      </button>
      <EditProfilePwd
        closeModal={closeModal}
        modify={true}
        {...editProfilePwdValidator}
      />
    </Modal>
  );
}
