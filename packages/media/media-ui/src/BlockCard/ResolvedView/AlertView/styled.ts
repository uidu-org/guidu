import styled, { ThemedOuterStyledProps } from 'styled-components';

import { HTMLAttributes, ComponentClass } from 'react';
import { colors } from '@atlaskit/theme';
import { borderRadiusBottom } from '../../../mixins';

export interface WrapperProps {
  type: 'success' | 'failure';
}

export const Wrapper: ComponentClass<
  HTMLAttributes<{}> & ThemedOuterStyledProps<WrapperProps, {}>
> = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 7px 4px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  line-height: 18px;
  pointer-events: all;
  ${borderRadiusBottom} ${({ type }: WrapperProps) => {
    if (type === 'failure') {
      return `
        color: ${colors.N600};
        background-color: ${colors.Y300};
      `;
    } else {
      return `
        color: ${colors.N0};
        background-color: ${colors.G300};
      `;
    }
  }};
`;
