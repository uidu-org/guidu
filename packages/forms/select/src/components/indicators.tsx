import Spinner from '@uidu/spinner';
import React from 'react';
import { ChevronDown, X } from 'react-feather';

// indicators
export const ClearIndicator = (props: any) => {
  const {
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div
      {...restInnerProps}
      ref={ref}
      style={getStyles('clearIndicator', props)}
      className="d-flex align-items-center mx-2"
    >
      <X size={16} />
    </div>
  );
};

export const DropdownIndicator = (props: any) => {
  const {
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div
      {...restInnerProps}
      ref={ref}
      className="d-flex align-items-center mx-2"
      style={getStyles('dropdownIndicator', props)}
    >
      <ChevronDown size={18} />
    </div>
  );
};

export const LoadingIndicator = (props: any) => (
  <div style={props.getStyles('loadingIndicator', props)} {...props.innerProps}>
    <Spinner size="small" />
  </div>
);
