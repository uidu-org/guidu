import {
  blockNodesVerticalMargin,
  calcBreakoutWidth,
  WidthConsumer,
} from '@uidu/editor-common';
import * as React from 'react';
import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: ${blockNodesVerticalMargin} 0;
  margin-left: 50%;
  transform: translateX(-50%);
`;

export default function Breakout({
  children,
  mode,
}: {
  children: React.ReactNode;
  mode: string;
}) {
  return (
    <WidthConsumer>
      {({ width }) => (
        <Wrapper
          data-mode={mode}
          style={{ width: calcBreakoutWidth(props.mode, width) }}
          className="fabric-editor-breakout-mark"
        >
          {children}
        </Wrapper>
      )}
    </WidthConsumer>
  );
}
