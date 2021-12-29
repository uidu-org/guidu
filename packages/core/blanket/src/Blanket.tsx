import React from 'react';
import Div from './styled';

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
}: BlanketProps) {
  const onClick = canClickThrough ? null : onBlanketClicked;
  const containerProps = {
    canClickThrough,
    isTinted,
    onClick,
    isStacked,
    paddingRight,
    className,
  };

  return <Div {...containerProps} />;
}

export default Blanket;
