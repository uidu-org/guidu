/* tslint:disable:no-console */
import * as React from 'react';
import { Component } from 'react';
import {
  mediaPickerAuthProvider,
  defaultMediaPickerCollectionName,
} from '@uidu/media-test-helpers';
import Button from '@uidu/button';
import { MediaPicker, Browser, BrowserConfig } from '../src';
import {
  PreviewsWrapper,
  PopupHeader,
  PopupContainer,
  PreviewsTitle,
} from '../example-helpers/styled';
import { UploadPreview } from '../example-helpers/upload-preview';
import { ContextFactory } from '@uidu/media-core';

export interface BrowserWrapperState {
  previewsData: any[];
}

class BrowserWrapper extends Component<{}, BrowserWrapperState> {
  browserComponents: Browser[] = [];
  dropzoneContainer?: HTMLDivElement;

  constructor() {
    super({});
    this.state = {
      previewsData: [],
    };
  }

  async componentDidMount() {
    this.browserComponents = (Array(5) as any).fill().map(this.createBrowse);
  }

  createBrowse = async () => {
    const context = ContextFactory.create({
      authProvider: mediaPickerAuthProvider(),
    });

    const browseConfig: BrowserConfig = {
      multiple: true,
      fileExtensions: ['image/jpeg', 'image/png'],
      uploadParams: {
        collection: defaultMediaPickerCollectionName,
      },
    };
    const fileBrowser = await MediaPicker('browser', context, browseConfig);

    fileBrowser.on('upload-preview-update', data => {
      this.setState({ previewsData: [...this.state.previewsData, data] });
    });

    return fileBrowser;
  };

  onOpen = (fileBrowser: Browser) => () => {
    fileBrowser.browse();
  };

  private renderPreviews = () => {
    const { previewsData } = this.state;

    return previewsData.map((previewsData, index) => (
      <UploadPreview key={`${index}`} fileId={previewsData.fileId} />
    ));
  };

  render() {
    const buttons = this.browserComponents.map((browser, key) => {
      return (
        <Button key={key} appearance="primary" onClick={this.onOpen(browser)}>
          Open
        </Button>
      );
    });

    return (
      <PopupContainer>
        <PopupHeader>{buttons}</PopupHeader>
        <PreviewsWrapper>
          <PreviewsTitle>Upload previews</PreviewsTitle>
          {this.renderPreviews()}
        </PreviewsWrapper>
      </PopupContainer>
    );
  }
}

export default () => <BrowserWrapper />;
