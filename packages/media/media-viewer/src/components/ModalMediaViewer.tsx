import { colors } from '@uidu/theme';
import React, { PureComponent } from 'react';
import { Modal, ModalGateway } from 'react-images';
import MediaViewer from './MediaViewer';

export default class ModalMediaViewer extends PureComponent<any> {
  render() {
    const { currentIndex, onClose } = this.props;
    return (
      <ModalGateway>
        {Number.isInteger(currentIndex as any) ? (
          <Modal
            isFullscreen
            closeOnBackdropClick={false}
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
              views={this.props.views}
              currentIndex={currentIndex}
              onClose={onClose}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    );
  }
}
