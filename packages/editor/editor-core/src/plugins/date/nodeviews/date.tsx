import { Date } from '@uidu/date';
import {
  DateSharedCssClassName,
  isPastDate,
  timestampToString,
  timestampToTaskContext,
} from '@uidu/editor-common';
import { borderRadius, colors } from '@uidu/theme';
import React from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { setDatePickerAt } from '../actions';

const SelectableDate = styled(Date)`
  .dateView-content-wrap.ProseMirror-selectednode & {
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

const Span = styled.span`
  line-height: initial;
`;

export default function DateNodeView(props) {
  console.log('DateNodeView', props);
  const {
    node: {
      attrs: { timestamp },
    },
    view,
    view: {
      state: { schema, selection, doc },
    },
    getPos,
  } = props;

  const intl = useIntl();

  const handleClick = (event: React.SyntheticEvent<any>) => {
    event.nativeEvent.stopImmediatePropagation();
    const { state, dispatch } = view;
    setDatePickerAt(state.selection.from)(state, dispatch);
  };

  // We fall back to selection.$from even though it does not cover all use cases
  // eg. upon Editor init, selection is at the start, not at the Date node
  const $nodePos =
    typeof getPos === 'function' ? doc.resolve(getPos()) : selection.$from;

  const parent = $nodePos.parent;
  const withinIncompleteTask =
    parent.type === schema.nodes.taskItem && parent.attrs.state !== 'DONE';
  const color =
    withinIncompleteTask && isPastDate(timestamp) ? 'red' : undefined;

  return (
    <Span className={DateSharedCssClassName.DATE_WRAPPER} onClick={handleClick}>
      <SelectableDate color={color} value={timestamp}>
        {withinIncompleteTask
          ? timestampToTaskContext(timestamp, intl)
          : timestampToString(timestamp, intl)}
      </SelectableDate>
    </Span>
  );
}
