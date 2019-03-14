import * as React from 'react';
import { Wrappper } from './styled';

export interface CollapsedFrameProps {
  minWidth?: number;
  maxWidth?: number;
  children?: React.ReactNode;
  /** The optional click handler */
  onClick?: () => void;
  /** A flag that determines whether the card is selected in edit mode. */
  isSelected?: boolean;
}

export class CollapsedFrame extends React.Component<CollapsedFrameProps> {
  handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const { onClick } = this.props;
    if (onClick) {
      event.preventDefault();
      event.stopPropagation();
      onClick();
    }
  };

  // imitate a button for accessibility reasons
  handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== ' ' && event.key !== 'Enter') {
      return;
    }
    const { onClick } = this.props;
    if (onClick) {
      event.preventDefault();
      event.stopPropagation();
      onClick();
    }
  };

  render() {
    const { isSelected, minWidth, maxWidth, children, onClick } = this.props;
    const isInteractive = Boolean(onClick);
    return (
      <Wrappper
        minWidth={minWidth}
        maxWidth={maxWidth}
        isInteractive={isInteractive}
        isSelected={isSelected}
        tabIndex={isInteractive ? 0 : undefined}
        role={isInteractive ? 'button' : undefined}
        onClick={this.handleClick}
        onKeyPress={this.handleKeyPress}
      >
        {children}
      </Wrappper>
    );
  }
}
