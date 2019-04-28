/* tslint:disable:variable-name */

import styled, { keyframes } from 'styled-components';
import { DropzoneProps } from './dropzone';

export const Wrapper = styled.div<DropzoneProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  left: 0;
  top: 0;
  display: ${(props: DropzoneProps) => (props.isActive ? 'flex' : 'none')};
  text-align: center;
  z-index: 100;
  align-items: center;
  justify-content: center;
`;

const dropzoneAppear = keyframes`
  from {
    opacity: 0;
    transform: translate(0, 30px);
  }
`;

export const Content = styled.div`
  animation: ${dropzoneAppear} 0.5s;
`;

// TODO: Use Atlaskit color
// https://product-fabric.atlassian.net/browse/MSW-156
export const Label = styled.div`
  margin-top: 10px;
  font-size: 16px;
  color: #165ecc;
`;

/* needed to prevent child dragleave events */
export const Glass = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 101;
`;

export const StyledIcon = styled.svg`
  width: 70px;
  height: 70px;
`;

export const StyledSvgGroup = styled.g``;
