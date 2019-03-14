import * as React from 'react';
import { MouseEvent } from 'react';
import {
  className,
  LinkWrapper,
  Wrapper,
  Header,
  IconWrapper,
  TextWrapper,
  Content,
} from './styled';

export interface ExpandedFrameProps {
  isPlaceholder?: boolean;
  href?: string;
  icon?: React.ReactElement<any>;
  text?: React.ReactNode;
  minWidth?: number;
  maxWidth?: number;
  children?: React.ReactNode;
  /** A flag that determines whether the card is selected in edit mode. */
  isSelected?: boolean;
  /** The optional click handler */
  onClick?: () => void;
}

export class ExpandedFrame extends React.Component<ExpandedFrameProps> {
  get isInteractive() {
    const { isPlaceholder, href, onClick } = this.props;
    return !isPlaceholder && (Boolean(href) || Boolean(onClick));
  }

  handleClick = (event: MouseEvent<HTMLElement>) => {
    const { onClick } = this.props;
    if (onClick) {
      event.preventDefault();
      event.stopPropagation();
      onClick();
    }
  };

  renderHeader() {
    const { isPlaceholder = false, icon, text } = this.props;
    return (
      <Header>
        <IconWrapper isPlaceholder={isPlaceholder}>
          {!isPlaceholder && icon}
        </IconWrapper>
        <TextWrapper isPlaceholder={isPlaceholder}>
          {!isPlaceholder && text}
        </TextWrapper>
      </Header>
    );
  }

  renderContent() {
    const { isInteractive } = this;
    const { children } = this.props;
    return <Content isInteractive={isInteractive}>{children}</Content>;
  }

  render() {
    const { isInteractive } = this;
    const { isPlaceholder, isSelected, href, minWidth, maxWidth } = this.props;
    if (!isPlaceholder && href) {
      return (
        <LinkWrapper
          target="_blank"
          rel="noopener"
          className={className}
          isInteractive={isInteractive}
          isSelected={isSelected}
          href={href}
          minWidth={minWidth}
          maxWidth={maxWidth}
          onClick={this.handleClick}
        >
          {this.renderHeader()}
          {this.renderContent()}
        </LinkWrapper>
      );
    } else {
      return (
        <Wrapper
          className={className}
          isInteractive={isInteractive}
          isSelected={isSelected}
          minWidth={minWidth}
          maxWidth={maxWidth}
          onClick={this.handleClick}
        >
          {this.renderHeader()}
          {this.renderContent()}
        </Wrapper>
      );
    }
  }
}
