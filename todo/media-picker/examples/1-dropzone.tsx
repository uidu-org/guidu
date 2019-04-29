/* tslint:disable:no-console */
import * as React from 'react';
import { Component } from 'react';
import {
  userAuthProvider,
  createUploadContext,
  mediaPickerAuthProvider,
  defaultMediaPickerCollectionName,
} from '@uidu/media-test-helpers';
import Button from '@uidu/button';
import Toggle from '@uidu/toggle';
import Spinner from '@uidu/spinner';
import { ContextFactory } from '@uidu/media-core';
import { MediaPicker, Dropzone } from '../src';
import {
  DropzoneContainer,
  PopupHeader,
  PopupContainer,
  DropzoneContentWrapper,
  DropzoneItemsInfo,
} from '../example-helpers/styled';
import { UploadPreviews } from '../example-helpers/upload-previews';

export interface DropzoneWrapperState {
  isConnectedToUsersCollection: boolean;
  isActive: boolean;
  isFetchingLastItems: boolean;
  lastItems: any[];
  inflightUploads: string[];
  dropzone?: Dropzone;
}
const context = createUploadContext();
const nonUserContext = ContextFactory.create({
  authProvider: mediaPickerAuthProvider('asap'),
});

class DropzoneWrapper extends Component<{}, DropzoneWrapperState> {
  dropzoneContainer?: HTMLDivElement;

  state: DropzoneWrapperState = {
    isConnectedToUsersCollection: true,
    isActive: true,
    isFetchingLastItems: true,
    lastItems: [],
    inflightUploads: [],
  };

  // TODO: Move into example-helpers
  fetchLastItems() {
    this.setState({ isFetchingLastItems: true });

    userAuthProvider()
      .then(({ clientId, token, baseUrl }) => {
        const queryParams = `client=${clientId}&token=${token}&limit=5&details=full&sortDirection=desc`;
        return fetch(`${baseUrl}/collection/recents/items?${queryParams}`);
      })
      .then(r => r.json())
      .then(data => {
        const lastItems = data.data.contents;
        this.setState({
          lastItems,
          isFetchingLastItems: false,
        });
      });
  }

  async createDropzone() {
    const { isConnectedToUsersCollection } = this.state;
    const dropzoneContext = isConnectedToUsersCollection
      ? context
      : nonUserContext;

    if (this.state.dropzone) {
      this.state.dropzone.deactivate();
    }
    const dropzone = await MediaPicker('dropzone', dropzoneContext, {
      container: this.dropzoneContainer,
      uploadParams: {
        collection: defaultMediaPickerCollectionName,
      },
    });

    dropzone.activate();

    this.setState({
      dropzone,
    });
  }

  saveDropzoneContainer = async (element: HTMLDivElement) => {
    this.dropzoneContainer = element;

    await this.createDropzone();
    this.fetchLastItems();
  };

  onConnectionChange = () => {
    const isConnectedToUsersCollection = !this.state
      .isConnectedToUsersCollection;
    this.setState({ isConnectedToUsersCollection }, () => {
      this.createDropzone();
    });
  };

  onActiveChange = () => {
    const { dropzone, isActive } = this.state;
    this.setState({ isActive: !isActive }, () => {
      if (dropzone) {
        if (isActive) {
          dropzone.activate();
        } else {
          dropzone.deactivate();
        }
      }
    });
  };

  onCancel = () => {
    this.setState({ inflightUploads: [] });
  };

  renderLastItems = () => {
    const { isFetchingLastItems, lastItems } = this.state;

    if (isFetchingLastItems) {
      return <Spinner size="large" />;
    }

    return lastItems.map((item, key) => {
      const { id, details } = item;

      // details are not always present in the response
      const name = details ? details.name : '<no-details>';
      const mediaType = details ? details.mediaType : '<no-details>';

      return (
        <div key={key}>
          {id} | {name} |{mediaType}
        </div>
      );
    });
  };

  onFetchLastItems = () => {
    this.fetchLastItems();
  };

  render() {
    const {
      isConnectedToUsersCollection,
      isActive,
      inflightUploads,
      dropzone,
    } = this.state;
    const isCancelButtonDisabled = inflightUploads.length === 0;

    return (
      <PopupContainer>
        <PopupHeader>
          <Button appearance="primary" onClick={this.onFetchLastItems}>
            Fetch last items
          </Button>
          <Button
            appearance="danger"
            onClick={this.onCancel}
            isDisabled={isCancelButtonDisabled}
          >
            Cancel uploads
          </Button>
          Connected to users collection
          <Toggle
            isDefaultChecked={isConnectedToUsersCollection}
            onChange={this.onConnectionChange}
          />
          Active
          <Toggle isDefaultChecked={isActive} onChange={this.onActiveChange} />
        </PopupHeader>
        <DropzoneContentWrapper>
          <DropzoneContainer
            isActive={isActive}
            ref={this.saveDropzoneContainer}
          />
          <DropzoneItemsInfo>
            {dropzone ? <UploadPreviews picker={dropzone} /> : null}
            <h1>User collection items</h1>
            {this.renderLastItems()}
          </DropzoneItemsInfo>
        </DropzoneContentWrapper>
      </PopupContainer>
    );
  }
}

export default () => <DropzoneWrapper />;
