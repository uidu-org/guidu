import React from 'react';
import styled from 'styled-components';
import tw, { theme } from 'twin.macro';

const Div = styled.div<{
  isStacked: boolean;
  paddingRight: number;
  isTinted: boolean;
  canClickThrough: boolean;
}>`
  ${tw`fixed top-0 bottom-0 left-0 transition-opacity duration-200 background[rgba(var(--body-primary-color), .35)]`}
  ${({ isTinted }) => (isTinted ? tw`opacity-100` : tw`opacity-0`)}
  ${({ canClickThrough }) =>
    canClickThrough ? tw`pointer-events-none` : tw`pointer-events-auto`}
  right: ${({ paddingRight }) => `${paddingRight}px`};
  z-index: ${({ isStacked }) =>
    isStacked ? `${theme`zIndex.blanket`} + 1` : theme`zIndex.blanket`};
`;

interface BlanketProps {
  /** Whether mouse events can pierce the blanket. If true, onBlanketClicked will not be fired */
  canClickThrough?: boolean;
  /** Whether the blanket has a tinted background color. */
  isTinted?: boolean;
  /** Handler function to be called when the blanket is clicked */
  onBlanketClicked?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** Stacked blankets have higher z-index references */
  isStacked?: boolean;
  /** Padding right is added by parent container if blanket should account for scrollbar */
  paddingRight?: number;
  /** Class applied to blanket main DIV */
  className?: string;
}

function Blanket({
  canClickThrough = false,
  isTinted = false,
  onBlanketClicked = () => {},
  isStacked = false,
  paddingRight = 0,
  className = null,
  children,
}: BlanketProps) {
  const onClick = canClickThrough ? null : onBlanketClicked;
  const containerProps = {
    canClickThrough,
    isTinted,
    onClick,
    isStacked,
    paddingRight,
    className,
    children,
  };

  return <Div {...containerProps} />;
}

export default Blanket;
