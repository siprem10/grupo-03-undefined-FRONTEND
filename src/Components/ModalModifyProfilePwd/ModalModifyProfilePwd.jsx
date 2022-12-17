import React from 'react';
import EditProfilePwd from '../Forms/UserForms/Pwd/EditProfilePwd';
import editProfilePwdValidator from '../Forms/UserForms/Pwd/editProfilePwdValidator';
import Modal from '../Modal';

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
