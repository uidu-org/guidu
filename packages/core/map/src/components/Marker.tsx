import React from 'react';
import styled from 'styled-components';

const K_WIDTH = 32;
const K_HEIGHT = 32;

const StyledMarker = styled.div`
  position: absolute;
  width: ${() => `${K_WIDTH}px`};
  height: ${() => `${K_HEIGHT}px`};
  border-radius: 32px;
  border: 1px solid #e7e7e7;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.12) 0px 0px 0px 1px,
    rgba(0, 0, 0, 0.08) 0px 3px 8px;
  color: rgb(72, 72, 72);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  padding: 4px;
  transform: translate(-50%, 50%);
  left: 50%;
  position: absolute;
  bottom: 0px;
  z-index: 0;
  pointer-events: auto;
  transition: transform 0.15s ease-out 0s;
  z-index: 0;
  transform: scale(1);

  &:hover {
    transform: scale(1.09);
    transition: transform 0.15s ease-out 0s;
    z-index: 500;
  }
`;

export default ({ text }) => <StyledMarker>{text}</StyledMarker>;
