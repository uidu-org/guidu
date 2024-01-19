import Button from '@uidu/button';
import Modal, { ModalBody } from '@uidu/modal-dialog';
import React, { useState } from 'react';
import ReactFocusLock from 'react-focus-lock';
import { localUploadOptions } from '../../media-core/src';
import MediaPicker from '../src';
import '../styles.scss';

export default function ModalExample() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Open modal</Button>
      {isModalOpen && (
        <Modal
          shouldCloseOnOverlayClick
          onClose={() => setIsModalOpen(false)}
          autoFocus
        >
          <ModalBody>
            <Button onClick={() => setIsOpen((prev) => !prev)}>
              Open media picker
            </Button>
          </ModalBody>
        </Modal>
      )}
      {isOpen && (
        <ReactFocusLock>
          <MediaPicker
            uploadOptions={localUploadOptions({
              endpoint: 'https://uidu.local:8443/upload',
            })}
            open={isOpen}
          />
        </ReactFocusLock>
      )}
    </>
  );
}
