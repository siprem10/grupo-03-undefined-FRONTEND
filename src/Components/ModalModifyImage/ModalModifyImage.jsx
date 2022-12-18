import React from 'react';
import EditImage from '../Forms/UserForms/EditImage/EditImage';
import editProfileValidator from '../Forms/UserForms/EditImage/editImageValidator';
import Modal from '../Modal/Modal';

export default function ModalModifyImage({ closeModal }) {
  return (
    <Modal closeModal={closeModal}>
      <EditImage
        closeModal={closeModal}
        modify={true}
        {...editProfileValidator}
      />
    </Modal>
  );
}
