// @flow
import React, { PureComponent, type Node } from 'react';
import ContainerHeaderWrapper from '../styled/ContainerHeaderWrapper';
import { globalItemSizes } from '../../shared-variables';

type Props = {
  children?: Node,
  iconOffset: number,
  isFullWidth?: boolean,
  isInDrawer: boolean,
};

export default class ContainerHeader extends PureComponent<Props> {
  static defaultProps = {
    iconOffset: globalItemSizes.medium,
    isInDrawer: false,
  };

  render() {
    const { iconOffset, isFullWidth, isInDrawer } = this.props;
    return (
      <ContainerHeaderWrapper
        isInDrawer={isInDrawer}
        iconOffset={iconOffset}
        isFullWidth={isFullWidth}
      >
        {this.props.children}
      </ContainerHeaderWrapper>
    );
  }
}
