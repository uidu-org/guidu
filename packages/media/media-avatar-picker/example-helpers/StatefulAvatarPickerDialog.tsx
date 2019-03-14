// tslint:disable:no-console

import * as React from 'react';
import styled from 'styled-components';
import Button from '@uidu/button';
import { ModalTransition } from '@atlaskit/modal-dialog';
import { Avatar, AvatarPickerDialog } from '../src';
import { AvatarPickerDialogProps } from '../src/avatar-picker-dialog/types';
import { generateAvatars } from '../example-helpers';

const avatars: Array<Avatar> = generateAvatars(30);

const Layout: React.ComponentClass<React.HTMLAttributes<{}>> = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 80vh;
`;

export interface State {
  isOpen: boolean;
  imagePreviewSource: string;
  isLoading: boolean;
}

export default class StatefulAvatarPickerDialog extends React.Component<
  Partial<AvatarPickerDialogProps>,
  State
> {
  timeoutId: number = 0;

  state = {
    isOpen: false,
    imagePreviewSource: '',
    isLoading: false,
  };

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  openPicker = () => {
    this.setState({ isOpen: true });
  };

  closePicker = () => {
    this.setState({ isOpen: false });
  };

  save = (dataURI: any) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        // Fake "uploading" call by adding a delay
        this.timeoutId = window.setTimeout(() => {
          this.setState({
            imagePreviewSource: dataURI,
            isOpen: false,
            isLoading: false,
          });
        }, 2000);
      },
    );
  };

  renderPicker() {
    const { isOpen, isLoading } = this.state;
    return (
      <ModalTransition>
        {isOpen && (
          <AvatarPickerDialog
            avatars={avatars}
            onAvatarPicked={selectedAvatar => {
              console.log('onAvatarPicked:', selectedAvatar);
              this.save(selectedAvatar.dataURI);
            }}
            onImagePicked={(selectedImage, crop) => {
              console.log('onImagePicked:', selectedImage, crop);
            }}
            onImagePickedDataURI={exportedImg => {
              console.log('onImagePickedDataURI: ', { dataURI: exportedImg });
              this.save(exportedImg);
            }}
            onCancel={this.closePicker}
            isLoading={isLoading}
            predefinedAvatarsText="Default icons"
            {...this.props}
          />
        )}
      </ModalTransition>
    );
  }

  render() {
    return (
      <Layout>
        <Button appearance="primary" onClick={this.openPicker}>
          Open sesame!
        </Button>
        {this.renderPicker()}
        <img src={this.state.imagePreviewSource} />
      </Layout>
    );
  }
}
