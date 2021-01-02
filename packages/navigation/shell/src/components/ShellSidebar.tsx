import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';

export const ShellSidebar = styled.aside`
  flex-direction: column;
  flex-shrink: 0;
  justify-content: space-between;
  position: relative;
  /* flex-grow: 1; */
`;

export default function (props: HTMLAttributes<HTMLDivElement>) {
  return <ShellSidebar {...props} />;
}
