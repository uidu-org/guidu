import React from 'react';
import styled from 'styled-components';

const SecondaryActions = styled.div`
  align-items: center;
  display: flex;
  flex-shrink: 0;
`;

export default function ({ children }) {
  return <SecondaryActions>{children}</SecondaryActions>;
}
