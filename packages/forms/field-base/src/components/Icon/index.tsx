import React from 'react';
import { IconProps } from './types';

const Icon = (props: IconProps) => {
  const classNames = ['icon', 'icon-' + props.symbol];
  if (props.className) {
    classNames.push(props.className);
  }
  return <span className={classNames.join(' ')} aria-hidden="true" />;
};

export default Icon;
