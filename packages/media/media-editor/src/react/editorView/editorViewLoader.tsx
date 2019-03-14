import * as React from 'react';
import { ModalSpinner } from '@uidu/media-ui';
import EditorViewType, { EditorViewProps } from './editorView';

interface AsyncEditorViewState {
  EditorView?: typeof EditorViewType;
}

export default class AsyncEditorView extends React.PureComponent<
  EditorViewProps & AsyncEditorViewState,
  AsyncEditorViewState
> {
  static displayName = 'AsyncEditorView';
  static EditorView?: typeof EditorViewType;

  state = {
    // Set state value to equal to current static value of this class.
    EditorView: AsyncEditorView.EditorView,
  };

  async componentWillMount() {
    if (!this.state.EditorView) {
      const module = await import(/* webpackChunkName:"@atlaskit-internal_media-editor-view" */
      './editorView');
      AsyncEditorView.EditorView = module.default;
      this.setState({ EditorView: module.default });
    }
  }

  render() {
    if (!this.state.EditorView) {
      return <ModalSpinner blankedColor="none" invertSpinnerColor={false} />;
    }

    return <this.state.EditorView {...this.props} />;
  }
}
