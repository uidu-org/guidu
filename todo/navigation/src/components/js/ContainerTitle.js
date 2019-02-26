// @flow
import React, { PureComponent, type Node, type ComponentType } from 'react';
import { ThemeProvider, withTheme } from 'styled-components';
import { itemThemeNamespace } from '@atlaskit/item';
import memoizeOne from 'memoize-one';
import AkNavigationItem from './NavigationItem';
import ContainerTitleIcon from '../styled/ContainerTitleIcon';
import ContainerTitleText from '../styled/ContainerTitleText';
import { rootKey } from '../../theme/util';
import overrideItemTheme from '../../theme/create-container-title-item-theme';

type Props = {
  /** Location to link out to on click. This is passed down to the custom link
   component if one is provided. */
  href?: string,
  /** React element to appear to the left of the text. This should be an
   @atlaskit/icon component. */
  icon?: Node,
  /** Component to be used as link, if default link component does not suit, such
  as if you are using a different router. Component is passed a href prop, and the content
  of the title as children. Any custom link component must accept a className prop so that
  it can be styled. */
  linkComponent?: ComponentType<*>,
  /** Function to be called on click. This is passed down to a custom link component,
   if one is provided.  */
  onClick?: (?MouseEvent) => void,
  /** Function to be called on click. This is passed down to a custom link component,
   if one is provided.  */
  onKeyDown?: (e: KeyboardEvent) => void,
  /** Standard onmouseenter event */
  onMouseEnter?: (e: MouseEvent) => void,
  /** Standard onmouseleave event */
  onMouseLeave?: (e: MouseEvent) => void,
  /** Text to be shown alongside the main `text`. */
  subText?: string,
  /** Main text to be displayed as the item. Accepts a react component but in most
   cases this should just be a string. */
  text?: Node,
  // TODO
  theme: Object,
};

const key = itemThemeNamespace;

class ContainerTitle extends PureComponent<Props> {
  withOuterTheme = memoizeOne(outerTheme => overrideItemTheme(outerTheme, key));

  render() {
    const { text, subText, icon } = this.props;

    /* eslint-disable react/prop-types */
    // theme is passed in via context and not part of the props API for this component
    const isNavCollapsed = this.props.theme[rootKey]
      ? this.props.theme[rootKey].isCollapsed
      : false;
    const theme = this.withOuterTheme(this.props.theme);
    /* eslint-enable react/prop-types */

    const interactiveWrapperProps = {
      onClick: this.props.onClick,
      onKeyDown: this.props.onKeyDown,
      onMouseEnter: this.props.onMouseEnter,
      onMouseLeave: this.props.onMouseLeave,
      href: this.props.href,
      linkComponent: this.props.linkComponent,
    };

    return (
      <ThemeProvider theme={theme}>
        <AkNavigationItem
          icon={
            isNavCollapsed ? null : (
              <ContainerTitleIcon>{icon}</ContainerTitleIcon>
            )
          }
          subText={isNavCollapsed ? null : subText}
          text={
            isNavCollapsed ? (
              <ContainerTitleIcon aria-label={text}>{icon}</ContainerTitleIcon>
            ) : (
              <ContainerTitleText>{text}</ContainerTitleText>
            )
          }
          {...interactiveWrapperProps}
        />
      </ThemeProvider>
    );
  }
}

export default withTheme(ContainerTitle);
