// @flow
import React, { PureComponent, type Node } from 'react';
import { ThemeProvider, withTheme } from 'styled-components';
import { itemThemeNamespace } from '@atlaskit/item';
import AkDropdownMenu from '@atlaskit/dropdown-menu';
import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import memoizeOne from 'memoize-one';
import AkNavigationItem from './NavigationItem';
import ContainerTitleIcon from '../styled/ContainerTitleIcon';
import ContainerTitleText from '../styled/ContainerTitleText';
import { rootKey } from '../../theme/util';
import overrideItemTheme from '../../theme/create-container-title-item-theme';

type Props = {
  /** Content that will be rendered inside the layer element. Should typically be
   * `DropdownItemGroup` or `DropdownItem`, or checkbox / radio variants of those. */
  children?: Node,
  /** Image appear to the left of the text. */
  icon?: Node,
  /** Text to appear below the title. */
  subText?: string,
  /** Text to appear as the title. This is placed at the top and bolded. */
  text: string,
  /** Theme used */
  theme: Object,
  /** Controls the initial open state of the dropdown. */
  defaultDropdownOpen?: boolean,
  /** Controls the open state of the dropdown. */
  isDropdownOpen?: boolean,
  /** If true, a Spinner is rendered instead of the items */
  isDropdownLoading?: boolean,
  /** Called when the menu is open or closed. Received an object with isOpen state. */
  onDropdownOpenChange?: Function,
};

const key = itemThemeNamespace;

class ContainerTitleDropdown extends PureComponent<Props> {
  withOuterTheme = memoizeOne(outerTheme => overrideItemTheme(outerTheme, key));

  render() {
    const {
      children,
      icon,
      subText,
      text,
      defaultDropdownOpen,
      isDropdownOpen,
      isDropdownLoading,
      onDropdownOpenChange,
    } = this.props;

    /* eslint-disable react/prop-types */
    // theme is passed in via context and not part of the props API for this component
    const isNavCollapsed = this.props.theme[rootKey]
      ? this.props.theme[rootKey].isCollapsed
      : false;
    const theme = this.withOuterTheme(this.props.theme);
    /* eslint-enable react/prop-types */

    return (
      <AkDropdownMenu
        appearance="tall"
        shouldFitContainer={!isNavCollapsed}
        position={isNavCollapsed ? 'right top' : 'bottom left'}
        shouldFlip={false}
        defaultOpen={defaultDropdownOpen}
        isLoading={isDropdownLoading}
        isOpen={isDropdownOpen}
        onOpenChange={onDropdownOpenChange}
        trigger={
          <ThemeProvider theme={theme}>
            <AkNavigationItem
              dropIcon={isNavCollapsed ? null : <ExpandIcon label="chevron" />}
              isDropdownTrigger
              icon={
                isNavCollapsed ? null : (
                  <ContainerTitleIcon>{icon}</ContainerTitleIcon>
                )
              }
              subText={isNavCollapsed ? null : subText}
              text={
                isNavCollapsed ? (
                  <ContainerTitleIcon aria-label={text}>
                    {icon}
                  </ContainerTitleIcon>
                ) : (
                  <ContainerTitleText>{text}</ContainerTitleText>
                )
              }
            />
          </ThemeProvider>
        }
      >
        {children}
      </AkDropdownMenu>
    );
  }
}

export default withTheme(ContainerTitleDropdown);
