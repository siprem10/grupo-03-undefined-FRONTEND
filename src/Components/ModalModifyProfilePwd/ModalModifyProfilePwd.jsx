import React from 'react';
import EditProfilePwd from '../Forms/UserForms/EditProfilePwd/EditProfilePwd';
import editProfilePwdValidator from '../Forms/UserForms/EditProfilePwd/editProfilePwdValidator';
import Modal from '../Modal/Modal';

export default function ModalModifyProfilePwd({ closeModal }) {
  return (
    <Modal closeModal={closeModal}>
      <EditProfilePwd
        closeModal={closeModal}
        modify={true}
        {...editProfilePwdValidator}
      />
    </Modal>
  );
}
