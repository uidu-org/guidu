import { borderRadius, divide, gridSize } from '@uidu/theme';
import styled from 'styled-components';

export const Body = styled.div`
  padding: 40px 20px;
  text-align: center;
`;

export const Heading = styled.h4`
  color: inherit;
  font-size: 20px;
  font-style: inherit;
  font-weight: 500;
  letter-spacing: -0.008em;
  line-height: 1.2;
  margin-bottom: ${gridSize}px;
`;
export const Image = styled.img`
  border-top-left-radius: ${borderRadius}px;
  border-top-right-radius: ${borderRadius}px;
  height: auto;
  width: 100%;

  @media (min-width: 320px) and (max-width: 480px) {
    border-radius: 0;
  }
`;
export const Actions = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 40px 40px;
`;
export const ActionItem = styled.div`
  margin: 0 ${divide(gridSize, 2)}px;
`;
