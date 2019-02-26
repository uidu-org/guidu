// @flow
import React, { PureComponent, type Node } from 'react';
import { withTheme } from 'styled-components';
import ContainerLogoStyled from '../styled/ContainerLogo';
import { rootKey } from '../../theme/util';

type Props = {
  /** Elements to be wrapped with the Logo styling. */
  children: Node,
  theme: {},
};

class ContainerLogo extends PureComponent<Props> {
  render() {
    /* eslint-disable react/prop-types */
    // theme is passed in via context and not part of the props API for this component
    const isNavCollapsed = this.props.theme[rootKey]
      ? this.props.theme[rootKey].isCollapsed
      : false;
    /* eslint-enable react/prop-types */

    return isNavCollapsed ? null : (
      <ContainerLogoStyled>{this.props.children}</ContainerLogoStyled>
    );
  }
}

export default withTheme(ContainerLogo);
