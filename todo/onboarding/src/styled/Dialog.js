// @flow
import styled from 'styled-components';
import { borderRadius, colors, gridSize, math, themed } from '@atlaskit/theme';

// dialog may not be smaller than 160px or larger than 600px
const dialogWidth = ({ width }) => `${Math.min(Math.max(width, 160), 600)}px`;

const borderColor = themed({
  light: colors.N60A,
  dark: colors.DN60A,
});
const shadowColor = themed({
  light: colors.N50A,
  dark: colors.DN50A,
});
const boxShadow = props => {
  const border = `0 0 1px ${borderColor(props)}`;
  const shadow = `0 4px 8px -2px ${shadowColor(props)}`;

  return [border, shadow].join(',');
};

export const FillScreen = styled.div`
  height: 100%;
  left: 0;
  overflow-y: auto;
  position: absolute;
  top: ${p => p.scrollDistance}px;
  width: 100%;
`;

export const Dialog = styled.div`
  background: ${colors.P300};
  border-radius: ${borderRadius}px;
  box-shadow: ${boxShadow};
  box-sizing: border-box;
  color: ${colors.N0};
  display: flex;
  flex-direction: column;
  width: ${dialogWidth};
`;
export const DialogBody = styled.div`
  flex: 1 1 auto;
  padding: ${math.multiply(gridSize, 2)}px ${math.multiply(gridSize, 3)}px
    ${gridSize}px;

  p:last-child,
  ul:last-child,
  ol:last-child {
    margin-bottom: 0;
  }
`;

// internal elements
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
  height: auto;
  max-width: 100%;
`;

// actions
export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 ${math.multiply(gridSize, 3)}px ${math.multiply(gridSize, 2)}px;
`;
export const ActionItems = styled.div`
  display: flex;
  margin: 0 -${math.divide(gridSize, 2)}px;
`;
export const ActionItem = styled.div`
  margin: 0 ${math.divide(gridSize, 2)}px;
`;
