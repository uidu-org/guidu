import { Dimensions, SmartMediaEditor } from '@atlaskit/media-editor';
import { EditorView } from 'prosemirror-view';
import * as React from 'react';
import { closeMediaEditor, uploadAnnotation } from '../commands/media-editor';
import { MediaEditorState } from '../types';

type Props = {
  mediaEditorState: MediaEditorState;
  view: EditorView;
};

export default class MediaEditor extends React.PureComponent<Props> {
  private onUploadStart = (newFileIdentifier: any, dimensions: Dimensions) => {
    const { state, dispatch } = this.props.view;
    uploadAnnotation(newFileIdentifier, dimensions)(state, dispatch);
  };

  private onClose = () => {
    const { state, dispatch } = this.props.view;
    closeMediaEditor()(state, dispatch);
  };

  render() {
    const {
      mediaEditorState: { editor, context },
    } = this.props;
    if (!editor || !context) {
      return null;
    }

    const { identifier } = editor;

    return (
      <SmartMediaEditor
        identifier={identifier}
        context={context}
        onUploadStart={this.onUploadStart}
        onClose={this.onClose}
      />
    );
  }
}
