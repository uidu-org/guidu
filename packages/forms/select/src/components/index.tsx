import React from 'react';
import { X } from 'react-feather';
import { components } from 'react-select';

export {
  ClearIndicator,
  DropdownIndicator,
  LoadingIndicator,
} from './indicators';

export function MultiValueRemove(props: any) {
  return (
    <components.MultiValueRemove {...props}>
      <X size={16} />
    </components.MultiValueRemove>
  );
}

export const IndicatorSeparator = null;
