import DecisionIcon from '@atlaskit/icon/glyph/editor/decision';
import { EditorView } from 'prosemirror-view';
import React, { PureComponent } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import ToolbarButton from '../../../../ui/ToolbarButton';
import { messages } from '../../../insert-block/ui/ToolbarInsertBlock/messages';
import { insertTaskDecision } from '../../commands';

export interface Props {
  editorView?: EditorView;
  isDisabled?: boolean;
  isReducedSpacing?: boolean;
}

export interface State {
  disabled: boolean;
}

export class ToolbarDecision extends PureComponent<
  Props & WrappedComponentProps,
  State
> {
  state: State = { disabled: false };

  render() {
    const { disabled } = this.state;
    const {
      isDisabled,
      isReducedSpacing,
      intl: { formatMessage },
    } = this.props;

    const label = formatMessage(messages.decision);

    return (
      <ToolbarButton
        onClick={this.handleInsertDecision}
        disabled={disabled || isDisabled}
        spacing={isReducedSpacing ? 'none' : 'default'}
        title={`${label} <>`}
        iconBefore={<DecisionIcon label={label} />}
      />
    );
  }

  private handleInsertDecision = (): boolean => {
    const { editorView } = this.props;
    if (!editorView) {
      return false;
    }
    insertTaskDecision(editorView, 'decisionList')(
      editorView.state,
      editorView.dispatch,
    );
    return true;
  };
}

export default injectIntl(ToolbarDecision);
