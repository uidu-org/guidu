import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Spinner from '@uidu/spinner';
import React from 'react';

// indicators
export function ClearIndicator(props: any) {
  const {
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div
      {...restInnerProps}
      ref={ref}
      style={getStyles('clearIndicator', props)}
      tw="flex items-center mx-2"
    >
      <XMarkIcon tw="h-5 w-5" />
    </div>
  );
}

export function DropdownIndicator(props: any) {
  const {
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div
      {...restInnerProps}
      ref={ref}
      tw="flex items-center mx-2"
      style={getStyles('dropdownIndicator', props)}
    >
      <ChevronDownIcon tw="h-5 w-5" />
    </div>
  );
}

export function LoadingIndicator(props: any) {
  return (
    <div
      style={props.getStyles('loadingIndicator', props)}
      {...props.innerProps}
    >
      <Spinner size="small" />
    </div>
  );
}
