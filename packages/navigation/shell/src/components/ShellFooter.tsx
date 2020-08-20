import React from 'react';
import styled from 'styled-components';

export const ShellFooter = styled.footer`
  // height: 3rem;
  flex-shrink: 0;
`;

export default function (props) {
  return <ShellFooter {...props} />;
}
