// @flow
import React, { Component, type Element, type Node } from 'react';

import {
  Outer,
  TitleWrapper,
  StyledTitle,
  ActionsWrapper,
  BottomBarWrapper,
  TitleContainer,
} from './styled';

type Props = {
  /** Page breadcrumbs to be rendered above the title. */
  breadcrumbs?: Element<any>,
  /** Contents of the action bar to be rendered next to the page title. */
  actions?: Element<any>,
  /** Contents of the header bar to be rendered below the page title. */
  bottomBar?: Element<any>,
  /** Content of the page title. The text would be trimmed if it doesn't fit the
   header width and end with an ellipsis */
  children?: Node,
  /** Disable default styles for page title */
  disableTitleStyles?: boolean,
  /** Prevent the title from wrapping across lines */
  truncateTitle?: boolean,
};
export default class PageHeader extends Component<Props> {
  static defaultProps: $Shape<Props> = {
    disableTitleStyles: false,
    truncateTitle: false,
  };

  render() {
    const {
      breadcrumbs,
      actions,
      bottomBar,
      children,
      disableTitleStyles,
      truncateTitle,
    } = this.props;
    return (
      <Outer>
        {breadcrumbs}
        <TitleWrapper truncate={truncateTitle}>
          <TitleContainer truncate={truncateTitle}>
            {disableTitleStyles ? (
              children
            ) : (
              <StyledTitle truncate={truncateTitle}>{children}</StyledTitle>
            )}
          </TitleContainer>
          <ActionsWrapper>{actions}</ActionsWrapper>
        </TitleWrapper>
        {bottomBar && <BottomBarWrapper> {bottomBar} </BottomBarWrapper>}
      </Outer>
    );
  }
}
