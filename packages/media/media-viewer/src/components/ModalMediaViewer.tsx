import Modal, { ModalBody, ModalTransition } from '@uidu/modal-dialog';
import React from 'react';
import { ModalMediaViewerProps } from '../types';
import MediaViewer from './MediaViewer';

export default function ModalMediaViewer({
  currentIndex,
  onClose,
  files,
}: ModalMediaViewerProps) {
  return (
    <ModalTransition>
      {Number.isInteger(currentIndex as any) ? (
        <Modal
          onClose={onClose}
          width="calc(100vw - 1rem)"
          height="calc(100vh - 1rem)"
          tw="[--modal-dialog-gutter:1rem] [--modal-dialog-translate-y:0]"
          // styles={{
          //   blanket: (base: any) => ({
          //     ...base,
          //     // backgroundColor: colors.N90,
          //     zIndex: 3000,
          //   }),
          //   positioner: (base: any) => ({
          //     ...base,
          //     display: 'block',
          //     zIndex: 3000,
          //   }),
          // }}
        >
          <ModalBody tw="p-0">
            <MediaViewer
              files={files}
              currentIndex={currentIndex}
              onClose={onClose}
              allowFullscreen
              closeOnBackdropClick
            />
          </ModalBody>
        </Modal>
      ) : null}
    </ModalTransition>
  );
}
