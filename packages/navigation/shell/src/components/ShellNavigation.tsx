import React from 'react';
import styled from 'styled-components';

export const ShellNavigation = styled.aside`
  flex-direction: row;
  justify-content: flex-end;
  z-index: 1;
  position: relative;
  display: flex;
  will-change: min-width width;
`;

export default function (props) {
  return <ShellNavigation className="d-none d-lg-flex" {...props} />;
}
