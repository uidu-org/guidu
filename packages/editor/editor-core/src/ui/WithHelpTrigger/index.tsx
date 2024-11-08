import PropTypes from 'prop-types';
import React from 'react';
import { openHelpCommand } from '../../plugins/help-dialog/commands';

export default class WithHelpTrigger extends React.Component<
  { render: (openHelp: () => void) => React.ReactNode },
  any
> {
  static contextTypes = {
    editorActions: PropTypes.object.isRequired,
  };

  openHelp = () => {
    const { editorActions } = this.context;

    const editorView = editorActions._privateGetEditorView();
    if (editorView) {
      openHelpCommand(editorView.state.tr, editorView.dispatch);
    }
  };

  render() {
    return this.props.render(this.openHelp);
  }
}
