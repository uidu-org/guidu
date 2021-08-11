import React from 'react';
import styled from 'styled-components';
import { ShellProps } from '../types';

export const Shell = styled.div`
  display: flex;
  overscroll-behavior: none;

  overflow: hidden;
  height: 100%;
  max-height: 100vh;
  width: 100vw;

  min-width: 0;
  min-height: 0;
`;

export default function ({ id, children }: ShellProps) {
  return <Shell id={id}>{children}</Shell>;
}
