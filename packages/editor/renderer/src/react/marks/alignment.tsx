import { AlignmentAttributes, alignmentPositionMap } from '@uidu/adf-schema';
import * as React from 'react';
import styled, { css } from 'styled-components';

export interface Props extends AlignmentAttributes {
  children: React.ReactNode;
}

const MarkWrapper = styled.div`
  ${(props: { 'data-align': 'end' | 'right' | 'center' }) =>
    props['data-align'] &&
    css`
      text-align: ${alignmentPositionMap[props['data-align']]};
    `};
`;

export default function Alignment({ children, align }: Props) {
  return (
    <MarkWrapper className="fabric-editor-block-mark" data-align={align}>
      {children}
    </MarkWrapper>
  );
}
