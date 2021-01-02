import React, { forwardRef } from 'react';
import styled, { keyframes } from 'styled-components';

const getFadeContainerKeyFrame = ({ animatingOut, direction }) => {
  if (!direction) return null;
  return keyframes`
  to {
    transform: translateX(0px);
    /* opacity: ${animatingOut ? 0 : 1}; */
  }
`;
};

const FadeContainer = styled.div<{
  duration: number;
  direction: 'left' | 'right';
  animatingOut: boolean;
}>`
  will-change: transform;
  animation-name: ${getFadeContainerKeyFrame};
  animation-duration: ${(props) => props.duration}ms;
  animation-fill-mode: forwards;
  // opacity: ${(props) => (props.direction && !props.animatingOut ? 0 : 1)};
  top: 0;
  left: 0;
`;

type FadeContentProps = {
  duration?: number;
  direction?: 'right' | 'left';
  animatingOut?: boolean;
  children: React.ReactNode;
  // ref: PropTypes.func,
};

const FadeContents = forwardRef<any, FadeContentProps>(
  ({ children, duration, animatingOut, direction }, ref) => (
    <FadeContainer
      // prevent screen readers from reading out hidden content
      aria-hidden={animatingOut}
      animatingOut={animatingOut}
      direction={direction}
      duration={duration}
      ref={ref}
    >
      {children}
    </FadeContainer>
  ),
);

export default FadeContents;
