import React, { ReactNode } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { gutter, verticalOffset } from '../constants';

const maxWidthDimensions = `calc(100vw - ${gutter * 2}px)`;
const maxHeightDimensions = `calc(100vh - ${gutter * 2 - 1}px)`;

const StyledPositioner = styled.div<{
  shouldScrollInViewport: boolean;
  stackIndex?: number;
}>`
  ${tw`fixed top-0 left-0 z-50 w-full h-full max-w-full`}
  ${({ shouldScrollInViewport }) => {
    if (shouldScrollInViewport) {
      return tw`width[max-content] h-auto relative md:(mx-auto my-4)`;
    }
    return tw`md:(width[max-content] mx-auto absolute right-0 top[var(--modal-dialog-gutter)] left-0 pointer-events-none)`;
  }}
  ${tw`transition duration-300 ease-in-out transform motion-reduce:(transition-none)`}

  ${({ stackIndex }) => {
    if (stackIndex > 0) {
      return tw`transform[translateY(var(--modal-dialog-translate-y))]`;
    }
    return tw`transform[none]`;
  }}
  ${tw`md:(max-width[calc(100vw - var(--modal-dialog-gutter) * 2)] max-height[calc(100vh - var(--modal-dialog-gutter) * 2)])`}
`;

const bodyScrollStyles = {
  '@media (min-width: 480px)': {
    maxWidth: maxWidthDimensions,
    maxHeight: maxHeightDimensions,
  },
};

interface PositionerProps {
  children?: ReactNode;
  stackIndex: number;
  shouldScrollInViewport: boolean;
  testId?: string;
  className?: string;
}

function Positioner(props: PositionerProps) {
  const { children, stackIndex, shouldScrollInViewport, className, testId } =
    props;

  return (
    <StyledPositioner
      shouldScrollInViewport={shouldScrollInViewport}
      stackIndex={stackIndex}
      css={{
        '--modal-dialog-translate-y': `${stackIndex * (verticalOffset / 2)}px`,
        '--modal-dialog-gutter': gutter,
      }}
      data-testid={testId && `${testId}--positioner`}
      className={className}
    >
      {children}
    </StyledPositioner>
  );
}

export default Positioner;
