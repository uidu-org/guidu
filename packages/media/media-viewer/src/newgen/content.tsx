import * as React from 'react';
import { Component, SyntheticEvent, ReactElement, ReactNode } from 'react';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import Button from '@uidu/button';
import { closeOnDirectClick } from './utils/closeOnDirectClick';
import {
  ContentWrapper,
  CloseButtonWrapper,
  hideControlsClassName,
} from './styled';

export interface ContentProps {
  onClose?: () => void;
  children: ReactNode;
}

export interface ContentState {
  showControls: boolean;
}

const mouseMovementDelay = 2000;
export const findParent = (
  element: HTMLElement,
  className: string,
  maxParentElement: HTMLElement = document.body,
): HTMLElement | undefined => {
  if (element.classList.contains(className)) {
    return element;
  }

  let currentElement = element;

  while (currentElement.parentElement !== maxParentElement) {
    if (currentElement.parentElement) {
      currentElement = currentElement.parentElement;

      if (currentElement.classList.contains(className)) {
        return currentElement;
      }
    } else {
      return undefined;
    }
  }

  return undefined;
};

export class Content extends Component<ContentProps, ContentState> {
  private checkActivityTimeout?: number;
  private contentWrapperElement?: HTMLElement;

  state: ContentState = {
    showControls: true,
  };

  private clearTimeout = () => {
    if (this.checkActivityTimeout) {
      window.clearTimeout(this.checkActivityTimeout);
    }
  };

  private hideControls = (element?: HTMLElement) => () => {
    if (element) {
      const parent = findParent(
        element,
        hideControlsClassName,
        this.contentWrapperElement,
      );
      if (!parent) {
        this.setState({ showControls: false });
      }
    } else {
      this.setState({ showControls: false });
    }
  };

  private checkMouseMovement = (e?: SyntheticEvent<HTMLElement>) => {
    const { showControls } = this.state;
    this.clearTimeout();
    // This check is needed to not trigger a render call on every movement.
    // Even if nothing will be re-renderer since the value is the same, it
    // will go into any children render method for nothing.
    if (!showControls) {
      this.setState({ showControls: true });
    }
    this.checkActivityTimeout = window.setTimeout(
      this.hideControls(e && (e.target as HTMLElement)),
      mouseMovementDelay,
    );
  };

  componentDidMount() {
    this.checkMouseMovement();
  }

  componentWillUnmount() {
    this.clearTimeout();
  }

  // We want to check mouse movement on click too
  // in order to not hide controls when user is interacting with any control
  private onClick = (e: any) => {
    const { onClose } = this.props;
    this.checkMouseMovement();
    closeOnDirectClick(onClose)(e);
  };

  private saveContentWrapperRef = (el: HTMLElement) => {
    this.contentWrapperElement = el;
  };

  render() {
    const { showControls } = this.state;
    const { onClose } = this.props;
    // We extend the children with the ability of showing the controls
    const children = React.cloneElement(
      this.props.children as ReactElement<any>,
      {
        showControls: this.checkMouseMovement,
      },
    );

    return (
      <ContentWrapper
        ref={this.saveContentWrapperRef}
        showControls={showControls}
        onMouseMove={this.checkMouseMovement}
        onClick={this.onClick}
      >
        <CloseButtonWrapper className={hideControlsClassName}>
          <Button
            appearance={'toolbar' as any}
            onClick={onClose}
            iconBefore={<CrossIcon label="Close" />}
          />
        </CloseButtonWrapper>
        {children}
      </ContentWrapper>
    );
  }
}
