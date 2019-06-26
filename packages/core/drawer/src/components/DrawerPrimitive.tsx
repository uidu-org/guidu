import React, { PureComponent } from 'react';
import { DrawerPrimitiveProps } from '../types';
import Content from './Content';
import { Slide } from './transitions';
import Wrapper from './Wrapper';

export default class DrawerPrimitive extends PureComponent<
  DrawerPrimitiveProps
> {
  render() {
    const {
      children,
      icon: Icon,
      onClose,
      onCloseComplete,
      ...props
    } = this.props;

    return (
      <Slide component={Wrapper} onExited={onCloseComplete} {...props}>
        <Content>{children}</Content>
      </Slide>
    );
  }
}
