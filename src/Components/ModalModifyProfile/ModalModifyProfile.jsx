import React from 'react';
import EditProfile from '../Forms/UserForms/Profile/EditProfile';
import editProfileValidator from '../Forms/UserForms/Profile/editProfileValidator';
import Modal from '../Modal';

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
