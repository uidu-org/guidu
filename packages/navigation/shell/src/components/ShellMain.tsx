import React from 'react';
import styled from 'styled-components';

export const ShellMain = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  min-width: 0;
`;

export default function (props) {
  return <ShellMain {...props} />;
}
