import React from 'react';
import { Modal, ModalGateway } from 'react-images';
import { ModalMediaViewerProps } from '../types';
import MediaViewer from './MediaViewer';

export default function ModalMediaViewer({
  currentIndex,
  onClose,
  files,
}: ModalMediaViewerProps) {
  return (
    <ModalGateway>
      {Number.isInteger(currentIndex as any) ? (
        <Modal
          isFullscreen
          closeOnBackdropClick
          onClose={onClose}
          styles={{
            blanket: (base: any) => ({
              ...base,
              // backgroundColor: colors.N90,
              zIndex: 3000,
            }),
            positioner: (base: any) => ({
              ...base,
              display: 'block',
              zIndex: 3000,
            }),
          }}
        >
          <MediaViewer
            files={files}
            currentIndex={currentIndex}
            onClose={onClose}
          />
        </Modal>
      ) : null}
    </ModalGateway>
  );
}
