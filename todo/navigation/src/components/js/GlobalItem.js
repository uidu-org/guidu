// @flow
import React, { PureComponent, type Node, type ComponentType } from 'react';
import styled from 'styled-components';
import GlobalItemInner, { globalItemStyles } from '../styled/GlobalItemInner';
import DefaultLinkComponent from './DefaultLinkComponent';
import type { IconAppearance } from '../../types';
import { withGlobalItemAnalytics } from '../../utils/analytics';

type Props = {
  /** Standard aria-haspopup prop */
  'aria-haspopup'?: string, // eslint-disable-line react/no-unused-prop-types
  /** Element to be rendered inside the item. Should be an atlaskit icon. */
  children?: Node,
  /** href to pass to linkComponent.  */
  href?: string,
  /** An id used for analytics to identify the item when it is clicked. If passed in, an event will be fired on the navigation channel. */
  id?: string,
  /** Causes the item to appear with a persistent selected background state. */
  isSelected?: boolean,
  /** Component to be used to create the link in the global item. A default
   component is used if none is provided. */
  linkComponent?: ComponentType<any>,
  /** Standard onClick event */
  onClick?: (
    event: SyntheticMouseEvent<*> | SyntheticKeyboardEvent<*>,
    data?: {},
  ) => void,
  onMouseDown: (event: MouseEvent) => void,
  /** ARIA role to apply to the global item. */
  role?: string,
  /** Set the size of the item's content.  */
  size?: 'small' | 'medium' | 'large',
  /** Appearance of item for custom styling (square or round) */
  appearance: IconAppearance,
};

class GlobalItem extends PureComponent<Props> {
  static defaultProps = {
    onMouseDown: () => {},
    size: 'small',
    appearance: 'round',
  };

  handleKeyDown = (event: SyntheticKeyboardEvent<*>) => {
    if (event.key === 'Enter' && this.props.onClick) {
      this.props.onClick(event);
    }
  };

  render() {
    const {
      children,
      href,
      linkComponent: CustomComponent,
      isSelected,
      size,
      'aria-haspopup': ariaHasPopup, // eslint-disable-line react/prop-types
      onClick,
      onMouseDown: providedMouseDown,
      role,
      appearance,
    } = this.props;

    const allyAndEventProps = {
      'aria-haspopup': ariaHasPopup,
      onClick,
      role,
      onKeyDown: this.handleKeyDown,
    };

    const hoverOverrideStyles = href ? '&:hover { color: inherit; }' : '';

    if (CustomComponent) {
      const StyledComponent = styled(CustomComponent)`
        ${globalItemStyles};
        ${hoverOverrideStyles};
      `;
      return (
        <StyledComponent
          appearance={appearance}
          href={href}
          isSelected={isSelected}
          onMouseDown={providedMouseDown}
          size={size}
          {...allyAndEventProps}
        >
          {children}
        </StyledComponent>
      );
    }
    if (href) {
      const StyledLink = styled(DefaultLinkComponent)`
        ${globalItemStyles};
        ${hoverOverrideStyles};
      `;
      return (
        <StyledLink
          href={href}
          size={size}
          onMouseDown={providedMouseDown}
          appearance={appearance}
          {...allyAndEventProps}
        >
          {children}
        </StyledLink>
      );
    }

    const onMouseDown = e => {
      providedMouseDown(e);
      e.preventDefault();
    };

    return (
      <GlobalItemInner
        type="button"
        isSelected={isSelected}
        onMouseDown={onMouseDown}
        size={size}
        appearance={appearance}
        {...allyAndEventProps}
      >
        {children}
      </GlobalItemInner>
    );
  }
}

export { GlobalItem as GlobalItemBase };

export default withGlobalItemAnalytics(GlobalItem);
