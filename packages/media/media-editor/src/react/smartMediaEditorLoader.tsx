import * as React from 'react';

import { ModalSpinner } from '@uidu/media-ui';
import { colors } from '@uidu/theme';
import SmartMediaEditorType, {
  SmartMediaEditorProps,
} from './smartMediaEditor';

interface AsyncSmartMediaEditorState {
  SmartMediaEditor?: typeof SmartMediaEditorType;
}

export default class AsyncSmartMediaEditor extends React.PureComponent<
  SmartMediaEditorProps & AsyncSmartMediaEditorState,
  AsyncSmartMediaEditorState
> {
  static displayName = 'AsyncSmartMediaEditor';
  static SmartMediaEditor?: typeof SmartMediaEditorType;

  state = {
    // Set state value to equal to current static value of this class.
    SmartMediaEditor: AsyncSmartMediaEditor.SmartMediaEditor,
  };

  async componentWillMount() {
    if (!this.state.SmartMediaEditor) {
      const module = await import(/* webpackChunkName:"@atlaskit-internal_smart-media-editor" */
      './smartMediaEditor');
      AsyncSmartMediaEditor.SmartMediaEditor = module.default;
      this.setState({ SmartMediaEditor: module.default });
    }
  }

  render() {
    if (!this.state.SmartMediaEditor) {
      return (
        <ModalSpinner blankedColor={colors.N700A} invertSpinnerColor={true} />
      );
    }

    return <this.state.SmartMediaEditor {...this.props} />;
  }
}
