import React from 'react';
import styled from 'styled-components';
import { ShellProps } from '../types';
import { mobileOnlyHeight } from '../utils';

export const Wrapper = styled.div<{
  fixedHeight: boolean | 'mobileOnly';
}>`
  display: flex;
  overscroll-behavior: none;

  ${({ fixedHeight }) => mobileOnlyHeight(fixedHeight)};
  max-height: 100vh;
  width: 100vw;

  min-width: 0;
  min-height: 0;
`;

export default function Shell({
  fixedHeight = true,
  children,
  ...otherProps
}: ShellProps) {
  return (
    <Wrapper fixedHeight={fixedHeight} {...otherProps}>
      {children}
    </Wrapper>
  );
}
