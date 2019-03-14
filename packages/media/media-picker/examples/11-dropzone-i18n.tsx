/* tslint:disable:no-console */
import * as React from 'react';
import { Component, RefObject } from 'react';
import {
  createUploadContext,
  defaultMediaPickerCollectionName,
  I18NWrapper,
} from '@uidu/media-test-helpers';
import { MediaPicker } from '../src';
import {
  DropzoneContainer,
  PopupContainer,
  DropzoneContentWrapper,
} from '../example-helpers/styled';
import { intlShape } from 'react-intl';

export interface DropzoneWrapperState {
  isActive: boolean;
}

class DropzoneWrapper extends Component<{}, DropzoneWrapperState> {
  dropzoneRef: RefObject<HTMLDivElement>;

  static contextTypes = {
    intl: intlShape,
  };

  state: DropzoneWrapperState = {
    isActive: true,
  };

  constructor(props: {}) {
    super(props);

    this.dropzoneRef = React.createRef();
  }

  UNSAFE_componentWillReceiveProps(_: any, nextContext: any) {
    if (this.context.intl !== nextContext.intl) {
      this.createMediaPicker(nextContext);
    }
  }

  async createMediaPicker(reactContext: any) {
    if (!this.dropzoneRef.current) {
      return;
    }

    const context = createUploadContext();
    const dropzone = await MediaPicker('dropzone', context, {
      container: this.dropzoneRef.current,
      uploadParams: {
        collection: defaultMediaPickerCollectionName,
      },
      proxyReactContext: reactContext,
    });

    dropzone.activate();
  }

  componentDidMount = async () => {
    await this.createMediaPicker(this.context);
  };

  render() {
    const { isActive } = this.state;

    return (
      <PopupContainer>
        <DropzoneContentWrapper>
          <DropzoneContainer isActive={isActive} ref={this.dropzoneRef} />
        </DropzoneContentWrapper>
      </PopupContainer>
    );
  }
}

export default () => (
  <I18NWrapper>
    <DropzoneWrapper />
  </I18NWrapper>
);
