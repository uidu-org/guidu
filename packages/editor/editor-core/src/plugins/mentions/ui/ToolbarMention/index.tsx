import MentionIcon from '@atlaskit/icon/glyph/editor/mention';
import { EditorView } from 'prosemirror-view';
import React, { PureComponent } from 'react';
import ToolbarButton from '../../../../ui/ToolbarButton';
import { insertMentionQuery } from '../../commands/insert-mention-query';

export interface Props {
  editorView?: EditorView;
  isDisabled?: boolean;
}

export interface State {
  disabled: boolean;
}

export default class ToolbarMention extends PureComponent<Props> {
  render() {
    return (
      <ToolbarButton
        spacing="none"
        onClick={this.handleInsertMention}
        disabled={this.props.isDisabled}
        title="Mention @"
        iconBefore={<MentionIcon label="Mention" />}
      />
    );
  }

  private handleInsertMention = (): boolean => {
    if (!this.props.editorView) {
      return false;
    }
    insertMentionQuery()(
      this.props.editorView.state,
      this.props.editorView.dispatch,
    );
    return true;
  };
}
