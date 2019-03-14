import * as React from 'react';
import Button from '@uidu/button';
import { Card } from '@uidu/media-card';
import {
  imageFileId,
  createUploadContext,
  I18NWrapper,
} from '@uidu/media-test-helpers';
import { FileIdentifier } from '@uidu/media-core';
import { SmartMediaEditor } from '../src';

interface State {
  showEditorVersion?: 'with-i18n' | 'without-i18n';
  showWithError: boolean;
  newFileIdentifier?: FileIdentifier;
}

const context = createUploadContext();

class SmartMediaEditorExample extends React.Component<{}, State> {
  state: State = {
    showWithError: false,
  };

  openSmartEditor = (editorVersion: State['showEditorVersion']) => () => {
    this.setState({ showEditorVersion: editorVersion, showWithError: false });
  };

  openSmartEditorWithError = (
    editorVersion: State['showEditorVersion'],
  ) => () => {
    this.setState({ showEditorVersion: editorVersion, showWithError: true });
  };

  onFinish = () => {
    this.setState({ showEditorVersion: undefined });
  };

  onUploadStart = (identifier: FileIdentifier) => {
    this.setState({
      newFileIdentifier: identifier,
      showEditorVersion: undefined,
    });
  };

  private renderContent = (editorVersion: State['showEditorVersion']) => {
    const { showWithError, showEditorVersion } = this.state;

    const renderEditor = () => (
      <SmartMediaEditor
        identifier={{
          ...imageFileId,
          id: showWithError ? '🥳' : imageFileId.id,
        }}
        context={context}
        onFinish={this.onFinish}
        onUploadStart={this.onUploadStart}
      />
    );

    return (
      <div>
        <div>
          <Button onClick={this.openSmartEditor(editorVersion)}>
            Open Smart Editor
          </Button>
          <Button onClick={this.openSmartEditorWithError(editorVersion)}>
            Open Smart Editor (with an error)
          </Button>
        </div>

        {editorVersion && showEditorVersion === editorVersion
          ? renderEditor()
          : null}
      </div>
    );
  };

  render() {
    const { newFileIdentifier } = this.state;
    return (
      <div>
        <h3>With i18n</h3>
        <I18NWrapper>{this.renderContent('with-i18n')}</I18NWrapper>

        <h3>Without i18n</h3>
        {this.renderContent('without-i18n')}

        {newFileIdentifier ? (
          <Card identifier={newFileIdentifier} context={context} />
        ) : null}
      </div>
    );
  }
}

export default () => <SmartMediaEditorExample />;
