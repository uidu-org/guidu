import { colors } from '@uidu/theme';
import React, { PureComponent } from 'react';
import { Modal, ModalGateway } from 'react-images';
import { ModalMediaViewerProps } from '../types';
import MediaViewer from './MediaViewer';

export default class ModalMediaViewer extends PureComponent<
  ModalMediaViewerProps
> {
  render() {
    const { currentIndex, onClose } = this.props;
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
                backgroundColor: colors.N90,
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
              files={this.props.files}
              currentIndex={currentIndex}
              onClose={onClose}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    );
  }
}
