import * as React from 'react';
import styled from 'styled-components';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { borderRadius, colors } from '@atlaskit/theme';
import {
  timestampToString,
  timestampToTaskContext,
  isPastDate,
  DateSharedCssClassName,
} from '@atlaskit/editor-common';
import { Date } from '@atlaskit/date';
import { setDatePickerAt } from '../actions';

const SelectableDate = styled(Date)`
  .ProseMirror-selectednode & {
    position: relative;
    &::before {
      content: '';
      border: 2px solid ${colors.B200};
      background: transparent;
      border-radius: ${borderRadius()}px;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
  }
`;

export interface Props {
  children?: React.ReactNode;
  view: EditorView;
  node: PMNode;
}

export default class DateNodeView extends React.Component<Props> {
  render() {
    const {
      node: {
        attrs: { timestamp },
      },
      view: {
        state: { schema, selection },
      },
    } = this.props;

    const parent = selection.$from.parent;
    const withinIncompleteTask =
      parent.type === schema.nodes.taskItem && parent.attrs.state !== 'DONE';

    const color =
      withinIncompleteTask && isPastDate(timestamp) ? 'red' : undefined;

    return (
      <span
        className={DateSharedCssClassName.DATE_WRAPPER}
        onClick={this.handleClick}
      >
        <SelectableDate color={color} value={timestamp}>
          {withinIncompleteTask
            ? timestampToTaskContext(timestamp)
            : timestampToString(timestamp)}
        </SelectableDate>
      </span>
    );
  }

  private handleClick = (event: React.SyntheticEvent<any>) => {
    event.nativeEvent.stopImmediatePropagation();
    const { state, dispatch } = this.props.view;
    setDatePickerAt(state.selection.from)(state, dispatch);
  };
}
