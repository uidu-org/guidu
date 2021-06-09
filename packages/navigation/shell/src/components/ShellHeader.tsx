import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';

export const ShellHeader = styled.header`
  display: flex;
  align-items: center;
  height: 4.5rem;
  flex-shrink: 0;
`;

export default function (props: HTMLAttributes<HTMLDivElement>) {
  return <ShellHeader {...props} />;
}
