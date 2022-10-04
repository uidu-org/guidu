import { Date } from '@uidu/date';
import { borderRadius, colors } from '@uidu/theme';
import React from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

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

export default function VideoNodeView(props) {
  const {
    node: {
      attrs: { url },
    },
    view,
    view: {
      state: { schema, selection },
    },
    getPos,
  } = props;

  const intl = useIntl();

  console.log(props);

  // const handleClick = (event: React.SyntheticEvent<any>) => {
  //   event.nativeEvent.stopImmediatePropagation();
  //   const { state, dispatch } = view;
  //   setDatePickerAt(state.selection.from)(state, dispatch);
  // };
  // We fall back to selection.$from even though it does not cover all use cases

  return (
    <div tw="aspect-w-16 aspect-h-9">
      <iframe
        src={url}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
}
