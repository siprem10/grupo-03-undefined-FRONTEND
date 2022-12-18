import React from 'react';
import EditProfile from '../Forms/UserForms/EditProfile/EditProfile';
import editProfileValidator from '../Forms/UserForms/EditProfile/editProfileValidator';
import Modal from '../Modal/Modal';

export default function ModalModifyProfile({ closeModal }) {
  return (
    <Modal closeModal={closeModal}>
      <EditProfile
        closeModal={closeModal}
        modify={true}
        {...editProfileValidator}
      />
    </Modal>
  );
}
