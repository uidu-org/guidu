import React from 'react';
import styled from 'styled-components';

const PrimaryActions = styled.div`
  align-items: stretch;
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0px;
  height: 100%;
  position: relative;
  overflow: hidden;

  & > * {
    margin: 0px 4px;
  }
`;

export default function ({ children }) {
  return <PrimaryActions>{children}</PrimaryActions>;
}
