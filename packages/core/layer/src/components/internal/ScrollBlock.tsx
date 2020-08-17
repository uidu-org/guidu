import React from 'react';
import ScrollLock from 'react-scrolllock';
import styled from 'styled-components';

const Blanket = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
`;

export default function ScrollBlock() {
  return (
    <Blanket>
      <ScrollLock />
    </Blanket>
  );
}
