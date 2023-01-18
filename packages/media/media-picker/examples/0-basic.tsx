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
            onClose={() => this.close()}
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
