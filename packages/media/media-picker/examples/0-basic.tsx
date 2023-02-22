import Button from '@uidu/button';
import * as React from 'react';
import { Component } from 'react';
import { localUploadOptions } from '../../media-core/src';
import MediaPicker from '../src';
import '../styles.scss';

export default class Example extends Component {
  state = { isOpen: false };

  open = () => this.setState({ isOpen: true });
  close = () => this.setState({ isOpen: false });

  render() {
    const { isOpen } = this.state;
    return (
      <div>
        <Button onClick={this.open}>Open Modal</Button>

        {isOpen && (
          <MediaPicker
            open={isOpen}
            options={{
              onBeforeUpload: (files) => {
                const updatedFiles = {};
                Object.keys(files).forEach((fileID) => {
                  updatedFiles[fileID] = {
                    ...files[fileID],
                    meta: { ...files[fileID].meta, storage: 'public_store' },
                  };
                });
                return updatedFiles;
              },
            }}
            onClose={() => this.close()}
            onComplete={console.log}
            onFileAdded={console.log}
            onRequestClose={this.close}
            uploadOptions={localUploadOptions({
              endpoint: 'https://uidu.local:8443/upload',
            })}
          />
        )}
      </div>
    );
  }
}
