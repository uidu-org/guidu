import { layers } from '@uidu/theme';
import styled, { css, keyframes } from 'styled-components';

interface TargetProps {
  pulse?: boolean;
  bgColor?: string;
  radius?: number;
}

interface TargetProps {
  pulse?: boolean;
  bgColor?: string;
  radius?: number;
}

// NOTE:
// Pulse color "rgb(101, 84, 192)" derived from "colors.P300"
const baseShadow = `0 0 0 2px rgb(var(--brand-primary))`;
const easing = 'cubic-bezier(0.55, 0.055, 0.675, 0.19)';
const pulseKeframes = keyframes`
  0%, 33% { box-shadow: ${baseShadow}, 0 0 0 rgba(var(--brand-primary), 1) }
  66%, 100% { box-shadow: ${baseShadow}, 0 0 0 10px rgba(var(--brand-primary), 0.01) }
`;
const animation = css`
  animation: ${pulseKeframes} 3000ms ${easing} infinite;
`;

// IE11 and Edge: z-index needed because fixed position calculates z-index relative
// to body instead of nearest stacking context (Portal in our case).
export const Div = styled.div<TargetProps>`
  z-index: ${layers.spotlight() + 1};

  ${(p) => (p.bgColor ? `background-color: ${p.bgColor};` : null)}
  ${(p) => (p.radius ? `border-radius: ${p.radius}px;` : null)}
`;

export const TargetInner = styled(Div)`
  ${({ pulse }) => (pulse ? animation : null)};
`;

export const TargetOverlay = styled.div`
  cursor: ${(p) => (p.onClick ? 'pointer' : 'auto')};
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
