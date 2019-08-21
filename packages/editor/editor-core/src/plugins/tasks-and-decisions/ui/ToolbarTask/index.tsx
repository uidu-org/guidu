import TaskIcon from '@atlaskit/icon/glyph/editor/task';
import { EditorView } from 'prosemirror-view';
import * as React from 'react';
import { PureComponent } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { withAnalytics } from '../../../../analytics';
import ToolbarButton from '../../../../components/ToolbarButton';
import { messages } from '../../../insert-block/ui/ToolbarInsertBlock';
import { insertTaskDecision } from '../../commands';

export interface Props {
  editorView?: EditorView;
  isDisabled?: boolean;
  isReducedSpacing?: boolean;
}

export interface State {
  disabled: boolean;
}

export class ToolbarTask extends PureComponent<
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

    const label = formatMessage(messages.action);

    return (
      <ToolbarButton
        onClick={this.handleInsertTask}
        disabled={disabled || isDisabled}
        spacing={isReducedSpacing ? 'none' : 'default'}
        title={`${label} []`}
        iconBefore={<TaskIcon label={label} />}
      />
    );
  }

  private handleInsertTask = withAnalytics(
    'atlassian.fabric.action.trigger.button',
    (): boolean => {
      const { editorView } = this.props;
      if (!editorView) {
        return false;
      }
      insertTaskDecision(editorView, 'taskList');
      return true;
    },
  );
}

export default injectIntl(ToolbarTask);
