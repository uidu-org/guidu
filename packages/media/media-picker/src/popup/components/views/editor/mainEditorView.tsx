import { EditorView } from '@uidu/media-editor';
import { deselectItem } from '../../../actions/deselectItem';
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { BinaryUploader } from '../../../../components/types';
import { State, EditorData, EditorError, FileReference } from '../../../domain';
import ErrorView from './errorView/errorView';
import { SpinnerView } from './spinnerView/spinnerView';
import { Selection, editorClose } from '../../../actions/editorClose';
import { editorShowError } from '../../../actions/editorShowError';
import { CenterView } from './styles';

export interface MainEditorViewStateProps {
  readonly editorData?: EditorData;
}

export interface MainEditorViewOwnProps {
  readonly binaryUploader: BinaryUploader;
}

export interface MainEditorViewDispatchProps {
  readonly onCloseEditor: (selection: Selection) => void;
  readonly onShowEditorError: (error: EditorError) => void;
  readonly onDeselectFile: (fileId: string) => void;
}

export type MainEditorViewProps = MainEditorViewStateProps &
  MainEditorViewOwnProps &
  MainEditorViewDispatchProps;

export class MainEditorView extends Component<MainEditorViewProps> {
  render(): JSX.Element | null {
    const { editorData } = this.props;
    if (editorData) {
      return this.renderContent(editorData);
    } else {
      return null;
    }
  }

  private renderContent = (editorData: EditorData): JSX.Element => {
    const { imageUrl, originalFile, error } = editorData;

    if (error) {
      return this.renderError(error);
    } else if (imageUrl && originalFile) {
      return (
        <CenterView>
          <EditorView
            imageUrl={imageUrl}
            onSave={this.onEditorSave(originalFile)}
            onCancel={this.onCancel}
            onError={this.onEditorError}
          />
        </CenterView>
      );
    } else {
      return <SpinnerView onCancel={this.onCancel} />;
    }
  };

  private renderError({ message, retryHandler }: EditorError): JSX.Element {
    return (
      <ErrorView
        message={message}
        onRetry={retryHandler}
        onCancel={this.onCancel}
      />
    );
  }

  private onEditorError = (
    message: string,
    retryHandler?: () => void,
  ): void => {
    this.props.onShowEditorError({ message, retryHandler });
  };

  private onEditorSave = (originalFile: FileReference) => (
    image: string,
  ): void => {
    const { binaryUploader, onDeselectFile, onCloseEditor } = this.props;

    binaryUploader.upload(image, originalFile.name);
    onDeselectFile(originalFile.id);
    onCloseEditor('Save');
  };

  private onCancel = (): void => {
    this.props.onCloseEditor('Close');
  };
}

export default connect<
  {},
  MainEditorViewDispatchProps,
  MainEditorViewOwnProps,
  State
>(
  ({ editorData }) => ({ editorData }),
  dispatch => ({
    onShowEditorError: ({ message, retryHandler }) =>
      dispatch(editorShowError(message, retryHandler)),
    onCloseEditor: (selection: Selection) => dispatch(editorClose(selection)),
    onDeselectFile: fileId => dispatch(deselectItem(fileId)),
  }),
)(MainEditorView);
