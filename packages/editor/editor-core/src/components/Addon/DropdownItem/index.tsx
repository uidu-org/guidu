import * as React from 'react';
import { AddonProps } from '../types';
import { DropdownItem } from './styles';

const DropdownItemWrapper = (props: AddonProps) => (
  <DropdownItem
    onClick={() =>
      props.onClick &&
      props.onClick({
        actionOnClick: props.actionOnClick,
        renderOnClick: props.renderOnClick,
      })
    }
  >
    <span>{props.icon}</span>
    {props.children}
  </DropdownItem>
);

export default DropdownItemWrapper;
