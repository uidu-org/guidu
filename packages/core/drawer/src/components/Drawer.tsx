import Blanket from '@uidu/blanket';
import { canUseDOM } from 'exenv';
import * as React from 'react';
import { createPortal } from 'react-dom';
import { TransitionGroup } from 'react-transition-group';
import { DrawerProps } from '../types';
import DrawerPrimitive from './DrawerPrimitive';
import { Fade } from './transitions';

const OnlyChild = ({ children }) => React.Children.toArray(children)[0] || null;

export class DrawerBase extends React.Component<DrawerProps> {
  static defaultProps = {
    width: 'narrow',
    origin: 'left',
    className: null,
    blanketClassName: null,
  };

  body = canUseDOM ? document.querySelector('body') : undefined;

  componentDidMount() {
    const { isOpen } = this.props;

    if (isOpen) {
      window.addEventListener('keydown', this.handleKeyDown as any);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown as any);
  }

  componentDidUpdate(prevProps: DrawerProps) {
    const { isOpen } = this.props;
    if (isOpen !== prevProps.isOpen) {
      if (isOpen) {
        window.addEventListener('keydown', this.handleKeyDown as any);
      } else {
        window.removeEventListener('keydown', this.handleKeyDown as any);
      }
    }
  }

  handleBlanketClick = (event: React.MouseEvent) => {
    this.handleClose(event);
  };

  handleBackButtonClick = (event: React.MouseEvent) => {
    this.handleClose(event);
  };

  handleClose = (event: React.KeyboardEvent | React.MouseEvent) => {
    const { onClose } = this.props;

    if (onClose) {
      onClose(event);
    }
  };

  handleKeyDown = (event: React.KeyboardEvent) => {
    const { isOpen, onKeyDown } = this.props;

    if (event.key === 'Escape' && isOpen) {
      this.handleClose(event);
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  render() {
    if (!this.body) {
      return null;
    }
    const {
      isOpen,
      children,
      icon,
      size,
      shouldUnmountOnExit,
      onCloseComplete,
      origin,
      isStacked,
      className,
      blanketClassName,
    } = this.props;

    return createPortal(
      <TransitionGroup component={OnlyChild}>
        <>
          <Fade in={isOpen} origin={origin} isStacked={isStacked}>
            <Blanket
              isStacked={isStacked}
              isTinted
              onBlanketClicked={this.handleBlanketClick}
              className={blanketClassName}
            />
          </Fade>
          <DrawerPrimitive
            icon={icon}
            in={isOpen}
            onClose={this.handleBackButtonClick}
            onCloseComplete={onCloseComplete}
            size={size}
            shouldUnmountOnExit={shouldUnmountOnExit}
            origin={origin}
            isStacked={isStacked}
            className={className}
          >
            {children}
          </DrawerPrimitive>
        </>
      </TransitionGroup>,
      this.body,
    );
  }
}

export default DrawerBase;
