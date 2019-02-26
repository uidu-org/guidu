// @flow
import styled, { css, keyframes } from 'styled-components';
import { colors, layers } from '@atlaskit/theme';

// NOTE:
// Pulse color "rgb(101, 84, 192)" derived from "colors.P300"

const baseShadow = `0 0 0 2px ${colors.P300}`;
const easing = 'cubic-bezier(0.55, 0.055, 0.675, 0.19)';
const pulseKeframes = keyframes`
  0%, 33% { box-shadow: ${baseShadow}, 0 0 0 rgba(101, 84, 192, 1) }
  66%, 100% { box-shadow: ${baseShadow}, 0 0 0 10px rgba(101, 84, 192, 0.01) }
`;
const animation = css`
  animation: ${pulseKeframes} 3000ms ${easing} infinite;
`;
const animationWithCheck = ({ pulse }) => (pulse ? animation : null);

const backgroundColor = p =>
  p.bgColor
    ? `
        background-color: ${p.bgColor};
      `
    : null;
const borderRadius = p =>
  p.radius
    ? `
        border-radius: ${p.radius}px;
      `
    : null;

// IE11 and Edge: z-index needed because fixed position calculates z-index relative
// to body insteadof nearest stacking context (Portal in our case).
export const Div = styled.div`
  z-index: ${layers.spotlight() + 1};
  ${backgroundColor} ${borderRadius};
`;

// fixed position holds the target in place if overflow/scroll is necessary
export const TargetInner = styled(Div)`
  ${animationWithCheck} position: absolute;
`;

export const TargetOverlay = styled.div`
  cursor: ${p => (p.onClick ? 'pointer' : 'auto')};
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

// exported for consumer
export const Pulse = styled(Div)`
  position: absolute;
  ${animation};
`;
