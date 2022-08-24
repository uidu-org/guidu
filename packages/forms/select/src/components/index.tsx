import { XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { components } from 'react-select';

export {
  ClearIndicator,
  DropdownIndicator,
  LoadingIndicator,
} from './indicators';

export function MultiValueRemove(props: any) {
  return (
    <components.MultiValueRemove {...props}>
      <XMarkIcon tw="h-5 w-5" />
    </components.MultiValueRemove>
  );
}

// export const IndicatorSeparator = null;
