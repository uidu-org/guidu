import React from 'react';
import { DrawerPrimitiveProps } from '../types';
import Content from './Content';
import { Slide } from './transitions';
import Wrapper from './Wrapper';

export default function DrawerPrimitive({
  children,
  icon: Icon,
  onClose,
  onCloseComplete,
  ...rest
}: DrawerPrimitiveProps) {
  return (
    <Slide component={Wrapper} onExited={onCloseComplete} {...rest}>
      <Content>{children}</Content>
    </Slide>
  );
}
